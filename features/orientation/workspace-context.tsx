"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

interface WorkspaceDraftContextValue {
  readonly wonderDraft: string;
  readonly setWonderDraft: (value: string) => void;
}

const WorkspaceDraftContext = createContext<WorkspaceDraftContextValue | null>(null);

export function WorkspaceDraftProvider({
  initialWonder,
  children,
}: {
  readonly initialWonder: string;
  readonly children: ReactNode;
}) {
  const [wonderDraft, setWonderDraft] = useState(initialWonder);

  const value = useMemo(
    () => ({ wonderDraft, setWonderDraft }),
    [wonderDraft],
  );

  return (
    <WorkspaceDraftContext.Provider value={value}>
      {children}
    </WorkspaceDraftContext.Provider>
  );
}

export function useWorkspaceDraft() {
  const context = useContext(WorkspaceDraftContext);
  if (!context) {
    throw new Error("useWorkspaceDraft must be used inside WorkspaceDraftProvider");
  }
  return context;
}
