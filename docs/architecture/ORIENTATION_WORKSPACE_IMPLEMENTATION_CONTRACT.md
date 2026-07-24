# Orientation Workspace Implementation Contract

Status: Current implementation authority for NEXAHEDRON Alpha
Scope: Human-owned Orientation Workspace
Authority: Implementation-level only; the constitutional and ecosystem authority documents remain superior

## 1. Purpose

The Orientation Workspace is one persistent Human working surface. It allows a
person to place material, change how they look at it, preserve uncertainty, and
decide whether to stop or cross the separate ORION boundary.

The Workspace does not orient on the Human's behalf. It preserves the
conditions in which Human orientation can happen.

The canonical Alpha session is:

```text
Anchor
  ↓
Place
  ↓
Attend
  ↓
Relate
  ↓
Bound
  ↓
Turn
  ↓
Reflect
  ↓
Rest
```

Rest completes the Human-owned session. ORION submission is an optional,
subsequent boundary.

## 2. Architectural Decision

The previous route sequence remains available for compatibility, but it is no
longer the primary interaction model. The canonical session runs on one
Workspace route and changes the active operation without replacing the table.

This decision removes the wizard as the governing metaphor. It does not change:

- the public ORION request contract;
- Gateway behavior;
- Runtime behavior;
- evidence authority;
- Library authority;
- Human confirmation;
- the in-memory Alpha limitation.

## 3. Canonical Component Inventory

### 3.1 Orientation Workspace

- Purpose: hold one complete Human orientation session.
- Responsibility: compose the persistent Question Anchor, Material Folio,
  current operation, Reflection Margin, and Continuation Horizon.
- Owner: NEXAHEDRON.
- Public API: the `/wonder` route through the stable `WonderScreen` entry seam.
- State: Human-owned session state plus presentation-only active focus.
- Events: begin, select completed operation, advance, return, rest, prepare for
  ORION.
- Dependencies: journey reducer, Material Folio, Reflection Margin, existing
  request preparation.
- Tests: full operation transition, STOP before ORION, server rendering,
  responsive composition, focus transfer.

### 3.2 Question Anchor

- Purpose: keep the original Human question visible.
- Responsibility: display the exact Human-authored starting statement
  throughout the session.
- Owner: Human.
- Public API: `AlphaJourneyState.wonder`.
- State: mutable during Anchor; retained thereafter; recoverable by returning
  to Anchor.
- Events: edit, place.
- Dependencies: none outside Workspace session state.
- Tests: never disappears after Place; no system rewrite; reset clears it only
  through explicit Human action.

### 3.3 Material Folio

- Purpose: give the Human's material one stable spatial identity.
- Responsibility: hold declared title, type, reference address or filename,
  question annotation, and later request fields.
- Owner: Human for content; NEXAHEDRON for local presentation.
- Public API: `OrientationObjectDraft` and `MaterialFolio`.
- State: mutable until confirmation; local and in-memory.
- Events: name, type, reference, revise.
- Dependencies: Question Anchor.
- Tests: no upload, no retrieval, no semantic inspection, identity persists
  across operations.

### 3.4 Attention Surface

- Purpose: distinguish the material from what the Human wants to understand.
- Responsibility: collect intention and optional focus.
- Owner: Human.
- Public API: `OrientationRequestDraft.intention` and `.focus`.
- State: mutable Human-owned session state.
- Events: edit, keep.
- Dependencies: placed Material Folio.
- Tests: intention required to advance; focus remains optional; no inferred
  intention.

### 3.5 Relationship Sheet

- Purpose: let the Human state one working relationship between Anchor and
  material.
- Responsibility: preserve an explicit Human-authored relationship.
- Owner: Human.
- Public API: `OrientationWorkspaceDraft.relation`.
- State: mutable and local.
- Events: edit, keep.
- Dependencies: Question Anchor and Material Folio.
- Tests: required to advance; never generated; never represented as ORION-owned
  relation data.

### 3.6 Evidence Underlay

- Purpose: keep evidence status visible without taking over the Workspace.
- Responsibility: state whether evidence is attached and preserve the
  distinction between a reference and evidence.
- Owner: Library for future source-side evidence; NEXAHEDRON for faithful
  presentation.
- Public API: no executable Alpha evidence API.
- State: derived presentation state: `No evidence is attached`.
- Events: none in this milestone.
- Dependencies: evidence authority boundary.
- Tests: a URL or filename never becomes evidence; missing evidence is not
  presented as a technical failure.

### 3.7 Boundary Surface

- Purpose: make inclusion, exclusion, and uncertainty explicit.
- Responsibility: collect included scope, optional excluded scope, and one
  uncertainty that must remain visible at Rest.
