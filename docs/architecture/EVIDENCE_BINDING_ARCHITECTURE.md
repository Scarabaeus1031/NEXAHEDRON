# NEXAH Evidence Binding Architecture

- Status: Canonical governance decision
- Scope: binding source-side evidence to exact Orientation Report content
- Applies to: Library, ORION, NEXAHEDRON and every future evidence integration
- Frozen baseline: ORION Public Contract Suite Version 1.0
- Effects: none

## 1. Purpose

This document resolves one ownership question:

> Where do evidence relationship and report traceability belong?

The answer is authoritative:

- source-side evidence declarations and their reusable identity belong to the
  Library or named source authority;
- relationship and report traceability belong to ORION;
- these declarations MUST become immutable independently;
- no Library, Gateway, transport adapter or consumer may complete an
  ORION-owned declaration;
- no ORION process may mutate a Library-issued source-side record.

This is a governance architecture. It does not amend the frozen Version 1
contracts or authorize implementation.

Normative terms **MUST**, **MUST NOT**, **SHOULD**, **SHOULD NOT** and **MAY**
have their conventional architectural meaning.

## 2. Current contradiction

The frozen `orion.evidence-reference/1.0` object contains both:

1. source-side declarations: source identity, source version, authority,
   evidence class, provenance, validation and access; and
2. report-side declarations: `relationship` and non-empty `traceability` to an
   exact report identity, version and target path.

The authority rules assign the first group to source or Library authorities and
the second group to ORION. Yet the Version 1 Gateway and Runtime receive only a
complete, already valid `EvidenceReference`. They do not expose a public step
in which ORION can add the report-side fields before execution.

Therefore all of the following cannot simultaneously be true in the current
public execution choreography:

- a Library issues the complete Evidence Reference before ORION receives it;
- ORION alone creates relationship and report traceability;
- the issued Evidence Reference is immutable;
- the Gateway and consumer remain translation-only boundaries.

This is a contract choreography limitation, not permission to redistribute
authority.

## 3. Frozen-contract analysis

Version 1 establishes the following facts:

- `relationship` is required and has exactly one of `supports`, `counters`,
  `contextualizes` or `limits`;
- `traceability` is required, non-empty and names exact `report_id`,
  `report_version` and `target_path` values;
- `evidence_id + evidence_version` identifies the whole immutable payload,
  including relationship and traceability;
- report validation requires every referenced Evidence Reference to trace to
  the exact report version and an existing public report path;
- the Runtime filters evidence before report creation using its predicted
  report identity;
- the Gateway accepts and validates complete Evidence References but owns no
  evidence semantics;
- there is no public source-evidence candidate, binding request, binding result
  or report-binding contract.

Consequently, a partial Version 1 Evidence Reference is invalid. Calling it a
draft, candidate or Library reference does not make it a public Version 1
object.

The fact that current report identity is deterministic does not transfer
relationship or traceability authority. Predictability is not ownership.

## 4. Evaluated options

### 4.1 Option A — two-stage Version 1 issuance

Under Option A, the final public object remains the Version 1 Evidence
Reference. A first stage would hold source-side declarations; ORION would add
relationship and traceability; an issuer would then seal the complete object.

#### Ownership

- Source and Library authorities create source, authority, provenance,
  validation and access declarations.
- ORION creates relationship and traceability.
- A registry assigns final `evidence_id + evidence_version` only after both
  authorities have supplied their declarations.
- Any participant may store the sealed object without acquiring authority over
  its fields.

#### Lifecycle

The pre-binding value cannot be a Version 1 Evidence Reference because required
fields are absent. It must be an internal non-public object. The complete
Evidence Reference becomes immutable only after ORION binding and final
issuance.

Reuse in another report requires another completed Version 1 record because
traceability changes. A different relationship requires a distinct evidence
identity under the frozen contract.

#### Identity

The final identity is report-specific. Source identity may be reused, but the
whole Evidence Reference cannot be reused unchanged across reports. Changed
relationship requires a new identity. Changed traceability requires at least a
new immutable evidence version; using a new identity is safer because the
record now represents a distinct report use.

