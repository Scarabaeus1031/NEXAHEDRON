import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("renders the accessible Phase I foundation shell", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /<title>NEXAHEDRON — The NEXAH Laboratory<\/title>/);
  assert.match(html, /<main id="main-content">/);
  assert.match(html, /Skip to the Laboratory/);
  assert.match(html, /Bring a question\. Find orientation\. Not answers\./);
  assert.match(html, /One Laboratory\. Distinct responsibilities\./);
  assert.match(html, /NEXAH/);
  assert.match(html, /ORION/);
  assert.match(html, /LYRA/);
  assert.match(html, /Library/);
  assert.match(html, /Human/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
  assert.doesNotMatch(html, /\bAI\b|assistant|chat|conversation|search engine/i);
});

test("defines keyboard focus and reduced-motion behavior", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(css, /:focus-visible/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /min-width:\s*320px/);
});
