import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("renders the accessible Phase I foundation shell", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /<title>NEXAHEDRON — The NEXAH Laboratory<\/title>/);
  assert.match(html, /<main id="main-content">/);
  assert.match(html, /Skip to the Laboratory/);
  assert.match(html, /The Orientation Layer/);
  assert.match(html, /Information already exists\. Orientation is what is missing\./);
  assert.match(html, /NEXAHEDRON/);
  assert.match(html, /The Orientation Laboratory/);
  assert.match(html, /first application where people can experience and interact with NEXAH/);
  assert.match(html, /Why orientation\?/);
  assert.match(html, /more systems producing answers/);
  assert.match(html, /What is still missing is orientation/);
  assert.match(html, /Not a search engine/);
  assert.match(html, /Not an encyclopedia/);
  assert.match(html, /Not an answer machine/);
  assert.match(html, /Bring what you have/);
  assert.match(html, /is called an Orientation Object/);
  assert.match(html, /Knowledge remains where it already exists/);
  assert.match(html, /NEXAH does not replace them/);
  assert.match(html, /href="https:\/\/nexah\.de"/);
  assert.match(html, /Choose how you would like to begin/);
  assert.match(html, /Wonder/);
  assert.match(html, /Understand/);
  assert.match(html, /Compare/);
  assert.match(html, /Connect/);
  assert.match(html, /Explore/);
  assert.match(html, /Build/);
  assert.match(html, /Reflect/);
  assert.match(html, /This review build completes one recorded/);
  assert.match(html, /No live ORION request is made/);
  assert.match(html, /data-testid="mode-understand"/);
  assert.match(html, /One Laboratory\. Distinct responsibilities\./);
  assert.match(html, /NEXAH/);
  assert.match(html, /ORION/);
  assert.match(html, /LYRA/);
  assert.match(html, /Library/);
  assert.match(html, /Human/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
  assert.doesNotMatch(html, /\bAI\b|assistant|chat interface/i);

  const narrative = [
    "The Orientation Layer",
    "Why orientation?",
    "Choose how you would like to begin.",
    "Bring what you have.",
    "Knowledge remains where it already exists.",
    "One Laboratory. Distinct responsibilities.",
  ].map((text) => html.indexOf(text));

  assert.ok(narrative.every((position) => position >= 0));
  assert.deepEqual(narrative, [...narrative].sort((left, right) => left - right));
});

test("defines keyboard focus and reduced-motion behavior", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(css, /:focus-visible/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /min-width:\s*280px/);
});

test("defines a distinct entrance for every Orientation Mode", async () => {
  const source = await readFile(
    new URL("../apps/web/src/OrientationLaboratory.tsx", import.meta.url),
    "utf8",
  );

  for (const question of [
    "What caught your attention?",
    "What would you like to understand?",
    "What would you like to compare?",
    "What would you like to connect?",
    "Where would you like to begin?",
    "What would you like to build?",
    "What would you like to reflect on?",
  ]) {
    assert.match(source, new RegExp(question.replace(/[?]/g, "\\?")));
  }

  assert.match(source, /secondaryLabel: "Second subject"/);
  assert.match(source, /secondaryLabel: "Second point"/);
  assert.match(source, /Examples for \{activeMode\.name\}/);
  assert.match(source, /mode-tone-\$\{mode\}/);
  assert.match(source, /A route becomes visible\./);
  assert.match(source, /Where would you like to continue\?/);
  assert.match(source, /Stay with the report/);
  assert.match(source, /Adjust the direction/);
  assert.match(source, /Revisit the material/);
  assert.doesNotMatch(source, /data-testid="end-from-report"/);
});
