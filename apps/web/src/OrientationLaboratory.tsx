"use client";

import { useEffect, useMemo, useReducer, useRef } from "react";
import fixture from "../../../fixtures/orientation-sessions/full-round-trip.json";
import {
  initialJourneyState,
  reduceJourney,
  type OrientationMode,
  type OrientationObjectType,
  type ReportView,
} from "../../../packages/laboratory-domain/src/journey";

const places = ["Choose a mode", "Orient an object", "Define intention", "Confirm scope", "Receive report", "Continue"];
const canonicalObjectDescription = "An observation I want to trace toward a calendar projection.";
const orientationObjects = [
  "Question",
  "Document",
  "Book",
  "Research Paper",
  "Theory",
  "Dataset",
  "Notes",
  "Observation",
  "Idea",
  "Image",
  "Conversation",
] as const;
const sourceTypes = [
  "Books",
  "Research Papers",
  "Repositories",
  "Knowledge Bases",
  "PDFs",
  "Web Pages",
  "Datasets",
  "Images",
  "Markdown",
  "Model Outputs",
] as const;

type ModeExample = {
  label: string;
  objectType: OrientationObjectType;
  primary: string;
  secondary?: string;
};

type OrientationModeProfile = {
  id: OrientationMode;
  symbol: string;
  name: string;
  description: string;
  verbs: string;
  openingQuestion: string;
  openingSupport: string;
  kindLabel: string;
  objectTypes: OrientationObjectType[];
  primaryLabel: string;
  primaryPlaceholder: string;
  secondaryLabel?: string;
  secondaryPlaceholder?: string;
  nextAction: string;
  intentionQuestion: string;
  intentionSupport: string;
  intentionPlaceholder: string;
  intentionExample: string;
  examples: ModeExample[];
};

