# Plate Tectonics Encounter Alpha

- Status: implemented bounded Encounter
- Domain: Plate Tectonics
- Source: one resolved USGS HTML publication record
- Persistence: current in-memory Alpha only
- ORION participation: none
- Evidence status: none

## 1. Component tree

```text
OrientationWorkspaceScreen
└── Place
    ├── MaterialFolio
    └── PlateTectonicsEncounter
        ├── EncounterEntry
        └── EncounterTable
            ├── SourceSurface
            └── EncounterMargin
                ├── ExactSelection
                ├── FragmentWindows
                ├── HumanRelationship
                └── ProvenanceLabel
```

The existing Question Anchor, operation trace, Reflection Margin and Rest
surface are unchanged. Encounter occupies the Material Folio's working area
only while the Human is in Place.

## 2. State model

Encounter state is local, Human-held Workspace state:

- one opened `sourceId`;
- zero or more exact fragments;
- one optional Human-authored relationship among the held fragments.

Opening a source is an explicit Human action. Selecting or removing a fragment
is an explicit Human action. The relationship is never generated. Encounter
state is not persisted and is not included in the ORION request.

## 3. Data model

The executable slice contains one `EncounterSource`. It declares:

- source identity;
- source version and publication timestamp;
- source authority;
- canonical source URL and DOI;
- representation type;
- one named section;
- ordered source blocks;
- provenance.

It is a bounded source surface, not a generic importer, Library adapter,
Evidence Reference, or source-ingestion system.

## 4. Fragment model

Every `EncounterFragment` contains:

- deterministic fragment identity;
- exact source identity and source version;
- canonical source URL;
- exact selected text;
- representation type;
- source timestamp;
- section identity;
- block identity;
- start and end character offsets.

Fragment creation fails when the selected text does not equal the text at the
declared coordinates. A fragment card always includes `Return to source`,
which restores the exact browser selection in its original paragraph.

## 5. Source model

The Alpha source is:

```text
U.S. Geological Survey
This Dynamic Earth: The Story of Plate Tectonics
USGS publication record 7000097
DOI 10.3133/7000097
Publication date 1996-01-01
Representation: text/html
```

The visible source surface reproduces the publication-description text in its
declared order. It does not summarize, explain, rank, or classify the source.
The canonical USGS page remains linked from the surface.

## 6. Workspace integration

- Question Anchor remains unchanged.
- Place can still accept the existing manual title, type, URL, or local
  filename.
- The single canonical Encounter is offered beneath those controls.
- Opening it sets the Material Folio to the Human-selected source record.
- Source text and fragment windows remain together on one table.
- The Reflection Margin reports only whether a source is open and how many
  exact fragments the Human has held.
- Rest records the fragment count and whether the Human named a relationship.
- ORION preparation remains governed by the existing Rest and confirmation
  boundaries.

Fragments remain Working Material. They never become Evidence merely by being
selected.

## 7. Minimal UI

The UI contains only:

1. one quiet source door;
2. source identity, version, DOI, authors and authority;
3. the ordered source text;
4. browser-native exact text selection, plus an exact whole-paragraph action
   for keyboard and assistive-technology use;
5. one `Keep this fragment` action;
6. fragment windows with locators and `Return to source`;
7. one optional Human relationship field after two fragments exist;
8. a compact provenance label.

There is no search, toolbar, dashboard, source catalog, automated annotation,
summary, recommendation, or AI response.

## 8. Interaction flow

```text
What is Plate Tectonics?
  ↓
Place
  ↓
Open source on this table
  ↓
Read the USGS source surface
  ↓
Select one exact passage
  ↓
Keep this fragment
  ↓
Select another exact passage
  ↓
Name a relationship
  ↓
Return to either source location when needed
  ↓
Continue through Attend · Relate · Bound · Turn · Reflect
  ↓
Rest
```

The session can end at Rest. ORION is not required.

## 9. Acceptance tests

The automated checks prove:

- source identity, version, timestamp, DOI and provenance are present;
- the source model and ordered block collection are immutable;
- exact text must match exact source coordinates;
- fragment identity and locator are deterministic;
- duplicate fragment selection is ignored;
- fragment relationships remain Human-authored;
- no ORION execution begins;
- the component exposes source opening, fragment capture, provenance and
  return-to-source;
- the Encounter component contains no fetch, summary, recommendation,
  classification or Gateway behavior.

The browser acceptance path additionally verifies that a first-time Human can
open the source, read it, keep two selections, name their relationship, return
to the source and continue to Rest.

## 10. Implementation roadmap

This vertical slice is intentionally complete at one source:

1. **Implemented:** one resolved HTML source and immutable source surface.
2. **Implemented:** exact character-range fragments with return navigation.
3. **Implemented:** one Human-authored relationship among held fragments.
4. **Implemented:** Workspace, Reflection Margin and Rest integration.
5. **Stop:** no second source, new domain, importer, persistence, OCR, search,
   Evidence conversion, Library write, or ORION handoff is authorized by this
   Alpha.

The next decision should follow observed Human use of this one Encounter, not
anticipate a generalized ingestion system.
