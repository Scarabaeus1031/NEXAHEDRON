import type { Metadata } from "next";
import Link from "next/link";
import { PublicPageIntro } from "@/features/library/components/PublicPageIntro";

export const metadata: Metadata = {
  title: "About",
  description: "What NEXAHEDRON owns, what it does not own and how Human authority remains central.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <article className="public-page about-page">
      <PublicPageIntro eyebrow="About" title="Information already exists. Orientation is what is missing.">
        <p>
          NEXAH helps people see how information relates, where its boundaries
          are, and which directions remain open. Sources stay visible. Judgment
          stays Human.
        </p>
      </PublicPageIntro>

      <section className="about-statement" aria-labelledby="about-nexah">
        <p className="home-answer__index">01</p>
        <div>
          <p className="public-kicker">The Orientation Ecosystem</p>
          <h2 id="about-nexah">NEXAH is a place for orientation.</h2>
          <p>It connects research, a deterministic Core, and a Human-facing Workspace so people can understand relationships, limits, and possible directions.</p>
        </div>
      </section>

      <section className="about-statement" aria-labelledby="about-orion">
        <p className="home-answer__index">02</p>
        <div>
          <p className="public-kicker">The deterministic Core</p>
          <h2 id="about-orion">ORION makes structure inspectable.</h2>
          <p>It creates certified structural orientation from bounded material. Its results are deterministic, traceable, and open to review. It does not decide what the material means or what a Human should do.</p>
        </div>
      </section>

      <section className="about-statement" aria-labelledby="about-nexahedron">
        <p className="home-answer__index">03</p>
        <div>
          <p className="public-kicker">The public research demonstrator</p>
          <h2 id="about-nexahedron">One person. One question. One bounded experiment.</h2>
          <p>NEXAHEDRON lets a Human encounter material, name relationships and boundaries, reflect, and Rest with a transient Working Session Record. The current record exists only while the browser session remains open.</p>
        </div>
      </section>

      <section className="about-statement" aria-labelledby="about-purpose">
        <p className="home-answer__index">04</p>
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
          <Link href="/cases/plate-tectonics">Begin with a Curated Reference Case <span aria-hidden="true">→</span></Link>
          <Link href="/orient">Try the live experiment <span aria-hidden="true">→</span></Link>
          <a href="https://github.com/Scarabaeus1031/NEXAHEDRON">Inspect the reference implementation <span aria-hidden="true">↗</span></a>
        </div>
      </section>
    </article>
  );
}
