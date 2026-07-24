# NEXAH Launch Strategy

- Status: Canonical adoption and responsible-introduction strategy
- Scope: NEXAH, ORION Version 1 and NEXAHEDRON Alpha
- Starting point: accepted architecture and execution roadmap
- Product changes authorized: none
- Effects: none

This strategy defines how NEXAH becomes useful before it becomes popular. It
does not define branding, promotion, fundraising, product architecture or an
implementation backlog.

# 1. Purpose

NEXAH introduces a category that most people do not already recognize. A new
visitor may reasonably interpret it as search, an encyclopedia, an AI assistant
or a document summarizer. None of those interpretations is sufficient.

Launching gradually is necessary for five reasons:

1. **Understanding must be observed.** The team must learn whether people can
   distinguish information retrieval from orientation without reading the
   architecture.
2. **Authority must remain visible.** Human intention, Library evidence, ORION
   navigation, LYRA language and NEXAHEDRON interaction must not blur under
   public pressure for simpler claims.
3. **Evidence must precede scale.** A structurally valid report is not useful
   when its evidence boundary is misunderstood or concealed.
4. **Operational trust must be earned.** Reproducibility, privacy, failure
   handling, accessibility and support must work with small cohorts before
   anonymous traffic arrives.
5. **The system should learn without chasing attention.** Early feedback should
   improve clarity and reliability, not expand the feature surface.

A gradual launch is not artificial scarcity. Each stage increases exposure only
after the previous stage produces enough evidence that the next audience will
receive an honest and supportable experience.

The central launch rule is:

> Never increase reach faster than the system's ability to preserve context,
> evidence, authority and Human understanding.

# 2. Audience

The order below reflects expected usefulness during the current bounded
Understand experience. It is not a hierarchy of people or disciplines.

## 2.1 Developers and technical reviewers

They can verify reproducibility, public-contract behavior, failure boundaries,
accessibility mechanics and consumer isolation.

They should see NEXAH first because the earliest risks are boundary and
execution risks. Their useful contribution is evidence: reproducible failures,
contract traces, deployment findings and small bounded fixes.

They should not be asked to redesign NEXAH or optimize provider behavior.

## 2.2 Researchers

Researchers routinely work with papers, theories, evidence, assumptions,
scope and uncertainty. The Understand journey closely matches their existing
need to orient before interpreting or extending material.

They can evaluate whether reports expose purpose, structure, support,
limitations and useful continuation without claiming more than the source
permits.

## 2.3 Knowledge curators, librarians and archivists

Curators can assess identity, version, authority, provenance, traceability and
access language. They are essential reviewers of the evidence boundary even
before a production Library exists.

Their role during Alpha is review and governance feedback, not manual repair of
ORION output or hidden evidence supply.

## 2.4 Systems thinkers and architects

They can test whether NEXAHEDRON helps a person see boundaries, relations,
assumptions and routes through complex material. They are also likely to notice
when orientation becomes an ordinary summary or when system responsibilities
begin to overlap.

Architectural feedback remains subject to the formal freeze process; familiarity
with systems does not grant authority to reopen accepted boundaries casually.

## 2.5 Information designers and cartographers

They can evaluate spatial hierarchy, information density, evidence navigation,
continuation and whether the Laboratory remains calm and legible under real
content.

Their contribution is strongest when it names an observed comprehension or
interaction problem rather than proposing decoration.

## 2.6 Educators

Educators can test whether a learner understands what is known, what remains
uncertain and what to examine next. They can also identify language that
silently assumes specialist knowledge.

Educational use must not be presented as validated pedagogy until it has been
studied in an appropriate setting.

## 2.7 Domain practitioners and curious generalists

Scientists, engineers, writers, analysts and other practitioners can bring real
material and reveal whether the Laboratory transfers beyond its originating
documents.

They should enter only after the system handles ordinary misunderstandings and
failure states without requiring project insiders to explain them live.

## 2.8 General public

The general public should arrive last, after the public experience explains
itself, evidence claims are supportable and operational response no longer
depends on a small founder group.

