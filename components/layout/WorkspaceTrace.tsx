"use client";

import { useAlphaJourney } from "@/hooks/use-alpha-journey";

const workspaceFocus: Readonly<Record<string, string>> = {
  "/wonder": "Orientation · working",
  "/object": "Material · naming",
  "/request": "Orientation · shaping",
  "/confirmation": "Orientation · reviewing",
  "/orientation": "Orientation · submitted",
};

export function WorkspaceTrace({ pathname }: { readonly pathname: string }) {
  const { state } = useAlphaJourney();
  const boundary = pathname === "/orientation"
    ? "Confirmed · public boundary"
    : "Human-held · local until confirmation";
  const focus = pathname === "/wonder"
    ? `Focus · ${state.workspace.operation}`
    : workspaceFocus[pathname] ?? "Working surface";

  return (
    <div className="workspace-trace" aria-label="Orientation workspace">
      <span>Orientation workspace</span>
      <strong>{focus}</strong>
      <span>{boundary}</span>
    </div>
  );
}