- Owner: Human.
- Public API: `scopeInclude`, `scopeExclude`, and
  `OrientationWorkspaceDraft.uncertainty`.
- State: mutable and local.
- Events: add, edit, remove, keep.
- Dependencies: Attention Surface.
- Tests: at least one included boundary and one preserved uncertainty are
  required; Rest repeats the uncertainty verbatim.

### 3.8 Turn Surface

- Purpose: let the Human deliberately change resolution or position.
- Responsibility: collect a declared working resolution and a Human-authored
  description of another view.
- Owner: Human.
- Public API: `OrientationRequestDraft.depth` and
  `OrientationWorkspaceDraft.turn`.
- State: mutable and local.
- Events: choose resolution, edit turn, keep.
- Dependencies: bounded material.
- Tests: no automatic perspective selection; no semantic comparison; exact
  Human text persists.

### 3.9 Reflection Margin

- Purpose: accompany work without performing it.
- Responsibility: mirror declared state, current lens, openness, and ownership.
- Owner: NEXAHEDRON presentation; reflected content remains Human-owned.
- Public API: `JourneyReflection` and `ReflectionMargin`.
- State: derived only.
- Events: none.
- Dependencies: session state.
- Tests: no fetch, Gateway, Runtime, evidence, classification, suggestion, or
  interpretation behavior.

### 3.10 Human Reflection

- Purpose: let the Human state what is clearer after the turn.
- Responsibility: preserve the Human's own reflection.
- Owner: Human.
- Public API: `OrientationWorkspaceDraft.reflection`.
- State: mutable and local.
- Events: edit, let rest.
- Dependencies: completed prior operations.
- Tests: required before Rest; never generated or completed by the system.

### 3.11 Continuation Horizon

- Purpose: preserve choice after a session has become sufficient for now.
- Responsibility: offer exactly three conceptual possibilities: rest, revise,
  or prepare the existing bounded request for ORION.
- Owner: Human decision; NEXAHEDRON presentation.
- Public API: Rest surface actions.
- State: derived from a rested session.
- Events: return to reflection, prepare request, take no action.
- Dependencies: complete Human session.
- Tests: Rest is valid without ORION; prepare requires rested and request-valid
  state; no automatic submission.

### 3.12 ORION Artifact

- Purpose: present one public ORION outcome after explicit confirmation.
- Responsibility: faithful display of the public outcome and its boundaries.
- Owner: ORION for outcome; NEXAHEDRON for presentation.
- Public API: the frozen public Gateway consumer types.
- State: immutable external outcome.
- Events: inspect, follow an available continuation, return after a consumer
  failure.
- Dependencies: confirmed request and public Gateway only.
- Tests: no private ORION import; empty and unknown fields remain visible;
  blocked evidence result remains truthful.

### 3.13 Library Edge

- Purpose: reserve the source-side evidence boundary.
- Responsibility: none executable in the current Alpha.
- Owner: Library.
- Public API: intentionally absent.
- State: absent.
- Events: none.
- Dependencies: future governed Library contract.
- Tests: Workspace cannot manufacture evidence or Library identity.

### 3.14 Atlas Edge

- Purpose: reserve future canonical orientation-space participation.
- Responsibility: none executable in the current Alpha.
- Owner: NEXAH.
- Public API: intentionally absent.
- State: absent.
- Events: none.
- Dependencies: future approved contract.
- Tests: Workspace cannot publish or mutate Atlas authority.

### 3.15 Session Archive

- Purpose: eventually preserve a session beyond the in-memory lifetime.
- Responsibility: deferred; no current implementation.
- Owner: future Persistence boundary under explicit governance.
- Public API: intentionally absent.
- State: absent.
- Events: none.
- Dependencies: retention, deletion, privacy, and identity decisions.
- Tests: current Alpha makes no persistence claim.

## 4. Canonical State Model

### 4.1 Human-owned mutable session state

- Question Anchor;
- material title, type, URL reference, and filename reference;
- intention and focus;
- relationship statement;
- included and excluded scope;
- preserved uncertainty;
- working resolution and turn statement;
- Human reflection;
- decision to Rest;
- decision to prepare or submit.

No subsystem may rewrite these fields as if the rewrite were Human-authored.

### 4.2 NEXAHEDRON-owned session state

- active operation;
- local validation visibility;
- current route;
- whether the session has explicitly entered Rest;
- transient transport presentation.

This state controls presentation and choreography only. It grants no
orientation authority.

### 4.3 Derived state

- operation availability;
- operation completion markers;
- Reflection Margin notes;
- evidence-underlay message;
- Rest summary;
- request readiness.

Derived state must be reproducible from owned source state and must not be
persisted as a competing authority.

### 4.4 Immutable state