Public access is not the moment when internal ambiguity should be discovered.

# 3. Release Stages

Exposure increases sequentially. A calendar date never overrides an exit gate.

## 3.1 Private Review

### Purpose

Verify that the current candidate says and does what the accepted architecture
claims.

### Participants

- maintainers;
- architecture and contract reviewers;
- accessibility and security reviewers;
- a small number of subject-matter reviewers familiar with the source
  documents.

### Activities

- reproduce the release from a clean checkout;
- walk every public outcome and consumer failure state;
- inspect exact request, report, evidence and continuation lineage;
- review conceptual language without teaching the interface during the task;
- classify findings by owning boundary.

### Exit gate

- RC verification is green;
- critical findings have an owner and verification condition;
- no hidden fixture, fallback or authority transfer exists;
- reviewers can distinguish NEXAH, NEXAHEDRON, ORION, Library and Human roles;
- the system is safe to expose to named external testers.

### Permitted claim

“A reproducible internal Alpha candidate exists.”

## 3.2 Trusted Testers

### Purpose

Observe how people outside the implementation team use the Laboratory in a
restricted, supportable environment.

### Participants

Begin with developers, researchers, curators, systems thinkers and information
designers. The cohort should be deliberately small enough that every failed
journey can be reviewed.

### Activities

- complete the Understand journey without live coaching;
- exercise clarification and visible evidence boundaries;
- inspect failure explanations and recovery choices;
- collect structured feedback and short comprehension checks;
- verify privacy-preserving operational diagnostics.

### Exit gate

- clarification completes with exact lineage;
- every attempt produces one valid public outcome or declared consumer failure;
- users can state what the Laboratory did and did not do;
- no submitted material appears in unauthorized logs;
- recurring high-severity UX and language failures are resolved;
- the team can support the cohort without improvising architecture.

### Permitted claim

“A restricted group is testing the real Version 1 Understand journey.”

## 3.3 Readiness Alpha

### Purpose

Allow a bounded public audience to experience request formation,
clarification, scope confirmation and transparent evidence limits.

This stage is appropriate when the public infrastructure is ready but no
legitimate production evidence path exists.

### Audience

Technical contributors, researchers, curators, designers and systems thinkers
who accept the explicitly limited evaluation scope.

### Required communication

- this is a readiness and boundary evaluation;
- a blocked evidence report is an expected possible outcome;
- it is not yet a general evidence-bound Orientation service;
- Understand is the only executable Operator;
- state, retention and support limitations are explicit.

### Exit gate

- public hosting, transport, privacy, abuse controls, monitoring and rollback
  are verified;
- clarification works end to end;
- the published limitation is understood by most observed participants without
  corrective explanation;
- feedback produces stable patterns rather than constant category confusion;
- governance determines whether an Orientation Alpha may proceed.

### Permitted claim

“The public can evaluate how NEXAHEDRON prepares and validates an orientation
request and exposes missing evidence.”

It MUST NOT be described as a complete Orientation Alpha.

## 3.4 Orientation Alpha

### Purpose

Provide the first complete public Understand experience using authentic,
non-fixture evidence through an approved authority-preserving boundary.

### Entry gate

- every Public Alpha operational blocker is closed;
- at least one legitimate evidence-bound production path exists;
- evidence identity, provenance, relationship and traceability are inspectable;
- no Library, consumer or adapter manufactures ORION authority;
- the public claim matches the exact supported material and Scope.

### Activities

- run real Understand journeys;
- inspect evidence and uncertainty;
- select meaningful report-derived continuations;
- measure understanding and return use;
- publish limitations and incident history when material.

### Exit gate

- real users repeatedly complete evidence-bound journeys;
- clarification, blocked, partial and complete outcomes remain distinguishable;
- evidence and continuation are useful without staff interpretation;
- no repeated observation demonstrates an unresolved authority or contract
  defect;
- the contribution surface is ready to become publicly navigable.

### Permitted claim

“NEXAHEDRON provides a bounded public Understand orientation using traceable
evidence.”

No broader knowledge, science or intelligence claim follows.

