# NEXAHEDRON Orientation Adapter Governance Package

- Status: **PROPOSED — NOT ACCEPTED**
- Proposed milestone: Adapter Participation Beta 0.1
- Authority granted by this document: none until explicit Human acceptance
- Implementation status: not started
- ORION Runtime and Gateway effects: none

## 1. Governance readiness

The Orientation Adapter Framework is architecturally coherent, but the current
Alpha does not authorize it. Provider participation, a Contribution Margin,
external transmission of Human material, source resolution, and Library
adapters are absent or explicitly deferred.

The proposed boundary can preserve the existing constitution if and only if:

1. the Human explicitly invokes every external contribution;
2. the Human sees and confirms the exact disclosure before transmission;
3. the transmitted context is minimized, immutable, and versioned;
4. every returned contribution remains an immutable proposal;
5. no contribution mutates Reflection, Working Material, Encounter, Evidence,
   ORION input, or Rest state;
6. only a separate Human `merge` decision copies content into a Human-owned
   field;
7. provider identity never becomes Orientation authority;
8. source suggestions never become Sources or Evidence automatically;
9. ORION Version 1, Gateway, Runtime, Evidence Architecture, and Evidence
   Binding Architecture remain unchanged.

The package is therefore ready for governance review. It is not ready for
implementation until the acceptance statement in Section 14 is recorded.

## 2. Governance impact matrix

| Governing document | Current rule | Proposed change after acceptance | Reason | Authority affected | Implementation impact | Primary risk | Explicit acceptance |
|---|---|---|---|---|---|---|---|
| `AGENTS.md` | Providers and Library writes may not be introduced silently; protected boundaries require governance | No change to the rule; accepted AAA becomes the required authority record | Preserve repository discipline | all owners | implementation may proceed only after acceptance | feature prompt mistaken for authority | yes |
| `MANIFESTO.md` | Human meaning and decisions remain Human; evidence and uncertainty stay visible | No amendment | AAA is subordinate to these principles | Human | constitutional tests inherit these rules | provider fluency presented as authority | no |
| `APPLICATION_ARCHITECTURE.md` | no provider or Library adapter exists | Add a separately governed, server-side Adapter transport beside—not inside—the ORION transport | Make participation explicit without changing ORION | NEXAHEDRON transport only | one new isolated boundary | adapter confused with Gateway | yes |
| `AUTHORITY_BOUNDARIES.md` | provider SDKs forbidden; LYRA has no implementation; Library has no adapter | Add External Participant as non-authoritative and Contribution Margin as NEXAHEDRON presentation; retain all existing owners | Name participation without transferring authority | Human, LYRA, Library, NEXAHEDRON | typed contribution boundary | authority leakage | yes |
| `ORIENTATION_WORKSPACE_IMPLEMENTATION_CONTRACT.md` | Reflection has no suggestions or execution; Library Edge absent | Add a distinct Contribution Margin and explicit invocation/disclosure events; Reflection remains unchanged | Avoid disguising generated material as Reflection | Human and NEXAHEDRON | local proposal and decision state | generated text entering Human fields automatically | yes |
| `PLATE_TECTONICS_ENCOUNTER_ALPHA.md` | one fixed USGS source; no generic adapter | Permit that existing Source Surface as the only Beta input; no generic resolver is needed in the first slice | Reuse the proven Encounter | source authority and Human | no source ingestion in Beta 0.1 | source copy treated as Library authority | yes |
| `EVIDENCE_ARCHITECTURE.md` | Library owns source-side evidence; NEXAHEDRON never creates or selects Evidence | No amendment | Contributions and Suggested Sources are explicitly not Evidence | Library and ORION | contribution contract rejects evidence claims | proposal promoted to Evidence | no |
| `EVIDENCE_BINDING_ARCHITECTURE.md` | adapters cannot manufacture ORION relationship or traceability | No amendment | Beta stops before ORION and Evidence | ORION | none | contribution converted into binding semantics | no |
| `ORION_V2_CONTRACT_PLANNING.md` | provider protocols remain private; LYRA boundary remains separate | No amendment | Provider-neutral AAA is an external application boundary | LYRA and ORION | no public ORION contract change | provider metadata leaking into ORION contracts | no |
| `ORION_V1_LIVE_INTEGRATION.md` | only the ORION Gateway transport is executable | No amendment for Beta 0.1 | Adapter transport is separate and Beta never invokes ORION | ORION and NEXAHEDRON | independent route and failure states later | silent fallback into ORION | no |
| `NEXAHEDRON_ALPHA_EXECUTION_ROADMAP.md` | provider systems and connector ecosystems are deferred | Do not rewrite Alpha; add the separate post-Alpha Beta 0.1 amendment | Preserve the certified Alpha record | release governance | new milestone follows Alpha | history rewritten | yes |
| `ORIENTATION_WORKSPACE_ALPHA_ROADMAP.md` | AI assistance and retrieval are separately governed | Do not rewrite Alpha; reference the proposed post-Alpha milestone only after acceptance | Keep Alpha frozen | release governance | none in Alpha | milestone scope creep | yes |
| `NEXAH_LAUNCH_STRATEGY.md` | no hidden Human-material collection and no provider branding as identity | Add no current amendment; Beta release review must apply these gates | Existing launch principles already govern | Human and public communication | disclosure and audit UI required | hidden transmission or provider-led identity | no |
| Human material policy | no dedicated external-transmission policy exists | Adopt Section 11 before any hosted provider call | Consent cannot be inferred from Workspace use | Human | disclosure, cancellation, audit, deletion behavior | privacy breach | yes |
| Security baseline | no adapter-specific threat model exists | Adopt Section 12 and its pre-implementation controls | Source material is adversarial input | NEXAHEDRON transport | strict validation and rendering controls | injection, exfiltration, credential leakage | yes |

