"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ClarificationView } from "@/features/orientation/components/ClarificationView";
import { BoundaryFailureView } from "@/features/orientation/components/BoundaryFailureView";
import { PublicValueView } from "@/features/orientation/components/PublicValueView";
import { OrionBoundarySummary } from "@/features/orientation/components/OrionBoundarySummary";
import { ReportView } from "@/features/orientation/components/ReportView";
import { RuntimeErrorView } from "@/features/orientation/components/RuntimeErrorView";
import { mapToOrientationRequest, type ClarificationValues } from "@/features/orientation/integration/request-mapping";
import { useAlphaJourney } from "@/hooks/use-alpha-journey";
import { alphaRoutes } from "@/lib/routes";
import { invokeOrion, type ClarificationResultV1, type OrionInvocationResult } from "@/packages/orion-gateway/src/index";

type ExecutionPhase = "preparing" | "submitting" | "orienting" | "receiving" | "outcome" | "clarification_review";

const loadingStages = ["Preparing request", "Submitting", "Orienting", "Receiving report"] as const;

export function OrientationSessionScreen() {
  const router = useRouter();
  const { state, dispatch } = useAlphaJourney();
  const [phase, setPhase] = useState<ExecutionPhase>("preparing");
  const [result, setResult] = useState<OrionInvocationResult | null>(null);
  const [clarificationValues, setClarificationValues] = useState<ClarificationValues>({});
  const started = useRef(false);

  function returnToRest() {
    dispatch({ type: "RETURN_TO_REST" });
    router.push(alphaRoutes.wonder);
  }

  const execute = useCallback(async (
    requestVersion: number,
    clarification?: ClarificationResultV1,
    values: ClarificationValues = {},
  ) => {
    if (!state.executionRequestId) return;
    setPhase("preparing");
    const envelope = mapToOrientationRequest(state, state.executionRequestId, requestVersion, clarification, values);
    setPhase("submitting");
    const pending = invokeOrion(envelope);
    setPhase("orienting");
    const nextResult = await pending;
    setPhase("receiving");
    setResult(nextResult);
    setPhase("outcome");
  }, [state]);

  useEffect(() => {
    if (started.current || state.step !== "orientation" || !state.executionRequestId) return;
    started.current = true;
    void execute(1);
  }, [execute, state.executionRequestId, state.step]);

  if (state.step !== "orientation" || !state.executionRequestId) {
    return (
      <section className="page page--focused failure-boundary" aria-labelledby="no-request-title">
        <p className="eyebrow">No submitted request</p>
        <h1 id="no-request-title">Return to confirmation.</h1>
        <p>The Laboratory has no Human-confirmed request to execute.</p>
        <button className="action action--primary" type="button" onClick={() => router.push(alphaRoutes.confirmation)}>Open confirmation</button>
      </section>
    );
  }

  if (phase === "clarification_review" && result?.kind === "public_outcome" && result.outcome.kind === "clarification") {
    const clarification = result.outcome.clarification;
    const clarified = mapToOrientationRequest(state, state.executionRequestId, Number(clarification.request_version) + 1, clarification, clarificationValues).request;
    return (
      <section className="page page--confirmation" aria-labelledby="clarified-request-title">
        <header className="report-header"><p className="eyebrow">Clarified request</p><h1 id="clarified-request-title">Confirm the new request version.</h1><p>All valid context is preserved. Only the values requested by ORION have changed.</p></header>
        <dl className="contract-table clarification-review">
          <Row label="Request" value={`${clarified.request_id}@${clarified.request_version}`} />
          <Row label="Orientation Object" value={clarified.orientation_objects[0]} />
          <Row label="Intention" value={clarified.intention} />
          <Row label="Scope" value={clarified.scope} />
          <Row label="Clarification of" value={clarified.clarification_of} />
          <Row label="Effects" value={clarified.effects} />
        </dl>
        <div className="confirmation-actions"><button className="action action--quiet" type="button" onClick={() => setPhase("outcome")}>Back to clarification</button><button className="action action--primary" type="button" onClick={() => void execute(Number(clarification.request_version) + 1, clarification, clarificationValues)}>Resubmit Orientation Request <span aria-hidden="true">→</span></button></div>
      </section>
    );
  }

  if (phase !== "outcome" || !result) {
    return <OrientationLoading phase={phase} objectTitle={state.object.title} intention={state.request.intention} />;
  }

  if (result.kind === "boundary_failure") {
    return <BoundaryFailureView failure={result.failure} onReturn={() => { dispatch({ type: "RETURN_TO_CONFIRMATION" }); router.push(alphaRoutes.confirmation); }} onRest={returnToRest} />;
  }

  const outcome = result.outcome;
  if (outcome.kind === "clarification") {
    return <div className="page page--session"><ClarificationView clarification={outcome.clarification} values={clarificationValues} onChange={setClarificationValues} onSubmit={() => setPhase("clarification_review")} /></div>;
  }
  if (outcome.kind === "runtime_error") {
    return <div className="page page--session"><RuntimeErrorView error={outcome.error} onRest={returnToRest} /></div>;
  }
  return <div className="page page--session"><ReportView report={outcome.report} evidence={outcome.evidence} continuations={outcome.continuations} /></div>;
}

function OrientationLoading({ phase, objectTitle, intention }: { readonly phase: ExecutionPhase; readonly objectTitle: string; readonly intention: string }) {
  const currentIndex = Math.max(0, ["preparing", "submitting", "orienting", "receiving"].indexOf(phase));
  return (
    <section className="page page--focused orientation-loading" aria-labelledby="loading-title" aria-live="polite">
      <p className="eyebrow">Public Gateway request in progress</p>
      <h1 id="loading-title">{loadingStages[currentIndex]}</h1>
      <p>Your confirmed object, intention and scope are being submitted. A reachable Gateway is not yet an ORION result.</p>
      <OrionBoundarySummary
        gatewayStatus="Submission is in progress; final reachability is not yet known."
        outcomeStatus="No public outcome has been received."
        producer="NEXAHEDRON Gateway consumer"
        contractType="OrientationRequest"
      />
      <dl><div><dt>Object</dt><dd>{objectTitle}</dd></div><div><dt>Intention</dt><dd>{intention}</dd></div></dl>
      <ol>{loadingStages.map((stage, index) => <li key={stage} className={index === currentIndex ? "is-current" : index < currentIndex ? "is-complete" : undefined} aria-current={index === currentIndex ? "step" : undefined}>{stage}</li>)}</ol>
    </section>
  );
}

function Row({ label, value }: { readonly label: string; readonly value: unknown }) {
  return <div><dt>{label}</dt><dd><PublicValueView value={value} /></dd></div>;
}
