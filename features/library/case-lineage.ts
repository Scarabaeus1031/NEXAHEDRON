export type CaseLineageEntry = {
  readonly label: string;
  readonly title: string;
  readonly note: string;
};

export type CaseLineage = {
  readonly slug: string;
  readonly entries: readonly CaseLineageEntry[];
};

export const caseLineages = {
  "plate-tectonics": {
    slug: "plate-tectonics",
    entries: [
      {
        label: "Curated demonstration",
        title: "A First Orientation — Plate Tectonics",
        note: "The bounded demonstration established the Human intention, evidence map, unknowns, and possible continuations.",
      },
      {
        label: "Evidence boundary",
        title: "USGS, NOAA, and NSF GAGE sources",
        note: "Public scientific sources support the claims in the Evidence section; they are not NEXAH Library provenance.",
      },
      {
        label: "Editorial transformation",
        title: "Public Website Experience Review · 2026",
        note: "The demonstration was distilled into a calm public Case with visible relationships, boundaries, and optional paths.",
      },
      {
        label: "Curated public reference",
        title: "Plate Tectonics",
        note: "Curated Reference Case v1.0",
      },
    ],
  },
  "what-is-evidence": {
    slug: "what-is-evidence",
    entries: [
      {
        label: "Library source material",
        title: "ORIENTATION SCIENCE · THE CARTOGRAPHY LABORATORY · THE ATLAS OF ATLASES · THE VISITOR’S GUIDE",
        note: "These Works supplied the recurring separation among observation, validation, evidence, and what remains open.",
      },
      {
        label: "Conceptual structure",
        title: "Evidence Zones and Validation Laboratory",
        note: "Their visual discipline became the accessible source → method → relationship → claim → boundary sequence.",
      },
      {
        label: "Editorial review",
        title: "Foundational Orientation Collection Source Review · 2026",
        note: "Exploratory validity claims were removed; independent public sources were retained separately as Evidence.",
      },
      {
        label: "Curated public reference",
        title: "What is Evidence?",
        note: "Curated Reference Case v1.0",
      },
    ],
  },
  "what-is-a-map": {
    slug: "what-is-a-map",
    entries: [
      {
        label: "Library source material",
        title: "MAP ATLAS · A Cartography of Perspectives · THE LANGUAGE ATLAS · THE CARTOGRAPHY LABORATORY",
        note: "These Works supplied map as selection, lens, layer, path, and bounded representation.",
      },
      {
        label: "Conceptual structure",
        title: "The Map of Maps · A Lens, Not a Final Theory",
        note: "Their relationship grammar became territory → purpose → selection → symbol and scale → map.",
      },
      {
        label: "Editorial review",
        title: "Foundational Orientation Collection Source Review · 2026",
        note: "Geographic definition was placed first; conceptual map language remained bounded and external Evidence stayed separate.",
      },
      {
        label: "Curated public reference",
        title: "What is a Map?",
        note: "Curated Reference Case v1.0",
      },
    ],
  },
  "what-is-scale": {
    slug: "what-is-scale",
    entries: [
      {
        label: "Library source material",
        title: "THE ATLAS OF ATLASES · Maps of Human Reality · A Cartography of Perspectives · FIELD ATLAS I — WATER",
        note: "These Works supplied movement among levels, worlds, views, and changing fields of attention.",
      },
      {
        label: "Conceptual structure",
        title: "Human-to-microscopic transitions and the 4 + 1 view",
        note: "Their cross-scale rhythm became detail → local pattern → system → region → planet.",
      },
      {
        label: "Editorial review",
        title: "Foundational Orientation Collection Source Review · 2026",
        note: "Resemblance across scales was not treated as proof; exact cartographic scale and public references remained distinct.",
      },
      {
        label: "Curated public reference",
        title: "What is Scale?",
        note: "Curated Reference Case v1.0",
      },
    ],
  },
  "what-is-a-scientific-model": {
    slug: "what-is-a-scientific-model",
    entries: [
      {
        label: "Library source material",
        title: "ORIENTATION SCIENCE · THE CARTOGRAPHY LABORATORY · A Cartography of Perspectives · THE LANGUAGE BOOK",
        note: "These Works supplied models as purposeful representations whose assumptions and limits remain visible.",
      },
      {
        label: "Conceptual structure",
        title: "From Models to Maps and the Validation Laboratory",
        note: "Their structures became phenomenon → question → representation → output → comparison.",
      },
      {
        label: "Editorial review",
        title: "Foundational Orientation Collection Source Review · 2026",
        note: "The false choice between models and maps was removed; independent scientific guidance grounded validation.",
      },
      {
        label: "Curated public reference",
        title: "What is a Scientific Model?",
        note: "Curated Reference Case v1.0",
      },
    ],
  },
} as const satisfies Record<string, CaseLineage>;
