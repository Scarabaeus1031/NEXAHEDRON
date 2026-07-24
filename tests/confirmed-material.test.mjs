import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import test from "node:test";
import {
  CONFIRMED_LOCAL_SOURCE_SCHEMA,
  CONFIRMED_LOCAL_TEXT_MEDIA_TYPE,
  MutableWorkingMaterial,
  confirmWorkingMaterial,
  serializeConfirmedMaterial,
  validateConfirmedMaterial,
} from "../packages/laboratory-domain/src/confirmed-material.ts";

const finalContent =
  "Information already exists. Orientation is what is missing.\n";

function confirmedArtifact() {
  const material = new MutableWorkingMaterial({
    materialId: "alpha-local-text-001",
    orientationObjectId: "orientation-object-alpha-local-text-001",
    humanOwner: "human-alpha-reviewer",
    content: "Information already exists.\n",
  });
  material.edit(finalContent);
  return confirmWorkingMaterial(material, {
    confirmedBy: "human-alpha-reviewer",
    accepted: true,
  });
}

test("Working Material remains mutable and revisions make edits visible", () => {
  const material = new MutableWorkingMaterial({
    materialId: "material-001",
    orientationObjectId: "object-001",
    humanOwner: "human-001",
  });

  assert.equal(material.snapshot().revision, 1);
  const edited = material.edit("A Human-authored observation.\n");
  assert.equal(edited.revision, 2);
  assert.equal(edited.content, "A Human-authored observation.\n");
  assert.ok(Object.isFrozen(edited));
});

test("only explicit confirmation by the Human owner crosses the boundary", () => {
  const material = new MutableWorkingMaterial({
    materialId: "material-001",
    orientationObjectId: "object-001",
    humanOwner: "human-001",
    content: "A Human-authored observation.\n",
  });

  assert.throws(
    () =>
      confirmWorkingMaterial(material, {
        confirmedBy: "human-001",
        accepted: false,
      }),
    /explicit Human confirmation/,
  );
  assert.throws(
    () =>
      confirmWorkingMaterial(material, {
        confirmedBy: "another-human",
        accepted: true,
      }),
    /only the Human owner/,
  );
});

test("confirmation produces an immutable artifact matching the Alpha profile", () => {
  const artifact = confirmedArtifact();
  const contentSha256 = createHash("sha256")
    .update(finalContent, "utf8")
    .digest("hex");

  assert.equal(artifact.schema_version, CONFIRMED_LOCAL_SOURCE_SCHEMA);
  assert.equal(
    artifact.source.media_type,
    CONFIRMED_LOCAL_TEXT_MEDIA_TYPE,
  );
  assert.equal(artifact.source.fragment_ref, "whole");
  assert.equal(artifact.source.integrity_sha256, contentSha256);
  assert.equal(artifact.source.source_version, `sha256:${contentSha256}`);
  assert.equal(artifact.confirmation.confirmed_revision, 2);
  assert.ok(artifact.confirmation.confirmation_id.startsWith("confirmation-"));
  assert.deepEqual(Object.keys(artifact).sort(), [
    "confirmation",
    "orientation_object_id",
    "orientation_object_version",
    "schema_version",
    "source",
  ]);
  assert.deepEqual(Object.keys(artifact.source).sort(), [
    "content",
    "entry_id",
    "fragment_ref",
    "integrity_sha256",
    "media_type",
    "source_owner",
    "source_ref",
    "source_version",
  ]);
  assert.deepEqual(Object.keys(artifact.confirmation).sort(), [
    "confirmation_id",
    "confirmed_by",
    "confirmed_revision",
  ]);
  assert.ok(Object.isFrozen(artifact));
  assert.ok(Object.isFrozen(artifact.source));
  assert.ok(Object.isFrozen(artifact.confirmation));
  assert.throws(() => {
    artifact.source.content = "Changed after confirmation";
  }, TypeError);
});

test("identical Human edits and confirmation serialize byte-identically", () => {
  const first = serializeConfirmedMaterial(confirmedArtifact());
  const second = serializeConfirmedMaterial(confirmedArtifact());

  assert.equal(first, second);
  assert.equal(first.endsWith("\n"), true);
  assert.deepEqual(JSON.parse(first), confirmedArtifact());
});

test("local validation rejects content changed after confirmation", () => {
  const artifact = structuredClone(confirmedArtifact());
  artifact.source.content = "Changed after confirmation";

  const validation = validateConfirmedMaterial(artifact);
  assert.equal(validation.valid, false);
  assert.ok(
    validation.errors.includes(
      "Confirmed Material content integrity does not match",
    ),
  );
});

test("the executable proof emits only a valid deterministic artifact", () => {
  const proof = spawnSync(
    process.execPath,
    [
      "--no-warnings",
      "--experimental-strip-types",
      "scripts/confirmed-material-proof.mjs",
    ],
    { cwd: new URL("../", import.meta.url), encoding: "utf8" },
  );

  assert.equal(proof.status, 0, proof.stderr);
  assert.equal(proof.stderr, "");
  assert.deepEqual(JSON.parse(proof.stdout), confirmedArtifact());
  assert.equal(
    serializeConfirmedMaterial(JSON.parse(proof.stdout)),
    proof.stdout,
  );
});

test("the confirmation proof contains no ORION execution or transport seam", async () => {
  const source = await readFile(
    new URL(
      "../packages/laboratory-domain/src/confirmed-material.ts",
      import.meta.url,
    ),
    "utf8",
  );
  const proof = await readFile(
    new URL("../scripts/confirmed-material-proof.mjs", import.meta.url),
    "utf8",
  );

  assert.doesNotMatch(source, /from\s+["'][^"']*orion/i);
  assert.doesNotMatch(source, /\bfetch\s*\(|XMLHttpRequest|axios/i);
  assert.doesNotMatch(proof, /orion-gateway|representation_alpha|render\(/i);
});
