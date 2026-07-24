import type { Metadata } from "next";
import { CaseCard } from "@/features/library/components/CaseCard";
import { PublicPageIntro } from "@/features/library/components/PublicPageIntro";
import { orientationCases } from "@/features/library/data";

export default function CasesPage() {
  return (
    <article className="public-page cases-page">
      <PublicPageIntro eyebrow="Orientation Cases" title="Begin with what draws your attention.">
        <p>
          Enter through a subject or a question. Each case makes context,
          evidence, uncertainty, boundaries, and possible continuations visible.
        </p>
      </PublicPageIntro>
      <section aria-labelledby="cases-title">
        <div className="section-heading">
          <div>
            <p className="public-kicker">The collection</p>
            <h2 id="cases-title">Foundations before expansion.</h2>
          </div>
          <p>Five canonical cases establish the first public terrain. Each remains bounded, inspectable, and open to continuation.</p>
        </div>
        <div className="case-grid">
          {orientationCases.map((orientationCase) => (
            <CaseCard key={orientationCase.slug} orientationCase={orientationCase} />
          ))}
        </div>
      </section>
    </article>
  );
}
export const metadata: Metadata = {
  title: "Orientation Cases",
  description: "Inspect bounded Orientation Cases with visible context, evidence, uncertainty and continuations.",
  alternates: { canonical: "/cases" },
};
