"use client";

import { useEffect, useMemo, useReducer, useRef } from "react";
import fixture from "../../../fixtures/orientation-sessions/full-round-trip.json";
import {
  initialJourneyState,
  reduceJourney,
  type ReportView,
} from "../../../packages/laboratory-domain/src/journey";

const places = ["Question", "Orientation", "Evidence", "Atlas", "Reflection"];
const reportViews: Array<{ id: ReportView; label: string }> = [
  { id: "summary", label: "Summary" },
  { id: "path", label: "Path" },
  { id: "evidence", label: "Evidence" },
  { id: "blockers", label: "Blockers" },
  { id: "inspect", label: "Inspect" },
];

const authorities = [
  ["NEXAH", "Defines the Orientation Space and preserves canonical framework authority."],
  ["ORION", "Navigates registered paths, validates boundaries and produces reports."],
  ["LYRA", "Translates human intent and faithfully explains structured results."],
  ["Library", "Owns evidence, knowledge identity and editorial authority."],
  ["Human", "Retains intention, Reflection and every consequential decision."],
] as const;

export function OrientationLaboratory() {
  const [state, dispatch] = useReducer(reduceJourney, initialJourneyState);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (state.screen !== "arrival") headingRef.current?.focus();
  }, [state.screen]);

  const issuesByTransition = useMemo(() => {
    return fixture.report.plan.path.map((step) => ({
      step,
      issues: fixture.report.issues.filter(
        (issue) => issue.transitionId === step.transitionId,
      ),
    }));
  }, []);

  const submitQuestion = () => {
    dispatch({
      type: "SUBMIT_QUESTION",
      supported: state.question.trim() === fixture.request.utterance,
    });
  };

  if (state.screen === "arrival") {
    return (
      <>
        <section className="hero" id="top" aria-labelledby="hero-heading">
          <div className="hero-copy">
            <p className="eyebrow">Orientation Workspace · Deterministic fixture</p>
            <h1 id="hero-heading">Bring a question. Find orientation. Not answers.</h1>
            <p className="hero-intro">
              A calm, inspectable place for seeing registered paths, evidence,
              uncertainty and limits—while the decision remains yours.
            </p>
            <button
              className="primary-button"
              data-testid="begin-journey"
              onClick={() => dispatch({ type: "BEGIN" })}
              type="button"
            >
              Begin with a question
            </button>
            <p className="fixture-disclosure">
              Phase I.2 uses one recorded canonical Orientation Session. No live
              ORION request is made.
            </p>
          </div>

          <aside className="hero-aside" aria-labelledby="places-heading">
            <p className="eyebrow" id="places-heading">The orientation path</p>
            <ol className="orientation-axis">
              {places.map((place) => <li key={place}>{place}</li>)}
            </ol>
          </aside>
        </section>

        <section className="boundary-section" id="authority" aria-labelledby="authority-heading">
          <div className="section-heading">
            <div>
              <p className="section-index">01 · Authority remains visible</p>
              <h2 id="authority-heading">One Laboratory. Distinct responsibilities.</h2>
            </div>
          </div>
          <div className="authority-grid">
            {authorities.map(([name, role]) => (
              <article className="authority-card" key={name}>
                <h3>{name}</h3>
                <p>{role}</p>
              </article>
            ))}
          </div>
        </section>
      </>
    );
  }

  if (state.screen === "question") {
    return (
      <JourneyRoom step="01" label="Question">
        <div className="room-copy">
          <p className="eyebrow">Open the question</p>
          <h1 ref={headingRef} tabIndex={-1}>What are you trying to find your way through?</h1>
          <p>Begin with a real question. This milestone recognizes only the canonical example below and will not guess another meaning.</p>
        </div>

        <div className="question-panel">
          <label htmlFor="orientation-question">Your question</label>
          <textarea
            id="orientation-question"
            data-testid="orientation-question"
            maxLength={300}
            onChange={(event) => dispatch({ type: "EDIT_QUESTION", value: event.target.value })}
            placeholder="Begin with what you are trying to understand…"
            value={state.question}
          />
          <div className="field-meta">
            <button
              className="text-button"
              data-testid="use-example"
              onClick={() => dispatch({ type: "USE_EXAMPLE", value: fixture.request.utterance })}
              type="button"
            >
              Use the canonical example
            </button>
            <span>{state.question.length} / 300</span>
          </div>
          {state.questionIssue === "empty" && (
            <p className="field-message" role="alert">Begin with what you have. A few words are enough.</p>
          )}
          {state.questionIssue === "unsupported" && (
            <p className="field-message" role="alert">
              This fixture-backed milestone cannot map that wording. Nothing was sent or inferred. Use the canonical example to continue.
            </p>
          )}
          <div className="room-actions">
            <button className="secondary-button" onClick={() => dispatch({ type: "RESTART" })} type="button">Back</button>
            <button className="primary-button" data-testid="continue-question" disabled={!state.question.trim()} onClick={submitQuestion} type="button">Continue</button>
          </div>
        </div>
      </JourneyRoom>
    );
  }

  if (state.screen === "confirmation") {
    return (
      <JourneyRoom step="02" label="Direction">
        <div className="room-copy">
          <p className="eyebrow lyra-accent">LYRA boundary · recorded translation</p>
          <h1 ref={headingRef} tabIndex={-1}>Let us make sure the direction is yours.</h1>
          <p>The wording below is copied from the canonical fixture. It is not generated in this Laboratory.</p>
        </div>

        <section className="confirmation-card" aria-label="Confirmed orientation">
          <dl className="confirmation-definitions">
            <Definition label="You want to understand" value={state.question} />
            <Definition label="Starting from" value={fixture.translation.sourceRepresentation} />
            <Definition label="Looking toward" value={fixture.translation.targetRepresentation} />
            <Definition label="Recognized intents" value={fixture.translation.intents.join(" + ")} />
          </dl>
          <p className="boundary-note">Confirming loads a deterministic report fixture. The ORION gateway remains unavailable.</p>
          <div className="room-actions">
            <button className="secondary-button" data-testid="adjust-question" onClick={() => dispatch({ type: "ADJUST" })} type="button">Adjust</button>
            <button className="primary-button" data-testid="confirm-orientation" onClick={() => dispatch({ type: "CONFIRM" })} type="button">Yes, orient this</button>
          </div>
        </section>
      </JourneyRoom>
    );
  }

  if (state.screen === "report") {
    return (
      <JourneyRoom step="03" label="Orientation">
        <div className="report-heading">
          <div>
            <p className="eyebrow orion-accent">ORION report · deterministic fixture</p>
            <h1 ref={headingRef} tabIndex={-1}>Your orientation</h1>
            <p className="report-lead">There is a registered route, but it cannot currently be completed.</p>
          </div>
          <div className="status-block" aria-label="Report status blocked">
            <span>Status</span>
            <strong>Blocked</strong>
          </div>
        </div>

        <div className="report-disclosure" role="note">
          Canonical fixture loaded from <code>orientation-session/1</code>. No live ORION request was made.
        </div>

        <div className="report-tabs" role="tablist" aria-label="Orientation report views">
          {reportViews.map((view) => (
            <button
              aria-controls={`report-panel-${view.id}`}
              aria-selected={state.reportView === view.id}
              className="report-tab"
              data-testid={`report-tab-${view.id}`}
              id={`report-tab-${view.id}`}
              key={view.id}
              onClick={() => dispatch({ type: "SET_REPORT_VIEW", view: view.id })}
              role="tab"
              type="button"
            >
              {view.label}
            </button>
          ))}
        </div>

        <section
          aria-labelledby={`report-tab-${state.reportView}`}
          className="report-panel"
          id={`report-panel-${state.reportView}`}
          role="tabpanel"
        >
          {state.reportView === "summary" && <SummaryView />}
          {state.reportView === "path" && <PathView />}
          {state.reportView === "evidence" && <EvidenceView />}
          {state.reportView === "blockers" && <BlockersView groups={issuesByTransition} />}
          {state.reportView === "inspect" && <InspectView />}
        </section>

        <div className="room-actions report-actions">
          <button className="secondary-button" data-testid="end-from-report" onClick={() => dispatch({ type: "DEPART" })} type="button">End here</button>
          <button className="primary-button" data-testid="pause-reflect" onClick={() => dispatch({ type: "REFLECT" })} type="button">Pause and reflect</button>
        </div>
      </JourneyRoom>
    );
  }

  if (state.screen === "reflection") {
    return (
      <JourneyRoom step="04" label="Reflection" quiet>
        <div className="reflection-room">
          <p className="eyebrow">Optional human space</p>
          <h1 ref={headingRef} tabIndex={-1}>What remains unresolved for you?</h1>
          <p>This Reflection is yours. You do not need to answer, and nothing here is analyzed or stored.</p>
          <aside className="orientation-reference">
            <span>Orientation reference</span>
            <strong>{fixture.request.sourceRepresentation} → {fixture.request.targetRepresentation}</strong>
            <span>Blocked · no Target Representation produced</span>
          </aside>
          <div className="room-actions centered-actions">
            <button className="secondary-button" data-testid="return-report" onClick={() => dispatch({ type: "RETURN_TO_REPORT" })} type="button">Return to the orientation</button>
            <button className="primary-button" data-testid="continue-departure" onClick={() => dispatch({ type: "DEPART" })} type="button">Continue</button>
          </div>
        </div>
      </JourneyRoom>
    );
  }

  return (
    <JourneyRoom step="05" label="Departure" quiet>
      <div className="departure-room">
        <p className="eyebrow">The journey is complete</p>
        <h1 ref={headingRef} tabIndex={-1}>You can leave the question here.</h1>
        <p>The orientation remains a map, not a decision. No session, question or Reflection has been saved.</p>
        <dl className="departure-summary">
          <Definition label="Question" value={fixture.request.utterance} />
          <Definition label="Orientation status" value="Blocked" />
          <Definition label="What was produced" value="A registered plan and report fixture" />
          <Definition label="What was not produced" value="A Target Representation" />
        </dl>
        <button className="primary-button" data-testid="begin-again" onClick={() => dispatch({ type: "RESTART" })} type="button">Return to the Laboratory</button>
      </div>
    </JourneyRoom>
  );
}

