import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const expectedRevision = "8a65f40464a4ccfa62d8f9fd8b831d107b0eaa35";

test("pins all canonical Orientation Session cases", async () => {
  const manifest = JSON.parse(
    await readFile(
      new URL("../fixtures/orientation-sessions/manifest.json", import.meta.url),
      "utf8",
    ),
  );

  assert.equal(manifest.schemaVersion, "nexahedron.orientation-session-fixtures/0.1");
  assert.equal(manifest.source.revision, expectedRevision);
  assert.equal(manifest.source.format, "orientation-session/1");
  assert.equal(manifest.sessions.length, 13);
  assert.equal(new Set(manifest.sessions.map(({ id }) => id)).size, 13);
  assert.equal(new Set(manifest.sessions.map(({ document }) => document)).size, 13);
  assert.deepEqual(
    manifest.sessions.find(({ id }) => id === "full-round-trip").expectedPath,
    ["T02", "T04", "T06", "T08", "T11", "T13"],
  );
  assert.equal(
    manifest.sessions.find(({ id }) => id === "planned-identity").expectedOutcome,
    "planned",
  );
});

test("projects the canonical full round trip without semantic alteration", async () => {
  const fixture = JSON.parse(
    await readFile(
      new URL(
        "../fixtures/orientation-sessions/full-round-trip.json",
        import.meta.url,
      ),
      "utf8",
    ),
  );

  assert.equal(fixture.source.revision, expectedRevision);
  assert.equal(fixture.source.sessionFormat, "orientation-session/1");
  assert.equal(
    fixture.request.utterance,
    "I want to understand how this observation reaches the calendar.",
  );
  assert.deepEqual(fixture.translation.intents, ["Navigate", "Explain"]);
  assert.equal(fixture.report.status, "blocked");
  assert.equal(fixture.report.producedRepresentation, null);
  assert.deepEqual(
    fixture.report.plan.path.map(({ transitionId }) => transitionId),
    ["T02", "T04", "T06", "T08", "T11", "T13"],
  );
  assert.equal(fixture.report.plan.alternativePaths.length, 7);
  assert.equal(fixture.report.issues.length, 12);
  assert.equal(fixture.report.validation.valid, false);
  assert.equal(fixture.report.validation.checkCount, 17);
  assert.equal(fixture.report.validation.errorCount, 12);
  assert.equal(
    fixture.explanation.sentences.at(-1),
    "No target representation was produced.",
  );
});
