import { verifyDemoReceipt } from "@/features/the-eye/server";

export const dynamic = "force-dynamic";
export async function POST(request: Request) {
  let body: { demo?: string; variant?: string } = {};
  try { body = await request.json(); } catch { /* closed invalid envelope below */ }
  const envelope = await verifyDemoReceipt(body.demo ?? "", body.variant === "invalid" ? "invalid" : "valid");
  return Response.json(envelope, { status: envelope.state === "RECEIPT_VALID" ? 200 : 422, headers: { "cache-control": "no-store" } });
}