const orientationModes: OrientationModeProfile[] = [
  {
    id: "wonder", symbol: "✦", name: "Wonder", description: "I do not know where to begin.", verbs: "Notice · Follow · Ask",
    openingQuestion: "What caught your attention?",
    openingSupport: "Begin with what you noticed. It does not need to be complete, important or already understood.",
    kindLabel: "What kind of starting point is it?",
    objectTypes: ["Observation", "Question", "Idea", "Image", "Conversation", "Notes"],
    primaryLabel: "What did you notice?",
    primaryPlaceholder: "A detail, pattern, phrase or unexpected moment…",
    nextAction: "Follow the wonder",
    intentionQuestion: "What would you like to stay curious about?",
    intentionSupport: "Name the part that feels alive, unresolved or worth following. A precise question is not required.",
    intentionPlaceholder: "I want to stay with…",
    intentionExample: "I want to follow why this pattern keeps appearing.",
    examples: [
      { label: "A recurring shape", objectType: "Observation", primary: "The same branching shape appears in a leaf, a river and a sketch." },
      { label: "An unfamiliar phrase", objectType: "Notes", primary: "A phrase in my notes keeps returning: orientation before explanation." },
      { label: "A surprising image", objectType: "Image", primary: "An image contains a relationship I cannot yet name." },
    ],
  },
  {
    id: "understand", symbol: "◉", name: "Understand", description: "Understand a document, concept, book or theory.", verbs: "Read · Frame · Clarify",
    openingQuestion: "What would you like to understand?",
    openingSupport: "Bring the material or name the idea. The Laboratory will preserve the difference between what it says and what remains uncertain.",
    kindLabel: "What are you bringing?",
    objectTypes: ["Document", "Book", "Research Paper", "Theory", "Dataset", "Notes", "Observation", "Idea", "Image", "Conversation", "Question"],
    primaryLabel: "Describe or name it",
    primaryPlaceholder: "A paper, concept, passage or observation…",
    nextAction: "Define what understanding means",
    intentionQuestion: "What would useful understanding make clearer?",
    intentionSupport: "Name the direction of understanding—not the answer you expect to receive.",
    intentionPlaceholder: "I would like to understand…",
    intentionExample: fixture.request.utterance,
    examples: [
      { label: "Recorded observation", objectType: "Observation", primary: canonicalObjectDescription },
      { label: "A difficult paper", objectType: "Research Paper", primary: "A research paper whose central argument and evidence I want to distinguish." },
      { label: "A theory", objectType: "Theory", primary: "A theory I can describe but do not yet understand structurally." },
    ],
  },
  {
    id: "compare", symbol: "⇄", name: "Compare", description: "Compare two ideas, theories, documents or perspectives.", verbs: "Distinguish · Relate · Weigh",
    openingQuestion: "What would you like to compare?",
    openingSupport: "Place two subjects beside one another. Comparison begins by preserving their differences before looking for equivalence.",
    kindLabel: "What kind of material are you comparing?",
    objectTypes: ["Document", "Research Paper", "Book", "Theory", "Dataset", "Idea", "Image", "Notes"],
    primaryLabel: "First subject",
    primaryPlaceholder: "The first idea, paper, theory or perspective…",
    secondaryLabel: "Second subject",
    secondaryPlaceholder: "The second idea, paper, theory or perspective…",
    nextAction: "Frame the comparison",
    intentionQuestion: "What distinction matters in this comparison?",
    intentionSupport: "Choose the lens that should organize the comparison: assumptions, evidence, structure, consequences or another boundary.",
    intentionPlaceholder: "I want to compare them in terms of…",
    intentionExample: "I want to compare their assumptions, evidence and practical consequences.",
    examples: [
      { label: "Two theories", objectType: "Theory", primary: "A theory centered on individual agency", secondary: "A theory centered on social systems" },
      { label: "Two papers", objectType: "Research Paper", primary: "A qualitative study of learning", secondary: "A quantitative study of learning" },
      { label: "Two designs", objectType: "Image", primary: "A centralized system diagram", secondary: "A distributed system diagram" },
    ],
  },
  {
    id: "connect", symbol: "⌁", name: "Connect", description: "Reveal relationships, patterns and bridges.", verbs: "Link · Map · Bridge",
    openingQuestion: "What would you like to connect?",
    openingSupport: "Begin with two points that seem related, distant or unexpectedly similar. The connection itself remains a question.",
    kindLabel: "What kind of starting points are these?",
    objectTypes: ["Idea", "Theory", "Observation", "Document", "Research Paper", "Dataset", "Image", "Conversation"],
    primaryLabel: "First point",
    primaryPlaceholder: "A concept, observation, source or domain…",
    secondaryLabel: "Second point",
    secondaryPlaceholder: "What might connect with it?",
    nextAction: "Describe the possible bridge",
    intentionQuestion: "What kind of connection are you looking for?",
    intentionSupport: "The connection may be structural, historical, causal, visual or only a resemblance to inspect.",
    intentionPlaceholder: "I want to see whether they connect through…",
    intentionExample: "I want to inspect whether the shared pattern is structural or only superficial.",
    examples: [
      { label: "Nature and systems", objectType: "Idea", primary: "Branching patterns in rivers", secondary: "Dependency structures in software" },
      { label: "Two disciplines", objectType: "Theory", primary: "Ecological resilience", secondary: "Organizational resilience" },
      { label: "Evidence and claim", objectType: "Research Paper", primary: "A paper's central claim", secondary: "The dataset cited as support" },
    ],
  },
  {
    id: "explore", symbol: "⌖", name: "Explore", description: "Navigate concepts, evidence and the Living Atlas.", verbs: "Enter · Follow · Navigate",
    openingQuestion: "Where would you like to begin?",
    openingSupport: "Choose a starting point rather than a destination. Exploration can branch as the orientation develops.",
    kindLabel: "What is your starting point?",
    objectTypes: ["Idea", "Question", "Document", "Book", "Research Paper", "Theory", "Dataset", "Observation", "Image"],
    primaryLabel: "Name the starting point",
    primaryPlaceholder: "A concept, place in a text, field or open question…",
    nextAction: "Choose an initial direction",
    intentionQuestion: "Which direction would you like to explore first?",
    intentionSupport: "Choose an initial path without closing the others. You may change direction later.",
    intentionPlaceholder: "I would like to begin by following…",
    intentionExample: "I would like to begin with the central concept and follow its strongest evidence links.",
    examples: [
      { label: "A broad field", objectType: "Idea", primary: "The relationship between memory and place." },
      { label: "A book chapter", objectType: "Book", primary: "One chapter that opens into unfamiliar references." },
      { label: "An open dataset", objectType: "Dataset", primary: "A dataset whose patterns I have not yet mapped." },
    ],
  },
  {
    id: "build", symbol: "◇", name: "Build", description: "Turn understanding into architecture, research or implementation.", verbs: "Frame · Structure · Make",
    openingQuestion: "What would you like to build?",
    openingSupport: "Begin with the intended form. Building here starts by orienting constraints, evidence and unresolved decisions—not by generating a finished artifact.",
    kindLabel: "What are you beginning from?",
    objectTypes: ["Idea", "Notes", "Document", "Theory", "Dataset", "Observation", "Image", "Conversation"],
    primaryLabel: "Describe the intended work",
    primaryPlaceholder: "A research plan, architecture, argument or implementation…",
    nextAction: "Orient the work",
    intentionQuestion: "What must this work make possible?",
    intentionSupport: "Describe the purpose and constraints that should guide the build before deciding its final form.",
    intentionPlaceholder: "The work should make it possible to…",
    intentionExample: "The work should make the evidence, constraints and open decisions inspectable.",
    examples: [
      { label: "A research plan", objectType: "Idea", primary: "A research plan for studying how people navigate complex evidence." },
      { label: "A software architecture", objectType: "Notes", primary: "An architecture that keeps navigation, language and evidence authority separate." },
      { label: "An argument", objectType: "Document", primary: "A structured argument built from several conflicting sources." },
    ],
  },
  {
    id: "reflect", symbol: "○", name: "Reflect", description: "Review what changed, what remains open and where to continue.", verbs: "Return · Notice · Continue",
    openingQuestion: "What would you like to reflect on?",
    openingSupport: "Bring an experience, decision, orientation or body of work. Reflection remains human and is not interpreted on your behalf.",
    kindLabel: "What are you returning to?",
    objectTypes: ["Observation", "Notes", "Conversation", "Document", "Idea", "Question", "Image"],
    primaryLabel: "Name what you are returning to",
    primaryPlaceholder: "A decision, experience, report or unfinished thought…",
    nextAction: "Open the reflection",
    intentionQuestion: "What feels different now?",
    intentionSupport: "You may notice what changed, what remains unresolved or where you want to continue. No conclusion is required.",
    intentionPlaceholder: "I want to reflect on what changed in…",
    intentionExample: "I want to notice what changed, what remains open and what deserves another look.",
    examples: [
      { label: "A recent decision", objectType: "Observation", primary: "A decision that felt clear at the time but now deserves another look." },
      { label: "An orientation report", objectType: "Document", primary: "An orientation report whose open questions I want to revisit." },
      { label: "An unfinished idea", objectType: "Notes", primary: "Notes from an idea I paused before it became a plan." },
    ],
  },
];
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

  const activeMode = getModeProfile(state.mode);

  const submitIntention = () => {
    dispatch({
      type: "SUBMIT_INTENTION",
      supported:
        state.mode === "understand" &&
        state.objectType === "Observation" &&
        state.objectDescription.trim() === canonicalObjectDescription &&
        state.intention.trim() === fixture.request.utterance,
    });
  };

  if (state.screen === "arrival") {
    return (
      <>
        <section className="landing-introduction" id="top" aria-labelledby="hero-heading">
          <div className="introduction-primary">
            <p className="eyebrow">NEXAH · The underlying orientation system</p>
            <h1 id="hero-heading">The Orientation Layer</h1>
            <p className="introduction-lead">
              Information already exists. Orientation is what is missing.
            </p>
          </div>

          <div className="orientation-definition">
            <p className="section-index">What is this?</p>
            <p>
              NEXAH helps people see how ideas, documents, evidence and
              representations relate—without replacing their sources or human judgment.
            </p>
            <p>
              Through NEXAH, the Laboratory makes paths, connections, support,
              limits and open questions visible instead of returning isolated answers.
            </p>
            <ul className="distinction-list" aria-label="What NEXAH is not">
              <li>Not a search engine</li>
              <li>Not an encyclopedia</li>
              <li>Not an answer machine</li>
            </ul>
            <div className="laboratory-definition">
              <span>NEXAHEDRON</span>
              <strong>The Orientation Laboratory</strong>
              <p>The first application where people can experience and interact with NEXAH.</p>
            </div>
          </div>
        </section>

        <section className="why-orientation" aria-labelledby="why-orientation-heading">
          <p className="section-index">Why orientation?</p>
          <div>
            <h2 id="why-orientation-heading">We have more information—and more systems producing answers—than ever before.</h2>
            <p>What is still missing is orientation.</p>
          </div>
        </section>

        <section className="landing-section object-spectrum" id="orientation-objects" aria-labelledby="objects-heading">
          <header className="landing-section-heading">
            <p className="section-index">01 · Bring what you have</p>
            <h2 id="objects-heading">Bring what you have.</h2>
            <p>
              A question, document, book, theory, dataset, note, observation or idea
              can be the starting point. Inside the Laboratory, the material you
              orient is called an Orientation Object.
            </p>
          </header>
          <ul className="object-grid" aria-label="Examples of material you can bring">
            {orientationObjects.map((object, index) => (
              <li key={object}><span>{String(index + 1).padStart(2, "0")}</span>{object}</li>
            ))}
          </ul>
        </section>

        <section className="landing-section source-layer" aria-labelledby="sources-heading">
          <header className="landing-section-heading">
            <p className="section-index">02 · Orient across existing knowledge</p>
            <h2 id="sources-heading">Knowledge remains where it already exists.</h2>
            <p>
              Books remain books. Research papers remain papers. Repositories and
              knowledge bases remain their own. NEXAH does not replace them; it
              creates orientation across them.
            </p>
            <p className="source-boundary">
              The source ecosystem remains external. No connector is active in this
              deterministic review build.
            </p>
            <a className="framework-link" href="https://nexah.de" rel="noreferrer" target="_blank">The wider NEXAH framework at nexah.de ↗</a>
          </header>
          <div className="source-map" aria-label="Relationship between existing knowledge, NEXAH and NEXAHEDRON">
            <ul aria-label="Existing knowledge sources">
              {sourceTypes.map((source) => <li key={source}>{source}</li>)}
            </ul>
            <div className="nexah-layer">
              <span>NEXAH</span>
              <strong>Orientation Layer</strong>
              <small>Creates orientation across existing sources</small>
            </div>
            <div className="laboratory-access">
              <span>NEXAHEDRON</span>
              <strong>Orientation Laboratory</strong>
              <small>First application · human access to NEXAH</small>
            </div>
          </div>
        </section>

        <section className="orientation-entry mode-entry" id="orientation-modes" aria-labelledby="modes-heading">
          <header className="entry-heading">
            <p className="eyebrow">03 · Enter the Laboratory</p>
            <h2 id="modes-heading">Choose how you would like to begin.</h2>
            <p>
              Choose the kind of orientation you are looking for. You can change
              direction later; the mode is an intention, not an identity.
            </p>
          </header>

          <div className="mode-grid" aria-label="Orientation modes">
            {orientationModes.map((mode) => (
              <button
                className="mode-card"
                data-testid={`mode-${mode.id}`}
                key={mode.id}
                onClick={() => dispatch({ type: "SELECT_MODE", mode: mode.id })}
                type="button"
              >
                <span className="mode-symbol" aria-hidden="true">{mode.symbol}</span>
                <span className="mode-name">{mode.name}</span>
                <span className="mode-description">{mode.description}</span>
                <span className="mode-verbs">{mode.verbs}</span>
              </button>
            ))}
          </div>

          <div className="entry-boundary">
            <p>
              A scientist, student, child, teacher or engineer may enter through any mode.
            </p>
            <p>
              This review build completes one recorded <strong>Understand</strong> journey.
              No live ORION request is made.
            </p>
          </div>

          <aside className="journey-overview" aria-labelledby="places-heading">
            <p className="eyebrow" id="places-heading">An orientation journey</p>
            <ol>{places.map((place) => <li key={place}>{place}</li>)}</ol>
          </aside>
        </section>

        <section className="boundary-section" id="authority" aria-labelledby="authority-heading">
          <div className="section-heading">
            <div>
              <p className="section-index">04 · Authority remains visible</p>
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

  if (state.screen === "object") {
    return (
      <JourneyRoom step="01" label={activeMode.name} mode={state.mode}>
        <div className="room-copy">
          <p className="eyebrow">{activeMode.symbol} · {activeMode.name} entrance</p>
          <h1 ref={headingRef} tabIndex={-1}>{activeMode.openingQuestion}</h1>
          <p>{activeMode.openingSupport}</p>
        </div>

        <div className="question-panel onboarding-panel mode-onboarding-panel">
          <div className="mode-prompt-strip" aria-hidden="true">
            <span>{activeMode.symbol}</span>
            <p>{activeMode.verbs}</p>
          </div>

          <label htmlFor="orientation-object-type">{activeMode.kindLabel}</label>
          <select
            data-testid="orientation-object-type"
            id="orientation-object-type"
            onChange={(event) => dispatch({ type: "EDIT_OBJECT_TYPE", value: event.target.value as OrientationObjectType })}
            value={state.objectType}
          >
            <option value="">Choose a kind…</option>
            {activeMode.objectTypes.map((type) => <option key={type} value={type}>{type}</option>)}
          </select>

          <label htmlFor="orientation-object">{activeMode.primaryLabel}</label>
          <textarea
            id="orientation-object"
            data-testid="orientation-object"
            maxLength={300}
            onChange={(event) => dispatch({ type: "EDIT_OBJECT_DESCRIPTION", value: event.target.value })}
            placeholder={activeMode.primaryPlaceholder}
            value={state.objectDescription}
          />
          {activeMode.secondaryLabel && (
            <>
              <label htmlFor="orientation-object-secondary">{activeMode.secondaryLabel}</label>
              <textarea
                id="orientation-object-secondary"
                data-testid="orientation-object-secondary"
                maxLength={300}
                onChange={(event) => dispatch({ type: "EDIT_SECONDARY_OBJECT_DESCRIPTION", value: event.target.value })}
                placeholder={activeMode.secondaryPlaceholder}
                value={state.secondaryObjectDescription}
              />
            </>
          )}

          <fieldset className="mode-examples">
            <legend>Examples for {activeMode.name}</legend>
            <div>
              {activeMode.examples.map((example, index) => (
                <button
                  data-testid={index === 0 ? "use-object-example" : undefined}
                  key={example.label}
                  onClick={() => dispatch({
                    type: "USE_OBJECT_EXAMPLE",
                    description: example.primary,
                    objectType: example.objectType,
                    secondaryDescription: example.secondary,
                  })}
                  type="button"
                >
                  {example.label}
                </button>
              ))}
            </div>
          </fieldset>
          <div className="field-meta">
            <span>{activeMode.secondaryLabel ? "Two starting points form this orientation." : "You can revise this before confirming scope."}</span>
            <span>{state.objectDescription.length}{activeMode.secondaryLabel ? ` + ${state.secondaryObjectDescription.length} / 300 each` : " / 300"}</span>
          </div>
          {state.objectIssue === "empty" && (
            <p className="field-message" role="alert">
              {activeMode.secondaryLabel
                ? "Choose a kind and name both starting points."
                : "Choose a kind and describe what you are bringing."}
            </p>
          )}
          <div className="room-actions">
            <button className="secondary-button" data-testid="change-mode" onClick={() => dispatch({ type: "CHANGE_MODE" })} type="button">Change mode</button>
            <button
              className="primary-button"
              data-testid="continue-object"
              disabled={!state.objectType || !state.objectDescription.trim() || Boolean(activeMode.secondaryLabel && !state.secondaryObjectDescription.trim())}
              onClick={() => dispatch({ type: "SUBMIT_OBJECT" })}
              type="button"
            >
              {activeMode.nextAction}
            </button>
          </div>
        </div>
      </JourneyRoom>
    );
  }

  if (state.screen === "intention") {
    return (
      <JourneyRoom step="02" label={`${activeMode.name} intention`} mode={state.mode}>
        <div className="room-copy">
          <p className="eyebrow">{activeMode.symbol} · {activeMode.name} · {state.objectType}</p>
          <h1 ref={headingRef} tabIndex={-1}>{activeMode.intentionQuestion}</h1>
          <p>{activeMode.intentionSupport}</p>
        </div>

        <div className="question-panel onboarding-panel">
          <div className="object-reference">
            <span>Orientation Object</span>
            <strong>{state.objectDescription}</strong>
            {state.secondaryObjectDescription && <strong>{state.secondaryObjectDescription}</strong>}
          </div>
          <label htmlFor="orientation-intention">Your intention</label>
          <textarea
            id="orientation-intention"
            data-testid="orientation-intention"
            maxLength={300}
            onChange={(event) => dispatch({ type: "EDIT_INTENTION", value: event.target.value })}
            placeholder={activeMode.intentionPlaceholder}
            value={state.intention}
          />
          <div className="field-meta">
            <button className="text-button" data-testid="use-intention-example" onClick={() => dispatch({ type: "USE_INTENTION_EXAMPLE", value: activeMode.intentionExample })} type="button">Use a {activeMode.name.toLowerCase()} example</button>
            <span>{state.intention.length} / 300</span>
          </div>
          {state.intentionIssue === "empty" && <p className="field-message" role="alert">Describe the direction you want to take.</p>}
          {state.intentionIssue === "unsupported" && (
            <p className="field-message" role="alert">
              This review build can complete only the recorded Understand + Observation journey. Nothing was sent or inferred. Choose that mode and the recorded examples to continue.
            </p>
          )}
          <div className="room-actions">
            <button className="secondary-button" data-testid="back-to-object" onClick={() => dispatch({ type: "BACK_TO_OBJECT" })} type="button">Back to the object</button>
            <button className="primary-button" data-testid="continue-intention" disabled={!state.intention.trim()} onClick={submitIntention} type="button">Confirm the scope</button>
          </div>
        </div>
      </JourneyRoom>
    );
  }

  if (state.screen === "scope") {
    return (
      <JourneyRoom step="03" label="Scope" mode={state.mode}>
        <div className="room-copy">
          <p className="eyebrow lyra-accent">LYRA boundary · recorded translation</p>
          <h1 ref={headingRef} tabIndex={-1}>Confirm the scope.</h1>
          <p>The structured direction below is copied from the canonical fixture. It is not created by this Laboratory.</p>
        </div>

        <section className="confirmation-card" aria-label="Orientation scope">
          <dl className="confirmation-definitions">
            <Definition label="Orientation mode" value={modeName(state.mode)} />
            <Definition label="Orientation Object" value={formatOrientationObject(state)} />
            <Definition label="Your intention" value={state.intention} />
            <Definition label="Starting from" value={fixture.translation.sourceRepresentation} />
            <Definition label="Looking toward" value={fixture.translation.targetRepresentation} />
            <Definition label="Recorded intents" value={fixture.translation.intents.join(" + ")} />
          </dl>
          <p className="boundary-note">Confirming loads a deterministic report fixture. The ORION gateway remains unavailable.</p>
          <div className="room-actions">
            <button className="secondary-button" data-testid="back-to-intention" onClick={() => dispatch({ type: "BACK_TO_INTENTION" })} type="button">Adjust intention</button>
            <button className="primary-button" data-testid="confirm-scope" onClick={() => dispatch({ type: "CONFIRM_SCOPE" })} type="button">Begin orientation</button>
          </div>
        </section>
      </JourneyRoom>
    );
  }

  if (state.screen === "report") {
    return (
      <JourneyRoom step="04" label="Orientation">
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
      <JourneyRoom step="05" label="Reflection" quiet>
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
    <JourneyRoom step="06" label="Departure" quiet>
      <div className="departure-room">
        <p className="eyebrow">The journey is complete</p>
        <h1 ref={headingRef} tabIndex={-1}>You can leave this orientation here.</h1>
        <p>The orientation remains a map, not a decision. No session, material, intention or Reflection has been saved.</p>
        <dl className="departure-summary">
          <Definition label="Orientation mode" value={modeName(state.mode)} />
          <Definition label="Orientation Object" value={formatOrientationObject(state)} />
          <Definition label="Intention" value={fixture.request.utterance} />
          <Definition label="Orientation status" value="Blocked" />
          <Definition label="What was produced" value="A registered plan and report fixture" />
          <Definition label="What was not produced" value="A Target Representation" />
        </dl>
        <button className="primary-button" data-testid="begin-again" onClick={() => dispatch({ type: "RESTART" })} type="button">Return to the Laboratory</button>
      </div>
    </JourneyRoom>
  );
}

function JourneyRoom({ children, label, mode = null, quiet = false, step }: { children: React.ReactNode; label: string; mode?: OrientationMode | null; quiet?: boolean; step: string }) {
  return (
    <section
      className={`journey-room${quiet ? " journey-room-quiet" : ""}${mode ? ` mode-tone-${mode}` : ""}`}
      data-mode={mode ?? undefined}
      data-screen={label.toLowerCase()}
    >
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

function modeName(mode: OrientationMode | null) {
  return orientationModes.find((item) => item.id === mode)?.name ?? "Orientation";
}

function getModeProfile(mode: OrientationMode | null) {
  return orientationModes.find((item) => item.id === mode) ?? orientationModes[1];
}

function formatOrientationObject(state: {
  objectType: OrientationObjectType;
  objectDescription: string;
  secondaryObjectDescription: string;
}) {
  const subjects = state.secondaryObjectDescription
    ? `${state.objectDescription} ↔ ${state.secondaryObjectDescription}`
    : state.objectDescription;
  return `${state.objectType} · ${subjects}`;
}
