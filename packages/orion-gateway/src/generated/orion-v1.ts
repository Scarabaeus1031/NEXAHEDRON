/** GENERATED from immutable ORION Version 1 public_contracts.models. */
/** Do not edit. Run `npm run contracts:generate`. */

export const CLARIFICATION_RESULT_SCHEMA = "orion.clarification-result/1.0" as const;
export const CONTINUATION_OPTION_SCHEMA = "orion.continuation-option/1.0" as const;
export const EVIDENCE_REFERENCE_SCHEMA = "orion.evidence-reference/1.0" as const;
export const ORIENTATION_REPORT_SCHEMA = "orion.orientation-report/1.0" as const;
export const ORIENTATION_REQUEST_SCHEMA = "orion.orientation-request/1.0" as const;
export const RUNTIME_ERROR_SCHEMA = "orion.runtime-error/1.0" as const;

export type PublicValue = string | number | boolean | null | readonly PublicValue[] | { readonly [key: string]: PublicValue };

export interface VersionedRef {
  readonly identity: string;
  readonly version: string;
}

export interface RequesterReference {
  readonly requester_id: string;
  readonly requester_kind: "human" | "authorized_consumer";
  readonly authority_domain: string;
}

export interface HumanAuthorityReference {
  readonly human_ref: string;
  readonly authority_scope: readonly string[];
}

export interface IntegrityReference {
  readonly method: string;
  readonly value: string;
  readonly coverage: string;
  readonly verified: boolean | string;
}

export interface OrientationObjectReference {
  readonly object_id: string;
  readonly object_version: string;
  readonly object_kind: string;
  readonly source_owner: string;
  readonly source_ref: string;
  readonly source_revision: string;
  readonly identity_scope: "canonical" | "external" | "session_local";
  readonly representation_refs: readonly string[];
  readonly integrity_ref: IntegrityReference | null;
  readonly access_status: "available" | "restricted" | "unavailable" | "unknown" | null;
  readonly provenance_gaps: readonly string[] | null;
}

export interface Intention {
  readonly direction: string;
  readonly focus: string | null;
  readonly success_boundary: string | null;
}

export interface Scope {
  readonly include: readonly string[];
  readonly exclude: readonly string[];
  readonly unresolved: readonly string[];
  readonly depth: string | null;
  readonly breadth: string | null;
  readonly time_boundary: string | null;
}

export interface ClarificationReference {
  readonly result_id: string;
  readonly result_version: string;
}

export interface ContinuationReference {
  readonly option_id: string;
  readonly option_version: string;
  readonly source_report_id: string;
  readonly source_report_version: string;
}

export interface OrientationRequest {
  readonly schema_version: string;
  readonly request_id: string;
  readonly request_version: string;
  readonly mode: "wonder" | "understand" | "compare" | "connect" | "explore" | "build" | "reflect";
  readonly requested_by: RequesterReference;
  readonly human_authority: HumanAuthorityReference;
  readonly orientation_objects: readonly OrientationObjectReference[];
  readonly intention: Intention;
  readonly scope: Scope;
  readonly effects: "none";
  readonly audience: string | null;
  readonly constraints: readonly string[];
  readonly evidence_policy: string | null;
  readonly representation_preferences: readonly string[];
  readonly depth_budget: string | null;
  readonly prior_report_refs: readonly string[];
  readonly human_annotations: readonly string[];
  readonly clarification_of: ClarificationReference | null;
  readonly continuation_of: ContinuationReference | null;
  readonly mode_parameters: Readonly<Record<string, PublicValue>>;
  readonly consumer_context: Readonly<Record<string, PublicValue>>;
}

export interface ClarificationIssue {
  readonly issue_id: string;
  readonly issue_code: "missing_required" | "ambiguous_value" | "identity_unresolved" | "cardinality_incomplete" | "scope_unresolved" | "choice_required" | "confirmation_required" | "access_required" | "conflicting_values";
  readonly field_path: string;
  readonly priority_tier: "authority" | "identity" | "intention" | "scope" | "required_parameter";
  readonly reason: string;
  readonly expected_value: string;
  readonly current_value_refs: readonly string[];
  readonly required_action: "provide" | "choose" | "confirm" | "correct" | "add_object" | "authorize_access" | "remove_conflict" | "withhold";
  readonly blocking: boolean;
  readonly allowed_values: readonly string[] | null;
  readonly conflicts_with: readonly string[] | null;
}

export interface ClarificationResult {
  readonly schema_version: string;
  readonly result_id: string;
  readonly result_version: string;
  readonly request_id: string;
  readonly request_version: string;
  readonly request_schema_version: string;
  readonly mode: "wonder" | "understand" | "compare" | "connect" | "explore" | "build" | "reflect";
  readonly readiness: "clarification_required";
  readonly issues: readonly ClarificationIssue[];
  readonly retained_context: Readonly<Record<string, readonly string[]>>;
  readonly required_user_actions: readonly string[];
  readonly effects: "none";
}

