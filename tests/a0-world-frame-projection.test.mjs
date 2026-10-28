import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("recognizes the A0 foyer before and after Cloudflare index normalization", async () => {
  const source = await readFile(
    new URL("../components/layout/A0WorldFrame.tsx", import.meta.url),
    "utf8",
  );

  assert.match(source, /framePath\.endsWith\("\/index\.html"\)/);
  assert.match(source, /framePath\.endsWith\("\/a0-human\/start\/"\)/);
});

test("serves the Human View film from NEXAHEDRON instead of a remote NEXAH path", async () => {
  const source = await readFile(
    new URL("../components/layout/A0WorldFrame.tsx", import.meta.url),
    "utf8",
  );

  assert.match(source, /src="\/media\/framework-of-legibility\.mp4"/);
  assert.match(source, /poster="\/media\/framework-of-legibility-poster\.jpg"/);
  assert.doesNotMatch(source, /nexah\.de\/media\/framework-of-legibility/);
});
