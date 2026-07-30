# RFC-0001 — The Open Orientation Protocol

- Category: Architecture specification
- Current status: Active research
- Previous status: Canonical in the NEXAHEDRON repository (preserved for
  lineage)
- Authority: no ecosystem-wide protocol authority without adoption by the
  responsible owners
- Version: 1.0
- Date: 2026-07-24
- Implementation status: independent of any implementation
- Runtime effect: none

## Abstract

The Open Orientation Protocol defines how Humans, Sources, Libraries,
orientation kernels, language systems, applications, and external participants
exchange bounded orientation material without transferring authority.

The protocol defines a common state model, ownership boundaries, immutable
context, proposed contributions, Human decisions, and provenance requirements.
It does not define a provider, user interface, storage system, reasoning model,
or transport.

The protocol is designed to remain meaningful when any particular model,
provider, application, or implementation is replaced.

## Conformance language

The terms **MUST**, **MUST NOT**, **REQUIRED**, **SHOULD**, **SHOULD NOT**, and
**MAY** indicate protocol requirements.

A system conforms only to the responsibilities it declares. Implementing one
role does not grant authority assigned to another role.

## 1. Why Orientation?

Humans work across documents, papers, books, datasets, conversations, search
engines, Libraries, software systems, and artificial-intelligence services.
These systems expose different identities, representations, provenance models,
and authority claims.

Access to information does not by itself establish:

- which material addresses the Human's question;
- which source or version is being considered;
- which fragments were actually inspected;
- which relationships were authored, declared, or inferred;
- which system produced a statement;
- what remains uncertain;
- who accepted a proposal;
- whether a later expression preserved the original boundaries.

The resulting problem is not simply information retrieval. It is navigation
between heterogeneous knowledge systems without losing context, source
ownership, provenance, or Human judgment.

The Open Orientation Protocol provides a shared boundary for that navigation.
It permits independent systems to cooperate while keeping their
responsibilities distinguishable.

## 2. Goals

The protocol has the following goals:

1. preserve Human ownership of intention, meaning, acceptance, and decisions;
2. preserve source identity, version, ownership, and context;
3. preserve Library authority over Library-issued Sources, Evidence objects,
   and Collections;
4. preserve deterministic orientation authority where an orientation kernel
   is used;
5. represent external-system output as proposed contributions rather than
   truth;
6. make every contribution, fragment, decision, and transformation traceable;
7. disclose and minimize every context transmitted to an external system;
8. support explicit unknowns, uncertainty, limitations, and unavailable
   states;
9. permit providers and intelligence systems to be replaced without changing
   the Orientation State;
10. support independent implementations through versioned contracts;
11. separate protocol semantics from transport, storage, presentation, and
    provider configuration;
12. fail closed when identity, integrity, authority, provenance, permission,
    or contract compatibility cannot be established.

## 3. Non-goals

The Open Orientation Protocol is not:

- an artificial-intelligence system;
- a search engine;
- a knowledge graph;
- a note-taking application;
- a Library;
- a database;
- an assistant;
- a source of truth;
- a recommendation authority;
- a decision-making system;
- a user-interface specification;
- a transport protocol;
- a provider-selection mechanism.

The protocol does not require semantic reasoning, automated retrieval,
ranking, generated language, persistence, synchronization, or a specific
orientation kernel.

## 4. Constitutional Authorities

The protocol separates authority by responsibility. The names below identify
the current NEXAH roles. A different implementation MAY use different names,
but it MUST preserve equivalent separation.

### 4.1 Human

The Human owns:

- the question;
- intention and purpose;
- permission to disclose material;
- Human-authored relationships and Reflection;
- acceptance or rejection of proposals;
- meaning;
- the decision to merge, continue, rest, or act.

No protocol participant may impersonate a Human decision or silently rewrite a
Human-owned value.

### 4.2 Library

The Library owns declarations within its stated domain, including:

- Library Source identity and version resolution;
- Library-issued Evidence objects;
- Collections;
- editorial authority declarations;
- Library provenance, validation, access, and custody.

The Library does not own Human meaning, orientation-kernel navigation, or
report-specific relationships assigned to another authority. Source ownership
remains with the Source or its declared owner; Library custody does not
transfer it.

### 4.3 ORION

ORION names the deterministic orientation-kernel authority in the NEXAH
ecosystem. Within its certified and declared boundary, it owns navigation,
validation, orientation artifacts, reports, and continuations.

