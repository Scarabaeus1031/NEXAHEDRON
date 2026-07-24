# Authority Boundaries

This document applies the frozen ecosystem ownership model to the current
NEXAHEDRON Alpha. It does not alter that architecture.

| Authority | Owner | NEXAHEDRON relationship |
|---|---|---|
| Orientation Space and canonical framework | NEXAH | consumes approved representations only |
| navigation, readiness, validation, reports and continuations | ORION | consumes through the frozen ORION Version 1 public boundary |
| faithful Human language | LYRA | no independent NEXAHEDRON implementation |
| evidence and editorial authority | Library | no adapter or writes in Alpha |
| intention, meaning, Reflection and decisions | Human | captured, preserved and explicitly confirmed |
| Laboratory experience, local session flow and presentation | NEXAHEDRON | implemented here |

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
