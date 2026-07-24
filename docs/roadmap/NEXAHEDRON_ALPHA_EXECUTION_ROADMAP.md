# NEXAHEDRON Alpha Execution Roadmap

- Status: Canonical execution blueprint
- Starting point: accepted NEXAHEDRON Alpha RC1 architecture
- Target: first real, usable Public Alpha
- ORION baseline: immutable Version 1
- Architecture change authority: none granted by this document
- Effects: none

This roadmap states what happens next without reopening architecture. It is not
a feature backlog, release promise or authorization to begin Version 2.

# 1. Current State

## 1.1 Architecture

The responsibility boundary is complete and accepted:

```text
Human
→ NEXAHEDRON presentation and interaction
→ NEXAHEDRON transport adapter
→ immutable ORION Version 1 Gateway
→ immutable ORION Version 1 Runtime
→ validated Version 1 public contracts
→ faithful NEXAHEDRON presentation
```

- NEXAH remains the Orientation Layer and canonical Framework authority.
- NEXAHEDRON remains the Orientation Laboratory and consumer application.
- ORION owns navigation, readiness, report validation, evidence relationship,
  report traceability and Continuation Options.
- The Library owns source-side evidence, knowledge identity and editorial
  authority.
- LYRA owns faithful Human-language translation and explanation.
- The Human owns intention, meaning, continuation selection and decisions.

The Application Architecture, Evidence Architecture, Evidence Binding
Architecture and ORION Version 2 Contract Planning document define the current
boundary. No further architectural design is required for the existing Alpha
surface.

## 1.2 Implementation

The current application implements one live path:

```text
Landing
→ Choose Orientation
→ Wonder or Understand
→ Orientation Object
→ Request Editor
→ Human confirmation
→ real ORION Gateway invocation
→ Clarification Result, Runtime Error or Orientation Report
→ Evidence and Continuation presentation when present
```

Current executable properties:

- Understand is the only executable Orientation Operator.
- Request preparation and confirmation use local in-memory state.
- The browser maps confirmed state to `OrientationRequest 1.0`.
- The application invokes the real pinned ORION Gateway through a dedicated
  transport boundary.
- Public outcomes are mapped directly to presentation models.
- No fixture, mock Runtime, alternate execution path or provider fallback is
  used in production code.
- No Library adapter, persistence, authentication, file upload, multi-session
  history or provider integration exists.

## 1.3 Documentation

The repository contains current documentation for:

- application architecture and authority boundaries;
- immutable ORION dependency verification;
- generated consumer contracts;
- live Version 1 integration;
- internal Alpha reproduction and review;
- RC1 verification;
- evidence ownership, lifecycle and trust;
- evidence binding ownership and Version 1 limitation;
- Version 2 contract-necessity assessment.

Historical Phase I and Sprint documents remain implementation history. They do
not override current architecture or release guidance.

## 1.4 Verification

The accepted RC1 demonstrated:

- exact ORION revision and canonical-content fingerprint verification;
- fail-closed execution on dependency mismatch;
- generated TypeScript contract drift detection;
- TypeScript and production build success;
- architecture, documentation and lint checks;
- frontend, journey-state and boundary tests;
- real Gateway integration tests;
- browser smoke coverage through a real blocked Orientation Report;
- distinct transport, Gateway, contract, response-version and Runtime failure
  presentation;
- no browser console diagnostics in the verified journey.

The canonical commands remain:

```text
npm ci
npm run check
npm test
```

## 1.5 Known limitations

1. The normal Human path has no authoritative evidence supply and therefore
   produces a real blocked Orientation Report.
2. Clarification resubmission preserves correct lineage but the current
   stateless Gateway invocation cannot validate the prior Clarification Result.
3. No production ORION transport endpoint is deployed.
4. Understand is the only executable Operator.
5. State is browser-memory only.
6. No production upload or source-content transfer exists.
7. No authentication, user history, Library write or Atlas mutation exists.
8. No production operational, security, privacy or support process has been
   verified.

Items 4–7 are not automatically Public Alpha blockers. Their necessity depends
on the declared Alpha scope. Items 1–3 are blockers for a complete public
Understand journey.

## 1.6 Frozen boundaries

The following assumptions govern every milestone:

- ORION Version 1 contracts, Runtime, Gateway semantics and behavior remain
  unchanged unless a formal governance process explicitly permits a compatible
  operational release.
- Evidence Architecture and Evidence Binding Architecture remain unchanged.
- No Library adapter manufactures `relationship` or report `traceability`.
- NEXAHEDRON imports no ORION internals and performs no orientation,
  readiness inference, evidence selection or report interpretation.
