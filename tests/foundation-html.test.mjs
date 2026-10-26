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

test("renders the public homepage as the bounded A0 Human View entrance", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  const html = await response.text();
  const sourceHome = await readFile(new URL("../public/a0-human/start/index.html", import.meta.url), "utf8");
  const publicNavigation = await readFile(new URL("../public/a0-human/start/nexahedron-public-navigation.js", import.meta.url), "utf8");
  const worldFrame = await readFile(new URL("../components/layout/A0WorldFrame.tsx", import.meta.url), "utf8");

  assert.match(html, /<title>NEXAHEDRON — A0 Human View<\/title>/);
  assert.match(html, /class="a0-source-home-shell"/);
  assert.match(html, /class="a0-source-host-header"/);
  assert.match(html, /class="a0-source-host-nav"/);
  for (const destination of ["Human View", "Arcade", "Club", "To NEXAH", "C Connect", "Scarabæus 1033"]) {
    assert.match(html, new RegExp(destination));
  }
  assert.match(html, /href="\/\?view=human"/);
  assert.match(html, /href="\/\?view=arcade"/);
  assert.match(html, /href="\/\?view=club"/);
  assert.doesNotMatch(html, />Visitor Guide<\/a>/);
  assert.match(html, /href="\/\?view=connect"/);
  assert.doesNotMatch(html, /a0-source-host-science/);
  assert.match(html, /https:\/\/www\.scarabaeus1033\.net\//);
  assert.match(html, /class="a0-source-home-main" id="main-content"/);
  assert.match(html, /class="a0-source-home-frame"/);
  assert.match(html, /src="\/a0-human\/start\/index\.html"/);
  assert.match(sourceHome, /Welche Reise brauchst du gerade\?/);
  assert.equal((sourceHome.match(/class="entry-route(?: |")/g) ?? []).length, 4);
  assert.match(sourceHome, /<h2 id="wegweiser-title">Wo beginne ich\?<\/h2>/);
  assert.match(sourceHome, /Grid → Operator → Anwendung/);
  assert.doesNotMatch(sourceHome, /href="A0_RESEARCH_DESK\.html/);
  assert.doesNotMatch(sourceHome, /SCIENCE_LAB\/NAVIGATION\/APP/);
  assert.match(sourceHome, /Eine Stimme wird zum Record\./);
  assert.match(sourceHome, /Acht Kapitel verfolgen den Weg eines Ergebnisses\./);
  assert.match(sourceHome, /nexahedron-public-navigation\.js/);
  for (const destination of ["Human", "Science", "Builder", "Werkbank", "Übersicht"]) {
    assert.match(publicNavigation, new RegExp(destination));
  }
  assert.match(publicNavigation, /A0_SCIENTIFIC_POSITION_REPORT\.html/);
  assert.match(publicNavigation, /A0_MATHEMATICAL_JOINTS\.html/);
  assert.match(publicNavigation, /https:\/\/www\.scarabaeus1033\.net\//);
  assert.match(publicNavigation, /Scarabæus 1033 · Werkstatt öffnen/);
  assert.match(worldFrame, /dataset\.nexahedronProjection = isFoyer \? "foyer" : "experience"/);
  assert.match(worldFrame, /Weitere Räume erscheinen erst nach dem Return/);
  assert.match(worldFrame, /Human View starten →/);
  assert.match(worldFrame, /#top > :not\(#built-world\)/);
  assert.match(worldFrame, /\.world-room:not\(\.world-room--human\)/);
  assert.match(worldFrame, /\.world-plate-return/);
  assert.match(worldFrame, /body > footer/);
  assert.match(worldFrame, /\.human-stage-fold--machina/);
  assert.match(worldFrame, /onLoad=/);
  assert.doesNotMatch(publicNavigation, /Desk|Mission Control|NSN|Research Backlog/i);
});

test("opens the existing public Connect surface without creating a second shell", async () => {
  const response = await render("/?view=connect");
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /class="a0-source-host-header"/);
  assert.match(html, /src="\/a0-human\/start\/NEXAH_C_CONNECT\.html"/);

  const connect = await readFile(new URL("../public/a0-human/start/NEXAH_C_CONNECT.html", import.meta.url), "utf8");
  assert.match(connect, /<strong id="readoutTitle">One constellation\.<\/strong>/);
  assert.match(connect, /DIFFERENT RESPONSIBILITIES · EXPLICIT RETURNS/);
  assert.equal((connect.match(/data-lens="(?:human|science|builder)"/g) ?? []).length, 3);
  assert.match(connect, /data-lens-panel="science" hidden/);
  assert.match(connect, /data-lens-panel="human" hidden/);
  assert.match(connect, /data-lens-panel="builder" hidden/);
});

test("renders the Version 1 visitor guide as the local demonstrator orientation layer", async () => {
  const response = await render("/visitor-guide");
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /<title>Visitor Guide — NEXAHEDRON<\/title>/);
  assert.match(html, /When should I enter the A0 Human View\?/);
  assert.match(html, /A0 Human View/);
  assert.match(html, /Good for/);
  assert.match(html, /Not designed for/);
  assert.match(html, /Rest is already a complete outcome/);
  assert.match(html, /You remain responsible for understanding, judgment and decisions/);
  assert.match(html, /Four places\. Four responsibilities\./);
  for (const place of ["nexah.de", "NEXAH", "ORION", "NEXAHEDRON"]) {
    assert.match(html, new RegExp(place));
  }
  assert.match(html, /You are here/);
  assert.match(html, /Enter the Human View/);
  assert.match(html, /Working Session Record/);
  assert.match(html, /Reloading or closing the page loses/);
});

