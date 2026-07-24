import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import {
  createEncounterFragment,
  plateTectonicsSource,
} from "../features/encounter/plate-tectonics-source.ts";
import {
  initialAlphaJourneyState,
  reduceAlphaJourney,
} from "../features/orientation/state.ts";

test("resolves one exact Plate Tectonics source with identity, version and provenance", () => {
  assert.equal(plateTectonicsSource.sourceId, "usgs:publication:7000097");
  assert.equal(plateTectonicsSource.sourceVersion, "publication-record:7000097:1996-01-01");
  assert.equal(plateTectonicsSource.sourceTimestamp, "1996-01-01");
  assert.equal(plateTectonicsSource.representationType, "text/html");
  assert.match(plateTectonicsSource.canonicalUrl, /^https:\/\/www\.usgs\.gov\//);
  assert.equal(plateTectonicsSource.doi, "10.3133/7000097");
  assert.ok(plateTectonicsSource.provenance.length >= 3);
  assert.ok(Object.isFrozen(plateTectonicsSource));
  assert.ok(Object.isFrozen(plateTectonicsSource.blocks));
});

test("creates a fragment only when exact text and exact source coordinates agree", () => {
  const block = plateTectonicsSource.blocks[0];
  const exactText = block.text.slice(0, 62);
  const fragment = createEncounterFragment({
    blockId: block.blockId,
    startOffset: 0,
    endOffset: exactText.length,
    exactText,
  });

  assert.equal(fragment.exactText, exactText);
  assert.equal(fragment.sourceId, plateTectonicsSource.sourceId);
  assert.equal(fragment.sourceVersion, plateTectonicsSource.sourceVersion);
  assert.deepEqual(fragment.locator, {
    sectionId: "publication-description",
    blockId: "description-01",
    startOffset: 0,
    endOffset: exactText.length,
  });
  assert.ok(Object.isFrozen(fragment));
  assert.ok(Object.isFrozen(fragment.locator));

  assert.throws(
    () => createEncounterFragment({
      blockId: block.blockId,
      startOffset: 0,
      endOffset: exactText.length,
      exactText: "A detached paraphrase that is not in the source.",
    }),
    /does not match its source location/,
  );
});

test("keeps Encounter fragments and their relationship Human-held in Workspace state", () => {
  let state = reduceAlphaJourney(initialAlphaJourneyState, { type: "BEGIN_WONDER" });
  state = reduceAlphaJourney(state, { type: "SAVE_WONDER", value: "What is Plate Tectonics?" });
  state = reduceAlphaJourney(state, {
    type: "OPEN_ENCOUNTER_SOURCE",
    sourceId: plateTectonicsSource.sourceId,
    title: plateTectonicsSource.title,
    url: plateTectonicsSource.canonicalUrl,
  });

  assert.equal(state.workspace.encounter.sourceId, plateTectonicsSource.sourceId);
  assert.equal(state.object.title, plateTectonicsSource.title);
  assert.equal(state.object.type, "Research Paper");

  const block = plateTectonicsSource.blocks[1];
  const fragment = createEncounterFragment({
    blockId: block.blockId,
    startOffset: 0,
    endOffset: block.text.length,
    exactText: block.text,
  });
  state = reduceAlphaJourney(state, { type: "KEEP_ENCOUNTER_FRAGMENT", fragment });
  state = reduceAlphaJourney(state, { type: "KEEP_ENCOUNTER_FRAGMENT", fragment });
  assert.equal(state.workspace.encounter.fragments.length, 1);

  state = reduceAlphaJourney(state, {
    type: "EDIT_ENCOUNTER_RELATION",
    value: "Movement changes how the whole surface must be understood.",
  });
  assert.equal(
    state.workspace.encounter.fragmentRelation,
    "Movement changes how the whole surface must be understood.",
  );
  assert.equal(state.executionRequestId, null);
});

test("the Encounter component contains selection, provenance and return without interpretation", async () => {
  const source = await readFile(
    new URL("../features/encounter/PlateTectonicsEncounter.tsx", import.meta.url),
    "utf8",
  );

  assert.match(source, /Open source on this table/);
  assert.match(source, /Keep this fragment/);
  assert.match(source, /Keep paragraph/);
  assert.match(source, /Return to source/);
  assert.match(source, /Provenance/);
  assert.match(source, /Working fragments are not Evidence/);
  assert.doesNotMatch(source, /summarize|recommend|rank|infer meaning|invokeOrion|Gateway/i);
});
