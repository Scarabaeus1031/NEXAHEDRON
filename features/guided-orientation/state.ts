import {
  GUIDED_OPERATOR_VERSION,
  getGuidedQuestionOperator,
  isAllowedGuidedTransition,
  type GuidedOperatorId,
} from "./question-operators.ts";

export type GuidedRouteType = "OPEN_QUESTION" | "DIRECTION_TO_TEST";
export type GuidedResponseStatus = "ANSWERED" | "SKIPPED" | "CORRECTED";
export type GuidedHumanStatus = "REST" | "CONTINUE" | "REVISE" | "STOP";
export type GuidedPhase = "ENTRY" | "OPEN" | "CONFIRM" | "QUESTIONS" | "TERRAIN" | "GOOD_FOR_NOW";

export const OPENING_REASONS = [
  "I am missing information.",
  "More than one direction seems possible.",
  "I know my direction but hesitate.",
  "Other people are involved.",
  "I cannot yet name the difficulty.",
  "I want to test whether my direction holds.",
] as const;

export const SYSTEM_CONDITIONS = [
  "time",
  "money",
  "access",
  "roles",
  "dependencies",
  "rules",
  "technical limits",
  "social expectations",
  "irreversible consequences",
  "other",
] as const;

export interface GuidedQuestionTraceEntry {
  readonly operator_id: GuidedOperatorId;
  readonly operator_version: typeof GUIDED_OPERATOR_VERSION;
  readonly human_response: string;
  readonly response_status: GuidedResponseStatus;
}

export interface GuidedOrientationRecord {
  readonly schema_version: "nexahedron.guided_orientation/1.0";
  readonly route_type: GuidedRouteType | null;
  readonly question_anchor: string;
  readonly opening_reason: string;
  readonly opening_confirmed: boolean;
  readonly point: {
    readonly known: string;
    readonly assumed: string;
    readonly felt: string;
    readonly missing: string;
  };
  readonly views: {
    readonly self: string;
    readonly other: string;
    readonly system: string;
    readonly system_conditions: readonly string[];
  };
  readonly return: {
    readonly changed: string;
    readonly remained: string;
    readonly boundary: string;
    readonly reversible: string;
    readonly possible_move: string;
  };
  readonly question_trace: readonly GuidedQuestionTraceEntry[];
  readonly human_status: GuidedHumanStatus | null;
}

export interface GuidedOrientationState {
  readonly phase: GuidedPhase;
  readonly current_operator: GuidedOperatorId;
  readonly stopped_from: GuidedOperatorId | null;
  readonly opening_corrected: boolean;
  readonly record: GuidedOrientationRecord;
}

const fieldByOperator = {
  SOURCE: ["point", "known"],
  ASSUMPTION: ["point", "assumed"],
  FEELING: ["point", "felt"],
  MISSING: ["point", "missing"],
  SELF_VIEW: ["views", "self"],
  OTHER_VIEW: ["views", "other"],
  SYSTEM_VIEW: ["views", "system"],
  CHANGE: ["return", "changed"],
  REMAIN: ["return", "remained"],
  MOVE: ["return", "possible_move"],
  BOUNDARY: ["return", "boundary"],
  REVERSIBILITY: ["return", "reversible"],
} as const;

type AnswerableOperatorId = keyof typeof fieldByOperator;

export type GuidedOrientationAction =
  | { readonly type: "CHOOSE_ROUTE"; readonly route: GuidedRouteType }
  | { readonly type: "GOOD_FOR_NOW" }
  | { readonly type: "EDIT_OPENING"; readonly question?: string; readonly reason?: string }
  | { readonly type: "REVIEW_OPENING" }
  | { readonly type: "CORRECT_OPENING" }
  | { readonly type: "CONFIRM_OPENING" }
  | { readonly type: "ANSWER"; readonly operator_id: AnswerableOperatorId; readonly value: string }
  | { readonly type: "SKIP"; readonly operator_id: AnswerableOperatorId }
  | { readonly type: "BACK" }
  | { readonly type: "SET_SYSTEM_CONDITION"; readonly condition: string; readonly selected: boolean }
  | { readonly type: "SET_HUMAN_STATUS"; readonly status: GuidedHumanStatus }
  | { readonly type: "STOP" }
  | { readonly type: "RESET" };

