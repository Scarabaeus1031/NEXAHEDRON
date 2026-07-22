import Link from "next/link";
import type { OrientationCasePreview } from "@/features/library/data";

export function CaseCard({ orientationCase }: { readonly orientationCase: OrientationCasePreview }) {
  const contents = (
    <>
      <span className="case-card__meta">
        {orientationCase.category} · {orientationCase.status}
      </span>
      <strong>{orientationCase.title}</strong>
      <span className="case-card__intention">“{orientationCase.intention}”</span>
      <span className="case-card__description">{orientationCase.description}</span>
      <span className="case-card__footer">
        {orientationCase.available ? orientationCase.readingTime : "A future room"}
        <span aria-hidden="true">{orientationCase.available ? "→" : "○"}</span>
      </span>
    </>
  );

  if (!orientationCase.available) {
    return <article className="case-card case-card--planned">{contents}</article>;
  }

  return (
    <Link className="case-card" href={`/cases/${orientationCase.slug}`}>
      {contents}
    </Link>
  );
}
