# Changelog

## [Unreleased]

### Added

- A deterministic Representation-Referenced Request Alpha proof that assembles
  and publicly validates one existing `OrientationRequest 1.0` containing the
  exact immutable Representation reference, without Runtime or Gateway
  execution.
- An adapter-free, deterministic handoff proof from NEXAHEDRON Confirmed
  Material to the accepted ORION Representation Alpha profile, stopping after
  one conformant immutable Representation.
- A deterministic Confirmed Material Alpha proof that turns mutable,
  Human-owned local text into an immutable, integrity-checked artifact matching
  the accepted ORION Representation Alpha input profile without invoking ORION.
- Alpha RC1 immutable ORION verification using the audited Git revision and
  canonical-content fingerprint; execution now stops on any mismatch.
- Mechanically generated TypeScript declarations from the canonical ORION
  public models plus automated contract-drift verification.
- Distinct presentation boundaries for transport failure, Gateway failure,
  contract violation, invalid public response and unsupported contract version.
- Current-documentation consistency verification and an RC1 verification report.

- First live NEXAHEDRON → ORION Version 1 integration through a dedicated HTTP
  transport adapter and the immutable in-process `OrientationGateway`.
- Exact Orientation Request 1.0 mapping, calm execution states, direct public
  report rendering, evidence inspection, clarification collection and bounded
  Runtime Error presentation.
- Real Gateway integration tests covering complete and blocked reports,
  clarification, unsupported mode, evidence preservation and transport
  unavailability without a fixture-backed execution path.
- Integration architecture note documenting transport responsibilities, the
  current Library evidence boundary and the immutable clarification-lineage
  incompatibility.
- Alpha Sprint 2 Request Editor with structured Intention, Focus, Success
  Boundary, Scope Include, Scope Exclude and Depth controls.
- Continuous Human-readable Request Summary and reusable local validation for
  the Orientation Object, Intention and included scope.
- Separate Confirmation and prepared-request states with Effects explicitly set
  to none and execution intentionally unavailable.

### Changed

- Confirmation now begins the real Understand execution instead of ending at a
  prepared-request placeholder.
- Current Alpha and architecture guides now describe the live Gateway path;
  historical Phase I fixture specifications remain historical records only.

### Known limitations

- ORION Version 1's frozen Gateway cannot validate a clarified request's
  `clarification_of` lineage because its public invocation accepts no prior
  Clarification Result contract. The valid public outcome is currently
  `validation_failed`; NEXAHEDRON does not remove lineage or bypass the Gateway.
- No production ORION transport endpoint or Library evidence adapter is
  configured in this repository.

### Earlier milestones

- Alpha Sprint 1 production frontend foundation with four routes: Landing,
  Choose Orientation, Wonder and Object Selection.
- In-memory Wonder and Orientation Object state, accessible form validation,
  responsive navigation and an explicit end-of-sprint boundary with no request
  execution.
- Architecture verification preventing network calls, runtime imports,
  provider dependencies and fixture-backed reports from entering the frontend.
- Landing narrative reordered from identity and purpose to mode choice before
  material, source context and visible authority, without visual redesign.
- A reference-quality Understand path organized around Commitment, Insight and
  Continuation, keeping the current orientation open after its first report.
- Seven mode-specific Laboratory entrances with distinct opening questions,
  onboarding language, examples, field structure, intention prompts and visual
  emphasis; Compare and Connect preserve two explicit starting anchors.
- Internal-alpha review guide covering reproduction, primary and boundary
  journeys, known limitations and structured feedback prompts.
- A concise Why Orientation bridge and human-first Bring what you have language
  before introducing Orientation Object terminology.
- A short landing-page orientation that distinguishes NEXAH as the Orientation
  Layer from NEXAHEDRON as its first Laboratory application, while showing
  that existing information sources remain external and unchanged.
- Orientation-first entry and onboarding built around seven intention modes,
  explicit Orientation Objects, intended direction and scope confirmation.
- Transparent deterministic boundary that permits only the recorded Understand
  + Observation journey to reach the unchanged report fixture.
- Phase I.2 complete fixture-backed Orientation Laboratory journey from Arrival
  through Question, Direction, Report, Reflection and Continuation.
- Faithful display projection of the canonical ORION full-round-trip report,
  including path, alternatives, evidence, validation and explicit blockers.
- Deterministic journey-state and fixture-integrity tests with no live gateway.
- Phase I.1a visual conformance review confirming that the Foundation Shell
  reflects the canonical NEXAH visual language without changing architecture.
- Phase I.1 standalone NEXAHEDRON repository foundation.
- Accessible Laboratory shell derived from the canonical UX specifications.
- Explicit application, contract, gateway, projection and design-system seams.
- Pinned ORION v1 source manifest and canonical Orientation Session fixture index.
- Automated authority-boundary, fixture and rendered-interface checks.
