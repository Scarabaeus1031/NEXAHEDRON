# NEXAHEDRON

**The Orientation Laboratory** — the first application in the NEXAH ecosystem.

NEXAHEDRON owns the Laboratory experience: presentation, interaction and the
local flow that will eventually consume ORION. It does not own NEXAH semantics,
ORION orientation, LYRA language, Library editorial authority, or Human
intention and decisions.

## Alpha Sprint 2

Sprint 2 extends the frontend-only preparation workflow:

1. Landing
2. Choose Orientation
3. Wonder
4. Object Selection
5. Request Editor
6. Confirmation
7. Prepared request boundary

The available journey is Wonder → Understand → Object Selection. Understand can
also begin directly. Compare, Connect, Explore, Build and Reflect are visible as
later modes but cannot be selected.

The Request Editor captures Intention, Focus, Success Boundary, included and
excluded scope, and Depth in separate structured cards. Local validation
requires a defined Orientation Object, an Intention and at least one included
scope item. Confirmation remains a separate Human decision.

All entered material remains in memory for the current browser render only.
There is no API, persistence, authentication, upload, Gateway call, Runtime call,
serialization or simulated ORION response. The prepared-request screen names
this boundary explicitly.

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
docs/         architectural source and historical implementation records
scripts/      automated authority-boundary verification
tests/        rendered-route, state and conformance checks
```

There are intentionally no NEXAH, ORION, LYRA or LUCY implementation packages
in this repository. Historical evaluation fixtures remain versioned for
traceability but are not imported by the Sprint 1 application.

## Run locally

Requires Node.js 22.13 or newer.

```bash
npm install
npm run check
npm test
npm run dev -- --port 3001
```

The architecture check verifies that the application has no network calls,
fixture-backed reports, ORION internals or provider dependencies. Execution
intentionally begins in a later sprint.