- No Version 2 design or implementation begins.
- Effects remain `none`.

# 2. What Is Production Ready

“Production ready” in this section applies to a bounded component, not to the
complete public application.

## 2.1 Stable public language

- The six ORION Version 1 public contracts are frozen, executable and
  model-independent.
- Contract identity, version, lifecycle and lineage rules are explicit.
- Clarification, report, continuation, evidence and Runtime Error outcomes are
  mutually distinguishable.
- Version 1 historical objects have a durable compatibility promise.

## 2.2 Consumer authority boundary

- NEXAHEDRON uses the public Gateway boundary only.
- Runtime internals, Operators and private validation do not cross into the
  consumer.
- Request and response mappings are contained in a dedicated integration
  layer.
- Presentation objects do not replace or reinterpret public contracts.

## 2.3 Dependency reproducibility

- The executed ORION revision is explicitly pinned.
- Canonical ORION content has a recorded fingerprint.
- Execution, integration tests and contract generation fail closed on drift.
- The dependency source and adopted surfaces are documented.

## 2.4 Contract projection

- Browser-facing TypeScript declarations are generated from the authoritative
  ORION executable models.
- Automated checks detect generated-contract divergence.
- No handwritten duplicate ORION semantics are accepted as authority.

## 2.5 Failure diagnostics

- Transport failure, Gateway failure, contract lifecycle violation, invalid
  public response and unsupported contract version remain distinct.
- ORION `RuntimeError` outcomes remain distinct from consumer failures.
- Private exceptions, stack traces, provider identities and Gateway internals
  are not exposed to users.

## 2.6 Reproducible engineering baseline

- Clean install, checks, tests and local startup are documented.
- Architecture and documentation consistency checks are automated.
- Real Gateway integration tests exist.
- The current internal Alpha is reproducible by another engineer with the
  pinned dependency and documented prerequisites.

## 2.7 Current documentation

- Ownership and immutable boundaries are explicit.
- The evidence contradiction and selected future boundary are documented.
- Known limitations are visible rather than hidden behind fallback behavior.
- Current guidance is separated from historical phase records.

The complete application is not yet production ready because infrastructure,
clarification choreography, evidence supply and operational controls remain
unresolved.

# 3. What Blocks a Public Alpha

Only conditions that prevent a safe, honest and usable public release appear
here.

| Blocker | Class | Why it blocks | Release condition |
|---|---|---|---|
| no production NEXAHEDRON deployment | Infrastructure | no stable public application origin exists | reproducible deployment, domain, TLS, rollback and environment configuration verified |
| no production ORION transport endpoint | Infrastructure / External dependency | the only execution path cannot run outside local development | pinned ORION Gateway service reachable through the declared transport with health and failure behavior verified |
| clarification lineage cannot complete | Implementation / External dependency | a normal unresolved request reaches a terminal validation failure after the Human supplies the requested value | approved Version 1-compatible contract-graph choreography passes a full clarification round trip without removing lineage |
| no legitimate production evidence path | Governance / External dependency | ordinary material cannot produce an evidence-bound report, and NEXAHEDRON may not manufacture evidence | governance approves an honest Alpha evidence scope and a boundary-compliant source of genuinely ORION-bound Version 1 evidence, or the release is explicitly limited and named as a readiness-only evaluation |
| public data-handling policy absent | Governance | Humans may submit titles, notes, URLs and intentions without a reviewed public handling statement | approved privacy, retention, logging and prohibited-content policy matches actual no-persistence behavior |
| production security and abuse controls unverified | Infrastructure / Implementation | a public transport can be exhausted or used outside its declared scope | request limits, payload limits, origin policy, timeout behavior, dependency isolation and abuse response are tested |
| operational observability and incident ownership absent | Infrastructure / Governance | failures cannot be distinguished and owned in production without exposing Human material | health, availability and public error telemetry exist with named incident and rollback ownership |
| public accessibility and browser verification incomplete | Implementation | local responsive/accessibility intent is not equivalent to release verification | keyboard, screen-reader, focus, mobile and supported-browser release matrix passes |

## 3.1 Evidence release gate

A transparent blocked report is correct Version 1 behavior, but it is not by
itself a complete Orientation experience. Public release language MUST make one
of two scopes explicit:

1. **Readiness Alpha** — evaluates request formation, clarification and visible
   evidence boundaries; it does not claim evidence-bound orientation.
2. **Orientation Alpha** — includes at least one authentic, non-fixture,
   evidence-bound Understand path.

Under the current freezes, the Readiness Alpha can proceed after the other
blockers close. The Orientation Alpha remains No-Go until a legitimate evidence
path is governed. No adapter may conceal this distinction.