test("renders maintained public operational routes", async () => {
  for (const [path, expected] of [
    ["/contact", "Reach the responsible place"],
    ["/imprint", "Canonical provider information"],
    ["/privacy", "Hosting and technical logs"],
    ["/accessibility", "Report a barrier"],
  ]) {
    const response = await render(path);
    assert.equal(response.status, 200);
    assert.match(await response.text(), new RegExp(expected));
  }
});

test("renders two entrances into one canonical Phase II Workspace", async () => {
  const response = await render("/orient");
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /Choose how you would like to enter the Workspace\./);
  assert.match(html, /What this experiment holds—and where it stops\./);
  assert.match(html, /browser memory only/);
  assert.match(html, /Rest without invoking ORION/);
  assert.match(html, /Begin with Wonder/);
  assert.match(html, /Choose Understand/);
  assert.match(html, /Anchor → Place → Attend → Relate → Bound → Turn → Reflect → Rest/);
  assert.match(html, /Additional orientation modes remain outside the bounded Phase II release/);
  assert.equal((html.match(/>Available</g) ?? []).length, 1);
  assert.equal((html.match(/>Later</g) ?? []).length, 0);
  assert.doesNotMatch(html, /Alpha journey progress/);
});

test("renders the complete local Orientation Session without crossing the execution boundary", async () => {
  const response = await render("/wonder");
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /Your material stays on one table\./);
  for (const operation of ["Anchor", "Place", "Attend", "Relate", "Bound", "Turn", "Reflect", "Rest"]) {
    assert.match(html, new RegExp(operation));
  }
  assert.match(html, /Question Anchor/);
  assert.match(html, /What are you trying to orient\?/);
  assert.match(html, /<textarea/);
  assert.match(html, /Place this on the table/);
  assert.match(html, /Nothing crosses the ORION boundary until you review and confirm it/);
});

test("renders Object Selection without crossing the upload boundary", async () => {
  const response = await render("/object");
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /What would you like to orient\?/);
  assert.match(html, /Object title/);
  assert.match(html, /Object type/);
  assert.match(html, /URL/);
  assert.match(html, /Local file reference/);
  assert.match(html, /Material folio/);
  assert.match(html, /Human-held · local/);
  assert.match(html, /Continue/);
  assert.match(html, /not read or uploaded/);
  assert.doesNotMatch(html, /Preview/);
});

