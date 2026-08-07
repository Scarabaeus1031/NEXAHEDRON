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

test("gives the two executable Laboratory entrances visual priority", async () => {
  const response = await render("/orient");
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /Available ways to begin/);
  assert.match(html, /01 · Begin with curiosity/);
  assert.match(html, /02 · Begin with material/);
  assert.match(html, /Visible, but not yet open/);
  assert.equal((html.match(/class="laboratory-entrance /g) ?? []).length, 2);
  assert.equal((html.match(/class="later-mode"/g) ?? []).length, 5);
});

test("presents source references as one bounded part of Object Selection", async () => {
  const response = await render("/object");
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /Bring a reference/);
  assert.match(html, /reference remains with this local folio/);
  assert.match(html, /Material folio/);
  assert.match(html, /Human-held · local/);
  assert.match(html, /not read or uploaded/);
});

test("keeps one Workspace composition from Wonder through confirmation", async () => {
  for (const path of ["/wonder", "/object", "/request", "/confirmation"]) {
    const response = await render(path);
    assert.equal(response.status, 200);
    const html = await response.text();

    assert.match(html, /aria-label="Orientation workspace"/);
    assert.match(html, /class="workspace-table"/);
    assert.match(html, /Material folio/);
    assert.match(html, /Working reflection/);
    assert.doesNotMatch(html, /Alpha journey progress/);
  }
});

test("keeps the Question Anchor, Human reflection, uncertainty, and STOP boundary explicit", async () => {
  const response = await render("/wonder");
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /Question Anchor/);
  assert.match(html, /Human-authored · always visible/);
  assert.match(html, /Nothing moves forward without your action/);
  assert.match(html, /Working reflection/);

  const source = await import("node:fs/promises").then((fs) => fs.readFile(
    new URL("../features/orientation/screens/OrientationWorkspaceScreen.tsx", import.meta.url),
    "utf8",
  ));
  assert.match(source, /Uncertainty to preserve/);
  assert.match(source, /This remains Human-authored/);
  assert.match(source, /No evidence is attached/);
  assert.match(source, /Prepare for ORION/);
  assert.match(source, /Gateway, Runtime, contract, or evidence boundary/);
  assert.doesNotMatch(source, /fetch\(|invokeOrion|EvidenceReference/);
});

test("places one bounded real-source Encounter inside the existing Place operation", async () => {
  const workspaceSource = await import("node:fs/promises").then((fs) => fs.readFile(
    new URL("../features/orientation/screens/OrientationWorkspaceScreen.tsx", import.meta.url),
    "utf8",
  ));
  const encounterSource = await import("node:fs/promises").then((fs) => fs.readFile(
    new URL("../features/encounter/PlateTectonicsEncounter.tsx", import.meta.url),
    "utf8",
  ));

  assert.match(workspaceSource, /<PlateTectonicsEncounter \/>/);
  assert.match(encounterSource, /One real Encounter · Plate Tectonics/);
  assert.match(encounterSource, /Open source on this table/);
  assert.match(encounterSource, /Publication record · 1996/);
});

test("loads the dedicated Laboratory art direction after the public styles", async () => {
  const layout = await import("node:fs/promises").then((fs) => fs.readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"));
  const publicIndex = layout.indexOf("public-experience.css");
  const laboratoryIndex = layout.indexOf("laboratory-experience.css");
  assert.ok(publicIndex >= 0);
  assert.ok(laboratoryIndex > publicIndex);

  const css = await import("node:fs/promises").then((fs) => fs.readFile(new URL("../styles/laboratory-experience.css", import.meta.url), "utf8"));
  assert.match(css, /\.site-shell:not\(\.site-shell--public\)/);
  assert.match(css, /\.laboratory-entrances/);
  assert.match(css, /@media \(max-width: 700px\)/);
  assert.doesNotMatch(css, /@keyframes|animation:/);
});
