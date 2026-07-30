# NEXAHEDRON Architecture Alignment Draft

- Status: **NON-CANONICAL ARCHITECTURE DRAFT**
- Date of review: 2026-07-30
- Scope: present NEXAHEDRON role, public presentation, implemented behavior, and
  relationship to the adopted NEXAH Research & Ecosystem Architecture
- Authority: observational and corrective proposal only
- Runtime effect: none
- Adoption effect: none
- Implementation authorization: none

This draft does not replace the NEXAH Ecosystem Constitution, the adopted
NEXAH Research & Ecosystem Architecture, the ORION Version 1 certified
baseline, Library authority, or any current NEXAHEDRON contract. It records a
repository and live-surface audit and proposes a clearer alignment for later
review.

## 1. Review decision

The tested hypothesis is substantially correct:

> NEXAHEDRON is the experimental Human-facing reference Workspace and public
> research demonstrator of one bounded Orientation Session.

It is not:

- the NEXAH public or intellectual home;
- the canonical NEXAH Library;
- a general artificial-intelligence assistant;
- a finished answer service;
- a source of scientific or Human authority;
- the ORION certified Core;
- proof that the wider Open Systems or Rails research horizon is implemented.

The current repository implements a real and useful bounded experiment.
However, its public presentation also contains a second, materially different
experience: a set of statically authored Orientation Cases presented as a
Library. The two experiences are not yet named and bounded clearly enough.

The strongest alignment is therefore not to discard either experience, but to
separate their status:

1. **Curated Reference Cases** demonstrate an editorial form of orientation.
2. **Live Bounded Experiment** lets a Human perform one transient Orientation
   Session and optionally invoke the current external ORION boundary.

Neither path is a general answer service. Neither path transfers Human,
Library, Source, Research, semantic, or certified ORION authority to
NEXAHEDRON.

## 2. Governing precedence

This draft applies the following precedence:

1. `NEXAH/GOVERNANCE/ECOSYSTEM_CONSTITUTION.md`
2. `NEXAH/ARCHITECTURE/NEXAH_RESEARCH_ECOSYSTEM_ARCHITECTURE.md`
3. the owning authority's canonical specification or certification
4. NEXAHEDRON architecture and implementation contracts
5. NEXAHEDRON application behavior
6. NEXAHEDRON public presentation
7. historical, proposed, or future material

The order is document precedence, not data flow, maturity hierarchy, or
authority transfer.

## 3. Two independent status axes

### 3.1 Maturity and evidence status

| Status | Meaning in this review |
|---|---|
| canonical governance | adopted governance that binds the relevant responsibility |
| certified capability | capability inside a named, frozen certification boundary |
| implemented capability | behavior observed in code, tests, or the live surface |
| curated reference content | Human-authored public material selected to demonstrate a form |
| bounded experiment | implemented behavior valid only inside declared inputs and limits |
| active research | specification, hypothesis, or evaluation work still open to research |
| historical lineage | preserved prior state that does not define the current role |
| open research horizon | proposed future capability not present in the current system |

### 3.2 Authority class

| Authority class | Current owner |
|---|---|
| Human authority | the Human |
| canonical governance | NEXAH Constitution and adopted governance |
| Framework authority | NEXAH Framework |
| semantic authority | released Orientation Language |
| editorial identity authority | NEXAH Library Registry and Living Atlas within their declared scopes |
| certified orientation authority | ORION inside its frozen certified boundary |
| interaction authority | NEXAHEDRON |
| presentation authority | NEXAH Experience for the public ecosystem entrance; NEXAHEDRON for its own interface |
| source authority | the named external source or its declared owner |
| contribution authority | a separately authorized participant, proposal only |

Maturity does not create authority. An implemented interface does not become
Library authority, and a certified ORION artifact does not become Human
interpretation.

## 4. Current evidence-based role

### 4.1 What is implemented

The repository and live deployment implement:

- a public website and Human-facing Workspace;
- one in-memory Human session state;
- the Human-authored operations Anchor, Place, Attend, Relate, Bound, Turn,
  Reflect, and Rest;
- one bounded USGS Plate Tectonics Encounter surface;
- exact Human-selected paragraph fragments with source identity, locator,
  version, provenance, and return-to-source action;
