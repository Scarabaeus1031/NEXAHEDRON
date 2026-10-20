import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import {
  GUIDED_OPERATOR_IDS,
  GUIDED_QUESTION_OPERATORS,
  getGuidedQuestionOperator,
  isAllowedGuidedTransition,
} from "../features/guided-orientation/question-operators.ts";
import {
  OPENING_REASONS,
  initialGuidedOrientationState,
  reduceGuidedOrientation,
} from "../features/guided-orientation/state.ts";

function openAndConfirm(route = "OPEN_QUESTION", question = "  My exact question?  ") {
  let state = reduceGuidedOrientation(initialGuidedOrientationState, { type: "CHOOSE_ROUTE", route });
  state = reduceGuidedOrientation(state, { type: "EDIT_OPENING", question });
  state = reduceGuidedOrientation(state, { type: "EDIT_OPENING", reason: OPENING_REASONS[1] });
  state = reduceGuidedOrientation(state, { type: "REVIEW_OPENING" });
  return reduceGuidedOrientation(state, { type: "CONFIRM_OPENING" });
}

function answer(state, value) {
  return reduceGuidedOrientation(state, { type: "ANSWER", operator_id: state.current_operator, value });
}

test("the registry contains exactly the fourteen fixed, inspectable question operators", () => {
  assert.deepEqual(GUIDED_QUESTION_OPERATORS.map((operator) => operator.operator_id), GUIDED_OPERATOR_IDS);
  assert.equal(new Set(GUIDED_OPERATOR_IDS).size, 14);
  for (const operator of GUIDED_QUESTION_OPERATORS) {
    assert.equal(operator.version, "1.0");
    assert.ok(operator.label && operator.purpose && operator.prompt && operator.nonclaim);
    assert.ok(Array.isArray(operator.allowed_next));
    assert.equal(typeof operator.skippable, "boolean");
  }
  assert.throws(() => getGuidedQuestionOperator("INFER"), /UNKNOWN_GUIDED_OPERATOR:INFER/);
  assert.equal(isAllowedGuidedTransition("OPEN", "SOURCE"), true);
  assert.equal(isAllowedGuidedTransition("OPEN", "MOVE"), false);
  assert.equal(isAllowedGuidedTransition("REMAIN", "MOVE"), true);
  assert.equal(isAllowedGuidedTransition("MOVE", "BOUNDARY"), true);
  assert.equal(isAllowedGuidedTransition("REVERSIBILITY", "RETURN"), true);
});

test("entry A and B open their exact routes while C ends without constructing a problem", () => {
  const open = reduceGuidedOrientation(initialGuidedOrientationState, { type: "CHOOSE_ROUTE", route: "OPEN_QUESTION" });
  const direction = reduceGuidedOrientation(initialGuidedOrientationState, { type: "CHOOSE_ROUTE", route: "DIRECTION_TO_TEST" });
  const good = reduceGuidedOrientation(initialGuidedOrientationState, { type: "GOOD_FOR_NOW" });
  assert.equal(open.record.route_type, "OPEN_QUESTION");
  assert.equal(direction.record.route_type, "DIRECTION_TO_TEST");
  assert.equal(good.phase, "GOOD_FOR_NOW");
  assert.equal(good.record.question_anchor, "");
  assert.equal(good.record.question_trace.length, 0);
});

test("the exact Human question and selection require confirmation before question work", () => {
  let state = reduceGuidedOrientation(initialGuidedOrientationState, { type: "CHOOSE_ROUTE", route: "OPEN_QUESTION" });
  state = reduceGuidedOrientation(state, { type: "EDIT_OPENING", question: "  Keep these bytes & words?  " });
  assert.equal(reduceGuidedOrientation(state, { type: "REVIEW_OPENING" }), state);
  state = reduceGuidedOrientation(state, { type: "EDIT_OPENING", reason: OPENING_REASONS[0] });
  state = reduceGuidedOrientation(state, { type: "REVIEW_OPENING" });
  assert.equal(state.phase, "CONFIRM");
  assert.equal(state.record.opening_confirmed, false);
  state = reduceGuidedOrientation(state, { type: "CONFIRM_OPENING" });
  assert.equal(state.phase, "QUESTIONS");
  assert.equal(state.record.question_anchor, "  Keep these bytes & words?  ");
  assert.equal(state.record.question_trace[0].human_response, `  Keep these bytes & words?  \n${OPENING_REASONS[0]}`);
});

