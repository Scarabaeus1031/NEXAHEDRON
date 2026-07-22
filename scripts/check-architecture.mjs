import assert from "node:assert/strict";
import { readFile, readdir, stat } from "node:fs/promises";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = new URL("../", import.meta.url);
const rootPath = fileURLToPath(root);
const expectedOrionRevision = "8a65f40464a4ccfa62d8f9fd8b831d107b0eaa35";
const forbiddenPackageNames = new Set(["nexah", "orion", "lyra", "lucy"]);

for (const name of await readdir(new URL("../packages/", import.meta.url))) {
  assert.ok(
    !forbiddenPackageNames.has(name.toLowerCase()),
    `forbidden authority package: packages/${name}`,
  );
}

async function sourceFiles(directory) {
  const files = [];
  for (const name of await readdir(directory)) {
    const path = join(directory, name);
    const metadata = await stat(path);
    if (metadata.isDirectory()) {
      files.push(...(await sourceFiles(path)));
    } else if (/\.(?:ts|tsx|mts|mjs)$/.test(name)) {
      files.push(path);
    }
  }
  return files;
}

const sourceRoots = ["app", "apps", "packages"];
for (const sourceRoot of sourceRoots) {
  const sourceDirectory = fileURLToPath(
    new URL(`../${sourceRoot}/`, import.meta.url),
  );
  for (const path of await sourceFiles(sourceDirectory)) {
    const text = await readFile(path, "utf8");
    const displayPath = relative(rootPath, path);
    assert.doesNotMatch(text, /from\s+["'][^"']*src\/orion/i, displayPath);
    assert.doesNotMatch(text, /from\s+["'][^"']*nexah(?:-core)?\//i, displayPath);
    assert.doesNotMatch(text, /(?:openai|anthropic|ollama|langchain)/i, displayPath);
  }
}

const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
assert.match(page, /apps\/web\/src\/FoundationShell/);
assert.doesNotMatch(page, /orion-gateway|laboratory-server/);

const laboratory = await readFile(
  new URL("../apps/web/src/OrientationLaboratory.tsx", import.meta.url),
  "utf8",
);
assert.match(laboratory, /full-round-trip\.json/);
assert.match(laboratory, /No live ORION request/);
assert.doesNotMatch(laboratory, /orion-gateway|fetch\(|axios|XMLHttpRequest/);

const hosting = JSON.parse(
  await readFile(new URL("../.openai/hosting.json", import.meta.url), "utf8"),
);
assert.deepEqual(hosting, { d1: null, r2: null });

const sourceManifest = await readFile(
  new URL("../docs/upstream/orion-v1/SOURCE.yaml", import.meta.url),
  "utf8",
);
assert.match(sourceManifest, new RegExp(`revision: ${expectedOrionRevision}`));
assert.match(sourceManifest, /source_repository_remains_canonical: true/);

console.log("NEXAHEDRON authority and architecture checks passed.");
