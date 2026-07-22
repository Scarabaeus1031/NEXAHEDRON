import { useAlphaJourney } from "@/hooks/use-alpha-journey";

function readable(items: readonly string[], fallback: string) {
  const values = items.map((item) => item.trim()).filter(Boolean);
  return values.length ? values.join(" · ") : fallback;
}

export function RequestSummary({ compact = false }: { readonly compact?: boolean }) {
  const { state } = useAlphaJourney();
  const { object, request } = state;

  return (
    <aside className={`request-summary${compact ? " request-summary--compact" : ""}`} aria-labelledby="request-summary-title" aria-live="polite">
      <p className="eyebrow">Live Request Summary</p>
      <h2 id="request-summary-title">{object.title || "Orientation Object missing"}</h2>
      <dl>
        <div><dt>Object</dt><dd>{object.title || "Missing"} {object.type ? `· ${object.type}` : ""}</dd></div>
        <div><dt>Intention</dt><dd>{request.intention.trim() || "Missing"}</dd></div>
        <div>
          <dt>Scope</dt>
          <dd>
            Include: {readable(request.scopeInclude, "missing")}
            {request.scopeExclude.some((item) => item.trim()) ? ` · Exclude: ${readable(request.scopeExclude, "none")}` : ""}
          </dd>
        </div>
        <div><dt>Depth</dt><dd>{request.depth}</dd></div>
        <div><dt>Success Boundary</dt><dd>{request.successBoundary.trim() || "Not specified"}</dd></div>
        <div><dt>Effects</dt><dd>none</dd></div>
      </dl>
    </aside>
  );
}
