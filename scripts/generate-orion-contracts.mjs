import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { orionPythonEnvironment, orionPythonExecutable } from "./orion-python-env.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const target = resolve(root, "packages/orion-gateway/src/generated/orion-v1.ts");
const result = spawnSync(orionPythonExecutable(), [resolve(root, "scripts/export-orion-contracts.py")], {
  cwd: root,
  env: await orionPythonEnvironment(),
  encoding: "utf8",
});
if (result.status !== 0) throw new Error(result.stderr || "ORION contract generation failed");

if (process.argv.includes("--check")) {
  const current = await readFile(target, "utf8").catch(() => "");
  if (current !== result.stdout) throw new Error("Generated ORION consumer contracts diverge from the immutable canonical models. Run npm run contracts:generate.");
  console.log("ORION generated contract declarations verified.");
} else {
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, result.stdout);
  console.log(`Generated ${target}`);
}
