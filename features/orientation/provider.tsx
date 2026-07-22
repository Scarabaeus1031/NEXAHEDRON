"use client";

import {
  createContext,
  useMemo,
  useReducer,
  type Dispatch,
  type ReactNode,
} from "react";
import {
  initialAlphaJourneyState,
  reduceAlphaJourney,
  type AlphaJourneyAction,
} from "@/features/orientation/state";
import type { AlphaJourneyState } from "@/types/alpha";

interface AlphaJourneyContextValue {
  readonly state: AlphaJourneyState;
  readonly dispatch: Dispatch<AlphaJourneyAction>;
}

export const AlphaJourneyContext =
  createContext<AlphaJourneyContextValue | null>(null);

export function AlphaJourneyProvider({ children }: { readonly children: ReactNode }) {
  const [state, dispatch] = useReducer(
    reduceAlphaJourney,
    initialAlphaJourneyState,
  );
  const value = useMemo(() => ({ state, dispatch }), [state]);

  return (
    <AlphaJourneyContext.Provider value={value}>
      {children}
    </AlphaJourneyContext.Provider>
  );
}
