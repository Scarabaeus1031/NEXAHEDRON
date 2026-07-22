import assert from "node:assert/strict";
import test from "node:test";
import {
  initialAlphaJourneyState,
  reduceAlphaJourney,
  validateRequest,
} from "../features/orientation/state.ts";

function validObjectState() {
  let state = reduceAlphaJourney(initialAlphaJourneyState, { type: "BEGIN_UNDERSTAND" });
  state = reduceAlphaJourney(state, { type: "UPDATE_OBJECT", value: { title: "A working note", type: "Notes" } });
  return reduceAlphaJourney(state, { type: "COMPLETE_OBJECT" });
}

test("Wonder remains pre-session until the Human chooses Understand this", () => {
  let state = reduceAlphaJourney(initialAlphaJourneyState, { type: "BEGIN_WONDER" });
  assert.equal(state.step, "wonder");
  assert.equal(state.mode, null);
  state = reduceAlphaJourney(state, { type: "SAVE_WONDER", value: "  An unexpected pattern  " });
  assert.equal(state.step, "object");
  assert.equal(state.mode, "understand");
  assert.equal(state.wonder, "An unexpected pattern");
  assert.equal(state.object.type, "Observation");
});

test("Object Selection opens the Request Editor only with identity and type", () => {
  let state = reduceAlphaJourney(initialAlphaJourneyState, { type: "BEGIN_UNDERSTAND" });
  assert.equal(reduceAlphaJourney(state, { type: "COMPLETE_OBJECT" }), state);
  state = reduceAlphaJourney(state, { type: "UPDATE_OBJECT", value: { title: "A working note", type: "Notes" } });
  state = reduceAlphaJourney(state, { type: "COMPLETE_OBJECT" });
  assert.equal(state.step, "request");
});

test("local validation requires object, intention and one included scope", () => {
  let state = validObjectState();
  assert.deepEqual(validateRequest(state), { object: true, intention: false, scopeInclude: false, valid: false });

  state = reduceAlphaJourney(state, { type: "EDIT_REQUEST_FIELD", field: "intention", value: "Understand its central argument" });
  state = reduceAlphaJourney(state, { type: "EDIT_SCOPE_ITEM", field: "scopeInclude", index: 0, value: "The stated assumptions" });
  assert.deepEqual(validateRequest(state), { object: true, intention: true, scopeInclude: true, valid: true });
});

test("a valid request moves through Human review to prepared without execution", () => {
  let state = validObjectState();
  state = reduceAlphaJourney(state, { type: "EDIT_REQUEST_FIELD", field: "intention", value: "  Understand its central argument  " });
  state = reduceAlphaJourney(state, { type: "EDIT_SCOPE_ITEM", field: "scopeInclude", index: 0, value: "  The stated assumptions  " });
  state = reduceAlphaJourney(state, { type: "EDIT_SCOPE_ITEM", field: "scopeExclude", index: 0, value: "  Later implementation  " });
  state = reduceAlphaJourney(state, { type: "REVIEW_REQUEST" });
  assert.equal(state.step, "confirmation");
  assert.equal(state.request.intention, "Understand its central argument");
  assert.deepEqual(state.request.scopeInclude, ["The stated assumptions"]);

  state = reduceAlphaJourney(state, { type: "CONFIRM_REQUEST" });
  assert.equal(state.step, "prepared");
  assert.equal(state.request.depth, "Focused");
});

test("an incomplete request cannot be reviewed or prepared", () => {
  const state = validObjectState();
  assert.equal(reduceAlphaJourney(state, { type: "REVIEW_REQUEST" }), state);
  assert.equal(reduceAlphaJourney(state, { type: "CONFIRM_REQUEST" }), state);
});

test("Reset clears the complete local preparation", () => {
  let state = validObjectState();
  state = reduceAlphaJourney(state, { type: "EDIT_REQUEST_FIELD", field: "intention", value: "Understand it" });
  assert.deepEqual(reduceAlphaJourney(state, { type: "RESET" }), initialAlphaJourneyState);
});
