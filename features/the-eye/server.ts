import { lstat, readFile, realpath, stat } from "node:fs/promises";
import { isAbsolute, relative, resolve, sep } from "node:path";
import { spawnSync } from "node:child_process";
import { THE_EYE_DEMOS, isTheEyeDemoId, type TheEyeDemoId } from "./catalog.ts";
import type { ResultProjection, TheEyeViewState, TransportEnvelope } from "./types.ts";

export const THE_EYE_MAX_ARTIFACT_BYTES = 2 * 1024 * 1024;
export const THE_EYE_ALLOWED_EXTENSIONS = new Set([".json", ".md"]);

export class ArtifactBoundaryError extends Error {
  readonly code: string;
  constructor(code: string, message: string) { super(message); this.code = code; }
}

type ComparisonResult = {
  profile: string; schema_version: string; result_id: string; canonical_result_sha256: string;
  record_a_sha256: string; record_b_sha256: string; declaration_sha256: string;
  decision: string; evidence_stage: string; mechanism_status: string;
  ilau: ResultProjection["ilau"]; residuals: ResultProjection["residuals"];
};
type ComparisonDeclaration = {
  record_a: string; record_b: string; declaration_id: string;
  domain_policy: { record_a_domain: string; record_b_domain: string };
  property: { type: string; version: string }; transformation: { type: string };
  alignment_rule: { mode: string }; criterion: { id: string; version: string };
  expected_evidence_ceiling: string;
};

export function validateRelativeArtifactPath(input: string) {
  if (!input || isAbsolute(input)) throw new ArtifactBoundaryError("ABSOLUTE_PATH_REJECTED", "Artifact identity must be relative.");
  const parts = input.replaceAll("\\", "/").split("/");
  if (parts.some((part) => part === ".." || part === "")) throw new ArtifactBoundaryError("PATH_TRAVERSAL_REJECTED", "Artifact identity is outside the allowlist.");
  const extension = input.slice(input.lastIndexOf(".")).toLowerCase();
  if (!THE_EYE_ALLOWED_EXTENSIONS.has(extension)) throw new ArtifactBoundaryError("UNSUPPORTED_ARTIFACT_TYPE", "Artifact type is not supported.");
  return input;
}

export async function resolveArtifact(rootInput: string | undefined, relativePath: string) {
  if (!rootInput) throw new ArtifactBoundaryError("LOCAL_CONFIGURATION_MISSING", "THE_EYE_LOCAL_ARTIFACT_ROOT is not configured.");
  validateRelativeArtifactPath(relativePath);
  const rootStats = await lstat(rootInput).catch(() => null);
  if (!rootStats?.isDirectory()) throw new ArtifactBoundaryError("LOCAL_CONFIGURATION_MISSING", "Configured artifact root is not a directory.");
  const root = await realpath(rootInput);
  const candidate = resolve(root, relativePath);
  const candidateStats = await lstat(candidate).catch(() => null);
  if (!candidateStats) throw new ArtifactBoundaryError("ARTIFACT_MISSING", "The allowlisted artifact is missing.");
  const canonical = await realpath(candidate);
  const escaped = relative(root, canonical);
  if (escaped === ".." || escaped.startsWith(`..${sep}`) || isAbsolute(escaped)) {
    throw new ArtifactBoundaryError("SYMLINK_ESCAPE_REJECTED", "Canonical artifact escapes the allowlisted root.");
  }
  const canonicalStats = await stat(canonical);
  if (!canonicalStats.isFile()) throw new ArtifactBoundaryError("UNSUPPORTED_ARTIFACT_TYPE", "The allowlisted artifact is not a regular file.");
  if (canonicalStats.size > THE_EYE_MAX_ARTIFACT_BYTES) throw new ArtifactBoundaryError("ARTIFACT_TOO_LARGE", "Artifact exceeds the local size limit.");
  return { canonical, size: canonicalStats.size };
}

export async function readArtifact(root: string | undefined, relativePath: string) {
  const resolved = await resolveArtifact(root, relativePath);
  return { ...resolved, bytes: await readFile(resolved.canonical) };
}

function parseJson(bytes: Buffer, code = "RESULT_INVALID") {
  try { return JSON.parse(bytes.toString("utf8")); }
  catch { throw new ArtifactBoundaryError(code, "Artifact is not valid JSON."); }
}

function verifierPath() {
  const configured = process.env.THE_EYE_A2_VERIFIER;
  if (!configured) throw new ArtifactBoundaryError("A2_VERIFIER_UNAVAILABLE", "A2 verifier is not configured.");
  if (!isAbsolute(configured)) throw new ArtifactBoundaryError("A2_VERIFIER_UNAVAILABLE", "A2 verifier path must be absolute.");
  return configured;
}

