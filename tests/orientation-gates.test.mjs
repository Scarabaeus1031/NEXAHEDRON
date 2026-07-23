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

test("offers six Human intentions that lead to existing editorial experiences", async () => {
  const response = await render("/");
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /Choose your way in/);
  assert.match(html, /Ways to begin orientation/);
  for (const gate of ["Wonder", "Compare", "Connect", "Verify", "Explore", "Learn"]) {
    assert.match(html, new RegExp(`>${gate}<`));
  }
  for (const destination of [
    "/explore#discovery",
    "/cases/plate-tectonics#case-05",
    "/explore#bridges",
    "/cases/what-is-evidence#case-06",
    "/library",
    "/cases/plate-tectonics",
  ]) {
    assert.match(html, new RegExp(`href="${destination}"`));
  }

  assert.doesNotMatch(html, /role="tab"|role="button"/);
});

test("provides stable landmarks for Wonder and Connect", async () => {
  const response = await render("/explore");
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /id="bridges"/);
  assert.match(html, /id="discovery"/);
});
