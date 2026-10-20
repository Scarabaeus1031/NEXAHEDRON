"use client";

import Link from "next/link";
import { useEffect, useReducer, useRef, useState, type FormEvent, type RefObject } from "react";
import {
  GUIDED_QUESTION_OPERATORS,
  getGuidedQuestionOperator,
  type GuidedOperatorId,
} from "./question-operators";
import {
  OPENING_REASONS,
  SYSTEM_CONDITIONS,
  initialGuidedOrientationState,
  reduceGuidedOrientation,
  type GuidedHumanStatus,
  type GuidedOrientationAction,
  type GuidedOrientationState,
  type GuidedRouteType,
} from "./state";
import styles from "./guided-orientation.module.css";

type AnswerableOperatorId = Exclude<GuidedOperatorId, "OPEN" | "RETURN">;

const entryOptions: ReadonlyArray<{
  readonly id: "A" | "B" | "C";
  readonly title: string;
  readonly text: string;
  readonly route?: GuidedRouteType;
}> = [
  { id: "A", title: "I have an open question", text: "I have a question, uncertainty or more than one possible direction.", route: "OPEN_QUESTION" },
  { id: "B", title: "I have a direction to test", text: "I think I know my direction and want to see whether it holds.", route: "DIRECTION_TO_TEST" },
  { id: "C", title: "I am good for now", text: "I do not need orientation right now." },
];

const statusOptions: readonly GuidedHumanStatus[] = ["REST", "CONTINUE", "REVISE", "STOP"];

export function GuidedOrientationScreen() {
  const [state, dispatch] = useReducer(reduceGuidedOrientation, initialGuidedOrientationState);
  const [whyOpen, setWhyOpen] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, [state.phase, state.current_operator]);

  return (
    <main className={styles.page} aria-labelledby="guided-title">
      <header className={styles.header}>
        <p className={styles.eyebrow}>Guided Orientation · Local prototype</p>
        <h1 id="guided-title">Guide me with questions</h1>
        <p>Not an answer generator. A bounded Question Machine.</p>
        <div className={styles.boundary}>
          <span>Human-authored</span><span>Machine-arranged</span><span>Memory only</span><span>No ORION or Gateway call</span>
        </div>
      </header>

      {state.phase === "ENTRY" ? renderEntry() : null}
      {state.phase === "GOOD_FOR_NOW" ? renderGoodForNow() : null}
      {state.phase === "OPEN" ? renderOpening() : null}
      {state.phase === "CONFIRM" ? renderConfirmation() : null}
      {state.phase === "QUESTIONS" ? <GuidedQuestionStep key={state.current_operator} state={state} dispatch={dispatch} headingRef={headingRef} /> : null}
      {state.phase === "TERRAIN" ? <TerrainMap state={state} dispatch={dispatch} headingRef={headingRef} /> : null}
    </main>
  );

  function renderEntry() {
    return (
      <section className={styles.panel} aria-labelledby="guided-entry-title">
        <p className={styles.progress}>Choose an entrance · no choice is assumed</p>
        <h2 id="guided-entry-title" ref={headingRef} tabIndex={-1}>What brings you here?</h2>
        <div className={styles.entryGrid}>
          {entryOptions.map((option) => (
            <article className={styles.entryCard} key={option.id}>
              <span aria-hidden="true">{option.id}</span><h3>{option.title}</h3><p>{option.text}</p>
              <button type="button" onClick={() => option.route ? dispatch({ type: "CHOOSE_ROUTE", route: option.route }) : dispatch({ type: "GOOD_FOR_NOW" })}>
                {option.id === "C" ? "Finish here" : "Choose this entrance"}
              </button>
            </article>
          ))}
        </div>
        <p className={styles.nonclaim}>Choosing an entrance does not classify you or construct a problem.</p>
      </section>
    );
  }

  function renderGoodForNow() {
    return (
      <section className={`${styles.panel} ${styles.quietEnd}`} aria-labelledby="good-for-now-title">
        <p className={styles.progress}>No orientation started</p>
        <h2 id="good-for-now-title" ref={headingRef} tabIndex={-1}>Good for you. Keep going.</h2>
        <p>You can return when a question appears.</p>
        <p className={styles.nonclaim}>No Orientation Conclusion or Machine Result was created.</p>
        <div className={styles.actions}>
          <Link href="/">Return home</Link>
          <button type="button" onClick={() => dispatch({ type: "RESET" })}>Return to entrances</button>
        </div>
      </section>
    );
  }

  function renderOpening() {
    const openPrompt = state.record.route_type === "DIRECTION_TO_TEST"
      ? "What direction do you currently think you want to take?"
      : "What would you like to see more clearly?";
    const canReview = Boolean(state.record.question_anchor.trim() && state.record.opening_reason);

    function submit(event: FormEvent<HTMLFormElement>) {
      event.preventDefault();
      dispatch({ type: "REVIEW_OPENING" });
    }

    return (
      <section className={styles.panel} aria-labelledby="guided-opening-title">
        <StepHeader operatorId="OPEN" headingRef={headingRef} label="Open · 1 of 14" prompt={openPrompt} />
        <form onSubmit={submit}>
          <label className={styles.field}>
            <span>Your exact words</span>
            <textarea value={state.record.question_anchor} onChange={(event) => dispatch({ type: "EDIT_OPENING", question: event.target.value })} rows={5} placeholder="Write one sentence. It does not need to be complete." required />
          </label>
          <fieldset className={styles.choices}>
            <legend>What makes this worth examining?</legend>
            {OPENING_REASONS.map((reason) => (
              <label key={reason}><input type="radio" name="opening-reason" checked={state.record.opening_reason === reason} onChange={() => dispatch({ type: "EDIT_OPENING", reason })} /><span>{reason}</span></label>
            ))}
          </fieldset>
          <WhyQuestion operatorId="OPEN" open={whyOpen} onToggle={() => setWhyOpen((value) => !value)} />
          <div className={styles.actions}>
            <button type="button" onClick={() => dispatch({ type: "RESET" })}>Back</button>
            <button type="button" onClick={() => dispatch({ type: "STOP" })}>Stop</button>
            <button type="submit" disabled={!canReview}>Continue to confirmation</button>
          </div>
        </form>
      </section>
    );
  }

  function renderConfirmation() {
    return (
      <section className={styles.panel} aria-labelledby="guided-confirm-title">
        <p className={styles.progress}>Human confirmation · required before perspective work</p>
        <h2 id="guided-confirm-title" ref={headingRef} tabIndex={-1}>Is this what you want held in view?</h2>
        <dl className={styles.confirmation}>
          <div><dt>Your question</dt><dd>{state.record.question_anchor}</dd></div>
          <div><dt>You selected</dt><dd>{state.record.opening_reason}</dd></div>
        </dl>
        <p className={styles.nonclaim}>The text above is mirrored exactly. No semantic paraphrase was generated.</p>
        <div className={styles.actions}>
          <button type="button" onClick={() => dispatch({ type: "CONFIRM_OPENING" })}>Confirm</button>
          <button type="button" onClick={() => dispatch({ type: "CORRECT_OPENING" })}>Correct</button>
          <button type="button" onClick={() => dispatch({ type: "RESET" })}>Return</button>
          <button type="button" onClick={() => dispatch({ type: "STOP" })}>Stop</button>
        </div>
      </section>
    );
  }
}

