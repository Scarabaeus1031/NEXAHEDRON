import { PublicValueView } from "@/features/orientation/components/PublicValueView";
import { OrionBoundarySummary } from "@/features/orientation/components/OrionBoundarySummary";
import type { RuntimeErrorV1 } from "@/packages/orion-gateway/src/index";

const titles: Readonly<Record<RuntimeErrorV1["kind"], string>> = {
  invalid: "This request cannot begin yet",
  validation_failed: "This request cannot begin yet",
  unsupported: "This orientation is not available in Alpha",
  blocked: "A required boundary is unavailable",
  unavailable: "Orientation is temporarily unavailable",
  internal_failure: "No trustworthy report was produced",
  clarification_required: "One boundary needs your attention",
};

export function RuntimeErrorView({ error, onRest }: { readonly error: RuntimeErrorV1; readonly onRest: () => void }) {
  return (
    <section className="runtime-error" aria-labelledby="runtime-error-title">
      <header className="report-header">
        <p className="eyebrow">{error.kind}</p>
        <h1 id="runtime-error-title">{titles[error.kind]}</h1>
        <p>{error.reason_code}</p>
      </header>
      <OrionBoundarySummary
        gatewayStatus="A public contract-shaped Runtime Error reached the Workspace through the Gateway."
        outcomeStatus={`No Orientation Report was accepted. STOP: ${error.stage ?? error.kind}.`}
        producer="Compatible Runtime response observed through the public Gateway"
        contractType={`RuntimeError ${error.error_version}`}
      />
      <dl className="contract-table public-error-fields">
        <Row label="Error identity" value={`${error.error_id}@${error.error_version}`} />
        <Row label="Request" value={error.request_id ? `${error.request_id}@${error.request_version}` : null} />
        <Row label="Stage" value={error.stage} />
        <Row label="Issues" value={error.issues} />
        <Row label="Retry" value={error.retry} />
        <Row label="Continuation" value={error.continuation} />
        <Row label="Result reference" value={error.result_ref} />
        <Row label="Effects" value={error.effects} />
      </dl>
      <div className="boundary-actions">
        <button className="action action--primary" type="button" onClick={onRest}>Return to Working Session Record</button>
      </div>
    </section>
  );
}

function Row({ label, value }: { readonly label: string; readonly value: unknown }) {
  return <div><dt>{label}</dt><dd><PublicValueView value={value} /></dd></div>;
}
