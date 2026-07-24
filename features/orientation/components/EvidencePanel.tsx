import { PublicValueView } from "@/features/orientation/components/PublicValueView";
import type { EvidenceReferenceV1 } from "@/packages/orion-gateway/src/index";

export function EvidencePanel({ evidence, references }: { readonly evidence: readonly EvidenceReferenceV1[]; readonly references: readonly string[] }) {
  const byReference = new Map(evidence.map((item) => [`${item.evidence_id}@${item.evidence_version}`, item]));
  return (
    <section className="report-section" aria-labelledby="evidence-title">
      <div className="report-section__heading"><p className="eyebrow">Public contracts</p><h2 id="evidence-title">Evidence</h2></div>
      {!references.length ? <p className="empty-state">No Evidence Reference is present in this report.</p> : null}
      <div className="evidence-stack">
        {references.map((reference) => {
          const item = byReference.get(reference);
          if (!item) return <article className="evidence-card" key={reference}><h3>{reference}</h3><p className="empty-state">The referenced Evidence contract was not supplied to this consumer.</p></article>;
          return (
            <article className="evidence-card" key={reference}>
              <h3>{reference}</h3>
              <dl className="contract-table">
                <Row label="Source" value={item.source} />
                <Row label="Version" value={item.source.source_version} />
                <Row label="Fragment" value={item.source.fragment_ref} />
                <Row label="Relationship" value={item.relationship} />
                <Row label="Authority" value={item.authority} />
                <Row label="Access" value={item.access_status} />
                <Row label="Provenance" value={item.provenance} />
                <Row label="Traceability" value={item.traceability} />
                <Row label="Validation" value={item.validation} />
                <Row label="Evidence class" value={item.evidence_class} />
                <Row label="Evidence level" value={item.evidence_level} />
                <Row label="Evidence scale ID" value={item.evidence_scale_id} />
                <Row label="Evidence scale version" value={item.evidence_scale_version} />
              </dl>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function Row({ label, value }: { readonly label: string; readonly value: unknown }) {
  return <div><dt>{label}</dt><dd><PublicValueView value={value} /></dd></div>;
}