export interface SourceReference {
  readonly source_id: string;
  readonly source_version: string;
  readonly identity_domain: string;
  readonly source_owner: string;
  readonly source_ref: string;
  readonly fragment_ref: string | null;
  readonly integrity_ref: IntegrityReference | null;
}

export interface AuthorityDeclaration {
  readonly authority_owner: string;
  readonly authority_domain: string;
  readonly editorial_status: "draft" | "reviewed" | "published" | "withdrawn" | "unclassified" | "unknown";
  readonly authority_version: string;
  readonly declared_at: string | null;
}

export interface ProvenanceStep {
  readonly step_id: string;
  readonly step_kind: "source" | "representation" | "transition" | "derivation" | "proposal";
  readonly input_refs: readonly string[];
  readonly output_ref: string;
  readonly owner: string;
  readonly lossiness: string | readonly string[];
  readonly contract_id: string | null;
  readonly contract_version: string | null;
}

export interface EvidenceValidation {
  readonly status: "valid" | "invalid" | "unverified";
  readonly checks: readonly string[];
  readonly issues: readonly string[];
  readonly validated_against: readonly string[];
}

export interface TraceabilityTarget {
  readonly report_id: string;
  readonly report_version: string;
  readonly target_path: string;
  readonly finding_id: string | null;
}

export interface EvidenceReference {
  readonly schema_version: string;
  readonly evidence_id: string;
  readonly evidence_version: string;
  readonly source: SourceReference;
  readonly authority: AuthorityDeclaration;
  readonly evidence_class: "observed" | "derived" | "proposed" | "unknown";
  readonly relationship: "supports" | "counters" | "contextualizes" | "limits";
  readonly provenance: readonly ProvenanceStep[];
  readonly validation: EvidenceValidation;
  readonly traceability: readonly TraceabilityTarget[];
  readonly access_status: "available" | "restricted" | "unavailable" | "unknown";
  readonly evidence_level: string | null;
  readonly evidence_scale_id: string | null;
  readonly evidence_scale_version: string | null;
}

export interface ReportIdentity {
  readonly report_id: string;
  readonly report_version: string;
  readonly request_id: string;
  readonly request_version: string;
  readonly request_schema_version: string;
  readonly operator_id: string;
  readonly operator_version: string;
  readonly supersedes: string | null;
}

export interface ReportLifecycle {
  readonly state: "current" | "superseded" | "withdrawn";
  readonly reason: string | null;
  readonly replacement_ref: string | null;
}

export interface ReportOrientation {
  readonly mode: "wonder" | "understand" | "compare" | "connect" | "explore" | "build" | "reflect";
  readonly intention: Intention | string;
  readonly human_authority_ref: string;
  readonly scope: Scope;
  readonly orientation_object_refs: readonly string[];
  readonly prior_report_refs: readonly string[];
  readonly continuation_option_refs: readonly string[];
  readonly constraints: readonly string[];
  readonly evidence_policy_refs: readonly string[];
}

export interface AbsentRepresentation {
  readonly representation: string;
  readonly reason_refs: readonly string[];
}

export interface ReportRepresentations {
  readonly input: readonly string[];
  readonly working: readonly string[];
  readonly produced: readonly string[];
  readonly requested_but_absent: readonly AbsentRepresentation[];
}

export interface ProcessStage {
  readonly stage_id: string;
  readonly state: "completed" | "skipped" | "blocked";
  readonly input_representation_refs: readonly string[];
  readonly output_representation_refs: readonly string[];
  readonly evidence_refs: readonly string[];
  readonly issue_refs: readonly string[];
  readonly reason: string | null;
}

export interface ModePayload {
  readonly mode: "wonder" | "understand" | "compare" | "connect" | "explore" | "build" | "reflect";
  readonly payload_version: string;
  readonly content: Readonly<Record<string, PublicValue>>;
}

export interface ReportAssumption {
  readonly assumption_id: string;
  readonly statement: string;
  readonly declaration_ref: string;
  readonly affected_report_paths: readonly string[];
  readonly status: "declared" | "contested" | "invalidated";
}

export interface ReportUncertainty {
  readonly uncertainty_id: string;
  readonly kind: string;
  readonly affected_report_paths: readonly string[];
  readonly evidence_or_issue_refs: readonly string[];
  readonly status: "open" | "bounded" | "irreducible";
  readonly possible_resolution_condition: string | null;
}

export interface ReportIssue {
  readonly issue_id: string;
  readonly kind: string;
  readonly stage_id: string;
  readonly reason: string;
  readonly affected_paths: readonly string[];
  readonly evidence_refs: readonly string[];
  readonly blocking: boolean;
  readonly resolution_condition: string | null;
}

