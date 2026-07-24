import { createHash } from "node:crypto";
import { readFile, readdir } from "node:fs/promises";
import { dirname, join, relative, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const manifestPath = join(projectRoot, "docs/upstream/orion-v1/SOURCE.yaml");

export async function verifyOrionDependency(options = {}) {
  const sourcePath = resolve(options.sourcePath || process.env.ORION_SOURCE_PATH || join(projectRoot, "../NEXH x LLAMA _orion_/src"));
  const orionRoot = resolve(sourcePath, "..");
  const manifest = await readFile(manifestPath, "utf8");
  const expectedRevision = requiredValue(manifest, "revision");
  const expectedFingerprint = requiredValue(manifest, "canonical_content_fingerprint");
  const revisionResult = spawnSync("git", ["-C", orionRoot, "rev-parse", "HEAD"], { encoding: "utf8" });
  if (revisionResult.status !== 0) fail(`ORION dependency is not a readable Git checkout: ${orionRoot}`);
  const actualRevision = revisionResult.stdout.trim();
  if (actualRevision !== expectedRevision) fail(`ORION revision mismatch. Expected ${expectedRevision}; found ${actualRevision}. Execution stopped.`);

  const manifestLines = [];
  for (const path of await canonicalFiles(orionRoot)) {
    const digest = createHash("sha256").update(await readFile(path)).digest("hex");
    manifestLines.push(`${digest}  ${relative(orionRoot, path).replaceAll("\\", "/")}\n`);
  }
  const actualFingerprint = createHash("sha256").update(manifestLines.join("")).digest("hex");
  if (actualFingerprint !== expectedFingerprint) fail(`ORION canonical-content mismatch. Expected ${expectedFingerprint}; found ${actualFingerprint}. Runtime, Gateway or public-contract content is not the reviewed Version 1 candidate. Execution stopped.`);
  if (!options.quiet) console.log(`ORION dependency verified: ${actualRevision} / ${actualFingerprint}`);
  return { sourcePath, orionRoot, revision: actualRevision, fingerprint: actualFingerprint };
}

async function canonicalFiles(root) {
  const files = ["VERSION", "docs/architecture/operators/ORION_ORIENTATION_OPERATORS.md", "docs/architecture/operators/ORION_ORIENTATION_POLICIES.md", "evaluation/phase_vii/corpus.json", "workspace.yaml"];
  for (const name of await readdir(join(root, "docs/architecture/contracts"))) if (name.endsWith(".md")) files.push(`docs/architecture/contracts/${name}`);
  for (const directory of ["src/orion/gateway", "src/orion/orientation_runtime", "src/orion/public_contracts"]) {
    for (const name of await readdir(join(root, directory))) if (name.endsWith(".py")) files.push(`${directory}/${name}`);
  }
  return files.sort().map((path) => join(root, path));
}

function requiredValue(document, key) {
  const match = document.match(new RegExp(`^\\s*${key}:\\s*["']?([^"'\\s]+)`, "m"));
  if (!match) fail(`Missing ${key} in ${manifestPath}`);
  return match[1];
}

function fail(message) { throw new Error(`[ORION dependency verification] ${message}`); }

if (process.argv[1] === fileURLToPath(import.meta.url)) verifyOrionDependency().catch((error) => { console.error(error.message); process.exitCode = 1; });
