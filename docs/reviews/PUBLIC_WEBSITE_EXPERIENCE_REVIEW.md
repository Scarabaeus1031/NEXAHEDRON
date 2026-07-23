# Public Website Experience Review

- Status: implemented experience review
- Scope: public homepage, Explore, Cases, Library, and About
- Governing direction: `docs/WEBSITE_EXPERIENCE.md`
- Protected behavior changed: none

## Observed starting point

The local homepage was calm, legible, responsive, and consistent with the
existing NEXAHEDRON visual identity. Its visible structure was still the Alpha
Laboratory journey:

- the header exposed `Laboratory` rather than the public Orientation Library;
- a seven-step progress indicator appeared before a visitor had chosen to begin;
- the only primary action opened the request-preparation flow;
- no public Explore, Case, Library, or About experience existed;
- the homepage described the Laboratory but offered no immediate subject to
  understand.

The result was a strong product entrance, but not yet the museum, library, and
observatory experience described by the accepted editorial documents.

## Implemented decisions

### Separate public exploration from the Laboratory journey

Public routes use the stable navigation `Home`, `Explore`, `Cases`, `Library`,
`About`, and `GitHub`. The existing Alpha journey keeps its own progress and
session shell. This preserves the working Orientation flow while preventing
process language from appearing at first contact.

### Keep the homepage to three answers

The homepage now answers only:

1. What is this?
2. Why does it exist?
3. Where can I begin?

Its primary entrance is the Plate Tectonics Orientation Case. Explore remains a
secondary path. Architecture and development status do not appear.

### Let a real subject explain Orientation

Plate Tectonics is the first complete case. It follows the canonical hierarchy
from Human Intention through Reflection. Evidence is separated from explanation
and remains one action away. Unknowns, assumptions, and boundaries receive the
same visible care as the subject itself.

### Make incomplete rooms honest

Future cases and collections are labeled `In preparation`, `Frontier`, or
`Room in preparation`. They are not clickable and do not contain simulated
content. The small size of the current Library remains visible.

### Use maps to clarify position, not decorate

The Library atlas shows one open room and several frontiers. A written key and
linear room list provide equivalent orientation without requiring the visual
map. Motion is limited to short hover transitions and respects reduced-motion
preferences.

### Preserve the existing visual identity

The implementation retains the existing color tokens, serif display type,
restrained rules, square controls, and white canvas. The new public layer adds
space, editorial pacing, simple field lines, and map-like relationships without
introducing dashboard, feed, or startup patterns.

## Intentionally unchanged

- ORION Version 1, its public contracts, Runtime, and Gateway;
- the live Laboratory request and report journey;
- evidence authority and Library integration boundaries;
- authentication, persistence, upload, and Atlas mutation;
- all unavailable Orientation Operators.

The public Orientation Library is an editorial presentation surface. It does
not infer, execute, validate, or manufacture Orientation behavior.

## Editorial Art Direction refinement

The public experience was subsequently reviewed beside `nexah.de` at desktop
and mobile sizes. The goal was architectural kinship rather than page or
identity duplication.

### Shared family traits

The refinement adopts the most durable traits visible across NEXAH:

- warm paper rather than a digital-white canvas;
- deep orientation blue with quiet gold used only for position and emphasis;
- Georgia-led editorial display type with restrained sans-serif labels;
- an orientation star inside a fine circular boundary;
- uppercase navigation with the current position shown through color;
- fine cartographic lines, low-contrast fields, and generous but purposeful
  negative space;
- rounded primary entrances paired with simple underlined continuation links.

NEXAHEDRON retains its own field geometry, Orientation Case hierarchy, and
atlas language. It does not reproduce the compositions or publication imagery
of `nexah.de`.

### Rhythm and composition

Public content width was narrowed to create magazine-like margins at large
viewports. Section intervals were reduced so the narrative continues across
rules rather than restarting after each one. Mobile navigation becomes a quiet
two-row index instead of a clipped horizontal rail.

### Case and evidence treatment

The Plate Tectonics Case now uses a faint orientation field at arrival, a
closer reading rhythm, warmer evidence terrain, and gold source markers.
Evidence remains structurally separate and directly inspectable. Unknowns and
boundaries gain presence without becoming warnings; Continuations remain
optional paths rather than recommendations.

### Atlas treatment

The Library map uses gold only for the open Earth room and keeps future rooms
as restrained frontier points. Paths fade across the field rather than reading
as a network diagram. The written key and room list remain the complete,
accessible equivalent of the visual atlas.
