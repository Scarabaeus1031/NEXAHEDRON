import { ArtifactBoundaryError, THE_EYE_MAX_ARTIFACT_BYTES } from "./boundary.ts";
import { THE_EYE_DEMO_IDS, isTheEyeDemoId } from "./catalog.ts";
import { CURATED_ASSETS, CURATED_MANIFEST } from "./curated/generated.ts";
import type { TransportEnvelope } from "./types.ts";

type CuratedArtifact = { artifact_kind: string; relative_asset_reference: string; artifact_sha256: string };
type CuratedDemo = { source_demonstration_id: string; expected_state: string; source_result_sha256: string | null; receipt_present: boolean; receipt_verification_state: string; verification_stage: string; public_safety_state: string; artifacts: CuratedArtifact[] };
export type CuratedPackage = { package_schema: string; demonstrations: CuratedDemo[]; assets: Record<string, string> };

const encoder = new TextEncoder();
const PRIVATE_PATTERN = /(?:\/Users\/|\/private\/tmp|file:\/\/|(?:token|secret|credential)\s*[=:])/i;
const ALLOWED_KINDS = new Set(["envelope", "result", "report", "receipt", "provenance"]);

async function sha256(text: string) {
  const digest = await crypto.subtle.digest("SHA-256", encoder.encode(text));
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

export async function validateCuratedPackage(pkg: CuratedPackage = { ...CURATED_MANIFEST, assets: CURATED_ASSETS } as CuratedPackage) {
  if (pkg.package_schema !== "nexah.the_eye.curated_package/1.0") throw new ArtifactBoundaryError("CURATED_MANIFEST_INVALID", "Curated manifest schema is invalid.");
  const ids = pkg.demonstrations.map((entry) => entry.source_demonstration_id);
  if (ids.length !== 6 || new Set(ids).size !== 6 || THE_EYE_DEMO_IDS.some((id) => !ids.includes(id))) throw new ArtifactBoundaryError("CURATED_ALLOWLIST_INVALID", "Curated manifest must contain exactly the six sealed demonstrations.");
  const listed = new Set<string>();
  for (const demo of pkg.demonstrations) {
    if (!isTheEyeDemoId(demo.source_demonstration_id)) throw new ArtifactBoundaryError("CURATED_ALLOWLIST_INVALID", "Unexpected demonstration.");
    if (demo.verification_stage !== "VERIFIED_BEFORE_PACKAGING" || demo.public_safety_state !== "PASS") throw new ArtifactBoundaryError("CURATED_VERIFICATION_STATE_INVALID", "Curated verification state is invalid.");
    const envelopeEntry = demo.artifacts.find((artifact) => artifact.artifact_kind === "envelope");
    if (!envelopeEntry) throw new ArtifactBoundaryError("CURATED_ASSET_MISSING", "Curated envelope is missing.");
    const envelopeText = pkg.assets[envelopeEntry.relative_asset_reference];
    let envelope: TransportEnvelope;
    try { envelope = JSON.parse(envelopeText); } catch { throw new ArtifactBoundaryError("CURATED_ENVELOPE_INVALID", "Curated envelope is malformed."); }
    if (envelope.state !== demo.expected_state || envelope.verificationStage !== "VERIFIED_BEFORE_PACKAGING") throw new ArtifactBoundaryError("RESULT_STATE_DISAGREEMENT", "Manifest and envelope state disagree.");
    const hasResult = demo.artifacts.some((artifact) => artifact.artifact_kind === "result");
    if (demo.source_demonstration_id === "a3-input-rejected" && (demo.source_result_sha256 !== null || hasResult || envelope.projection)) throw new ArtifactBoundaryError("FABRICATED_RESULT_REJECTED", "INPUT_REJECTED must remain resultless.");
    if ((demo.source_result_sha256 !== null) !== hasResult) throw new ArtifactBoundaryError("RESULT_STATE_DISAGREEMENT", "Result identity and bundled result disagree.");
    const hasReceipt = demo.artifacts.some((artifact) => artifact.artifact_kind === "receipt");
    if (demo.receipt_present !== hasReceipt || (hasReceipt && demo.receipt_verification_state !== "VALID")) throw new ArtifactBoundaryError("RECEIPT_STATE_DISAGREEMENT", "Receipt state and bundled receipt disagree.");
    for (const artifact of demo.artifacts) {
      if (!ALLOWED_KINDS.has(artifact.artifact_kind) || artifact.relative_asset_reference.includes("..") || artifact.relative_asset_reference.startsWith("/")) throw new ArtifactBoundaryError("CURATED_ASSET_REFERENCE_INVALID", "Curated asset reference is not allowlisted.");
      if (listed.has(artifact.relative_asset_reference)) throw new ArtifactBoundaryError("DUPLICATE_CURATED_ASSET", "Curated asset reference is duplicated.");
      listed.add(artifact.relative_asset_reference);
      const text = pkg.assets[artifact.relative_asset_reference];
      if (typeof text !== "string") throw new ArtifactBoundaryError("CURATED_ASSET_MISSING", "Curated asset is missing.");
      if (encoder.encode(text).byteLength > THE_EYE_MAX_ARTIFACT_BYTES) throw new ArtifactBoundaryError("ARTIFACT_TOO_LARGE", "Curated asset exceeds the response limit.");
      if (PRIVATE_PATTERN.test(text)) throw new ArtifactBoundaryError("PRIVATE_PATH_OR_SECRET_REJECTED", "Curated asset failed public-safety validation.");
      if (await sha256(text) !== artifact.artifact_sha256) throw new ArtifactBoundaryError("CURATED_ASSET_HASH_MISMATCH", "Curated asset hash mismatch.");
    }
  }
  if (Object.keys(pkg.assets).some((asset) => !listed.has(asset)) || listed.size !== Object.keys(pkg.assets).length) throw new ArtifactBoundaryError("UNLISTED_CURATED_ASSET", "An unlisted bundled asset is present.");
  return true;
}

function envelopeFor(demoId: string) {
  const demo = CURATED_MANIFEST.demonstrations.find((entry) => entry.source_demonstration_id === demoId);
  if (!demo) throw new ArtifactBoundaryError("UNKNOWN_DEMO", "Unknown demonstration.");
  const entry = demo.artifacts.find((artifact) => artifact.artifact_kind === "envelope");
  if (!entry) throw new ArtifactBoundaryError("CURATED_ASSET_MISSING", "Curated envelope is missing.");
  return JSON.parse(CURATED_ASSETS[entry.relative_asset_reference]) as TransportEnvelope;
}

export async function loadCuratedDemo(demoId: string): Promise<TransportEnvelope> {
  if (!isTheEyeDemoId(demoId)) return { schema: "nexah.the_eye.local_view/1.0", runtimeMode: "CURATED_BUNDLED", verificationStage: "VERIFIED_BEFORE_PACKAGING", state: "RESULT_INVALID", reasonCode: "UNKNOWN_DEMO" };
  try {
    await validateCuratedPackage();
    const envelope = envelopeFor(demoId);
    return { ...envelope, runtimeMode: "CURATED_BUNDLED", verificationStage: "VERIFIED_BEFORE_PACKAGING" };
  } catch (error) {
    const reasonCode = error instanceof ArtifactBoundaryError ? error.code : "CURATED_PACKAGE_INVALID";
    return { schema: "nexah.the_eye.local_view/1.0", runtimeMode: "CURATED_BUNDLED", verificationStage: "VERIFIED_BEFORE_PACKAGING", state: "RESULT_INVALID", reasonCode };
  }
}

export async function verifyCuratedReceipt(demoId: string, variant: "valid" | "invalid"): Promise<TransportEnvelope> {
  if (!isTheEyeDemoId(demoId)) return { schema: "nexah.the_eye.local_view/1.0", runtimeMode: "CURATED_BUNDLED", verificationStage: "VERIFIED_BEFORE_PACKAGING", state: "RECEIPT_INVALID", reasonCode: "UNKNOWN_DEMO" };
  await validateCuratedPackage();
  const demo = CURATED_MANIFEST.demonstrations.find((entry) => entry.source_demonstration_id === demoId)!;
  if (!demo.receipt_present) return { schema: "nexah.the_eye.local_view/1.0", demoId, runtimeMode: "CURATED_BUNDLED", verificationStage: "VERIFIED_BEFORE_PACKAGING", state: "RECEIPT_INVALID", reasonCode: "RECEIPT_NOT_ALLOWLISTED" };
  if (variant !== "valid") return { schema: "nexah.the_eye.local_view/1.0", demoId, runtimeMode: "CURATED_BUNDLED", verificationStage: "VERIFIED_BEFORE_PACKAGING", state: "RECEIPT_INVALID", reasonCode: "TAMPERED_VARIANT_NOT_BUNDLED" };
  const state = demo.receipt_verification_state === "VALID" ? "RECEIPT_VALID" : "RECEIPT_INVALID";
  return { schema: "nexah.the_eye.local_view/1.0", demoId, runtimeMode: "CURATED_BUNDLED", verificationStage: "VERIFIED_BEFORE_PACKAGING", state, reasonCode: state === "RECEIPT_VALID" ? "VERIFIED_BEFORE_PACKAGING" : "RECEIPT_INVALID" };
}

export async function exportCuratedArtifact(demoId: string, kind: string) {
  if (!isTheEyeDemoId(demoId)) throw new ArtifactBoundaryError("UNKNOWN_DEMO", "Unknown demonstration.");
  if (!ALLOWED_KINDS.has(kind) || kind === "envelope") throw new ArtifactBoundaryError("EXPORT_NOT_ALLOWLISTED", "Export is not allowlisted.");
  await validateCuratedPackage();
  const demo = CURATED_MANIFEST.demonstrations.find((entry) => entry.source_demonstration_id === demoId)!;
  const entry = demo.artifacts.find((artifact) => artifact.artifact_kind === kind);
  if (!entry) throw new ArtifactBoundaryError("EXPORT_NOT_ALLOWLISTED", "Export is not allowlisted.");
  const bytes = encoder.encode(CURATED_ASSETS[entry.relative_asset_reference]);
  return { canonical: entry.relative_asset_reference, size: bytes.byteLength, bytes };
}