export const initialGuidedOrientationState: GuidedOrientationState = {
  phase: "ENTRY",
  current_operator: "OPEN",
  stopped_from: null,
  opening_corrected: false,
  record: {
    schema_version: "nexahedron.guided_orientation/1.0",
    route_type: null,
    question_anchor: "",
    opening_reason: "",
    opening_confirmed: false,
    point: { known: "", assumed: "", felt: "", missing: "" },
    views: { self: "", other: "", system: "", system_conditions: [] },
    return: { changed: "", remained: "", boundary: "", reversible: "", possible_move: "" },
    question_trace: [],
    human_status: null,
  },
};

function nextOperator(operatorId: GuidedOperatorId): GuidedOperatorId {
  const operator = getGuidedQuestionOperator(operatorId);
  const next = operator.allowed_next[0];
  if (!next || !isAllowedGuidedTransition(operatorId, next)) {
    throw new Error(`GUIDED_TRANSITION_NOT_ALLOWED:${operatorId}`);
  }
  return next;
}

function traceResponse(
  record: GuidedOrientationRecord,
  operatorId: GuidedOperatorId,
  humanResponse: string,
  skipped = false,
): readonly GuidedQuestionTraceEntry[] {
  const previous = record.question_trace.find((entry) => entry.operator_id === operatorId);
  const entry: GuidedQuestionTraceEntry = {
    operator_id: operatorId,
    operator_version: GUIDED_OPERATOR_VERSION,
    human_response: humanResponse,
    response_status: skipped ? "SKIPPED" : previous ? "CORRECTED" : "ANSWERED",
  };
  return [...record.question_trace.filter((item) => item.operator_id !== operatorId), entry];
}

function setAnswer(
  record: GuidedOrientationRecord,
  operatorId: AnswerableOperatorId,
  value: string,
): GuidedOrientationRecord {
  const [group, field] = fieldByOperator[operatorId];
  return {
    ...record,
    [group]: { ...record[group], [field]: value },
    question_trace: traceResponse(record, operatorId, value),
    human_status: null,
  };
}

function previousOperator(record: GuidedOrientationRecord, current: GuidedOperatorId): GuidedOperatorId {
  const answered = record.question_trace.map((entry) => entry.operator_id);
  const index = answered.lastIndexOf(current);
  if (index > 0) return answered[index - 1];
  const ordered = Object.keys(fieldByOperator) as AnswerableOperatorId[];
  const orderedIndex = ordered.indexOf(current as AnswerableOperatorId);
  return orderedIndex > 0 ? ordered[orderedIndex - 1] : "OPEN";
}

