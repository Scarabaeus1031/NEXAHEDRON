import type { ReactNode } from "react";

export function CaseSection({
  index,
  title,
  children,
  tone,
}: {
  readonly index: string;
  readonly title: string;
  readonly children: ReactNode;
  readonly tone?: "evidence" | "unknown" | "reflection";
}) {
  return (
    <section className={tone ? `orientation-case__section orientation-case__section--${tone}` : "orientation-case__section"} aria-labelledby={`case-${index}`}>
      <div className="orientation-case__section-heading">
        <span>{index}</span>
        <h2 id={`case-${index}`}>{title}</h2>
      </div>
      <div className="orientation-case__section-body">{children}</div>
    </section>
  );
}
