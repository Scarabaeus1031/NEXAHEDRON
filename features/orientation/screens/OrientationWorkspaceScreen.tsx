"use client";

import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { Field } from "@/components/ui/Field";
import { PlateTectonicsEncounter } from "@/features/encounter/PlateTectonicsEncounter";
import { MaterialFolio } from "@/features/orientation/components/MaterialFolio";
import { ScopeListEditor } from "@/features/orientation/components/ScopeListEditor";
import { orientationObjectTypes } from "@/features/orientation/constants";
import {
  canEnterWorkspaceOperation,
  validateWorkspaceOperation,
  type WorkspaceNoteField,
} from "@/features/orientation/state";
import { useWorkspaceDraft } from "@/features/orientation/workspace-context";
import { useAlphaJourney } from "@/hooks/use-alpha-journey";
import { alphaRoutes } from "@/lib/routes";
import type {
  OrientationDepth,
  OrientationObjectType,
  OrientationWorkspaceOperation,
} from "@/types/alpha";

const operations: ReadonlyArray<{
  readonly id: OrientationWorkspaceOperation;
  readonly label: string;
  readonly prompt: string;
}> = [
  { id: "anchor", label: "Anchor", prompt: "What are you trying to orient?" },
  { id: "place", label: "Place", prompt: "What have you brought?" },
  { id: "attend", label: "Attend", prompt: "What deserves attention?" },
  { id: "relate", label: "Relate", prompt: "How does it meet your question?" },
  { id: "bound", label: "Bound", prompt: "What belongs—and what remains uncertain?" },
  { id: "turn", label: "Turn", prompt: "What changes from another position?" },
  { id: "reflect", label: "Reflect", prompt: "What can you now see more clearly?" },
  { id: "rest", label: "Rest", prompt: "Let the orientation remain open." },
];

const depthOptions: ReadonlyArray<{ value: OrientationDepth; description: string }> = [
  { value: "Overview", description: "Hold the wider field." },
  { value: "Focused", description: "Stay with the selected question." },
  { value: "Deep", description: "Examine the chosen boundary closely." },
];