#### Reproducibility

A sealed Version 1 object can reproduce the exact historical relationship and
target. The pre-binding object cannot independently serve as the portable
Library identity unless another governed identity model exists.

#### Portability

Libraries can exchange the final composite record, but each record carries
ORION report semantics. Exchanging it does not transfer ORION authority.
Source-side reuse remains indirect because the reusable source declaration has
no public Version 1 identity of its own.

#### Contract compatibility

The final payload is compatible with the frozen Version 1 schema. The required
choreography is not compatible with the current Version 1 Gateway and Runtime
surface: ORION has no pre-binding operation and consumes only completed
Evidence References.

Making Option A executable therefore requires either:

- a new internal ORION pre-binding process and non-public input object; or
- a new public choreography contract.

The first changes ORION behavior. The second changes the public contract suite.
Neither is permitted in this sprint.

#### Failure behavior

- An incomplete first-stage value is never published as an Evidence Reference.
- Unsupported relationship prevents sealing.
- Missing target path prevents sealing or report publication.
- A Library-authored relationship is rejected as an authority violation.
- A conflicting sealed record is not overwritten; correction requires new
  identity or version.

#### Assessment

Option A minimizes public schema change but preserves a composite identity that
mixes reusable source declarations with report-specific use. It also requires
an ORION capability absent from Version 1. It is not selected.

### 4.2 Option B — source evidence plus report binding

Option B separates two immutable public concepts:

1. **Source Evidence Reference** — a reusable, Library- or source-authority
   issued record containing no report relationship or report traceability.
2. **Report Evidence Binding** — an ORION-issued record that binds one exact
   Source Evidence Reference version to one relationship and one or more exact
   targets in one Orientation Report version.

These names describe the required future concepts. They do not create new
Version 1 public contracts.

#### Minimal conceptual shape

A future Source Evidence Reference requires only:

- its own identity and version;
- exact source and fragment identity;
- source/editorial authority;
- evidence class;
- ordered provenance;
- validation and access declarations.

A future `ReportEvidenceBinding` requires only:

- binding identity and version;
- exact Source Evidence Reference identity and version;
- one ORION-owned relationship;
- exact report identity and version;
- one or more exact target paths;
- optional finding identity;
- binding validation sufficient to prove the referenced paths exist.

No source content is duplicated in the binding.

#### Ownership

- The Library or named source authority issues Source Evidence Reference
  identity and declarations.
- ORION issues `ReportEvidenceBinding` identity, relationship and traceability.
- ORION validates the binding against its exact report.
- Libraries and consumers may store either immutable object but do not acquire
  its issuing authority.

#### Lifecycle

The Source Evidence Reference becomes immutable when its source-side
declarations are issued. It can exist before any Orientation Report.

ORION creates a binding only when exact report identity, version and public
target paths are known. The binding and report are publishable only when their
cross-references validate together. Neither object is later mutated.

The same source-side record may be used in any number of reports. Each use has
its own binding.

#### Identity

- A source-side change creates a new Source Evidence Reference version or
  identity according to its issuing authority's declared policy.
- A changed relationship creates a new binding identity or binding version;
  it does not change the source-side evidence record.
- A changed report identity, report version, target path or finding creates a
  new binding identity or version.
- A new report use always has a distinct binding, even when relationship and
  source evidence are unchanged.

#### Reproducibility

An old report resolves the exact binding version. That binding resolves the
exact source-side evidence version. The pair reproduces both what the source
authority declared and how ORION used it without merging their authority.

#### Portability

Libraries may exchange Source Evidence References without carrying or
acquiring ORION report authority. A Library may preserve a binding as a foreign
ORION-issued record, but MUST NOT edit, reissue or reinterpret it.

#### Contract compatibility

Option B cannot be represented faithfully by the frozen Version 1 contract:
Version 1 requires relationship and traceability inside the Evidence Reference,
and Orientation Reports reference that composite identity.

Public execution of Option B requires a future major contract revision that:

- introduces a source-side evidence contract;
- introduces `ReportEvidenceBinding`;
- changes the Orientation Report evidence section and cross-contract
  validation to reference bindings and exact source evidence versions; and
- updates Runtime and Gateway public behavior to consume and return those
  contracts.

This is explicitly future contract work. It is not approved or implemented by
this document.

#### Failure behavior

- Source evidence resolves but binding does not: the source remains valid and
  reusable, but it is not evidence for that report. The report exposes an
  evidence-binding gap or blocks according to existing operator policy.
- Relationship is unsupported: the binding is invalid and is not issued.
- Traceability targets a missing report path: report and binding publication
  fail cross-validation; neither is silently repaired.
- A Library returns report-specific fields as its own declarations: the input
  is rejected at the authority boundary.
- ORION encounters an existing conflicting binding: it does not overwrite it;
  a corrected immutable binding identity or version is required.

#### Assessment

Option B gives every declaration exactly one owner, permits natural reuse and
preserves independent immutability. Its required future major version is an
honest contract consequence rather than adapter complexity. It is selected.

### 4.3 Option C — alternative minimal model

No third model improves the boundary.

Making the Orientation Report itself carry relationship maps would merely hide
a report binding inside another contract and leave evidence identity ambiguous.
Treating relationship as Library metadata violates authority. Treating
traceability as derived presentation violates reproducibility. Allowing the
Gateway to join source and report declarations creates duplicated ORION
semantics.

Option C is therefore unnecessary.

## 5. Decision

**Option B is the canonical evidence-binding architecture.**

Source-side evidence and report-side binding are separate authority objects.
The Library or source authority owns and issues the reusable source-side
identity. ORION alone owns and issues relationship and report traceability in a
distinct immutable binding. NEXAHEDRON and the Gateway only transport and
present the resulting public objects.

This decision does not retroactively redefine `EvidenceReference` Version 1.
The Version 1 object remains the frozen composite contract. Its current
Runtime behavior remains unchanged.

The consequence is explicit: a conforming production Library adapter MUST NOT
be connected to the Version 1 evidence input by manufacturing complete
Evidence References. The canonical split becomes executable only through a
separately governed future major contract and corresponding ORION release.

## 6. Canonical ownership table

| Declaration or action | Sole authority | May validate | May store | Must not do |
|---|---|---|---|---|
| source content and native version | external source | source authority; Library within declared checks | source; Library when permitted | ORION must not claim ownership |
| source/fragment resolution | Library or named resolver | Library | Library; portable recipients | NEXAHEDRON must not repair it |
| source evidence identity/version | Library or named source-evidence issuer | issuer; receiving Library for conformance | any authorized custodian | ORION must not mutate it |
| editorial authority declaration | named editorial authority | Library within named domain | any authorized custodian | inclusion must not promote it |
| evidence class | declared source, derivation or proposal owner | Library and ORION for compatibility | any authorized custodian | ORION must not silently reclassify it |
| report relationship | ORION | ORION binding validation | ORION; Library or consumer as foreign immutable record | Library, Gateway and consumer must not originate it |
| report identity, target path and finding reference | ORION | ORION report/binding cross-validation | ORION; authorized custodians | Library must not predict and claim it |
| binding identity/version | ORION | ORION | any authorized custodian | no custodian may rewrite it |
| faithful presentation | NEXAHEDRON | consumer conformance checks | optional session state | must not infer evidence semantics |
| meaning, sufficiency and decision | Human | Human | Human-controlled context | must not rewrite issued records |

Storage is custody, not semantic ownership.

## 7. Canonical binding lifecycle

1. An external source issues or exposes an exact source state.
2. A Library resolves source, version and fragment within its declared domain.
3. The responsible authorities declare provenance, evidence class, validation,
   access and editorial status.
4. The source-side evidence issuer assigns immutable source evidence identity
   and version.
5. ORION uses that exact version within the Human-confirmed Scope.
6. ORION creates report content and determines the relationship of the source
   evidence to exact public target paths.