test("renders a structured Request Editor with immediate local validation", async () => {
  const response = await render("/request");
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /Define your orientation request\./);
  assert.match(html, /Material folio/);
  assert.match(html, /Human-authored orientation/);
  assert.match(html, /Intention/);
  assert.match(html, /Focus/);
  assert.match(html, /Success Boundary/);
  assert.match(html, /Scope Include/);
  assert.match(html, /Scope Exclude/);
  assert.match(html, /Overview/);
  assert.match(html, /Focused/);
  assert.match(html, /Deep/);
  assert.match(html, /Effects/);
  assert.match(html, />none</);
  assert.match(html, /Complete the required fields/);
  assert.doesNotMatch(html, /prompt field|message history|Begin Orientation/i);
});

test("guards direct confirmation while preserving the explicit Human boundary", async () => {
  const response = await render("/confirmation");
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /No prepared request/);
  assert.match(html, /Return to the Phase II Workspace/);
  assert.match(html, /only after a Human-held session reaches Rest/);

  const confirmationSource = await readFile(new URL("../features/orientation/screens/ConfirmationScreen.tsx", import.meta.url), "utf8");
  assert.match(confirmationSource, /Confirm what you are preparing/);
  assert.match(confirmationSource, /Human decision/);
  assert.match(confirmationSource, /Begin Orientation/);
  assert.doesNotMatch(confirmationSource, /Prepare Orientation Request|JSON|stack trace|provider/i);
});

test("renders the live session boundary without private implementation details", async () => {
  const response = await render("/orientation");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /No submitted request/);
  assert.match(html, /Return to confirmation/);
  assert.match(html, /Open the Phase II Workspace/);

  const reportSource = await readFile(new URL("../features/orientation/components/ReportView.tsx", import.meta.url), "utf8");
  assert.match(reportSource, /Orientation is blocked at the evidence boundary/);
  assert.match(reportSource, /EvidencePanel/);
  assert.match(reportSource, /Assumptions/);
  assert.match(reportSource, /Uncertainties/);
  assert.match(reportSource, /Confidence/);
  assert.match(reportSource, /Validation/);
  assert.match(reportSource, /Return to Working Session Record/);
  assert.match(reportSource, /onRest/);
  assert.doesNotMatch(reportSource, /stack|provider|prompt|reasoning trace/i);

  const boundarySource = await readFile(new URL("../features/orientation/components/BoundaryFailureView.tsx", import.meta.url), "utf8");
  for (const category of ["transport_failure", "gateway_failure", "contract_violation", "invalid_public_response", "unsupported_contract_version"]) assert.match(boundarySource, new RegExp(category));
  assert.match(boundarySource, /Return to Working Session Record/);

  const boundarySummary = await readFile(new URL("../features/orientation/components/OrionBoundarySummary.tsx", import.meta.url), "utf8");
  for (const layer of ["Certified Core", "Runtime", "Gateway", "Observed outcome", "Producer", "Contract type"]) {
    assert.match(boundarySummary, new RegExp(layer));
  }
});

test("defines visible focus, responsive layout and reduced motion", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  const publicCss = await readFile(new URL("../styles/public-experience.css", import.meta.url), "utf8");
  const humanCss = await readFile(new URL("../styles/a0-human-view.css", import.meta.url), "utf8");
  assert.match(css, /:focus-visible/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /min-width:\s*280px/);
  assert.match(css, /@media \(max-width:\s*480px\)/);
  assert.match(publicCss, /\.public-footer nav\s*\{[^}]*flex-wrap:\s*wrap/s);
  assert.match(publicCss, /\.public-footer a\s*\{[^}]*min-height:\s*2\.75rem/s);
  assert.match(publicCss, /\.public-navigation a\s*\{[^}]*min-height:\s*2\.75rem/s);
  assert.match(publicCss, /prefers-reduced-motion:\s*reduce[\s\S]*\.living-workspace__question[\s\S]*animation:\s*none/);
  assert.doesNotMatch(publicCss, /\.living-workspace[^}]*animation:[^;]*infinite/s);
  assert.match(humanCss, /prefers-reduced-motion:\s*reduce/);
  assert.match(humanCss, /@media\s*\(max-width:\s*620px\)/);
});
