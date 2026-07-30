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

test("offers six Human intentions that lead to existing editorial experiences", async () => {
  const response = await render("/");
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /Choose your way in/);
  assert.match(html, /Ways to begin orientation/);
  const narrativeOrder = ["Wonder", "Verify", "Learn", "Connect", "Compare", "Explore"];
  for (const gate of narrativeOrder) {
    assert.match(html, new RegExp(`>${gate}<`));
  }
  const gatesHtml = html.slice(html.indexOf('class="orientation-gates"'), html.indexOf('class="featured-entrance"'));
  const positions = narrativeOrder.map((gate) => gatesHtml.indexOf(`>${gate}<`));
  assert.deepEqual(positions, [...positions].sort((left, right) => left - right));
  for (const destination of [
    "/explore#discovery",
    "/cases/plate-tectonics",
    "/explore#bridges",
    "/cases/what-is-evidence",
    "/library",
  ]) {
    assert.match(html, new RegExp(`href="${destination}"`));
  }

  assert.doesNotMatch(html, /role="tab"|role="button"/);
  for (const kind of ["wonder", "verify", "learn", "connect", "compare", "explore"]) {
    assert.match(html, new RegExp(`orientation-gate__figure--${kind}`));
  }
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
