# Adapter Participation Beta 0.1 Future Implementation Plan

- Status: **PROPOSED — NOT AUTHORIZED**
- Purpose: separate future implementation plan
- Prerequisite: explicit acceptance of the complete governance package

No step in this document may begin before the acceptance decision is recorded
and the proposed canonical amendments are reviewed separately.

## 1. Governance freeze

Record accepted versions of:

- Orientation Adapter Architecture;
- Adapter contracts;
- LYRA participation boundary;
- Contribution Margin amendment;
- Human Material Policy;
- security controls;
- Beta 0.1 roadmap amendment.

STOP if any ownership, privacy, provider-retention, or contract question remains
unresolved.

## 2. Contract-only implementation

Implement immutable models and fail-closed validators for:

- Adapter Descriptor;
- Orientation Context;
- Contribution Request;
- Contribution;
- Contribution Bundle;
- Human Decision;
- Disclosure and Consent Record.

Add deterministic identity, integrity, canonical serialization, excess-field
rejection, and negative authority tests. No provider execution.

## 3. Context projection and disclosure

Project only the allowed Plate Tectonics session fields into an immutable
context. Implement the exact disclosure view and one-time consent record.
Prove that Reflection, unrelated Workspace state, ORION data, credentials, and
private diagnostics cannot enter the context.

No provider execution.

## 4. Contribution Margin and Human decisions

Add the distinct review surface with inert proposal rendering, provenance,
limitations, staleness, and all five Human decisions. Implement `merge` only
for explicitly authorized Human-owned targets with full lineage.

No provider execution.

## 5. Server-side adapter transport

Implement one isolated endpoint with:

- server-only credentials;
- allow-listed adapter identity and version;
- strict request and response validation;
- one-call STOP;
- timeout and cancellation;
- size limits;
- content-free ordinary logs;
- no fallback;
- provider response integrity preservation;
- distinct failure categories.

Do not connect it to ORION transport.

## 6. One registered intelligence adapter

Implement one provider behind the provider-neutral interface. Provider-specific
request construction and response extraction remain private. Request exactly
one Observation, one Open Question, and one Suggested Source.

Do not add SDKs unless the accepted implementation review explicitly selects
one. Do not implement another provider.

## 7. Real vertical-slice proof

Execute:

```text
What is Plate Tectonics?
  → existing USGS Source Surface
  → two Human-kept fragments
  → exact disclosure
  → Human consent
  → one real provider invocation
  → three valid proposals
  → Human decisions
  → Rest
  → STOP
```

A mock, fixture, recorded response, or contract-only test cannot satisfy this
proof. Provider failure must remain a truthful failed proof.

## 8. Verification

Required focused checks:

- context minimization and integrity;
- consent binding and revocation before transmission;
- contract and unexpected-field rejection;
- exactly-one-of-each contribution type;
- context and provenance mismatch rejection;
- inert rendering and unsafe URL handling;
- stale-contribution behavior;
- no automatic merge;
- no Reflection, ORION, Evidence, or Library mutation;
- credential absence from client bundles and logs;
- timeout, cancellation, malformed output, and unavailable provider;
- cross-session isolation;
- mobile, keyboard, and screen-reader review;
- complete browser acceptance through Rest.

Then run the full repository verification.

## 9. Review and freeze

Compare executed behavior with the accepted roadmap. Record real limitations,
provider declarations, and the exact tested versions. Freeze Beta 0.1 only if
all acceptance criteria pass.

Do not begin another adapter, contribution type, source resolver, Library
adapter, persistence layer, LYRA implementation, or ORION integration.
