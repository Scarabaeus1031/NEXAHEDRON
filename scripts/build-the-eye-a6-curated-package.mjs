import { createHash } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { THE_EYE_DEMO_IDS, THE_EYE_DEMOS } from "../features/the-eye/catalog.ts";
import { exportDemoArtifact, loadDemo, readArtifact, verifyDemoReceipt } from "../features/the-eye/server.ts";

const [artifactRoot, verifierPath, outputRoot] = process.argv.slice(2);
if (!artifactRoot || !verifierPath || !outputRoot) throw new Error("usage: build-the-eye-a6-curated-package.mjs ARTIFACT_ROOT A2_VERIFIER NEW_OUTPUT_ROOT");
process.env.THE_EYE_LOCAL_ARTIFACT_ROOT = artifactRoot;
process.env.THE_EYE_A2_VERIFIER = verifierPath;

const expected = {
  "a3-pass-exact-id": ["VERIFIED_PASS", "PASS", 0, 2, 0, 0, 0, 0],
  "a3-fail-explicit-mapping": ["VERIFIED_FAIL", "FAIL", 10, 1, 1, 1, 0, 2],
  "a3-hold-unavailable": ["VERIFIED_HOLD", "HOLD", 20, 0, 0, 0, 1, 1],
  "a3-input-rejected": ["INPUT_REJECTED", "INPUT_REJECTED", 30, 0, 0, 0, 0, 0],
  "a4-kernel-current-repeat": ["VERIFIED_PASS", "PASS", 0, 73, 0, 0, 0, 0],
  "a4-kernel-synthetic-change": ["VERIFIED_FAIL", "FAIL", 10, 1, 1, 0, 0, 1],
};
const privatePattern = /(?:\/Users\/|\/private\/tmp|file:\/\/|(?:token|secret|credential)\s*[=:])/i;
const digest = (text) => createHash("sha256").update(text).digest("hex");
const json = (value) => `${JSON.stringify(value)}\n`;
const assets = {};
const demonstrations = [];
const verification = [];

async function addAsset(demo, kind, text) {
  if (privatePattern.test(text)) throw new Error(`public-safety rejection: ${demo}/${kind}`);
  const reference = `assets/${demo}/${kind}.${kind === "report" ? "md" : "json"}`;
  assets[reference] = text;
  await mkdir(join(outputRoot, dirname(reference)), { recursive: true });
  await writeFile(join(outputRoot, reference), text);
  return { artifact_kind: kind, relative_asset_reference: reference, artifact_sha256: digest(text) };
}

function safeProvenance(rawText) {
  const raw = JSON.parse(rawText);
  const safe = {
    schema: "nexah.the_eye.curated_provenance_projection/1.0",
    source_provenance_sha256: digest(rawText),
    adapter_profile: raw.adapter_profile,
    adapter_role: raw.adapter_role,
    canonical_source_payload_sha256: raw.canonical_source_payload_sha256,
    canonical_source_record_sha256: raw.canonical_source_record_sha256,
    domain_id: raw.domain_id,
    edge_count: raw.edge_count,
    node_count: raw.node_count,
    ordering_class: raw.ordering_class,
    ordering_nonclaims: raw.ordering_nonclaims,
    kernel_revision: raw.kernel_revision,
    snapshot_identifier: raw.snapshot_identifier,
    snapshot_kind: raw.snapshot_kind,
    warnings: raw.warnings,
    redacted_fields: ["kernel_repository_path", "edge_identity_map", "extraction_boundary", "inspected_contract_file_hashes", "rejected_fields"],
    redaction_reason: "PUBLIC_SAFETY_AND_MINIMUM_CURATED_PRESENTATION",
  };
  return json(safe);
}

