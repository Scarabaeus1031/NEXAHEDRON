"use client";

import { ReflectionMargin, type ReflectionNote } from "@/features/orientation/components/ReflectionMargin";
import { useWorkspaceDraft } from "@/features/orientation/workspace-context";
import { useAlphaJourney } from "@/hooks/use-alpha-journey";

function countNamed(values: readonly string[]) {
  return values.filter((value) => value.trim()).length;
}

export function JourneyReflection({ pathname }: { readonly pathname: string }) {
  const { state } = useAlphaJourney();
  const { wonderDraft } = useWorkspaceDraft();
  const includeCount = countNamed(state.request.scopeInclude);
  const excludeCount = countNamed(state.request.scopeExclude);

  let title = "Your preparation remains with you.";
  let introduction = "The Human-authored orientation remains preserved in this local session.";
  let openItem = "The execution outcome remains external to Reflection.";
  let notes: readonly ReflectionNote[] = [
    { label: "Material", value: state.object.title.trim() ? "Named by you" : "Still open" },
    { label: "Direction", value: state.request.intention.trim() ? "Intention is explicit" : "Still open" },
    { label: "Boundary", value: `${includeCount} inside · ${excludeCount} outside` },
    { label: "Resolution", value: state.request.depth },
  ];

  if (pathname === "/wonder") {
    const hasDraft = Boolean(wonderDraft.trim());
    const operation = state.workspace.operation;
    title = operation === "rest"
      ? "The orientation can remain unfinished."
      : hasDraft
        ? "The same question is still here."
        : "Begin before you know the answer.";
    introduction = operation === "rest"
      ? "Rest preserves the work and its uncertainty. It does not convert either into a conclusion."
      : "This margin follows the work without interpreting, completing, or directing it.";
    notes = [
      { label: "Current lens", value: operation },
      { label: "Question Anchor", value: hasDraft ? "Held in view" : "Still open" },
      { label: "Material", value: state.object.title.trim() ? "Placed by you" : "Not yet placed" },
      {
        label: "Encounter",
        value: state.workspace.encounter.sourceId
          ? `${state.workspace.encounter.fragments.length} exact fragment${state.workspace.encounter.fragments.length === 1 ? "" : "s"} held`
          : "No source opened",
      },
      { label: "Relationship", value: state.workspace.relation.trim() ? "Named by you" : "Still open" },
      { label: "Uncertainty", value: state.workspace.uncertainty.trim() ? "Preserved" : "Still open" },
      { label: "Reflection", value: state.workspace.reflection.trim() ? "Human-authored" : "Still open" },
    ];
    openItem = operation === "rest"
      ? "The decision to continue or stop remains yours."
      : `Only the ${operation} operation currently asks for attention.`;
  } else if (pathname === "/object") {
    title = state.object.title.trim() ? "The material has an identity." : "The material is still open.";
    introduction = "Only the identity and source details you provide are reflected. The material has not been inspected.";
    notes = [
      { label: "Named as", value: state.object.type || "Type still open" },
      { label: "Source", value: state.object.url.trim() ? "A URL reference is present" : state.object.fileName || "Not provided" },
      { label: "Wonder", value: state.wonder ? "Original note preserved" : "No Wonder note" },
    ];
    openItem = state.object.title.trim() && state.object.type
      ? "No additional material identity is required."
      : "Material identity remains incomplete.";
  } else if (pathname === "/request") {
    const ready = Boolean(state.request.intention.trim() && includeCount > 0);
    title = ready ? "The orientation can be read as a whole." : "The orientation is still taking shape.";
    introduction = "Each field makes one part of your intention explicit. The subject itself is not being interpreted.";
    openItem = !state.request.intention.trim()
      ? "Intention remains open."
      : includeCount === 0
        ? "The included boundary remains open."
        : !state.request.successBoundary.trim()
          ? "A success boundary has not been specified."
          : "No required local field remains open.";
  } else if (pathname === "/confirmation") {
    title = "Your orientation has a shape.";
    introduction = "The material, direction and boundary now sit together. The decision to begin remains yours.";
    openItem = "Only the Human decision to begin remains open.";
  }

  return (
    <div className="journey-reflection">
      <ReflectionMargin
        title={title}
        introduction={introduction}
        notes={notes}
        openItem={openItem}
      />
    </div>
  );
}