function JourneyRoom({ children, label, quiet = false, step }: { children: React.ReactNode; label: string; quiet?: boolean; step: string }) {
  return (
    <section className={`journey-room${quiet ? " journey-room-quiet" : ""}`} data-screen={label.toLowerCase()}>
      <div className="journey-marker" aria-label={`Journey step ${step}: ${label}`}>
        <span>{step}</span><strong>{label}</strong>
      </div>
      <div className="journey-content">{children}</div>
      <p className="screen-announcement" aria-live="polite">Current place: {label}</p>
    </section>
  );
}

function Definition({ label, value }: { label: string; value: string }) {
  return <div className="definition"><dt>{label}</dt><dd>{value}</dd></div>;
}

function SummaryView() {
  return (
    <div className="summary-grid">
      <article className="report-card report-card-wide">
        <p className="card-label">What we can say</p>
        <h2>The route is registered and inspectable.</h2>
        <p>{fixture.explanation.sentences[0]} {fixture.explanation.sentences[1]}</p>
      </article>
      <article className="report-card">
        <p className="card-label">What supports this</p>
        <strong>{fixture.report.plan.path.length} registered transitions</strong>
        <p>Evidence chain: {fixture.report.plan.evidenceChain.join(" → ")}</p>
      </article>
      <article className="report-card">
        <p className="card-label">What remains uncertain</p>
        <strong>{fixture.report.issues.length} declared blockers</strong>
        <p>Every transition lacks both an executable Operator and a registered Renderer.</p>
      </article>
      <article className="report-card report-card-emphasis">
        <p className="card-label">What was not produced</p>
        <h2>No Target Representation.</h2>
        <p>The existing result was not promoted, rewritten or presented as complete.</p>
      </article>
    </div>
  );
}

