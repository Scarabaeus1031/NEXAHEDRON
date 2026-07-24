# ORION Version 2 Contract Planning

- Status: Architectural planning assessment
- Question: whether a new ORION public contract major version is justified
- Frozen baseline: ORION Public Contract Suite Version 1.0
- Decision scope: contract necessity only
- Effects: none

## 1. Purpose

This document distinguishes limitations of the current ORION Version 1
implementation and integration from limitations of the published Version 1
contract language.

A missing implementation, transport, registry, choreography step or governance
decision does not justify a new public contract. A new major contract is
justified only when an approved public behavior cannot be expressed without
changing the meaning, required shape, identity or invariants of a frozen
Version 1 object.

This document does not design Version 2, select its version number, approve its
implementation or modify Version 1.

## 2. Decision test

Every limitation is evaluated in this order:

1. **Implementation** — can conforming behavior be added behind the existing
   public objects?
2. **Choreography** — can existing public objects be exchanged with the
   required prior contract graph or lifecycle context?
3. **Governance** — can ownership, identity allocation or policy be decided
   without changing public object semantics?
4. **Documentation** — is the behavior already expressible but insufficiently
   explained?
5. **New public contract** — does the required behavior need a new public
   identity, field, relationship or invariant that Version 1 cannot represent?

Only the fifth result is a Version 2 requirement. A convenient redesign is not
enough.

## 3. Version 1 contract inventory

The frozen suite contains six public contracts.

| Contract | Version 1 role | Relevant identity |
|---|---|---|
| Orientation Request | only public input that begins orientation; preserves Human intention, Scope, objects and lineage references | `request_id + request_version` |
| Clarification Result | structured readiness result with ordered Human actions and retained context | `result_id + result_version` |
| Evidence Reference | immutable composite source, authority, provenance, relationship and report-traceability record | `evidence_id + evidence_version` |
| Orientation Report | only successful or Processing-blocked terminal report; binds exact request, evidence and continuations | `report_id + report_version` |
| Continuation Option | immutable report-derived next-action proposal with preserved context and Request Delta | `option_id + option_version` |
| Runtime Error | mutually exclusive public non-report outcome and required consumer behavior | `error_id + error_version` |

Together they define one lifecycle:

```text
Orientation Request
→ Contract Validation
→ Clarification Required or Ready
→ Processing
→ Orientation Report or Runtime Error
→ zero or more report-derived Continuation Options
```

Transport envelopes, Gateway invocation parameters, storage, registries,
sessions and provider protocols are not public contracts in this suite.

## 4. Immutable Version 1 guarantees

Any future work MUST preserve these Version 1 guarantees for Version 1 objects:

1. Human intention, Scope and consequential decisions remain Human-owned.
2. Each public object has an immutable identity/version pair.
3. Request, clarification, report, evidence and continuation lineage is exact.
4. Clarification Required is distinct from Invalid and Blocked.
5. A blocked Runtime Error is distinct from a blocked Orientation Report.
6. Evidence class, relationship, validation, authority and confidence remain
   separate concepts.
7. Countering and limiting evidence remain first-class.
8. Every Version 1 Evidence Reference contains one relationship and non-empty
   traceability to exact report content.
9. `evidence_id + evidence_version` identifies the complete Version 1 Evidence
   Reference payload.
10. A Continuation Option originates from exactly one report and preserves
    evidence, provenance, Scope, objects and Human authority.
11. Unknowns and unavailable capabilities remain visible.
12. Consumers do not repair, reinterpret or promote public outcomes.
13. Providers, prompts, internal planning and transport details remain private.
14. Effects remain `none`.
15. Historical Version 1 reports and their contract graphs remain valid under
    Version 1 semantics forever.

A later major version MUST NOT retroactively reinterpret these guarantees.

## 5. Version 1 limitations

### 5.1 Classification summary

