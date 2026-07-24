import assert from "node:assert/strict";
import test from "node:test";
import {
  initialAlphaJourneyState,
  reduceAlphaJourney,
  validateRequest,
  validateWorkspaceOperation,
} from "../features/orientation/state.ts";

function validObjectState() {
  let state = reduceAlphaJourney(initialAlphaJourneyState, { type: "BEGIN_UNDERSTAND" });
  state = reduceAlphaJourney(state, { type: "UPDATE_OBJECT", value: { title: "A working note", type: "Notes" } });
  return reduceAlphaJourney(state, { type: "COMPLETE_OBJECT" });
}

test("the Question Anchor remains Human-owned as the session opens on the same table", () => {
  let state = reduceAlphaJourney(initialAlphaJourneyState, { type: "BEGIN_WONDER" });
  assert.equal(state.step, "wonder");
  assert.equal(state.mode, null);
  state = reduceAlphaJourney(state, { type: "SAVE_WONDER", value: "  An unexpected pattern  " });
  assert.equal(state.step, "wonder");
  assert.equal(state.mode, "understand");
  assert.equal(state.workspace.operation, "place");
  assert.equal(state.wonder, "An unexpected pattern");
  assert.equal(state.object.type, "Observation");
});

test("the canonical Orientation Session completes Anchor through Rest without crossing into ORION", () => {
  let state = reduceAlphaJourney(initialAlphaJourneyState, { type: "BEGIN_WONDER" });
  state = reduceAlphaJourney(state, { type: "SAVE_WONDER", value: "Why do two maps lead to different conclusions?" });
  assert.equal(validateWorkspaceOperation(state, "anchor"), true);

  state = reduceAlphaJourney(state, { type: "UPDATE_OBJECT", value: { title: "Two maps of one place", type: "Image" } });
  assert.equal(validateWorkspaceOperation(state, "place"), true);
  state = reduceAlphaJourney(state, { type: "SET_WORKSPACE_OPERATION", operation: "attend" });

  state = reduceAlphaJourney(state, { type: "EDIT_REQUEST_FIELD", field: "intention", value: "Understand what each map makes visible" });
  assert.equal(validateWorkspaceOperation(state, "attend"), true);
  state = reduceAlphaJourney(state, { type: "SET_WORKSPACE_OPERATION", operation: "relate" });

  state = reduceAlphaJourney(state, { type: "EDIT_WORKSPACE_NOTE", field: "relation", value: "Both represent the same place through different choices" });
  assert.equal(validateWorkspaceOperation(state, "relate"), true);
  state = reduceAlphaJourney(state, { type: "SET_WORKSPACE_OPERATION", operation: "bound" });

  state = reduceAlphaJourney(state, { type: "EDIT_SCOPE_ITEM", field: "scopeInclude", index: 0, value: "Scale and selection" });
  state = reduceAlphaJourney(state, { type: "EDIT_WORKSPACE_NOTE", field: "uncertainty", value: "The source data is not yet known" });
  assert.equal(validateWorkspaceOperation(state, "bound"), true);
  state = reduceAlphaJourney(state, { type: "SET_WORKSPACE_OPERATION", operation: "turn" });

  state = reduceAlphaJourney(state, { type: "EDIT_WORKSPACE_NOTE", field: "turn", value: "At neighborhood scale the differences become local" });
  assert.equal(validateWorkspaceOperation(state, "turn"), true);
  state = reduceAlphaJourney(state, { type: "SET_WORKSPACE_OPERATION", operation: "reflect" });

  state = reduceAlphaJourney(state, { type: "EDIT_WORKSPACE_NOTE", field: "reflection", value: "A map is an argument about attention as well as a location" });
  state = reduceAlphaJourney(state, { type: "REST_SESSION" });

  assert.equal(state.workspace.operation, "rest");
  assert.equal(state.workspace.rested, true);
  assert.equal(state.step, "wonder");
  assert.equal(state.executionRequestId, null);
  assert.equal(state.wonder, "Why do two maps lead to different conclusions?");
  assert.equal(state.workspace.uncertainty, "The source data is not yet known");
});

