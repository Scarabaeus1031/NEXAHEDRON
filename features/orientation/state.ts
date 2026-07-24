import type {
  AlphaJourneyState,
  EncounterFragment,
  OrientationWorkspaceOperation,
  OrientationObjectDraft,
  OrientationRequestDraft,
} from "../../types/alpha.ts";

export type RequestField = "intention" | "focus" | "successBoundary" | "depth";
export type ScopeField = "scopeInclude" | "scopeExclude";
export type WorkspaceNoteField = "relation" | "uncertainty" | "turn" | "reflection";

export type AlphaJourneyAction =
  | { readonly type: "RESET" }
  | { readonly type: "BEGIN_WONDER" }
  | { readonly type: "BEGIN_UNDERSTAND" }
  | { readonly type: "SET_WORKSPACE_OPERATION"; readonly operation: OrientationWorkspaceOperation }
  | { readonly type: "EDIT_WORKSPACE_NOTE"; readonly field: WorkspaceNoteField; readonly value: string }
  | { readonly type: "OPEN_ENCOUNTER_SOURCE"; readonly sourceId: string; readonly title: string; readonly url: string }
  | { readonly type: "KEEP_ENCOUNTER_FRAGMENT"; readonly fragment: EncounterFragment }
  | { readonly type: "REMOVE_ENCOUNTER_FRAGMENT"; readonly fragmentId: string }
  | { readonly type: "EDIT_ENCOUNTER_RELATION"; readonly value: string }
  | { readonly type: "REST_SESSION" }
  | { readonly type: "RESUME_SESSION"; readonly operation?: OrientationWorkspaceOperation }
  | { readonly type: "PREPARE_ORION_REQUEST" }
  | { readonly type: "SAVE_WONDER"; readonly value: string }
  | { readonly type: "UPDATE_OBJECT"; readonly value: Partial<OrientationObjectDraft> }
  | { readonly type: "COMPLETE_OBJECT" }
  | { readonly type: "EDIT_REQUEST_FIELD"; readonly field: RequestField; readonly value: string }
  | { readonly type: "ADD_SCOPE_ITEM"; readonly field: ScopeField }
  | { readonly type: "EDIT_SCOPE_ITEM"; readonly field: ScopeField; readonly index: number; readonly value: string }
  | { readonly type: "REMOVE_SCOPE_ITEM"; readonly field: ScopeField; readonly index: number }
  | { readonly type: "REVIEW_REQUEST" }
  | { readonly type: "EDIT_REQUEST" }
  | { readonly type: "RETURN_TO_CONFIRMATION" }
  | { readonly type: "BEGIN_ORIENTATION"; readonly requestId: string };

const emptyObject: OrientationObjectDraft = {
  title: "",
  type: "",
  url: "",
  fileName: "",
};

const emptyRequest: OrientationRequestDraft = {
  intention: "",
  focus: "",
  successBoundary: "",
  scopeInclude: [""],
  scopeExclude: [""],
  depth: "Focused",
};

const emptyWorkspace = {
  operation: "anchor" as const,
  relation: "",
  uncertainty: "",
  turn: "",
  reflection: "",
  rested: false,
  encounter: {
    sourceId: null,
    fragments: [] as readonly EncounterFragment[],
    fragmentRelation: "",
  },
};

export const initialAlphaJourneyState: AlphaJourneyState = {
  step: "landing",
  entry: null,
  mode: null,
  wonder: "",
  object: emptyObject,
  request: emptyRequest,
  workspace: emptyWorkspace,
  executionRequestId: null,
};

export interface RequestValidation {
  readonly object: boolean;
  readonly intention: boolean;
  readonly scopeInclude: boolean;
  readonly valid: boolean;
}

export function validateRequest(state: AlphaJourneyState): RequestValidation {
  const object = Boolean(state.object.title.trim() && state.object.type);
  const intention = Boolean(state.request.intention.trim());
  const scopeInclude = state.request.scopeInclude.some((item) => item.trim());
  return { object, intention, scopeInclude, valid: object && intention && scopeInclude };
}

