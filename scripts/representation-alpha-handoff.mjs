import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  orionPythonEnvironment,
  orionPythonExecutable,
} from "./orion-python-env.mjs";

const root = fileURLToPath(new URL("../", import.meta.url));
const acceptedOrionFiles = new Map([
  [
    "orion/representation_alpha.py",
    "220e8f5f89d39bf7fc5fb9629cc0a2d11246ed93fb1be1e814bbc34f706c5f48",
  ],
  [
    "orion/contracts.py",
    "82e4dbc3c915cf6545bc410ce7aa00749ef86a52241e92ecf8f24de900c9ab13",
  ],
]);

const environment = await orionPythonEnvironment();
for (const [relativePath, expectedSha256] of acceptedOrionFiles) {
  const content = await readFile(join(environment.PYTHONPATH, relativePath));
  const actualSha256 = createHash("sha256").update(content).digest("hex");
  if (actualSha256 !== expectedSha256) {
    throw new Error(
      `Accepted ORION Representation Alpha file changed: ${relativePath}`,
    );
  }
}

const confirmedMaterial = spawnSync(
  process.execPath,
  [
    "--no-warnings",
    "--experimental-strip-types",
    "scripts/confirmed-material-proof.mjs",
  ],
  { cwd: root, encoding: "utf8" },
);
if (confirmedMaterial.error) throw confirmedMaterial.error;
if (confirmedMaterial.status !== 0) {
  throw new Error(
    confirmedMaterial.stderr || "Confirmed Material proof failed",
  );
}

const representation = spawnSync(
  orionPythonExecutable(),
  ["scripts/consume-confirmed-material.py"],
  {
    cwd: root,
    env: environment,
    input: confirmedMaterial.stdout,
    encoding: "utf8",
  },
);
if (representation.error) throw representation.error;
if (representation.status !== 0) {
  throw new Error(
    representation.stderr || "ORION Representation Alpha consumption failed",
  );
}

process.stdout.write(representation.stdout);