function invokeA2(operation: "verify-result" | "verify-receipt", paths: string[]) {
  const run = spawnSync(verifierPath(), [operation, ...paths], { encoding: "utf8", timeout: 10_000, windowsHide: true });
  if (run.error) throw new ArtifactBoundaryError("A2_VERIFIER_UNAVAILABLE", "A2 verifier could not be invoked.");
  const raw = run.stdout.trim() || run.stderr.trim();
  let summary: Record<string, unknown>;
  try { summary = JSON.parse(raw); }
  catch { throw new ArtifactBoundaryError("A2_VERIFIER_UNAVAILABLE", "A2 verifier returned a non-JSON response."); }
  return { exitCode: run.status ?? 70, summary };
}

function stateForDecision(decision: string): TheEyeViewState {
  if (decision === "PASS") return "VERIFIED_PASS";
  if (decision === "FAIL") return "VERIFIED_FAIL";
  if (decision === "HOLD") return "VERIFIED_HOLD";
  return "RESULT_INVALID";
}

function exportsFor(id: TheEyeDemoId, demo: (typeof THE_EYE_DEMOS)[TheEyeDemoId]) {
  const entries: Array<{ kind: string; label: string; href: string }> = [];
  for (const [kind, label] of [["result", "Canonical result JSON"], ["report", "Faithful Markdown report"], ["receipt", "Receipt"], ["provenance", "Provenance sidecar"]] as const) {
    if (kind in demo) entries.push({ kind, label, href: `/api/the-eye/exports?demo=${encodeURIComponent(id)}&kind=${kind}` });
  }
  return entries;
}

export async function loadDemo(demoId: string, root = process.env.THE_EYE_LOCAL_ARTIFACT_ROOT): Promise<TransportEnvelope> {
  if (!isTheEyeDemoId(demoId)) return { schema: "nexah.the_eye.local_view/1.0", state: "RESULT_INVALID", reasonCode: "UNKNOWN_DEMO" };
  const demo = THE_EYE_DEMOS[demoId];
  try {
    const runtimeArtifact = await readArtifact(root, demo.runtime);
    const runtime = parseJson(runtimeArtifact.bytes, "RUNTIME_INVALID") as { outcome: string; exit_code: number; result_sha256: string | null };
    if (!("result" in demo)) {
      const state = runtime.outcome === "INPUT_REJECTED" && runtime.exit_code === 30 ? "INPUT_REJECTED" : "RESULT_INVALID";
      return { schema: "nexah.the_eye.local_view/1.0", demoId, state, reasonCode: state, runtime };
    }
    const [resultArtifact, declarationArtifact] = await Promise.all([
      readArtifact(root, demo.result), readArtifact(root, demo.declaration),
    ]);
    const verification = invokeA2("verify-result", [resultArtifact.canonical]);
    const verificationSummary = verification.summary as Record<string, unknown>;
    if (verification.exitCode !== 0 || verificationSummary.status !== "VALID") {
      return { schema: "nexah.the_eye.local_view/1.0", demoId, state: "RESULT_INVALID", reasonCode: String(verificationSummary.reason_code ?? "RESULT_INVALID") };
    }
    const result = parseJson(resultArtifact.bytes) as ComparisonResult;
    const declaration = parseJson(declarationArtifact.bytes, "DECLARATION_INVALID") as ComparisonDeclaration;
    const state = stateForDecision(result.decision);
    if (state === "RESULT_INVALID" || runtime.outcome !== result.decision || runtime.exit_code !== ({ PASS: 0, FAIL: 10, HOLD: 20 } as Record<string, number>)[result.decision]) {
      return { schema: "nexah.the_eye.local_view/1.0", demoId, state: "RESULT_INVALID", reasonCode: "RUNTIME_RESULT_MISMATCH" };
    }
    const projection: ResultProjection = {
      label: demo.label, classification: demo.classification, state, exitCode: runtime.exit_code,
      verification: {
        status: String(verificationSummary.status), reasonCode: String(verificationSummary.reason_code),
        inputSha256: verificationSummary.input_sha256 as string | null,
        boundResultSha256: verificationSummary.bound_result_sha256 as string | null,
      },
      identity: {
        profile: result.profile, schemaVersion: result.schema_version, resultId: result.result_id,
        canonicalResultSha256: result.canonical_result_sha256,
        recordAId: declaration.record_a, recordASha256: result.record_a_sha256,
        recordBId: declaration.record_b, recordBSha256: result.record_b_sha256,
        declarationId: declaration.declaration_id, declarationSha256: result.declaration_sha256,
        domain: `${declaration.domain_policy.record_a_domain} ↔ ${declaration.domain_policy.record_b_domain}`,
        property: `${declaration.property.type}/${declaration.property.version}`,
        transformation: declaration.transformation.type, alignmentMode: declaration.alignment_rule.mode,
        criterion: `${declaration.criterion.id}/${declaration.criterion.version}`,
      },
      outcome: { decision: result.decision, evidenceStage: result.evidence_stage, mechanismStatus: result.mechanism_status },
      ilau: result.ilau, residuals: result.residuals, exports: exportsFor(demoId, demo),
      boundaries: {
        evidenceCeiling: declaration.expected_evidence_ceiling,
        domainBoundary: demo.classification,
        mechanismNonclaim: "PASS DOES NOT ESTABLISH A MECHANISM",
        humanAuthority: "Inspection and any decision remain Human-owned.",
      },
    };
    return { schema: "nexah.the_eye.local_view/1.0", demoId, state, reasonCode: "VERIFIED", projection, runtime };
  } catch (error) {
    const code = error instanceof ArtifactBoundaryError ? error.code : "RESULT_INVALID";
    const state: TheEyeViewState = code === "LOCAL_CONFIGURATION_MISSING" ? "LOCAL_CONFIGURATION_MISSING" : code === "A2_VERIFIER_UNAVAILABLE" ? "UNVERIFIED" : "RESULT_INVALID";
    return { schema: "nexah.the_eye.local_view/1.0", demoId, state, reasonCode: code };
  }
}

