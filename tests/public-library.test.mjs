import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
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
    "Featured continuation",
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

test("the stable library route presents books, film and the bounded local Reference Case map", async () => {
  const response = await render("/library");
  assert.equal(response.status, 200);
  const html = await response.text();

  for (const text of [
    "Read, watch, and follow a question further.",
    "One field. More than one medium.",
    "BEYOND INFORMATION",
    "THE WONDER OPERATOR",
    "THE OPERATOR’S HANDBOOK",
    "Framework of Legibility",
    "The first visible terrain.",
    "How to read this view",
    "Open room",
    "Frontier",
    "Collections as rooms",
    "A subject is only one way in.",
  ]) {
    assert.match(html, new RegExp(text));
  }
  assert.match(html, /publication authority stay with the NEXAH Library/);
  assert.match(html, /https:\/\/nexah\.de\/media\/framework-of-legibility\.mp4/);
  for (const href of [
    "https://nexah.de/library/beyond-information/",
    "https://nexah.de/library/wonder-operator/",
    "https://nexah.de/library/operators-handbook/",
  ]) {
    assert.ok(html.includes(`href="${href}"`), `missing Library link: ${href}`);
  }
});

test("About positions the A0 Human View without exposing internal architecture", async () => {
  const response = await render("/about");
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /Experience the world\./);
  assert.match(html, /Then meet the method\./);
  assert.match(html, /The room ends\./);
  assert.match(html, /The field opens\./);
  assert.match(html, /THERE · ORIENTATION/);
  assert.match(html, /class="about-roles__field"/);
  assert.match(html, /ELSEWHERE · WORKSHOP/);
  assert.match(html, /SCARABÆUS/);
  assert.match(html, /Three doors into NEXAH/);
  assert.match(html, /NEXAHEDRON ist die A0 Human View/);
  assert.match(html, /Dies ist weder ein Wechsel der Zuständigkeit noch ein zweites System/);
  assert.match(html, /Keine einzelne Tür beansprucht das Ganze/);
  assert.match(html, /Unterscheidung zwischen Erfahrung und Quelle/);
  for (const door of ["Visitor Guide", "Method &amp; context", "Science Lab"]) {
    assert.match(html, new RegExp(door));
  }
  assert.match(html, /https:\/\/nexah\.de\/visitor-guide\//);
  assert.match(html, /Return to NEXAHEDRON/);
  const visibleDocument = html.split("<body>")[1].split('<script id="_R_">')[0];
  assert.doesNotMatch(visibleDocument, /Gateway|Runtime|public contract|provider/i);
});

test("About NEXAHEDRON explains the Human View, its rooms and the return to NEXAH", async () => {
  const response = await render("/about-nexahedron");
  assert.equal(response.status, 200);
  const html = await response.text();
  const publicHeader = await readFile(new URL("../components/layout/PublicHeader.tsx", import.meta.url), "utf8");

  assert.match(html, /Erst erleben\./);
  assert.match(html, /Dann einordnen\./);
  assert.match(html, /Zwei Maßstäbe\./);
  assert.match(html, /Eine klare Rückbindung\./);
  for (const room of ["Human View", "Arcade", "Club", "C Connect"]) {
    assert.match(html, new RegExp(room));
  }
  assert.match(html, /LIBRARY · VORGEMERKT/);
  assert.match(html, /keine behauptete aktive Integration/);
  assert.match(html, /To NEXAH/);
  assert.doesNotMatch(html, /Die Räume verstehen/);
  assert.doesNotMatch(publicHeader, /href="\/about-nexahedron"/);
  const visibleDocument = html.split("<body>")[1].split('<script id="_R_">')[0];
  assert.doesNotMatch(visibleDocument, /Library adapter|Gateway|Runtime|public contract|provider/i);
});
