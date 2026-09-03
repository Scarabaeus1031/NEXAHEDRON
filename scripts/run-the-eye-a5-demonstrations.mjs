import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { THE_EYE_DEMO_IDS, THE_EYE_DEMOS } from "../features/the-eye/catalog.ts";
import { exportDemoArtifact, loadDemo, verifyDemoReceipt } from "../features/the-eye/server.ts";

const [artifactRoot, outputRoot] = process.argv.slice(2);
if (!artifactRoot || !outputRoot) throw new Error("usage: run-the-eye-a5-demonstrations.mjs ARTIFACT_ROOT NEW_OUTPUT_ROOT");
await mkdir(outputRoot);

const summary = { schema: "nexah.the_eye.a5_clean_run/1.0", demonstrations: [] };
for (const demoId of THE_EYE_DEMO_IDS) {
  const output = join(outputRoot, demoId);
  await mkdir(output);
  const envelope = await loadDemo(demoId, artifactRoot);
  await writeFile(join(output, "transport-envelope.json"), `${JSON.stringify(envelope)}\n`);
  const demoSummary = {
    demoId,
    state: envelope.state,
    decision: envelope.projection?.outcome.decision ?? envelope.runtime?.outcome ?? null,
    exitCode: envelope.projection?.exitCode ?? envelope.runtime?.exit_code ?? null,
    ilau: envelope.projection ? [envelope.projection.ilau.invariant.length, envelope.projection.ilau.lost.length, envelope.projection.ilau.added.length, envelope.projection.ilau.unavailable.length] : null,
    residuals: envelope.projection?.residuals.length ?? null,
    resultSha256: envelope.projection?.identity.canonicalResultSha256 ?? null,
    mechanismStatus: envelope.projection?.outcome.mechanismStatus ?? null,
  };
  summary.demonstrations.push(demoSummary);
  const demo = THE_EYE_DEMOS[demoId];
  for (const kind of ["result", "report", "receipt", "provenance"]) {
    if (!(kind in demo) || (kind === "report" && !envelope.projection)) continue;
    const artifact = await exportDemoArtifact(demoId, kind, artifactRoot);
    await writeFile(join(output, `export-${kind}.${kind === "report" ? "md" : "json"}`), artifact.bytes);
  }
}
for (const variant of ["valid", "invalid"]) {
  const envelope = await verifyDemoReceipt("a3-pass-exact-id", variant, artifactRoot);
  await writeFile(join(outputRoot, `receipt-${variant}-verification.json`), `${JSON.stringify(envelope)}\n`);
}
await writeFile(join(outputRoot, "run-summary.json"), `${JSON.stringify(summary)}\n`);
console.log(JSON.stringify(summary));
