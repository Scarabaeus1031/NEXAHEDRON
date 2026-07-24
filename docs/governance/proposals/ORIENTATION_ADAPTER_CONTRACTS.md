# Orientation Adapter Contracts

- Status: **PROPOSED — NOT ACCEPTED**
- Contract family: Adapter Participation Beta 0.1
- Runtime authority: none
- ORION effects: none

This document defines conceptual contracts for governance review. It defines no
serialization schema or executable model.

## 1. Shared rules

Every issued object is immutable, versioned, canonically serializable, and
bound to an integrity reference. Unknown values remain explicitly `unknown`;
they are never inferred. Unsupported versions, missing required fields,
unexpected fields, identity conflicts, and integrity mismatches fail closed.

Public Orientation contracts contain no provider-specific configuration.

## 2. Adapter Descriptor

Required declarations:

- `adapter_id`;
- `adapter_version`;
- `descriptor_contract_version`;
- `adapter_kind`;
- `capabilities`;
- `permissions`;
- supported context versions;
- supported contribution versions;
- transport locality;
- provider identity disclosure rule;
- lifecycle state;
- integration trust status;
- registration authority;
- integrity reference.

The descriptor grants no permission by itself. Invocation permissions are the
intersection of registered permissions, the Contribution Request, disclosed
context fields, and Human consent.

## 3. Orientation Context

### 3.1 Required fields

- `context_id`;
- `context_contract_version`;
- exact Human question;
- explicit Human intent;
- current Workspace phase;
- active Source identity and version;
- Source provenance;
- exactly the Human-kept fragments disclosed for this invocation;
- disclosed Human-authored relationships;
- explicit included and excluded boundaries;
- permitted contribution types;
- permitted operations;
- integrity reference;
- disclosure statement identity;
- creation timestamp.

Each fragment preserves source identity, source version, exact locator, exact
text, representation type, and fragment identity.

### 3.2 Forbidden fields

- unrelated session history;
- hidden classifications or inferred topics;
- ORION private or public execution data;
- credentials or provider configuration;
- editable references to Human-owned fields;
- private diagnostics;
- undisclosed material;
- psychological, demographic, or behavioral inference;
- Reflection unless the Human separately and explicitly discloses exact text;
  Beta 0.1 does not permit that disclosure.

### 3.3 Identity and minimization

`context_id` identifies the complete immutable disclosed payload. Any field
change creates a different context identity and requires new consent. The
context contains only what the selected contribution types require. The server
must validate the context independently of the browser and reject excess data.

## 4. Contribution Request

Required fields:

- request identity and contract version;
- exact context identity and integrity;
- exact adapter identity and version;
- permitted contribution multiset;
- maximum contribution count;
- maximum output size;
- invocation identity;
- consent-record identity;
- explicit STOP after one response.

Beta 0.1 requests exactly:

- one `observation`;
- one `open_question`;
- one `suggested_source`.

No tools, retries, follow-up turns, background tasks, or adapter delegation are
permitted.

## 5. Contribution

### 5.1 Required fields

- `contribution_id`;
- `contribution_contract_version`;
- exact context identity and integrity;
- `contribution_type`;
- inert textual content;
- author or system identity;
- adapter identity and version;
- provider identity when available, otherwise `unknown`;
- model identity and version when available, otherwise `unknown`;
- provider execution reference when available, otherwise `unknown`;
- timestamp;
- confidence declaration or `unknown`;
- ordered provenance;
- traceability to exact disclosed context fields or fragments;
- status `proposed`;
- limitations;
- staleness rule.

`suggested_source` additionally requires a declared external reference, display
title when available, the stated reason for suggestion, and resolution status
`unresolved`.

### 5.2 Invariants

- Contributions are proposals, never answers or Evidence.
- A contribution cannot claim Human, Library, ORION, or source authority.
- Traceability may name only exact context fields or fragment identities.
- Confidence is the contributing system's declaration, not NEXAH confidence.
- Content is inert and cannot contain executable presentation.
- A changed context marks the contribution stale.

## 6. Contribution Bundle

Required fields:

- bundle identity and contract version;
- exact Contribution Request reference;
- exact context reference;
- adapter and provider declarations;
- ordered contribution identities;
- raw-response integrity reference;
- completion timestamp;
- outcome status;
- limitations;
- bundle integrity.

Beta 0.1 accepts a bundle only when it contains exactly the three requested
types once each and no additional contribution or field.

## 7. Human Decision

Required fields:

- decision identity and contract version;
- exact contribution identity and integrity;
- exact context identity;
- Human-owned decision type;
- timestamp;
- optional exact Human note;
- optional merge target and selected content only for `merge`;
- lineage reference;
- decision integrity.

Semantics:

- `accept`: record usefulness; no Workspace mutation.
- `reject`: record non-use or disagreement; no Workspace mutation.
- `merge`: copy Human-selected content into one explicit Human-owned field and
  preserve complete lineage.
- `discard`: remove from active local review; no semantic mutation.
- `postpone`: retain undecided within the current session.

The adapter cannot issue or alter a Human Decision.

## 8. Disclosure and consent record

The immutable record contains:

- disclosure identity and version;
- adapter, provider, model, and locality declarations;
- exact context fields and byte counts;
- stated purpose;
- provider retention declaration;
- NEXAHEDRON logging and local retention statements;
- sensitive-material warning;
- timestamp;
- Human consent decision;
- exact context identity;
- integrity.

Consent applies only to the named invocation. It is not a standing provider
permission.

## 9. Source resolution contract

The future conceptual request contains an external reference, expected source
domain, requested representation, and Human approval. The result contains:

- verified or explicitly unresolved source identity;
- version or `unknown`;
- identity domain;
- source owner;
- provenance;
- access and licensing declarations;
- bounded Encounter-compatible Source Surface identity;
- integrity;
- resolution limitations.

It contains no summary, Evidence, ranking, claim, or semantic annotation.
Beta 0.1 does not execute this contract.

## 10. Library adapter contract

The future read-only adapter accepts exact Library identities and may return
Library-authoritative Sources, Evidence objects, or Collections. It preserves
their identities, versions, provenance, access, and authority exactly.

It cannot create, repair, promote, rank, mutate, or write any Library object.
It cannot treat a Contribution as Library authority. Beta 0.1 does not
implement this contract.

## 11. STOP boundary

```text
Orientation Context
  → Contribution Request
  → Contribution Bundle
  → Human Decisions
  → Rest
  → STOP
```

No contract in this family invokes ORION, mutates Reflection, creates Evidence,
opens a source, or authorizes another invocation.
