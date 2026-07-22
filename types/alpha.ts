export type AlphaOrientationMode =
  | "wonder"
  | "understand"
  | "compare"
  | "connect"
  | "explore"
  | "build"
  | "reflect";

export type AlphaStep = "landing" | "choose" | "wonder" | "object" | "complete";

export type OrientationObjectType =
  | ""
  | "Question"
  | "Document"
  | "Book"
  | "Research Paper"
  | "Theory"
  | "Dataset"
  | "Notes"
  | "Observation"
  | "Idea"
  | "Image"
  | "Conversation";

export interface OrientationObjectDraft {
  readonly title: string;
  readonly type: OrientationObjectType;
  readonly url: string;
  readonly fileName: string;
}

export interface AlphaJourneyState {
  readonly step: AlphaStep;
  readonly entry: "wonder" | "understand" | null;
  readonly mode: "understand" | null;
  readonly wonder: string;
  readonly object: OrientationObjectDraft;
}
