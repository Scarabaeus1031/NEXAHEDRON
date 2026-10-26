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

test("makes the source-bound A0 Human Book the primary public action", async () => {
  const response = await render("/");
  assert.equal(response.status, 200);
  const html = await response.text();
  const sourceHome = await readFile(new URL("../public/a0-human/start/index.html", import.meta.url), "utf8");
  const publicNavigation = await readFile(new URL("../public/a0-human/start/nexahedron-public-navigation.js", import.meta.url), "utf8");
  assert.match(html, /\/a0-human\/start\/index\.html/);
  assert.doesNotMatch(html, /href="\/orient"/);
  assert.match(html, /A0 Human View/);
  assert.match(sourceHome, /Welche Reise brauchst du gerade\?/);
  assert.match(sourceHome, /<h2 id="wegweiser-title">Wo beginne ich\?<\/h2>/);
  assert.match(sourceHome, /Pentagon Body Player · 3D/);
  assert.doesNotMatch(sourceHome, /href="A0_RESEARCH_DESK\.html/);
  assert.doesNotMatch(sourceHome, /SCIENCE_LAB\/NAVIGATION\/APP/);
  assert.match(publicNavigation, /A0_SCIENTIFIC_POSITION_REPORT\.html/);
  assert.match(publicNavigation, /A0_MATHEMATICAL_JOINTS\.html/);
  assert.match(publicNavigation, /https:\/\/www\.scarabaeus1033\.net\//);
  assert.match(publicNavigation, /current A0 interface remains the visual source/);
  assert.match(publicNavigation, /A0_WERKBANK\.html/);
});

test("communicates the bounded A0 movement without simulating new workflows", async () => {
  const response = await render("/");
  assert.equal(response.status, 200);
  const html = await response.text();
  const sourceHome = await readFile(new URL("../public/a0-human/start/index.html", import.meta.url), "utf8");
  const humanBook = await readFile(new URL("../public/a0-human/start/A0_NEXAH_APERTURE_JOURNEY.html", import.meta.url), "utf8");

  for (const step of ["RAINBOW LIGHT", "SEEING LIGHT", "UNDERSTANDING LIGHT", "Black Sun / Big Moon", "ONE PULSE", "THE LIVING INTERIOR", "THE WONDER OPERATOR"]) {
    assert.match(humanBook, new RegExp(step));
  }
  assert.match(humanBook, /A0_RAINBOW_PURPLE_RAIN\.html#prism/);
  assert.match(humanBook, /A0_NEWTON_GOETHE_OBSERVER_LENS\.html#lens/);
  assert.match(humanBook, /A0_BLACK_SUN_BIG_MOON\.html#eclipse/);
  assert.match(humanBook, /href="#light-crossroads">WÄHLE, WIE DU MIT LICHT WEITERGEHST/);
  assert.doesNotMatch(humanBook, /href="#look-again-room">MIT DEMSELBEN CARRIER WEITER/);
  assert.match(humanBook, /03 CURATED CONTINUATIONS/);
  assert.match(humanBook, /id="humanExperienceWindow" role="dialog"/);
  assert.match(humanBook, /data-experience-window/);
  assert.match(humanBook, /CLOSE &amp; RETURN/);
  assert.doesNotMatch(humanBook, /href="a0-public-arkade-index\.html#arkade"/);
  assert.match(sourceHome, /Human route/);
  assert.match(sourceHome, /Science route/);
  assert.match(sourceHome, /Builder route/);
  assert.match(html, /a0-source-home-frame/);
});

test("keeps legacy engines out of the public header", async () => {
  const response = await render("/");
  assert.equal(response.status, 200);
  const publicNavigation = await readFile(new URL("../public/a0-human/start/nexahedron-public-navigation.js", import.meta.url), "utf8");
  assert.doesNotMatch(publicNavigation, /\/(?:explore|cases|library|visitor-guide|orient|the-eye)(?:[\/#"])/);
  assert.doesNotMatch(publicNavigation, /Desk|Mission Control|NSN/i);
});
