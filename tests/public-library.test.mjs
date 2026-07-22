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

test("Explore offers cases, foundations, bridges, and evidence-led entry points", async () => {
  const response = await render("/explore");
  assert.equal(response.status, 200);
  const html = await response.text();

  for (const text of [
    "Begin with what draws your attention.",
    "Featured case",
    "Foundations",
    "Bridges",
    "Browse by question",
    "Browse by evidence",
    "Random discovery",
  ]) {
    assert.match(html, new RegExp(text));
  }
  assert.match(html, /Plate Tectonics/);
  assert.doesNotMatch(html, /dashboard|news feed|trending/i);
});

test("Cases distinguish the canonical example from future rooms", async () => {
  const response = await render("/cases");
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /Plate Tectonics/);
  assert.match(html, /Canonical/);
  assert.match(html, /In preparation/);
  assert.match(html, /A future room/);
});

test("Plate Tectonics follows the canonical Orientation Case hierarchy", async () => {
  const response = await render("/cases/plate-tectonics");
  assert.equal(response.status, 200);
  const html = await response.text();

  for (const section of [
    "Human Intention",
    "Starting Orientation",
    "Subject",
    "Context",
    "Relationships",
    "Evidence",
    "Assumptions",
    "Unknowns &amp; Boundaries",
    "Continuations",
    "Reflection",
  ]) {
    assert.match(html, new RegExp(section));
  }
  assert.match(html, /U\.S\. Geological Survey/);
  assert.match(html, /NOAA Ocean Exploration/);
  assert.match(html, /NSF GAGE/);
  assert.match(html, /Inspect source/);
  assert.match(html, /Unknown is a valid position/);
});

test("Library presents an atlas with accessible rooms, paths, and frontiers", async () => {
  const response = await render("/library");
  assert.equal(response.status, 200);
  const html = await response.text();

  for (const text of [
    "A landscape, not a list.",
    "The first visible terrain.",
    "How to read this view",
    "Open room",
    "Frontier",
    "Collections as rooms",
    "A subject is only one way in.",
  ]) {
    assert.match(html, new RegExp(text));
  }
});

test("About introduces Orientation without exposing internal architecture", async () => {
  const response = await render("/about");
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /Information already exists\. Orientation is what is missing\./);
  assert.match(html, /Finding is not the same as understanding\./);
  assert.match(html, /Human first/);
  assert.match(html, /Evidence before certainty/);
  const visibleDocument = html.split("<body>")[1].split('<script id="_R_">')[0];
  assert.doesNotMatch(visibleDocument, /Gateway|Runtime|public contract|provider/i);
});