## 3.5 Public Repository

### Purpose

Make the implementation, verification evidence and contribution boundaries
legible to people who were not present during development.

Public repository readiness means more than source visibility. It requires:

- one current reading order;
- exact reproduction instructions;
- frozen versus open surfaces clearly marked;
- issue and contribution templates that request evidence;
- security and responsible-disclosure guidance;
- governance routes for architecture, contracts and ordinary implementation;
- historical documents clearly separated from current authority;
- an explicit statement of what contributions will not be accepted.

### Exit gate

- a new contributor can reproduce the supported baseline;
- an issue can be classified without maintainer-only context;
- protected architecture and contract files have an explicit review path;
- contribution review does not rely on popularity or urgency;
- maintainers have capacity to respond within their published boundary.

### Permitted claim

“The canonical implementation and its verification process are open for
bounded contribution.”

## 3.6 Research Community

### Purpose

Invite structured external study of orientation behavior, evidence, language
and Human understanding without turning unreviewed hypotheses into product
claims.

### Participants

- researchers in knowledge organization, information science, HCI,
  visualization, education and related domains;
- curators, librarians and archivists;
- independent replication and critique groups.

### Activities

- publish versioned evaluation protocols and limitations;
- encourage replication and negative findings;
- distinguish repository evidence from peer-reviewed evidence;
- record conflicts and unknowns;
- require consent and appropriate governance for Human studies.

### Exit gate

There is no popularity gate. Progress is demonstrated by reproducible studies,
clear disagreements, usable datasets where ethically permitted and a stable
separation between research findings and product behavior.

### Permitted claim

“NEXAH is available for independent study and critique.”

## 3.7 Open Ecosystem

### Purpose

Allow independently owned applications, Libraries and research projects to
participate without transferring their authority to NEXAH or ORION.

### Entry gate

- the public boundaries required by each integration are stable and approved;
- compatibility, identity and provenance can be verified;
- multiple maintainers can govern releases and incidents;
- at least one external integration has been reviewed without private
  exceptions;
- openness does not depend on accepting unverified contracts or authority.

### Exit gate

This is an ongoing state, not a launch finish line. Health is measured by
independent useful implementations, interoperable evidence and responsible
governance—not the number of integrations.

### Permitted claim

“Independent systems can participate through explicit, verifiable boundaries.”

# 4. Feedback

Feedback is useful when it identifies an observed condition, its context and
its consequence. A preferred solution is optional.

Every feedback record should contain:

- release and contract version;
- journey stage and public outcome;
- Orientation Object kind, without unnecessary source content;
- expected behavior;
- observed behavior;
- consequence for understanding, trust or completion;
- reproducibility information when applicable;
- proposed owning category;
- severity and whether the user could continue.

## 4.1 UX feedback

Valuable UX feedback identifies where a person:

- cannot understand the next action;
- loses context or Scope;
- mistakes a failure for completion;
- cannot distinguish evidence from interpretation;
- cannot use keyboard, screen reader or mobile layout;
- encounters avoidable effort or scrolling;
- does not understand why clarification is required;
- believes the journey ended when continuation is available.

“I dislike this style” is low-signal unless connected to comprehension,
accessibility or task performance.

## 4.2 Architecture feedback

Architecture feedback is valuable only when it demonstrates:

- overlapping authority;
- a public invariant that cannot be preserved;
- private implementation leaking through a boundary;
- repeated behavior that cannot conform to the frozen contract;
- dependency direction or identity lineage failure.

Architecture is frozen. One preference or speculative feature does not reopen
it. Findings enter the governance process with reproducible evidence.

## 4.3 Evidence feedback

Evidence feedback should identify:

- unresolved or conflicting identity;
- missing version or fragment;
- incorrect or unclear authority;
- provenance gaps;
- unsupported relationship;
- traceability failure;
- hidden counterevidence;
- access state that differs from presentation;
- a report claim without exact evidence or an explicit gap.

Feedback about whether evidence is persuasive remains distinct from whether its
reference and provenance are contract-valid.

## 4.4 Language feedback

Language feedback identifies wording that:

