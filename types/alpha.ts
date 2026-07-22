export type AlphaOrientationMode =
  | "wonder"
  | "understand"
  | "compare"
  | "connect"
  | "explore"
  | "build"
  | "reflect";

export type AlphaStep =
  | "landing"
  | "choose"
  | "wonder"
  | "object"
  | "request"
  | "confirmation"
  | "prepared";

export type OrientationDepth = "Overview" | "Focused" | "Deep";

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

export interface OrientationRequestDraft {
  readonly intention: string;
  readonly focus: string;
  readonly successBoundary: string;
  readonly scopeInclude: readonly string[];
  readonly scopeExclude: readonly string[];
  readonly depth: OrientationDepth;
}

export interface AlphaJourneyState {
  readonly step: AlphaStep;
  readonly entry: "wonder" | "understand" | null;
  readonly mode: "understand" | null;
  readonly wonder: string;
  readonly object: OrientationObjectDraft;
  readonly request: OrientationRequestDraft;
}
