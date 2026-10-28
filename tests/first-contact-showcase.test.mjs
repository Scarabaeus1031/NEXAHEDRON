import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("keeps the foyer compact and opens the existing Living Interior public projection", async () => {
  const worldFrame = await readFile(new URL("../components/layout/A0WorldFrame.tsx", import.meta.url), "utf8");
  const styles = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  const sourceManifest = JSON.parse(await readFile(new URL("../public/a0-human/SOURCE_MANIFEST.json", import.meta.url), "utf8"));

  assert.match(worldFrame, /id: "interior", number: "02", label: "Eintauchen", title: "The Living Interior"/);
  assert.doesNotMatch(worldFrame, /id: "record"/);
  assert.match(worldFrame, /src="\/a0-human\/start\/A0_THE_LIVING_INTERIOR\.html#passage"/);
  assert.match(worldFrame, /className="nexahedron-record-feature" id="record-player"/);
  assert.match(worldFrame, /Eine Stimme wird zum Record\./);
  assert.match(worldFrame, /nexah_roedelheim_record_play\.glb/);
  assert.match(worldFrame, /header\.top, main > :not\(\.portal\), body > footer, \.scroll-cue/);
  assert.match(worldFrame, /main > :not\(\.portal\)/);
  assert.match(worldFrame, /useState<ShowcaseId \| null>\(null\)/);
  assert.match(worldFrame, /scrollIntoView\(\{ behavior: "auto", block: "start" \}\)/);
  assert.match(styles, /height: clamp\(34rem, 72svh, 40rem\)/);

  const livingInteriorBinding = sourceManifest.files.find((entry) => entry.bundle_path === "start/A0_THE_LIVING_INTERIOR.html");
  assert.equal(livingInteriorBinding?.treatment, "PUBLIC_PRESENTATION_TRANSFORM");
});
