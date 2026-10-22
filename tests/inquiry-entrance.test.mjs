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
  assert.match(publicNavigation, /https:\/\/nexah\.de\//);
  assert.match(publicNavigation, /https:\/\/scarabaeus1033\.net\//);
  assert.match(publicNavigation, /brand\.href = a0StartUrl\.href/);
  assert.match(publicNavigation, /new URL\("\.\/", currentScriptUrl\)/);
  assert.doesNotMatch(publicNavigation, /brand\.href = "\/"/);
});

test("communicates the bounded A0 movement without simulating new workflows", async () => {
  const response = await render("/");
  assert.equal(response.status, 200);
  const html = await response.text();
  const sourceHome = await readFile(new URL("../public/a0-human/start/index.html", import.meta.url), "utf8");
  const humanBook = await readFile(new URL("../public/a0-human/instruments/A0_NEXAH_APERTURE_JOURNEY.html", import.meta.url), "utf8");

  for (const step of ["Körper drehen", "Anders sehen", "Eine Lücke finden", "Eine Welt verändern", "Spielen &amp; zurückkehren"]) {
    assert.match(humanBook, new RegExp(step));
  }
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
