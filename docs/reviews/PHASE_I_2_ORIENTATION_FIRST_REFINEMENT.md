# Phase I.2 Orientation-First Refinement

- Status: implemented for review
- Scope: Landing and onboarding only
- Architecture impact: none
- Runtime impact: deterministic fixture boundary unchanged

## Product decision

The landing states the conceptual hierarchy explicitly:

- **NEXAH** is the Orientation Layer: the underlying orientation system.
- **NEXAHEDRON** is the Orientation Laboratory: the first application through
  which people experience and interact with NEXAH.

NEXAHEDRON begins with orientation, not with the assumption that a person has
a well-formed question. The entry experience asks for intention through seven
Orientation Modes: Wonder, Understand, Compare, Connect, Explore, Build and
Reflect.

The modes describe what a person wants to do. They are not roles, profiles or
identities. Any person may choose any mode.

## Landing sequence

The mode choice follows a short, non-technical introduction so a first-time
visitor understands the product before being asked to act:

1. NEXAH is named as **The Orientation Layer**.
2. It is distinguished from a search engine, encyclopedia and answer machine.
3. The visitor sees the range of material that can become an Orientation Object.
4. Existing knowledge sources are shown as remaining in their own forms.
5. NEXAHEDRON is introduced as the first application and human access point.
6. The Orientation Modes become the invitation to enter the Laboratory.

The source map communicates the relationship without redefining architecture:
information sources remain external, NEXAH creates orientation across them,
and NEXAHEDRON presents one place to interact with that layer. It states
explicitly that no connector is active in the deterministic review build.

The operating-system/application comparison is used as a product explanation,
not as a new formal architectural responsibility.

## First-contact language

The landing uses **Bring what you have** before introducing the term
Orientation Object. The technical term appears only after familiar examples
have made the concept clear.

A short **Why orientation?** bridge states the problem without adding product
documentation: information and answer-producing systems are abundant;
orientation remains missing.

## Refined onboarding sequence

1. Choose an Orientation Mode.
2. Choose or describe an Orientation Object.
3. Define the intended direction.
4. Confirm the recorded scope.
5. Receive the existing Orientation Report.
6. Continue through Reflection or Departure.

An Orientation Object may be a question, document, book, research paper,
theory, dataset, notes, observation, idea, image or conversation. This is
Laboratory interaction state only; it does not redefine the canonical
Orientation Object contract.

## Deterministic boundary

The review build exposes every mode and object kind so the onboarding model can
be evaluated. It completes only the recorded `Understand + Observation`
fixture. Other combinations stop before scope confirmation and state that
nothing was sent or inferred.

The Laboratory does not translate a new intention, select a route, validate a
plan or alter a report. The ORION gateway remains unavailable. The existing
fixture and every report view remain semantically unchanged.

## Authority decision

This refinement changes only the Laboratory invitation, local screen sequence
and presentation. NEXAHEDRON does not claim the Orientation Layer and it adds
no NEXAH, ORION, LYRA, Library, Atlas or LUCY authority. No ADR is required.