The protocol does not require every implementation to use ORION. A conforming
alternative kernel MUST declare its scope and MUST NOT acquire Human, Library,
Source, or language authority merely by processing protocol objects.

### 4.4 LYRA

LYRA names the faithful Human-language and orientation-assistance role.
LYRA may translate or propose language within an accepted contract. It does
not own the underlying structured orientation, select Evidence
autonomously, decide meaning, or become synonymous with a model provider.

A provider may support LYRA through an adapter. The provider is not LYRA.

### 4.5 NEXAHEDRON

NEXAHEDRON is the first Human-facing reference implementation of the protocol.
It owns its Laboratory interaction, presentation, and local session flow.

NEXAHEDRON is not the protocol. Its routes, visual composition, state
management, and deployment choices are not protocol requirements.

### 4.6 External Participants

External participants include intelligence, retrieval, source-resolution,
knowledge, and specialist systems. They may receive only an explicitly
permitted Orientation Context and may return only contract-valid
contributions.

External participants have contribution authority only. They do not acquire
Human, Library, ORION, LYRA, Source, Reflection, Evidence, or decision
authority.

### 4.7 Separation invariant

Authority does not follow data flow. Receiving, storing, transforming, or
presenting an object does not transfer authority over its declarations.

Every protocol object MUST identify the authority responsible for each
declaration whose ownership is material to later use.

## 5. Orientation State

The conceptual Orientation State progresses through:

```text
Question
        ↓
Context
        ↓
Encounter
        ↓
Contribution
        ↓
Decision
        ↓
Rest
```

This order defines responsibility boundaries. It does not require separate
pages, a wizard, or a linear user interface.

### 5.1 Question

The Question records what the Human is trying to orient. It provides the
purpose against which later material is selected and bounded.

The Question is Human-owned. A system may propose alternative wording, but only
the Human may adopt it.

### 5.2 Context

Context records the exact bounded state permitted to participate in one
operation. It identifies the question, declared intent, active material,
boundaries, permissions, and relevant Human-authored structures.

Context exists so that no participant receives an undefined or unlimited
session.

### 5.3 Encounter

Encounter gives the Human access to actual source material in its identifiable
context. The Human may inspect it and keep exact fragments without converting
those fragments into Evidence.

Encounter exists because orientation cannot be based solely on titles,
metadata, or uninspectable references. Material encountered by the Human may
produce a new version of Context through an explicit Human-approved
transition.

### 5.4 Contribution

A Contribution is a bounded proposal returned by a participant. It remains
separate from source content, Evidence, Reflection, kernel output, and
Human-authored state.

Contribution exists so that an external system can participate without its
output being adopted automatically.

### 5.5 Decision

A Decision records the Human's disposition of one Contribution. The decision
may accept, reject, merge, discard, or postpone the proposal.

Decision exists because usefulness and meaning cannot be assigned by the
contributing system.

### 5.6 Rest

Rest records that the Human considers the current orientation sufficient for
now. It does not claim certainty, truth, completion, or agreement.

Rest exists to prevent continuation, provider invocation, or kernel execution
from becoming compulsory. Only the Human decides whether orientation
continues.

### 5.7 Transition invariant

Every state transition MUST be attributable to:

- an explicit Human action;
- a contract-valid operation within one declared authority; or
- a separately recorded external contribution.

No transition may silently transfer authority or erase the preceding immutable
record.

## 6. Orientation Context

An Orientation Context is the complete, bounded disclosure for one operation.
It is never equivalent to “everything available to the model.”

### 6.1 Immutability

Context MUST be immutable after approval because permission and traceability
refer to the exact disclosed payload. A changed field creates a new context
identity and requires a new approval when external disclosure is involved.

### 6.2 Minimization

Context MUST contain only the fields required for the permitted operation.
Unrelated history, hidden classifications, credentials, private diagnostics,
undisclosed material, and implicit psychological inference MUST NOT be
included.

### 6.3 Versioning and identity

Context MUST declare:

- a contract version;
- an immutable context identity;
- an integrity reference;
- the identities and versions of included Sources and fragments;
- the permitted operations and contribution types;
- the disclosure under which it was approved.

Identical identifiers MUST NOT resolve to different context payloads.

### 6.4 Disclosure

Before external transmission, the Human MUST be able to inspect:

- the receiving participant;
- execution locality;
- every transmitted field;
- the operation requested;
- stated retention and logging conditions;
- relevant limitations and sensitive-material warnings.

Use of an Orientation application does not imply consent to external
transmission.

