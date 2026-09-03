import { ArtifactBoundaryError, exportDemoArtifact } from "@/features/the-eye/server";

export const dynamic = "force-dynamic";
export async function GET(request: Request) {
  const query = new URL(request.url).searchParams;
  const kind = query.get("kind") ?? "";
  try {
    const artifact = await exportDemoArtifact(query.get("demo") ?? "", kind);
    const type = kind === "report" ? "text/markdown; charset=utf-8" : "application/json; charset=utf-8";
    return new Response(artifact.bytes, { headers: { "content-type": type, "content-disposition": `attachment; filename=the-eye-${kind}.${kind === "report" ? "md" : "json"}`, "cache-control": "no-store" } });
  } catch (error) {
    const code = error instanceof ArtifactBoundaryError ? error.code : "EXPORT_FAILED";
    return Response.json({ state: "RESULT_INVALID", reasonCode: code }, { status: 422, headers: { "cache-control": "no-store" } });
  }
}
