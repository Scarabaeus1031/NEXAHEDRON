"use client";

import { useRouter } from "next/navigation";
import { PageIntro } from "@/components/ui/PageIntro";
import { ValidationSummary } from "@/components/ui/ValidationSummary";
import { OrientationContext } from "@/features/orientation/components/OrientationContext";
import { ReflectionMargin } from "@/features/orientation/components/ReflectionMargin";
import { RequestSummary } from "@/features/orientation/components/RequestSummary";
import { ScopeListEditor } from "@/features/orientation/components/ScopeListEditor";
import { validateRequest } from "@/features/orientation/state";
import { useAlphaJourney } from "@/hooks/use-alpha-journey";
import { alphaRoutes } from "@/lib/routes";
import type { OrientationDepth } from "@/types/alpha";

const depthOptions: ReadonlyArray<{ value: OrientationDepth; description: string }> = [
  { value: "Overview", description: "A broad first map." },
  { value: "Focused", description: "A defined question in context." },
  { value: "Deep", description: "A closer examination of the selected scope." },
];

export function RequestEditorScreen() {
  const router = useRouter();
  const { state, dispatch } = useAlphaJourney();
  const validation = validateRequest(state);
  const includeCount = state.request.scopeInclude.filter((item) => item.trim()).length;
  const excludeCount = state.request.scopeExclude.filter((item) => item.trim()).length;

  function reviewRequest() {
    dispatch({ type: "REVIEW_REQUEST" });
    if (validation.valid) router.push(alphaRoutes.confirmation);
  }

  return (
    <section className="page page--request" aria-labelledby="request-title">
      <PageIntro index="05" eyebrow="Request Editor" title="Define your orientation request." titleId="request-title">
        <p>Set the direction, boundaries and level of detail. You will review everything before Orientation begins.</p>
      </PageIntro>

      <div className="request-workspace">
        <div className="request-main">
          <OrientationContext />

          <section className="editor-card editor-card--intention" aria-labelledby="intention-title">
            <div className="editor-card__heading"><div><p className="eyebrow">Direction</p><h2 id="intention-title">Intention</h2></div><span>Required</span></div>
            <p className="editor-card__description">Describe what you want to understand about this object.</p>
            <label className="sr-only" htmlFor="request-intention">Intention</label>
            <textarea
              id="request-intention"
              value={state.request.intention}
              onChange={(event) => dispatch({ type: "EDIT_REQUEST_FIELD", field: "intention", value: event.target.value })}
              placeholder="I want to understand…"
              aria-invalid={!validation.intention}
              rows={4}
            />
            {!validation.intention ? <p className="field-issue" role="alert">Intention is required.</p> : null}
          </section>

          <section className="editor-card editor-card--focus" aria-labelledby="focus-title">
            <div className="editor-card__heading"><div><p className="eyebrow">Attention</p><h2 id="focus-title">Focus</h2></div><span>Optional</span></div>
            <p className="editor-card__description">Name the aspect that deserves particular attention.</p>
            <label className="sr-only" htmlFor="request-focus">Focus</label>
            <textarea id="request-focus" value={state.request.focus} onChange={(event) => dispatch({ type: "EDIT_REQUEST_FIELD", field: "focus", value: event.target.value })} placeholder="Pay particular attention to…" rows={3} />
          </section>

          <ScopeListEditor field="scopeInclude" label="Scope Include" description="Define what belongs inside this orientation." required />
          <ScopeListEditor field="scopeExclude" label="Scope Exclude" description="Set a visible boundary around what should not be covered." />

          <fieldset className="editor-card depth-card editor-card--depth">
            <legend><span className="eyebrow">Resolution</span>Depth</legend>
            <div className="depth-options">
              {depthOptions.map((option) => (
                <label key={option.value} className={state.request.depth === option.value ? "is-selected" : undefined}>
                  <input type="radio" name="depth" value={option.value} checked={state.request.depth === option.value} onChange={() => dispatch({ type: "EDIT_REQUEST_FIELD", field: "depth", value: option.value })} />
                  <strong>{option.value}</strong>
                  <span>{option.description}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <section className="editor-card editor-card--success" aria-labelledby="success-title">
            <div className="editor-card__heading"><div><p className="eyebrow">Completion</p><h2 id="success-title">Success Boundary</h2></div><span>Optional</span></div>
            <p className="editor-card__description">Describe what would make this orientation sufficient for now.</p>
            <label className="sr-only" htmlFor="request-success">Success Boundary</label>
            <textarea id="request-success" value={state.request.successBoundary} onChange={(event) => dispatch({ type: "EDIT_REQUEST_FIELD", field: "successBoundary", value: event.target.value })} placeholder="This orientation is sufficient when…" rows={3} />
          </section>

          <ValidationSummary validation={validation} />
          <button className="action action--primary" type="button" onClick={reviewRequest} disabled={!validation.valid}>
            Review request <span aria-hidden="true">→</span>
          </button>
        </div>
        <div className="request-rail">
          <RequestSummary />
          <ReflectionMargin
            title={validation.valid ? "The request can be read as a whole." : "The orientation is still taking shape."}
            introduction="Each field makes one part of your intention explicit. The Laboratory is not interpreting the subject."
            notes={[
              { label: "Direction", value: state.request.intention.trim() ? "Named" : "Still open" },
              { label: "Attention", value: state.request.focus.trim() ? "Focus named" : "No particular focus yet" },
              { label: "Boundary", value: `${includeCount} inside · ${excludeCount} outside` },
              { label: "Resolution", value: state.request.depth },
            ]}
            question={!state.request.intention.trim()
              ? "What do you want to understand?"
              : includeCount === 0
                ? "What belongs inside this orientation?"
                : !state.request.successBoundary.trim()
                  ? "What would make this sufficient for now?"
                  : "Does every field still serve your original intention?"}
          />
        </div>
      </div>
    </section>
  );
}