### 6.5 Human approval

Remote or local intelligence participation MUST begin through an explicit
Human invocation. Approval applies only to the named context, participant, and
operation. It is not a standing permission.

## 7. Contributions

Participants do not return protocol truth. They return proposed
Contributions.

RFC-0001 defines three initial Contribution types.

### 7.1 Observation

An Observation identifies something the participant proposes the Human notice
in the disclosed Context.

It MUST identify its contextual basis and limitations. It does not assert that
the observation is complete, authoritative, or true.

### 7.2 Open Question

An Open Question proposes a question that may clarify a boundary, uncertainty,
relationship, or missing condition.

It does not require an answer and MUST NOT rewrite the Human's Question.

### 7.3 Suggested Source

A Suggested Source proposes an external source path and states why it may be
relevant to the disclosed Question and boundaries.

It remains unresolved until a separately authorized source-resolution action
occurs. It is not Encounter material, a Library Source, or Evidence merely
because it was suggested.

### 7.4 Why the initial types are weak

The initial types are intentionally limited. They may direct attention without
claiming conclusion, authority, or action.

Stronger types such as findings, claims, recommendations, Evidence,
instructions, or decisions require separate authority and are not defined by
this RFC.

### 7.5 Contribution requirements

Every Contribution MUST preserve:

- immutable identity and contract version;
- exact Context identity and integrity;
- Contribution type;
- author or system identity;
- adapter identity and version;
- provider and model identity when available, otherwise explicit `unknown`;
- timestamp;
- confidence declaration or explicit `unknown`;
- provenance;
- traceability to exact Context fields or fragments;
- status `proposed`;
- limitations;
- staleness behavior.

A Contribution MUST NOT mutate Orientation State by itself.

## 8. Human Authority

The protocol defines five Human Decisions.

### 8.1 Accept

`accept` records that the Human considers the Contribution useful. It does not
modify any Human-owned Orientation field.

### 8.2 Reject

`reject` records that the Human does not adopt the Contribution. It does not
alter the historical Contribution.

### 8.3 Merge

`merge` is the only Decision that copies selected Contribution content into a
named Human-owned field.

The resulting Human-owned value MUST:

- result from an explicit Human action;
- preserve complete lineage to the originating Contribution;
- remain distinguishable from the original proposal;
- create a new state version rather than rewriting history.

Merge does not convert a Suggested Source into Evidence or transfer provider
authority to the Human-owned field.

### 8.4 Discard

`discard` removes a Contribution from the active review surface under the
applicable session and retention policy. It does not rewrite the historical
origin or claim provider-side deletion.

### 8.5 Postpone

`postpone` leaves the Contribution undecided. It produces no Orientation
change.

### 8.6 Decision invariant

Only the Human may issue a Human Decision. A participant, application,
language layer, Library, or kernel MUST NOT accept, reject, merge, discard, or
postpone on the Human's behalf.

## 9. Provenance

Provenance records how a protocol object came into being. It is distinct from
confidence, correctness, popularity, and authority.

### 9.1 Required traceability

The protocol requires traceability for:

- every Source identity and version;
- every encountered representation;
- every exact fragment and locator;
- every Context disclosure and approval;
- every adapter invocation;
- every external-system response;
- every Contribution;
- every Human Decision;
- every merge into a Human-owned value;
- every kernel artifact that participates through a separate accepted
  contract.

### 9.2 Ordered provenance

Provenance MUST be ordered and MUST identify:

- input identities and versions;
- output identity and version;
- responsible participant;
- applicable contract version;
- transformation or operation performed;
- declared lossiness;
- timestamp or ordered event reference;
- known gaps and unknowns.

### 9.3 Preservation

Later presentation, storage, export, or merge MUST NOT erase origin,
limitations, or intermediate authority boundaries.

When provenance cannot be established, the object MUST remain unverified or be
rejected according to its contract. A fluent result MUST NOT substitute for
missing provenance.

Provenance is more important than fluency because fluency cannot establish
identity, ownership, permission, or reproducibility.

## 10. Replaceable Intelligence

The protocol depends on contracts, not model brands.

An intelligence participant receives the same bounded Orientation Context and
returns the same class of Contribution Bundle regardless of whether its private
implementation uses:

- OpenAI;
- Anthropic Claude;
- Google Gemini;
- Ollama;
- a local Llama-family model;
- a specialist scientific system;
- a future system not yet defined.

