export const GUIDED_OPERATOR_VERSION = "1.0" as const;

export const GUIDED_OPERATOR_IDS = [
  "OPEN",
  "SOURCE",
  "ASSUMPTION",
  "FEELING",
  "MISSING",
  "SELF_VIEW",
  "OTHER_VIEW",
  "SYSTEM_VIEW",
  "CHANGE",
  "REMAIN",
  "MOVE",
  "BOUNDARY",
  "REVERSIBILITY",
  "RETURN",
] as const;

export type GuidedOperatorId = (typeof GUIDED_OPERATOR_IDS)[number];

export interface GuidedQuestionOperator {
  readonly operator_id: GuidedOperatorId;
  readonly version: typeof GUIDED_OPERATOR_VERSION;
  readonly label: string;
  readonly purpose: string;
  readonly prompt: string;
  readonly nonclaim: string;
  readonly allowed_next: readonly GuidedOperatorId[];
  readonly skippable: boolean;
}

const sharedNonclaim = "The Machine holds only what you enter. It does not interpret, verify, or decide for you.";

export const GUIDED_QUESTION_OPERATORS: readonly GuidedQuestionOperator[] = [
  {
    operator_id: "OPEN",
    version: GUIDED_OPERATOR_VERSION,
    label: "Open",
    purpose: "Hold one Human-authored question or direction as the reference for this guided session.",
    prompt: "What would you like to see more clearly?",
    nonclaim: "The Machine does not complete, diagnose, or reinterpret your opening statement.",
    allowed_next: ["SOURCE"],
    skippable: false,
  },
  {
    operator_id: "SOURCE",
    version: GUIDED_OPERATOR_VERSION,
    label: "Known ground",
    purpose: "Let the Human distinguish direct experience or an identifiable source from other kinds of statements.",
    prompt: "What do you know from direct experience or a source you can identify?",
    nonclaim: "The Machine does not verify this statement or turn a reference into evidence.",
    allowed_next: ["ASSUMPTION"],
    skippable: true,
  },
  {
    operator_id: "ASSUMPTION",
    version: GUIDED_OPERATOR_VERSION,
    label: "Assumed ground",
    purpose: "Separate what the Human currently treats as known from what the Human considers possible or likely.",
    prompt: "What do you think may be true without knowing it for certain?",
    nonclaim: "The Machine does not determine whether the statement is true.",
    allowed_next: ["FEELING"],
    skippable: true,
  },
  {
    operator_id: "FEELING",
    version: GUIDED_OPERATOR_VERSION,
    label: "Felt importance",
    purpose: "Give the Human a separate place to name feeling, desire, or concern without converting it into fact.",
    prompt: "What do you feel, want or fear in this situation?",
    nonclaim: "The Machine does not infer emotion, motive, risk, or diagnosis.",
    allowed_next: ["MISSING"],
    skippable: true,
  },
  {
    operator_id: "MISSING",
    version: GUIDED_OPERATOR_VERSION,
    label: "Missing terrain",
    purpose: "Keep absent information and unresolved questions visible.",
    prompt: "What is still missing from your view?",
    nonclaim: sharedNonclaim,
    allowed_next: ["SELF_VIEW"],
    skippable: true,
  },
  {
    operator_id: "SELF_VIEW",
    version: GUIDED_OPERATOR_VERSION,
    label: "Self view",
    purpose: "Record what matters from the Human's current position.",
    prompt: "From your position, what matters most here?",
    nonclaim: sharedNonclaim,
    allowed_next: ["OTHER_VIEW"],
    skippable: true,
  },
  {
    operator_id: "OTHER_VIEW",
    version: GUIDED_OPERATOR_VERSION,
    label: "Other view",
    purpose: "Let the Human consider another affected position while preserving it as a hypothesis.",
    prompt: "Who else may be affected, and what might become visible from that position?",
    nonclaim: "This is a perspective hypothesis, not a statement about what another person actually thinks.",
    allowed_next: ["SYSTEM_VIEW"],
    skippable: true,
  },
  {
    operator_id: "SYSTEM_VIEW",
    version: GUIDED_OPERATOR_VERSION,
    label: "System view",
    purpose: "Hold conditions that may matter independently of any one person's intention.",
    prompt: "Which conditions would still matter even if no one personally intended them?",
    nonclaim: "The Machine does not select conditions or claim that a system causes the situation.",
    allowed_next: ["CHANGE"],
    skippable: true,
  },
  {
    operator_id: "CHANGE",
    version: GUIDED_OPERATOR_VERSION,
    label: "What changed",
    purpose: "Let the Human name differences observed while moving among the declared views.",
    prompt: "What changes when you move between these views?",
    nonclaim: "The Machine does not calculate or infer a difference from your text.",
    allowed_next: ["REMAIN"],
    skippable: true,
  },
  {
    operator_id: "REMAIN",
    version: GUIDED_OPERATOR_VERSION,
    label: "What remained",
    purpose: "Let the Human name something they currently see across the declared views.",
    prompt: "What remains across the views?",
    nonclaim: "A Human-authored remainder is not a verified invariant.",
    allowed_next: ["MOVE"],
    skippable: true,
  },
  {
    operator_id: "MOVE",
    version: GUIDED_OPERATOR_VERSION,
    label: "What could move",
    purpose: "Hold one possible next movement written by the Human.",
    prompt: "What could move next?",
    nonclaim: "The Machine does not generate, recommend, or approve a next step.",
    allowed_next: ["BOUNDARY"],
    skippable: true,
  },
  {
    operator_id: "BOUNDARY",
    version: GUIDED_OPERATOR_VERSION,
    label: "Boundary",
    purpose: "Keep a declared limit, protected value, or non-crossing condition visible.",
    prompt: "What should not be crossed, lost or damaged?",
    nonclaim: "The Machine does not determine safety, legality, or acceptable risk.",
    allowed_next: ["REVERSIBILITY"],
    skippable: true,
  },
  {
    operator_id: "REVERSIBILITY",
    version: GUIDED_OPERATOR_VERSION,
    label: "Reversible terrain",
    purpose: "Let the Human distinguish a bounded trial from an irreversible commitment.",
    prompt: "What could be tried without making the whole decision irreversible?",
    nonclaim: "The Machine does not guarantee that an action is reversible or without consequence.",
    allowed_next: ["RETURN"],
    skippable: true,
  },
  {
    operator_id: "RETURN",
    version: GUIDED_OPERATOR_VERSION,
    label: "Return",
    purpose: "Arrange confirmed Human entries as an inspectable, unfinished Terrain Map.",
    prompt: "What would you like to hold, revise, continue, or stop with?",
    nonclaim: "The Terrain Map is not an answer, diagnosis, recommendation, verified result, approval, or receipt.",
    allowed_next: [],
    skippable: false,
  },
] as const;

const registry = new Map<GuidedOperatorId, GuidedQuestionOperator>(
  GUIDED_QUESTION_OPERATORS.map((operator) => [operator.operator_id, operator]),
);

export function getGuidedQuestionOperator(operatorId: string): GuidedQuestionOperator {
  const operator = registry.get(operatorId as GuidedOperatorId);
  if (!operator) throw new Error(`UNKNOWN_GUIDED_OPERATOR:${operatorId}`);
  return operator;
}

export function isAllowedGuidedTransition(from: string, to: string): boolean {
  return getGuidedQuestionOperator(from).allowed_next.includes(to as GuidedOperatorId);
}