# 4. Alpha Milestones

## Phase A — Internal Alpha

- Status: current phase; RC1 accepted

### Goal

Validate the complete current consumer boundary with internal reviewers before
public infrastructure or scope is expanded.

### Deliverables

- reproducible RC1 checkout and pinned ORION verification;
- complete internal journey and boundary-state review;
- consolidated UX, accessibility and diagnostics findings;
- defect list classified as NEXAHEDRON, transport, external ORION or
  governance;
- confirmation that no hidden fixture or alternate Runtime path exists.

### Exit criteria

- every documented RC1 verification command passes from a clean checkout;
- internal reviewers complete the primary and failure-state walkthrough;
- findings are classified without reopening architecture;
- all release-critical defects have owners and verification conditions;
- no undocumented public outcome appears.

### Non-goals

- public access;
- production evidence;
- persistence, accounts or uploads;
- additional Orientation Operators;
- Version 2 planning or implementation.

## Phase B — Trusted Testers

### Goal

Run the frozen Understand journey with a small named cohort in a restricted,
observable environment and close the operational gaps that local review cannot
reveal.

### Deliverables

- restricted hosted NEXAHEDRON environment;
- deployed pinned ORION transport endpoint;
- approved Version 1-compatible clarification-lineage choreography;
- data-handling notice matching actual behavior;
- payload, timeout, origin and abuse limits;
- privacy-preserving operational telemetry;
- tester guide, feedback route and incident contact;
- release verification executed against the hosted environment.

### Exit criteria

- each tester can create, confirm and submit an Understand request;
- at least one tester completes a real clarification round trip;
- every attempt ends in exactly one valid public ORION outcome or one explicit
  consumer failure category;
- dependency mismatch and endpoint unavailability fail closed;
- no submitted Human material appears in unauthorized logs;
- all critical accessibility and security findings are closed or release
  blocking;
- scope is visibly identified as Readiness Alpha unless legitimate evidence is
  available.

### Non-goals

- anonymous public traffic;
- production Library integration;
- authentication or durable history;
- new modes;
- evidence-contract changes.

## Phase C — Public Alpha

### Goal

Offer one honest, bounded and supportable Understand experience to real public
users without overstating evidence or capability.

### Deliverables

- public application origin and production ORION endpoint;
- published Alpha scope and limitations;
- approved privacy, retention, acceptable-use and support information;
- production monitoring, alerting, rollback and incident procedure;
- verified accessibility and supported-browser matrix;
- deterministic release artifact and dependency attestation;
- user-facing clarification, blocked-report and failure recovery;
- evidence scope explicitly classified as Readiness Alpha or Orientation
  Alpha.

### Exit criteria

- all Section 3 blockers applicable to the declared scope are closed;
- a clean release candidate passes checks, tests and hosted smoke verification;
- a first-time user can understand NEXAHEDRON, prepare and confirm a request,
  submit it, respond to clarification and inspect the exact public outcome;
- evidence absence, restriction and uncertainty remain visible;
- no report, evidence or continuation is simulated;
- users can stop, retry when allowed and report a problem;
- operators can identify, contain and roll back a failing release;
- the release makes no claim broader than its verified evidence capability.

### Non-goals

- general-purpose knowledge coverage;
- complete Orientation Operator coverage;
- Library writes, Atlas mutation or publishing;
- personalized history or collaboration;
- Version 2.

## Phase D — First Production Library

- Status: post-Readiness-Alpha, governance-gated; not authorized for
  implementation and potentially required before Orientation Alpha completion

### Goal

Enable reusable source-side evidence and authentic evidence-bound orientation
without transferring ORION report authority to the Library.

### Deliverables

No engineering deliverables are authorized under the current freeze. Entry to
this phase first requires:

- formal approval of the production Library requirement;
- an authorized public-contract governance phase for the Evidence Binding
  Contract Major Revision;
- a migration and compatibility decision preserving Version 1 history;
- an independently reviewed Library security, authority and provenance scope.

### Exit criteria

This phase has no active exit criteria until its governance entry conditions
are satisfied. Future criteria must require authentic evidence, exact
provenance, immutable source identity and ORION-owned binding.

### Non-goals

- bypassing Version 1 with adapter logic;
- Library-owned relationship or report traceability;
- federated identity;
- search or ingestion expansion before authority validation.

## Phase E — Federated Evidence

- Status: deferred; not an Alpha milestone and not scheduled

### Goal

Potentially support multiple independent Libraries without identity collision
or authority transfer.

### Deliverables

