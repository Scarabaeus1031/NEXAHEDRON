import type { RequestValidation } from "@/features/orientation/state";

const checks: ReadonlyArray<{ key: keyof Omit<RequestValidation, "valid">; label: string }> = [
  { key: "object", label: "Orientation Object" },
  { key: "intention", label: "Intention" },
  { key: "scopeInclude", label: "At least one Scope Include" },
];

export function ValidationSummary({ validation }: { readonly validation: RequestValidation }) {
  return (
    <section className="validation-summary" aria-labelledby="validation-title" aria-live="polite">
      <div>
        <p className="eyebrow">Local validation</p>
        <h2 id="validation-title">{validation.valid ? "Ready for Human review" : "Complete the required fields"}</h2>
      </div>
      <ul>
        {checks.map((check) => (
          <li className={validation[check.key] ? "is-valid" : "is-missing"} key={check.key}>
            <span aria-hidden="true">{validation[check.key] ? "✓" : "○"}</span>
            {check.label}
            <span className="sr-only">: {validation[check.key] ? "complete" : "missing"}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
