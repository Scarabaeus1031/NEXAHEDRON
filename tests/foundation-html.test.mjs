import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${path}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("renders the public homepage as a quiet entrance to Orientation Cases", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /<title>NEXAHEDRON — The Orientation Laboratory<\/title>/);
  assert.match(html, /<main id="main-content"/);
  assert.match(html, /Skip to main content/);
  assert.match(html, /Find your bearings\./);
  assert.match(html, /NEXAHEDRON helps people orient themselves across existing knowledge\./);
  assert.match(html, /What is this\?/);
  assert.match(html, /Why does it exist\?/);
  assert.match(html, /Where can I begin\?/);
  assert.match(html, /Enter through a case/);
  assert.match(html, /Primary navigation/);
  for (const destination of ["Home", "Explore", "Cases", "Library", "About", "GitHub"]) {
    assert.match(html, new RegExp(destination));
  }
  const visibleDocument = html
    .split("<body>")[1]
    .split('<script id="_R_">')[0];
  assert.doesNotMatch(visibleDocument, /ORION|Gateway|Runtime|\bAI\b|assistant|chat interface/i);
});

test("renders one available mode and marks the remaining modes as Later", async () => {
  const response = await render("/orient");
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /Choose how you would like to begin\./);
  assert.match(html, /Begin with Wonder/);
  assert.match(html, /Choose Understand/);
  for (const mode of ["Compare", "Connect", "Explore", "Build", "Reflect"]) assert.match(html, new RegExp(mode));
  assert.equal((html.match(/>Available</g) ?? []).length, 1);
  assert.equal((html.match(/>Later</g) ?? []).length, 5);
});

test("renders the local Wonder capture without an execution boundary", async () => {
  const response = await render("/wonder");
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /What caught your attention\?/);
  assert.match(html, /<textarea/);
  assert.match(html, /Understand this/);
  assert.match(html, /local application state/);
  assert.match(html, /Nothing is sent to ORION/);
});

test("renders Object Selection without crossing the upload boundary", async () => {
  const response = await render("/object");
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /What would you like to orient\?/);
  assert.match(html, /Object title/);
  assert.match(html, /Object type/);
  assert.match(html, /URL/);
  assert.match(html, /Uploaded file/);
  assert.match(html, /Preview/);
  assert.match(html, /Continue/);
  assert.match(html, /No upload occurs/);
});

test("renders a structured Request Editor with immediate local validation", async () => {
  const response = await render("/request");
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /Define your orientation request\./);
  assert.match(html, /Selected Orientation Object/);
  assert.match(html, /Intention/);
  assert.match(html, /Focus/);
  assert.match(html, /Success Boundary/);
  assert.match(html, /Scope Include/);
  assert.match(html, /Scope Exclude/);
  assert.match(html, /Overview/);
  assert.match(html, /Focused/);
  assert.match(html, /Deep/);
  assert.match(html, /Live Request Summary/);
  assert.match(html, /Effects/);
  assert.match(html, />none</);
  assert.match(html, /Complete the required fields/);
  assert.doesNotMatch(html, /prompt field|message history|Begin Orientation/i);
});

test("renders Human confirmation without exposing execution", async () => {
  const response = await render("/confirmation");
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /Confirm what you are preparing\./);
  assert.match(html, /Orientation Object/);
  assert.match(html, /Version/);
  assert.match(html, /Wonder note/);
  assert.match(html, /Prepare Orientation Request/);
  assert.doesNotMatch(html, /Begin Orientation|JSON|Report|Evidence|Continuation/i);
});

test("defines visible focus, responsive layout and reduced motion", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(css, /:focus-visible/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /min-width:\s*280px/);
  assert.match(css, /@media \(max-width:\s*480px\)/);
});