- implies chat, assistant or search behavior;
- overstates authority, certainty or completion;
- obscures who owns a decision;
- uses architectural terminology before it is needed;
- cannot be translated faithfully;
- makes a declared unknown sound like an answer;
- changes meaning between interface and public contract.

LYRA and presentation may improve explanation. They must not rewrite ORION
behavior.

## 4.5 Conceptual misunderstandings

Record what the participant believed the system was, when that belief formed
and what evidence corrected or failed to correct it.

Priority misunderstandings include:

- NEXAH and NEXAHEDRON are the same thing;
- ORION is an AI provider;
- a report is canonical truth;
- evidence inclusion grants authority;
- clarification means failure;
- blocked means the system secretly failed;
- continuation means restarting;
- the Library owns ORION conclusions;
- NEXAH replaces books, repositories or knowledge bases.

Repeated misunderstanding may justify clearer communication or UX. It does not
automatically justify architectural change.

## 4.6 Feature requests

Feature requests are recorded separately from defects. Each request should
state:

- the unmet orientation need;
- the current workaround;
- affected audience;
- whether the request belongs to NEXAHEDRON, ORION, LYRA, Library, Atlas or an
  external source;
- which current milestone would fail without it;
- which frozen or deferred boundary it touches.

Requests that do not block the declared Alpha remain deferred. Frequency alone
does not override authority or evidence requirements.

# 5. Success Metrics

Metrics exist to support decisions, not to manufacture confidence. Counts must
always include their cohort, time period, denominator and release version.

## 5.1 Journey integrity

- proportion of started journeys reaching Human confirmation;
- proportion of submitted requests producing exactly one valid public outcome;
- clarification completion rate;
- proportion of clarification resubmissions preserving exact lineage;
- proportion of reports whose evidence references and target paths validate;
- proportion of continuation selections preserving report context;
- count of hidden fallback, invalid-envelope or authority-boundary incidents;
- median number of corrective staff interventions per journey.

## 5.2 Human understanding

After a journey, a participant should be able to identify:

- what they asked the Laboratory to orient;
- what Scope was used;
- what ORION concluded and what it did not conclude;
- which evidence supports, counters, contextualizes or limits a finding;
- which unknowns remain;
- why clarification or blocking occurred;
- one meaningful next action.

Measure this with short task-specific checks and interviews, not a single
satisfaction score.

## 5.3 Evidence quality

- evidence identity/version resolution rate;
- source and fragment inspection rate where access is available;
- provenance and authority comprehension;
- visible evidence-gap rate;
- frequency of disputed relationships;
- frequency of missing counterevidence discovered during review;
- number of reports corrected or withdrawn with history preserved.

Lower evidence-gap counts are not automatically better. An honestly visible gap
is preferable to unsupported completion.

## 5.4 Continuation usefulness

- proportion of reports with at least one behaviorally valid continuation;
- proportion of users who can explain why an option exists;
- selected, declined and paused options;
- context-preservation failures;
- return journeys that continue an earlier orientation rather than recreate it.

## 5.5 Return use

Return use matters only when voluntary and meaningful:

- users returning with a new real Orientation Object;
- users returning to inspect evidence or continue a report;
- users who no longer need staff explanation;
- users who stop appropriately when the system is not suitable.

Do not optimize notification pressure or habitual use.

## 5.6 Contribution quality

- reproducible issue reports;
- accepted documentation or test improvements;
- independent verification attempts;
- evidence corrections with explicit provenance;
- contributors who can identify the correct authority boundary;
- review turnaround relative to published maintainer capacity;
- proportion of contributions completed without architecture repair.

## 5.7 Quality of discussion

Healthy discussion:

- cites exact versions and observable behavior;
- distinguishes source evidence, interpretation and proposal;
- preserves disagreement and uncertainty;
- produces tests, documents, datasets or governed decisions;
- welcomes negative findings;
- avoids status claims based on affiliation or popularity.

Downloads, traffic, stars, followers and mentions may describe reach. They are
not success criteria.

# 6. Communication