| Limitation | Primary resolution | New public contract required? |
|---|---|---:|
| clarified request cannot complete through the current stateless Gateway invocation | choreography and Gateway implementation | no |
| continuation request needs its prior report and option graph | choreography and Gateway implementation | no |
| only Understand executes | Runtime implementation | no |
| no Library retrieval, ingestion or evidence selection | Library and Runtime implementation under existing authority | no by itself |
| current evidence binding requires a pre-completed composite Evidence Reference | internal choreography for report-specific Version 1 evidence | no by itself |
| reusable Library-issued source evidence must remain independent of ORION report binding | new public identity and binding semantics | **yes** |
| globally portable evidence identity across multiple Libraries lacks an explicit issuer/domain | new public identity semantics | **yes**, if federation is required |
| no public Evidence Reference supersession or expiration relation | Library governance or an external lifecycle registry | no, unless ORION must expose it as public evidence behavior |
| Atlas read-only opening and visualization | consumer/Atlas implementation | no |
| first-class Atlas authority, mutation or relationship publication | separate Atlas governance and contracts | not necessarily an ORION major version |
| no HTTP, persistence, authentication, session or streaming contract | transport/application implementation | no |
| no provider integration | Runtime implementation behind the boundary | no |
| generic mode payload model has incomplete executable validation for future modes | validator and Runtime implementation against frozen Operator specifications | no unless public payload meaning changes |
| no public Library content-transfer object | separate content/access boundary | no evidence-contract change proven |
| no LYRA explanation contract | separate LYRA boundary | no ORION Version 2 requirement proven |

## 6. Implementation-solvable issues

### 6.1 Clarification lineage

Version 1 already expresses all required public semantics:

- a Clarification Result identifies the exact originating request;
- a revised Orientation Request carries `clarification_of`;
- retained context and changed Human values remain traceable;
- cross-contract validation requires the exact prior Clarification Result.

The current failure occurs because `OrientationGateway.handle` validates a
contract graph that does not include the prior Clarification Result. The schema
does not lack lineage; the invocation lacks context.

This can be solved without changing a public contract by a compatible
choreography that supplies or resolves the prior immutable contract graph.
Whether that context is passed per invocation or resolved by an implementation
is not public contract semantics.

**Classification:** choreography and implementation. Not a Version 2
requirement.

### 6.2 Continuation lineage

Version 1 already identifies:

- the exact Continuation Option and source report in `continuation_of`;
- the exact preserved context;
- the Request Delta;
- the Human confirmations required;
- the exact prior report and evidence lineage.

A stateless invocation that omits the source report and Continuation Option may
fail cross-contract validation for the same reason as clarification. Supplying
the existing graph is sufficient; no new public meaning is needed.

**Classification:** choreography and implementation. Not a Version 2
requirement.

### 6.3 Additional Orientation Operators

All seven modes already exist in the Orientation Request vocabulary. Their
behavior and structured output requirements are governed by the frozen
Orientation Operators specification, while the report mode payload is already
mode-discriminated.

Implementing Wonder, Compare, Connect, Explore, Build or Reflect does not by
itself require new contracts. A future implementation must first prove whether
the existing payload and validation rules are sufficient. Missing Runtime code
is not a contract defect.

**Classification:** implementation. Not a Version 2 requirement.

### 6.4 Retrieval, ingestion and evidence selection

Version 1 deliberately does not define Library retrieval, ingestion, search,
ranking or source-content transport. These are external capabilities. They may
produce or resolve public evidence declarations without exposing their
internal mechanisms.

Their absence is an implementation limitation. It becomes a contract issue
only at the source-evidence/report-binding ownership boundary described in
Section 7.

**Classification:** implementation and governance. Not independently a Version
2 requirement.

### 6.5 Report-specific Version 1 evidence completion

If evidence is accepted as a report-specific composite object, an authorized
ORION pre-binding choreography could create relationship and traceability before
the complete Version 1 Evidence Reference is issued. The final object could
still conform to Version 1.

The current Runtime and Gateway expose no such stage, so this would require
ORION implementation work. It would not require changing the final public
Version 1 shape.

This option does not provide reusable Library-owned evidence identity and is
not the selected long-term evidence architecture. Nevertheless, it proves that
the circular sequencing problem alone is not sufficient justification for a
new public contract.

**Classification:** choreography and implementation for report-specific
composites. Not independently a Version 2 requirement.

### 6.6 Evidence currency, withdrawal and expiration

Version 1 preserves the declared evidence state used by a historical report.
It does not contain a generic evidence supersession or expiration pointer.