7. ORION assigns immutable binding identity and version.
8. Report and binding cross-validate as one publication graph.
9. ORION publishes the immutable report and binding together.
10. NEXAHEDRON transports and presents both without interpretation.
11. The Human inspects source authority, evidence state, relationship and gaps.
12. Later source or report changes create new source evidence, binding or
    report versions; historical objects remain unchanged.

Steps 4 and 7 are independent issuance events. No actor mutates the other
actor's issued object.

## 8. Identity and version rules

1. Source identity, source evidence identity, binding identity and report
   identity are distinct.
2. Each identity/version pair identifies one immutable payload.
3. A Source Evidence Reference may exist with zero, one or many bindings.
4. Every binding references exactly one source evidence identity/version and
   exactly one report identity/version.
5. A binding may contain multiple target paths only when they share the same
   relationship and report version.
6. A different relationship requires a different binding.
7. Reuse in another report requires a different binding.
8. Changing a source-side declaration never mutates a binding; a new source
   evidence version and new binding are required for prospective use.
9. Correcting report content never retargets a binding; a new report and new
   binding version or identity are required.
10. Local database identifiers never replace public identities.

## 9. Validation rules

### 9.1 Source evidence validation

The Library or named authority validates only its declared domain:

- identity and version resolution;
- source and fragment integrity;
- provenance order and visible loss;
- authority and access declarations;
- evidence-class prerequisites.

It does not validate report relationship or report paths.

### 9.2 Binding validation

ORION validates:

- supported relationship vocabulary;
- exact source evidence identity and version resolution;
- exact report identity and version;
- existence of every target path in that report version;
- compatibility between evidence class, relationship and target;
- uniqueness and immutability of binding identity/version;
- preservation of countering and limiting relationships.

### 9.3 Publication validation

An evidence-bound report is publishable only when:

- every referenced binding validates;
- every binding points back to that exact report version;
- every binding's source evidence resolves exactly;
- every substantive finding has a valid binding or an explicit evidence gap;
- no Library or consumer-authored report semantics are present.

Validation failure never authorizes metadata repair.

## 10. Failure model

| Condition | Classification | Required behavior |
|---|---|---|
| source evidence identity does not resolve | missing evidence | do not bind; preserve identity and expose the gap |
| source evidence resolves but no binding exists | missing binding | source record remains valid; report does not claim evidential use |
| unsupported relationship | binding validation failure | reject binding; do not substitute a similar relationship |
| missing report or report version | binding validation failure | do not issue binding |
| target path does not exist | report/binding cross-validation failure | publish neither as a valid bound pair |
| Library supplies ORION-owned relationship or traceability | authority-boundary violation | reject; do not adopt or repair the declaration |
| ORION changes Library-owned source declarations | authority-boundary violation | reject publication |
| same binding identity/version has another payload | identity conflict | reject both as the same resolved object; require governance review |
| later source access is unavailable | continuity condition | preserve historical reference; show current access separately when governed |
| binding exists but source version is unavailable | evidence availability gap | preserve binding history; do not present source as inspectable |

Public error representation remains governed by the applicable contract
version. This document does not add Runtime Error kinds.

## 11. Historical reproducibility

A historical report is reproducible when an authorized resolver can recover:

- exact report identity and immutable report payload;
- exact binding identities and immutable binding payloads;
- exact source evidence identities and immutable source-side payloads;
- exact source, fragment, authority and provenance versions;
- the relationship and exact public target paths used at publication;
- validation and access states declared at issuance;
- all explicit unknowns, limitations and counterevidence.

Later withdrawal, supersession or access change does not rewrite any of these
objects. Current state may be shown alongside history only as a separately
owned, separately versioned declaration.

## 12. Multiple-Library portability

A Source Evidence Reference is portable independently of any report binding.
An importing Library may:

1. preserve it exactly under its original identity and authority;
2. create a new source evidence identity with explicit import provenance; or
3. refuse it with an explicit reason.

It MUST NOT reuse the original identity for a changed payload.