Every release page, repository entry point, tester invitation and research
artifact should make the following visible.

## 6.1 Identity

- NEXAH is the Orientation Layer.
- NEXAHEDRON is the Orientation Laboratory and first application.
- ORION navigates, validates and reports.
- LYRA translates and explains faithfully.
- Library and source owners retain evidence and editorial authority.
- the Human retains intention, meaning and decision.

## 6.2 Current capability

- exact release and contract version;
- executable Orientation Operators;
- supported object and evidence scope;
- whether the release is Private, Trusted, Readiness or Orientation Alpha;
- what happens to submitted material;
- whether state persists;
- how failures and blocked reports are represented.

## 6.3 Current limitations

- unavailable modes and integrations;
- evidence boundary and access limitations;
- clarification or continuation limitations when present;
- operational support and availability boundary;
- evaluation corpus and generalization limits;
- effects remain `none`.

## 6.4 Evidence and uncertainty

- a contract-valid reference is not proof of truth;
- inclusion does not grant authority;
- unknown and unverified remain visible;
- a blocked report may be the most faithful outcome;
- current access may differ from historical use;
- Human judgment remains required.

## 6.5 Research status

Clearly label each statement as one of:

- implemented and verified;
- specified but unimplemented;
- planned and governed;
- research hypothesis;
- experimental;
- historical.

Do not use future architecture as evidence of current capability.

## 6.6 Unknowns

Unknown user effects, untested domains, disputed evidence and operational
uncertainties should be published when material. “We do not know yet” is a
valid release statement.

# 7. Community Roles

Roles describe ways to contribute. They do not confer architectural or
editorial authority automatically, and one person may hold several roles.

## 7.1 Builder

Builders implement bounded, reviewed work:

- reproduce failures;
- improve tests, deployment and accessibility;
- preserve public contracts and dependency direction;
- document verification evidence;
- stop when a task requires new authority.

## 7.2 Reviewer

Reviewers inspect claims against observable evidence:

- verify journeys and failure states;
- check architecture and authority boundaries;
- review accessibility, privacy and security;
- identify hidden assumptions;
- distinguish release blockers from preferences.

## 7.3 Researcher

Researchers study orientation without turning hypotheses into product claims:

- define reproducible questions;
- disclose method and limitations;
- preserve negative results;
- separate Human studies from telemetry;
- contribute evidence, critique and replication.

## 7.4 Curator

Curators protect source-side integrity:

- examine identity, version, authority and provenance;
- identify gaps and conflicts;
- review accessibility and licensing of sources;
- preserve withdrawal and historical context;
- never assign ORION relationship or traceability.

## 7.5 Designer

Designers make orientation perceivable:

- improve hierarchy, navigation and evidence legibility;
- test comprehension and accessibility;
- preserve calm, spatial and editorial language;
- connect visual decisions to observed Human needs;
- avoid hiding complexity that carries authority or uncertainty.

## 7.6 Educator

Educators help people learn how to orient:

- create bounded examples and facilitation material;
- identify assumed vocabulary;
- study whether learners can explain evidence and uncertainty;
- teach Human decision ownership;
- avoid presenting unvalidated educational outcomes as established science.

## 7.7 Contributor

Contributors improve the shared baseline through any approved role:

- use the current reading order;
- identify the owning subsystem;
- submit reproducible evidence;
- respect frozen and deferred areas;
- accept review and preserve disagreement;
- avoid expanding scope inside unrelated fixes.

# 8. Non-goals

The launch does not pursue:

- marketing hype or manufactured urgency;
- AI, intelligence or consciousness grand claims;
- AGI positioning;
- replacement of search, books, repositories, teachers, experts, libraries or
  Human judgment;
- claims that NEXAH contains the world's knowledge;
- unverified scientific, educational or social benefit claims;
- feature-count competition;
- rapid implementation of all Orientation Modes;
- growth targets detached from support capacity;
- engagement loops, notifications or habitual-use optimization;
- public leaderboards or gamified contribution;
- hidden collection of Human material;
- provider branding as product identity;
- architecture changes driven by attention;
- evidence promotion by repetition or popularity;
- fundraising milestones as technical validation;
- an Open Ecosystem before public boundaries support one.

