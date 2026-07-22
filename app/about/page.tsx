import Link from "next/link";
import { PublicPageIntro } from "@/features/library/components/PublicPageIntro";

export default function AboutPage() {
  return (
    <article className="public-page about-page">
      <PublicPageIntro eyebrow="About" title="Information already exists. Orientation is what is missing.">
        <p>
          NEXAH helps people find their bearings across knowledge. NEXAHEDRON is
          the first public place to experience that orientation.
        </p>
      </PublicPageIntro>

      <section className="about-statement" aria-labelledby="about-purpose">
        <p className="home-answer__index">01</p>
        <div>
          <p className="public-kicker">Why Orientation?</p>
          <h2 id="about-purpose">Finding is not the same as understanding.</h2>
          <p>Search can locate a source. A summary can compress it. Orientation helps show where a subject belongs, what supports it, where it stops, and which next steps are meaningful.</p>
        </div>
      </section>

      <section className="about-principles" aria-labelledby="principles-title">
        <div className="section-heading">
          <div>
            <p className="public-kicker">What guides this place</p>
            <h2 id="principles-title">A few durable principles.</h2>
          </div>
        </div>
        <div className="principle-list">
          <article><span>01</span><h3>Human first</h3><p>Intention, judgment, meaning, and the decision to continue remain Human.</p></article>
          <article><span>02</span><h3>Evidence before certainty</h3><p>Sources, limitations, disagreement, and unknowns remain visible.</p></article>
          <article><span>03</span><h3>Boundaries create trust</h3><p>A tool should never borrow authority it does not have.</p></article>
          <article><span>04</span><h3>Build slowly</h3><p>One dependable path matters more than many paths that only appear complete.</p></article>
        </div>
      </section>

      <section className="about-contribution" aria-labelledby="contribution-title">
        <div>
          <p className="public-kicker">Help Orientation grow</p>
          <h2 id="contribution-title">Contribution begins with attention.</h2>
          <p>Review a case. Inspect its evidence. Name a missing boundary. Propose a clearer connection. Teach with it. Translate it. Make it more accessible.</p>
        </div>
        <div className="about-contribution__actions">
          <a href="https://github.com/Scarabaeus1031/nexah">Inspect the public project <span aria-hidden="true">↗</span></a>
          <Link href="/cases/plate-tectonics">Begin with a case <span aria-hidden="true">→</span></Link>
          <Link href="/orient">Bring your own subject <span aria-hidden="true">→</span></Link>
        </div>
      </section>
    </article>
  );
}