- explicit separation of fragments from Evidence;
- one explicit review and confirmation boundary before ORION transport;
- server-side forwarding to a configured external ORION Gateway;
- rendering of validated Version 1 public ORION contracts;
- visible clarification, Runtime error, and boundary-failure states;
- reset and restart behavior inside the current browser application.

### 4.2 What is not implemented

The repository does not implement:

- durable Orientation Record identity, integrity, export, or persistence;
- accounts, shared history, synchronization, or server-side session storage;
- uploads or source ingestion;
- generic HTML, PDF, dataset, image, or Library source resolution;
- a production Library adapter;
- automatic evidence creation or selection;
- autonomous interpretation, explanation, recommendation, or decision;
- LYRA, SIRIUS, external model participation, or general AI reasoning;
- the wider Open Systems or Rails participant architecture;
- a complete public ORION clarification cycle;
- a general capability to answer arbitrary Human questions.

### 4.3 Storage, reset, and privacy behavior

The current session is held by a React reducer and component state beneath the
root application provider. No application use of `localStorage`,
`sessionStorage`, cookies, analytics, or telemetry was found.

The current behavior is therefore:

- state survives client-side movement while the root provider remains mounted;
- explicit reset returns the reducer to its initial state;
- page reload, tab closure, or application restart loses the in-memory session;
- a selected local file contributes its filename only; no upload occurs;
- a reference URL is stored as a Human-provided address; normal material
  placement does not retrieve it;
- network transmission begins only through the explicit ORION confirmation
  path;
- the browser sends the confirmed contract to the same-origin API route;
- the server-side route forwards it to the configured ORION Gateway;
- no application telemetry path was found.

The phrase “You can stop without losing the work” is true only while the
current in-memory application state remains alive. It is not a persistence
guarantee.

## 5. The two public experience classes

### 5.1 Curated Reference Case

The public cases, including Plate Tectonics, are static Human-authored
presentations. They demonstrate a desired orientation form:

- Human intention;
- starting position;
- subject and context;
- explicit relationships;
- inspectable external sources;
- assumptions;
- unknowns and boundaries;
- possible continuations;
- a Human-readable reflection.

Their content is rendered from repository data and editorial page code. It is
not generated by the live Workspace, the ORION Runtime, or the certified ORION
Core. The Plate Tectonics page cites USGS, NOAA, and NSF GAGE, and its own
lineage explicitly identifies editorial transformation.

Current appropriate status:

- maturity/evidence: **curated reference content**
- authority: **NEXAHEDRON presentation only**, subordinate to the named source
  authorities

The label `Canonical Orientation Case` is not currently supported by a
canonical NEXAH Library Work/Edition identity, Library provenance, or an
adopted NEXAHEDRON editorial authority. Until such an authority is resolved,
the cases should be understood as curated reference cases, not canonical
Library publications.

### 5.2 Live Bounded Experiment

The Workspace is a real executable Human-interface experiment:

```text
Human Question
→ Human-held material
→ bounded Encounter
→ exact Human-kept fragments
→ Human-authored relationship and boundary
→ Human Reflection
→ Rest
→ optional explicit ORION confirmation
```

The Plate Tectonics Encounter faithfully exposes a bounded local projection of
one USGS publication record. It does not fetch the full live source and does
not summarize or interpret it. It is a window onto identified source content,
not a Library Evidence object.

Current appropriate status:

- maturity/evidence: **implemented capability and bounded experiment**
- authority: **NEXAHEDRON interaction authority**

## 6. Live ORION boundary verification

On 2026-07-30 the public deployment at `https://nexahedron.com` was exercised
through a complete Human session using the question “What is plate
tectonics?”.

Observed sequence:

1. the Human opened the bounded USGS source surface;
2. two exact fragments were kept;
3. the Human authored attention, relationship, boundaries, another position,
   uncertainty, and Reflection;
4. Rest produced the current in-memory Orientation Record view;
5. `Prepare for ORION` exposed the bounded request;
6. explicit `Begin Orientation` reached the public ORION boundary;
7. ORION returned a valid clarification request for source access and source
   version;
8. the Human supplied those values and confirmed request version 2;
9. resubmission returned the documented public Runtime error:
   `validation_failed / runtime_outcome_invalid` at
   `report_contract_validation`.