A Report Evidence Binding remains an ORION-issued foreign record. A Library may
store and resolve it for historical inspection, but does not validate its
report semantics or acquire authority to rebind it. Using the same source
evidence in another ORION report creates a new ORION binding.

Federation, storage layout and exchange protocol remain implementation choices.

## 13. Version 1 compatibility

### 13.1 What remains valid

- The frozen Version 1 Evidence Reference, validators, Runtime and Gateway
  remain unchanged.
- Existing validated Version 1 reports and their composite Evidence References
  remain historically valid.
- A Version 1 Evidence Reference remains immutable and report-specific in
  practical use because its payload contains report traceability.

### 13.2 Unavoidable limitation

The current Version 1 public boundary cannot accept a reusable Library-issued
source evidence object and then let ORION create a separate binding. It accepts
only a complete composite Evidence Reference.

Accordingly:

- Version 1 can consume a complete Evidence Reference only when its ORION-owned
  relationship and traceability were already established by an authorized
  ORION process;
- the current Version 1 Runtime and Gateway expose no such establishment step;
- no future Library adapter may impersonate that missing ORION step;
- a normal production Library integration is blocked at this boundary;
- blocked reports remain the faithful Version 1 outcome when no legitimately
  pre-bound evidence is available.

This limitation MUST NOT be hidden by an adapter, deterministic report-ID
prediction, fixture, metadata default or post-publication mutation.

## 14. Future contract implications

Making the selected model executable requires a separately governed major
public contract release. At minimum that release must explicitly define:

- a reusable source-side evidence contract;
- `ReportEvidenceBinding` as an ORION-owned public contract;
- binding identity, version and cross-reference invariants;
- Orientation Report references to binding identities;
- atomic or otherwise reproducible report/binding publication semantics;
- contract graph validation across report, binding and source evidence;
- compatibility and migration treatment for Version 1 composite Evidence
  References.

This required change is named **Evidence Binding Contract Major Revision**.
Its version number, schemas and implementation are not decided here.

No Version 1 field may be repurposed to simulate this split.

## 15. Canonical invariants

1. Source-side evidence has one source or Library authority.
2. Relationship has exactly one owner: ORION.
3. Report traceability has exactly one owner: ORION.
4. Source evidence identity and report binding identity are distinct.
5. Each authority issues and freezes its own object.
6. No subsystem mutates another authority's issued object.
7. Storage never transfers semantic authority.
8. A source-side evidence record can exist before a report.
9. Every report use creates an exact report binding.
10. A changed relationship creates a new binding, not changed source evidence.
11. Historical reports preserve exact source evidence and binding versions.
12. Libraries exchange source evidence without acquiring ORION authority.
13. NEXAHEDRON, Gateway and transport never create binding semantics.
14. Missing binding remains visible; it is never inferred.
15. Version 1 limitations remain explicit and are never repaired by adapters.
16. The future split requires major contract governance.

## 16. Open governance questions

These questions must be resolved only when the future major contract is
authorized:

1. Which identity domain issues globally portable source evidence identities?
2. Must each target path have its own binding, or may one relationship bind an
   ordered target set?
3. What publication protocol makes report and binding issuance reproducible
   without requiring mutable records?
4. How are Version 1 composite Evidence References represented during a future
   migration without changing their historical meaning?
5. Which authority publishes current access or withdrawal state alongside an
   immutable historical source evidence version?
6. How are bindings exchanged across independent ORION installations while
   preserving issuer identity?

None of these questions reopens the ownership decision.

## 17. Non-goals

This architecture does not define or authorize:

- a Library implementation or adapter;
- a new public contract in the current release;
- changes to ORION Version 1 Runtime, Gateway or validators;
- ingestion, retrieval, search, ranking or indexing;
- persistence, federation or transport protocols;
- evidence-selection algorithms;
- provider, prompt or reasoning behavior;
- NEXAHEDRON workarounds;
- Atlas mutation;
- source-content ownership transfer;
- automatic authority or confidence promotion.

No Library implementation may begin by bypassing this decision. The next
implementation milestone requires an explicitly authorized contract baseline
that can represent the selected boundary.
