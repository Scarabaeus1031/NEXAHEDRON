import type { Metadata } from "next";
import { CaseCard } from "@/features/library/components/CaseCard";
import { PublicPageIntro } from "@/features/library/components/PublicPageIntro";
import { orientationCases } from "@/features/library/data";

export default function CasesPage() {
  return (
    <article className="public-page cases-page">
      <PublicPageIntro eyebrow="Curated Reference Cases" title="See one possible orientation before entering the experiment.">
        <p>
          These cases were created by Human and editorial authors. They are not
          live Workspace results, ORION outputs, or claims of general system
          capability.
        </p>
      </PublicPageIntro>
      <section aria-labelledby="cases-title">
        <div className="section-heading">
          <div>
            <p className="public-kicker">The collection</p>
            <h2 id="cases-title">Foundations before expansion.</h2>
          </div>
          <p>Five Curated Reference Cases form the current public collection. Sources, editorial lineage, limits, and open continuations remain visible.</p>
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
  title: "Curated Reference Cases",
  description: "Inspect Human- and editorial-authored reference cases with visible sources, boundaries and lineage.",
  alternates: { canonical: "/cases" },
};