# 9. First Year

The first year begins with the first public release. If that release is a
Readiness Alpha, Orientation Alpha remains a later gated event rather than an
assumed calendar milestone.

## Months 1–3 — Observe the public boundary

### Grow

- quality and completeness of journey traces;
- clarity of limitation and evidence communication;
- clarification success;
- accessibility and operational reliability;
- a small pool of capable reviewers;
- structured conceptual-misunderstanding records.

### Keep small

- public audience relative to support capacity;
- executable mode count;
- input types and payload sizes;
- release frequency;
- public claims;
- data retention.

### Decision at month 3

Continue, narrow or pause the Readiness Alpha based on understanding,
clarification, incidents and maintainer capacity—not traffic.

## Months 4–6 — Make contribution reproducible

### Grow

- public reading order and contributor orientation;
- independent clean-checkout verification;
- high-quality issues and test contributions;
- security and privacy review;
- research relationships with explicit boundaries;
- documentation in language accessible outside the founding team.

### Keep small

- accepted contribution scope;
- maintainer promises;
- governance surface;
- experimental dependencies;
- provider and connector count.

### Decision at month 6

Open or expand the contributor surface only if maintainers can review work
without relaxing contracts, authority or evidence standards.

## Months 7–9 — Evaluate Orientation Alpha readiness

### Grow

- evidence-governance confidence;
- authentic evidence-bound evaluation where authorized;
- curator and domain-review participation;
- understanding and continuation measures;
- independent critique.

### Keep small

- supported evidence domains;
- number of authoritative evidence sources;
- Orientation Operators;
- promises of generality;
- Library scope.

### Decision at month 9

Enter Orientation Alpha only if the legitimate evidence gate is satisfied.
Otherwise continue the Readiness Alpha or pause. The calendar creates no right
to bypass Evidence Binding governance.

## Months 10–12 — Establish a durable community practice

### Grow

- contributor diversity across building, review, research, curation, design and
  education;
- quality of independent reproduction;
- governance literacy;
- published negative findings and unresolved questions;
- maintenance capacity and succession;
- carefully bounded real-world journeys.

### Keep small

- centralized authority in one person;
- unsupported integrations;
- active experiments in the production path;
- architectural surface;
- feature promises;
- data collection.

### Year-one review

The review should answer:

1. Do people understand what NEXAH is without private explanation?
2. Do journeys preserve Human intention, evidence and uncertainty?
3. Does clarification improve readiness rather than create frustration?
4. Can independent contributors reproduce and verify the system?
5. Is there authentic return use for orientation rather than novelty?
6. Are discussions producing better evidence and clearer questions?
7. Can maintainers support the current scope responsibly?
8. Should the system remain at its current stage, advance, narrow or pause?

## 9.1 What should grow during year one

- successful, inspectable journeys;
- Human understanding;
- clarification quality;
- evidence and provenance quality;
- accessibility and operational reliability;
- independent verification;
- contributor competence;
- quality of discussion;
- governance maturity;
- honest knowledge of what does not work.

## 9.2 What should intentionally remain small

- the number of executable modes;
- evidence domains;
- integrations and connectors;
- release claims;
- retained Human data;
- operational effects;
- core maintainer commitments;
- unreviewed research in production;
- feature backlog influence on architecture;
- audience size beyond support capacity.

The first year succeeds when a small community can use, inspect, question and
improve NEXAH responsibly. Popularity is neither required nor sufficient.

## 9.3 Pause conditions

Any release stage pauses expansion when:

- invalid public objects reach users;
- evidence or authority is materially misrepresented;
- Human material is exposed or retained outside the published policy;
- dependency verification or rollback cannot be trusted;
- repeated conceptual misunderstanding makes the current claim misleading;
- critical accessibility failures exclude the declared audience;
- maintainers cannot review incidents or contributions responsibly;
- release pressure begins to bypass frozen boundaries.

Pausing is a successful governance action when it preserves trust and evidence.
