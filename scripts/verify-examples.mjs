import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import { runScenario } from "@adiitj/blinkrivet";
const server = spawn(process.execPath, ["examples/demo/server.mjs"], { stdio: ["ignore", "pipe", "pipe"] });
let serverError = "";
server.stderr.on("data", chunk => { serverError += chunk; });
const output = path.resolve(".weartest", `consumer-check-${Date.now()}`);
try {
  await new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(Error(`Demo failed to start: ${serverError}`)), 10000);
    server.once("error", error => { clearTimeout(timer); reject(error); });
    server.once("exit", code => { clearTimeout(timer); reject(Error(`Demo exited ${code}: ${serverError}`)); });
    server.stdout.once("data", () => { clearTimeout(timer); resolve(); });
  });
  const results = [];
  for (const [name, expected] of [["assertions", "passed"], ["regression", "failed"], ["session", "failed"]]) {
    const input = JSON.parse(await fs.readFile(`examples/${name}.json`, "utf8"));
    const outcome = await runScenario(input, { outputDir: path.join(output, name) });
    assert.equal(outcome.result.status, expected, `Unexpected ${name} outcome`);
    assert.equal(outcome.result.flaky, false);
    const text = JSON.stringify(outcome.result);
    if (name === "session") assert.match(text, /BASELINE_MISSING/);
    if (name === "regression") assert.match(text, /Ready for your next idea/);
    results.push({ name, status: outcome.result.status, expected, reportPath: outcome.reportPath });
  }
  await fs.writeFile(path.join(output, "consumer-check.json"), JSON.stringify({ passed: true, results }, null, 2));
  console.log(JSON.stringify({ passed: true, output, checks: results }, null, 2));
} finally {
  if (server.exitCode === null) {
    server.kill("SIGTERM");
    await Promise.race([new Promise(resolve => server.once("exit", resolve)), new Promise(resolve => setTimeout(resolve, 3000))]);
  }
}
