import type { TransportEnvelope } from "./types.ts";

function mode() { return process.env.THE_EYE_RUNTIME_MODE; }
function closed(reasonCode: string): TransportEnvelope {
  return { schema: "nexah.the_eye.local_view/1.0", state: "LOCAL_CONFIGURATION_MISSING", reasonCode };
}

export async function loadRuntimeDemo(demoId: string): Promise<TransportEnvelope> {
  if (mode() === "CURATED_BUNDLED") return (await import("./curated-server.ts")).loadCuratedDemo(demoId);
  if (mode() === "LOCAL_VERIFIED") {
    const envelope = await (await import("./server.ts")).loadDemo(demoId);
    return { ...envelope, runtimeMode: "LOCAL_VERIFIED", verificationStage: "VERIFIED_DURING_THIS_LOCAL_REQUEST" };
  }
  return closed(mode() ? "INVALID_RUNTIME_MODE" : "RUNTIME_MODE_MISSING");
}

export async function verifyRuntimeReceipt(demoId: string, variant: "valid" | "invalid"): Promise<TransportEnvelope> {
  if (mode() === "CURATED_BUNDLED") return (await import("./curated-server.ts")).verifyCuratedReceipt(demoId, variant);
  if (mode() === "LOCAL_VERIFIED") {
    const envelope = await (await import("./server.ts")).verifyDemoReceipt(demoId, variant);
    return { ...envelope, runtimeMode: "LOCAL_VERIFIED", verificationStage: "VERIFIED_DURING_THIS_LOCAL_REQUEST" };
  }
  return closed(mode() ? "INVALID_RUNTIME_MODE" : "RUNTIME_MODE_MISSING");
}

export async function exportRuntimeArtifact(demoId: string, kind: string) {
  if (mode() === "CURATED_BUNDLED") return (await import("./curated-server.ts")).exportCuratedArtifact(demoId, kind);
  if (mode() === "LOCAL_VERIFIED") return (await import("./server.ts")).exportDemoArtifact(demoId, kind);
  const { ArtifactBoundaryError } = await import("./boundary.ts");
  throw new ArtifactBoundaryError(mode() ? "INVALID_RUNTIME_MODE" : "RUNTIME_MODE_MISSING", "THE_EYE_RUNTIME_MODE must be explicitly configured.");
}
