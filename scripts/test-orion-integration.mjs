import { spawnSync } from "node:child_process";
import { orionPythonEnvironment, orionPythonExecutable } from "./orion-python-env.mjs";

const result = spawnSync(
  orionPythonExecutable(),
  ["-m", "unittest", "discover", "-s", "tests/python", "-p", "test_*.py", "-v"],
  { cwd: process.cwd(), env: await orionPythonEnvironment(), stdio: "inherit" },
);

if (result.error) throw result.error;
process.exitCode = result.status ?? 1;
