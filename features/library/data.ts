export type CaseStatus = "Canonical" | "Reviewed" | "In preparation";

export type OrientationCasePreview = {
  readonly slug: string;
  readonly title: string;
  readonly category: string;
  readonly intention: string;
  readonly description: string;
  readonly status: CaseStatus;
  readonly readingTime: string;
  readonly available: boolean;
};

export const orientationCases: readonly OrientationCasePreview[] = [
  {
    slug: "plate-tectonics",
    title: "Plate Tectonics",
    category: "Earth Science",
    intention: "I want to understand what this is, why it is accepted, and where I should continue.",
    description: "Moving plates, geological patterns, inspectable evidence, and the limits of prediction.",
    status: "Canonical",
    readingTime: "12 min",
    available: true,
  },
  {
    slug: "what-is-evidence",
    title: "What is Evidence?",
    category: "Foundations",
    intention: "I want to understand what counts as evidence, and why a source alone is not enough.",
    description: "Source, method, claim, uncertainty, and the boundary between support and certainty.",
    status: "Canonical",
    readingTime: "10 min",
    available: true,
  },
  {
    slug: "what-is-a-map",
    title: "What is a Map?",
    category: "Maps",
    intention: "I want to understand what a map reveals, transforms, and leaves out.",
    description: "Selection, symbol, scale, purpose, and the distance between map and territory.",
    status: "Canonical",
    readingTime: "10 min",
    available: true,
  },
  {
    slug: "what-is-scale",
    title: "What is Scale?",
    category: "Maps",
    intention: "I want to understand what changes when I zoom in or out.",
    description: "Extent, detail, ratio, and the patterns that appear only from another level.",
    status: "Canonical",
    readingTime: "9 min",
    available: true,
  },
  {
    slug: "what-is-a-scientific-model",
    title: "What is a Scientific Model?",
    category: "Foundations",
    intention: "I want to understand what a scientific model can show—and why it is not the thing itself.",
    description: "Purpose, assumptions, representation, comparison, revision, and domain of validity.",
    status: "Canonical",
    readingTime: "11 min",
    available: true,
  },
];

export const foundationRooms = [
  { name: "Earth", note: "Processes, records, scale, and change", caseCount: 1, href: "/cases/plate-tectonics" },
  { name: "Evidence", note: "Observation, source, interpretation, and trust", caseCount: 1, href: "/cases/what-is-evidence" },
  { name: "Systems", note: "Models, boundaries, relationships, and validity", caseCount: 1, href: "/cases/what-is-a-scientific-model" },
  { name: "Maps", note: "Position, scale, representation, and omission", caseCount: 2, href: "/cases/what-is-a-map" },
] as const;

export const explorationQuestions = [
  "How do we know that plates move?",
  "What is the difference between evidence and explanation?",
  "Where does a useful model stop?",
] as const;

export const relationshipPaths = [
  { from: "Motion", to: "Boundary", note: "How relative movement changes interaction" },
  { from: "Evidence", to: "Confidence", note: "What a conclusion can rest on" },
  { from: "Map", to: "Territory", note: "What representation reveals and transforms" },
] as const;

export const evidencePaths = [
  { kind: "Measurement", example: "GPS motion over time" },
  { kind: "Spatial record", example: "Mapped boundaries and events" },
  { kind: "Material record", example: "Ocean-floor magnetic patterns" },
] as const;
