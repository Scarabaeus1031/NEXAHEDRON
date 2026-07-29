import assert from "node:assert/strict";
import { readFile, readdir, stat } from "node:fs/promises";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = new URL("../", import.meta.url);
const rootPath = fileURLToPath(root);
const expectedOrionRevision = "d34fbb2f99334534f4db89465a29f8bdb16d14d3";
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
  ["app/orientation/page.tsx", "OrientationSessionScreen"],
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
    if (displayPath !== "app/api/orientation/route.ts") {
      assert.doesNotMatch(source, /\bfetch\s*\(|axios|XMLHttpRequest/i, displayPath);
    }
    assert.doesNotMatch(source, /laboratory-server|full-round-trip\.json|orientation-sessions/i, displayPath);
  }
}

const transportRoute = await readFile(new URL("../app/api/orientation/route.ts", import.meta.url), "utf8");
assert.match(transportRoute, /ORION_GATEWAY_URL/);
assert.match(transportRoute, /ORION_GATEWAY_BEARER_TOKEN/);
assert.match(transportRoute, /application\/vnd\.orion\.contracts\+json;version=1\.0/);
assert.doesNotMatch(transportRoute, /OrientationReport|ClarificationResult|evidence_class|orientation_summary/);

const orionTransport = await readFile(new URL("../services/orion_transport/server.py", import.meta.url), "utf8");
assert.match(orionTransport, /from orion\.gateway import OrientationGateway/);
assert.match(orionTransport, /from orion\.public_contracts import/);
assert.doesNotMatch(orionTransport, /orientation_runtime|public_contracts\.fixtures|fake_backend|ollama|openai|anthropic/i);

const hosting = JSON.parse(await readFile(new URL("../.openai/hosting.json", import.meta.url), "utf8"));
assert.deepEqual(hosting, {
  project_id: "appgprj_6a6132ea2a948191a8ca004a170e4e66",
  d1: null,
  r2: null,
});

const sourceManifest = await readFile(new URL("../docs/upstream/orion-v1/SOURCE.yaml", import.meta.url), "utf8");
assert.match(sourceManifest, new RegExp(`revision: ${expectedOrionRevision}`));
assert.match(sourceManifest, /canonical_content_fingerprint: 6201362c094530a0a31fa3d80b46c9131011bb8c8d400183271b0da0eb423f8d/);
assert.match(sourceManifest, /source_repository_remains_canonical: true/);

const consumerBoundary = await readFile(new URL("../packages/orion-gateway/src/index.ts", import.meta.url), "utf8");
assert.match(consumerBoundary, /\.\/generated\/orion-v1/);
assert.doesNotMatch(consumerBoundary, /interface\s+(?:OrientationRequest|OrientationReport|ClarificationResult|ContinuationOption|EvidenceReference|RuntimeError)\b/);

console.log("NEXAHEDRON live ORION integration boundary checks passed.");
