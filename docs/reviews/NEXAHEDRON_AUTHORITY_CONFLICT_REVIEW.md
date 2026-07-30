# NEXAHEDRON Authority-Conflict Review

- Status: **NON-CANONICAL REVIEW**
- Date: 2026-07-30
- Scope: authority and status conflicts discovered during the NEXAHEDRON
  architecture-alignment audit
- Authority: observational only
- Implementation authorization: none
- Adoption authorization: none

This review does not decide ownership. It identifies places where current
NEXAHEDRON language, document status, or public presentation may conflict with
the NEXAH Ecosystem Constitution or the adopted NEXAH Research & Ecosystem
Architecture.

## 1. Governing rules

The following constitutional rules control this review:

1. every important artifact has one canonical carrier and home;
2. multiple houses may reference or present an artifact but may not define it
   in parallel;
3. authority follows responsibility, not visibility, implementation, copying,
   or technical control;
4. presentation remains presentation;
5. derived artifacts remain subordinate to their canonical source;
6. provenance, identity, version, status, and uncertainty remain visible;
7. Research, draft, hypothesis, archive, or editorial proximity is not silently
   promoted;
8. Reports belong to the house that creates them;
9. Reflection, interpretation, continuation, and Rest remain Human;
10. Runtime and application behavior do not expand the frozen ORION Version 1
    certification.

## 2. Overall result

**Authority alignment is not yet sufficient for adoption of the accompanying
draft as a current NEXAHEDRON architecture.**

The implemented Workspace itself mostly respects authority boundaries. The
principal conflicts are documentary and editorial:

- NEXAHEDRON declares canonical Library/editorial authority that the adopted
  ecosystem architecture assigns elsewhere;
- repository-local protocol documents declare themselves canonical while the
  adopted cross-repository architecture classifies that work as active
  research;
- public cases are presented as canonical without a canonical Library
  identity or provenance chain;
- the public `Library` surface looks like a canonical Library rather than a
  local presentation of curated reference material;
- the Rest view is called an Orientation Record although it does not satisfy
  the repository's own RFC-0011 immutable record contract;
- ORION output authorship and certified-versus-operational status are not
  always explicit at the public result surface.

These are correctable without redesigning the Workspace or changing the frozen
ORION Core.

## 3. Conflict register

