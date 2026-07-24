# NEXAHEDRON — Human-facing Reference Implementation

NEXAHEDRON is the Human-facing reference implementation of the NEXAH Orientation Ecosystem. A visitor brings one real question, encounters material, keeps exact fragments, relates them, reflects and may stop at a Human-owned Orientation Record.

**Public path:** [NEXAH Visitor Guide](https://nexah.de/visitor-guide/) → [NEXAHEDRON](https://nexahedron.com) → Orientation Record

It is not the public intellectual home, the research repository or the certified deterministic Core. Those responsibilities belong to [nexah.de](https://nexah.de), [NEXAH](https://github.com/Scarabaeus1031/NEXAH) and [ORION](https://github.com/Scarabaeus1031/NEXAH-ORION).

NEXAHEDRON owns the Laboratory experience: presentation, interaction and the
consumer flow around immutable ORION Version 1. It does not own NEXAH semantics,
ORION orientation, LYRA language, Library editorial authority, or Human
intention and decisions.

## Release status

This repository is the Version 1 release candidate for the Human-facing
reference implementation. The local Workspace and its deterministic boundary
proofs are executable and reviewed. A public production release is not complete
until the deployment, privacy facts, public repository revision and hosted
anonymous verification recorded in
[`NEXAHEDRON_RELEASE_READINESS_REPORT.md`](NEXAHEDRON_RELEASE_READINESS_REPORT.md)
are green.

Version 1 demonstrates one bounded Orientation Session and a Human-owned
Orientation Record. It does not claim a complete production ORION service,
Library evidence integration, persistence, accounts or automatic
interpretation.

## Historical Alpha integration record

The following section records an earlier Alpha integration path. It is preserved for traceability and does not redefine the frozen public Version 1 claim:

1. Landing
2. Choose Orientation
3. Wonder
4. Object Selection
5. Request Editor
6. Confirmation
7. Orientation in progress
8. Clarification, public Runtime Error, or Orientation Report
9. Evidence and Continuation inspection when present

The available journey is Wonder → Understand → Object Selection. Understand can
also begin directly. Compare, Connect, Explore, Build and Reflect are visible as
later modes but cannot be selected.

The Request Editor captures Intention, Focus, Success Boundary, included and
excluded scope, and Depth in separate structured cards. Local validation
requires a defined Orientation Object, an Intention and at least one included
scope item. Confirmation remains a separate Human decision.

All application state remains in memory. There is no persistence,
authentication, upload, provider, fixture response, mock Runtime or alternate
execution path. The only execution path maps the Human-confirmed request to
`OrientationRequest 1.0`, invokes the external Version 1 Gateway and renders its
validated public contracts directly.

The current Alpha has no Library adapter and does not manufacture evidence.
The normal Human-only path therefore reaches ORION's real blocked report at the
evidence boundary. A complete report is possible only when a contract-valid,
externally authoritative `EvidenceReference` is supplied through the same
transport.

One immutable-boundary incompatibility currently prevents clarification
resubmission from completing. See
[`docs/integration/ORION_V1_LIVE_INTEGRATION.md`](docs/integration/ORION_V1_LIVE_INTEGRATION.md)
for the exact finding and the behavior NEXAHEDRON deliberately does not bypass.

## Reproducible ORION boundary

Every Gateway execution first verifies the external ORION checkout against the
documented Git revision and the RC1 canonical-content SHA-256 fingerprint. A
mismatch in Runtime, Gateway, public contracts, policies, operators or the
evaluation manifest stops execution with a diagnostic; the application never
continues against an unreviewed working tree.

Browser contract declarations are generated mechanically from the verified
`orion.public_contracts.models` module. `npm run contracts:check` regenerates
them in memory and fails on divergence. NEXAHEDRON contains no handwritten
definition of ORION contract semantics.

Connection failure, Gateway failure, contract lifecycle violation, invalid
public response and unsupported contract version remain distinct consumer
boundary states. A valid public `RuntimeError(kind="unavailable")` remains a
Runtime outcome and is never rewritten as a transport failure.

The future Library boundary is defined, but not implemented, in the canonical
[`Evidence Architecture`](docs/architecture/EVIDENCE_ARCHITECTURE.md).
Its report-binding ownership and the explicit Version 1 limitation are resolved
in the canonical
[`Evidence Binding Architecture`](docs/architecture/EVIDENCE_BINDING_ARCHITECTURE.md).

## Confirmed Material Alpha

NEXAHEDRON now has an independently executable local proof for its side of the
Representation boundary:

```text
mutable Human Working Material
→ explicit Human confirmation
→ immutable Confirmed Material
→ STOP
```

The output conforms to the accepted ORION Representation Alpha input profile,
but this milestone performs no handoff and never invokes ORION. See
[`Confirmed Material Alpha`](docs/alpha/CONFIRMED_MATERIAL_ALPHA.md).

The separate
[`Representation Handoff Alpha`](docs/alpha/REPRESENTATION_HANDOFF_ALPHA.md)
now proves that this exact artifact is accepted adapter-free by the existing
ORION Representation Alpha implementation and becomes one conformant immutable
Representation. The proof stops there.

The
[`Representation-Referenced Request Alpha`](docs/alpha/REPRESENTATION_REFERENCED_REQUEST_ALPHA.md)
then proves that the immutable Representation can be named exactly inside a
contract-valid `OrientationRequest 1.0`. It stops before readiness validation,
Runtime or Gateway execution.

## Application structure

```text
app/          routes and root composition
components/   shared layout and reusable interface primitives
features/     Orientation feature state and screens
hooks/        application hooks
lib/          route definitions and framework-neutral helpers
types/        Alpha application types
styles/       reserved for future shared style modules
packages/     pre-existing bounded packages and design tokens
services/     NEXAHEDRON-owned HTTP wrapper around the external Gateway
docs/         architectural source and historical implementation records
scripts/      automated authority-boundary verification
tests/        rendered-route, state and conformance checks
```

There are intentionally no NEXAH, ORION, LYRA or LUCY implementation packages
in this repository. Historical evaluation fixtures remain versioned for
traceability but are not imported by the Sprint 1 application.

## Run locally

Requires Node.js 22.13 or newer, Python 3.10 or newer, and the immutable ORION
checkout. The default sibling checkout path is
`../NEXH x LLAMA _orion_/src`; override it with `ORION_SOURCE_PATH` when needed.

```bash
npm install
npm run check
npm test
npm run dev:orion
npm run dev -- --port 3001
```

Run `dev:orion` and `dev` in separate terminals. Production configuration uses
`ORION_GATEWAY_URL` for the external transport endpoint.

The complete check verifies the immutable dependency, generated contracts,
architecture, current documentation and lint rules. Network access remains
limited to the dedicated transport route and consumer package.

## Repository essentials

- [Contributing](CONTRIBUTING.md)
- [Code of Conduct](CODE_OF_CONDUCT.md)
- [Security Policy](SECURITY.md)
- [Software License](LICENSE)
- [Documentation License](LICENSE-DOCS.md)
- [License inventory](LICENSES.md)
- [Citation metadata](CITATION.cff)
