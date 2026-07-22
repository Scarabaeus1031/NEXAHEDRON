import type {
  AlphaJourneyState,
  OrientationObjectDraft,
  OrientationRequestDraft,
} from "../../types/alpha.ts";

export type RequestField = "intention" | "focus" | "successBoundary" | "depth";
export type ScopeField = "scopeInclude" | "scopeExclude";

export type AlphaJourneyAction =
  | { readonly type: "RESET" }
  | { readonly type: "BEGIN_WONDER" }
  | { readonly type: "BEGIN_UNDERSTAND" }
  | { readonly type: "SAVE_WONDER"; readonly value: string }
  | { readonly type: "UPDATE_OBJECT"; readonly value: Partial<OrientationObjectDraft> }
  | { readonly type: "COMPLETE_OBJECT" }
  | { readonly type: "EDIT_REQUEST_FIELD"; readonly field: RequestField; readonly value: string }
  | { readonly type: "ADD_SCOPE_ITEM"; readonly field: ScopeField }
  | { readonly type: "EDIT_SCOPE_ITEM"; readonly field: ScopeField; readonly index: number; readonly value: string }
  | { readonly type: "REMOVE_SCOPE_ITEM"; readonly field: ScopeField; readonly index: number }
  | { readonly type: "REVIEW_REQUEST" }
  | { readonly type: "EDIT_REQUEST" }
  | { readonly type: "CONFIRM_REQUEST" };

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

export const initialAlphaJourneyState: AlphaJourneyState = {
  step: "landing",
  entry: null,
  mode: null,
  wonder: "",
  object: emptyObject,
  request: emptyRequest,
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
      return { ...initialAlphaJourneyState, step: "wonder", entry: "wonder" };
    case "BEGIN_UNDERSTAND":
      return { ...initialAlphaJourneyState, step: "object", entry: "understand", mode: "understand" };
    case "SAVE_WONDER": {
      const wonder = action.value.trim();
      if (!wonder) return state;
      return {
        ...state,
        step: "object",
        entry: "wonder",
        mode: "understand",
        wonder,
        object: { ...state.object, title: state.object.title || wonder, type: state.object.type || "Observation" },
      };
    }
    case "UPDATE_OBJECT":
      if (!["object", "request"].includes(state.step)) return state;
      return { ...state, object: { ...state.object, ...action.value } };
    case "COMPLETE_OBJECT":
      if (!state.object.title.trim() || !state.object.type) return state;
      return { ...state, step: "request" };
    case "EDIT_REQUEST_FIELD":
      if (!(["request", "confirmation"] as AlphaJourneyState["step"][]).includes(state.step)) return state;
      return {
        ...state,
        request: {
          ...state.request,
          [action.field]: action.value,
        } as OrientationRequestDraft,
      };
    case "ADD_SCOPE_ITEM":
      if (state.step !== "request") return state;
      return { ...state, request: { ...state.request, [action.field]: [...state.request[action.field], ""] } };
    case "EDIT_SCOPE_ITEM": {
      if (state.step !== "request") return state;
      const values = [...state.request[action.field]];
      if (action.index < 0 || action.index >= values.length) return state;
      values[action.index] = action.value;
      return { ...state, request: { ...state.request, [action.field]: values } };
    }
    case "REMOVE_SCOPE_ITEM": {
      if (state.step !== "request") return state;
      const values = state.request[action.field].filter((_, index) => index !== action.index);
      return { ...state, request: { ...state.request, [action.field]: values.length ? values : [""] } };
    }
    case "REVIEW_REQUEST":
      if (state.step !== "request" || !validateRequest(state).valid) return state;
      return { ...state, step: "confirmation", request: cleanRequest(state.request) };
    case "EDIT_REQUEST":
      if (state.step !== "confirmation") return state;
      return { ...state, step: "request" };
    case "CONFIRM_REQUEST":
      if (state.step !== "confirmation" || !validateRequest(state).valid) return state;
      return { ...state, step: "prepared" };
  }
}
