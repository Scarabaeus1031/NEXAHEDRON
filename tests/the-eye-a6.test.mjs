import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { ArtifactBoundaryError } from "../features/the-eye/boundary.ts";
import { THE_EYE_DEMO_IDS } from "../features/the-eye/catalog.ts";
import { exportCuratedArtifact, loadCuratedDemo, validateCuratedPackage, verifyCuratedReceipt } from "../features/the-eye/curated-server.ts";
import { CURATED_ASSETS, CURATED_MANIFEST } from "../features/the-eye/curated/generated.ts";
import { loadRuntimeDemo } from "../features/the-eye/runtime.ts";

const expected = {
  "a3-pass-exact-id": ["VERIFIED_PASS", "PASS", 0, 2, 0, 0, 0, 0],
  "a3-fail-explicit-mapping": ["VERIFIED_FAIL", "FAIL", 10, 1, 1, 1, 0, 2],
  "a3-hold-unavailable": ["VERIFIED_HOLD", "HOLD", 20, 0, 0, 0, 1, 1],
  "a3-input-rejected": ["INPUT_REJECTED", "INPUT_REJECTED", 30, 0, 0, 0, 0, 0],
  "a4-kernel-current-repeat": ["VERIFIED_PASS", "PASS", 0, 73, 0, 0, 0, 0],
  "a4-kernel-synthetic-change": ["VERIFIED_FAIL", "FAIL", 10, 1, 1, 0, 0, 1],
};
const copy = () => structuredClone({ ...CURATED_MANIFEST, assets: CURATED_ASSETS });
function restoreEnv(key, value) { if (value === undefined) delete process.env[key]; else process.env[key] = value; }
async function rejects(pkg, code) { await assert.rejects(validateCuratedPackage(pkg), (error) => error instanceof ArtifactBoundaryError && error.code === code); }

test("curated package is valid and exposes exactly six IDs", async () => { assert.equal(await validateCuratedPackage(), true); assert.deepEqual(CURATED_MANIFEST.demonstrations.map((demo) => demo.source_demonstration_id), THE_EYE_DEMO_IDS); });
for (const id of THE_EYE_DEMO_IDS) test(`curated projection preserves sealed parity for ${id}`, async () => {
  const envelope = await loadCuratedDemo(id); const [state, outcome, exitCode, i, l, a, u, residuals] = expected[id];
  assert.equal(envelope.state, state); assert.equal(envelope.runtimeMode, "CURATED_BUNDLED"); assert.equal(envelope.verificationStage, "VERIFIED_BEFORE_PACKAGING");
  assert.equal(envelope.runtime?.outcome, outcome); assert.equal(envelope.runtime?.exit_code, exitCode);
  if (id === "a3-input-rejected") { assert.equal(envelope.projection, undefined); assert.equal(envelope.runtime?.result_sha256, null); return; }
  assert.deepEqual([envelope.projection.ilau.invariant.length, envelope.projection.ilau.lost.length, envelope.projection.ilau.added.length, envelope.projection.ilau.unavailable.length], [i, l, a, u]);
  assert.equal(envelope.projection.residuals.length, residuals); assert.equal(envelope.projection.outcome.mechanismStatus, "NOT_EVALUATED");
});

for (const unsafeId of ["", "unknown", "../result.json", "%2e%2e%2fresult.json", "/etc/passwd", "file:///etc/passwd", "x;uname"])
  test(`unknown or path-like ID fails closed: ${unsafeId || "empty"}`, async () => assert.equal((await loadCuratedDemo(unsafeId)).state, "RESULT_INVALID"));
