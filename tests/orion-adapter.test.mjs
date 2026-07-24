import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import test from "node:test";
import { mapToOrientationRequest } from "../features/orientation/integration/request-mapping.ts";
import { invokeOrion, mapPublicOutcome } from "../packages/orion-gateway/src/index.ts";
import { orionPythonEnvironment, orionPythonExecutable } from "../scripts/orion-python-env.mjs";

const state = {
  step: "orientation",
  entry: "understand",
  mode: "understand",
  wonder: "A tension in the central claim",
  object: {
    title: "A research paper",
    type: "Research Paper",
    url: "https://example.test/paper",
    fileName: "",
  },
  request: {
    intention: "Understand the central claim",
    focus: "central claim",
    successBoundary: "The claim and support are visible",
    scopeInclude: ["claim", "support"],
    scopeExclude: ["implementation"],
    depth: "Focused",
  },
  executionRequestId: "request-adapter-live",
};

async function executeRealGateway(envelope) {
  const result = spawnSync(
    orionPythonExecutable(),
    ["-m", "services.orion_transport.server", "--once"],
    {
      cwd: process.cwd(),
      env: await orionPythonEnvironment(),
      input: JSON.stringify(envelope),
      encoding: "utf8",
    },
  );
  assert.equal(result.status, 0, result.stderr);
  return JSON.parse(result.stdout);
}

test("maps local Human state to the exact Orientation Request 1.0 envelope", () => {
  const envelope = mapToOrientationRequest(state, "request-adapter-live");
  assert.equal(envelope.request.schema_version, "orion.orientation-request/1.0");
  assert.equal(envelope.request.mode, "understand");
  assert.equal(envelope.request.effects, "none");
  assert.equal(envelope.request.orientation_objects[0].object_version, "unknown");
  assert.equal(envelope.request.orientation_objects[0].source_owner, "unknown");
  assert.equal(envelope.request.orientation_objects[0].access_status, "unknown");
  assert.deepEqual(envelope.request.human_annotations, [state.wonder]);
  assert.deepEqual(envelope.evidence, []);
});

test("maps a real Gateway clarification and exposes the immutable lineage blocker", async () => {
  const first = mapToOrientationRequest(state, "request-adapter-live");
  const firstResponse = await executeRealGateway(first);
  assert.equal(firstResponse.status, 409);
  const clarificationOutcome = mapPublicOutcome(firstResponse.body);
  assert.equal(clarificationOutcome.kind, "clarification");
  assert.equal(clarificationOutcome.error.kind, "clarification_required");

  const second = mapToOrientationRequest(
    state,
    "request-adapter-live",
    2,
    clarificationOutcome.clarification,
    { objectVersion: "edition-1", accessStatus: "available" },
  );
  assert.equal(second.request.clarification_of.result_id, clarificationOutcome.clarification.result_id);
  assert.equal(second.request.intention.direction, first.request.intention.direction);
  assert.deepEqual(second.request.scope, first.request.scope);

  const secondResponse = await executeRealGateway(second);
  assert.equal(secondResponse.status, 422);
  const failureOutcome = mapPublicOutcome(secondResponse.body);
  assert.equal(failureOutcome.kind, "runtime_error");
  assert.equal(failureOutcome.error.kind, "validation_failed");
  assert.equal(failureOutcome.error.reason_code, "runtime_outcome_invalid");
});

test("classifies transport failure without collapsing other boundary failures", async () => {
  const envelope = mapToOrientationRequest(state, "request-adapter-live");
  const result = await invokeOrion(envelope, async () => { throw new Error("connection unavailable"); });
  assert.deepEqual(result, { kind: "boundary_failure", failure: { category: "transport_failure", code: "transport_request_failed" } });
});

test("classifies Gateway, invalid response, unsupported version and lifecycle violations separately", async () => {
  const envelope = mapToOrientationRequest(state, "request-adapter-live");
  const gateway = await invokeOrion(envelope, async () => new Response(JSON.stringify({ boundary_failure: { category: "gateway_failure", code: "gateway_unavailable" } }), { status: 503 }));
  assert.equal(gateway.failure.category, "gateway_failure");

  const invalid = await invokeOrion(envelope, async () => new Response("not-json", { status: 502 }));
  assert.equal(invalid.failure.category, "invalid_public_response");

  const unsupported = await invokeOrion(envelope, async () => new Response(JSON.stringify({ request: null, contracts: [{ schema_version: "orion.orientation-report/2.0" }], evidence: [] })));
  assert.equal(unsupported.failure.category, "unsupported_contract_version");

  const violation = await invokeOrion(envelope, async () => new Response(JSON.stringify({ request: envelope.request, contracts: [], evidence: [] })));
  assert.equal(violation.failure.category, "contract_violation");
});