| ID | Severity | Current source and claim | Superior or owning source | Conflict | Required owner decision |
|---|---|---|---|---|---|
| AC-01 | blocking | `docs/EDITORIAL_STRATEGY.md`: `Status: Canonical editorial constitution` for the Orientation Library | NEXAH Constitution: Library owns publication identity, status, series, collections, and editorial provenance; adopted Research Architecture assigns Library Registry editorial identity authority | NEXAHEDRON declares a canonical editorial authority that its own `AUTHORITY_BOUNDARIES.md` says it does not own | Library/governance owner must adopt, relocate, subordinate, or reclassify the document |
| AC-02 | blocking | `/cases` and case pages: `Canonical`, `Canonical Orientation Case`, `Status: Canonical` | Library owns canonical publication identity and provenance | No Library Work/Edition identity, Registry record, edition, or canonical Library provenance is displayed or referenced | Library/editorial owner must either issue the identities or the public status must become curated reference content |
| AC-03 | high | `/library`: `The Orientation Library`; homepage: `A library of orientation`; README and Website Experience describe a NEXAHEDRON Library | Constitution and adopted Research Architecture assign Library authority to the NEXAH Library and presentation authority to Experience/NEXAHEDRON only for its own surface | Visitors can reasonably infer that NEXAHEDRON owns or is the canonical Library | Decide whether this is a clearly labeled read-only projection, a demonstrator collection, or a link to the canonical Library |
| AC-04 | blocking | `docs/rfcs/RFC-0001_OPEN_ORIENTATION_PROTOCOL.md`: `Status: Canonical` | adopted Research Architecture source ledger: `architecture specification / active research` supporting the Open Systems/Rails question | The same artifact has incompatible authority/maturity status | NEXAH governance must explicitly adopt the protocol or NEXAHEDRON must reclassify it as active research |
| AC-05 | blocking | `docs/rfcs/RFC-0011_ORIENTATION_MEMORY_AND_LANGUAGE_EVOLUTION.md`: `Status: Canonical` | adopted Research Architecture does not grant NEXAHEDRON language or Memory authority; OLS remains the released semantic authority | NEXAHEDRON declares canonical Memory/language evolution rules without an identified owning adoption | Framework/OLS/governance owner must adopt or reclassify it |
| AC-06 | high | Rest view and public claim: `Orientation Record` / `Human-owned Orientation Record` | RFC-0011 defines an immutable Human-reviewed record with identity, version, integrity, provenance, and review state | current React state is mutable, transient, unidentified, and lost on reload/closure | Decide whether the UI is a `working session record` or implement a separately authorized record contract later |
| AC-07 | high | Rest view: `You can stop without losing the work` | implemented provider stores state only in memory | statement implies durability not provided by the application | qualify the statement to the current session or later authorize persistence |
| AC-08 | high | `docs/architecture/EVIDENCE_ARCHITECTURE.md`: canonical boundary applying to Library, ORION, NEXAHEDRON | Constitution: contracts and evidence declarations belong to their owning houses; NEXAHEDRON does not own Library or ORION authority | document may be a useful architecture analysis but its cross-house canonicality is not established by repository placement | relevant Library, ORION, and NEXAH governance owners must confirm adoption or the status must be narrowed |
| AC-09 | high | `docs/architecture/EVIDENCE_BINDING_ARCHITECTURE.md`: canonical governance decision applying to every future evidence integration | same multi-owner constitutional split | local document asserts an authoritative future cross-repository contract choice | require an explicit cross-owner decision record outside this review |
| AC-10 | medium | `docs/roadmap/NEXAH_LAUNCH_STRATEGY.md`: canonical strategy for NEXAH, ORION V1, and NEXAHEDRON | each repository and Operations owns its own releases; NEXAH Experience owns public entrance | NEXAHEDRON repository declares cross-ecosystem canonical launch authority | narrow to NEXAHEDRON introduction or identify the actual adopted ecosystem decision |
| AC-11 | medium | `docs/releases/NEXAH_V1_PUBLIC_RELEASE_CLAIM.md`: canonical coordinated NEXAH release claim | public release identity spans multiple owners and belongs at an adopted canonical ecosystem home | repository contains a canonical cross-ecosystem claim with no visible derivation marker | reference the canonical home and mark this copy derived, or move ownership through governance |
| AC-12 | medium | `docs/research/NEXAH_EVALUATION_PROTOCOL.md`: canonical research protocol baseline | Research authority belongs to NEXAH Research | NEXAHEDRON may run usability experiments but does not own all NEXAH research protocol | NEXAH Research must adopt it or the file must be a NEXAHEDRON experiment protocol |
| AC-13 | medium | `MANIFESTO.md`: `NEXAH Manifesto` stored as current root document | NEXAH central repository is the Research & Framework home and already carries `MANIFESTO.md` | duplicate current-looking copies can drift and create double authority | designate the central canonical source and make this copy an exact derived reference or link |
| AC-14 | medium | `ReportView`: generic `Orientation Report` and seamless page styling | Constitution: Reports belong to the creating house; ORION V1 certified Core excludes Runtime, application, presentation, and Human Reports | the UI can obscure whether content is Human, curated, Runtime-produced, or certified | render explicit producer, contract identity, and certification boundary without interpreting content |
| AC-15 | medium | About: ORION “creates certified structural orientation” adjacent to the live Workspace | ORION V1 certification ends at `at_slice_iv_certified`; live Gateway/Runtime are operational extensions outside that baseline | visitors may transfer Core certification to the public request path | state that certified Core artifacts and the public Runtime path are different boundaries |
| AC-16 | medium | homepage: `NEXAHEDRON helps people orient themselves across existing knowledge` | adopted role: one bounded Human-facing experiment, no production promise | claim sounds like a general service promise | pair with demonstrator status and actual supported path |
| AC-17 | low | unavailable orientation modes are visible as `Later` | adopted role permits open research horizon when clearly labeled | no authority conflict while unavailable state remains explicit | preserve label; do not promote without separate authorization |
| AC-18 | low | bounded USGS Encounter calls itself one real source | source file is a fixed local projection of exact text from an identified USGS publication record | materially acceptable, but “actual source” can be read as live/full source delivery | disclose that it is a bounded faithful source surface and keep the external source action |
| AC-19 | medium | `docs/WEBSITE_EXPERIENCE.md` prescribes Explore as primary navigation and a broad NEXAHEDRON Library | current live navigation differs; adopted architecture limits NEXAHEDRON to interaction and presentation authority | parts of the document are superseded by implementation and parts overstate the repository's Library role | mark the current sections historical or revise them only after the Library decision |

