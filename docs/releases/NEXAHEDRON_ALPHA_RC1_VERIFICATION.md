# NEXAHEDRON Alpha RC1 Verification Report

- Candidate: `0.1.0-dev.0`
- Scope: Sprint 3 release hardening
- Product changes: none
- ORION behavior changes: none

## Dependency verification

ORION execution is bound to base revision
`ff9a94ac9f5a566b99c33f19ce3208055b4923c1` and canonical-content fingerprint
`b94c47adfda9d33a3d367718a56c63aca6b7250b78fa5ad57bb2b64c903f9c0b`.
Every transport start, integration-test run and contract generation verifies
both values before importing ORION. Mismatch stops execution.

## Contract verification

The frozen executable Python models in `orion.public_contracts.models` are the
only typed semantic authority. NEXAHEDRON TypeScript declarations are generated
from those models. The release check compares a fresh generated projection with
the committed projection and rejects drift.

## Architecture verification

NEXAHEDRON imports the external public Gateway and public contract models only.
No Runtime internal, Operator, provider, fixture execution path, semantic
validator or evidence-selection behavior exists in the application.

## Failure verification

Transport failure, Gateway failure, public lifecycle violation, invalid public
response and unsupported contract version are distinct consumer boundary
states. Runtime unavailable remains a Version 1 Runtime Error.

## Documentation verification

README, CHANGELOG, Authority Boundaries, Application Architecture, current
Alpha Guide and Live Integration describe the same live Version 1 path. Earlier
Phase I specifications and reviews remain named historical milestone records.

## Verification matrix

| Verification | Result |
|---|---|
| TypeScript | passed |
| immutable revision and canonical-content fingerprint | passed |
| intentional wrong-revision fail-closed diagnostic | passed |
| generated contract drift | passed |
| architecture boundaries | passed |
| current-document consistency | passed |
| lint | passed |
| production build | passed |
| frontend, state and boundary tests | 21 passed |
| real Gateway integration tests | 4 passed |
| browser journey: Landing → blocked Orientation Report | passed |
| browser console diagnostics | none |

## Remaining limitations

- no Library evidence adapter;
- no production transport endpoint;
- immutable Gateway clarification-lineage incompatibility;
- Understand only;
- no persistence, authentication, uploads, history or providers.

These limitations are explicit Alpha scope or immutable external constraints;
none is hidden by a fallback or simulated response.

## Release recommendation

**NEXAHEDRON Alpha RC1 — accepted for internal Alpha review.**

The candidate is reproducible against the reviewed ORION Version 1 content,
contract-derived, fail-closed and documentation-consistent. Production hosting
remains unavailable until an external ORION transport endpoint exists; that is
an external deployment dependency, not an RC1 integrity failure.
