import assert from "node:assert/strict";
import test from "node:test";
import {
  initialJourneyState,
  reduceJourney,
} from "../packages/laboratory-domain/src/journey.ts";

test("completes the deterministic Laboratory journey", () => {
  let state = initialJourneyState;

  state = reduceJourney(state, { type: "BEGIN" });
  assert.equal(state.screen, "question");

  state = reduceJourney(state, { type: "USE_EXAMPLE", value: "canonical question" });
  state = reduceJourney(state, { type: "SUBMIT_QUESTION", supported: true });
  assert.equal(state.screen, "confirmation");

  state = reduceJourney(state, { type: "CONFIRM" });
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

test("holds invalid transitions and exposes question boundaries", () => {
  assert.equal(
    reduceJourney(initialJourneyState, { type: "CONFIRM" }),
    initialJourneyState,
  );

  let state = reduceJourney(initialJourneyState, { type: "BEGIN" });
  state = reduceJourney(state, { type: "SUBMIT_QUESTION", supported: false });
  assert.equal(state.questionIssue, "empty");

  state = reduceJourney(state, { type: "EDIT_QUESTION", value: "another question" });
  state = reduceJourney(state, { type: "SUBMIT_QUESTION", supported: false });
  assert.equal(state.screen, "question");
  assert.equal(state.questionIssue, "unsupported");
});
