import { spawn } from "node:child_process";
import { orionPythonEnvironment, orionPythonExecutable } from "./orion-python-env.mjs";

let environment;
try {
  environment = await orionPythonEnvironment();
} catch (error) {
  console.error(error instanceof Error ? error.message : "ORION dependency verification failed. Execution stopped.");
  process.exit(1);
}

const child = spawn(orionPythonExecutable(), ["-m", "services.orion_transport.server"], {
  cwd: process.cwd(),
  env: environment,
  stdio: "inherit",
});

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => child.kill(signal));
}

child.on("exit", (code) => process.exitCode = code ?? 1);