## 3. Proposed Orientation Adapter Architecture

### 3.1 Purpose and position

An Orientation Adapter is a replaceable boundary through which an external
system receives one explicitly disclosed `OrientationContext` and returns one
bounded `ContributionBundle`.

```text
Human-owned Workspace
  → explicit invocation
  → disclosure
  → explicit transmission consent
  → immutable Orientation Context
  → registered Orientation Adapter
  → external system
  → immutable Contribution Bundle
  → Contribution Margin
  → explicit Human decisions
  → Rest
```

The Adapter Framework does not sit inside ORION, Library, LYRA, Reflection, or
Encounter. It is a NEXAHEDRON-owned participation boundary around external
systems.

### 3.2 Adapter identity

Each registered adapter declares:

- immutable `adapter_id`;
- immutable `adapter_version`;
- `adapter_kind`: `intelligence`, `retrieval`, `source_resolution`,
  `knowledge_service`, or `local_model`;
- supported context and contribution contract versions;
- exact capabilities;
- least-privilege permissions;
- provider identity disclosure policy;
- lifecycle state;
- integration trust status;
- transport locality: `remote` or `local`;
- failure and retirement policy.

Adapter identity identifies the integration, not the provider's truthfulness.

### 3.3 Capabilities and permissions

Capabilities describe possible outputs. Permissions describe exact inputs and
operations allowed for one invocation. Beta 0.1 permits only:

- read the disclosed question, intent, current phase, source declaration,
  two Human-kept fragments, one Human relationship when present, and explicit
  boundaries;
- propose exactly one `observation`, one `open_question`, and one
  `suggested_source`;
- return provenance, limitations, and provider trace metadata.

It may not read unrelated state, write Workspace state, open a source, call
ORION, resolve Evidence, invoke another adapter, or continue in the background.

### 3.4 Registration and lifecycle

Registration is an explicit governance-controlled allow-list. Lifecycle states
are:

```text
proposed → registered → available → invoked → completed | failed | cancelled
registered | available → suspended → retired
```

Invocation states are records, not adapter authority. A provider timeout,
invalid output, consent withdrawal, or context mismatch fails closed.

### 3.5 Trust

Trust status applies only to:

- adapter identity and version;
- contract compatibility;
- credential isolation;
- transport path;
- provenance continuity;
- response preservation and validation.

**Trust certifies the integration and provenance chain. Trust does not certify
the truth of a contribution.**

No trust level changes a proposal into Evidence, Reflection, or an accepted
Human statement.

### 3.6 Provider neutrality

The stable conceptual interface is:

```text
contribute(
  OrientationContext,
  ContributionRequest
) → ContributionBundle
```

OpenAI, Anthropic, Gemini, Ollama, local Llama-family models, and specialist
systems remain private implementations behind that boundary. Provider-specific
configuration is forbidden in public Orientation contracts.

Ollama is a local provider path, not a role. Locality may reduce external
disclosure but does not relax invocation, provenance, model identity, contract,
Human review, or failure requirements.

### 3.7 Failure behavior

The adapter path distinguishes:

- unavailable adapter;
- denied or withdrawn consent;
- cancelled invocation;
- timeout;
- transport failure;
- unsupported contract version;
- malformed output;
- output outside permitted contribution types;
- context-reference mismatch;
- missing provenance;
- unverified provider identity.

No condition authorizes retry through another provider, response repair,
partial silent acceptance, or fabricated contributions.

## 4. Contribution Margin amendment

