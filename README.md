# NEXAHEDRON

**The NEXAH Laboratory** — the first executable experience of the frozen NEXAH
and ORION architecture.

NEXAHEDRON owns the Laboratory experience, user interface, session flow,
interaction, visualization, Atlas exploration and report presentation. It does
not own NEXAH semantics, ORION planning, LYRA translation, Library editorial
authority or Human Reflection and decision.

## Internal alpha status

Phase I.2 provides the first complete deterministic Orientation Laboratory
journey. It introduces NEXAH as the Orientation Layer, NEXAHEDRON as its first
Laboratory application, Orientation Modes, human-first material intake, scope
confirmation, an inspectable recorded report, optional Reflection and
Departure.

The internal-alpha procedure, review journey and known limitations are defined
in [docs/alpha/INTERNAL_ALPHA_GUIDE.md](docs/alpha/INTERNAL_ALPHA_GUIDE.md).

## Repository map

```text
app/                         Sites/Next hosting adapter
apps/web/                    Laboratory web experience
apps/laboratory-server/      application composition boundary
packages/laboratory-domain/  session vocabulary and state
packages/laboratory-contracts/ NEXAHEDRON-owned contracts
packages/orion-gateway/      sole future ORION integration seam
packages/report-projections/ report-to-interface projections
packages/design-system/      visual tokens
packages/test-support/       conformance fixture helpers
fixtures/                    pinned deterministic test material
docs/                        implementation and upstream baseline records
scripts/                     repository boundary checks
tests/                       foundation and conformance verification
```

There are intentionally no NEXAH, ORION, LYRA or LUCY implementation packages
in this repository.

## Local verification

Requires Node.js 22.13 or newer.

```bash
npm install
npm run check
npm run build
npm test
npm run dev -- --port 3001
```

The ORION consumer contract remains unavailable. The alpha uses a pinned report
fixture only, and no package in this repository imports ORION internals.