A Library can maintain current source state, withdrawal and successor
relationships in an independently governed registry while historical Version
1 objects remain unchanged. NEXAHEDRON may display separately resolved current
state without rewriting the report.

A new ORION public contract becomes necessary only if an approved requirement
demands that this current lifecycle state participate in ORION validation or
observable report behavior. That requirement has not been demonstrated.

**Classification:** governance and implementation. No current Version 2
requirement.

### 6.7 Transport, deployment and session concerns

HTTP, serialization, authentication, persistence, history, caching, streaming,
retry infrastructure and production availability do not change the meaning of
the six public contracts. They can preserve exact objects and failure
distinctions through replaceable adapters.

**Classification:** implementation. Not a Version 2 requirement.

### 6.8 Provider and reasoning implementations

Provider selection, prompts and private reasoning strategies are intentionally
absent from the public suite. OpenAI, Claude, Llama, local systems and
rule-based implementations may conform without adding public provider fields.

**Classification:** implementation. Not a Version 2 requirement.

## 7. Contract-level issues

### 7.1 Independent source evidence and report binding

The approved Evidence Binding Architecture requires two independently issued
authority objects:

- reusable source-side evidence issued by a Library or named source authority;
- report relationship and traceability issued by ORION.

Version 1 cannot represent that separation because:

- `relationship` is required inside every Evidence Reference;
- non-empty report `traceability` is required inside every Evidence Reference;
- `evidence_id + evidence_version` identifies the combined payload;
- the same source used with another relationship requires a distinct evidence
  identity;
- Orientation Reports reference only the composite evidence identity;
- no public identity exists for an independently reusable source-evidence
  record or report binding.

Removing the report fields, splitting the identity or changing what the report
references changes required fields, identity semantics and cross-contract
invariants. Those are breaking public changes.

**Classification:** new public contract required if the approved production
Library boundary is to become executable.

### 7.2 Multiple-Library evidence identity

Version 1 scopes source identity through `identity_domain`, but
`evidence_id` itself has no explicit issuing authority or identity domain.
Within one controlled contract graph this is manageable. Across independent
Libraries, identical opaque IDs can collide and a recipient cannot determine
the issuer from the evidence identity alone.

Governance can allocate a single global namespace, but that would centralize
all Libraries and weaken the stated portability objective. Prefix conventions
would be undocumented semantics rather than contract guarantees.

If multiple independent Libraries must issue portable reusable source-evidence
identities, issuer/domain qualification must become public identity semantics.
That cannot be added while claiming the existing Version 1 identity has the
same meaning.

**Classification:** new public contract required when federated Library
issuance is an approved requirement.

### 7.3 One contract-level problem, not two unrelated redesigns

The binding split and issuer-qualified Library identity are coupled. A future
contract effort should treat them as one evidence-boundary requirement:

> represent a reusable, issuer-qualified source-evidence identity separately
> from an ORION-issued binding to exact report content.

Evidence portability and multiple-Library support are consequences of this
requirement, not independent reasons to redesign all six contracts.

## 8. Candidate Version 2 changes

The following are candidate change areas only. They are not schemas or an
approved design.

| Candidate area | Why Version 1 cannot express it | Minimum planning obligation |
|---|---|---|
| source-side evidence identity | Version 1 identity includes ORION report fields | define an independently immutable, issuer-qualified source-evidence concept |
| report evidence binding | Version 1 has no separate ORION-owned binding identity | represent relationship and exact report traceability without mutating source evidence |
| report evidence references | Version 1 reports reference composite Evidence References | preserve exact source evidence and binding lineage in report validation |
| federated issuer identity | `evidence_id` has no issuer/domain | prevent cross-Library collision and authority ambiguity |
| cross-contract publication | report paths and bindings must validate together | preserve atomic or otherwise reproducible immutable publication |
| Version 1 historical representation | existing composite objects cannot be reinterpreted | define side-by-side compatibility without silent decomposition |

No other reviewed limitation currently meets the major-version test.

## 9. Areas that do not currently justify Version 2

### 9.1 Future Atlas integration

Version 1 already permits an `open_atlas` Continuation Option and preserves
versioned Representation and Evidence Reference identities. A read-only Atlas
view can consume these references without changing ORION.

