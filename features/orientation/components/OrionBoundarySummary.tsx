type OrionBoundarySummaryProps = {
  readonly gatewayStatus: string;
  readonly outcomeStatus: string;
  readonly contractType: string;
  readonly producer: string;
};

export function OrionBoundarySummary({
  gatewayStatus,
  outcomeStatus,
  contractType,
  producer,
}: OrionBoundarySummaryProps) {
  return (
    <section className="orion-boundary-summary" aria-labelledby="orion-boundary-summary-title">
      <div>
        <p className="eyebrow">Observed ORION boundary</p>
        <h2 id="orion-boundary-summary-title">What this screen can verify.</h2>
      </div>
      <dl>
        <div><dt>Certified Core</dt><dd>ORION V1 exists as a separately certified Core. This screen does not itself prove that Core execution occurred.</dd></div>
        <div><dt>Runtime</dt><dd>No compatible Runtime identity or version is asserted unless the returned public contract exposes it.</dd></div>
        <div><dt>Gateway</dt><dd>{gatewayStatus}</dd></div>
        <div><dt>Observed outcome</dt><dd>{outcomeStatus}</dd></div>
        <div><dt>Producer</dt><dd>{producer}</dd></div>
        <div><dt>Contract type</dt><dd>{contractType}</dd></div>
      </dl>
    </section>
  );
}
