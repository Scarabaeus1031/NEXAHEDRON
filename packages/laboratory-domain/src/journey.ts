export type JourneyScreen =
  | "arrival"
  | "question"
  | "confirmation"
  | "report"
  | "reflection"
  | "departure";

export type ReportView = "summary" | "path" | "evidence" | "blockers" | "inspect";
export type QuestionIssue = "empty" | "unsupported" | null;

export interface JourneyState {
  readonly screen: JourneyScreen;
  readonly question: string;
  readonly questionIssue: QuestionIssue;
  readonly reportView: ReportView;
}

export type JourneyAction =
  | { readonly type: "BEGIN" }
  | { readonly type: "EDIT_QUESTION"; readonly value: string }
  | { readonly type: "USE_EXAMPLE"; readonly value: string }
  | { readonly type: "SUBMIT_QUESTION"; readonly supported: boolean }
  | { readonly type: "ADJUST" }
  | { readonly type: "CONFIRM" }
  | { readonly type: "SET_REPORT_VIEW"; readonly view: ReportView }
  | { readonly type: "REFLECT" }
  | { readonly type: "RETURN_TO_REPORT" }
  | { readonly type: "DEPART" }
  | { readonly type: "RESTART" };

export const initialJourneyState: JourneyState = {
  screen: "arrival",
  question: "",
  questionIssue: null,
  reportView: "summary",
};

export function reduceJourney(
  state: JourneyState,
  action: JourneyAction,
): JourneyState {
  switch (action.type) {
    case "BEGIN":
      return state.screen === "arrival" ? { ...state, screen: "question" } : state;
    case "EDIT_QUESTION":
    case "USE_EXAMPLE":
      return state.screen === "question"
        ? { ...state, question: action.value, questionIssue: null }
        : state;
    case "SUBMIT_QUESTION":
      if (state.screen !== "question") return state;
      if (!state.question.trim()) return { ...state, questionIssue: "empty" };
      if (!action.supported) return { ...state, questionIssue: "unsupported" };
      return { ...state, screen: "confirmation", questionIssue: null };
    case "ADJUST":
      return state.screen === "confirmation" ? { ...state, screen: "question" } : state;
    case "CONFIRM":
      return state.screen === "confirmation"
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
