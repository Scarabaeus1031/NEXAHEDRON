import assert from "node:assert/strict";
import { mkdtemp, mkdir, readFile, symlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { THE_EYE_DEMO_IDS, THE_EYE_DEMOS } from "../features/the-eye/catalog.ts";
import { ArtifactBoundaryError, THE_EYE_MAX_ARTIFACT_BYTES, exportDemoArtifact, loadDemo, resolveArtifact, validateRelativeArtifactPath, verifyDemoReceipt } from "../features/the-eye/server.ts";

const artifactRoot = process.env.THE_EYE_LOCAL_ARTIFACT_ROOT;
const verifier = process.env.THE_EYE_A2_VERIFIER;
if (!artifactRoot || !verifier) throw new Error("A5 tests require THE_EYE_LOCAL_ARTIFACT_ROOT and THE_EYE_A2_VERIFIER");

const expected = {
  "a3-pass-exact-id": ["VERIFIED_PASS", "PASS", 0, 2, 0, 0, 0, 0],
  "a3-fail-explicit-mapping": ["VERIFIED_FAIL", "FAIL", 10, 1, 1, 1, 0, 2],
  "a3-hold-unavailable": ["VERIFIED_HOLD", "HOLD", 20, 0, 0, 0, 1, 1],
  "a3-input-rejected": ["INPUT_REJECTED", "INPUT_REJECTED", 30, 0, 0, 0, 0, 0],
  "a4-kernel-current-repeat": ["VERIFIED_PASS", "PASS", 0, 73, 0, 0, 0, 0],
  "a4-kernel-synthetic-change": ["VERIFIED_FAIL", "FAIL", 10, 1, 1, 0, 0, 1],
};

test("catalog exposes exactly six demonstration families", () => assert.deepEqual(THE_EYE_DEMO_IDS, Object.keys(expected)));
for (const id of THE_EYE_DEMO_IDS) {
  test(`actual server boundary verifies ${id}`, async () => {
    const envelope = await loadDemo(id, artifactRoot);
    const [state, outcome, exitCode, i, l, a, u, residuals] = expected[id];
    assert.equal(envelope.state, state);
    assert.equal(envelope.runtime?.outcome, outcome);
    assert.equal(envelope.runtime?.exit_code, exitCode);
    if (!envelope.projection) { assert.equal(state, "INPUT_REJECTED"); return; }
    assert.equal(envelope.projection.exitCode, exitCode);
    assert.equal(envelope.projection.ilau.invariant.length, i);
    assert.equal(envelope.projection.ilau.lost.length, l);
    assert.equal(envelope.projection.ilau.added.length, a);
    assert.equal(envelope.projection.ilau.unavailable.length, u);
    assert.equal(envelope.projection.residuals.length, residuals);
    assert.equal(envelope.projection.verification.status, "VALID");
    assert.equal(envelope.projection.outcome.mechanismStatus, "NOT_EVALUATED");
    assert.equal(envelope.projection.identity.canonicalResultSha256, envelope.runtime?.result_sha256);
  });
}

test("valid receipt is verified by A2", async () => assert.equal((await verifyDemoReceipt("a3-pass-exact-id", "valid", artifactRoot)).state, "RECEIPT_VALID"));
test("tampered receipt is rejected by A2", async () => assert.equal((await verifyDemoReceipt("a3-pass-exact-id", "invalid", artifactRoot)).state, "RECEIPT_INVALID"));
test("receipt is not projected for a demonstration without one", async () => assert.equal((await verifyDemoReceipt("a3-fail-explicit-mapping", "valid", artifactRoot)).reasonCode, "RECEIPT_NOT_ALLOWLISTED"));
test("unknown demonstration closes as invalid", async () => assert.equal((await loadDemo("not-allowlisted", artifactRoot)).reasonCode, "UNKNOWN_DEMO"));
test("missing local configuration has a distinct state", async () => {
  const previous = process.env.THE_EYE_LOCAL_ARTIFACT_ROOT;
  delete process.env.THE_EYE_LOCAL_ARTIFACT_ROOT;
  const state = (await loadDemo("a3-pass-exact-id")).state;
  process.env.THE_EYE_LOCAL_ARTIFACT_ROOT = previous;
  assert.equal(state, "LOCAL_CONFIGURATION_MISSING");
});

test("absolute paths are rejected", () => assert.throws(() => validateRelativeArtifactPath("/private/tmp/result.json"), (error) => error instanceof ArtifactBoundaryError && error.code === "ABSOLUTE_PATH_REJECTED"));
test("parent traversal is rejected", () => assert.throws(() => validateRelativeArtifactPath("a/../result.json"), (error) => error instanceof ArtifactBoundaryError && error.code === "PATH_TRAVERSAL_REJECTED"));
test("unsupported types are rejected", () => assert.throws(() => validateRelativeArtifactPath("result.exe"), (error) => error instanceof ArtifactBoundaryError && error.code === "UNSUPPORTED_ARTIFACT_TYPE"));
test("empty path segments are rejected", () => assert.throws(() => validateRelativeArtifactPath("a//result.json"), (error) => error instanceof ArtifactBoundaryError && error.code === "PATH_TRAVERSAL_REJECTED"));

test("missing artifacts close with an explicit code", async () => {
  const root = await mkdtemp(join(tmpdir(), "eye-missing-"));
  await assert.rejects(resolveArtifact(root, "missing.json"), (error) => error instanceof ArtifactBoundaryError && error.code === "ARTIFACT_MISSING");
});
test("oversized artifacts are rejected before reading", async () => {
  const root = await mkdtemp(join(tmpdir(), "eye-large-"));
  await writeFile(join(root, "large.json"), Buffer.alloc(THE_EYE_MAX_ARTIFACT_BYTES + 1));
  await assert.rejects(resolveArtifact(root, "large.json"), (error) => error instanceof ArtifactBoundaryError && error.code === "ARTIFACT_TOO_LARGE");
});
test("symlink escape is rejected after canonical resolution", async () => {
  const root = await mkdtemp(join(tmpdir(), "eye-root-"));
  const outside = await mkdtemp(join(tmpdir(), "eye-outside-"));
  await writeFile(join(outside, "result.json"), "{}");
  await symlink(join(outside, "result.json"), join(root, "escape.json"));
  await assert.rejects(resolveArtifact(root, "escape.json"), (error) => error instanceof ArtifactBoundaryError && error.code === "SYMLINK_ESCAPE_REJECTED");
});
test("directories are not accepted as artifacts", async () => {
  const root = await mkdtemp(join(tmpdir(), "eye-directory-"));
  await mkdir(join(root, "fake.json"));
  await assert.rejects(resolveArtifact(root, "fake.json"), (error) => error instanceof ArtifactBoundaryError && error.code === "UNSUPPORTED_ARTIFACT_TYPE");
});

test("A2 verifier unavailable becomes UNVERIFIED", async () => {
  const previous = process.env.THE_EYE_A2_VERIFIER;
  process.env.THE_EYE_A2_VERIFIER = "/private/tmp/no-such-eye-a2";
  const envelope = await loadDemo("a3-pass-exact-id", artifactRoot);
  process.env.THE_EYE_A2_VERIFIER = previous;
  assert.equal(envelope.state, "UNVERIFIED");
});
test("canonical JSON export preserves exact bytes", async () => {
  const exported = await exportDemoArtifact("a3-pass-exact-id", "result", artifactRoot);
  const original = await readFile(join(artifactRoot, THE_EYE_DEMOS["a3-pass-exact-id"].result));
  assert.deepEqual(exported.bytes, original);
});
test("Markdown export passes result-linked projection verification", async () => {
  const exported = await exportDemoArtifact("a3-fail-explicit-mapping", "report", artifactRoot);
  assert.match(exported.bytes.toString("utf8"), /Faithful projection of canonical JSON/);
});
test("arbitrary export kinds are rejected", async () => await assert.rejects(exportDemoArtifact("a3-pass-exact-id", "source", artifactRoot), (error) => error instanceof ArtifactBoundaryError && error.code === "EXPORT_NOT_ALLOWLISTED"));

test("the page declares every required view state", async () => {
  const source = await readFile(new URL("../features/the-eye/TheEyeResultView.tsx", import.meta.url), "utf8");
  for (const state of ["NO_RESULT_SELECTED","LOADING","VERIFIED_PASS","VERIFIED_FAIL","VERIFIED_HOLD","INPUT_REJECTED","RESULT_INVALID","RECEIPT_VALID","RECEIPT_INVALID","UNVERIFIED","LOCAL_CONFIGURATION_MISSING","STOPPED_BY_HUMAN"]) assert.match(source, new RegExp(state));
});
test("the page renders four named ILAU sections and zero counts", async () => {
  const source = await readFile(new URL("../features/the-eye/TheEyeResultView.tsx", import.meta.url), "utf8");
  for (const title of ["Invariant","Lost","Added","Unavailable","0 entries","Residual count: 0"]) assert.match(source, new RegExp(title));
});
test("mechanism status is visibly separate and uses exact nonclaim", async () => {
  const source = await readFile(new URL("../features/the-eye/TheEyeResultView.tsx", import.meta.url), "utf8");
  assert.match(source, /Mechanism status/); assert.match(source, /PASS DOES NOT ESTABLISH A MECHANISM/);
});
test("Human decision has a disabled unselected option", async () => {
  const source = await readFile(new URL("../features/the-eye/TheEyeResultView.tsx", import.meta.url), "utf8");
  assert.match(source, /select defaultValue=""/); assert.match(source, /option value="" disabled/);
});
test("STOP clears selection and creates no receipt", async () => {
  const source = await readFile(new URL("../features/the-eye/TheEyeResultView.tsx", import.meta.url), "utf8");
  assert.match(source, /function stop\(\).*setSelected\(""\).*setReceiptState\(null\)/s); assert.match(source, /No receipt was created/);
});
test("status uses accessible live announcement", async () => {
  const source = await readFile(new URL("../features/the-eye/TheEyeResultView.tsx", import.meta.url), "utf8");
  assert.match(source, /role="status"/); assert.match(source, /aria-live="polite"/); assert.match(source, /aria-atomic="true"/);
});
test("server exposes no client path parameter and only fixed demo identities", async () => {
  const source = await readFile(new URL("../app/api/the-eye/results/route.ts", import.meta.url), "utf8");
  assert.doesNotMatch(source, /searchParams\.get\("path"\)/); assert.match(source, /searchParams\.get\("demo"\)/);
});
test("server delegates verification and contains no comparator implementation", async () => {
  const source = await readFile(new URL("../features/the-eye/server.ts", import.meta.url), "utf8");
  assert.match(source, /invokeA2\("verify-result"/); assert.match(source, /invokeA2\("verify-receipt"/);
  assert.doesNotMatch(source, /function compare|function canonicalize|createHash|sha256\(/i);
});
test("UI contains no comparison or hash implementation", async () => {
  const source = await readFile(new URL("../features/the-eye/TheEyeResultView.tsx", import.meta.url), "utf8");
  assert.doesNotMatch(source, /createHash|crypto\.subtle|function compare|canonicalize/i);
});
test("responsive and reduced-motion CSS are present", async () => {
  const css = await readFile(new URL("../features/the-eye/TheEyeResultView.module.css", import.meta.url), "utf8");
  assert.match(css, /@media\(max-width:800px\)/); assert.match(css, /prefers-reduced-motion/);
});
test("the route is explicitly non-indexable", async () => {
  const page = await readFile(new URL("../app/the-eye/page.tsx", import.meta.url), "utf8");
  assert.match(page, /index: false/); assert.match(page, /follow: false/);
});
