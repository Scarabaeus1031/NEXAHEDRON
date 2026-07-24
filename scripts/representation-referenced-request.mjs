import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import {
  orionPythonEnvironment,
  orionPythonExecutable,
} from "./orion-python-env.mjs";

const root = fileURLToPath(new URL("../", import.meta.url));

const handoff = spawnSync(
  process.execPath,
  [
    "--no-warnings",
    "--experimental-strip-types",
    "scripts/representation-alpha-handoff.mjs",
  ],
  { cwd: root, encoding: "utf8" },
);
if (handoff.error) throw handoff.error;
if (handoff.status !== 0) {
  throw new Error(handoff.stderr || "Representation Alpha handoff failed");
}

const handoffProof = JSON.parse(handoff.stdout);
const representation = handoffProof.representation;
const representationRef =
  `${representation.representation_id}@${representation.representation_version}`;

// These values are explicit Human input for this bounded proof. None is
// inferred from Representation content.
const request = {
  schema_version: "orion.orientation-request/1.0",
  request_id: "request-representation-ref-alpha-001",
  request_version: "1",
  mode: "understand",
  requested_by: {
    requester_id: "human-alpha-reviewer",
    requester_kind: "human",
    authority_domain: "nexahedron.orientation-laboratory",
  },
  human_authority: {
    human_ref: "human-alpha-reviewer",
    authority_scope: ["intention", "scope", "continuation"],
  },
  orientation_objects: [
    {
      object_id: representation.orientation_object_id,
      object_version: representation.orientation_object_version,
      object_kind: "Observation",
      source_owner: representation.source.owner,
      source_ref: representation.source.source_ref,
      source_revision: representation.source.revision,
      identity_scope: "session_local",
      representation_refs: [representationRef],
      integrity_ref: {
        method: "sha256",
        value: representation.payload.content_sha256,
        coverage: "whole",
        verified: true,
      },
      access_status: "available",
      provenance_gaps: null,
    },
  ],
  intention: {
    direction:
      "Understand why orientation remains necessary when information is abundant.",
    focus: "the relationship between information and orientation",
    success_boundary:
      "The distinction and its supporting source remain visible.",
  },
  scope: {
    include: ["the confirmed observation", "its stated distinction"],
    exclude: ["evidence assessment", "recommendations"],
    unresolved: [],
    depth: "focused",
    breadth: null,
    time_boundary: null,
  },
  effects: "none",
  audience: null,
  constraints: [],
  evidence_policy: null,
  representation_preferences: [],
  depth_budget: null,
  prior_report_refs: [],
  human_annotations: [],
  clarification_of: null,
  continuation_of: null,
  mode_parameters: {},
  consumer_context: {},
};

const validation = spawnSync(
  orionPythonExecutable(),
  ["scripts/validate-representation-request.py"],
  {
    cwd: root,
    env: await orionPythonEnvironment(),
    input: JSON.stringify({ request, representation }),
    encoding: "utf8",
  },
);
if (validation.error) throw validation.error;
if (validation.status !== 0) {
  throw new Error(
    validation.stderr || "Orientation Request public validation failed",
  );
}

process.stdout.write(validation.stdout);