await mkdir(outputRoot);
for (const demoId of THE_EYE_DEMO_IDS) {
  const envelope = await loadDemo(demoId, artifactRoot);
  const [state, outcome, exitCode, i, l, a, u, residuals] = expected[demoId];
  if (envelope.state !== state || envelope.runtime?.outcome !== outcome || envelope.runtime?.exit_code !== exitCode) throw new Error(`A2 parity mismatch: ${demoId}`);
  if (envelope.projection) {
    const counts = [envelope.projection.ilau.invariant.length, envelope.projection.ilau.lost.length, envelope.projection.ilau.added.length, envelope.projection.ilau.unavailable.length];
    if (counts.join() !== [i, l, a, u].join() || envelope.projection.residuals.length !== residuals || envelope.projection.verification.status !== "VALID") throw new Error(`projection parity mismatch: ${demoId}`);
  } else if (demoId !== "a3-input-rejected") throw new Error(`missing projection: ${demoId}`);
  const packagedEnvelope = { ...envelope, runtimeMode: "CURATED_BUNDLED", verificationStage: "VERIFIED_BEFORE_PACKAGING" };
  const artifacts = [await addAsset(demoId, "envelope", json(packagedEnvelope))];
  const demo = THE_EYE_DEMOS[demoId];
  if ("result" in demo) artifacts.push(await addAsset(demoId, "result", (await exportDemoArtifact(demoId, "result", artifactRoot)).bytes.toString("utf8")));
  if ("report" in demo) {
    const report = envelope.projection ? await exportDemoArtifact(demoId, "report", artifactRoot) : await readArtifact(artifactRoot, demo.report);
    artifacts.push(await addAsset(demoId, "report", report.bytes.toString("utf8")));
  }
  let receiptState = "NOT_PRESENT";
  if ("receipt" in demo) {
    const receiptCheck = await verifyDemoReceipt(demoId, "valid", artifactRoot);
    if (receiptCheck.state !== "RECEIPT_VALID") throw new Error(`receipt verification failed: ${demoId}`);
    receiptState = "VALID";
    artifacts.push(await addAsset(demoId, "receipt", (await exportDemoArtifact(demoId, "receipt", artifactRoot)).bytes.toString("utf8")));
  }
  if ("provenance" in demo) {
    const raw = (await exportDemoArtifact(demoId, "provenance", artifactRoot)).bytes.toString("utf8");
    artifacts.push(await addAsset(demoId, "provenance", safeProvenance(raw)));
  }
  demonstrations.push({
    source_demonstration_id: demoId,
    display_title: demo.label,
    expected_state: state,
    source_result_sha256: envelope.projection?.identity.canonicalResultSha256 ?? null,
    receipt_present: "receipt" in demo,
    receipt_verification_state: receiptState,
    verification_stage: "VERIFIED_BEFORE_PACKAGING",
    public_safety_state: "PASS",
    artifacts,
  });
  verification.push({ demo_id: demoId, a2_result_verification: envelope.projection ? "VALID" : "INPUT_REJECTED_NO_RESULT", state, exit_code: exitCode, ilau: demoId === "a3-input-rejected" ? null : [i, l, a, u], residuals });
}

const manifest = {
  package_schema: "nexah.the_eye.curated_package/1.0",
  package_version: "1.0.0",
  package_id: "NEXAH_THE_EYE_A6_SIX_SEALED_DEMOS",
  generated_by: "NEXAH_THE_EYE_A6_CURATED_PACKAGE_BUILDER/1.0",
  scientific_validity: "NOT_EVALUATED",
  mechanism: "NOT_ESTABLISHED",
  human_decision: "REQUIRED_OR_EXTERNAL",
  public_demonstration_is_scientific_result: false,
  demonstrations,
};
const manifestText = json(manifest);
await writeFile(join(outputRoot, "manifest.json"), manifestText);
const validationReport = json({ schema: "nexah.the_eye.a6_validation/1.0", result: "PASS", exact_demo_count: 6, public_safety_scan: "PASS", a2_verification_stage: "BEFORE_PACKAGING", verification });
const runRecord = json({ schema: "nexah.the_eye.a6_clean_run/1.0", outcome: "PASS", package_id: manifest.package_id, artifact_count: Object.keys(assets).length, deterministic_inputs: "SEALED_A3_A4_ONLY", network_access: "NO" });
await writeFile(join(outputRoot, "validation-report.json"), validationReport);
await writeFile(join(outputRoot, "run-record.json"), runRecord);
const sortedAssets = Object.fromEntries(Object.entries(assets).sort(([a], [b]) => a.localeCompare(b)));
const generated = `// Generated deterministically by build-the-eye-a6-curated-package.mjs. Do not edit.\nexport const CURATED_MANIFEST = ${JSON.stringify(manifest)} as const;\nexport const CURATED_ASSETS: Record<string, string> = ${JSON.stringify(sortedAssets)};\n`;
await writeFile(join(outputRoot, "generated.ts"), generated);
console.log(JSON.stringify({ status: "PASS", demonstrations: demonstrations.length, assets: Object.keys(assets).length, manifest_sha256: digest(manifestText) }));