This matches
`docs/integration/ORION_V1_LIVE_INTEGRATION.md`.

The result establishes:

- the public transport and clarification display are live;
- the Workspace preserves the Human-held session through the visible failure;
- the clarification-lineage blocker is real and not silently bypassed;
- no complete Orientation Report was produced in this tested path.

It does not establish:

- that the Runtime or Gateway is part of the certified ORION Version 1 Core;
- that a public request normally reaches Slice IV certification;
- that evidence-bound orientation is available;
- that NEXAHEDRON can answer arbitrary questions;
- that the displayed Human session record is an ORION artifact.

## 7. Output authorship

The current system contains four different output classes:

| Output | Actual author or owner | Current presentation risk |
|---|---|---|
| Question, attention, relationship, boundaries, turn, Reflection, Rest | Human | generally explicit |
| exact source fragments | external source; selected by Human; presented by NEXAHEDRON | generally explicit; not Evidence |
| curated Orientation Cases | Human editorial authorship in NEXAHEDRON; source claims remain source-bound | `Canonical` and `Library` labels imply unestablished editorial authority |
| public ORION contracts | ORION Runtime/Gateway outcome within declared contract; presented by NEXAHEDRON | report view does not always state authorship and certified/non-certified boundary plainly |

An Orientation Report, Clarification Result, Runtime Error, or Continuation must
remain visibly ORION-authored. NEXAHEDRON may render it but must not let its
visual continuity imply that the Workspace authored or certified it.

The Rest view is Human-authored session state. It is not currently the
immutable, reviewed Orientation Record defined by RFC-0011.

## 8. Public-interface alignment

The public experience should eventually distinguish the two paths before a
visitor chooses one:

### Read a curated reference case

What the visitor receives:

- a Human-authored, source-linked demonstration;
- a stable reading path;
- no claim that the case was generated by ORION;
- no claim of Library canonicality unless a Library identity is supplied.

### Try the live bounded experiment

What the visitor must contribute:

- one question;
- material or the one available Encounter;
- attention, relationship, boundaries, uncertainty, and Reflection;
- explicit consent before ORION transport.

What the visitor may receive:

- a complete local Human-held Rest state;
- a valid ORION clarification, report, Runtime error, or visible boundary
  failure;
- no promise of an answer or complete report.

### Recommended public role sentence

> NEXAHEDRON is the Human-facing research demonstrator of the NEXAH
> Orientation Ecosystem. Read a curated reference case, or try one bounded
> Human-led session and inspect where the current system succeeds, stops, or
> remains open.

This wording is proposed for review only. It creates no new authority.

## 9. Claim alignment matrix

| Surface | Current claim or implication | Verified status | Alignment assessment | Required correction class |
|---|---|---|---|---|
| `README.md` opening | Human-facing reference implementation | implemented capability and bounded experiment | aligned |
| `README.md` release status | Version 1 source release; public bounded preview | implemented capability | aligned |
| `README.md` Orientation Record | one Human-owned Orientation Record | transient Human-held view only | qualify persistence, identity, and RFC-0011 distinction |
| homepage hero | helps people orient across existing knowledge | bounded public claim | too broad without immediate demonstrator boundary |
| homepage section | “A library of orientation” | presentation | risks acquiring Library identity |
| homepage paths | case and live Workspace appear as equivalent entrances | two different evidence classes | distinguish curated reference content from live experiment |
| `/cases` | five canonical cases | curated reference content | unsupported canonicality |
| Plate Tectonics case | `Canonical Orientation Case` and `Status: Canonical` | static editorial presentation | unsupported Library/editorial authority |
| Plate Tectonics evidence | three public sources with stated limits | source-linked curated content | aligned if not promoted to Library Evidence |
| `/library` | `The Orientation Library` and collections/rooms | local presentation over five cases | conflicts with central Library ownership unless labeled projection/demo |
| Workspace entry | one complete Orientation Session | implemented bounded flow | aligned if “complete” means local session through Rest, not successful ORION report |
| Workspace Encounter | real source on the table | bounded local USGS projection | materially true but should disclose bounded projection, not full live source |
| Rest view | “You can stop without losing the work” | in-memory only | overstates durability |
| Rest view | `Orientation Record` | mutable/transient application state | distinguish working Rest view from immutable reviewed RFC-0011 record |
| ORION confirmation | only confirmed fields cross | implemented | aligned |
| ORION clarification | requested values and preserved context | live implemented path | aligned |
| ORION report component | `Orientation Report` | faithful contract presentation when supplied | add visible ORION authorship and certification boundary |
| ORION success implication | preparing may yield orientation | current tested clarification loop fails | expectation must state possible clarification/error/blocked outcome |
| later modes | Compare, Connect, Explore, Build, Reflect | open research horizon or unavailable UI | aligned when marked `Later`; not a capability |
| `docs/EDITORIAL_STRATEGY.md` | canonical editorial constitution for Orientation Library | document exists; authority not held here | authority conflict |
| `docs/rfcs/RFC-0001...` | canonical protocol | active research under adopted cross-repository architecture | authority/status conflict |
| `docs/rfcs/RFC-0011...` | canonical memory/language evolution | active research; no implementation | authority/status conflict |

