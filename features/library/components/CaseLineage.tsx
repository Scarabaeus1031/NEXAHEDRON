import type { CaseLineage as CaseLineageRecord } from "@/features/library/case-lineage";

export function CaseLineage({ lineage }: { readonly lineage: CaseLineageRecord }) {
  const headingId = `case-lineage-${lineage.slug}`;

  return (
    <aside className="case-lineage" aria-labelledby={headingId}>
      <header>
        <p className="public-kicker">Case lineage</p>
        <h2 id={headingId}>How this orientation came into being.</h2>
        <p>
          This is editorial provenance. Evidence for the Case&apos;s claims remains separate and inspectable in the Evidence section.
        </p>
      </header>
      <ol>
        {lineage.entries.map((entry) => (
          <li key={`${entry.label}-${entry.title}`}>
            <span>{entry.label}</span>
            <strong>{entry.title}</strong>
            <p>{entry.note}</p>
          </li>
        ))}
      </ol>
    </aside>
  );
}
