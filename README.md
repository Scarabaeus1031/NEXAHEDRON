# NEXAHEDRON

**The NEXAH Laboratory** — the first executable experience of the frozen NEXAH
and ORION architecture.

NEXAHEDRON owns the Laboratory experience, user interface, session flow,
interaction, visualization, Atlas exploration and report presentation. It does
not own NEXAH semantics, ORION planning, LYRA translation, Library editorial
authority or Human Reflection and decision.

## Phase I status

Phase I.1 establishes the repository foundation only. It contains an accessible
web shell, explicit package boundaries, a pinned ORION baseline, deterministic
Orientation Session fixture metadata and automated architecture checks. It does
not submit an Orientation Request or simulate an ORION result.

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
```

The ORION consumer contract remains a Phase I blocker. No package in this
repository imports ORION internals.
