# Contributing to NEXAHEDRON

# Welcome

Thank you for taking the time to contribute.

NEXAHEDRON welcomes careful improvements from developers, researchers,
designers, curators, educators, reviewers and people encountering the project
for the first time.

Participation is governed by the repository
[`Code of Conduct`](CODE_OF_CONDUCT.md). Security concerns should be reported
privately through the [`Security Policy`](SECURITY.md).

You do not need to become an architect before you can help. Documentation,
testing, accessibility, design review and reproducible issue reports are all
valuable contributions.

Understanding the current system comes before changing it. This protects both
your work and the project's boundaries: a useful contribution should improve
the part it touches without quietly moving responsibility somewhere else.

The easiest way to begin is:

1. read the short introduction below;
2. reproduce the current project;
3. choose one small observable problem;
4. identify which part of the project owns it;
5. propose or implement the smallest complete change.

# Before you contribute

## Recommended reading order

1. [`MANIFESTO.md`](MANIFESTO.md)
2. [`README.md`](README.md)
3. [`Application Architecture`](docs/architecture/APPLICATION_ARCHITECTURE.md)
4. [`Launch Strategy`](docs/roadmap/NEXAH_LAUNCH_STRATEGY.md)
5. [`Alpha Execution Roadmap`](docs/roadmap/NEXAHEDRON_ALPHA_EXECUTION_ROADMAP.md)

This order moves from purpose to practice:

- the Manifesto explains why the project exists;
- the README shows what currently runs;
- the Application Architecture shows where responsibilities stop;
- the Launch Strategy explains how people are introduced responsibly;
- the Roadmap shows what is active, frozen, governed and deferred.

Read the deeper architecture only when your contribution touches it. The
Evidence Architecture, Evidence Binding Architecture and ORION contract
planning documents are important, but they are not prerequisites for fixing a
broken label or improving a keyboard interaction.

## Reproduce the current project

