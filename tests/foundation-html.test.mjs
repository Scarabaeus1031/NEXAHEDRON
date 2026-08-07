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

test("renders the public homepage as a bounded research-demonstrator entrance", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /<title>NEXAHEDRON — Orientation Research Demonstrator<\/title>/);
  assert.match(html, /<main id="main-content"/);
  assert.match(html, /Skip to main content/);
  assert.match(html, /Can a bounded process help a Human find their bearings\?/);
  assert.match(html, /Phase II · Bounded Public Workspace/);
  assert.match(html, /NEXAHEDRON makes that research question public/);
  assert.match(html, /What is this\?/);
  assert.match(html, /Why does it exist\?/);
  assert.match(html, /Where can I begin\?/);
  assert.match(html, /Enter through a case/);
  assert.match(html, /Primary navigation/);
  for (const destination of ["Home", "Cases", "Reference Cases", "About", "Visitor Guide", "GitHub"]) {
    assert.match(html, new RegExp(destination));
  }
  const primaryNavigation = html.slice(
    html.indexOf('aria-label="Primary navigation"'),
    html.indexOf("</nav>", html.indexOf('aria-label="Primary navigation"')),
  );
  assert.doesNotMatch(primaryNavigation, /href="\/explore"/);
  const visibleDocument = html
    .split("<body>")[1]
    .split('<script id="_R_">')[0];
  assert.doesNotMatch(visibleDocument, /\bAI\b|assistant|chat interface/i);
  assert.match(visibleDocument, /ORION is optional/);
});

test("renders the Version 1 visitor guide as the local demonstrator orientation layer", async () => {
  const response = await render("/visitor-guide");
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /<title>Visitor Guide — NEXAHEDRON<\/title>/);
  assert.match(html, /You are in a public research demonstrator/);
  assert.match(html, /Four places\. Four responsibilities\./);
  for (const place of ["nexah.de", "NEXAH", "ORION", "NEXAHEDRON"]) {
    assert.match(html, new RegExp(place));
  }
  assert.match(html, /You are here/);
  assert.match(html, /Try the live experiment/);
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

test("renders Human confirmation as the execution boundary", async () => {
  const response = await render("/confirmation");
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /Confirm what you are preparing\./);
  assert.match(html, /Material folio/);
  assert.match(html, /Human decision/);
  assert.match(html, /public Gateway/);
  assert.match(html, /Version/);
  assert.match(html, /Wonder note/);
  assert.match(html, /Begin Orientation/);
  const visibleDocument = html.split("<body>")[1].split('<script id="_R_">')[0];
  assert.doesNotMatch(visibleDocument, /Prepare Orientation Request|JSON|stack trace|provider/i);
});

test("renders the live session boundary without private implementation details", async () => {
  const response = await render("/orientation");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /No submitted request/);
  assert.match(html, /Return to confirmation/);

  const reportSource = await readFile(new URL("../features/orientation/components/ReportView.tsx", import.meta.url), "utf8");
  assert.match(reportSource, /Orientation is blocked at the evidence boundary/);
  assert.match(reportSource, /EvidencePanel/);
  assert.match(reportSource, /Assumptions/);
  assert.match(reportSource, /Uncertainties/);
  assert.match(reportSource, /Confidence/);
  assert.match(reportSource, /Validation/);
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
  assert.match(css, /:focus-visible/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /min-width:\s*280px/);
  assert.match(css, /@media \(max-width:\s*480px\)/);
  assert.match(publicCss, /\.public-footer nav\s*\{[^}]*flex-wrap:\s*wrap/s);
  assert.match(publicCss, /\.public-footer a\s*\{[^}]*min-height:\s*2\.75rem/s);
  assert.match(publicCss, /\.public-navigation a\s*\{[^}]*min-height:\s*2\.75rem/s);
});
