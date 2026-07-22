import { useAlphaJourney } from "@/hooks/use-alpha-journey";

export function OrientationContext() {
  const { state } = useAlphaJourney();
  const source = state.object.url || state.object.fileName || "Not provided";

  return (
    <section className="orientation-context" aria-labelledby="orientation-context-title">
      <p className="eyebrow">Selected Orientation Object</p>
      <h2 id="orientation-context-title">{state.object.title || "Not yet defined"}</h2>
      <dl>
        <div><dt>Object type</dt><dd>{state.object.type || "Missing"}</dd></div>
        <div><dt>Source</dt><dd>{source}</dd></div>
      </dl>
      {state.wonder ? (
        <div className="human-annotation">
          <span>Wonder note · Human annotation</span>
          <p>“{state.wonder}”</p>
        </div>
      ) : null}
    </section>
  );
}
