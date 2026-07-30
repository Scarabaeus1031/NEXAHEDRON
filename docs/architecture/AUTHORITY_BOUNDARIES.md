# Authority Boundaries

This document applies the frozen ecosystem ownership model to the current
NEXAHEDRON Alpha. It does not alter that architecture.

- Local status: normative only for NEXAHEDRON-owned interaction,
  presentation, transient-state, and transport-consumer responsibilities
- Adopted public role: Human-facing research demonstrator and bounded
  experiment

| Authority | Owner | NEXAHEDRON relationship |
|---|---|---|
| Orientation Space and canonical framework | NEXAH | consumes approved representations only |
| navigation, readiness, validation, reports and continuations | ORION | consumes through the frozen ORION Version 1 public boundary |
| faithful Human language | LYRA | no independent NEXAHEDRON implementation |
| evidence and editorial authority | Library or named source authority | no independent NEXAHEDRON Library authority, adapter or writes |
| intention, meaning, Reflection and decisions | Human | captured, preserved and explicitly confirmed |
| demonstrator experience, local session flow and presentation | NEXAHEDRON | implemented here; no general product authority |

The current Rest View is a transient Human-held Working Session Record. It is
not the immutable, reviewed Orientation Record described by RFC-0011. ORION
Core certification, compatible Runtime identity, Gateway availability, and the
actual session outcome remain distinct.

## Dependency rule

```text
NEXAHEDRON interaction
  → packages/orion-gateway consumer seam
  → NEXAHEDRON transport adapter
  → immutable external OrientationGateway
  → Version 1 public contracts
```

The consumer seam may translate transport and presentation only. It may not
plan, orient, select evidence, validate ORION semantics, invoke Runtime
internals, alter reports or manufacture continuations.

Forbidden dependencies include NEXAH internals, ORION Runtime or Operator
modules, provider SDKs, Library writes and any LUCY Runtime.
