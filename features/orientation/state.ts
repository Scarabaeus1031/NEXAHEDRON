import type {
  AlphaJourneyState,
  OrientationObjectDraft,
} from "../../types/alpha.ts";

export type AlphaJourneyAction =
  | { readonly type: "RESET" }
  | { readonly type: "BEGIN_WONDER" }
  | { readonly type: "BEGIN_UNDERSTAND" }
  | { readonly type: "SAVE_WONDER"; readonly value: string }
  | {
      readonly type: "UPDATE_OBJECT";
      readonly value: Partial<OrientationObjectDraft>;
    }
  | { readonly type: "COMPLETE_OBJECT" }
  | { readonly type: "REVIEW_OBJECT" };

const emptyObject: OrientationObjectDraft = {
  title: "",
  type: "",
  url: "",
  fileName: "",
};

export const initialAlphaJourneyState: AlphaJourneyState = {
  step: "landing",
  entry: null,
  mode: null,
  wonder: "",
  object: emptyObject,
};

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
      };
    case "BEGIN_UNDERSTAND":
      return {
        ...initialAlphaJourneyState,
        step: "object",
        entry: "understand",
        mode: "understand",
      };
    case "SAVE_WONDER": {
      const wonder = action.value.trim();
      if (!wonder) return state;
      return {
        ...state,
        step: "object",
        entry: "wonder",
        mode: "understand",
        wonder,
        object: {
          ...state.object,
          title: state.object.title || wonder,
          type: state.object.type || "Observation",
        },
      };
    }
    case "UPDATE_OBJECT":
      if (state.step === "complete") return state;
      return { ...state, object: { ...state.object, ...action.value } };
    case "COMPLETE_OBJECT":
      if (!state.object.title.trim() || !state.object.type) return state;
      return { ...state, step: "complete" };
    case "REVIEW_OBJECT":
      if (state.step !== "complete") return state;
      return { ...state, step: "object" };
  }
}
