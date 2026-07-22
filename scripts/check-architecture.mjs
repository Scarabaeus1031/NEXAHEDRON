import assert from "node:assert/strict";
import { readFile, readdir, stat } from "node:fs/promises";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = new URL("../", import.meta.url);
const rootPath = fileURLToPath(root);
const expectedOrionRevision = "8a65f40464a4ccfa62d8f9fd8b831d107b0eaa35";
const forbiddenPackageNames = new Set(["nexah", "orion", "lyra", "lucy"]);

for (const name of await readdir(new URL("../packages/", import.meta.url))) {
  assert.ok(!forbiddenPackageNames.has(name.toLowerCase()), `forbidden authority package: packages/${name}`);
}

async function sourceFiles(directory) {
  const files = [];
  for (const name of await readdir(directory)) {
    const path = join(directory, name);
    const metadata = await stat(path);
    if (metadata.isDirectory()) files.push(...(await sourceFiles(path)));
    else if (/\.(?:ts|tsx|mts|mjs)$/.test(name)) files.push(path);
  }
  return files;
}

for (const sourceRoot of ["app", "apps", "components", "features", "hooks", "lib", "packages", "types"]) {
  const sourceDirectory = fileURLToPath(new URL(`../${sourceRoot}/`, import.meta.url));
  for (const path of await sourceFiles(sourceDirectory)) {
    const source = await readFile(path, "utf8");
    const displayPath = relative(rootPath, path);
    assert.doesNotMatch(source, /from\s+["'][^"']*src\/orion/i, displayPath);
    assert.doesNotMatch(source, /from\s+["'][^"']*nexah(?:-core)?\//i, displayPath);
    assert.doesNotMatch(source, /(?:openai|anthropic|ollama|langchain)/i, displayPath);
  }
}

const routeScreens = new Map([
  ["app/page.tsx", "LandingScreen"],
  ["app/orient/page.tsx", "ChooseOrientationScreen"],
  ["app/wonder/page.tsx", "WonderScreen"],
  ["app/object/page.tsx", "ObjectSelectionScreen"],
  ["app/request/page.tsx", "RequestEditorScreen"],
  ["app/confirmation/page.tsx", "ConfirmationScreen"],
]);
for (const [path, screen] of routeScreens) {
  const source = await readFile(new URL(`../${path}`, import.meta.url), "utf8");
  assert.match(source, new RegExp(`features/orientation/screens/${screen}`), path);
}

for (const sourceRoot of ["app", "components", "features", "hooks", "lib", "types"]) {
  const sourceDirectory = fileURLToPath(new URL(`../${sourceRoot}/`, import.meta.url));
  for (const path of await sourceFiles(sourceDirectory)) {
    const source = await readFile(path, "utf8");
    const displayPath = relative(rootPath, path);
    assert.doesNotMatch(source, /\bfetch\s*\(|axios|XMLHttpRequest/i, displayPath);
    assert.doesNotMatch(source, /orion-gateway|laboratory-server|full-round-trip\.json|orientation-sessions/i, displayPath);
  }
}

const hosting = JSON.parse(await readFile(new URL("../.openai/hosting.json", import.meta.url), "utf8"));
assert.deepEqual(hosting, {
  project_id: "appgprj_6a6132ea2a948191a8ca004a170e4e66",
  d1: null,
  r2: null,
});

const sourceManifest = await readFile(new URL("../docs/upstream/orion-v1/SOURCE.yaml", import.meta.url), "utf8");
assert.match(sourceManifest, new RegExp(`revision: ${expectedOrionRevision}`));
assert.match(sourceManifest, /source_repository_remains_canonical: true/);

console.log("NEXAHEDRON Sprint 2 authority and architecture checks passed.");
