# NEXAHEDRON — Public Human-facing Research Demonstrator

NEXAHEDRON is a public Human-facing research demonstrator and bounded
experiment within the NEXAH Orientation Ecosystem. A visitor can inspect
Human-/editorial-authored Curated Reference Cases or bring one real question
into the Live Bounded Experiment. The current Rest output is a transient,
Human-held Working Session Record stored only in browser memory.

**Public path:** [NEXAH Visitor Guide](https://nexah.de/visitor-guide/) →
[NEXAHEDRON](https://nexahedron.com) → Curated Reference Case or Live Bounded
Experiment → Rest View

The repository also serves as a subordinate technical reference implementation
for its interaction and transport-consumer boundaries. That description does
not establish general product or system capability.

It is not the public intellectual home, the research repository, an independent
Library authority, or the certified deterministic Core. Those responsibilities
belong to [nexah.de](https://nexah.de),
[NEXAH](https://github.com/Scarabaeus1031/NEXAH), the named Library/source
authorities, and [ORION](https://github.com/Scarabaeus1031/NEXAH-ORION).

NEXAHEDRON owns the demonstrator experience: presentation, interaction,
transient local state, and its consumer flow toward the ORION public boundary.
It does not own NEXAH semantics,
ORION orientation, LYRA language, Library editorial authority, or Human
intention and decisions.

## Release status

This repository is the Version 1 source release for the Human-facing reference
implementation. The exact source baseline is identified by the annotated
`v1.0.0` tag and recorded in
[`NEXAHEDRON Version 1 Source Release`](docs/releases/NEXAHEDRON_V1_SOURCE_RELEASE.md).
The public production surface remains a bounded development preview; source
publication does not by itself close the deployment, privacy, operational or
hosted-verification gates preserved in
[`NEXAHEDRON_RELEASE_READINESS_REPORT.md`](NEXAHEDRON_RELEASE_READINESS_REPORT.md).

Version 1 demonstrates one bounded Human-held session through Rest and its
memory-only Working Session Record. It does not claim a durable or immutable
Orientation Record, a complete production ORION service,
Library evidence integration, persistence, accounts or automatic
interpretation.

**Current public boundary:** the deployed preview is built around a Human-held
Workspace. Its explicit confirmation boundary can submit to a public Gateway.
The certified ORION Version 1 (ORION V1) Core, compatible Runtime, Gateway reachability, and an
actually returned session outcome are four separate states. Runtime and Gateway
remain outside the certified Core. The public interface does not assert a
Runtime version or certified Core execution unless the returned public contract
proves it. There is no production evidence adapter.

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
