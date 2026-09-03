import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import test from "node:test";
import { THE_EYE_DEMO_IDS, THE_EYE_DEMOS } from "../features/the-eye/catalog.ts";

const artifactRoot = process.env.THE_EYE_LOCAL_ARTIFACT_ROOT;
if (!artifactRoot || !process.env.THE_EYE_A2_VERIFIER) throw new Error("A5 boundary tests require local artifact and verifier configuration");

async function request(path, init) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${Math.random()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request(`http://localhost${path}`, init), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
}

test("/the-eye renders within the existing shell without private paths", async () => {
  const response = await request("/the-eye");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /THE EYE/); assert.match(html, /NO_RESULT_SELECTED/); assert.match(html, /STOP/);
  assert.doesNotMatch(html, /\/Users\/|\/private\/tmp/);
  assert.doesNotMatch(html, /Alpha journey progress/);
});

for (const demoId of THE_EYE_DEMO_IDS) {
  test(`/api/the-eye/results projects ${demoId} through the compiled boundary`, async () => {
    const response = await request(`/api/the-eye/results?demo=${demoId}`);
    assert.ok([200, 422].includes(response.status));
    const envelope = await response.json();
    assert.equal(envelope.demoId, demoId);
    assert.notEqual(envelope.state, "UNVERIFIED");
    if (envelope.projection) {
      assert.equal(envelope.projection.outcome.decision, envelope.runtime.outcome);
      assert.equal(envelope.projection.identity.canonicalResultSha256, envelope.runtime.result_sha256);
    } else assert.equal(envelope.state, "INPUT_REJECTED");
  });
}

test("compiled receipt boundary distinguishes valid and invalid", async () => {
  for (const [variant, expected] of [["valid", "RECEIPT_VALID"], ["invalid", "RECEIPT_INVALID"]]) {
    const response = await request("/api/the-eye/receipts", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ demo: "a3-pass-exact-id", variant }) });
    assert.equal((await response.json()).state, expected);
  }
});

test("compiled export boundary is byte-faithful", async () => {
  const response = await request("/api/the-eye/exports?demo=a3-pass-exact-id&kind=result");
  assert.equal(response.status, 200);
  const original = await readFile(join(artifactRoot, THE_EYE_DEMOS["a3-pass-exact-id"].result));
  assert.deepEqual(Buffer.from(await response.arrayBuffer()), original);
});
