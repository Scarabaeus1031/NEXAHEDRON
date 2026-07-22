export type JourneyScreen =
  | "arrival"
  | "object"
  | "intention"
  | "scope"
  | "report"
  | "reflection"
  | "departure";

export type OrientationMode =
  | "wonder"
  | "understand"
  | "compare"
  | "connect"
  | "explore"
  | "build"
  | "reflect";

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

export type ReportView = "summary" | "path" | "evidence" | "blockers" | "inspect";
export type FieldIssue = "empty" | "unsupported" | null;

export interface JourneyState {
  readonly screen: JourneyScreen;
  readonly mode: OrientationMode | null;
  readonly objectType: OrientationObjectType;
  readonly objectDescription: string;
  readonly secondaryObjectDescription: string;
  readonly objectIssue: FieldIssue;
  readonly intention: string;
  readonly intentionIssue: FieldIssue;
  readonly reportView: ReportView;
}

export type JourneyAction =
  | { readonly type: "SELECT_MODE"; readonly mode: OrientationMode }
  | { readonly type: "CHANGE_MODE" }
  | { readonly type: "EDIT_OBJECT_TYPE"; readonly value: OrientationObjectType }
  | { readonly type: "EDIT_OBJECT_DESCRIPTION"; readonly value: string }
  | { readonly type: "EDIT_SECONDARY_OBJECT_DESCRIPTION"; readonly value: string }
  | {
      readonly type: "USE_OBJECT_EXAMPLE";
      readonly description: string;
      readonly objectType?: OrientationObjectType;
      readonly secondaryDescription?: string;
    }
  | { readonly type: "SUBMIT_OBJECT" }
  | { readonly type: "BACK_TO_OBJECT" }
  | { readonly type: "EDIT_INTENTION"; readonly value: string }
  | { readonly type: "USE_INTENTION_EXAMPLE"; readonly value: string }
  | { readonly type: "SUBMIT_INTENTION"; readonly supported: boolean }
  | { readonly type: "BACK_TO_INTENTION" }
  | { readonly type: "CONFIRM_SCOPE" }
  | { readonly type: "SET_REPORT_VIEW"; readonly view: ReportView }
  | { readonly type: "REFLECT" }
  | { readonly type: "RETURN_TO_REPORT" }
  | { readonly type: "DEPART" }
  | { readonly type: "RESTART" };

export const initialJourneyState: JourneyState = {
  screen: "arrival",
  mode: null,
  objectType: "",
  objectDescription: "",
  secondaryObjectDescription: "",
  objectIssue: null,
  intention: "",
  intentionIssue: null,
  reportView: "summary",
};

export function reduceJourney(
  state: JourneyState,
  action: JourneyAction,
): JourneyState {
  switch (action.type) {
    case "SELECT_MODE":
      return state.screen === "arrival"
        ? { ...state, mode: action.mode, screen: "object" }
        : state;
    case "CHANGE_MODE":
      return state.screen === "object" ? initialJourneyState : state;
    case "EDIT_OBJECT_TYPE":
      return state.screen === "object"
        ? { ...state, objectType: action.value, objectIssue: null }
        : state;
    case "EDIT_OBJECT_DESCRIPTION":
      return state.screen === "object"
        ? { ...state, objectDescription: action.value, objectIssue: null }
        : state;
    case "EDIT_SECONDARY_OBJECT_DESCRIPTION":
      return state.screen === "object"
        ? { ...state, secondaryObjectDescription: action.value, objectIssue: null }
        : state;
    case "USE_OBJECT_EXAMPLE":
      return state.screen === "object"
        ? {
            ...state,
            objectType: action.objectType ?? "Observation",
            objectDescription: action.description,
            secondaryObjectDescription: action.secondaryDescription ?? "",
            objectIssue: null,
          }
        : state;
    case "SUBMIT_OBJECT":
      if (state.screen !== "object") return state;
      if (
        !state.objectType ||
        !state.objectDescription.trim() ||
        ((state.mode === "compare" || state.mode === "connect") &&
          !state.secondaryObjectDescription.trim())
      ) {
        return { ...state, objectIssue: "empty" };
      }
      return { ...state, screen: "intention", objectIssue: null };
    case "BACK_TO_OBJECT":
      return state.screen === "intention" ? { ...state, screen: "object" } : state;
    case "EDIT_INTENTION":
    case "USE_INTENTION_EXAMPLE":
      return state.screen === "intention"
        ? { ...state, intention: action.value, intentionIssue: null }
        : state;
    case "SUBMIT_INTENTION":
      if (state.screen !== "intention") return state;
      if (!state.intention.trim()) return { ...state, intentionIssue: "empty" };
      if (!action.supported) return { ...state, intentionIssue: "unsupported" };
      return { ...state, screen: "scope", intentionIssue: null };
    case "BACK_TO_INTENTION":
      return state.screen === "scope" ? { ...state, screen: "intention" } : state;
    case "CONFIRM_SCOPE":
      return state.screen === "scope"
        ? { ...state, screen: "report", reportView: "summary" }
        : state;
    case "SET_REPORT_VIEW":
      return state.screen === "report" ? { ...state, reportView: action.view } : state;
    case "REFLECT":
      return state.screen === "report" ? { ...state, screen: "reflection" } : state;
    case "RETURN_TO_REPORT":
      return state.screen === "reflection" ? { ...state, screen: "report" } : state;
    case "DEPART":
      return state.screen === "reflection" || state.screen === "report"
        ? { ...state, screen: "departure" }
        : state;
    case "RESTART":
      return initialJourneyState;
    default:
      return state;
  }
}