## 10. Correction order

No correction is authorized by this draft. If adopted later, the smallest
coherent order would be:

1. resolve authority labels in the Authority-Conflict Review;
2. freeze one honest public role statement;
3. distinguish Curated Reference Cases from the Live Bounded Experiment;
4. replace or qualify unsupported `Canonical` and `Library` claims;
5. distinguish transient Rest state from an immutable Orientation Record;
6. label ORION-authored outputs and current Runtime limits at the result
   surface;
7. align README, Visitor Guide, homepage, Cases, Library projection, and
   integration documentation;
8. verify the resulting claims against the live system.

## 11. Historical, superseded, and unverifiable statements

### 11.1 Historical or partially superseded material

- `README.md` explicitly marks its earlier Alpha integration sequence as
  historical. That section is traceable and does not need deletion.
- `docs/WEBSITE_EXPERIENCE.md` still names `Explore` as a primary navigation
  item, while the current public navigation uses Home, Cases, Library, About,
  Visitor Guide, Begin Orientation, and GitHub. Its navigation prescription is
  therefore partially superseded by the implemented public surface.
- release, readiness, sprint, and implementation review documents record
  earlier gates. They remain useful lineage only when their status and date do
  not compete with current code, deployment evidence, or adopted governance.
- future Library, Memory, adapter, and multi-mode descriptions remain planning
  or research unless an owning authority has explicitly adopted and
  implemented them.

### 11.2 Technically or authoritatively unverified

This review could not establish from the public surface alone:

- the immutable release commit and fingerprint of the particular hosted ORION
  Runtime instance reached on 2026-07-30;
- whether that hosted Runtime has passed any certification separate from the
  frozen ORION Version 1 Core;
- a canonical NEXAH Library Work or Edition identity for any of the five public
  cases;
- a canonical Library collection identity for `/library`;
- an adopted cross-repository authority decision for RFC-0001, RFC-0011, the
  Evidence Architecture, the Evidence Binding Architecture, the Launch
  Strategy, or the NEXAH Evaluation Protocol;
- persistence, export, immutable identity, integrity, or review status for the
  Rest view called an Orientation Record;
- successful production generation of a complete evidence-bound Orientation
  Report through the currently exposed public path.

Absence of verification is not proof that an external decision or artifact
does not exist. It means the current repository and public surface do not
provide the required authoritative reference.

## 12. Non-claims

This draft does not claim:

- that the current cases are scientifically certified;
- that ORION interprets or explains Human questions;
- that ORION Version 1 includes Runtime, Gateway, application, or presentation;
- that the Open Orientation Protocol is adopted ecosystem governance;
- that NEXAHEDRON owns Library or editorial identity;
- that the Rest view is persistent or immutable;
- that the current public system provides a successful complete report;
- that provider, model, RL, LYRA, SIRIUS, or Rails participation is implemented;
- that NEXAHEDRON is a product or production service;
- that any current source, relationship, or case should be removed.

## 13. Source and status ledger

### 13.1 NEXAH