export interface ConfidenceProfile {
  readonly source_coverage: "complete" | "partial" | "unknown";
  readonly evidence_coverage: "complete" | "partial" | "unknown";
  readonly orientation_validation_status: "valid" | "invalid";
  readonly inference_status: "none" | "proposed_present";
  readonly uncertainty_refs: readonly string[];
  readonly missing_evidence_refs: readonly string[];
}

export interface OrientationValidation {
  readonly status: "valid" | "invalid";
  readonly checks: readonly string[];
  readonly errors: readonly string[];
  readonly warnings: readonly string[];
  readonly preserved_invariants: readonly string[];
  readonly violated_invariants: readonly string[];
  readonly absent_outputs: readonly string[];
}

export interface ReportValidation {
  readonly contract_validation: string;
  readonly orientation_validation: OrientationValidation;
}

export interface OrientationReport {
  readonly schema_version: string;
  readonly identity: ReportIdentity;
  readonly lifecycle: ReportLifecycle;
  readonly status: "complete" | "partial" | "blocked";
  readonly orientation: ReportOrientation;
  readonly representations: ReportRepresentations;
  readonly process: readonly ProcessStage[];
  readonly mode_payload: ModePayload;
  readonly evidence: readonly string[];
  readonly assumptions: readonly ReportAssumption[];
  readonly uncertainties: readonly ReportUncertainty[];
  readonly issues: readonly ReportIssue[];
  readonly confidence: ConfidenceProfile;
  readonly validation: ReportValidation;
  readonly continuations: readonly string[];
  readonly effects: "none";
}

export interface PreservedContext {
  readonly orientation_object_refs: readonly string[];
  readonly intention_ref: string;
  readonly scope_ref: string;
  readonly human_authority_ref: string;
  readonly report_refs: readonly string[];
  readonly representation_refs: readonly string[];
  readonly evidence_refs: readonly string[];
  readonly provenance_refs: readonly string[];
  readonly human_annotation_refs: readonly string[];
}

export interface RequestDeltaOperation {
  readonly field_path: string;
  readonly operation: "preserve" | "set" | "add" | "remove" | "require" | "confirm";
  readonly reason_ref: string;
  readonly human_confirmation: "required" | "not_required";
  readonly value_ref: string | null;
  readonly required_value_kind: string | null;
}

export interface ContinuationBlocker {
  readonly blocker_id: string;
  readonly kind: string;
  readonly reason_ref: string;
  readonly required_resolution: string;
  readonly retry_after_resolution: string;
}

export interface ContinuationOption {
  readonly schema_version: string;
  readonly option_id: string;
  readonly option_version: string;
  readonly source_report_id: string;
  readonly source_report_version: string;
  readonly action_type: "inspect_report" | "inspect_evidence" | "refine_intention" | "narrow_scope" | "expand_scope" | "add_object" | "follow_representation" | "switch_mode" | "open_atlas" | "handoff" | "pause";
  readonly reason_refs: readonly string[];
  readonly preserved_context: PreservedContext;
  readonly request_delta: readonly RequestDeltaOperation[];
  readonly availability: "available" | "clarification_required" | "blocked" | "future";
  readonly blockers: readonly ContinuationBlocker[];
  readonly required_user_actions: readonly string[];
  readonly effects: "none";
  readonly target_mode: "wonder" | "understand" | "compare" | "connect" | "explore" | "build" | "reflect" | null;
  readonly target_boundary: string | null;
}

export interface RetryPolicy {
  readonly disposition: "never" | "after_user_action" | "after_state_change" | "safe" | "manual_review";
  readonly same_request_allowed: boolean;
  readonly required_change_refs: readonly string[];
  readonly retry_window: string | null;
}

export interface ContinuationPolicy {
  readonly allowed: boolean;
  readonly option_refs: readonly string[];
  readonly preserve_request_context: boolean;
  readonly human_action_required: boolean;
}

export interface RuntimeError {
  readonly schema_version: string;
  readonly error_id: string;
  readonly error_version: string;
  readonly kind: "unsupported" | "blocked" | "invalid" | "unavailable" | "clarification_required" | "validation_failed" | "internal_failure";
  readonly stage: "contract_validation" | "readiness_validation" | "processing" | "report_contract_validation" | "continuation_validation" | "availability";
  readonly reason_code: string;
  readonly issues: readonly string[];
  readonly result_presence: "none" | "clarification_result";
  readonly retry: RetryPolicy;
  readonly continuation: ContinuationPolicy;
  readonly consumer_behavior: Readonly<Record<string, boolean>>;
  readonly effects: "none";
  readonly request_id: string | null;
  readonly request_version: string | null;
  readonly request_schema_version: string | null;
  readonly source_report_ref: string | null;
  readonly result_ref: string | null;
}

export type PublicContract = OrientationRequest | ClarificationResult | EvidenceReference | OrientationReport | ContinuationOption | RuntimeError;
