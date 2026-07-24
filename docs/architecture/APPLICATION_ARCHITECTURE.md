# NEXAHEDRON Alpha Application Architecture

- Status: current Alpha RC1 architecture
- ORION dependency: immutable Version 1 RC1 candidate
- Executable mode: Understand only

NEXAHEDRON is a modular Laboratory application. It owns presentation,
interaction, in-memory session state and transport adaptation. It does not own
orientation behavior, evidence authority or ORION validation.

## Current surfaces

- `app/` owns routes, root composition and the same-origin
  `POST /api/orientation` proxy.
- `features/orientation/` owns Human interaction, local state, request mapping
  and direct presentation of public outcomes.
- `packages/orion-gateway/` is the sole browser consumer seam. Its public
  contract declarations are generated from the verified ORION models.
- `services/orion_transport/` is the NEXAHEDRON-owned HTTP adapter around the
  immutable external `OrientationGateway`.
- `scripts/verify-orion-dependency.mjs` verifies the ORION Git revision and
  canonical-content fingerprint before execution.
- `packages/design-system/` and `app/globals.css` own the visual language.

## Execution boundary

```text
Human-confirmed local state
  → Orientation Request mapping
  → POST /api/orientation
  → HTTP transport adapter
  → immutable ORION Version 1 Gateway
  → immutable Runtime
  → validated public Version 1 contracts
  → direct NEXAHEDRON presentation
```

The application has no persistence, authentication, upload transport, Library
adapter, provider integration or alternate Runtime.

The canonical boundary for every future evidence source or Library adapter is
defined in [`EVIDENCE_ARCHITECTURE.md`](EVIDENCE_ARCHITECTURE.md). That document
authorizes no implementation by itself.

The report-specific ownership choreography is governed by
[`EVIDENCE_BINDING_ARCHITECTURE.md`](EVIDENCE_BINDING_ARCHITECTURE.md).
NEXAHEDRON, its transport adapter and the Gateway MUST NOT manufacture the
ORION-owned relationship or report traceability missing from the current
Version 1 Library boundary.
