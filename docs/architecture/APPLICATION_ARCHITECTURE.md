# NEXAHEDRON Application Architecture

- Status: locally normative within NEXAHEDRON presentation, interaction,
  transient-state, and transport-consumer boundaries
- Public role: Human-facing research demonstrator and bounded experiment
- ORION dependency: verified external dependency; certification authority
  remains in ORION
- Executable mode: Understand only

NEXAHEDRON is a modular research-demonstrator application. It owns presentation,
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
  → public Gateway
  → compatible Runtime, when available
  → validated public Version 1 contracts
  → direct NEXAHEDRON presentation
```

The execution path distinguishes the separately certified ORION V1 Core,
compatible Runtime identity, Gateway reachability, and the actual returned
session outcome. A reachable Gateway or contract-shaped error is not a
successful certified Core result.

The application has no persistence, authentication, upload transport, Library
adapter, provider integration or alternate Runtime.

The active research boundary for a possible future evidence source or Library
adapter is described in
[`EVIDENCE_ARCHITECTURE.md`](EVIDENCE_ARCHITECTURE.md). That document
authorizes no implementation or external authority by itself.

The report-specific ownership choreography is explored by
[`EVIDENCE_BINDING_ARCHITECTURE.md`](EVIDENCE_BINDING_ARCHITECTURE.md).
NEXAHEDRON, its transport adapter and the Gateway MUST NOT manufacture the
ORION-owned relationship or report traceability missing from the current
Version 1 Library boundary.
