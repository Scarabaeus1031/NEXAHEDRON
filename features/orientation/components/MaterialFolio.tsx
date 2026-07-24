"use client";

import type { ReactNode } from "react";
import { useAlphaJourney } from "@/hooks/use-alpha-journey";

function values(items: readonly string[]) {
  return items.map((item) => item.trim()).filter(Boolean);
}

function ValueList({ items, fallback }: { readonly items: readonly string[]; readonly fallback: string }) {
  const present = values(items);
  return present.length ? (
    <ul>{present.map((item) => <li key={item}>{item}</li>)}</ul>
  ) : (
    <span>{fallback}</span>
  );
}

export function MaterialFolio({
  children,
  showOrientation = false,
}: {
  readonly children?: ReactNode;
  readonly showOrientation?: boolean;
}) {
  const { state } = useAlphaJourney();
  const source = state.object.url || state.object.fileName || "Not provided";
  const title = state.object.title || state.wonder || "Material is still open.";

  return (
    <section className={`material-folio${children ? " material-folio--working" : ""}`} aria-labelledby="material-folio-title">
      <header className="material-folio__header">
        <p className="eyebrow" id="material-folio-title">Material folio</p>
        <span>Human-held · local</span>
      </header>

      {children ? (
        <div className="material-folio__working">
          {children}
        </div>
      ) : (
        <>
          <p className="material-folio__identity">Orientation Object</p>
          <h2>{title}</h2>
          <dl className="material-folio__source">
            <div><dt>Object type</dt><dd>{state.object.type || "Not yet named"}</dd></div>
            <div><dt>Source</dt><dd>{source}</dd></div>
            <div><dt>Version</dt><dd>Not provided</dd></div>
          </dl>
          <div className="material-folio__annotation">
            <span>Wonder note · Human annotation</span>
            <p>{state.wonder ? `“${state.wonder}”` : "Not provided"}</p>
          </div>
        </>
      )}

      {showOrientation ? (
        <div className="material-folio__orientation">
          <p className="eyebrow">Human-authored orientation</p>
          <dl>
            <div><dt>Intention</dt><dd>{state.request.intention.trim() || "Still open"}</dd></div>
            <div><dt>Focus</dt><dd>{state.request.focus.trim() || "Not specified"}</dd></div>
            <div><dt>Scope Include</dt><dd><ValueList items={state.request.scopeInclude} fallback="Still open" /></dd></div>
            <div><dt>Scope Exclude</dt><dd><ValueList items={state.request.scopeExclude} fallback="None specified" /></dd></div>
            <div><dt>Depth</dt><dd>{state.request.depth}</dd></div>
            <div><dt>Success Boundary</dt><dd>{state.request.successBoundary.trim() || "Not specified"}</dd></div>
            <div><dt>Effects</dt><dd>none</dd></div>
          </dl>
        </div>
      ) : null}
    </section>
  );
}
