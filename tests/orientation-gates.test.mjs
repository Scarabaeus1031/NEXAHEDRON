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

test("preserves the earlier landing engine outside the public front door", async () => {
  const legacySource = await readFile(new URL("../features/orientation/screens/LandingScreen.tsx", import.meta.url), "utf8");
  const publicRoute = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");

  assert.match(legacySource, /export function LandingScreen/);
  assert.match(legacySource, /href="\/orient"/);
  assert.match(legacySource, /Reference cases remain available/);
  assert.doesNotMatch(publicRoute, /LandingScreen/);
  assert.match(publicRoute, /\/a0-human\/start\/index\.html/);
});

test("distinguishes Gate composition without animation", async () => {
  const css = await readFile(new URL("../styles/public-experience.css", import.meta.url), "utf8");
  const gateStyles = css.slice(css.indexOf(".orientation-gates"), css.indexOf(".featured-entrance"));

  for (const kind of ["wonder", "verify", "learn", "connect", "compare", "explore"]) {
    assert.match(gateStyles, new RegExp(`orientation-gate__figure--${kind}`));
  }
  assert.match(gateStyles, /grid-template-columns:\s*repeat\(12/);
  assert.doesNotMatch(gateStyles, /animation|transition/);
});

test("provides stable landmarks for Wonder and Connect", async () => {
  const response = await render("/explore");
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /id="bridges"/);
  assert.match(html, /id="discovery"/);
});
