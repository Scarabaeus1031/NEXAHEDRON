import assert from "node:assert/strict";
import test from "node:test";

async function render(path) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${path}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("makes the existing Laboratory journey the primary public action", async () => {
  const response = await render("/");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Begin an Orientation/);
  assert.match(html, /Begin Orientation/);
  assert.ok((html.match(/href="\/orient"/g) ?? []).length >= 3);
  assert.match(html, /Orientation Workspace/);
  assert.match(html, /Bring what you have/);
  assert.match(html, /Orientation begins with something you bring/);
  assert.match(html, /The current Laboratory entrance begins with Wonder or Understand/);
});

test("communicates possible starting material without simulating new workflows", async () => {
  const response = await render("/");
  assert.equal(response.status, 200);
  const html = await response.text();
  const visibleDocument = html.split("<body>")[1]?.split('<script id="_R_">')[0] ?? html;

  for (const startingPoint of [
    "a question",
    "an article",
    "a research paper",
    "a claim",
    "a source",
    "a relationship",
    "an observation",
    "a map",
    "a dataset",
    "an uncertainty",
  ]) {
    assert.match(html, new RegExp(`>${startingPoint}<`));
  }
  assert.doesNotMatch(visibleDocument, /chat interface|AI assistant|upload now/i);
});

test("keeps the Inquiry entrance visible across public pages", async () => {
  for (const path of ["/explore", "/cases", "/library", "/about"]) {
    const response = await render(path);
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.match(html, /href="\/orient"[^>]*>Begin Orientation/);
  }
});