test("unexpected export type is rejected", async () => await assert.rejects(exportCuratedArtifact("a3-pass-exact-id", "source"), (error) => error instanceof ArtifactBoundaryError && error.code === "EXPORT_NOT_ALLOWLISTED"));
test("malformed request equivalent fails closed", async () => assert.equal((await verifyCuratedReceipt("", "valid")).state, "RECEIPT_INVALID"));
test("absent runtime mode fails closed", async () => { const old = process.env.THE_EYE_RUNTIME_MODE; delete process.env.THE_EYE_RUNTIME_MODE; assert.equal((await loadRuntimeDemo("a3-pass-exact-id")).reasonCode, "RUNTIME_MODE_MISSING"); restoreEnv("THE_EYE_RUNTIME_MODE", old); });
test("invalid runtime mode fails closed", async () => { const old = process.env.THE_EYE_RUNTIME_MODE; process.env.THE_EYE_RUNTIME_MODE = "UNTRUSTED"; assert.equal((await loadRuntimeDemo("a3-pass-exact-id")).reasonCode, "INVALID_RUNTIME_MODE"); restoreEnv("THE_EYE_RUNTIME_MODE", old); });
test("local mode without local configuration fails closed", async () => {
  const [oldMode, oldRoot] = [process.env.THE_EYE_RUNTIME_MODE, process.env.THE_EYE_LOCAL_ARTIFACT_ROOT]; process.env.THE_EYE_RUNTIME_MODE = "LOCAL_VERIFIED"; delete process.env.THE_EYE_LOCAL_ARTIFACT_ROOT;
  assert.equal((await loadRuntimeDemo("a3-pass-exact-id")).state, "LOCAL_CONFIGURATION_MISSING"); restoreEnv("THE_EYE_RUNTIME_MODE", oldMode); restoreEnv("THE_EYE_LOCAL_ARTIFACT_ROOT", oldRoot);
});
test("missing curated manifest entry is rejected", async () => { const pkg = copy(); pkg.demonstrations.pop(); await rejects(pkg, "CURATED_ALLOWLIST_INVALID"); });
test("duplicate manifest ID is rejected", async () => { const pkg = copy(); pkg.demonstrations.push(structuredClone(pkg.demonstrations[0])); await rejects(pkg, "CURATED_ALLOWLIST_INVALID"); });
test("unexpected seventh demonstration is rejected", async () => { const pkg = copy(); pkg.demonstrations.push({ ...structuredClone(pkg.demonstrations[0]), source_demonstration_id: "seventh" }); await rejects(pkg, "CURATED_ALLOWLIST_INVALID"); });
test("tampered curated asset is rejected by hash", async () => { const pkg = copy(); const path = Object.keys(pkg.assets)[0]; pkg.assets[path] += " "; await rejects(pkg, "CURATED_ASSET_HASH_MISMATCH"); });
test("oversized curated asset is rejected", async () => { const pkg = copy(); const path = Object.keys(pkg.assets).find((entry) => entry.endsWith("report.md")); pkg.assets[path] = "x".repeat(2 * 1024 * 1024 + 1); await rejects(pkg, "ARTIFACT_TOO_LARGE"); });
test("absolute path in bundled artifact is rejected", async () => { const pkg = copy(); const path = Object.keys(pkg.assets).find((entry) => entry.endsWith("report.md")); pkg.assets[path] = "/Users/example/private"; await rejects(pkg, "PRIVATE_PATH_OR_SECRET_REJECTED"); });
test("unlisted bundled asset is rejected", async () => { const pkg = copy(); pkg.assets["assets/unlisted.json"] = "{}\n"; await rejects(pkg, "UNLISTED_CURATED_ASSET"); });
test("result state disagreement is rejected", async () => { const pkg = copy(); pkg.demonstrations[0].expected_state = "VERIFIED_FAIL"; await rejects(pkg, "RESULT_STATE_DISAGREEMENT"); });
test("receipt state disagreement is rejected", async () => { const pkg = copy(); pkg.demonstrations[0].receipt_verification_state = "INVALID"; await rejects(pkg, "RECEIPT_STATE_DISAGREEMENT"); });
test("INPUT_REJECTED fabricated result is rejected", async () => { const pkg = copy(); pkg.demonstrations[3].source_result_sha256 = "0".repeat(64); await rejects(pkg, "FABRICATED_RESULT_REJECTED"); });
test("curated mode ignores local verifier and artifact paths", async () => {
  const saved = [process.env.THE_EYE_RUNTIME_MODE, process.env.THE_EYE_LOCAL_ARTIFACT_ROOT, process.env.THE_EYE_A2_VERIFIER]; process.env.THE_EYE_RUNTIME_MODE = "CURATED_BUNDLED"; process.env.THE_EYE_LOCAL_ARTIFACT_ROOT = "/does/not/exist"; process.env.THE_EYE_A2_VERIFIER = "/does/not/exist";
  assert.equal((await loadRuntimeDemo("a3-pass-exact-id")).state, "VERIFIED_PASS"); for (const [key, value] of [["THE_EYE_RUNTIME_MODE", saved[0]], ["THE_EYE_LOCAL_ARTIFACT_ROOT", saved[1]], ["THE_EYE_A2_VERIFIER", saved[2]]]) restoreEnv(key, value);
});
test("curated mode performs no artifact network request", async () => { const original = globalThis.fetch; let calls = 0; globalThis.fetch = async () => { calls += 1; throw new Error("network forbidden"); }; assert.equal((await loadCuratedDemo("a3-pass-exact-id")).state, "VERIFIED_PASS"); globalThis.fetch = original; assert.equal(calls, 0); });
test("curated server has no filesystem, process, network, shell or caller-import primitive", async () => { const source = await readFile(new URL("../features/the-eye/curated-server.ts", import.meta.url), "utf8"); assert.doesNotMatch(source, /node:(?:fs|path|child_process)|spawn|execSync|fetch\s*\(|import\([^"']/); });
test("server error messages redact caller values", async () => { await assert.rejects(exportCuratedArtifact("/Users/private", "result"), (error) => !String(error).includes("/Users/private")); });
test("only valid bundled receipt can be presented", async () => { assert.equal((await verifyCuratedReceipt("a3-pass-exact-id", "valid")).state, "RECEIPT_VALID"); assert.equal((await verifyCuratedReceipt("a3-pass-exact-id", "invalid")).state, "RECEIPT_INVALID"); });
