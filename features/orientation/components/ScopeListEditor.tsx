import type { ScopeField } from "@/features/orientation/state";
import { useAlphaJourney } from "@/hooks/use-alpha-journey";

export function ScopeListEditor({
  field,
  label,
  description,
  required = false,
}: {
  readonly field: ScopeField;
  readonly label: string;
  readonly description: string;
  readonly required?: boolean;
}) {
  const { state, dispatch } = useAlphaJourney();
  const values = state.request[field];
  const missing = required && !values.some((value) => value.trim());

  return (
    <section className={`editor-card editor-card--scope editor-card--${field}`} aria-labelledby={`${field}-title`}>
      <div className="editor-card__heading">
        <div>
          <p className="eyebrow">Scope</p>
          <h2 id={`${field}-title`}>{label}</h2>
        </div>
        <span>{required ? "Required" : "Optional"}</span>
      </div>
      <p className="editor-card__description">{description}</p>
      <div className="scope-list">
        {values.map((value, index) => (
          <div className="scope-row" key={`${field}-${index}`}>
            <label className="sr-only" htmlFor={`${field}-${index}`}>{label} item {index + 1}</label>
            <input
              id={`${field}-${index}`}
              value={value}
              onChange={(event) => dispatch({ type: "EDIT_SCOPE_ITEM", field, index, value: event.target.value })}
              placeholder={field === "scopeInclude" ? "What belongs inside this orientation?" : "What should remain outside?"}
              aria-invalid={missing}
            />
            <button type="button" onClick={() => dispatch({ type: "REMOVE_SCOPE_ITEM", field, index })} aria-label={`Remove ${label} item ${index + 1}`}>
              Remove
            </button>
          </div>
        ))}
      </div>
      {missing ? <p className="field-issue" role="alert">Add at least one item to Scope Include.</p> : null}
      <button className="add-row" type="button" onClick={() => dispatch({ type: "ADD_SCOPE_ITEM", field })}>
        + Add another
      </button>
    </section>
  );
}