export function OrientationWorkspaceScreen() {
  const { state, dispatch } = useAlphaJourney();
  const router = useRouter();
  const { wonderDraft, setWonderDraft } = useWorkspaceDraft();
  const operation = state.workspace.operation;
  const active = operations.find((item) => item.id === operation) ?? operations[0];
  const focusRef = useRef<HTMLHeadingElement>(null);
  const [issueOperation, setIssueOperation] = useState<OrientationWorkspaceOperation | null>(null);

  useEffect(() => {
    focusRef.current?.focus();
  }, [operation]);

  function canEnter(candidate: OrientationWorkspaceOperation) {
    return canEnterWorkspaceOperation(state, candidate);
  }

  return (
    <section className="page orientation-workspace" aria-labelledby="workspace-operation-title">
      <header className="orientation-workspace__header">
        <div>
          <p className="eyebrow">Live Bounded Experiment · Human-held</p>
          <h1>Your material stays on one table.</h1>
        </div>
        <p>
          Each operation changes the focus, not the place. This working state
          exists in browser memory only. Nothing crosses the ORION boundary
          until you review and confirm it.
        </p>
      </header>

      <nav className="operation-trace" aria-label="Orientation operations">
        <ol>
          {operations.map((item) => {
            const available = canEnter(item.id);
            const complete = validateWorkspaceOperation(state, item.id);
            return (
              <li
                key={item.id}
                className={[
                  item.id === operation ? "is-current" : "",
                  complete ? "is-complete" : "",
                ].filter(Boolean).join(" ")}
              >
                <button
                  type="button"
                  disabled={!available}
                  aria-current={item.id === operation ? "step" : undefined}
                  onClick={() => {
                    if (item.id !== operation) {
                      setIssueOperation(null);
                      dispatch({ type: "SET_WORKSPACE_OPERATION", operation: item.id });
                    }
                  }}
                >
                  <span aria-hidden="true" />
                  {item.label}
                </button>
              </li>
            );
          })}
        </ol>
      </nav>

      <section className="question-anchor" aria-labelledby="question-anchor-title">
        <p className="eyebrow">Question Anchor</p>
        <h2 id="question-anchor-title">
          {wonderDraft.trim() || state.wonder || "Your question remains open."}
        </h2>
        <span>Human-authored · always visible</span>
      </section>

      <div className="orientation-workspace__focus">
        <header className="operation-heading">
          <p className="eyebrow">Now looking through · {active.label}</p>
          <h2 id="workspace-operation-title" ref={focusRef} tabIndex={-1}>
            {active.prompt}
          </h2>
        </header>

        {operation === "anchor" ? renderAnchorOperation() : null}
        {operation === "place" ? renderPlaceOperation() : null}
        {operation === "attend" ? renderAttendOperation() : null}
        {operation === "relate" ? renderRelateOperation() : null}
        {operation === "bound" ? renderBoundOperation() : null}
        {operation === "turn" ? renderTurnOperation() : null}
        {operation === "reflect" ? renderReflectOperation() : null}
        {operation === "rest" ? renderRestOperation() : null}
      </div>
    </section>
  );

  function renderAnchorOperation() {
    function submit(event: FormEvent<HTMLFormElement>) {
      event.preventDefault();
      if (!wonderDraft.trim()) {
        setIssueOperation("anchor");
        return;
      }
      dispatch({ type: "SAVE_WONDER", value: wonderDraft });
    }

    return (
      <form className="operation-form" onSubmit={submit} noValidate>
        <MaterialFolio>
          <label className="sr-only" htmlFor="orientation-anchor">Question Anchor</label>
          <textarea
            id="orientation-anchor"
            value={wonderDraft}
            onChange={(event) => {
              setWonderDraft(event.target.value);
              if (event.target.value.trim()) setIssueOperation(null);
            }}
            placeholder="I noticed… / I want to understand… / I am uncertain about…"
            rows={7}
            autoFocus
            aria-invalid={issueOperation === "anchor"}
            aria-describedby="anchor-note anchor-issue"
          />
          <p className="form-guidance" id="anchor-note">
            This sentence remains the fixed reference for the entire session.
          </p>
          <p className="field-issue" id="anchor-issue" role="alert">
            {issueOperation === "anchor" ? "Name what you want to stay with." : ""}
          </p>
        </MaterialFolio>
        {renderOperationAction("Place this on the table")}
      </form>
    );
  }

  function renderPlaceOperation() {
    function update(value: {
      title?: string;
      type?: OrientationObjectType;
      url?: string;
      fileName?: string;
    }) {
      dispatch({ type: "UPDATE_OBJECT", value });
    }

    function chooseFile(event: ChangeEvent<HTMLInputElement>) {
      update({ fileName: event.target.files?.[0]?.name ?? "" });
    }

    function submit(event: FormEvent<HTMLFormElement>) {
      event.preventDefault();
      if (!validateWorkspaceOperation(state, "place")) {
        setIssueOperation("place");
        return;
      }
      dispatch({ type: "SET_WORKSPACE_OPERATION", operation: "attend" });
    }

    return (
      <form className="operation-form operation-form--encounter" onSubmit={submit} noValidate>
        <MaterialFolio>
          <div className="object-primary-fields">
            <Field id="workspace-object-title" label="Material title">
              <input
                id="workspace-object-title"
                value={state.object.title}
                onChange={(event) => update({ title: event.target.value })}
                aria-invalid={issueOperation === "place" && !state.object.title.trim()}
                required
              />
            </Field>
            <Field id="workspace-object-type" label="Material type">
              <select
                id="workspace-object-type"
                value={state.object.type}
                onChange={(event) => update({ type: event.target.value as OrientationObjectType })}
                aria-invalid={issueOperation === "place" && !state.object.type}
                required
              >
                <option value="">Choose a type</option>
                {orientationObjectTypes.map((type) => <option key={type}>{type}</option>)}
              </select>
            </Field>
          </div>
          <div className="source-fields source-fields--compact">
            <Field id="workspace-object-url" label="Reference URL" optional hint="Held as an address only; no retrieval occurs.">
              <input
                id="workspace-object-url"
                type="url"
                inputMode="url"
                placeholder="https://"
                value={state.object.url}
                onChange={(event) => update({ url: event.target.value })}
              />
            </Field>
            <Field id="workspace-object-file" label="Local file reference" optional hint="Only the filename is held locally. The file is not read or uploaded.">
              <input id="workspace-object-file" type="file" onChange={chooseFile} />
            </Field>
          </div>
          {issueOperation === "place" && !validateWorkspaceOperation(state, "place") ? (
            <p className="field-issue" role="alert">Name the material and choose its type.</p>
          ) : null}
        </MaterialFolio>
        <PlateTectonicsEncounter />
        {renderOperationAction("Attend to this material")}
      </form>
    );
  }

  function renderAttendOperation() {
    return renderOperationForm({
      current: "attend",
      next: "relate",
      action: "Place this attention",
      children: (
        <MaterialFolio>
          <div className="orientation-fields">
            <Field id="workspace-intention" label="Intention" hint="What do you want to understand?">
              <textarea
                id="workspace-intention"
                value={state.request.intention}
                onChange={(event) => dispatch({
                  type: "EDIT_REQUEST_FIELD",
                  field: "intention",
                  value: event.target.value,
                })}
                placeholder="I want to understand…"
                rows={4}
              />
            </Field>
            <Field id="workspace-focus" label="Focus" optional hint="What deserves particular attention?">
              <textarea
                id="workspace-focus"
                value={state.request.focus}
                onChange={(event) => dispatch({
                  type: "EDIT_REQUEST_FIELD",
                  field: "focus",
                  value: event.target.value,
                })}
                placeholder="Pay particular attention to…"
                rows={3}
              />
            </Field>
          </div>
        </MaterialFolio>
      ),
    });
  }

  function renderRelateOperation() {
    return renderOperationForm({
      current: "relate",
      next: "bound",
      action: "Keep this relationship",
      children: (
        <>
        <div className="relationship-sheet">
          <div><span>Anchor</span><strong>{state.wonder}</strong></div>
          <i aria-hidden="true" />
          <div><span>Material</span><strong>{state.object.title}</strong></div>
        </div>
        <Field id="workspace-relation" label="Relationship" hint="Describe only the relationship you can currently name.">
          <textarea
            id="workspace-relation"
            value={state.workspace.relation}
            onChange={(event) => editWorkspaceNote("relation", event.target.value)}
            placeholder="This material matters to my question because…"
            rows={5}
          />
        </Field>
        <p className="operation-boundary">No relationship is inferred. This is your working statement.</p>
        </>
      ),
    });
  }

  function renderBoundOperation() {
    return renderOperationForm({
      current: "bound",
      next: "turn",
      action: "Hold these boundaries",
      children: (
        <>
        <div className="boundary-fields">
          <ScopeListEditor
            field="scopeInclude"
            label="Inside this orientation"
            description="Name what belongs on the table now."
            required
            showIssue={issueOperation === "bound"}
          />
          <ScopeListEditor
            field="scopeExclude"
            label="Outside for now"
            description="Name what you are deliberately not trying to resolve."
          />
        </div>
        <Field id="workspace-uncertainty" label="Uncertainty to preserve" hint="Rest does not require this uncertainty to disappear.">
          <textarea
            id="workspace-uncertainty"
            value={state.workspace.uncertainty}
            onChange={(event) => editWorkspaceNote("uncertainty", event.target.value)}
            placeholder="I still do not know…"
            rows={4}
          />
        </Field>
        <div className="evidence-underlay">
          <span>Evidence Underlay</span>
          <strong>No evidence is attached.</strong>
          <p>A reference address or filename does not become evidence automatically.</p>
        </div>
        </>
      ),
    });
  }

  function renderTurnOperation() {
    return renderOperationForm({
      current: "turn",
      next: "reflect",
      action: "Keep this turn",
      children: (
        <>
        <fieldset className="turn-depth">
          <legend>Working resolution</legend>
          {depthOptions.map((option) => (
            <label key={option.value} className={state.request.depth === option.value ? "is-selected" : undefined}>
              <input
                type="radio"
                name="workspace-depth"
                value={option.value}
                checked={state.request.depth === option.value}
                onChange={() => dispatch({
                  type: "EDIT_REQUEST_FIELD",
                  field: "depth",
                  value: option.value,
                })}
              />
              <strong>{option.value}</strong>
              <span>{option.description}</span>
            </label>
          ))}
        </fieldset>
        <Field id="workspace-turn" label="Another position" hint="Change scale, reference, representation, or point of view without claiming a conclusion.">
          <textarea
            id="workspace-turn"
            value={state.workspace.turn}
            onChange={(event) => editWorkspaceNote("turn", event.target.value)}
            placeholder="If I look from another scale or position…"
            rows={5}
          />
        </Field>
        </>
      ),
    });
  }

  function renderReflectOperation() {
    return renderOperationForm({
      current: "reflect",
      next: "rest",
      action: "Let this rest",
      children: (
        <>
        <div className="reflection-sheet">
          <span>Anchor</span><p>{state.wonder}</p>
          <span>Relationship</span><p>{state.workspace.relation}</p>
          <span>Turn</span><p>{state.workspace.turn}</p>
          <span>Uncertainty</span><p>{state.workspace.uncertainty}</p>
        </div>
        <Field id="workspace-reflection" label="Your reflection" hint="This remains Human-authored. The Laboratory does not complete it for you.">
          <textarea
            id="workspace-reflection"
            value={state.workspace.reflection}
            onChange={(event) => editWorkspaceNote("reflection", event.target.value)}
            placeholder="I can now see… / The question has changed because…"
            rows={6}
          />
        </Field>
        </>
      ),
    });
  }

  function renderRestOperation() {
    return (
      <section className="rest-sheet" aria-labelledby="rest-title">
        <div className="rest-sheet__mark" aria-hidden="true">✦</div>
        <div>
          <p className="eyebrow">Working Session Record · Rest View</p>
          <h3 id="rest-title">This Human-held session is complete at Rest.</h3>
          <p>
            The session has a place, a relationship, a boundary, a turn, and
            your reflection. Its uncertainty remains visible.
          </p>
        </div>
        <dl>
          <div><dt>Anchor</dt><dd>{state.wonder}</dd></div>
          <div><dt>Material</dt><dd>{state.object.title}</dd></div>
          {state.workspace.encounter.sourceId ? (
            <div>
              <dt>Encounter</dt>
              <dd>
                {state.workspace.encounter.fragments.length} exact fragment
                {state.workspace.encounter.fragments.length === 1 ? "" : "s"} kept
                {state.workspace.encounter.fragmentRelation.trim() ? " · relationship named" : ""}
              </dd>
            </div>
          ) : null}
          <div><dt>Attention</dt><dd>{state.request.intention}</dd></div>
          <div><dt>Relationship</dt><dd>{state.workspace.relation}</dd></div>
          <div><dt>Uncertainty preserved</dt><dd>{state.workspace.uncertainty}</dd></div>
          <div><dt>Human reflection</dt><dd>{state.workspace.reflection}</dd></div>
        </dl>
        <div className="continuation-horizon">
          <div>
            <span>Continuation Horizon</span>
            <p>Keep the completed session at Rest, revise one operation, or optionally prepare the bounded request for ORION.</p>
          </div>
          <div>
            <button
              className="action action--quiet"
              type="button"
              onClick={() => dispatch({ type: "RESUME_SESSION", operation: "reflect" })}
            >
              Return to reflection
            </button>
            <button
              className="action action--primary"
              type="button"
              onClick={() => {
                dispatch({ type: "PREPARE_ORION_REQUEST" });
                router.push(alphaRoutes.confirmation);
              }}
            >
              Prepare for ORION <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
        <p className="rest-sheet__boundary">
          This transient Human-held record is not persistent or immutable.
          Reloading or closing the page loses it. ORION is optional and may
          stop at a Gateway, Runtime, contract, or evidence boundary.
        </p>
      </section>
    );
  }

  function editWorkspaceNote(field: WorkspaceNoteField, value: string) {
    dispatch({ type: "EDIT_WORKSPACE_NOTE", field, value });
  }

  function renderOperationForm({
    current,
    next,
    action,
    children,
  }: {
    readonly current: OrientationWorkspaceOperation;
    readonly next: OrientationWorkspaceOperation;
    readonly action: string;
    readonly children: ReactNode;
  }) {
    function submit(event: FormEvent<HTMLFormElement>) {
      event.preventDefault();
      if (!validateWorkspaceOperation(state, current)) {
        setIssueOperation(current);
        return;
      }
      setIssueOperation(null);
      if (next === "rest") {
        dispatch({ type: "REST_SESSION" });
      } else {
        dispatch({ type: "SET_WORKSPACE_OPERATION", operation: next });
      }
    }

    return (
      <form className="operation-form" onSubmit={submit} noValidate>
        {children}
        {issueOperation === current ? (
          <p className="operation-issue" role="alert">
            Complete this Human-authored operation before continuing.
          </p>
        ) : null}
        {renderOperationAction(action)}
      </form>
    );
  }

  function renderOperationAction(label: string) {
    return (
      <div className="operation-action">
        <span>Nothing moves forward without your action.</span>
        <button className="action action--primary" type="submit">
          {label} <span aria-hidden="true">→</span>
        </button>
      </div>
    );
  }
}
