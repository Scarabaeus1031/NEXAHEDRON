"use client";

import type { ReactNode } from "react";
import { ReflectionMargin } from "@/features/orientation/components/ReflectionMargin";
import { useAlphaJourney } from "@/hooks/use-alpha-journey";

function countNamed(values: readonly string[]) {
  return values.filter((value) => value.trim()).length;
}

export function JourneyReflection({ pathname }: { readonly pathname: string }) {
  const { state } = useAlphaJourney();

  if (pathname !== "/confirmation" && pathname !== "/orientation") return null;

  const includeCount = countNamed(state.request.scopeInclude);
  const excludeCount = countNamed(state.request.scopeExclude);
  const notes = [
    {
      label: "Material",
      value: state.object.title.trim() ? "Named by you" : "Still open",
    },
    {
      label: "Direction",
      value: state.request.intention.trim() ? "Intention is explicit" : "Still open",
    },
    {
      label: "Boundary",
      value: `${includeCount} inside · ${excludeCount} outside`,
    },
    {
      label: "Resolution",
      value: state.request.depth,
    },
  ];

  if (pathname === "/confirmation") {
    return (
      <JourneyReflectionFrame>
        <ReflectionMargin
          title="Your orientation has a shape."
          introduction="The material, direction and boundary now sit together. The decision to begin remains yours."
          notes={notes}
          question="Does this still express what you want to understand?"
        />
      </JourneyReflectionFrame>
    );
  }

  return (
    <JourneyReflectionFrame>
      <ReflectionMargin
        title="Your preparation remains with you."
        introduction="Execution may complete, pause or fail. The Human-authored orientation is still preserved in this session."
        notes={notes}
        question="If execution cannot continue, what would you revise before trying again?"
      />
    </JourneyReflectionFrame>
  );
}

function JourneyReflectionFrame({ children }: { readonly children: ReactNode }) {
  return <div className="journey-reflection">{children}</div>;
}
