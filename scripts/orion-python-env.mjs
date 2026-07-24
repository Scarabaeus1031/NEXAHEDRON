import { spawnSync } from "node:child_process";
import { verifyOrionDependency } from "./verify-orion-dependency.mjs";

export async function orionPythonEnvironment() {
  const verified = await verifyOrionDependency({ quiet: true });
  return { ...process.env, PYTHONPATH: verified.sourcePath };
}

export function orionPythonExecutable() {
  if (process.env.ORION_PYTHON) return process.env.ORION_PYTHON;
  for (const candidate of ["python3.12", "python3.11", "python3.10", "python3"]) {
    const check = spawnSync(candidate, ["--version"], { encoding: "utf8" });
    const version = `${check.stdout}${check.stderr}`.match(/Python (\d+)\.(\d+)/);
    if (check.status === 0 && version && (Number(version[1]) > 3 || Number(version[2]) >= 10)) return candidate;
  }
  throw new Error("ORION requires Python 3.10 or newer");
}
