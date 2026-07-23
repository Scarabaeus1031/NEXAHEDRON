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

for (const [path, expected] of [
  ["/wonder", "Begin before you know the answer."],
  ["/object", "The material is still open."],
  ["/request", "The orientation is still taking shape."],
  ["/confirmation", "Your orientation has a shape."],
  ["/orientation", "Your preparation remains with you."],
]) {
  test(`renders a quiet structural reflection on ${path}`, async () => {
    const response = await render(path);
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.match(html, /Working reflection/);
    assert.match(html, new RegExp(expected.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    assert.match(html, /Nothing has been interpreted/);
  });
}

test("keeps Reflection presentation-only and free of execution behavior", async () => {
  const sources = await Promise.all([
    "../features/orientation/components/ReflectionMargin.tsx",
    "../features/orientation/components/JourneyReflection.tsx",
  ].map((path) => readFile(new URL(path, import.meta.url), "utf8")));
  const source = sources.join("\n");

  assert.doesNotMatch(source, /fetch\(|\/api\/|OrientationRequest|Gateway|Runtime|EvidenceReference/);
  assert.doesNotMatch(source, /possible themes|detected concepts|confidence/i);
});
