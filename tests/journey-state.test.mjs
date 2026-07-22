import assert from "node:assert/strict";
import test from "node:test";
import {
  initialJourneyState,
  reduceJourney,
} from "../packages/laboratory-domain/src/journey.ts";

test("completes the deterministic Laboratory journey", () => {
  let state = initialJourneyState;

  state = reduceJourney(state, { type: "SELECT_MODE", mode: "understand" });
  assert.equal(state.screen, "object");
  assert.equal(state.mode, "understand");

  state = reduceJourney(state, {
    type: "USE_OBJECT_EXAMPLE",
    description: "canonical observation",
  });
  state = reduceJourney(state, { type: "SUBMIT_OBJECT" });
  assert.equal(state.screen, "intention");
  assert.equal(state.objectType, "Observation");

  state = reduceJourney(state, {
    type: "USE_INTENTION_EXAMPLE",
    value: "canonical intention",
  });
  state = reduceJourney(state, { type: "SUBMIT_INTENTION", supported: true });
  assert.equal(state.screen, "scope");

  state = reduceJourney(state, { type: "CONFIRM_SCOPE" });
  assert.equal(state.screen, "report");

  state = reduceJourney(state, { type: "SET_REPORT_VIEW", view: "blockers" });
  assert.equal(state.reportView, "blockers");

  state = reduceJourney(state, { type: "REFLECT" });
  assert.equal(state.screen, "reflection");

  state = reduceJourney(state, { type: "RETURN_TO_REPORT" });
  assert.equal(state.screen, "report");
  assert.equal(state.reportView, "blockers");

  state = reduceJourney(state, { type: "DEPART" });
  assert.equal(state.screen, "departure");

  state = reduceJourney(state, { type: "RESTART" });
  assert.deepEqual(state, initialJourneyState);
});

test("holds invalid transitions and exposes deterministic onboarding boundaries", () => {
  assert.equal(
    reduceJourney(initialJourneyState, { type: "CONFIRM_SCOPE" }),
    initialJourneyState,
  );

  let state = reduceJourney(initialJourneyState, {
    type: "SELECT_MODE",
    mode: "compare",
  });
  state = reduceJourney(state, { type: "SUBMIT_OBJECT" });
  assert.equal(state.objectIssue, "empty");

  state = reduceJourney(state, { type: "EDIT_OBJECT_TYPE", value: "Document" });
  state = reduceJourney(state, {
    type: "EDIT_OBJECT_DESCRIPTION",
    value: "two papers",
  });
  state = reduceJourney(state, { type: "SUBMIT_OBJECT" });
  assert.equal(state.screen, "intention");

  state = reduceJourney(state, { type: "EDIT_INTENTION", value: "compare them" });
  state = reduceJourney(state, { type: "SUBMIT_INTENTION", supported: false });
  assert.equal(state.screen, "intention");
  assert.equal(state.intentionIssue, "unsupported");
});
