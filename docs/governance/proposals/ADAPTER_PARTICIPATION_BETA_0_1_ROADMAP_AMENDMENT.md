# Adapter Participation Beta 0.1 Roadmap Amendment

- Status: **PROPOSED — NOT ACCEPTED**
- Relationship to Alpha roadmaps: additive post-Alpha milestone
- Implementation authority: none until explicit acceptance

## 1. Goal

Prove that one explicitly invoked, registered intelligence adapter can receive
one minimized Human-approved Orientation Context and return three immutable
proposals for Human review without acquiring Orientation authority.

## 2. Authorized vertical slice

```text
Human enters “What is Plate Tectonics?”
  → opens the existing bounded USGS Encounter
  → keeps two exact fragments
  → explicitly invokes one registered intelligence adapter
  → inspects the exact Orientation Context disclosure
  → confirms one external transmission
  → adapter receives that immutable context
  → adapter returns exactly:
      one Observation
      one Open Question
      one Suggested Source
  → Contribution Margin presents provenance and limitations
  → Human accepts, rejects, merges, discards, or postpones each proposal
  → Human continues to Rest
  → STOP
```

## 3. Dependencies

- accepted Orientation Adapter Governance Package;
- accepted Adapter contracts;
- approved Human Material Policy;
- completed adapter-specific security review;
- existing Plate Tectonics Encounter;
- one registered provider integration;
- provider credentials supplied through approved server-side secret handling;
- current provider retention and data-use disclosure reviewed before testing.

## 4. Deliverables

- one provider-neutral Adapter interface;
- one server-side registered intelligence adapter;
- immutable Orientation Context construction and validation;
- exact disclosure and per-invocation consent;
- strict Contribution Bundle validation;
- distinct Contribution Margin;
- five Human decision records;
- in-memory audit record;
- focused security, privacy, boundary, and browser acceptance tests;
- one real-provider vertical-slice proof.

## 5. Acceptance criteria

The milestone is complete only when:

1. the real Plate Tectonics path completes to Rest;
2. exactly two Human-selected fragments cross the disclosed boundary;
3. no undisclosed Workspace field is transmitted;
4. one real registered adapter returns exactly three permitted contributions;
5. provider/model identity or explicit `unknown` is visible;
6. every proposal preserves context, adapter, provider, timestamp, limitations,
   provenance, and traceability;
7. no proposal changes Workspace state without explicit Human `merge`;
8. Suggested Source remains unresolved and is never Evidence;
9. Reflection and ORION are not invoked or changed;
10. cancellation, timeout, malformed output, mismatch, unavailable provider,
    and denied consent fail closed;
11. ordinary logs contain no Human question, fragments, relationships, or
    contribution content;
12. browser and server tests prove no credential reaches the client;
13. replay preserves immutable stored records but does not trigger another
    provider call;
14. documentation matches executed behavior;
15. full repository verification is green.

## 6. Explicit non-goals

- ORION invocation or modification;
- LYRA implementation;
- Reflection mutation;
- automatic Question rewriting;
- automatic source opening;
- Evidence conversion or Library writes;
- generic source resolution or ingestion;
- automatic source ranking;
- retrieval loops;
- autonomous or multi-step agents;
- background execution;
- continuous provider access;
- cross-session memory or persistence;
- provider marketplace;
- provider fallback;
- multiple providers in one session;
- generalized adapters beyond the one proven intelligence path.

## 7. STOP

Beta 0.1 ends at Human Rest. Completion authorizes no additional adapter,
provider, source type, contribution type, persistence, or ORION connection.
