"use client";

import { useContext } from "react";
import { AlphaJourneyContext } from "@/features/orientation/provider";

export function useAlphaJourney() {
  const context = useContext(AlphaJourneyContext);
  if (!context) {
    throw new Error("useAlphaJourney must be used inside AlphaJourneyProvider");
  }
  return context;
}