export function validateWorkspaceOperation(
  state: AlphaJourneyState,
  operation: OrientationWorkspaceOperation,
): boolean {
  switch (operation) {
    case "anchor":
      return Boolean(state.wonder.trim());
    case "place":
      return Boolean(state.object.title.trim() && state.object.type);
    case "attend":
      return Boolean(state.request.intention.trim());
    case "relate":
      return Boolean(state.workspace.relation.trim());
    case "bound":
      return Boolean(
        state.request.scopeInclude.some((item) => item.trim())
        && state.workspace.uncertainty.trim(),
      );
    case "turn":
      return Boolean(state.workspace.turn.trim());
    case "reflect":
      return Boolean(state.workspace.reflection.trim());
    case "rest":
      return state.workspace.rested;
  }
}

const workspaceOperations: readonly OrientationWorkspaceOperation[] = [
  "anchor",
  "place",
  "attend",
  "relate",
  "bound",
  "turn",
  "reflect",
  "rest",
];

export function canEnterWorkspaceOperation(
  state: AlphaJourneyState,
  operation: OrientationWorkspaceOperation,
): boolean {
  if (operation === "rest" && !state.workspace.rested) return false;
  const targetIndex = workspaceOperations.indexOf(operation);
  const currentIndex = workspaceOperations.indexOf(state.workspace.operation);
  if (targetIndex <= currentIndex) return true;
  return workspaceOperations
    .slice(0, targetIndex)
    .every((candidate) => validateWorkspaceOperation(state, candidate));
}

export function cleanRequest(request: OrientationRequestDraft): OrientationRequestDraft {
  return {
    ...request,
    intention: request.intention.trim(),
    focus: request.focus.trim(),
    successBoundary: request.successBoundary.trim(),
    scopeInclude: request.scopeInclude.map((item) => item.trim()).filter(Boolean),
    scopeExclude: request.scopeExclude.map((item) => item.trim()).filter(Boolean),
  };
}