function PathView() {
  return (
    <div>
      <div className="path-introduction">
        <div><span>Source</span><strong>{fixture.report.plan.sourceRepresentation}</strong></div>
        <div><span>Target</span><strong>{fixture.report.plan.targetRepresentation}</strong></div>
      </div>
      <ol className="route-map" aria-label="Registered route">
        {fixture.report.plan.path.map((step) => (
          <li key={step.transitionId}>
            <div className="route-node"><span>{step.transitionId}</span><strong>{step.targetRepresentation}</strong></div>
            <dl>
              <div><dt>Evidence</dt><dd>{step.evidenceLevel}</dd></div>
              <div><dt>Operator</dt><dd>{step.operatorStatus}</dd></div>
              <div><dt>Renderer</dt><dd>missing</dd></div>
            </dl>
          </li>
        ))}
      </ol>
      <details className="details-block">
        <summary>Show {fixture.report.plan.alternativePaths.length} registered alternatives</summary>
        <ol className="alternatives-list">
          {fixture.report.plan.alternativePaths.map((path) => <li key={path.join("-")}><code>{path.join(" → ")}</code></li>)}
        </ol>
      </details>
    </div>
  );
}

function EvidenceView() {
  return (
    <div className="evidence-layout">
      <article className="report-card">
        <p className="card-label">Evidence chain</p>
        <div className="evidence-chain">{fixture.report.plan.evidenceChain.map((level, index) => <span key={`${level}-${index}`}>{level}</span>)}</div>
        <p>These levels describe documentation support. They do not imply certainty or execution.</p>
      </article>
      <dl className="metadata-list">
        <Definition label="Source reference" value={fixture.report.plan.sourceReferences.join(", ")} />
        <Definition label="Source provenance" value={fixture.report.plan.sourceProvenance.join(", ")} />
        <Definition label="Required invariants" value={fixture.report.plan.requiredInvariants.join(", ")} />
        <Definition label="Preserved invariants" value={fixture.report.plan.preservedInvariants.join(", ")} />
      </dl>
      <p className="boundary-note library-accent">This fixture does not reference a live Library source.</p>
    </div>
  );
}

