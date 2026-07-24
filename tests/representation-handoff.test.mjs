import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

function executeHandoff() {
  return spawnSync(
    process.execPath,
    [
      "--no-warnings",
      "--experimental-strip-types",
      "scripts/representation-alpha-handoff.mjs",
    ],
    { cwd: root, encoding: "utf8" },
  );
}

test("Confirmed Material is consumed adapter-free by Representation Alpha", () => {
  const result = executeHandoff();
  assert.equal(result.status, 0, result.stderr);
  assert.equal(result.stderr, "");

  const proof = JSON.parse(result.stdout);
  assert.equal(
    proof.confirmed_material_sha256,
    "ce96b7d3f470950db6719cb1e92f798f7daa29c907bbedfcb783475216b73c6b",
  );
  assert.deepEqual(proof.handoff_checks, {
    confirmed_profile_accepted: true,
    confirmation_identity_preserved: true,
    content_integrity_preserved: true,
    orientation_object_identity_preserved: true,
    representation_conformant: true,
    source_identity_preserved: true,
    source_version_preserved: true,
  });
  assert.equal(proof.stop, "immutable_representation");
  assert.equal(
    proof.representation.representation_id,
    "representation-ec8b75a6dec2ab21",
  );
  assert.equal(
    proof.representation.representation_version,
    "sha256:9c71a8186680b9cb2c23cd11a374e876c0b78d5ff2ecf5f1eb23f007dd7366fd",
  );
  assert.equal(proof.representation_conformance.valid, true);
  assert.deepEqual(proof.representation_conformance.errors, []);
});

test("the complete handoff is byte-identical across executions", () => {
  const first = executeHandoff();
  const second = executeHandoff();

  assert.equal(first.status, 0, first.stderr);
  assert.equal(second.status, 0, second.stderr);
  assert.equal(first.stdout, second.stdout);
});

test("the proof invokes no Runtime, Gateway, Orientation, or Evidence surface", async () => {
  const [orchestrator, consumer] = await Promise.all([
    readFile(
      new URL("../scripts/representation-alpha-handoff.mjs", import.meta.url),
      "utf8",
    ),
    readFile(
      new URL("../scripts/consume-confirmed-material.py", import.meta.url),
      "utf8",
    ),
  ]);

  assert.doesNotMatch(
    `${orchestrator}\n${consumer}`,
    /OrientationGateway|OrientationRuntime|EvidenceReference|OrientationReport|fetch\s*\(|https?:\/\//,
  );
  assert.match(
    consumer,
    /from orion\.representation_alpha import/,
  );
  assert.doesNotMatch(consumer, /def\s+map_|def\s+adapt_|class\s+.*Adapter/);
});
