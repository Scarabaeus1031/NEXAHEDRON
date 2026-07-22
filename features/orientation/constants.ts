import type { AlphaOrientationMode, OrientationObjectType } from "@/types/alpha";

export interface OrientationModeDefinition {
  readonly id: Exclude<AlphaOrientationMode, "wonder">;
  readonly name: string;
  readonly description: string;
  readonly availability: "available" | "later";
}

export const orientationModes: readonly OrientationModeDefinition[] = [
  {
    id: "understand",
    name: "Understand",
    description: "Find structure, context and a clearer way into what you have.",
    availability: "available",
  },
  {
    id: "compare",
    name: "Compare",
    description: "Place two ideas, documents or perspectives in relation.",
    availability: "later",
  },
  {
    id: "connect",
    name: "Connect",
    description: "Reveal relationships, patterns and possible bridges.",
    availability: "later",
  },
  {
    id: "explore",
    name: "Explore",
    description: "Navigate concepts, evidence and the Living Atlas.",
    availability: "later",
  },
  {
    id: "build",
    name: "Build",
    description: "Turn understanding into research or implementation.",
    availability: "later",
  },
  {
    id: "reflect",
    name: "Reflect",
    description: "Notice what changed and what remains open.",
    availability: "later",
  },
] as const;

export const wonderExamples = [
  "A sentence I keep returning to",
  "An observation I cannot yet explain",
  "A connection that may matter",
] as const;

export const orientationObjectTypes: readonly Exclude<
  OrientationObjectType,
  ""
>[] = [
  "Question",
  "Document",
  "Book",
  "Research Paper",
  "Theory",
  "Dataset",
  "Notes",
  "Observation",
  "Idea",
  "Image",
  "Conversation",
] as const;
