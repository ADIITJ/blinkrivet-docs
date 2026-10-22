import fs from "node:fs/promises";
import { runScenario } from "@adiitj/blinkrivet";

const sourceFile = process.argv[2] || "examples/assertions.json";
try {
  const scenario = JSON.parse(await fs.readFile(sourceFile, "utf8"));
  const outcome = await runScenario(scenario, { sourceFile });
  const ready = outcome.result.status === "passed" && !outcome.result.flaky;
  console.log(JSON.stringify({ ready, reportPath: outcome.reportPath, result: outcome.result }, null, 2));
  process.exitCode = ready ? 0 : 1;
} catch (error) {
  console.error(error.message);
  process.exitCode = 2;
}