Provider-specific credentials, prompts, sampling parameters, tool
configuration, reasoning traces, and transport details MUST remain outside
public Orientation contracts.

Replacing a provider MUST NOT require:

- rewriting Human-owned Orientation State;
- changing Source or fragment identity;
- changing Human Decision semantics;
- changing Library or kernel authority;
- reinterpreting previous Contributions;
- weakening provenance or disclosure.

A local system has the same authority limits as a remote system. Locality may
change disclosure and retention conditions; it does not change protocol roles.

The protocol survives provider replacement because intelligence is a
participant, while Orientation State and authority boundaries remain stable.

## 11. Reference Implementations

The protocol is separate from software that implements it.

```text
Open Orientation Protocol
        ↓
Orientation Kernel
        ↓
Reference Implementation
        ↓
Applications and Domain Integrations
```

### 11.1 Protocol

The protocol defines roles, contracts, transitions, authority, provenance, and
conformance requirements. It contains no application workflow or provider
implementation.

### 11.2 Kernel

An Orientation Kernel performs deterministic responsibilities defined by its
own certified boundary. ORION is the NEXAH orientation kernel. Kernel
participation does not transfer Human, Source, Library, language, or
application authority.

The protocol remains useful when a session does not invoke a kernel.

### 11.3 Reference implementation

NEXAHEDRON is the first reference implementation. It demonstrates one
Human-facing Workspace, Encounter, Contribution review, Decision, Rest, and
optional kernel boundary.

NEXAHEDRON-specific routes, components, visual language, and state mechanisms
are not normative.

### 11.4 Applications

Other conforming implementations may appear in:

- integrated development environments;
- web browsers;
- research software;
- medical systems;
- educational software;
- scientific notebooks;
- local tools;
- AI assistants.

Domain regulation, professional responsibility, safety controls, and Evidence
requirements remain additional constraints. Protocol conformance does not
certify domain fitness.

## 12. Design Principles

### 12.1 Human First

Intention, meaning, consent, Decisions, and Rest remain Human.

### 12.2 Boundaries Before Features

Every new capability requires an owner, permitted inputs, permitted outputs,
and explicit exclusions before execution.

### 12.3 Evidence Before Interpretation

Evidence identity, authority, provenance, and limitations remain visible.
Contributions do not become Evidence through use or repetition.

### 12.4 Provenance Before Fluency

An untraceable fluent statement is not a conforming substitute for a bounded,
traceable Contribution.

### 12.5 Explicit Over Implicit

Context, permission, uncertainty, transformation, authority, and Decisions are
declared rather than inferred.

### 12.6 Replaceable Intelligence

Providers remain private, substitutable participants behind stable contracts.

### 12.7 Immutable History

Corrections and changes create new versions. They do not silently rewrite
prior Contexts, Contributions, Decisions, or certified artifacts.

### 12.8 Fail Closed

Missing identity, integrity, permission, provenance, authority, or contract
compatibility stops the affected operation.

### 12.9 Open Specification

Protocol behavior is inspectable and implementable without access to a
proprietary provider or application.

### 12.10 Small Verifiable Steps

Capabilities are added through bounded contracts and independently reviewable
transitions.

### 12.11 Unknown Remains Unknown

Missing information is represented as unknown, unavailable, or unresolved. It
is not replaced with a plausible default.

### 12.12 Authority Never Leaks

Transport, custody, processing, presentation, fluency, and acceptance do not
silently transfer authority.

## 13. Future RFCs

The following identifiers reserve subjects only. They define no current
contract or implementation authority.

| RFC | Reserved subject |
|---|---|
| RFC-0002 | Orientation Context |
| RFC-0003 | Source Surface |
| RFC-0004 | Encounter |
| RFC-0005 | Contribution |
| RFC-0006 | Adapter Participation |
| RFC-0007 | Library Protocol |
| RFC-0008 | Human Decision |
| RFC-0009 | Provenance |
| RFC-0010 | Orientation Grammar |

Each future RFC requires independent review. The reservation of an identifier
does not authorize implementation.

## 14. Closing

The Open Orientation Protocol treats orientation as shared infrastructure
rather than proprietary application behavior.

Its purpose is not to make machines smarter. Its purpose is to allow Humans
and independent systems to work from the same bounded, traceable Orientation
State without losing transparency, provenance, Source ownership, or Human
ownership of meaning.

No application is indispensable to that purpose. No provider owns the
protocol. Implementations may change while the authority boundaries and
exchange principles remain stable.
