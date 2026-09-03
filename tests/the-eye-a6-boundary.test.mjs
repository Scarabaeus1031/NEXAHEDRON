import assert from "node:assert/strict";
import test from "node:test";
import { THE_EYE_DEMO_IDS } from "../features/the-eye/catalog.ts";

process.env.THE_EYE_RUNTIME_MODE = "CURATED_BUNDLED";

async function request(path, init) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("a6", `${process.pid}-${Date.now()}-${Math.random()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request(`http://localhost${path}`, init), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
}

test("compiled curated page exposes boundary language without private paths", async () => {
  const response = await request("/the-eye");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /THE EYE/);
  assert.match(html, /NO_RESULT_SELECTED/);
  assert.doesNotMatch(html, /\/Users\/|\/private\/tmp/);
});

for (const demoId of THE_EYE_DEMO_IDS) test(`compiled curated route serves ${demoId}`, async () => {
  const response = await request(`/api/the-eye/results?demo=${demoId}`);
  assert.equal(response.status, 200);
  const envelope = await response.json();
  assert.equal(envelope.demoId, demoId);
  assert.equal(envelope.runtimeMode, "CURATED_BUNDLED");
  assert.equal(envelope.verificationStage, "VERIFIED_BEFORE_PACKAGING");
  assert.notEqual(envelope.state, "UNVERIFIED");
});

test("compiled curated receipt route never live-verifies tampered input", async () => {
  for (const [variant, expected] of [["valid", "RECEIPT_VALID"], ["invalid", "RECEIPT_INVALID"]]) {
    const response = await request("/api/the-eye/receipts", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ demo: "a3-pass-exact-id", variant }) });
    assert.equal((await response.json()).state, expected);
  }
});

test("compiled malformed receipt request fails closed without stack trace", async () => {
  const response = await request("/api/the-eye/receipts", { method: "POST", headers: { "content-type": "application/json" }, body: "{" });
  assert.equal(response.status, 422);
  const text = await response.text();
  assert.match(text, /RECEIPT_INVALID/);
  assert.doesNotMatch(text, /stack|\/Users\/|\/private\/tmp/i);
});

test("compiled curated export is fixed and rejects arbitrary kinds", async () => {
  const valid = await request("/api/the-eye/exports?demo=a3-pass-exact-id&kind=result");
  assert.equal(valid.status, 200);
  assert.match(valid.headers.get("content-type"), /application\/json/);
  const invalid = await request("/api/the-eye/exports?demo=a3-pass-exact-id&kind=source");
  assert.equal(invalid.status, 422);
});

test("compiled route rejects traversal IDs", async () => {
  const response = await request("/api/the-eye/results?demo=..%2F..%2Fetc%2Fpasswd");
  assert.equal(response.status, 422);
  assert.equal((await response.json()).state, "RESULT_INVALID");
});