export function reduceGuidedOrientation(
  state: GuidedOrientationState,
  action: GuidedOrientationAction,
): GuidedOrientationState {
  switch (action.type) {
    case "RESET":
      return initialGuidedOrientationState;
    case "CHOOSE_ROUTE":
      if (state.phase !== "ENTRY") return state;
      return { ...state, phase: "OPEN", record: { ...state.record, route_type: action.route } };
    case "GOOD_FOR_NOW":
      if (state.phase !== "ENTRY") return state;
      return { ...state, phase: "GOOD_FOR_NOW" };
    case "EDIT_OPENING":
      if (state.phase !== "OPEN") return state;
      return {
        ...state,
        record: {
          ...state.record,
          question_anchor: action.question ?? state.record.question_anchor,
          opening_reason: action.reason ?? state.record.opening_reason,
          opening_confirmed: false,
        },
      };
    case "REVIEW_OPENING":
      if (
        state.phase !== "OPEN"
        || !state.record.question_anchor.trim()
        || !state.record.opening_reason
      ) return state;
      return { ...state, phase: "CONFIRM" };
    case "CORRECT_OPENING":
      if (state.phase !== "CONFIRM") return state;
      return { ...state, phase: "OPEN", opening_corrected: true };
    case "CONFIRM_OPENING": {
      if (state.phase !== "CONFIRM") return state;
      const response = `${state.record.question_anchor}\n${state.record.opening_reason}`;
      const openTrace: GuidedQuestionTraceEntry = {
        operator_id: "OPEN",
        operator_version: GUIDED_OPERATOR_VERSION,
        human_response: response,
        response_status: state.opening_corrected ? "CORRECTED" : "ANSWERED",
      };
      return {
        ...state,
        phase: "QUESTIONS",
        current_operator: "SOURCE",
        record: {
          ...state.record,
          question_anchor: state.record.question_anchor,
          opening_confirmed: true,
          question_trace: [openTrace],
        },
      };
    }
    case "ANSWER": {
      if (state.phase !== "QUESTIONS" || action.operator_id !== state.current_operator) return state;
      const record = setAnswer(state.record, action.operator_id, action.value);
      const next = nextOperator(action.operator_id);
      if (next === "RETURN") {
        return { ...state, phase: "TERRAIN", current_operator: "RETURN", record };
      }
      return { ...state, current_operator: next, record };
    }
    case "SKIP": {
      if (state.phase !== "QUESTIONS" || action.operator_id !== state.current_operator) return state;
      const operator = getGuidedQuestionOperator(action.operator_id);
      if (!operator.skippable) return state;
      const record = {
        ...setAnswer(state.record, action.operator_id, ""),
        question_trace: traceResponse(state.record, action.operator_id, "", true),
      };
      const next = nextOperator(action.operator_id);
      if (next === "RETURN") {
        return { ...state, phase: "TERRAIN", current_operator: "RETURN", record };
      }
      return { ...state, current_operator: next, record };
    }
    case "BACK":
      if (state.phase === "CONFIRM") return { ...state, phase: "OPEN" };
      if (state.phase === "TERRAIN") return { ...state, phase: "QUESTIONS", current_operator: "REVERSIBILITY" };
      if (state.phase !== "QUESTIONS") return state;
      if (state.current_operator === "SOURCE") return { ...state, phase: "CONFIRM", current_operator: "OPEN" };
      return { ...state, current_operator: previousOperator(state.record, state.current_operator) };
    case "SET_SYSTEM_CONDITION":
      if (state.phase !== "QUESTIONS" || state.current_operator !== "SYSTEM_VIEW") return state;
      return {
        ...state,
        record: {
          ...state.record,
          views: {
            ...state.record.views,
            system_conditions: action.selected
              ? [...new Set([...state.record.views.system_conditions, action.condition])]
              : state.record.views.system_conditions.filter((value) => value !== action.condition),
          },
        },
      };
    case "SET_HUMAN_STATUS":
      if (state.phase !== "TERRAIN") return state;
      return {
        ...state,
        record: {
          ...state.record,
          human_status: action.status,
          question_trace: traceResponse(state.record, "RETURN", action.status),
        },
      };
    case "STOP":
      if (!["OPEN", "CONFIRM", "QUESTIONS", "TERRAIN"].includes(state.phase)) return state;
      return {
        ...state,
        phase: "TERRAIN",
        stopped_from: state.current_operator,
        current_operator: "RETURN",
        record: {
          ...state.record,
          human_status: "STOP",
          question_trace: traceResponse(state.record, "RETURN", "STOP"),
        },
      };
  }
}

export function currentGuidedResponse(state: GuidedOrientationState): string {
  const operatorId = state.current_operator as AnswerableOperatorId;
  const binding = fieldByOperator[operatorId];
  if (!binding) return "";
  const [group, field] = binding;
  return state.record[group][field] as string;
}
