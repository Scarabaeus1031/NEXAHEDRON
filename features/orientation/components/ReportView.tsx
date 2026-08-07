import { EvidencePanel } from "@/features/orientation/components/EvidencePanel";
import { OrionBoundarySummary } from "@/features/orientation/components/OrionBoundarySummary";
import { PublicValueView } from "@/features/orientation/components/PublicValueView";
import type { ContinuationOptionV1, EvidenceReferenceV1, OrientationReportV1 } from "@/packages/orion-gateway/src/index";

export function ReportView({ report, evidence, continuations, onRest }: { readonly report: OrientationReportV1; readonly evidence: readonly EvidenceReferenceV1[]; readonly continuations: readonly ContinuationOptionV1[]; readonly onRest: () => void }) {
  return (
    <div className="report-view">
      <header className="report-header">
        <p className="eyebrow">Orientation Report · {report.status}</p>
        <h1>{report.status === "blocked" ? "Orientation is blocked at the evidence boundary." : "Orientation Report"}</h1>
        <p>{textValue(report.mode_payload.content.orientation_summary)}</p>
        <dl><div><dt>Report</dt><dd>{report.identity.report_id}@{report.identity.report_version}</dd></div><div><dt>Effects</dt><dd>{report.effects}</dd></div></dl>
      </header>
      <OrionBoundarySummary
        gatewayStatus="A report contract reached the Workspace through the public Gateway."
        outcomeStatus={`Orientation Report received with status “${report.status}”.`}
        producer="Compatible Runtime response observed through the public Gateway"
        contractType={`OrientationReport ${report.identity.report_version}`}
      />

      <ContractSection title="Orientation" value={report.orientation} />
      <ContractSection title="Representations" value={report.representations} />
      <ContractSection title="Process" value={report.process} />

      <section className="report-section" aria-labelledby="understanding-frame-title">
        <div className="report-section__heading"><p className="eyebrow">Mode payload · {report.mode_payload.payload_version}</p><h2 id="understanding-frame-title">Understanding Frame</h2></div>
        <div className="payload-sections">
          {Object.entries(report.mode_payload.content).map(([key, value]) => (
            <section key={key}><h3>{key}</h3><PublicValueView value={value} /></section>
          ))}
        </div>
      </section>

      <EvidencePanel evidence={evidence} references={report.evidence} />
      <ContractSection title="Assumptions" value={report.assumptions} />
      <ContractSection title="Uncertainties" value={report.uncertainties} />
      <ContractSection title="Issues" value={report.issues} />
      <ContractSection title="Confidence" value={report.confidence} />
      <ContractSection title="Validation" value={report.validation} />

      <section className="report-section" aria-labelledby="continuations-title">
        <div className="report-section__heading"><p className="eyebrow">Human decision</p><h2 id="continuations-title">Continuation Options</h2></div>
        {!continuations.length ? <p className="empty-state">No Continuation Option is available.</p> : continuations.map((option) => (
          <article className="continuation-card" key={option.option_id}>
            <h3>{option.action_type}</h3>
            <dl className="contract-table"><Row label="Source report" value={`${option.source_report_id}@${option.source_report_version}`} /><Row label="Availability" value={option.availability} /><Row label="Reason references" value={option.reason_refs} /><Row label="Preserved context" value={option.preserved_context} /><Row label="Request delta" value={option.request_delta} /><Row label="Blockers" value={option.blockers} /><Row label="Required Human actions" value={option.required_user_actions} /><Row label="Effects" value={option.effects} /></dl>
          </article>
        ))}
      </section>

      <div className="confirmation-actions">
        <button className="action action--primary" type="button" onClick={onRest}>
          Return to Working Session Record
        </button>
      </div>
    </div>
  );
}

function ContractSection({ title, value }: { readonly title: string; readonly value: unknown }) {
  const id = `${title.toLowerCase().replaceAll(" ", "-")}-title`;
  return <section className="report-section" aria-labelledby={id}><div className="report-section__heading"><p className="eyebrow">Orientation Report 1.0</p><h2 id={id}>{title}</h2></div><PublicValueView value={value} /></section>;
}

function Row({ label, value }: { readonly label: string; readonly value: unknown }) {
  return <div><dt>{label}</dt><dd><PublicValueView value={value} /></dd></div>;
}

function textValue(value: unknown) {
  return typeof value === "string" ? value : "No orientation summary is present.";
}
