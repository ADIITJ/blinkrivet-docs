import fs from "node:fs/promises";
import path from "node:path";
import assert from "node:assert/strict";
const ignored = new Set([".git", "node_modules", ".weartest"]);
async function walk(dir = ".") {
  const result = [];
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    if (ignored.has(entry.name)) continue;
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) result.push(...await walk(file));
    else result.push(file);
  }
  return result;
}
const files = await walk();
for (const file of files) {
  assert.ok(!/(^|\/)(?:\.beads|dist|packages|evidence|src)(?:\/|$)/.test(file), `Unexpected implementation/internal path: ${file}`);
  if (!file.endsWith(".md")) continue;
  const text = await fs.readFile(file, "utf8");
  const refs = [...text.matchAll(/\]\(([^)]+)\)|(?:src|href)="([^"]+)"/g)].map(match => match[1] || match[2]);
  for (let ref of refs) {
    if (/^(?:https?:|mailto:|#)/.test(ref)) continue;
    ref = ref.split("#")[0];
    if (!ref) continue;
    assert.ok((await fs.stat(path.resolve(path.dirname(file), ref))).isFile(), `Missing local link in ${file}: ${ref}`);
  }
}
for (const name of ["session", "assertions", "regression"]) JSON.parse(await fs.readFile(`examples/${name}.json`, "utf8"));
console.log(`Checked ${files.length} public files, local documentation links and scenario JSON.`);
