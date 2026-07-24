# ORION × NEXAHEDRON Representation Handoff Alpha

- Status: implemented proof
- Boundary: Confirmed Material → Representation Alpha
- Mapping layer: none
- Runtime, Gateway and Orientation execution: none
- Effects: none

## Purpose

This milestone proves that the two accepted Alpha implementations fit together
without modification:

```text
NEXAHEDRON Working Material
→ explicit Human confirmation
→ immutable Confirmed Material
→ accepted ORION Representation Alpha input
→ deterministic exact-text Projection
→ immutable Representation
→ STOP
```

It is a local compatibility proof, not a production integration or transport
design.

## Handoff

The canonical JSON emitted by the NEXAHEDRON Confirmed Material proof is passed
unchanged to ORION's existing `confirmed_source_from_mapping` entry point.
There is no adapter and no field mapping.

The proof verifies:

- the Confirmed Material profile is accepted;
- Orientation Object identity and version are preserved;
- source identity, source reference and source version are preserved;
- Human confirmation identity remains present in Representation provenance;
- exact content and SHA-256 integrity are preserved;
- the existing external Representation conformance result is valid;
- repeated executions are byte-identical.

The outer proof envelope is diagnostic output only. It is not a public
contract, transport object or new architectural authority.

## Reproducibility

The handoff runner first executes the existing immutable ORION Version 1
dependency verification. It also verifies the exact accepted Alpha
Representation module and its existing context dependency before execution.
Any mismatch stops the proof.

Run:

```bash
npm run proof:representation-handoff
```

Run the focused tests:

```bash
node --no-warnings --experimental-strip-types \
  --test tests/representation-handoff.test.mjs
```

## Ownership

- The Human owns the material, edits and confirmation.
- NEXAHEDRON owns preparation and creation of Confirmed Material.
- ORION owns Projection, Rendering and the immutable Representation.
- The proof orchestrates these accepted responsibilities without acquiring any
  of them.

## Stop boundary

The proof ends after a conformant immutable Representation is created. It does
not execute or simulate:

- Runtime or Gateway behavior;
- Orientation;
- Library or Source Evidence;
- Evidence Binding;
- Reports or LYRA;
- browser execution, HTTP, persistence or synchronization.
