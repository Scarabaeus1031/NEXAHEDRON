import assert from "node:assert/strict";
import test from "node:test";
import {
  initialAlphaJourneyState,
  reduceAlphaJourney,
} from "../features/orientation/state.ts";

test("Wonder remains pre-session until the Human chooses Understand this", () => {
  let state = reduceAlphaJourney(initialAlphaJourneyState, { type: "BEGIN_WONDER" });
  assert.equal(state.step, "wonder");
  assert.equal(state.mode, null);

  state = reduceAlphaJourney(state, { type: "SAVE_WONDER", value: "  An unexpected pattern  " });
  assert.equal(state.step, "object");
  assert.equal(state.mode, "understand");
  assert.equal(state.wonder, "An unexpected pattern");
  assert.equal(state.object.title, "An unexpected pattern");
  assert.equal(state.object.type, "Observation");
});

test("Understand enters Object Selection directly", () => {
  const state = reduceAlphaJourney(initialAlphaJourneyState, { type: "BEGIN_UNDERSTAND" });
  assert.equal(state.step, "object");
  assert.equal(state.entry, "understand");
  assert.equal(state.mode, "understand");
});

test("Object Selection completes only with title and type", () => {
  let state = reduceAlphaJourney(initialAlphaJourneyState, { type: "BEGIN_UNDERSTAND" });
  assert.equal(reduceAlphaJourney(state, { type: "COMPLETE_OBJECT" }), state);

  state = reduceAlphaJourney(state, { type: "UPDATE_OBJECT", value: { title: "A working note", type: "Notes" } });
  state = reduceAlphaJourney(state, { type: "COMPLETE_OBJECT" });
  assert.equal(state.step, "complete");
  assert.equal(reduceAlphaJourney(state, { type: "UPDATE_OBJECT", value: { title: "Changed" } }), state);

  state = reduceAlphaJourney(state, { type: "REVIEW_OBJECT" });
  assert.equal(state.step, "object");
});

test("Reset clears all local state", () => {
  let state = reduceAlphaJourney(initialAlphaJourneyState, { type: "BEGIN_WONDER" });
  state = reduceAlphaJourney(state, { type: "SAVE_WONDER", value: "A pattern" });
  state = reduceAlphaJourney(state, { type: "UPDATE_OBJECT", value: { url: "https://example.test" } });
  assert.deepEqual(reduceAlphaJourney(state, { type: "RESET" }), initialAlphaJourneyState);
});
