# Application Architecture

Phase I begins as a modular web application, not a set of microservices.

## Surfaces

- `app/` is the hosting adapter required by the web runtime.
- `apps/web/` owns browser presentation and interaction.
- `apps/laboratory-server/` is the future application composition boundary.
- `packages/laboratory-domain/` owns Laboratory session vocabulary only.
- `packages/laboratory-contracts/` owns browser/application contracts.
- `packages/orion-gateway/` is the sole ORION integration seam.
- `packages/report-projections/` maps authoritative reports to read-only views.
- `packages/design-system/` owns accessible visual tokens.

No server endpoint, persistence binding, upload store or external connector is
enabled in Phase I.1.
