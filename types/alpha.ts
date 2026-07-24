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
  | "orientation";

export type OrientationWorkspaceOperation =
  | "anchor"
  | "place"
  | "attend"
  | "relate"
  | "bound"
  | "turn"
  | "reflect"
  | "rest";

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

export interface OrientationWorkspaceDraft {
  readonly operation: OrientationWorkspaceOperation;
  readonly relation: string;
  readonly uncertainty: string;
  readonly turn: string;
  readonly reflection: string;
  readonly rested: boolean;
  readonly encounter: EncounterDraft;
}

export interface EncounterFragmentLocator {
  readonly sectionId: string;
  readonly blockId: string;
  readonly startOffset: number;
  readonly endOffset: number;
}

export interface EncounterFragment {
  readonly fragmentId: string;
  readonly sourceId: string;
  readonly sourceVersion: string;
  readonly sourceUrl: string;
  readonly exactText: string;
  readonly representationType: "text/html";
  readonly sourceTimestamp: string;
  readonly locator: EncounterFragmentLocator;
}

export interface EncounterDraft {
  readonly sourceId: string | null;
  readonly fragments: readonly EncounterFragment[];
  readonly fragmentRelation: string;
}

export interface AlphaJourneyState {
  readonly step: AlphaStep;
  readonly entry: "wonder" | "understand" | null;
  readonly mode: "understand" | null;
  readonly wonder: string;
  readonly object: OrientationObjectDraft;
  readonly request: OrientationRequestDraft;
  readonly workspace: OrientationWorkspaceDraft;
  readonly executionRequestId: string | null;
}