test("correction changes only Human-edited input and is recorded explicitly", () => {
  let state = reduceGuidedOrientation(initialGuidedOrientationState, { type: "CHOOSE_ROUTE", route: "DIRECTION_TO_TEST" });
  state = reduceGuidedOrientation(state, { type: "EDIT_OPENING", question: "First wording" });
  state = reduceGuidedOrientation(state, { type: "EDIT_OPENING", reason: OPENING_REASONS[5] });
  state = reduceGuidedOrientation(state, { type: "REVIEW_OPENING" });
  state = reduceGuidedOrientation(state, { type: "CORRECT_OPENING" });
  state = reduceGuidedOrientation(state, { type: "EDIT_OPENING", question: "Corrected wording" });
  state = reduceGuidedOrientation(state, { type: "REVIEW_OPENING" });
  state = reduceGuidedOrientation(state, { type: "CONFIRM_OPENING" });
  assert.equal(state.record.question_anchor, "Corrected wording");
  assert.equal(state.record.opening_reason, OPENING_REASONS[5]);
  assert.equal(state.record.question_trace[0].response_status, "CORRECTED");
});

test("known, assumed, felt and missing statements remain separate and may repeat", () => {
  let state = openAndConfirm();
  state = answer(state, "The same exact statement");
  state = answer(state, "The same exact statement");
  state = answer(state, "A felt concern");
  state = answer(state, "A missing source");
  assert.deepEqual(state.record.point, {
    known: "The same exact statement",
    assumed: "The same exact statement",
    felt: "A felt concern",
    missing: "A missing source",
  });
});

test("self, other and system remain distinct Human-authored views", () => {
  let state = openAndConfirm();
  for (const value of ["known", "assumed", "felt", "missing"]) state = answer(state, value);
  state = answer(state, "My position");
  state = answer(state, "A perspective hypothesis");
  state = reduceGuidedOrientation(state, { type: "SET_SYSTEM_CONDITION", condition: "time", selected: true });
  state = answer(state, "A condition without personal intent");
  assert.deepEqual(state.record.views, {
    self: "My position",
    other: "A perspective hypothesis",
    system: "A condition without personal intent",
    system_conditions: ["time"],
  });
  assert.match(getGuidedQuestionOperator("OTHER_VIEW").nonclaim, /perspective hypothesis/);
});

test("skip, back and stop preserve explicit Human control", () => {
  let state = openAndConfirm();
  state = reduceGuidedOrientation(state, { type: "SKIP", operator_id: "SOURCE" });
  assert.equal(state.current_operator, "ASSUMPTION");
  assert.equal(state.record.question_trace.at(-1).response_status, "SKIPPED");
  state = reduceGuidedOrientation(state, { type: "BACK" });
  assert.equal(state.current_operator, "SOURCE");
  state = reduceGuidedOrientation(state, { type: "STOP" });
  assert.equal(state.phase, "TERRAIN");
  assert.equal(state.record.human_status, "STOP");
});

test("the possible move and Terrain Map contain only committed Human responses", () => {
  let state = openAndConfirm("OPEN_QUESTION", "Question");
  const responses = ["known", "assumed", "felt", "missing", "self", "other", "system", "changed", "remained", "  my exact next move  ", "boundary", "reversible"];
  for (const value of responses) state = answer(state, value);
  assert.equal(state.phase, "TERRAIN");
  assert.equal(state.record.return.possible_move, "  my exact next move  ");
  assert.equal(state.record.human_status, null);
  assert.notEqual(state.record.question_trace.at(-1).operator_id, "RETURN");
  state = reduceGuidedOrientation(state, { type: "SET_HUMAN_STATUS", status: "REST" });
  assert.equal(state.record.question_trace.at(-1).operator_id, "RETURN");
  assert.equal(state.record.question_trace.at(-1).human_response, "REST");
});

test("the Guided Path source has no ORION, Gateway, THE EYE, network or persistence execution seam", async () => {
  const source = await readFile(new URL("../features/guided-orientation/GuidedOrientationScreen.tsx", import.meta.url), "utf8");
  const state = await readFile(new URL("../features/guided-orientation/state.ts", import.meta.url), "utf8");
  assert.doesNotMatch(source, /invokeOrion|orion-gateway|api\/orientation|fetch\(|XMLHttpRequest|localStorage|sessionStorage|indexedDB/);
  assert.doesNotMatch(state, /invokeOrion|Gateway|THE_EYE|fetch\(|localStorage|sessionStorage|indexedDB/);
  assert.match(source, /This is not an answer/);
  assert.match(source, /PATH A only/);
  assert.match(source, /Why this question\?/);
  assert.match(source, /No status is preselected/);
});

test("the compiled Guided Path renders all three Human entry choices", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("guided-test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const response = await worker.fetch(
    new Request("http://localhost/guided"),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /I have an open question/);
  assert.match(html, /I have a direction to test/);
  assert.match(html, /I am good for now/);
  assert.match(html, /No ORION or Gateway call/);
  assert.doesNotMatch(html, /checked=""/);
});
