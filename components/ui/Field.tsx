import type { ReactNode } from "react";

export function Field({
  id,
  label,
  hint,
  optional = false,
  children,
}: {
  readonly id: string;
  readonly label: string;
  readonly hint?: string;
  readonly optional?: boolean;
  readonly children: ReactNode;
}) {
  const hintId = hint ? `${id}-hint` : undefined;
  return (
    <div className="field">
      <div className="field__heading">
        <label htmlFor={id}>{label}</label>
        {optional ? <span>Optional</span> : null}
      </div>
      {hint ? (
        <p className="field__hint" id={hintId}>
          {hint}
        </p>
      ) : null}
      <div data-description-id={hintId}>{children}</div>
    </div>
  );
}