The current prerequisites and exact local startup commands are maintained in
the [`README`](README.md#run-locally). A full verification run uses:

```bash
npm ci
npm run check
npm test
```

The checks require the exact ORION checkout declared in
[`docs/upstream/orion-v1/SOURCE.yaml`](docs/upstream/orion-v1/SOURCE.yaml).
Dependency verification intentionally stops when that revision or its
canonical-content fingerprint differs.

For a documentation-only change, at minimum run:

```bash
npm run check:docs
git diff --check
```

If a command cannot run in your environment, say which command, what you tried
and what happened. An explicit unverified condition is better than an implied
pass.

## Find the owning area

Before changing anything, ask:

- Is this about what a person sees or does in the Laboratory?
- Is it transport or deployment behavior?
- Is it ORION navigation or a public contract?
- Is it evidence identity, authority or provenance?
- Is it explanation or translation?
- Is it a Human decision?

NEXAHEDRON owns the first area and a bounded transport adapter. Other areas may
require review in another repository or a governance decision. If you are not
sure, open an issue describing the observation before writing a large patch.

# Ways to contribute

## Documentation

### Purpose

Make the current system easier to understand and reproduce without changing its
meaning.

### Examples

- fix a broken link or inaccurate command;
- clarify current versus historical guidance;
- add a missing prerequisite;
- improve a confusing explanation;
- correct terminology drift;
- add an example that preserves existing behavior.

### In scope

- current contributor and user guidance;
- reproducibility instructions;
- corrections supported by the implementation or canonical documents;
- accessibility and plain-language improvements;
- clearly labeled historical context.

### Out of scope

- rewriting historical records to match the present;
- changing a contract through explanatory prose;
- presenting planned or researched behavior as implemented;
- expanding product claims;
- silently changing canonical governance documents.

## Testing

### Purpose

Turn observable behavior and known boundaries into reproducible evidence.

### Examples

- reproduce a reported journey failure;
- add a regression test for a confirmed bug;
- cover a declared public outcome;
- test keyboard and responsive behavior;
- verify fail-closed dependency handling;
- improve hosted smoke-test coverage.

### In scope

- current NEXAHEDRON journeys;
- request and presentation mapping;
- consumer failure categories;
- boundary and dependency checks;
- real Gateway integration through the supported public boundary;
- deterministic test setup.

### Out of scope

- tests that define new ORION behavior;
- fixture-backed production paths;
- mocks presented as proof of live integration;
- testing private Runtime internals from NEXAHEDRON;
- weakening a validator to make a test pass.

## Accessibility

### Purpose

Make the Laboratory usable without requiring a particular device, input method
or way of perceiving information.

### Examples

- improve keyboard order or focus visibility;
- correct names, roles and descriptions;
- improve form errors and status announcements;
- fix color contrast or zoom behavior;
- test screen-reader reading order;
- reduce motion without removing state clarity.

### In scope

- WCAG-aligned improvements to existing experiences;
- semantic markup;
- visible and programmatic state;
- responsive and reduced-motion behavior;
- accessibility test documentation.

### Out of scope

- hiding evidence or uncertainty to simplify a screen;
- changing public outcome meaning;
- introducing a separate inaccessible path;
- visual redesign unrelated to an observed access problem.

## Design

### Purpose

Make orientation calm, legible, spatial and trustworthy.

### Examples

- improve hierarchy or spacing;
- reduce unnecessary scrolling;
- clarify evidence and continuation relationships;
- make empty, unknown and blocked states easier to distinguish;
- document an observed comprehension problem;
- refine an existing interaction without changing its authority.

### In scope

- the accepted NEXAHEDRON visual language;
- interaction and presentation improvements;
- responsive behavior;
- comprehension and accessibility evidence;
- faithful projections of public contracts.

### Out of scope

- rebranding NEXAH;
- making the Laboratory resemble chat or search;
- hiding complexity that carries evidence or authority;
- inventing report summaries or recommendations;
- changing architecture through a visual shortcut.

## Frontend

### Purpose

Implement the Human-facing Laboratory experience faithfully and accessibly.

### Examples

- fix state preservation in an existing step;
- improve form validation presentation;
- render an existing public field correctly;
- correct responsive layout;
- improve loading or failure-state behavior;
- simplify reusable UI code without semantic change.

### In scope

- routes, components and Orientation feature state;
- presentation models derived directly from public outcomes;
- local interaction validation already owned by the application;
- accessibility and responsive implementation;
- consumer failure presentation.

### Out of scope

- ORION readiness or report validation;
- evidence selection or repair;
- provider or prompt behavior;
- private Runtime imports;
- simulated reports or hidden fallback paths;
- new Orientation Modes outside the active roadmap.

## Backend and transport

### Purpose

Carry exact requests and public outcomes safely between NEXAHEDRON and the
supported ORION Gateway.

### Examples

- improve timeout or payload-limit handling;
- preserve a distinct transport failure;
- improve health and deployment verification;
- prevent sensitive data from entering logs;
- add a reproducible transport integration test;
- make dependency mismatch diagnostics clearer.

### In scope

- NEXAHEDRON-owned transport adapters;
- serialization that preserves exact public values;
- deployment health, limits and diagnostics;
- public/consumer failure separation;
- security controls that do not change contract meaning.

### Out of scope

- orientation, evidence or continuation logic;
- changing Gateway or Runtime semantics;
- calling Runtime internals directly;
- provider selection;
- persistence added without an approved scope;
- adapter workarounds for frozen contract limitations.

## Verification and release engineering

### Purpose

Make every supported release traceable, reproducible and fail-closed.

### Examples

- verify immutable dependency identity;
- improve generated-contract drift checks;
- reproduce a clean release candidate;
- add release attestation or rollback verification;
- repair a stale current-document check;
- test an intentional dependency mismatch.

### In scope

- build, test and release automation;
- dependency and contract verification;
- architecture and documentation checks;
- supported-platform reproduction;
- public diagnostics that expose no private implementation.

### Out of scope

- updating a pin without the release process;
- ignoring a mismatch to keep execution running;
- generated files becoming a second semantic authority;
- declaring unexecuted checks successful;
- using release tooling to change behavior.

## Research

### Purpose

Study unanswered questions without turning hypotheses into product behavior.

### Examples

- propose a reproducible evaluation question;
- examine Human understanding of evidence or clarification;
- compare orientation outcomes across document types;
- document a negative result;
- review related literature;
- identify an assumption that deserves study.

### In scope

- clearly labeled research documents;
- methods, limitations and replication instructions;
- critique of current claims;
- ethically governed Human-study proposals;
- findings that remain separate from canonical behavior.

### Out of scope

- unreviewed research code in the production path;
- scientific or educational claims without evidence;
- Version 2 design disguised as research;
- provider benchmarks used as orientation truth;
- collecting Human data without approval and consent.

## Evidence review

### Purpose

Protect source identity, version, authority, provenance and traceability.

### Examples

- identify a missing source version or fragment;
- report an authority or provenance gap;
- verify whether a reference resolves;
- identify hidden counterevidence;
- distinguish validation from confidence;
- review whether access state is presented faithfully.

### In scope

- review of existing Evidence References and reports;
- reproducible source-resolution findings;
- corrections that preserve history;
- explicit unknowns, conflicts and limitations;
- governance questions routed to the correct owner.

### Out of scope

- implementing a Library adapter;
- assigning ORION relationship or report traceability;
- promoting editorial status;
- treating a citation as proof;
- inventing missing identity or provenance;
- beginning advanced evidence-contract work.

## Translations and language

### Purpose

Help more people understand the same behavior without changing its meaning.

### Examples

- translate interface copy;
- identify terminology that does not survive translation;
- improve a faithful Human-language explanation;
- correct text that overstates certainty;
- add translator context for an ambiguous phrase;
- review reading level and cultural assumptions.

### In scope

- faithful translation of current UI and documentation;
- consistent canonical terms;
- plain language;
- preserved uncertainty and authority;
- documented choices where no exact equivalent exists.

### Out of scope

- translating “unknown” into certainty;
- changing a required action;
- replacing contract vocabulary with marketing language;
- presenting NEXAH as an assistant, chat or search engine;
- silently resolving a conceptual ambiguity.

## Community and contributor support

### Purpose

Make responsible participation easier and discussion more useful.

### Examples

- help reproduce an issue;
- point a contributor to the current reading order;
- classify feedback by owning area;
- summarize a discussion with disagreements preserved;
- improve onboarding guidance;
- welcome a new reviewer or translator.

### In scope

- contributor orientation;
- evidence-based issue triage;
- respectful discussion and summaries;
- current-status communication;
- keeping deferred work out of active Alpha scope.

### Out of scope

- promising features or dates;
- speaking for an authority you do not own;
- deciding architecture by vote or popularity;
- removing disagreement from the record;
- using community growth as technical validation.

# Contribution principles

## Observe before proposing

Describe what happened, where it happened and why it matters before selecting a
solution.

## Reproduce before fixing

A reproducible failure protects against solving the wrong problem. When
reproduction is impossible, state the missing condition explicitly.

## Evidence before opinion

Preferences are welcome, but observable behavior, screenshots, traces, source
references and test results make a change reviewable.

## Small changes over large rewrites

Small changes are easier to understand, verify and reverse. Separate cleanup,
behavior and design changes whenever possible.

## Protect boundaries

Improve the owning component. Do not solve a difficult boundary by moving its
responsibility into a convenient file or adapter.

## Preserve Human authority

Do not infer intention, hide a consequential choice or automate a Human
decision.

## Keep uncertainty visible

Unknown, unavailable and unverified are meaningful states. Do not replace them
with confident language or invented defaults.

## Document decisions

Explain why a non-obvious change was made, which evidence supported it and what
remains open. Ordinary implementation decisions belong with the change;
governed decisions follow the review path below.

## Leave history intact

Corrections should be prospective and traceable. Do not rewrite historical
records merely because the project later learned something new.

# Pull Requests

A good pull request is small, focused and reproducible.

## Expected content

Please include:

1. the observed problem;
2. the owning area;
3. the change made;
4. why the change is the smallest complete solution;
5. user-visible effects, including none;
6. verification commands and results;
7. screenshots or interaction evidence when presentation changes;
8. known limitations or follow-up work;
9. any frozen or governed surface touched.

Keep unrelated formatting, renaming and cleanup out of the same pull request.

## Why small matters

A focused change lets reviewers answer four questions:

- Does it solve the observed problem?
- Does it preserve the current boundaries?
- Can another person reproduce the result?
- Can it be reverted without losing unrelated work?

Large rewrites make authority changes and regressions difficult to see. If a
change cannot be reviewed independently, split it into ordered pull requests.

## Verification expectations

Run the narrowest relevant tests while working and the complete required checks
before requesting final review. Do not weaken or delete a check merely because
it detects your change.

If the pull request changes generated output, identify its authoritative source
and regeneration command. Never edit generated contract declarations as if
they were canonical semantics.

## Review readiness

A pull request is ready when:

- its scope is stable;
- the description matches the diff;
- required checks pass or explicit blockers are documented;
- current documentation remains accurate;
- no unresolved governance decision is hidden in the implementation;
- reviewers can understand the change without reconstructing private context.

# Issues

Search existing issues before opening a new one. If a similar issue exists, add
new reproducible evidence rather than opening a popularity duplicate.

## Bug

Include:

- release or revision;
- environment and browser when relevant;
- exact path through the application;
- expected and observed behavior;
- public outcome or failure category;
- reproduction steps;
- logs or screenshots with sensitive material removed;
- whether the issue occurs consistently.

## UX problem

Describe:

- what the person was trying to do;
- where understanding or control was lost;
- what the person believed would happen;
- what actually happened;
- whether they could recover;
- the consequence for orientation, trust or accessibility.

A proposed visual solution is optional.

## Documentation issue

Name the page and exact statement. Explain whether it is incorrect, stale,
ambiguous, missing or linked to a historical document as though it were
current. Include the source that establishes the correction.

## Accessibility issue

Include the input method, assistive technology and version when known. Describe
the expected semantic or interaction behavior, the actual barrier and whether a
workaround exists. Never include private user information.

## Research question

State the question, why it is not already answered, what evidence would change
our understanding, the proposed method and its limitations. Mark Human data or
ethics requirements explicitly.

## Proposal

Begin with the unmet need, not the desired feature. Identify the affected
audience, current workaround, owning component, smallest useful scope and why
the current roadmap cannot already address it.

Proposals do not grant implementation authority.

## Architecture concern

Use this category only when observable evidence suggests:

- overlapping responsibility;
- a frozen invariant cannot be preserved;
- a private implementation leaks through a public boundary;
- repeated behavior cannot conform to the current contract;
- identity, provenance or authority is lost.

Reference the affected canonical document and provide more than a preference.
Do not include an implementation that bypasses the concern.

# What requires governance

Some documents and behaviors are intentionally protected. Contributors should
not directly change:

- ORION public contracts;
- frozen architecture;
- authority and responsibility boundaries;
- the Evidence Architecture or Evidence Binding Architecture;
- public identity and version semantics;
- contract compatibility policy;
- canonical governance decisions;
- the meaning of lifecycle states or public outcomes;
- the scope of Human, Library, ORION, LYRA or NEXAHEDRON authority.

## Review path

1. Open an issue classified as a Proposal or Architecture Concern.
2. Describe the observed limitation and provide reproducible evidence.
3. Identify the exact frozen document, invariant or public behavior affected.
4. Explain why implementation, choreography, governance clarification or
   documentation cannot solve it within the current boundary.
5. Maintainers classify the issue and identify the appropriate authority.
6. If review is justified, a separate governance record or ADR is prepared.
7. Architecture or contract work begins only after that decision is accepted.
8. Implementation follows in a separate, reviewable change.

A governance issue may be valid and still remain deferred. Urgency, contributor
effort and community votes do not substitute for the review.

If you accidentally discover a governance issue while implementing, stop at
the boundary, preserve your evidence and open the issue. This is a successful
contribution, not unfinished work.

# Code of collaboration

## Assume good intent

Most mistakes come from incomplete context, not bad faith. Ask before assigning
motives.

## Welcome disagreement

Different readings can reveal hidden assumptions. Record the disagreement
clearly instead of forcing early consensus.

## Challenge ideas, not people

Discuss claims, evidence, behavior and consequences. Personal attacks,
harassment and exclusion are not acceptable.

## Use evidence

Show the behavior, source, test or reasoning that supports a claim. State when
something remains a preference or hypothesis.

## Leave history visible

Do not erase earlier decisions or negative findings to make progress look
cleaner. Correct them transparently.

## Respect uncertainty

It is acceptable to say “we do not know.” Do not pressure others to claim
confidence they do not have.

## Respect boundaries and consent

Do not expose submitted material, private communication or personal data. Do
not claim authority on behalf of another contributor, source or community.

## Make review possible

Be clear, patient and specific. Summarize long discussions, preserve unresolved
points and give others enough context to verify your work.

# Thank you

You do not need to solve the whole system to make a meaningful contribution.
A precise issue, a clearer sentence, an accessibility fix or a reproducible
test can be enough.

Every careful contribution makes orientation a little easier for the next person.
