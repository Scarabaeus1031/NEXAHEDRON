# NEXAHEDRON Confirmed Material Alpha

- Status: implemented proof
- Owner: NEXAHEDRON
- Output profile: `orion.confirmed-local-source/0.1-alpha`
- ORION execution: none
- Effects: none

## Purpose

This milestone proves one bounded NEXAHEDRON responsibility:

```text
mutable Human Working Material
→ explicit Human confirmation
→ immutable Confirmed Material
→ local validation
→ STOP
```

The proof replaces manual construction of the ORION Representation Alpha input
fixture. It does not connect the two repositories and does not invoke ORION.

## Implemented profile

The executable profile accepts one Human-owned local text material. The Human
may edit it repeatedly. Every edit advances the visible local revision.

Only an explicit confirmation by the same Human owner creates the immutable
artifact. Confirmation records:

- Orientation Object identity and confirmed revision;
- exact UTF-8 content;
- Human-owned source identity;
- whole-text fragment identity;
- SHA-256 integrity and source version;
- deterministic confirmation identity.

The result uses the accepted
`orion.confirmed-local-source/0.1-alpha` shape without redefining or importing
ORION behavior. Local validation covers the NEXAHEDRON-owned confirmation and
integrity invariants only.

## Run the proof

Print the deterministic artifact:

```bash
node --no-warnings --experimental-strip-types scripts/confirmed-material-proof.mjs
```

Create a new output file without overwriting an existing artifact:

```bash
node --no-warnings --experimental-strip-types scripts/confirmed-material-proof.mjs \
  --output /tmp/confirmed_local_source.json
```

The same Human input, edits and confirmation produce byte-identical canonical
JSON. The output command fails rather than overwrite an existing file.

Run the focused tests:

```bash
node --experimental-strip-types --test tests/confirmed-material.test.mjs
```

## Ownership

- The Human owns content, edits, intention and the decision to confirm.
- NEXAHEDRON owns Working Material, confirmation interaction and artifact
  creation.
- The artifact claims no Library authority.
- ORION owns nothing in this executable proof and is never called.

## Deferred

This milestone does not implement:

- browser synchronization or persistence;
- transport or handoff to ORION;
- Projection, Rendering or Representation;
- source resolution or Library authority;
- Evidence, Evidence Binding or Orientation;
- Runtime, Gateway, Reports or LYRA.

No deferred capability is simulated.