The Contribution Margin is proposed as one quiet review surface beside the
working material. It is not the Reflection Margin.

It owns only:

- explicit adapter invocation;
- exact disclosure preview;
- consent action;
- bounded loading and cancellation;
- immutable proposed-contribution display;
- provenance and limitations display;
- Human decision capture;
- unavailable and failure presentation;
- removal from the local session.

It does not:

- alter Question Anchor, Material Folio, Encounter, Reflection, or Rest;
- write an ORION request;
- present provider output as an answer;
- merge automatically;
- open Suggested Sources automatically;
- convert anything into Evidence.

The minimum visual unit is a provenance label followed by the proposed content,
limitations, and the five Human decisions. It must not resemble chat.

## 5. LYRA participation boundary

LYRA is the Human-facing orientation-assistance role. A provider is not LYRA.
An adapter is not LYRA. The Contribution Margin is not LYRA.

LYRA may eventually use an approved adapter to propose:

- alternative wording for a question;
- scope questions or missing context;
- source categories;
- specific Suggested Sources with a stated relation to the Human's declared
  question and boundaries;
- faithful Human language derived from already authorized material.

LYRA must never decide the question, select Evidence autonomously, modify
Reflection, claim truth, rank a source as objectively best, open a source,
invoke ORION, or adopt provider text as Human-authored.

Beta 0.1 does not implement LYRA. It proves only the lower-level provider-neutral
Contribution boundary. Any later LYRA implementation requires its own accepted
contract and certification boundary.

## 6. Source resolver boundary

The future contract is:

```text
external source reference
  → explicit resolution request
  → verified source identity
  → exact version or explicit unknown
  → provenance
  → bounded Encounter-compatible Source Surface
```

HTML, PDF, DOI, Wikipedia, GitHub, Markdown, image, and dataset resolvers may
later specialize this boundary. Resolution never creates Evidence, editorial
authority, summaries, rankings, or semantic annotations.

Beta 0.1 authorizes no generic resolver. It uses only the already implemented,
bounded USGS Plate Tectonics Source Surface.

## 7. Library adapter boundary

A future Library adapter is read-only. It may expose only Library-authoritative:

- Sources;
- Evidence objects;
- Collections.

It may not create Evidence from provider output, rewrite provenance, promote
Working Material, add ORION relationship or traceability, or write to the
Library in the first governed milestone.

Library implementation remains deferred because Beta 0.1 does not require it.

## 8. Server-side transport

The proposed adapter transport is separate from the ORION Gateway transport.
It must:

- keep provider credentials and provider SDKs out of browser components;
- begin only after explicit Human invocation and consent;
- transmit only the accepted immutable context;
- preserve the raw provider response in protected transient processing long
  enough to validate and map it;
- expose provider and model identity when available;
- apply explicit size, time, and contribution-count limits;
- support cancellation;
- fail closed;
- never fail over to another provider silently;
- keep ordinary logs free of raw Human or source material;
- keep transport metadata outside Orientation semantics.

Beta 0.1 remains in-memory. No cross-session archive is authorized.

## 9. Session synchronization

The following records are immutable once issued:

- disclosed Orientation Context;
- Contribution Request;
- raw-response integrity record;
- Contribution Bundle;
- each proposed Contribution;
- each Human Decision event.

The Workspace remains mutable under Human action. A `merge` creates a new
Human-owned value plus immutable lineage to the contribution; it never rewrites
the contribution. `accept`, `reject`, `discard`, and `postpone` do not change
the Workspace.

No background synchronization, collaboration, persistence, or cross-session
memory is authorized.

## 10. Human authority semantics

| Decision | Meaning | Workspace effect |
|---|---|---|
| `accept` | Human records the proposal as useful | none |
| `reject` | Human records disagreement or non-use | none |
| `merge` | Human explicitly copies selected contribution content into one named Human-owned field | new Human value with complete contribution lineage |
| `discard` | Human removes the proposal from the active local review surface | no semantic effect; audit treatment follows the Human material policy |
| `postpone` | Human leaves the proposal undecided in the current local session | none |

No decision converts a Suggested Source into Evidence. Opening it requires a
separate, approved source-resolution action.

## 11. Proposed Human Material Policy

### 11.1 Consent and disclosure

Workspace use is not consent. Before every remote invocation, the Human must
see:

- adapter, provider, and model identity when available;
- whether execution is remote or local;
- every transmitted field;
- the reason each field is needed;
- the permitted contribution types;
- stated provider retention expectations;
- NEXAHEDRON logging behavior;
- cancellation and failure behavior;
- a sensitive-material warning.

Consent is specific to one immutable context and one invocation. Editing the
context requires a new disclosure and consent. Consent may be withdrawn before
transmission; cancellation after transmission cannot promise provider-side
erasure.

