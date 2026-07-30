import type { BoundaryFailure } from "@/packages/orion-gateway/src/index";
import { OrionBoundarySummary } from "@/features/orientation/components/OrionBoundarySummary";

const titles: Readonly<Record<BoundaryFailure["category"], string>> = {
  transport_failure: "The transport connection failed.",
  gateway_failure: "The ORION Gateway is unavailable.",
  contract_violation: "The public contract lifecycle was violated.",
  invalid_public_response: "The public response is invalid.",
  unsupported_contract_version: "This public contract version is unsupported.",
};

export function BoundaryFailureView({ failure, onReturn, onRest }: { readonly failure: BoundaryFailure; readonly onReturn: () => void; readonly onRest: () => void }) {
  return (
    <section className="page page--focused failure-boundary" aria-labelledby="boundary-failure-title">
      <p className="eyebrow">{failure.category.replaceAll("_", " ")}</p>
      <h1 id="boundary-failure-title">{titles[failure.category]}</h1>
      <p>Code: {failure.code}</p>
      <p>No public ORION outcome was accepted.</p>
      <OrionBoundarySummary
        gatewayStatus={`The public Gateway stopped at ${failure.category.replaceAll("_", " ")} (${failure.code}).`}
        outcomeStatus="No ORION result was accepted."
        producer="NEXAHEDRON public Gateway boundary"
        contractType="BoundaryFailure"
      />
      <div className="boundary-actions">
        <button className="action action--quiet" type="button" onClick={onReturn}>Return to confirmation</button>
        <button className="action action--primary" type="button" onClick={onRest}>Return to Working Session Record</button>
      </div>
    </section>
  );
}
