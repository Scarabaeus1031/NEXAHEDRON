# Phase I.2 — Deterministic Orientation Journey

- Status: implemented for review
- Architecture impact: none
- Runtime dependency: local fixture only
- ORION consumer contract: unavailable and intentionally unused

## Milestone outcome

Phase I.2 provides one complete, executable Laboratory journey:

1. arrive in the Laboratory and choose an Orientation Mode;
2. choose or describe an Orientation Object;
3. define the intended direction;
4. verify the scope and recorded LYRA translation;
5. load and inspect the canonical ORION report fixture;
6. pause in optional Human Reflection;
7. depart or begin again.

The application exposes seven intention modes and eight object kinds, but the
deterministic review journey recognizes one exact Understand + Observation
combination. Unsupported material is retained in the browser long enough to
explain the fixture boundary, but it is not sent, interpreted or inferred. No
material, intention, Reflection or session is persisted.

## Canonical fixture

`fixtures/orientation-sessions/full-round-trip.json` is a display projection of
the canonical `orientation-session/1` full-round-trip case at frozen ORION
revision `8a65f40464a4ccfa62d8f9fd8b831d107b0eaa35`.

The projection preserves the request, recorded translation, report identity,
plan, registered path, alternatives, evidence, invariants, validation checks,
blockers and recorded explanation. It adds no semantic conclusion. Its blocked
status and absent Target Representation remain visible throughout the journey.

## Runtime ownership

NEXAHEDRON owns only the screen sequence, local interaction state, visual
presentation and selection of report views. The fixture is treated as an
immutable external result. The Laboratory does not plan, navigate, validate,
translate, explain or edit ORION data.

Human Reflection contains no response field in this milestone. It creates a
pause without pretending that LUCY exists and without capturing human material.

## Required states

| Place | Required state |
|---|---|
| Arrival | NEXAH/NEXAHEDRON distinction, Why Orientation bridge, human-first material invitation, later Orientation Object terminology, external-source context, seven intention modes, fixture disclosure, visible authorities |
| Orientation Object | kind, material description, recorded example |
| Intention | direction, exact recorded example, unsupported combination |
| Scope | selected mode and object, recorded translation, adjust, confirm |
| Report | blocked summary, path, evidence, blockers, technical inspection |
| Reflection | optional pause, no capture, return or continue |
| Departure | outcome boundary, no-save disclosure, restart |

Keyboard focus moves to the new place heading. Report views use tab semantics,
status is expressed in text as well as color, and reduced-motion behavior is
retained from the Foundation Shell.

## Explicit exclusions

- no ORION gateway call or consumer contract;
- no model, provider or generative service;
- no ingestion, connectors or Library retrieval;
- no account, persistence, analytics or saved progress;
- no Atlas publication or graph mutation;
- no LUCY behavior;
- no application-generated LYRA translation or ORION explanation.

## Acceptance boundary

Phase I.2 is complete when the deterministic journey can be traversed from
Arrival through Departure, all report views faithfully expose the fixture, the
architecture checks remain green, and desktop and mobile browser review confirms
the canonical visual language. Live ORION integration remains blocked until its
public consumer contract is separately approved.
