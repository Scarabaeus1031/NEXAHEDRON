# NEXAHEDRON Owner-Decision Review

- Status: **NON-CANONICAL DECISION REVIEW**
- Date: 2026-07-30
- Inputs:
  - `NEXAHEDRON_ARCHITECTURE_ALIGNMENT_DRAFT.md`
  - `NEXAHEDRON_AUTHORITY_CONFLICT_REVIEW.md`
- Purpose: compact Owner decision basis
- Decisions recorded: none
- Adoption effect: none
- Implementation authorization: none

This document compresses the two existing reviews into individually answerable
Owner questions. It does not adopt their recommendations, change any current
authority, or authorize corrections.

## 1. Why a separate Decision Review is justified

The Alignment Draft contains the full evidence and source ledger. The
Authority-Conflict Review contains nineteen individual findings. Neither is a
practical decision instrument: several findings depend on the same Owner
choice, while others differ materially in kind.

A separate compact review has durable value because it:

- preserves the evidence documents unchanged;
- records one explicit correction to their conflict classification;
- reduces nineteen findings to six independent decisions;
- lets the Owner answer each decision with `Yes`, `No`, or a stated change;
- can later serve as input to a separately authorized adoption or correction
  pass without itself becoming authority.

## 2. Verification of the two input reviews

### 2.1 Repository and live state

The repository facts recorded in the reviews remain correct:

- repository: `Scarabaeus1031/NEXAHEDRON`
- branch: `main`
- commit: `f8bb17eb2603e86f49c2cf29c8e5561210a12103`
- remote: `https://github.com/Scarabaeus1031/NEXAHEDRON.git`
- pre-existing tracked modification: `vite.config.ts`
- public surface verified again: `https://nexahedron.com`

The live homepage still presents:

- `The Orientation Laboratory`;
- `Version 1 · Public Development Preview`;
- `A library of orientation`;
- Cases, Library, About, Visitor Guide, Begin Orientation, and GitHub;
- both curated case paths and the live Workspace without a clear evidence-class
  distinction at the first decision point.

The previously executed live session remains the most recent complete
behavioral verification:

```text
Human session
→ Rest
→ explicit ORION confirmation
→ ORION clarification
→ Human-confirmed request version 2
→ validation_failed / runtime_outcome_invalid
```

No evidence of a successful complete evidence-bound Orientation Report was
found.

### 2.2 Current review-document size

Before creation of this Decision Review:

| File | Lines | SHA-256 |
|---|---:|---|
| `NEXAHEDRON_ARCHITECTURE_ALIGNMENT_DRAFT.md` | 517 | `70f3a5ccf71729124508b45ce0675a27089ebc05d1c49b96652346cce8afe793` |
| `NEXAHEDRON_AUTHORITY_CONFLICT_REVIEW.md` | 322 | `2730483a145dc2f3a12af7207199589e3029ce43688783fed526f6a390300cdd` |
| Total existing review additions | 839 | not applicable |

The line counts and hashes match the current worktree.

### 2.3 Factual correction to the conflict classification

The two source reviews correctly report the underlying documents and public
claims. The Authority-Conflict Review is, however, too uniform in calling all
nineteen findings conflicts.

The more accurate classification is:

| Class | Findings | Meaning |
|---|---|---|
| demonstrated authority or status collision | AC-01, AC-02, AC-04 | the current claim conflicts directly with an adopted owner or explicit adopted classification |
| public wording or capability overstatement | AC-03, AC-06, AC-07, AC-14, AC-15, AC-16, AC-18 | the implementation exists, but the public wording implies broader scope, durability, authorship, or certification |
| currently aligned horizon statement | AC-17 | no conflict while `Later` remains explicit |
| partially superseded documentation | AC-19 | the documented navigation and broad Library concept no longer fully match the live surface or adopted role |
| open authority, scope, or canonical-home question | AC-05, AC-08, AC-09, AC-10, AC-11, AC-12, AC-13 | the local document claims canonical or cross-ecosystem scope, but no superior adoption record or canonical external home was found |

This is a classification correction, not a dismissal of AC-05 or AC-08 through
AC-13. Their unresolved provenance is precisely why an Owner decision is
required.

The existing reviews have not been silently edited.

## 3. Why six decisions are preferable to five

The proposed five-field structure is fundamentally sound. One split is
necessary: specification authority and the current Orientation Record should
not share a single yes/no decision.

They involve different owners and consequences:

- RFC and architecture status concerns normative scope and canonical homes;
- Record terminology concerns Human-owned transient state, persistence, and
  contract conformance.

The final grouping therefore contains six decisions.

## 4. Decision overview

