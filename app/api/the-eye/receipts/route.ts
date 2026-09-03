import { verifyRuntimeReceipt } from "@/features/the-eye/runtime";

export const dynamic = "force-dynamic";
export async function POST(request: Request) {
  let body: { demo?: string; variant?: string } = {};
  try { body = await request.json(); } catch { /* closed invalid envelope below */ }
  const demo = typeof body.demo === "string" ? body.demo : "";
  const variant = body.variant === "valid" || body.variant === "invalid" ? body.variant : null;
  if (!variant) {
    return Response.json({ schema: "nexah.the_eye.local_view/1.0", state: "RECEIPT_INVALID", reasonCode: "MALFORMED_REQUEST" }, { status: 422, headers: { "cache-control": "no-store" } });
  }
  const envelope = await verifyRuntimeReceipt(demo, variant);
  return Response.json(envelope, { status: envelope.state === "RECEIPT_VALID" ? 200 : 422, headers: { "cache-control": "no-store" } });
}
