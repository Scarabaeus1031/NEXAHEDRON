import { loadDemo } from "@/features/the-eye/server";

export const dynamic = "force-dynamic";
export async function GET(request: Request) {
  const id = new URL(request.url).searchParams.get("demo") ?? "";
  const envelope = await loadDemo(id);
  const status = envelope.state === "LOCAL_CONFIGURATION_MISSING" ? 503 : envelope.state === "RESULT_INVALID" ? 422 : 200;
  return Response.json(envelope, { status, headers: { "cache-control": "no-store" } });
}