### 11.2 Minimization, logging, and retention

- Transmit only fields in the accepted context contract.
- Never transmit unrelated history, credentials, private diagnostics, or
  undisclosed fields.
- Ordinary logs contain identifiers, timing, status, byte counts, and contract
  versions only—not question, fragments, source text, relationships, or
  contribution content.
- Beta 0.1 retains context, contributions, and decisions only in the current
  in-memory session.
- Provider retention is displayed as a provider declaration, never inferred.
- No analytics copy of Human material is authorized.

### 11.3 Deletion and audit

The Human may remove a contribution from the active session. Local removal
does not claim deletion by an external provider. A visible audit record must
show invocation identity, disclosure, provider/model declaration, time,
outcome, contribution identities, and Human decisions without exposing hidden
provider reasoning.

## 12. Proposed security review

| Threat | Minimum control before implementation approval |
|---|---|
| credential leakage | server-only secret storage; secret scanning; no secret in client bundle, logs, errors, fixtures, or contribution records |
| direct or indirect prompt injection | source and fragment text treated as untrusted quoted material; fixed system policy; no tools or follow-on actions; strict output contract |
| source-content exfiltration | explicit disclosure; exact allow-list; byte limits; no hidden context expansion |
| provider retention | provider declaration shown before consent; no unsupported deletion promise |
| malicious Suggested Source | inert text/URL display; scheme allow-list; no automatic fetch or open; visible unverified status |
| false provenance | adapter-signed or server-issued trace record; provider claims labeled as declarations; mismatch rejected |
| context mismatch | bundle must reference exact context identity and integrity; mismatch fails closed |
| replay | unique invocation identity; context binding; replay cannot create a new Human decision |
| stale contribution | context-version binding; changed context marks prior proposals stale and prevents merge without reconfirmation |
| oversized context or output | deterministic byte, fragment, field, and contribution-count limits |
| cross-session leakage | no shared mutable adapter state; session-scoped identifiers; isolation tests |
| client contract manipulation | server validates disclosure, context, permissions, and output independently |
| executable model output | render as inert text; escape markup; no HTML, Markdown execution, script, tool call, or URL auto-navigation |
| silent provider substitution | exact registered adapter and provider disclosed; substitution rejected or requires new consent |
| malicious or malformed adapter output | strict schema, exact vocabulary, unexpected-field rejection, no repair |
| background or recursive execution | one Human invocation equals one provider call; no adapter chaining, tools, retrieval loop, or automatic retry |

Implementation approval additionally requires negative tests for every row,
documented timeout and cancellation behavior, and a review of the chosen
provider's current retention controls.

## 13. Exact repository changes after acceptance

The governance proposal creates only these files:

- `docs/governance/proposals/ORIENTATION_ADAPTER_GOVERNANCE_PACKAGE.md`
- `docs/governance/proposals/ORIENTATION_ADAPTER_CONTRACTS.md`
- `docs/governance/proposals/ADAPTER_PARTICIPATION_BETA_0_1_ROADMAP_AMENDMENT.md`
- `docs/governance/proposals/ADAPTER_PARTICIPATION_BETA_0_1_IMPLEMENTATION_PLAN.md`

If accepted, a separate governance change would amend:

- `docs/architecture/APPLICATION_ARCHITECTURE.md`
- `docs/architecture/AUTHORITY_BOUNDARIES.md`
- `docs/architecture/ORIENTATION_WORKSPACE_IMPLEMENTATION_CONTRACT.md`
- the appropriate documentation or architecture index;
- `AGENTS.md` only if maintainers decide the accepted milestone needs an
  explicit implementation exception.

It would not amend:

- `MANIFESTO.md`;
- `docs/architecture/EVIDENCE_ARCHITECTURE.md`;
- `docs/architecture/EVIDENCE_BINDING_ARCHITECTURE.md`;
- ORION Version 1 contracts, Runtime, Gateway, pins, or integration records;
- historical Alpha roadmaps or proof documents.

## 14. Exact acceptance decision

Implementation authority exists only after the Human records this decision
without broadening it:

> I accept the Orientation Adapter Governance Package as the authority for
> Adapter Participation Beta 0.1, limited strictly to the approved Plate
> Tectonics vertical slice. All deferred capabilities remain unauthorized.

Acceptance freezes the contracts and boundaries named in this package for that
milestone. It does not authorize provider execution in the same governance
change. Implementation must begin in a separate reviewable change.

## 15. Governance verdict

The proposed architecture extends participation without changing ownership.
It is ready for explicit Human review. Until accepted, all existing Alpha
prohibitions remain in force.