| Decision field | Evidence-based finding | Recommended Owner decision | Defensible alternative | Consequence | Existing files and surfaces affected later |
|---|---|---|---|---|---|
| 1. NEXAHEDRON role | implemented Human Workspace and bounded experiment; no general answer capability or Library/ORION/Human authority | classify NEXAHEDRON as the public Human-facing research demonstrator and bounded experiment of the ecosystem | retain `reference implementation` as the primary term, but always add bounded demonstrator status | establishes the public promise and the testable boundary for all later wording | README, homepage, About, Visitor Guide, metadata, repository description |
| 2. Reference Cases | five static Human/editorial-authored, source-linked cases; not generated by the Workspace or ORION; no Library Work/Edition identity found | classify them as `Curated Reference Cases`, explicitly separate from Live Experiment and ORION output | permit `Canonical` only as `canonical within the NEXAHEDRON demonstrator`, never as Library or scientific authority | removes false transfer of editorial, Library, scientific, or ORION authority while preserving all cases | `/cases`, every case page, case data/tests, homepage feature, lineage review |
| 3. Library relationship | `/library` and editorial strategy present a local Orientation Library; Constitution assigns Library authority elsewhere | deny NEXAHEDRON independent canonical Library authority; treat the current route as a read-only local selection/presentation | retain the route name `Library` only with an explicit projection/demo scope and canonical-source references | preserves useful navigation but prevents a second Library authority | `/library`, homepage, navigation, Website Experience, Editorial Strategy, README |
| 4. Local specifications and canonical claims | several NEXAHEDRON files claim canonical ecosystem-wide scope; only RFC-0001 has an explicit conflicting adopted classification; others lack verified adoption provenance | treat RFCs and cross-house architecture as active research or local normative profiles until adopted by the owning authority; scope local implementation documents explicitly | preserve local `Canonical` where it means canonical only for NEXAHEDRON and the scope is stated in title, authority, and non-authority clauses | distinguishes useful local rules from ecosystem-wide Framework, OLS, Library, Research, release, and ORION authority | RFC-0001, RFC-0011, Evidence Architecture, Evidence Binding Architecture, Launch Strategy, Public Release Claim, Evaluation Protocol, Manifesto copy |
| 5. Record and storage status | Rest produces a Human-authored transient view; no immutable ID, integrity, review state, export, or persistence | call it a Human-held working session record or Rest view; reserve unqualified `Orientation Record` for a contract-valid immutable record | allow `Orientation Record` only as `local transient Orientation Record` with immediate storage/loss disclosure | makes Human ownership and loss boundary truthful without requiring persistence | Workspace Rest view, Visitor Guide, README, public release claim, privacy wording, RFC-0011 references |
| 6. Public capability and ORION boundary | Core is certified through Slice IV; hosted Runtime/Gateway are external; public integration reaches clarification but tested resubmission fails; actual session result remains Human state plus visible external outcome | show Core certification, Runtime compatibility, Gateway availability, and actual outcome as four separate statuses; promise no successful report | present only a simpler “optional ORION boundary” statement, provided every result screen still identifies producer and failure boundary | prevents Runtime availability or a contract-shaped error from inheriting Core certification or being mistaken for a completed orientation | About, Visitor Guide, confirmation, loading, clarification, error/report views, README, integration status |

## 5. Decision 1 — Role of NEXAHEDRON

### Evidence

Maturity and authority remain separate:

- maturity/evidence: implemented capability and bounded experiment;
- authority: interaction and presentation authority for its own interface;
- non-authority: Research, Framework semantics, OLS, Library identity,
  certified ORION behavior, model reasoning, and Human meaning.

The adopted Research Architecture already calls NEXAHEDRON an experimental
Human-facing Workspace, reference implementation, bounded experiment, and
research demonstrator.

### Recommendation

Adopt `public Human-facing research demonstrator and bounded experiment` as the
controlling role. Keep `reference implementation` as a technical description,
not as a broader product promise.

### Owner question D1

> **D1 — Yes / No / Change:** Shall NEXAHEDRON be governed and publicly
> presented as the Human-facing research demonstrator and bounded experiment
> of the NEXAH ecosystem, with `reference implementation` retained only as a
> subordinate technical description?

## 6. Decision 2 — Reference Cases

### Evidence

The cases:

- are static repository-authored presentations;
- cite identifiable external sources;
- contain Human/editorial synthesis and Reflection;
- are not generated by a live Workspace session;
- are not ORION outputs;
- show no canonical NEXAH Library Work or Edition identity;
- are not scientifically certified by ORION.

### Assessment of `Canonical Cases`

`Canonical` can legitimately have local scope, but the current pages do not
state one. `Earth Science · Canonical` and `Canonical Orientation Case` appear
next to a route called `The Orientation Library`. A normal visitor can
reasonably infer Library or ecosystem canonicality.