function StepHeader({ operatorId, headingRef, label, prompt }: { readonly operatorId: GuidedOperatorId; readonly headingRef: RefObject<HTMLHeadingElement | null>; readonly label: string; readonly prompt: string }) {
  return <header className={styles.stepHeader}><p className={styles.progress}>{label} · {operatorId}</p><h2 id={operatorId === "OPEN" ? "guided-opening-title" : "guided-question-title"} ref={headingRef} tabIndex={-1}>{prompt}</h2></header>;
}

function WhyQuestion({ operatorId, open, onToggle }: { readonly operatorId: GuidedOperatorId; readonly open: boolean; readonly onToggle: () => void }) {
  const operator = getGuidedQuestionOperator(operatorId);
  return (
    <div className={styles.why}>
      <button type="button" aria-expanded={open} onClick={onToggle}>Why this question?</button>
      {open ? <div role="note"><p><strong>Purpose</strong><br />{operator.purpose}</p><p><strong>Nonclaim</strong><br />{operator.nonclaim}</p></div> : null}
    </div>
  );
}

function GuidedQuestionStep({ state, dispatch, headingRef }: { readonly state: GuidedOrientationState; readonly dispatch: (action: GuidedOrientationAction) => void; readonly headingRef: RefObject<HTMLHeadingElement | null> }) {
  const operator = getGuidedQuestionOperator(state.current_operator);
  const operatorIndex = GUIDED_QUESTION_OPERATORS.findIndex((candidate) => candidate.operator_id === state.current_operator);
  const [draft, setDraft] = useState(() => {
    const trace = state.record.question_trace.find((entry) => entry.operator_id === state.current_operator);
    return trace?.human_response ?? "";
  });
  const [whyOpen, setWhyOpen] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!draft.trim()) return;
    dispatch({ type: "ANSWER", operator_id: state.current_operator as AnswerableOperatorId, value: draft });
  }

  return (
    <section className={styles.panel} aria-labelledby="guided-question-title">
      <StepHeader operatorId={operator.operator_id} headingRef={headingRef} label={`${operator.label} · ${operatorIndex + 1} of ${GUIDED_QUESTION_OPERATORS.length}`} prompt={operator.prompt} />
      <form onSubmit={submit}>
        {operator.operator_id === "SYSTEM_VIEW" ? <fieldset className={styles.hints}><legend>Optional conditions · select only what you choose</legend>{SYSTEM_CONDITIONS.map((condition) => <label key={condition}><input type="checkbox" checked={state.record.views.system_conditions.includes(condition)} onChange={(event) => dispatch({ type: "SET_SYSTEM_CONDITION", condition, selected: event.target.checked })} /><span>{condition}</span></label>)}</fieldset> : null}
        <label className={styles.field}><span>Your response</span><textarea value={draft} onChange={(event) => setDraft(event.target.value)} rows={6} placeholder="Write in your own words." required /></label>
        {operator.operator_id === "OTHER_VIEW" ? <p className={styles.nonclaim}>{operator.nonclaim}</p> : null}
        <WhyQuestion operatorId={operator.operator_id} open={whyOpen} onToggle={() => setWhyOpen((value) => !value)} />
        <div className={styles.actions}>
          <button type="button" onClick={() => dispatch({ type: "BACK" })}>Back</button>
          {operator.skippable ? <button type="button" onClick={() => dispatch({ type: "SKIP", operator_id: operator.operator_id as AnswerableOperatorId })}>Skip</button> : null}
          <button type="button" onClick={() => dispatch({ type: "STOP" })}>Stop</button>
          <button type="submit" disabled={!draft.trim()}>Continue</button>
        </div>
      </form>
    </section>
  );
}

