# Orientation Workspace Alpha Roadmap

Status: Active engineering roadmap
Method: vertical milestones; one usable Human journey before expansion

## 1. Roadmap Principle

Every milestone must leave one coherent experience green. A milestone is not
complete when components exist; it is complete when a Human can use the
capability, its ownership is visible, its failure states are bounded, its tests
pass, and unnecessary code has been removed.

The governing question is:

> Does this preserve Human orientation?

## 2. Recommended Order

```text
M0  Verify the existing authority boundaries
 ↓
M1  Complete one Anchor → Rest session
 ↓
M2  Harden continuity and recovery within the in-memory session
 ↓
M3  Complete the confirmed ORION boundary experience
 ↓
M4  Complete accessibility and cross-device verification
 ↓
M5  Decide the release claim and governed hosted scope
```

No Library, Atlas, persistence, additional mode, or instrument milestone begins
before M1–M4 are complete and reviewed.

## 3. Milestone 0 — Executable Baseline

### Objective

Prove the existing repository, ORION consumer seam, and public site before
changing the Workspace.

### Scope

- repository rules;
- current architecture and authority documents;
- clean dependency verification;
- build, lint, frontend/domain tests, and live boundary tests;
- current desktop and mobile journey review.

### Deliverables

- recorded green baseline;
- explicit list of protected artifacts;
- observed journey gap.

### Dependencies

None.

### Acceptance criteria

- dependency and generated contracts verify;
- architecture and documentation checks pass;
- build succeeds;
- all existing tests pass;
- no protected ORION file is modified.

### Risks

- confusing a correct evidence stop with a broken Runtime;
- treating uncommitted user work as disposable;
- editing the wrong sibling repository.

### Technical debt

None introduced.

### Status

Complete. The baseline passed 59 frontend/domain tests and four live ORION
boundary integration tests before Workspace implementation began.

## 4. Milestone 1 — Canonical Orientation Session

### Objective

Make one complete Human-owned session usable from Anchor through Rest on one
persistent working surface.

### Scope

- Anchor;
- Place;
- Attend;
- Relate;
- Bound;
- Turn;
- Reflect;
- Rest;
- optional transition from Rest to the existing confirmation boundary.

### Deliverables

- persistent Question Anchor;
- growing Material Folio;
- one-operation-at-a-time working focus;
- explicit Human relationship;
- visible evidence absence;
- preserved uncertainty;
- Human-authored reflection;
- valid Rest ending;
- Continuation Horizon;
- canonical reducer transitions and guards;
- implementation contract and constitutional tests.

### Dependencies

M0; existing Workspace provider; existing Material Folio and Reflection Margin.

### Acceptance criteria

- a Human can complete all eight operations without route changes;
- the original question remains visible;
- later operations cannot be entered early;
- every operation advances through explicit Human action;
- Rest is complete without ORION;
- preparation for ORION requires explicit Rest;
- no ORION, Gateway, Library, or evidence logic enters the Workspace;
- focused and full regressions pass.

### Risks

- recreating a wizard with new labels;
- making every operation visually equal and increasing cognitive load;
- presenting Human-authored relations as certified relations;
- suggesting a reference has been inspected.

### Technical debt

- legacy Object and Request routes remain;
- memory-only state;
- no archive identity.

### Status

Implemented; final browser, accessibility, and regression verification is part
of M4 and release review.

## 5. Milestone 2 — Continuity and Recovery

### Objective

Make the current in-memory session resilient to ordinary Human revision without
introducing persistence.

### Scope

- returning to any completed operation;
- preserving later Human text when an earlier operation changes;
- making invalidated dependencies visible without deleting them;
- explicit session reset;
- focus and scroll continuity;
- recovery from consumer-boundary failure back to the table.

### Deliverables

- dependency-aware revision behavior;
- stable focus rules;
- recoverable failure return;
- tests for revision and retained Human work.

### Dependencies

Certified M1 behavior.

### Acceptance criteria

- returning never silently deletes Human text;
- changed prerequisites visibly reopen affected operations;
- technical failure never removes the session;
- reset remains the only full local deletion action;
- no persistence claim is introduced.

