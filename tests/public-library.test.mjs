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

test("Explore remains a contextual continuation beyond the primary Cases entrance", async () => {
  const response = await render("/explore");
  assert.equal(response.status, 200);
  const html = await response.text();

  for (const text of [
    "Continue through relationships, questions, and evidence.",
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

test("Cases open the curated foundational reference collection", async () => {
  const response = await render("/cases");
  assert.equal(response.status, 200);
  const html = await response.text();

  for (const title of [
    "Plate Tectonics",
    "What is Evidence?",
    "What is a Map?",
    "What is Scale?",
    "What is a Scientific Model?",
  ]) {
    assert.match(html, new RegExp(title.replace(/[?]/g, "\\?")));
  }
  assert.match(html, /Curated Reference Case/);
  assert.match(html, /Human and editorial authors/);
  assert.match(html, /See one possible orientation before entering the experiment\./);
  assert.doesNotMatch(html, /A future room/);
});

for (const foundationalCase of [
  ["/cases/what-is-evidence", "What is Evidence?"],
  ["/cases/what-is-a-map", "What is a Map?"],
  ["/cases/what-is-scale", "What is Scale?"],
  ["/cases/what-is-a-scientific-model", "What is a Scientific Model?"],
]) {
  test(`${foundationalCase[1]} follows the complete Curated Reference Case structure`, async () => {
    const response = await render(foundationalCase[0]);
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
      "Uncertainty",
      "Boundaries",
      "Unknowns",
      "Continuations",
      "Reflection",
    ]) {
      assert.match(html, new RegExp(section));
    }

    assert.match(html, /Curated Reference Case/);
    assert.match(html, /Human\/editorial-authored/);
    assert.match(html, /Inspect source/);
    assert.match(html, /This orientation supports/);
    assert.match(html, /It does not establish/);
    assert.match(html, /Choose a path—or stop here/);
    assert.match(html, /Case lineage/);
    assert.match(html, /How this orientation came into being/);
    assert.match(html, /Curated Reference Case v1\.0/);
    assert.match(html, /Evidence for the Case.+claims remains separate/);
  });
}

test("Plate Tectonics follows the Curated Reference Case hierarchy", async () => {
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
  assert.match(html, /Curated demonstration/);
  assert.match(html, /Public Website Experience Review · 2026/);
  assert.match(html, /USGS, NOAA, and NSF GAGE sources/);
  assert.match(html, /Curated Reference Case v1\.0/);
});

test("the stable library route presents a bounded local Reference Case map", async () => {
  const response = await render("/library");
  assert.equal(response.status, 200);
  const html = await response.text();

  for (const text of [
    "A local view of the curated collection.",
    "The first visible terrain.",
    "How to read this view",
    "Open room",
    "Frontier",
    "Collections as rooms",
    "A subject is only one way in.",
  ]) {
    assert.match(html, new RegExp(text));
  }
  assert.match(html, /not the canonical NEXAH Library/);
});

test("About introduces Orientation without exposing internal architecture", async () => {
  const response = await render("/about");
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /Information already exists\. Orientation is what is missing\./);
  assert.match(html, /NEXAH is a place for orientation\./);
  assert.match(html, /ORION makes structure inspectable\./);
  assert.match(html, /One person\. One question\. One bounded experiment\./);
  assert.match(html, /Finding is not the same as understanding\./);
  assert.match(html, /Human first/);
  assert.match(html, /Evidence before certainty/);
  const beginCase = html.indexOf("Begin with a Curated Reference Case");
  const bringQuestion = html.indexOf("Try the live experiment");
  const inspectImplementation = html.indexOf("Inspect the reference implementation");
  assert.ok(beginCase < bringQuestion && bringQuestion < inspectImplementation);
  const visibleDocument = html.split("<body>")[1].split('<script id="_R_">')[0];
  assert.doesNotMatch(visibleDocument, /Gateway|Runtime|public contract|provider/i);
});
