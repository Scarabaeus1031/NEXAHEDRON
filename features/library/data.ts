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
    slug: "evidence",
    title: "What Counts as Evidence?",
    category: "Foundations",
    intention: "I want to understand how observations can support different kinds of claims.",
    description: "A future foundation for moving between observation, interpretation, and uncertainty.",
    status: "In preparation",
    readingTime: "—",
    available: false,
  },
  {
    slug: "maps-and-territory",
    title: "Maps and Territory",
    category: "Maps",
    intention: "I want to understand what a map reveals, transforms, and leaves out.",
    description: "A future bridge between geography, representation, scale, and choice.",
    status: "In preparation",
    readingTime: "—",
    available: false,
  },
];

export const foundationRooms = [
  { name: "Earth", note: "Processes, records, scale, and change", caseCount: 1 },
  { name: "Evidence", note: "Observation, source, interpretation, and trust", caseCount: 0 },
  { name: "Systems", note: "Boundaries, relationships, feedback, and emergence", caseCount: 0 },
  { name: "Maps", note: "Position, scale, representation, and omission", caseCount: 0 },
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
