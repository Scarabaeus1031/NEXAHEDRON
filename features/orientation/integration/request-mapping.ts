import {
  ORIENTATION_REQUEST_SCHEMA,
  type ClarificationResultV1,
  type EvidenceReferenceV1,
  type OrientationRequestV1,
  type OrionTransportEnvelopeV1,
} from "../../../packages/orion-gateway/src/index.ts";
import type { AlphaJourneyState } from "../../../types/alpha.ts";

export interface ClarificationValues {
  readonly objectVersion?: string;
  readonly accessStatus?: "available" | "restricted" | "unavailable";
}

const sessionLocalTypes = new Set([
  "Question",
  "Notes",
  "Observation",
  "Idea",
  "Conversation",
]);

export function mapToOrientationRequest(
  state: AlphaJourneyState,
  requestId: string,
  requestVersion = 1,
  clarification?: ClarificationResultV1,
  clarificationValues: ClarificationValues = {},
  evidence: readonly EvidenceReferenceV1[] = [],
): OrionTransportEnvelopeV1 {
  const localObject = sessionLocalTypes.has(state.object.type);
  const externalSource = Boolean(state.object.url || state.object.fileName);
  const identityScope = localObject && !externalSource ? "session_local" : "external";
  const objectId = `object-${requestId}`;
  const localSourceRef = `nexahedron://session/${objectId}`;
  const sourceRef = state.object.url || state.object.fileName || localSourceRef;
  const defaultVersion = identityScope === "session_local" ? "1" : "unknown";
  const resolvedVersion = clarificationValues.objectVersion?.trim() || defaultVersion;
  const accessStatus = clarificationValues.accessStatus ?? (identityScope === "session_local" ? "available" : "unknown");
  const provenanceGaps = identityScope === "external" && resolvedVersion === "unknown"
    ? ["source_owner", "source_revision"]
    : null;

  const request: OrientationRequestV1 = {
    schema_version: ORIENTATION_REQUEST_SCHEMA,
    request_id: requestId,
    request_version: String(requestVersion),
    mode: "understand",
    requested_by: {
      requester_id: `human-${requestId}`,
      requester_kind: "human",
      authority_domain: "nexahedron.orientation-laboratory",
    },
    human_authority: {
      human_ref: `human-${requestId}`,
      authority_scope: ["intention", "scope", "continuation"],
    },
    orientation_objects: [{
      object_id: objectId,
      object_version: resolvedVersion,
      object_kind: state.object.type,
      source_owner: identityScope === "session_local" ? `human-${requestId}` : "unknown",
      source_ref: sourceRef,
      source_revision: resolvedVersion,
      identity_scope: identityScope,
      representation_refs: [],
      integrity_ref: null,
      access_status: accessStatus,
      provenance_gaps: provenanceGaps,
    }],
    intention: {
      direction: state.request.intention,
      focus: state.request.focus || null,
      success_boundary: state.request.successBoundary || null,
    },
    scope: {
      include: state.request.scopeInclude.filter((value) => value.trim()),
      exclude: state.request.scopeExclude.filter((value) => value.trim()),
      unresolved: [],
      depth: state.request.depth.toLowerCase(),
      breadth: null,
      time_boundary: null,
    },
    effects: "none",
    audience: null,
    constraints: [],
    evidence_policy: null,
    representation_preferences: [],
    depth_budget: null,
    prior_report_refs: [],
    human_annotations: state.wonder ? [state.wonder] : [],
    clarification_of: clarification ? {
      result_id: clarification.result_id,
      result_version: clarification.result_version,
    } : null,
    continuation_of: null,
    mode_parameters: {},
    consumer_context: {},
  };

  return { request, evidence };
}
