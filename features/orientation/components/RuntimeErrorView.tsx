import { PublicValueView } from "@/features/orientation/components/PublicValueView";
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

export function RuntimeErrorView({ error }: { readonly error: RuntimeErrorV1 }) {
  return (
    <section className="runtime-error" aria-labelledby="runtime-error-title">
      <header className="report-header">
        <p className="eyebrow">{error.kind}</p>
        <h1 id="runtime-error-title">{titles[error.kind]}</h1>
        <p>{error.reason_code}</p>
      </header>
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
    </section>
  );
}

function Row({ label, value }: { readonly label: string; readonly value: unknown }) {
  return <div><dt>{label}</dt><dd><PublicValueView value={value} /></dd></div>;
}