None in the Alpha execution plan. Any future phase requires evidence from a
working first Library and separate governance for issuer-qualified identity,
portability and federation.

### Exit criteria

Not defined. Defining executable criteria now would prematurely design future
contracts.

### Non-goals

- influencing Alpha implementation;
- creating prefix conventions as hidden identity semantics;
- Atlas federation;
- Version 2 implementation under this roadmap.

# 5. Frozen Components

The following remain unchanged unless their named governance process formally
reopens them:

## 5.1 ORION Version 1

- Orientation Policies;
- Orientation Operators behavioral specification;
- all six Version 1 public contract specifications;
- executable public models and validators;
- Understand Runtime behavior;
- Gateway semantics and public boundary;
- evidence, report and continuation lineage invariants;
- lifecycle and Runtime Error distinctions;
- provider- and transport-independence;
- effects `none`.

## 5.2 NEXAH ecosystem authority

- NEXAH as Orientation Layer and Framework authority;
- ORION as navigation, validation and reporting authority;
- LYRA as faithful language and explanation authority;
- Library as source-side evidence and editorial authority;
- NEXAHEDRON as Laboratory presentation and interaction authority;
- Human ownership of intention, meaning and decisions;
- future LUCY separation.

## 5.3 Evidence architecture

- source identity remains distinct from evidence identity;
- provenance, authority, validation, relationship and confidence remain
  separate;
- Evidence References do not grant source access;
- historical records remain immutable;
- ORION alone owns report relationship and traceability;
- Library/source authorities own source-side evidence declarations;
- future source evidence and report binding remain separate authority objects;
- no Version 1 Library workaround manufactures ORION fields.

## 5.4 NEXAHEDRON consumer boundary

- public Gateway import only;
- generated consumer contract declarations;
- no ORION internals, providers or private Runtime objects;
- no client-side orientation, readiness inference or evidence validation;
- faithful ordering and visibility of empty/unknown public fields;
- separate consumer and ORION failures;
- fail-closed immutable dependency verification.

Changing any item above requires the applicable ADR, contract governance or
release review. A sprint ticket is insufficient authority.

# 6. Implementation Priority

This list contains executable engineering work only. It grants no authority to
start the work before its milestone and governance gates are satisfied.

1. **Close the hosted release reproduction path.** Produce deterministic
   NEXAHEDRON and ORION deployment artifacts using the pinned dependency and
   fail-closed startup verification.
2. **Deploy the ORION transport boundary.** Provide health, timeouts, payload
   limits and correct public/consumer failure separation without changing
   Gateway semantics.
3. **Complete Version 1 clarification choreography.** Supply the exact prior
   contract graph through an approved compatible invocation path; test request
   preservation and full resubmission.
4. **Add production operational controls.** Implement structured
   privacy-preserving telemetry, alerting, rollback, rate limiting and incident
   diagnostics.
5. **Harden input and transport safety.** Enforce public size, type, origin,
   timeout and malformed-envelope limits without performing ORION validation in
   NEXAHEDRON.
6. **Execute accessibility and browser release verification.** Cover keyboard,
   screen reader, focus, responsive layout and the declared browser matrix.
7. **Create hosted end-to-end verification.** Exercise success-independent
   lifecycle states, clarification, dependency mismatch, transport failure,
   Gateway failure and blocked report against deployed services.
8. **Add public release operations.** Implement release attestation, health
   checks, rollback verification and status/support routing.
9. **Apply only reviewed UX defects.** Make no product expansion; verify each
   change against the accepted UX and authority boundaries.
10. **Implement an evidence path only after governance authorization.** No
    engineering task may substitute for the unresolved evidence release gate.

# 7. Governance Queue

Governance questions are decisions, not engineering tickets.

| Topic | Required decision | Needed before |
|---|---|---|
| Alpha evidence claim | Readiness Alpha or authentic evidence-bound Orientation Alpha | public release naming and acceptance |
| clarification choreography | which compatible invocation owns prior immutable contract-graph availability without changing contract meaning | Trusted Testers |
| production ORION operation | deployment owner, supported availability, incident and rollback authority | Trusted Testers |
| Human material handling | permitted input, logging, retention, deletion and restricted-content policy | any hosted tester traffic |
| public access policy | acceptable use, abuse response and support boundary | Public Alpha |
| telemetry authority | which metadata may be observed and who may inspect it | hosted deployment |
| supported platform matrix | browsers, devices, accessibility baseline and deprecation policy | Public Alpha |
| Alpha completion claim | whether evidence-bound completion is mandatory; this roadmap recommends yes for Orientation Alpha | release review |
| production Library entry | whether reusable, portable Library evidence is an approved ecosystem requirement | Phase D governance only |
| Evidence Binding Contract Major Revision | whether and when focused major-contract planning may begin | after Readiness Alpha; before any Library implementation |

