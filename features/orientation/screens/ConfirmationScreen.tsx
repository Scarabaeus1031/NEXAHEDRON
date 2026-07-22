"use client";

import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { PageIntro } from "@/components/ui/PageIntro";
import { RequestSummary } from "@/features/orientation/components/RequestSummary";
import { useAlphaJourney } from "@/hooks/use-alpha-journey";
import { alphaRoutes } from "@/lib/routes";

function listOrFallback(items: readonly string[], fallback = "None specified") {
  const values = items.filter(Boolean);
  return values.length ? <ul>{values.map((value) => <li key={value}>{value}</li>)}</ul> : <span>{fallback}</span>;
}

export function ConfirmationScreen() {
  const router = useRouter();
  const { state, dispatch } = useAlphaJourney();
  const prepared = state.step === "prepared";
  const source = state.object.url || state.object.fileName || "Not provided";

  function editRequest() {
    dispatch({ type: "EDIT_REQUEST" });
    router.push(alphaRoutes.request);
  }

  if (prepared) {
    return (
      <section className="page page--focused prepared" aria-labelledby="prepared-title">
        <p className="eyebrow">Preparation complete</p>
        <h1 id="prepared-title">Orientation Request prepared.</h1>
        <p className="completion__lead">This request is complete. Execution will become available when ORION integration begins.</p>
        <RequestSummary compact />
        <div className="boundary-note">
          <strong>Effects: none</strong>
          <p>No request was serialized, transmitted or executed. The prepared request exists only in local application memory.</p>
        </div>
        <button className="action action--quiet" type="button" onClick={() => { dispatch({ type: "RESET" }); router.push(alphaRoutes.landing); }}>
          Return to the Laboratory
        </button>
      </section>
    );
  }

  return (
    <section className="page page--confirmation" aria-labelledby="confirmation-title">
      <PageIntro index="06" eyebrow="Confirmation" title="Confirm what you are preparing." titleId="confirmation-title">
        <p>Review the complete Human-authored request before it reaches the intentional Sprint 2 boundary.</p>
      </PageIntro>

      <dl className="confirmation-sheet">
        <ConfirmationRow label="Orientation Object" value={state.object.title || "Missing"} />
        <ConfirmationRow label="Object type" value={state.object.type || "Missing"} />
        <ConfirmationRow label="Source" value={source} />
        <ConfirmationRow label="Version" value="Not provided" />
        <ConfirmationRow label="Intention" value={state.request.intention} />
        <ConfirmationRow label="Focus" value={state.request.focus || "Not specified"} />
        <ConfirmationRow label="Scope Include" value={listOrFallback(state.request.scopeInclude)} />
        <ConfirmationRow label="Scope Exclude" value={listOrFallback(state.request.scopeExclude)} />
        <ConfirmationRow label="Depth" value={state.request.depth} />
        <ConfirmationRow label="Success Boundary" value={state.request.successBoundary || "Not specified"} />
        <ConfirmationRow label="Wonder note" value={state.wonder || "Not provided"} />
        <ConfirmationRow label="Effects" value="none" />
      </dl>

      <div className="confirmation-actions">
        <button className="action action--quiet" type="button" onClick={editRequest}>Edit request</button>
        <button className="action action--primary" type="button" onClick={() => dispatch({ type: "CONFIRM_REQUEST" })}>
          Prepare Orientation Request <span aria-hidden="true">→</span>
        </button>
      </div>
    </section>
  );
}

function ConfirmationRow({ label, value }: { readonly label: string; readonly value: ReactNode }) {
  return <div className="confirmation-row"><dt>{label}</dt><dd>{value}</dd></div>;
}