- confirmed request version once submitted;
- public ORION outcomes;
- public evidence references;
- public Continuation Options;
- boundary-failure classification.

Immutable external state is displayed, not repaired.

### 4.5 Recoverable state

The current Alpha retains session state only while the React provider remains
mounted. Route movement inside the application preserves it. Reload, browser
closure, or reset may remove it. This is an explicit Alpha limitation.

### 4.6 Technical state

- request identifier;
- execution phase;
- transport result;
- clarification request version;
- boundary failure category.

Technical state must not displace the Question Anchor or be presented as Human
meaning.

### 4.7 External authority state

- ORION-owned: reports, clarification, Runtime errors, Continuation Options,
  public evidence bindings.
- Library-owned: source identity and source-side evidence declarations.
- Atlas/NEXAH-owned: canonical Orientation Space and publication authority.
- Editorial-owned: public Case and Library curation.

NEXAHEDRON may present these states only through explicit interfaces.

## 5. Interface Contracts

### Workspace → Interaction

- Input: Human action.
- Output: one explicit reducer event.
- Rule: no advancement from passive observation, timing, focus, or derived
  classification.

### Workspace → Rendering

- Input: owned and derived local state.
- Output: one primary focus, persistent Anchor, Folio, and margin.
- Rule: rendering may reorganize for viewport size but may not change the
  grammar or ownership.

### Workspace → Persistence

- Current contract: none.
- Rule: do not use browser storage as an undeclared archive.
- Future requirement: explicit retention, deletion, identity, privacy, and
  migration governance.

### Workspace → Editorial Layer

- Input: read-only published Cases and Library entries.
- Current Alpha: public navigation only; no session binding.
- Rule: editorial material cannot silently become evidence or Human material.

### Workspace → Library

- Current contract: absent.
- Future direction: accept only authoritative source-side evidence objects
  through a governed contract.
- Rule: NEXAHEDRON never creates Library authority.

### Workspace → Atlas

- Current contract: absent.
- Future direction: read-only canonical orientation-space views.
- Rule: session relations never become Atlas relations automatically.

### Workspace → ORION

- Input: one Human-confirmed frozen public Orientation Request.
- Output: one frozen public outcome or one consumer-boundary failure.
- Rule: no private Runtime import, readiness inference, evidence validation, or
  outcome repair in the browser.

### ORION → Rendering

- Input: public outcome only.
- Output: faithful report, clarification, Runtime-error, or failure surface.
- Rule: preserve order, emptiness, uncertainty, identity, version, and
  provenance.

## 6. Canonical Operation Contracts

| Operation | Required Human state | May derive | Must not do |
|---|---|---|---|
| Anchor | starting statement | completion only | classify the question |
| Place | title and material type | reference-presence label | inspect or upload material |
| Attend | intention | request readiness | infer intent |
| Relate | relationship statement | visual connection | generate a relation |
| Bound | included scope and uncertainty | boundary counts | convert a reference into evidence |
| Turn | another-position statement | selected resolution | recommend a perspective |
| Reflect | reflection statement | margin mirror | generate reflection |
| Rest | explicit Human action after all prior operations | stable summary | claim closure or certainty |

## 7. Constitutional Test Contract

Every implementation must prove:

1. The Question Anchor remains visible after every operation.
2. The active operation changes only through Human action.
3. Later operations remain unavailable until their prerequisites exist.
4. A URL or filename never becomes evidence.
5. Relationship, Turn, uncertainty, and reflection remain exact Human text.
6. Reflection performs no fetch, inference, classification, or execution.
7. Rest preserves uncertainty and does not require ORION.
8. ORION preparation is impossible before explicit Rest.
9. ORION execution is impossible before separate confirmation.
10. Public outcomes remain ORION-owned and unmodified.
11. Mobile changes layout, not operation order or authority.
12. Reset is explicit and clears the local session.

Any failure above is a constitutional implementation defect.

## 8. Current Technical Debt

- The legacy Object and Request routes remain for compatibility and test
  coverage. They should not acquire new behavior.
- Session state is memory-only and disappears on reload.
- The current file control preserves only a filename reference and can visually
  reset when its state is re-rendered.
- The Alpha ORION path truthfully stops at the evidence boundary for ordinary
  public material because no Library evidence adapter exists.
- Clarification resubmission retains its existing Version 1 lineage limitation.
- The operation surface and Reflection Margin share one provider but do not yet
  have an explicit session archive identity.

These are documented limits, not authority to widen the milestone.

## 9. Change Rule

Changes to this implementation contract may clarify implementation details.
They may not alter constitutional ownership, ecosystem authority, the frozen
ORION public boundary, or evidence meaning. Such changes require the governing
architecture process, not a frontend refactor.