Atlas mutation, publication, canonical relationship ownership or a first-class
Atlas object requires separate Atlas governance. It may require an Atlas public
contract, but it does not automatically require a new ORION contract suite.

No current Atlas requirement demonstrates a breaking ORION change.

### 9.2 LYRA explanation

LYRA may faithfully explain existing public fields. A future LYRA explanation
envelope can remain an external companion contract unless it changes ORION's
observable result. No such change is currently required.

### 9.3 Evidence content and access

An Evidence Reference deliberately does not contain or grant access to source
content. Content delivery, credentials, licensing and restricted-source access
belong to external source and Library boundaries. Adding content to the ORION
evidence contract would collapse responsibilities rather than fix a Version 1
limitation.

### 9.4 Report presentation

Different visualizations, evidence panels, summaries and accessibility views
derive from existing public fields. Presentation quality is not contract
semantics.

## 10. Compatibility strategy

If a future major evidence boundary is authorized, compatibility must be
side-by-side rather than reinterpretive.

1. Version 1 remains frozen and supported as its own complete language.
2. Every Version 1 object continues to validate only under Version 1 rules.
3. Existing composite Evidence References remain atomic historical records.
4. A future consumer discriminates by exact contract major version before
   mapping or validation.
5. A Version 1 report never points to a future binding unless an explicit new
   report contract authorizes it.
6. A future report never treats a Version 1 composite as reusable source
   evidence merely by copying fields.
7. Gateways reject unsupported major versions visibly; they never coerce them.
8. Providers and internal Runtime strategies remain irrelevant to
   compatibility.
9. Version 1 and a future major may coexist for different sessions.
10. Migration is opt-in and produces new immutable identities where required.

## 11. Migration principles

These principles govern future planning without defining a migration format:

- preserve every Version 1 identity, version and payload unchanged;
- preserve the exact Version 1 report/evidence graph used historically;
- do not split a Version 1 composite automatically, because its source-side and
  report-side issuance authorities were not independently identified;
- do not reuse Version 1 `evidence_id` as a future source-evidence or binding
  identity;
- require explicit issuer authority for any newly created source-evidence
  identity;
- require ORION to issue every newly created report binding;
- record any governed derivation from a Version 1 object as new provenance;
- never promote `unknown`, `unverified` or unavailable evidence during
  migration;
- keep Version 1 clarification, reports, continuations and errors valid without
  forced conversion;
- prove cross-version traceability before claiming migration support.

## 12. Non-goals

This planning document does not:

- design Version 2 contracts or fields;
- choose a release number or schedule;
- modify Version 1 specifications, models, validators, Runtime or Gateway;
- approve a Library implementation;
- approve a binding adapter or pre-binding service;
- implement clarification or continuation choreography;
- define Atlas, LYRA, LUCY or Library contracts;
- add Orientation Operators;
- define transport, persistence, authentication or deployment;
- reopen accepted authority boundaries;
- infer requirements from speculative future features.

## 13. Recommendation

### 13.1 Finding

A new ORION public contract major version is **not justified as a general
successor to Version 1**. Most known limitations are implementation,
choreography, governance or external-boundary concerns.

A new major evidence contract boundary **is justified conditionally** for one
approved ecosystem requirement:

> production Library integration must provide reusable, independently portable,
> issuer-qualified source evidence while ORION alone owns immutable
> relationship and report traceability.

Version 1 cannot express that requirement without breaking its Evidence
Reference identity, required fields and Orientation Report cross-references.

### 13.2 Decision threshold

Version 2 planning should proceed only when the production Library requirement
is formally approved and at least these conditions are accepted:

1. source evidence must be reusable across reports;
2. multiple independent Libraries must be able to issue portable identities;
3. ORION must issue report bindings without mutating Library records;
4. Version 1 composite records must remain historically valid;
5. consumers are prepared to support explicit major-version discrimination.

Until then:

- keep Version 1 frozen;
- resolve clarification and continuation through Version 1-compatible
  choreography;
- implement additional Version 1 Operators only against existing contracts;
- keep Atlas, transport, persistence and providers outside the contract-change
  argument;
- do not begin Version 2 implementation.

The evidence boundary is sufficient to justify a focused future major-version
planning phase, but not a redesign of ORION or its complete public language.