export function reduceAlphaJourney(
  state: AlphaJourneyState,
  action: AlphaJourneyAction,
): AlphaJourneyState {
  switch (action.type) {
    case "RESET":
      return initialAlphaJourneyState;
    case "BEGIN_WONDER":
      return {
        ...initialAlphaJourneyState,
        step: "wonder",
        entry: "wonder",
        workspace: { ...emptyWorkspace, operation: "anchor" },
      };
    case "BEGIN_UNDERSTAND":
      return {
        ...initialAlphaJourneyState,
        step: "wonder",
        entry: "understand",
        mode: "understand",
        workspace: { ...emptyWorkspace, operation: "anchor" },
      };
    case "SET_WORKSPACE_OPERATION":
      if (
        state.step !== "wonder"
        || !canEnterWorkspaceOperation(state, action.operation)
      ) return state;
      return {
        ...state,
        workspace: { ...state.workspace, operation: action.operation, rested: false },
      };
    case "EDIT_WORKSPACE_NOTE":
      if (state.step !== "wonder") return state;
      return {
        ...state,
        workspace: { ...state.workspace, [action.field]: action.value, rested: false },
      };
    case "OPEN_ENCOUNTER_SOURCE":
      if (state.step !== "wonder" || state.workspace.operation !== "place") return state;
      return {
        ...state,
        object: {
          ...state.object,
          title: action.title,
          type: "Research Paper",
          url: action.url,
        },
        workspace: {
          ...state.workspace,
          rested: false,
          encounter: {
            sourceId: action.sourceId,
            fragments: [],
            fragmentRelation: "",
          },
        },
      };
    case "KEEP_ENCOUNTER_FRAGMENT":
      if (
        state.step !== "wonder"
        || state.workspace.operation !== "place"
        || state.workspace.encounter.sourceId !== action.fragment.sourceId
        || state.workspace.encounter.fragments.some(
          (fragment) => fragment.fragmentId === action.fragment.fragmentId,
        )
      ) return state;
      return {
        ...state,
        workspace: {
          ...state.workspace,
          rested: false,
          encounter: {
            ...state.workspace.encounter,
            fragments: [...state.workspace.encounter.fragments, action.fragment],
          },
        },
      };
    case "REMOVE_ENCOUNTER_FRAGMENT":
      if (state.step !== "wonder" || state.workspace.operation !== "place") return state;
      return {
        ...state,
        workspace: {
          ...state.workspace,
          rested: false,
          encounter: {
            ...state.workspace.encounter,
            fragments: state.workspace.encounter.fragments.filter(
              (fragment) => fragment.fragmentId !== action.fragmentId,
            ),
          },
        },
      };
    case "EDIT_ENCOUNTER_RELATION":
      if (state.step !== "wonder" || state.workspace.operation !== "place") return state;
      return {
        ...state,
        workspace: {
          ...state.workspace,
          rested: false,
          encounter: {
            ...state.workspace.encounter,
            fragmentRelation: action.value,
          },
        },
      };
    case "REST_SESSION":
      if (
        state.step !== "wonder"
        || !workspaceOperations
          .slice(0, workspaceOperations.indexOf("rest"))
          .every((candidate) => validateWorkspaceOperation(state, candidate))
      ) return state;
      return {
        ...state,
        workspace: { ...state.workspace, operation: "rest", rested: true },
      };
    case "RESUME_SESSION":
      if (!["wonder", "confirmation"].includes(state.step)) return state;
      return {
        ...state,
        step: "wonder",
        workspace: {
          ...state.workspace,
          operation: action.operation ?? "reflect",
          rested: false,
        },
      };
    case "PREPARE_ORION_REQUEST":
      if (
        state.step !== "wonder"
        || !state.workspace.rested
        || !validateRequest(state).valid
      ) return state;
      return {
        ...state,
        step: "confirmation",
        request: cleanRequest(state.request),
      };
    case "SAVE_WONDER": {
      const wonder = action.value.trim();
      if (!wonder) return state;
      return {
        ...state,
        step: "wonder",
        entry: "wonder",
        mode: "understand",
        wonder,
        workspace: { ...state.workspace, operation: "place", rested: false },
        object: { ...state.object, title: state.object.title || wonder, type: state.object.type || "Observation" },
      };
    }
    case "UPDATE_OBJECT":
      if (!["wonder", "object", "request"].includes(state.step)) return state;
      return { ...state, object: { ...state.object, ...action.value } };
    case "COMPLETE_OBJECT":
      if (!state.object.title.trim() || !state.object.type) return state;
      return { ...state, step: "request" };
    case "EDIT_REQUEST_FIELD":
      if (!(["wonder", "request", "confirmation"] as AlphaJourneyState["step"][]).includes(state.step)) return state;
      return {
        ...state,
        request: {
          ...state.request,
          [action.field]: action.value,
        } as OrientationRequestDraft,
      };
    case "ADD_SCOPE_ITEM":
      if (!["wonder", "request"].includes(state.step)) return state;
      return { ...state, request: { ...state.request, [action.field]: [...state.request[action.field], ""] } };
    case "EDIT_SCOPE_ITEM": {
      if (!["wonder", "request"].includes(state.step)) return state;
      const values = [...state.request[action.field]];
      if (action.index < 0 || action.index >= values.length) return state;
      values[action.index] = action.value;
      return { ...state, request: { ...state.request, [action.field]: values } };
    }
    case "REMOVE_SCOPE_ITEM": {
      if (!["wonder", "request"].includes(state.step)) return state;
      const values = state.request[action.field].filter((_, index) => index !== action.index);
      return { ...state, request: { ...state.request, [action.field]: values.length ? values : [""] } };
    }
    case "REVIEW_REQUEST":
      if (state.step !== "request" || !validateRequest(state).valid) return state;
      return { ...state, step: "confirmation", request: cleanRequest(state.request) };
    case "EDIT_REQUEST":
      if (state.step !== "confirmation") return state;
      return { ...state, step: "request" };
    case "RETURN_TO_CONFIRMATION":
      if (state.step !== "orientation") return state;
      return { ...state, step: "confirmation", executionRequestId: null };
    case "BEGIN_ORIENTATION":
      if (state.step !== "confirmation" || !validateRequest(state).valid) return state;
      return { ...state, step: "orientation", executionRequestId: action.requestId };
  }
}
