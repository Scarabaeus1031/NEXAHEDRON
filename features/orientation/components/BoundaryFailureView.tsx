import type { BoundaryFailure } from "@/packages/orion-gateway/src/index";

const titles: Readonly<Record<BoundaryFailure["category"], string>> = {
  transport_failure: "The transport connection failed.",
  gateway_failure: "The ORION Gateway is unavailable.",
  contract_violation: "The public contract lifecycle was violated.",
  invalid_public_response: "The public response is invalid.",
  unsupported_contract_version: "This public contract version is unsupported.",
};

export function BoundaryFailureView({ failure, onReturn }: { readonly failure: BoundaryFailure; readonly onReturn: () => void }) {
  return (
    <section className="page page--focused failure-boundary" aria-labelledby="boundary-failure-title">
      <p className="eyebrow">{failure.category.replaceAll("_", " ")}</p>
      <h1 id="boundary-failure-title">{titles[failure.category]}</h1>
      <p>Code: {failure.code}</p>
      <p>No public ORION outcome was accepted.</p>
      <button className="action action--quiet" type="button" onClick={onReturn}>Return to confirmation</button>
    </section>
  );
}
