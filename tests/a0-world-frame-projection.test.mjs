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
