# Representation-Referenced Request Alpha

- Status: implemented proof
- Public contract: `OrientationRequest 1.0`
- Runtime and Gateway execution: none
- Readiness validation: none
- Effects: none

## Purpose

This milestone proves that the frozen public request language can faithfully
name the immutable Representation produced by the accepted Alpha Foundation:

```text
Human-owned Working Material
→ Confirmed Material
→ immutable Representation
→ explicit Human request values
→ Representation-referenced OrientationRequest 1.0
→ public contract validation
→ STOP
```

No new request model or contract is introduced.

## Request assembly

NEXAHEDRON assembles one existing `OrientationRequest 1.0` from:

- the exact Orientation Object identity and version preserved by the
  Representation;
- the exact Representation identity and content-addressed version;
- the preserved source owner, reference and revision;
- the exact whole-content SHA-256 integrity value;
- explicit Human-authored object kind, Intention, Scope and Depth;
- explicit Human authority;
- `effects: none`.

The Representation contributes identity and integrity only. The proof does not
infer Intention, Scope, object kind or meaning from Representation content.

## Validation

The assembled mapping is structurally materialized with ORION's existing
Version 1 translation function and validated by the existing public
`validate_orientation_request` validator. This does not invoke the Gateway,
Runtime, readiness validation or an Orientation Operator.

An external lineage check additionally proves that:

- exactly one Representation reference is present;
- its identity and version match the produced immutable Representation;
- Orientation Object identity and version remain unchanged;
- source owner, reference and revision remain unchanged;
- integrity matches the exact Representation payload;
- Human intention, scope and authority remain explicit.

The proof output is diagnostic evidence only. It is not another public contract.

## Run the proof

```bash
npm run proof:representation-request
```

Run the focused tests:

```bash
node --no-warnings --experimental-strip-types \
  --test tests/representation-referenced-request.test.mjs
```

Repeated executions produce byte-identical canonical JSON.

## Ownership

- The Human owns Orientation Object choice, Intention, Scope, Depth and
  authority.
- NEXAHEDRON owns deterministic request preparation and assembly.
- ORION's existing public validator validates only the frozen request contract.
- Runtime and Gateway execution remain outside this milestone.

## Stop boundary

The proof stops immediately after successful public contract validation. It
does not perform or simulate:

- readiness validation;
- Runtime or Gateway execution;
- Orientation;
- reports or continuations;
- Library resolution, Evidence or Evidence Binding;
- LYRA;
- browser workflow changes, persistence, transport or synchronization.
