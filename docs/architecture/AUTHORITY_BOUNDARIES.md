# Authority Boundaries

This document applies the frozen upstream ownership model to the NEXAHEDRON
repository. It does not alter that architecture.

| Authority | Owner | NEXAHEDRON relationship |
|---|---|---|
| Orientation Space and canonical framework | NEXAH | references approved public contracts only |
| navigation, planning, validation and reports | ORION | consumes through `packages/orion-gateway` only |
| translation and faithful explanation | LYRA within ORION | never reimplemented by the Laboratory |
| evidence and editorial authority | Library | read-only until an effect contract is approved |
| intention, Reflection and decision | Human | presented and protected, never automated |
| experience, sessions, visualization and presentation | NEXAHEDRON | implemented here |

## Dependency rules

```text
app hosting adapter
  → apps/web
  → NEXAHEDRON-owned contracts and projections

apps/laboratory-server
  → packages/orion-gateway
  → future approved ORION public consumer contract
```

Forbidden dependencies include NEXAH internal files, ORION internal modules,
provider SDKs outside ORION, Library write implementations and any LUCY runtime.