test("only a rested Human session can prepare the bounded ORION request", () => {
  let state = reduceAlphaJourney(initialAlphaJourneyState, { type: "BEGIN_WONDER" });
  assert.equal(reduceAlphaJourney(state, { type: "PREPARE_ORION_REQUEST" }), state);

  state = reduceAlphaJourney(state, { type: "SAVE_WONDER", value: "A question" });
  state = reduceAlphaJourney(state, { type: "UPDATE_OBJECT", value: { title: "A document", type: "Document" } });
  state = reduceAlphaJourney(state, { type: "EDIT_REQUEST_FIELD", field: "intention", value: "Understand its structure" });
  state = reduceAlphaJourney(state, { type: "EDIT_SCOPE_ITEM", field: "scopeInclude", index: 0, value: "Declared structure" });
  state = reduceAlphaJourney(state, { type: "EDIT_WORKSPACE_NOTE", field: "relation", value: "The document contains the question" });
  state = reduceAlphaJourney(state, { type: "EDIT_WORKSPACE_NOTE", field: "uncertainty", value: "Evidence remains absent" });
  state = reduceAlphaJourney(state, { type: "EDIT_WORKSPACE_NOTE", field: "turn", value: "View it as a bounded representation" });
  state = reduceAlphaJourney(state, { type: "EDIT_WORKSPACE_NOTE", field: "reflection", value: "Its structure is now explicit" });
  state = reduceAlphaJourney(state, { type: "REST_SESSION" });
  state = reduceAlphaJourney(state, { type: "PREPARE_ORION_REQUEST" });

  assert.equal(state.step, "confirmation");
  assert.equal(state.executionRequestId, null);
  assert.equal(state.workspace.reflection, "Its structure is now explicit");
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

test("a valid request moves through Human review to live orientation", () => {
  let state = validObjectState();
  state = reduceAlphaJourney(state, { type: "EDIT_REQUEST_FIELD", field: "intention", value: "  Understand its central argument  " });
  state = reduceAlphaJourney(state, { type: "EDIT_SCOPE_ITEM", field: "scopeInclude", index: 0, value: "  The stated assumptions  " });
  state = reduceAlphaJourney(state, { type: "EDIT_SCOPE_ITEM", field: "scopeExclude", index: 0, value: "  Later implementation  " });
  state = reduceAlphaJourney(state, { type: "REVIEW_REQUEST" });
  assert.equal(state.step, "confirmation");
  assert.equal(state.request.intention, "Understand its central argument");
  assert.deepEqual(state.request.scopeInclude, ["The stated assumptions"]);

  state = reduceAlphaJourney(state, { type: "BEGIN_ORIENTATION", requestId: "request-test-01" });
  assert.equal(state.step, "orientation");
  assert.equal(state.executionRequestId, "request-test-01");
  assert.equal(state.request.depth, "Focused");
});

test("an incomplete request cannot be reviewed or submitted", () => {
  const state = validObjectState();
  assert.equal(reduceAlphaJourney(state, { type: "REVIEW_REQUEST" }), state);
  assert.equal(reduceAlphaJourney(state, { type: "BEGIN_ORIENTATION", requestId: "request-invalid" }), state);
});

test("a transport failure can return the preserved request to confirmation", () => {
  let state = validObjectState();
  state = reduceAlphaJourney(state, { type: "EDIT_REQUEST_FIELD", field: "intention", value: "Understand it" });
  state = reduceAlphaJourney(state, { type: "EDIT_SCOPE_ITEM", field: "scopeInclude", index: 0, value: "central claim" });
  state = reduceAlphaJourney(state, { type: "REVIEW_REQUEST" });
  state = reduceAlphaJourney(state, { type: "BEGIN_ORIENTATION", requestId: "request-return" });
  state = reduceAlphaJourney(state, { type: "RETURN_TO_CONFIRMATION" });
  assert.equal(state.step, "confirmation");
  assert.equal(state.executionRequestId, null);
  assert.equal(state.request.intention, "Understand it");
});

test("Reset clears the complete local preparation", () => {
  let state = validObjectState();
  state = reduceAlphaJourney(state, { type: "EDIT_REQUEST_FIELD", field: "intention", value: "Understand it" });
  assert.deepEqual(reduceAlphaJourney(state, { type: "RESET" }), initialAlphaJourneyState);
});