export async function verifyDemoReceipt(demoId: string, variant: "valid" | "invalid", root = process.env.THE_EYE_LOCAL_ARTIFACT_ROOT): Promise<TransportEnvelope> {
  if (!isTheEyeDemoId(demoId)) return { schema: "nexah.the_eye.local_view/1.0", state: "RECEIPT_INVALID", reasonCode: "UNKNOWN_DEMO" };
  const demo = THE_EYE_DEMOS[demoId];
  if (!("result" in demo) || !("receipt" in demo)) return { schema: "nexah.the_eye.local_view/1.0", demoId, state: "RECEIPT_INVALID", reasonCode: "RECEIPT_NOT_ALLOWLISTED" };
  try {
    const receiptPath = variant === "invalid" && "invalidReceipt" in demo ? demo.invalidReceipt : demo.receipt;
    const [result, receipt] = await Promise.all([readArtifact(root, demo.result), readArtifact(root, receiptPath)]);
    const verification = invokeA2("verify-receipt", [result.canonical, receipt.canonical]);
    const summary = verification.summary as Record<string, unknown>;
    const valid = verification.exitCode === 0 && summary.status === "VALID";
    return { schema: "nexah.the_eye.local_view/1.0", demoId, state: valid ? "RECEIPT_VALID" : "RECEIPT_INVALID", reasonCode: String(summary.reason_code ?? "RECEIPT_INVALID") };
  } catch (error) {
    const code = error instanceof ArtifactBoundaryError ? error.code : "RECEIPT_INVALID";
    return { schema: "nexah.the_eye.local_view/1.0", demoId, state: code === "A2_VERIFIER_UNAVAILABLE" ? "UNVERIFIED" : "RECEIPT_INVALID", reasonCode: code };
  }
}

export async function exportDemoArtifact(demoId: string, kind: string, root = process.env.THE_EYE_LOCAL_ARTIFACT_ROOT) {
  if (!isTheEyeDemoId(demoId)) throw new ArtifactBoundaryError("UNKNOWN_DEMO", "Unknown demonstration.");
  const demo = THE_EYE_DEMOS[demoId] as Record<string, string>;
  if (!["result", "report", "receipt", "provenance"].includes(kind) || !demo[kind]) throw new ArtifactBoundaryError("EXPORT_NOT_ALLOWLISTED", "Export is not allowlisted.");
  if (kind === "report") {
    const loaded = await loadDemo(demoId, root);
    if (!loaded.projection) throw new ArtifactBoundaryError("REPORT_PROJECTION_UNVERIFIED", "Report cannot be exported before result verification.");
    const report = await readArtifact(root, demo[kind]);
    const text = report.bytes.toString("utf8");
    const p = loaded.projection;
    for (const expected of [p.identity.resultId, p.identity.canonicalResultSha256, `Decision: ${p.outcome.decision}`, `I/L/A/U: ${p.ilau.invariant.length}/${p.ilau.lost.length}/${p.ilau.added.length}/${p.ilau.unavailable.length}`, `Residuals: ${p.residuals.length}`]) {
      if (!text.includes(expected)) throw new ArtifactBoundaryError("REPORT_PROJECTION_INVALID", "Markdown projection does not match the verified result.");
    }
    return report;
  }
  return readArtifact(root, demo[kind]);
}