- Repository: `Scarabaeus1031/NEXAH`
- Local branch: `main`
- Commit: `2a0986ff1aa40da1bb745176d647b5013ecc07ff`
- Remote: `https://github.com/Scarabaeus1031/NEXAH.git`
- Working tree at review: clean

Sources read:

- `GOVERNANCE/ECOSYSTEM_CONSTITUTION.md`
- `ARCHITECTURE/NEXAH_RESEARCH_ECOSYSTEM_ARCHITECTURE.md`
- `REPOSITORY_MAP.md`
- `README.md`
- `MANIFESTO.md`

### 13.2 ORION

- Repository: `Scarabaeus1031/NEXAH-ORION`
- Local branch: `codex/orion-orientation-operators`
- Commit: `d34fbb2f99334534f4db89465a29f8bdb16d14d3`
- Remote: `https://github.com/Scarabaeus1031/NEXAH-ORION.git`
- Working tree at review: dirty with local Runtime and documentation work;
  no dirty file was used to expand the certified Version 1 claim

Sources read:

- `docs/releases/ORION_V1_CERTIFIED_BASELINE.md`
- `docs/architecture/ORION_SYSTEM_PLATE.md`
- `README.md`

The certified source boundary ends at `at_slice_iv_certified`. Runtime,
Gateway, applications, presentation, reasoning, Human Reports, and semantic
interpretation are explicit non-responsibilities of that baseline.

### 13.3 NEXAHEDRON

- Repository: `Scarabaeus1031/NEXAHEDRON`
- Local branch: `main`
- Commit: `f8bb17eb2603e86f49c2cf29c8e5561210a12103`
- Remote: `https://github.com/Scarabaeus1031/NEXAHEDRON.git`
- Pre-existing local change preserved: `vite.config.ts`

Sources read include:

- `AGENTS.md`
- `README.md`
- `MANIFESTO.md`
- `docs/architecture/APPLICATION_ARCHITECTURE.md`
- `docs/architecture/AUTHORITY_BOUNDARIES.md`
- `docs/architecture/ORIENTATION_WORKSPACE_IMPLEMENTATION_CONTRACT.md`
- `docs/architecture/EVIDENCE_ARCHITECTURE.md`
- `docs/architecture/EVIDENCE_BINDING_ARCHITECTURE.md`
- `docs/EDITORIAL_STRATEGY.md`
- `docs/WEBSITE_EXPERIENCE.md`
- `docs/integration/ORION_V1_LIVE_INTEGRATION.md`
- `docs/roadmap/NEXAHEDRON_ALPHA_EXECUTION_ROADMAP.md`
- `docs/rfcs/RFC-0001_OPEN_ORIENTATION_PROTOCOL.md`
- `docs/rfcs/RFC-0011_ORIENTATION_MEMORY_AND_LANGUAGE_EVOLUTION.md`
- `docs/upstream/orion-v1/SOURCE.yaml`
- current application routes, Workspace state, Encounter source and
  components, request mapping, API transport, public contract renderer, and
  relevant tests

### 13.4 NEXAH Experience

- Repository: `Scarabaeus1031/NEXAH-Experience`
- Local branch: `main`
- Commit: `7473736ff5e6077fda41e7302b041e79e57673e3`
- Remote: `https://github.com/Scarabaeus1031/NEXAH-Experience.git`
- Working tree at review: dirty with existing public-site work; no file was
  changed or treated as an atomic release with NEXAHEDRON

Sources read:

- `README.md`
- the public-role references recorded in the adopted NEXAH Research &
  Ecosystem Architecture

### 13.5 Live public surface

- URL: `https://nexahedron.com`
- Date exercised: 2026-07-30
- Pages inspected: homepage, About, Visitor Guide, Cases, Plate Tectonics,
  Library, and the complete Workspace path through ORION resubmission
- Live result: clarification followed by
  `validation_failed / runtime_outcome_invalid`

The live observation is deployment evidence, not canonical architecture or
scientific validation.

## 14. Draft disposition

This document should remain non-canonical until:

1. the Authority-Conflict Review is resolved by the relevant owners;
2. repository-local and cross-repository status labels are reconciled;
3. the distinction between curated reference content and live experiment is
   accepted;
4. a full implementation diff is reviewed separately;
5. no change silently transfers Library, ORION, Research, semantic, or Human
   authority.
