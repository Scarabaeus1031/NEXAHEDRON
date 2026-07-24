import type { EncounterFragment } from "@/types/alpha";

export interface EncounterSourceBlock {
  readonly blockId: string;
  readonly sectionId: string;
  readonly ordinal: number;
  readonly text: string;
}

export interface EncounterSource {
  readonly sourceId: string;
  readonly sourceVersion: string;
  readonly sourceTimestamp: string;
  readonly title: string;
  readonly authors: readonly string[];
  readonly sourceAuthority: string;
  readonly canonicalUrl: string;
  readonly doi: string;
  readonly representationType: "text/html";
  readonly representationLabel: string;
  readonly sectionLabel: string;
  readonly provenance: readonly string[];
  readonly blocks: readonly EncounterSourceBlock[];
}

const sourceBlocks = [
  {
    blockId: "description-01",
    sectionId: "publication-description",
    ordinal: 1,
    text: "In the early 1960s, the emergence of the theory of plate tectonics started a revolution in the earth sciences. Since then, scientists have verified and refined this theory, and now have a much better understanding of how our planet has been shaped by plate-tectonic processes. We now know that, directly or indirectly, plate tectonics influences nearly all geologic processes, past and present.",
  },
  {
    blockId: "description-02",
    sectionId: "publication-description",
    ordinal: 2,
    text: "Indeed, the notion that the entire Earth's surface is continually shifting has profoundly changed the way we view our world.",
  },
  {
    blockId: "description-03",
    sectionId: "publication-description",
    ordinal: 3,
    text: "People benefit from, and are at the mercy of, the forces and consequences of plate tectonics. With little or no warning, an earthquake or volcanic eruption can unleash bursts of energy far more powerful than anything we can generate. While we have no control over plate-tectonic processes, we now have the knowledge to learn from them.",
  },
  {
    blockId: "description-04",
    sectionId: "publication-description",
    ordinal: 4,
    text: "This booklet gives a brief introduction to the concept of plate tectonics and complements the visual and written information in This Dynamic Planet, a map published in 1994 by the U.S. Geological Survey (USGS) and the Smithsonian Institution. The booklet highlights some of the people and discoveries that advanced the development of the theory and traces its progress since its proposal.",
  },
  {
    blockId: "description-05",
    sectionId: "publication-description",
    ordinal: 5,
    text: "Although the general idea of plate tectonics is now widely accepted, many aspects still continue to confound and challenge scientists. The earth-science revolution launched by the theory of plate tectonics is not finished.",
  },
] as const satisfies readonly EncounterSourceBlock[];

export const plateTectonicsSource: EncounterSource = Object.freeze({
  sourceId: "usgs:publication:7000097",
  sourceVersion: "publication-record:7000097:1996-01-01",
  sourceTimestamp: "1996-01-01",
  title: "This Dynamic Earth: The Story of Plate Tectonics",
  authors: Object.freeze(["W. Jacquelyne Kious", "Robert I. Tilling"]),
  sourceAuthority: "U.S. Geological Survey",
  canonicalUrl: "https://www.usgs.gov/publications/dynamic-earth-story-plate-tectonics",
  doi: "10.3133/7000097",
  representationType: "text/html",
  representationLabel: "HTML publication record · exact textual surface",
  sectionLabel: "Publication description",
  provenance: Object.freeze([
    "USGS publication record 7000097",
    "General Interest Publication · publication date 1996-01-01",
    "Resolved into this bounded Encounter surface without summary or interpretation",
  ]),
  blocks: Object.freeze(sourceBlocks.map((block) => Object.freeze({ ...block }))),
});

export function createEncounterFragment({
  blockId,
  startOffset,
  endOffset,
  exactText,
}: {
  readonly blockId: string;
  readonly startOffset: number;
  readonly endOffset: number;
  readonly exactText: string;
}): EncounterFragment {
  const block = plateTectonicsSource.blocks.find((candidate) => candidate.blockId === blockId);
  if (!block) throw new Error("Unknown Encounter source block.");
  if (
    !Number.isInteger(startOffset)
    || !Number.isInteger(endOffset)
    || startOffset < 0
    || endOffset <= startOffset
    || endOffset > block.text.length
  ) {
    throw new Error("Invalid Encounter fragment boundary.");
  }
  if (block.text.slice(startOffset, endOffset) !== exactText) {
    throw new Error("Encounter fragment text does not match its source location.");
  }

  const locator = Object.freeze({
    sectionId: block.sectionId,
    blockId,
    startOffset,
    endOffset,
  });
  const fragmentId = [
    plateTectonicsSource.sourceId,
    plateTectonicsSource.sourceVersion,
    block.sectionId,
    blockId,
    `${startOffset}-${endOffset}`,
  ].join("@");

  return Object.freeze({
    fragmentId,
    sourceId: plateTectonicsSource.sourceId,
    sourceVersion: plateTectonicsSource.sourceVersion,
    sourceUrl: plateTectonicsSource.canonicalUrl,
    exactText,
    representationType: plateTectonicsSource.representationType,
    sourceTimestamp: plateTectonicsSource.sourceTimestamp,
    locator,
  });
}