## 4. Status reconciliation

### 4.1 Canonical governance

Current controlling governance:

- `NEXAH/GOVERNANCE/ECOSYSTEM_CONSTITUTION.md`
- `NEXAH/ARCHITECTURE/NEXAH_RESEARCH_ECOSYSTEM_ARCHITECTURE.md`

No NEXAHEDRON document reviewed here supersedes either source.

### 4.2 Certified capability

Certified capability:

- ORION Version 1 Structural Representation through Expression and Vertical
  Slice IV certification;
- terminal certified STOP: `at_slice_iv_certified`.

The following are not certified by that baseline:

- Runtime;
- Gateway;
- NEXAHEDRON;
- public HTTP transport;
- Human session;
- Orientation Record;
- presentation;
- reasoning or semantic interpretation.

### 4.3 Implemented capability

Implemented in NEXAHEDRON:

- transient Workspace;
- Human operations and Rest;
- bounded USGS Encounter and exact fragments;
- explicit ORION confirmation;
- public transport and contract rendering;
- visible failure and clarification behavior.

Implementation does not grant Library, semantic, Research, certification, or
Human authority.

### 4.4 Curated reference content

The five public Orientation Cases are repository-authored, source-linked
reference content. Their current implementation proves presentation, not
Library canonicality or scientific certification.

### 4.5 Bounded experiment

The live Workspace is a bounded Human-interface experiment. Its current public
ORION path can reach clarification and visible Runtime failure. It is not a
general completed service.

### 4.6 Active research

Under the adopted Research Architecture:

- the Open Orientation Protocol is active research supporting the subordinate
  Open Systems/Rails question;
- Memory and Language Evolution remains research unless adopted by its owning
  authority;
- evaluation protocols and adapter governance proposals remain research or
  proposals according to their owning status.

### 4.7 Historical lineage

The README explicitly marks the earlier Alpha integration sequence as
historical. Historical records should remain intact and visibly non-current.

### 4.8 Open research horizon

The following remain horizon, not public capability:

- replaceable AI, search, retrieval, solver, RL, or model participation;
- LYRA and SIRIUS implementation;
- shared Orientation Memory;
- automatic Language evolution;
- production Library evidence binding;
- Compare, Connect, Explore, Build, and Reflect as executable modes;
- multi-source or domain-general Encounter.

## 5. ORION authority review

### 5.1 What the live system may say

The live system may truthfully say:

- NEXAHEDRON can send an explicitly confirmed bounded request to an external
  ORION Gateway;
- the Gateway returns versioned public contracts;
- NEXAHEDRON renders those contracts without repairing them;
- the tested live path reached clarification and then a valid public Runtime
  error;
- the immutable clarification-lineage limitation remains visible;
- the Human-held Workspace remained available around that outcome.

### 5.2 What the live system may not imply

It may not imply:

- that the HTTP request itself is certified by the ORION Version 1 baseline;
- that every public Runtime outcome is a certified Slice IV result;
- that ORION interprets the Human question;
- that ORION provides Human meaning, recommendation, or decision;
- that a clarification or Runtime error is an Orientation Report;
- that NEXAHEDRON authored an ORION contract;
- that the current public path has Library Evidence.

### 5.3 Required visible distinctions

Every future public result presentation should make these fields legible:

- producer or owning authority;
- contract type and version;
- operational status;
- certified artifact reference when one exists;
- whether the content is Human-authored, source-authored, curated,
  Runtime-produced, or certified;
- current STOP or blocker;
- effects (`none` in the current path).

## 6. Human authority review

The Workspace generally protects Human authority well:

- no operation advances without an explicit Human action;
- relationship, boundary, uncertainty, turn, and Reflection are Human-authored;
- Rest is optional;
- ORION transmission requires a separate review and confirmation;
- the system does not automatically turn fragments into Evidence;
- the system does not write an answer into Reflection.

Two wording issues remain:

1. `Orientation Record` currently describes transient mutable state rather than
   the immutable reviewed record defined by RFC-0011.
2. `You can stop without losing the work` does not disclose that reload or tab
   closure loses the state.

Correcting these statements would strengthen rather than weaken the Human
boundary.

## 7. Library and case review

The current local case collection has editorial value. The conflict is not
that it exists; it is how authority is named.

The Constitution allows NEXAHEDRON to present works and source material. It
does not allow presentation to acquire:

- Work or Edition identity;
- canonical publication status;
- collection authority;
- Library provenance;
- Evidence authority.

The smallest safe classification is:

```text
Curated Reference Cases
→ Human-authored NEXAHEDRON presentation
→ external source references remain source-owned
→ no Library canonicality claimed
```

If the cases later receive canonical NEXAH Library Work and Edition identities,
NEXAHEDRON may present those exact identities as a read-only projection. That
future possibility is not implemented or authorized by this review.

## 8. Required decisions before adoption

The accompanying Architecture Alignment Draft must not be adopted until:

1. Library governance decides AC-01 through AC-03;
2. NEXAH/Framework/OLS governance decides AC-04 and AC-05;
3. evidence owners decide AC-08 and AC-09;
4. the Human record terminology in AC-06 and AC-07 is resolved;
5. cross-ecosystem canonical copies in AC-10 through AC-13 receive one
   canonical home and explicit derivation status;
6. ORION output ownership and certification language in AC-14 and AC-15 are
   accepted by the ORION owner;
7. any resulting implementation occurs as a separate, reviewable change.

## 9. Non-resolutions

This review deliberately does not:

- rename routes;
- remove cases or research;
- reclassify documents in place;
- select a new Library architecture;
- adopt either RFC;
- change the ORION dependency;
- modify Runtime, Gateway, or Core behavior;
- introduce persistence;
- add a provider or model;
- create a product promise;
- decide scientific validity;
- authorize deployment.

## 10. Evidence ledger

Repository refs and source paths are recorded in
`NEXAHEDRON_ARCHITECTURE_ALIGNMENT_DRAFT.md`, section 13.

The most relevant controlling and evidentiary sources are:

- `NEXAH/GOVERNANCE/ECOSYSTEM_CONSTITUTION.md`
- `NEXAH/ARCHITECTURE/NEXAH_RESEARCH_ECOSYSTEM_ARCHITECTURE.md`
- `NEXAH-ORION/docs/releases/ORION_V1_CERTIFIED_BASELINE.md`
- `NEXAH-ORION/docs/architecture/ORION_SYSTEM_PLATE.md`
- `NEXAHEDRON/README.md`
- `NEXAHEDRON/docs/architecture/AUTHORITY_BOUNDARIES.md`
- `NEXAHEDRON/docs/architecture/APPLICATION_ARCHITECTURE.md`
- `NEXAHEDRON/docs/EDITORIAL_STRATEGY.md`
- `NEXAHEDRON/docs/WEBSITE_EXPERIENCE.md`
- `NEXAHEDRON/docs/rfcs/RFC-0001_OPEN_ORIENTATION_PROTOCOL.md`
- `NEXAHEDRON/docs/rfcs/RFC-0011_ORIENTATION_MEMORY_AND_LANGUAGE_EVOLUTION.md`
- `NEXAHEDRON/docs/integration/ORION_V1_LIVE_INTEGRATION.md`
- NEXAHEDRON public pages and live Workspace observed on 2026-07-30

## 11. Final review status

The current implementation is a credible Human-facing bounded experiment.
Its strongest architectural correction is not new functionality. It is honest
separation of:

- curated reference content;
- transient Human Workspace state;
- source-authored material;
- ORION-authored public contracts;
- certified ORION capability;
- open research horizon.

Until the blocking authority decisions are made, this review and the alignment
draft remain explicitly non-canonical.
