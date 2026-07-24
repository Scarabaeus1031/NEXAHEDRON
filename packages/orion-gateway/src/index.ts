/** NEXAHEDRON's sole consumer seam to immutable ORION Version 1. */

import {
  CLARIFICATION_RESULT_SCHEMA,
  CONTINUATION_OPTION_SCHEMA,
  EVIDENCE_REFERENCE_SCHEMA,
  ORIENTATION_REPORT_SCHEMA,
  ORIENTATION_REQUEST_SCHEMA,
  RUNTIME_ERROR_SCHEMA,
  type ClarificationResult,
  type ContinuationOption,
  type EvidenceReference,
  type OrientationReport,
  type OrientationRequest,
  type PublicContract,
  type RuntimeError,
} from "./generated/orion-v1.ts";

export * from "./generated/orion-v1.ts";
export type OrientationRequestV1 = OrientationRequest;
export type ClarificationResultV1 = ClarificationResult;
export type OrientationReportV1 = OrientationReport;
export type ContinuationOptionV1 = ContinuationOption;
export type EvidenceReferenceV1 = EvidenceReference;
export type RuntimeErrorV1 = RuntimeError;

export interface OrionTransportEnvelopeV1 {
  readonly request: OrientationRequest;
  readonly evidence: readonly EvidenceReference[];
}

export interface OrionGatewayEnvelopeV1 {
  readonly request: OrientationRequest | null;
  readonly contracts: readonly PublicContract[];
  readonly evidence: readonly EvidenceReference[];
}

export type OrionOutcomeV1 =
  | { readonly kind: "report"; readonly report: OrientationReport; readonly evidence: readonly EvidenceReference[]; readonly continuations: readonly ContinuationOption[] }
  | { readonly kind: "clarification"; readonly clarification: ClarificationResult; readonly error: RuntimeError }
  | { readonly kind: "runtime_error"; readonly error: RuntimeError };

export type BoundaryFailureCategory =
  | "transport_failure"
  | "gateway_failure"
  | "contract_violation"
  | "invalid_public_response"
  | "unsupported_contract_version";

export interface BoundaryFailure {
  readonly category: BoundaryFailureCategory;
  readonly code: string;
}

export type OrionInvocationResult =
  | { readonly kind: "public_outcome"; readonly envelope: OrionGatewayEnvelopeV1; readonly outcome: OrionOutcomeV1 }
  | { readonly kind: "boundary_failure"; readonly failure: BoundaryFailure };

export interface OrionGateway {
  readonly contractVersion: "1.0";
  invoke(request: OrionTransportEnvelopeV1): Promise<OrionInvocationResult>;
}

export const orionGateway: OrionGateway = { contractVersion: "1.0", invoke: invokeOrion };

const supportedSchemas: ReadonlySet<string> = new Set([
  ORIENTATION_REQUEST_SCHEMA,
  CLARIFICATION_RESULT_SCHEMA,
  ORIENTATION_REPORT_SCHEMA,
  CONTINUATION_OPTION_SCHEMA,
  EVIDENCE_REFERENCE_SCHEMA,
  RUNTIME_ERROR_SCHEMA,
]);

export function mapPublicOutcome(envelope: OrionGatewayEnvelopeV1): OrionOutcomeV1 {
  const reports = envelope.contracts.filter((contract): contract is OrientationReport => contract.schema_version === ORIENTATION_REPORT_SCHEMA);
  const clarifications = envelope.contracts.filter((contract): contract is ClarificationResult => contract.schema_version === CLARIFICATION_RESULT_SCHEMA);
  const errors = envelope.contracts.filter((contract): contract is RuntimeError => contract.schema_version === RUNTIME_ERROR_SCHEMA);
  const continuations = envelope.contracts.filter((contract): contract is ContinuationOption => contract.schema_version === CONTINUATION_OPTION_SCHEMA);

  if (reports.length === 1 && clarifications.length === 0 && errors.length === 0) {
    return { kind: "report", report: reports[0], evidence: envelope.evidence, continuations };
  }
  if (reports.length === 0 && clarifications.length === 1 && errors.length === 1 && errors[0].kind === "clarification_required") {
    return { kind: "clarification", clarification: clarifications[0], error: errors[0] };
  }
  if (reports.length === 0 && clarifications.length === 0 && errors.length === 1 && continuations.length === 0) {
    return { kind: "runtime_error", error: errors[0] };
  }
  throw new PublicBoundaryError("contract_violation", "public_outcome_set_invalid");
}

export async function invokeOrion(request: OrionTransportEnvelopeV1, fetcher: typeof fetch = fetch): Promise<OrionInvocationResult> {
  let response: Response;
  try {
    response = await fetcher("/api/orientation", {
      method: "POST",
      headers: { "content-type": "application/vnd.orion.contracts+json;version=1.0" },
      body: JSON.stringify(request),
    });
  } catch {
    return failure("transport_failure", "transport_request_failed");
  }

  let value: unknown;
  try {
    value = JSON.parse(await response.text());
  } catch {
    return failure("invalid_public_response", "response_not_json");
  }
  if (isRecord(value) && isRecord(value.boundary_failure)) {
    const category = value.boundary_failure.category;
    const code = value.boundary_failure.code;
    if (category === "gateway_failure" && typeof code === "string") return failure(category, code);
    return failure("invalid_public_response", "boundary_failure_invalid");
  }

  try {
    const envelope = readGatewayEnvelope(value);
    return { kind: "public_outcome", envelope, outcome: mapPublicOutcome(envelope) };
  } catch (error) {
    if (error instanceof PublicBoundaryError) return failure(error.category, error.code);
    return failure(response.status >= 500 ? "gateway_failure" : "invalid_public_response", "gateway_response_invalid");
  }
}

function readGatewayEnvelope(value: unknown): OrionGatewayEnvelopeV1 {
  if (!isRecord(value) || !Array.isArray(value.contracts) || !Array.isArray(value.evidence)) {
    throw new PublicBoundaryError("invalid_public_response", "public_envelope_invalid");
  }
  for (const contract of [...value.contracts, ...value.evidence]) {
    if (!isRecord(contract) || typeof contract.schema_version !== "string") throw new PublicBoundaryError("invalid_public_response", "public_contract_discriminator_missing");
    if (!supportedSchemas.has(contract.schema_version)) throw new PublicBoundaryError("unsupported_contract_version", contract.schema_version);
  }
  return value as unknown as OrionGatewayEnvelopeV1;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function failure(category: BoundaryFailureCategory, code: string): OrionInvocationResult {
  return { kind: "boundary_failure", failure: { category, code } };
}

class PublicBoundaryError extends Error {
  readonly category: BoundaryFailureCategory;
  readonly code: string;

  constructor(category: BoundaryFailureCategory, code: string) {
    super(code);
    this.category = category;
    this.code = code;
  }
}