The safest current status is `Curated Reference Case`.

A defensible alternative is:

> Canonical reference case within the NEXAHEDRON demonstrator.

That alternative requires the local scope to appear wherever `Canonical`
appears and must explicitly deny Library, scientific, and ORION certification.

### Owner question D2

> **D2 — Yes / No / Change:** Shall all existing NEXAHEDRON cases be classified
> as Human/editorial-authored Curated Reference Cases, explicitly distinct
> from the Live Bounded Experiment, ORION outputs, Library publications, and
> general system capability?

## 7. Decision 3 — Library relationship

### Evidence

The Constitution assigns:

- Work and Edition identity, publication status, collections, and editorial
  provenance to the Library;
- interaction and presentation to NEXAHEDRON.

The current NEXAHEDRON route `/library` presents five local cases as rooms in
`The Orientation Library`. No canonical Library Registry identities are shown.
`docs/EDITORIAL_STRATEGY.md` declares itself a `Canonical editorial
constitution` for that Library.

### Assessment of `Canonical editorial constitution`

Local canonicality is possible only for a responsibility NEXAHEDRON owns.
NEXAHEDRON may own a local editorial presentation guide for maintaining its
reference demonstrations. It may not thereby own:

- NEXAH Library identity;
- ecosystem publication status;
- canonical collections;
- evidence authority;
- Library-wide editorial governance.

Scope wording alone would be sufficient only if the document is narrowed to
NEXAHEDRON reference-case presentation and maintenance. With its current title
and Library-wide content, reclassification or owning-authority adoption is
required.

### Owner question D3

> **D3 — Yes / No / Change:** Shall NEXAHEDRON have no independent canonical
> Library authority, with `/library` and its editorial documents treated only
> as a local read-only presentation or selection unless exact canonical NEXAH
> Library identities are supplied?

## 8. Decision 4 — Local specifications and canonical claims

### Evidence

The following canonical claims exist only in the inspected NEXAHEDRON
repository; no same-titled canonical home was found in NEXAH, ORION, or NEXAH
Experience:

- RFC-0011;
- Evidence Architecture;
- Evidence Binding Architecture;
- Launch Strategy;
- NEXAH Version 1 Public Release Claim;
- NEXAH Evaluation Protocol;
- Editorial Strategy.

RFC-0001 is explicitly classified by the adopted Research Architecture as
`architecture specification / active research`. Its local `Status: Canonical`
is therefore a demonstrated status collision.

RFC-0011 is different: the adopted architecture does not explicitly classify
that artifact. Its ecosystem-wide Memory and Language Evolution scope reaches
beyond NEXAHEDRON interaction authority and into Framework/OLS/Library/Human
review responsibilities. This is an unresolved authority and adoption question,
not yet a proven conflicting adoption.

### Recommendation

Apply one rule:

> A NEXAHEDRON document may be locally normative only for NEXAHEDRON-owned
> interaction, presentation, transient state, and transport-consumer behavior.
> Cross-house semantics remain active research until adopted by every owning
> authority through the appropriate canonical home.

`Canonical` may remain where that local scope is explicit and accurate.
Otherwise the document should later become active research, proposed
architecture, historical lineage, or a derived reference.

### Owner question D4

> **D4 — Yes / No / Change:** Shall NEXAHEDRON-local documents be allowed
> normative authority only inside NEXAHEDRON-owned responsibilities, while
> RFCs and cross-house Library, Evidence, Memory, Language, Research, release,
> and governance claims remain active research or derived references until
> adopted by their owning authorities?

## 9. Decision 5 — Orientation Record and storage

### Evidence

The implemented Rest view is:

- Human-authored;
- held in React reducer state;
- editable by returning to prior operations;
- resettable;
- lost on reload, tab closure, or application restart;
- without immutable record identity;
- without record version, integrity reference, ordered provenance, publication
  review state, or export.

RFC-0011 defines an Orientation Record as immutable and Human-reviewed, with
identity, version, integrity, and provenance. The implemented state does not
meet that definition.

### Assessment of `stop without losing the work`

The sentence is true only inside the still-running in-memory session. Without
that condition it is an inaccurate durability claim.

A minimally honest precision would be:

> You may Rest and return while this browser session remains open.

This is an example for decision clarity, not approved replacement copy.

### Assessment of `Orientation Record`

Human ownership is correct. Contract and persistence status are not.

Recommended distinction:

- current capability: Human-held working session record / Rest view;
- future or separately implemented capability: immutable reviewed Orientation
  Record.

### Owner question D5

