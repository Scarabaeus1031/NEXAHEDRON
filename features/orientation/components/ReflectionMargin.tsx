import { useId } from "react";

export interface ReflectionNote {
  readonly label: string;
  readonly value: string;
}

export function ReflectionMargin({
  title,
  introduction,
  notes,
  openItem,
  className = "",
}: {
  readonly title: string;
  readonly introduction: string;
  readonly notes: readonly ReflectionNote[];
  readonly openItem: string;
  readonly className?: string;
}) {
  const titleId = useId();

  return (
    <aside
      className={`reflection-margin ${className}`.trim()}
      aria-labelledby={titleId}
      aria-live="polite"
      aria-atomic="true"
    >
      <p className="eyebrow">Working reflection</p>
      <h2 id={titleId}>{title}</h2>
      <p className="reflection-margin__introduction">{introduction}</p>
      <dl>
        {notes.map((note) => (
          <div key={note.label}>
            <dt>{note.label}</dt>
            <dd>{note.value}</dd>
          </div>
        ))}
      </dl>
      <p className="reflection-margin__question">
        <span>Still open</span>
        {openItem}
      </p>
      <small>These notes reflect only what you have made explicit. Nothing has been interpreted.</small>
    </aside>
  );
}