Architects own classification and boundary review. They do not implement around
an unresolved decision.

# 8. Deferred Research

These topics MUST NOT influence Alpha estimates, acceptance criteria or code:

- ORION Version 2 design or implementation;
- Evidence Binding Contract Major Revision schemas;
- federated Libraries and cross-Library identity;
- Atlas mutation, publication or canonical relationship authority;
- advanced Evidence Contracts, evidence scales and automated editorial status;
- Wonder, Compare, Connect, Explore, Build and Reflect Runtime implementations;
- provider optimization, model selection and prompt systems;
- LUCY reflection behavior;
- persistent orientation history and multi-session identity;
- accounts, collaboration, sharing and community features;
- Library ingestion, search, ranking and broad connector ecosystems;
- source-content synchronization;
- Builder modules;
- streaming and speculative progress presentation;
- personalization or recommendation;
- general knowledge coverage claims.

Deferred does not mean rejected. It means irrelevant to completing the bounded
Alpha safely.

# 9. Success Criteria

## 9.1 NEXAHEDRON Internal Alpha Complete

Internal Alpha is complete when:

- RC verification passes from a clean checkout;
- the pinned ORION dependency is reproducible and fail-closed;
- reviewers complete the primary journey and all declared boundary states;
- no hidden fixture, fallback, Runtime or contract definition exists;
- findings are classified and release-critical defects are resolved;
- current documentation describes the executed system.

The accepted RC1 satisfies this baseline subject to completion of the actual
internal UX review cycle.

## 9.2 NEXAHEDRON Trusted Alpha Complete

Trusted Alpha is complete when:

- the application and ORION transport run in a restricted hosted environment;
- named testers can complete request preparation and confirmation;
- clarification resubmission completes with exact lineage;
- every attempt yields one valid public outcome or one declared consumer
  failure;
- operational telemetry reveals service state without exposing submitted
  material;
- accessibility, security and incident checks pass for the declared cohort;
- feedback has been reviewed and all release-blocking findings are closed.

## 9.3 NEXAHEDRON Public Alpha Complete

The statement **“NEXAHEDRON Alpha Complete”** may be made only when all of the
following are observable:

1. A public user can open a stable HTTPS application URL.
2. The deployed application and ORION dependency are versioned, attested and
   reproducible.
3. A first-time user can understand the Laboratory, choose Understand, define
   an Orientation Object, Intention and Scope, and confirm the exact request.
4. A clarification request can be answered and resubmitted without losing or
   falsifying lineage.
5. At least one approved real-user path produces a contract-valid complete or
   partial Orientation Report from authentic, non-fixture evidence.
6. The report displays exact evidence identity, version, source, authority,
   relationship, provenance, validation, traceability and access state.
7. The user can inspect a meaningful, report-derived Continuation Option or
   intentionally end the session.
8. Missing evidence produces a truthful blocked report rather than fabricated
   content.
9. Every supported Runtime outcome and consumer failure has verified public
   presentation and recovery behavior.
10. No NEXAHEDRON component performs ORION, Library, LYRA or Human authority.
11. Public privacy, acceptable-use, support and limitation statements match the
    deployed behavior.
12. Rate limits, payload limits, monitoring, alerting, rollback and incident
    ownership are operationally verified.
13. Keyboard, screen-reader, mobile and supported-browser release checks pass.
14. The complete release verification suite is green against the deployed
    candidate.
15. Reviewers approve the release scope without architecture, contract or
    evidence-boundary exceptions.

If criterion 5 cannot be met under the current evidence boundary, the system
may be released only under the narrower name **NEXAHEDRON Readiness Alpha**. It
MUST NOT be declared a complete Orientation Alpha.

## 9.4 Who does what next

| Group | Immediate responsibility |
|---|---|
| Engineers | execute Phase A verification, then prepare the gated hosted path in priority order; do not implement evidence work |
| Architects | review boundary conformance and decide only queued governance questions; do not redesign Version 1 |
| Reviewers | complete internal journey, accessibility, diagnostics and release-scope review against observable outcomes |
| Users | next experience the restricted Trusted Alpha: one Understand journey with explicit clarification and evidence boundaries |

The immediate next action is Phase A review completion followed by a gated
Phase B deployment plan. Phase C remains No-Go until every applicable public
blocker is closed. Phase D remains outside current execution but may become the
gate from Readiness Alpha to complete Orientation Alpha. Phase E remains
deferred.