### Risks

- hidden invalidation;
- duplicated derived state;
- treating technical recovery as session authority.

### Technical debt

- reload still clears state;
- legacy routes remain until removal is separately approved.

## 6. Milestone 3 — Confirmed ORION Boundary Experience

### Objective

Connect the completed Human session to the existing public ORION boundary
without weakening either side.

### Scope

- request projection from existing Human fields;
- confirmation;
- current public ORION invocation;
- clarification, blocked report, Runtime error, and consumer failure;
- return to the preserved Workspace.

### Deliverables

- readable confirmation of only crossing fields;
- clear separation between Human reflection and submitted request;
- calm evidence-boundary outcome;
- recovery paths that preserve the session;
- faithful public outcome inspection.

### Dependencies

M2; existing frozen public contracts and Gateway consumer.

### Acceptance criteria

- the request contains no Reflection, Turn, or relation fields not authorized
  by the frozen contract;
- every submission requires a separate Human confirmation;
- missing evidence remains a truthful ORION blocked report;
- the blocked state also preserves the useful Human Rest state;
- no outcome is generated or repaired by NEXAHEDRON.

### Risks

- letting the technical report eclipse the Human orientation;
- obscuring missing evidence;
- accidental contract expansion.

### Technical debt

- Version 1 clarification lineage limitation;
- no authentic public evidence adapter.

## 7. Milestone 4 — Human Interface Verification

### Objective

Verify the same Workspace grammar across desktop, tablet, phone, keyboard, and
assistive reading.

### Scope

- 1280+ desktop;
- tablet portrait and landscape;
- 320–480 px phone;
- keyboard-only operation;
- landmarks, labels, live regions, and focus;
- reduced motion;
- long content and zoom;
- fatigue and cognitive-load review.

### Deliverables

- viewport evidence;
- keyboard journey;
- accessible-name review;
- long-text fixtures;
- no-horizontal-overflow verification;
- documented findings and fixes.

### Dependencies

M1–M3.

### Acceptance criteria

- operation order and ownership are identical on every form factor;
- only one primary focus is present;
- operation changes move focus to the new heading;
- no important state relies on position, color, or motion alone;
- 200% zoom and 320 px width retain complete reading order;
- full regression remains green.

### Risks

- compressing the table into a dashboard on small screens;
- horizontal operation navigation becoming invisible;
- sticky Reflection obscuring content.

### Technical debt

Any exception must be explicit and release-blocking if it prevents completion.

## 8. Milestone 5 — Release Scope Decision

### Objective

Name and publish only the capability the system can honestly support.

### Scope

- Readiness Alpha versus Orientation Alpha claim;
- hosted privacy and material handling;
- production ORION availability;
- clarification boundary;
- support and incident ownership;
- deployment attestation.

### Deliverables

- approved release claim;
- governed hosted scope;
- reproducible deployment;
- public limitations matching behavior.

### Dependencies

M4 and the existing release governance queue.

### Acceptance criteria

- if authentic evidence-bound Orientation is unavailable, release is named
  Readiness Alpha;
- deployed behavior and public language agree;
- operational and privacy gates are approved;
- no deferred Library or evidence architecture is implemented by workaround.

### Risks

- overstating completion;
- treating deployment as architectural authorization;
- retaining submitted Human material without policy.

### Technical debt

Determined by release review, not assumed here.

## 9. Deferred Until Separately Governed

- Session Archive and any persistence;
- Library evidence adapter;
- Atlas session binding or publication;
- additional Orientation modes;
- instruments and perspectives;
- collaboration, accounts, sharing, and synchronization;
- AI or LLM assistance;
- retrieval, search, ranking, and recommendations;
- automatic relation, uncertainty, or reflection generation.

## 10. Milestone Review Loop

After every milestone:

1. replay the complete Human journey;
2. review ownership boundaries;
3. remove duplicated or unused code;
4. simplify names and state;
5. run focused tests;
6. run full checks and regression;
7. inspect desktop, tablet, and phone where UI changed;
8. record current limitations;
9. begin the next milestone only when the repository is green.

The repository should become easier to understand after each loop.