> **D5 — Yes / No / Change:** Shall the current Rest output be classified as a
> transient Human-held working session record, with unqualified `Orientation
> Record` and durability claims reserved for a separately contract-valid,
> immutable, reviewed record?

## 10. Decision 6 — Public capability and ORION boundary

### Four boundaries that must remain distinct

| Boundary | Verified status | Authority |
|---|---|---|
| ORION Version 1 Certified Core | Representation through Expression and Vertical Slice IV; STOP `at_slice_iv_certified` | certified ORION authority inside the frozen scope |
| compatible Runtime | external operational process; public instance responds, but its exact hosted commit/fingerprint is not exposed by the current public UI | operational execution only; not inherited certification |
| Gateway/public integration | NEXAHEDRON server route forwards confirmed requests and renders public contracts | transport and presentation only |
| actual tested session result | Human Rest state, ORION clarification, then Runtime Error `validation_failed / runtime_outcome_invalid`; no complete report | Human authorship for session fields; ORION/Runtime authorship for returned contracts |

### Recommendation

Public language should disclose:

- whether a statement concerns the certified Core or the compatible Runtime;
- whether the Gateway is configured and reachable;
- which exact contract type was returned;
- whether the result is Human-authored, curated, source-authored,
  Runtime-produced, or certified;
- the visible STOP or error boundary;
- that ORION invocation is optional and Rest is already a valid Human end.

No public wording should promise a report merely because the Gateway is
reachable.

### Owner question D6

> **D6 — Yes / No / Change:** Shall every public ORION statement separate the
> frozen Certified Core, compatible Runtime, Gateway availability, and actual
> session outcome, with explicit producer labels and no promise that invocation
> yields a complete Orientation Report?

## 11. Coverage of the nineteen findings

| Decision | Primary findings covered |
|---|---|
| D1 — Role | AC-16, AC-17 |
| D2 — Reference Cases | AC-02, AC-18 |
| D3 — Library relationship | AC-01, AC-03, AC-19 |
| D4 — Local specifications | AC-04, AC-05, AC-08, AC-09, AC-10, AC-11, AC-12, AC-13 |
| D5 — Record and storage | AC-06, AC-07 |
| D6 — Public capability and ORION | AC-14, AC-15; operational application of AC-16 and AC-17 |

All nineteen findings are covered. AC-16 and AC-17 appear in both the role and
public-capability decisions because the role establishes the promise while the
capability decision controls its operational expression.

## 12. Matters requiring further clarification

### Owner or governance clarification

- whether RFC-0011 has an existing adoption record not present in the inspected
  repositories;
- whether the Evidence Architecture and Evidence Binding Architecture were
  jointly adopted by NEXAH, Library, and ORION owners;
- the canonical home and derivation status of the Launch Strategy, Public
  Release Claim, Evaluation Protocol, and Manifesto copy;
- whether any public case already has an unreferenced NEXAH Library Work and
  Edition identity;
- whether local `Canonical` case status is worth preserving after explicit
  scoping.

### Technical clarification

- the immutable release identity and fingerprint of the hosted ORION Runtime;
- whether the current Runtime has a certification distinct from the frozen
  Core;
- whether the public deployment can expose that identity without expanding
  the certified scope;
- whether any current browser lifecycle retains reducer state across a full
  reload under deployment-specific behavior; source inspection indicates no
  persistence;
- whether a complete report is currently reachable only through test-supplied
  Evidence or through any publicly available governed evidence path.

These questions do not block the six role decisions. They block precise later
implementation and status wording.

## 13. Recommended later correction order

No correction is authorized here. If the Owner answers the decisions
affirmatively, the recommended later order is:

1. record the six Owner decisions in a separate adoption decision;
2. resolve canonical homes and local-versus-ecosystem specification scope;
3. correct Library and Case authority labels;
4. correct Record and storage terminology;
5. freeze the public role and capability statement;
6. make ORION producer and boundary status explicit at confirmation and
   outcomes;
7. align README, About, Visitor Guide, homepage, navigation, Cases, and the
   local Library presentation;
8. align tests with the newly adopted terminology;
9. rerun repository, live-session, accessibility, and cross-repository
   verification;
10. review a complete implementation diff before commit or deployment.

## 14. Owner response form

The Owner may answer each line independently:

```text
D1 — NEXAHEDRON role:
Yes / No / Change:

D2 — Curated Reference Cases:
Yes / No / Change:

D3 — No independent Library authority:
Yes / No / Change:

D4 — Local specification scope:
Yes / No / Change:

D5 — Transient working record:
Yes / No / Change:

D6 — Public ORION capability separation:
Yes / No / Change:
```

No answer changes the repository by itself. Adoption and implementation remain
separate later actions.
