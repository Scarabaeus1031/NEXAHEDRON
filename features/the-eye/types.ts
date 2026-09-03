export type TheEyeViewState =
  | "NO_RESULT_SELECTED" | "LOADING" | "VERIFIED_PASS" | "VERIFIED_FAIL"
  | "VERIFIED_HOLD" | "INPUT_REJECTED" | "RESULT_INVALID" | "RECEIPT_VALID"
  | "RECEIPT_INVALID" | "UNVERIFIED" | "LOCAL_CONFIGURATION_MISSING"
  | "STOPPED_BY_HUMAN";

export type IlauEntry = {
  classification: string; entry_id: string; reason_code: string;
  relation_unit_id_a: string | null; relation_unit_id_b: string | null; side: string;
};
export type Residual = {
  residual_id: string; reason_code: string; relation_unit_id: string | null;
  expected: unknown; observed: unknown; gate_effect: string; severity: string;
};
export type ResultProjection = {
  label: string; classification: string; state: TheEyeViewState; exitCode: number;
  verification: { status: string; reasonCode: string; inputSha256: string | null; boundResultSha256: string | null };
  identity: {
    profile: string; schemaVersion: string; resultId: string; canonicalResultSha256: string;
    recordAId: string; recordASha256: string; recordBId: string; recordBSha256: string;
    declarationId: string; declarationSha256: string; domain: string; property: string;
    transformation: string; alignmentMode: string; criterion: string;
  };
  outcome: { decision: string; evidenceStage: string; mechanismStatus: string };
  ilau: { invariant: IlauEntry[]; lost: IlauEntry[]; added: IlauEntry[]; unavailable: IlauEntry[] };
  residuals: Residual[];
  exports: Array<{ kind: string; label: string; href: string }>;
  boundaries: { evidenceCeiling: string; domainBoundary: string; mechanismNonclaim: string; humanAuthority: string };
};

export type TransportEnvelope = {
  schema: "nexah.the_eye.local_view/1.0";
  runtimeMode?: "LOCAL_VERIFIED" | "CURATED_BUNDLED";
  verificationStage?: "VERIFIED_DURING_THIS_LOCAL_REQUEST" | "VERIFIED_BEFORE_PACKAGING";
  demoId?: string;
  state: TheEyeViewState;
  reasonCode: string;
  projection?: ResultProjection;
  runtime?: { outcome: string; exit_code: number; result_sha256: string | null };
};

export type TheEyeRuntimeMode = "LOCAL_VERIFIED" | "CURATED_BUNDLED";