function TerrainMap({ state, dispatch, headingRef }: { readonly state: GuidedOrientationState; readonly dispatch: (action: GuidedOrientationAction) => void; readonly headingRef: RefObject<HTMLHeadingElement | null> }) {
  const record = state.record;
  const fields = [
    ["Known ground", record.point.known], ["Assumed ground", record.point.assumed], ["Felt importance", record.point.felt], ["Missing terrain", record.point.missing],
    ["Self view", record.views.self], ["Other view", record.views.other], ["System view", record.views.system], ["What changed", record.return.changed],
    ["What remained", record.return.remained], ["Boundary", record.return.boundary], ["Reversible terrain", record.return.reversible], ["What could move", record.return.possible_move],
  ] as const;
  const unanswered = fields.filter(([, value]) => !value).map(([label]) => label);

  return (
    <section className={styles.terrain} aria-labelledby="terrain-title">
      <header><p className={styles.progress}>Return · Terrain Map · Human STOP remains available</p><h2 id="terrain-title" ref={headingRef} tabIndex={-1}>Your confirmed orientation, arranged for inspection</h2><p>Human-authored · Machine-arranged · Not externally verified</p></header>
      {!record.opening_confirmed ? <p className={styles.stopNotice}>You stopped before confirming the opening. No unconfirmed question is included below.</p> : null}
      <dl className={styles.terrainGrid}>
        <MapItem label="Question" value={record.opening_confirmed ? record.question_anchor : "Not confirmed"} />
        <MapItem label="Opening type" value={record.route_type ?? "Not selected"} />
        {fields.map(([label, value]) => <MapItem key={label} label={label} value={value || "Open or skipped"} />)}
        <MapItem label="System conditions" value={record.views.system_conditions.join(", ") || "None selected"} />
        <MapItem label="Unanswered items" value={unanswered.join(", ") || "None recorded as open"} />
        <MapItem label="Human status" value={record.human_status ?? "Not selected"} />
      </dl>
      <aside className={styles.mapBoundary}><strong>This is not an answer.</strong><span>Not a diagnosis.</span><span>Not a recommendation.</span><span>Not externally verified.</span><span>Stored only in this open browser session.</span><span>PATH A only. It is not an evidence-bound PATH B result.</span></aside>
      <fieldset className={styles.statuses}>
        <legend>What do you choose now? No status is preselected.</legend>
        {statusOptions.map((status) => <label key={status}><input type="radio" name="human-status" checked={record.human_status === status} onChange={() => dispatch({ type: "SET_HUMAN_STATUS", status })} /><span>{status}</span></label>)}
      </fieldset>
      <div className={styles.actions}><button type="button" onClick={() => dispatch({ type: "BACK" })}>Revise last question</button><button type="button" onClick={() => dispatch({ type: "RESET" })}>Start a new local session</button><Link href="/">Return home</Link></div>
      <p className={styles.nonclaim}>STOP creates no receipt, approval, immutable Orientation Record, ORION request, or Machine Result claim.</p>
    </section>
  );
}

function MapItem({ label, value }: { readonly label: string; readonly value: string }) {
  return <div><dt>{label}</dt><dd>{value}</dd></div>;
}
