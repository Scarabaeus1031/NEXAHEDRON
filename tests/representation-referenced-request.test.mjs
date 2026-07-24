import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import test from "node:test";

const root = new URL("../", import.meta.url);

function executeProof() {
  return spawnSync(
    process.execPath,
    [
      "--no-warnings",
      "--experimental-strip-types",
      "scripts/representation-referenced-request.mjs",
    ],
    { cwd: root, encoding: "utf8" },
  );
}

test("one immutable Representation is referenced by a valid Request 1.0", () => {
  const result = executeProof();
  assert.equal(result.status, 0, result.stderr);
  assert.equal(result.stderr, "");

  const proof = JSON.parse(result.stdout);
  assert.equal(proof.stop, "validated_orientation_request");
  assert.equal(proof.contract_validation.valid, true);
  assert.deepEqual(proof.contract_validation.errors, []);
  assert.equal(
    proof.representation_ref,
    "representation-ec8b75a6dec2ab21@sha256:9c71a8186680b9cb2c23cd11a374e876c0b78d5ff2ecf5f1eb23f007dd7366fd",
  );
  assert.ok(Object.values(proof.lineage_checks).every(Boolean));

  const [orientationObject] = proof.request.orientation_objects;
  assert.deepEqual(orientationObject.representation_refs, [
    proof.representation_ref,
  ]);
  assert.equal(
    orientationObject.integrity_ref.value,
    "1869afe0bab70f4a91c17a7888ccff836199ba7a76afd7868d4c4a29e44336f0",
  );
  assert.equal(proof.request.effects, "none");
  assert.equal(
    proof.request.human_authority.human_ref,
    "human-alpha-reviewer",
  );
  assert.ok(proof.request.intention.direction);
  assert.ok(proof.request.scope.include.length > 0);
});

test("the complete request proof is byte-identical across executions", () => {
  const first = executeProof();
  const second = executeProof();

  assert.equal(first.status, 0, first.stderr);
  assert.equal(second.status, 0, second.stderr);
  assert.equal(first.stdout, second.stdout);
  assert.equal(
    createHash("sha256").update(first.stdout, "utf8").digest("hex"),
    "06135ecd0c212605840a7fd31e8cc2492494a58a11af89eeb8b335d43635167d",
  );
});

test("the milestone invokes no Runtime, Gateway, readiness, or Orientation", async () => {
  const [assembler, validator] = await Promise.all([
    readFile(
      new URL(
        "../scripts/representation-referenced-request.mjs",
        import.meta.url,
      ),
      "utf8",
    ),
    readFile(
      new URL(
        "../scripts/validate-representation-request.py",
        import.meta.url,
      ),
      "utf8",
    ),
  ]);
  const source = `${assembler}\n${validator}`;

  assert.doesNotMatch(
    source,
    /OrientationGateway|OrientationRuntime|readiness_validation|\.execute\(|\.invoke\(|fetch\s*\(|https?:\/\//,
  );
  assert.match(source, /validate_orientation_request/);
  assert.doesNotMatch(
    source,
    /OrientationReport|ContinuationOption|EvidenceReference/,
  );
});
