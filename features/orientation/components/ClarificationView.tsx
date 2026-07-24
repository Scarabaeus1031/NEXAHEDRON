import type { FormEvent } from "react";
import { PublicValueView } from "@/features/orientation/components/PublicValueView";
import type { ClarificationResultV1 } from "@/packages/orion-gateway/src/index";
import type { ClarificationValues } from "@/features/orientation/integration/request-mapping";

export function ClarificationView({ clarification, values, onChange, onSubmit }: {
  readonly clarification: ClarificationResultV1;
  readonly values: ClarificationValues;
  readonly onChange: (values: ClarificationValues) => void;
  readonly onSubmit: () => void;
}) {
  const needsVersion = clarification.issues.some((issue) => issue.field_path.includes("object_version"));
  const needsAccess = clarification.issues.some((issue) => issue.field_path.includes("access_status"));
  const complete = (!needsVersion || Boolean(values.objectVersion?.trim())) && (!needsAccess || Boolean(values.accessStatus));

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (complete) onSubmit();
  }

  return (
    <section className="clarification-view" aria-labelledby="clarification-title">
      <header className="report-header">
        <p className="eyebrow">Clarification Required</p>
        <h1 id="clarification-title">One boundary needs your attention.</h1>
        <p>Only the values identified by ORION are requested. Your valid object, intention and scope remain preserved.</p>
      </header>

      <section className="preserved-context" aria-labelledby="preserved-title">
        <h2 id="preserved-title">Preserved context</h2>
        <PublicValueView value={clarification.retained_context} />
      </section>

      <form className="clarification-form" onSubmit={submit}>
        {clarification.issues.map((issue) => (
          <article className="clarification-card" key={issue.issue_id}>
            <div className="clarification-card__heading"><h2>{issue.field_path}</h2><span>{issue.priority_tier}</span></div>
            <dl className="contract-table">
              <Row label="What is missing" value={issue.issue_code} />
              <Row label="Why it is required" value={issue.reason} />
              <Row label="Expected value" value={issue.expected_value} />
              <Row label="Required Human action" value={issue.required_action} />
              <Row label="Current value references" value={issue.current_value_refs} />
              <Row label="Allowed values" value={issue.allowed_values} />
              <Row label="Conflicts with" value={issue.conflicts_with} />
              <Row label="Blocking" value={issue.blocking} />
            </dl>
            {issue.field_path.includes("object_version") ? (
              <div className="clarification-input"><label htmlFor={`${issue.issue_id}-version`}>Object and source version</label><input id={`${issue.issue_id}-version`} value={values.objectVersion ?? ""} onChange={(event) => onChange({ ...values, objectVersion: event.target.value })} required /></div>
            ) : null}
            {issue.field_path.includes("access_status") ? (
              <div className="clarification-input"><label htmlFor={`${issue.issue_id}-access`}>Confirmed source access</label><select id={`${issue.issue_id}-access`} value={values.accessStatus ?? ""} onChange={(event) => onChange({ ...values, accessStatus: event.target.value as ClarificationValues["accessStatus"] })} required><option value="">Choose access</option><option value="available">Available</option><option value="restricted">Restricted</option><option value="unavailable">Unavailable</option></select></div>
            ) : null}
          </article>
        ))}
        <section className="required-actions" aria-labelledby="required-actions-title"><h2 id="required-actions-title">Required user actions</h2><PublicValueView value={clarification.required_user_actions} /></section>
        <button className="action action--primary" type="submit" disabled={!complete}>Review clarified request <span aria-hidden="true">→</span></button>
      </form>
    </section>
  );
}

function Row({ label, value }: { readonly label: string; readonly value: unknown }) {
  return <div><dt>{label}</dt><dd><PublicValueView value={value} /></dd></div>;
}
