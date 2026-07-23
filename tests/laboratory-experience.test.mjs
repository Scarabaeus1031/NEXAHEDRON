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
  assert.match(html, /current Alpha preserves the reference only/);
  assert.match(html, /Your material/);
  assert.match(html, /No upload occurs/);
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