function BlockersView({ groups }: { groups: Array<{ step: (typeof fixture.report.plan.path)[number]; issues: Array<(typeof fixture.report.issues)[number]> }> }) {
  return (
    <div className="blocker-list">
      <p className="panel-intro">Blocked is a valid report state. Each missing capability remains explicit.</p>
      {groups.map(({ issues, step }) => (
        <article className="blocker-group" key={step.transitionId}>
          <header><strong>{step.transitionId}</strong><span>{step.sourceRepresentation} → {step.targetRepresentation}</span><em>{step.evidenceLevel}</em></header>
          <ul>{issues.map((issue) => <li key={issue.kind}><strong>{humanizeIssue(issue.kind)}</strong><span>{issue.reason}</span></li>)}</ul>
        </article>
      ))}
    </div>
  );
}

function InspectView() {
  return (
    <div className="inspect-layout">
      <dl className="metadata-list">
        <Definition label="Report ID" value={fixture.report.reportId} />
        <Definition label="Report schema" value={fixture.report.schemaVersion} />
        <Definition label="Plan ID" value={fixture.report.plan.planId} />
        <Definition label="Graph version" value={fixture.report.plan.graphVersion} />
        <Definition label="Contract registry" value={fixture.report.plan.contractRegistryVersion} />
        <Definition label="Operator registry" value={fixture.report.plan.operatorRegistryVersion} />
        <Definition label="Validation" value={`invalid · ${fixture.report.validation.checkCount} checks · ${fixture.report.validation.errorCount} errors`} />
        <Definition label="Produced Representation" value="None" />
      </dl>
      <details className="details-block">
        <summary>Inspect validation checks</summary>
        <ul className="check-list">{fixture.report.validation.checks.map((check) => <li key={check}><code>{check}</code></li>)}</ul>
      </details>
      <p className="fixture-source">Fixture source: <code>{fixture.source.document}</code><br />Frozen revision: <code>{fixture.source.revision}</code></p>
    </div>
  );
}

function humanizeIssue(issue: string) {
  return issue === "MissingOperator" ? "Missing Operator" : "Missing Renderer";
}
