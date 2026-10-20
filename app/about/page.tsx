import type { Metadata } from "next";
import Link from "next/link";
import { PublicPageIntro } from "@/features/library/components/PublicPageIntro";

export const metadata: Metadata = {
  title: "About",
  description: "NEXAHEDRON is the A0 Human View: a bounded, browser-local orientation instrument by NEXAH.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <article className="public-page about-page">
      <PublicPageIntro eyebrow="About" title="NEXAHEDRON is the A0 Human View.">
        <p>
          It gives one Human question a visible place, lets a person consider
          another position and keeps boundaries and unresolved difference in
          view. It does not supply meaning or decide what comes next.
        </p>
      </PublicPageIntro>

      <section className="about-statement" aria-labelledby="about-nexah">
        <p className="home-answer__index">01</p>
        <div>
          <p className="public-kicker">The source relationship</p>
          <h2 id="about-nexah">A0 belongs to NEXAH.</h2>
          <p>NEXAH holds the method, scientific context, source records and claim boundaries. NEXAHEDRON presents one bounded Human-facing experience of that work.</p>
          <p><a href="https://nexah.de/about/">Understand the method and science at nexah.de <span aria-hidden="true">↗</span></a></p>
        </div>
      </section>

      <section className="about-statement" aria-labelledby="about-orion">
        <p className="home-answer__index">02</p>
        <div>
          <p className="public-kicker">The Human-facing instrument</p>
          <h2 id="about-orion">Place. Attend. Turn. Return.</h2>
          <p>The Human View holds a question, material, relationships, boundaries and reflection on one visible surface. Its working state remains in the current browser session.</p>
        </div>
      </section>

      <section className="about-statement" aria-labelledby="about-nexahedron">
        <p className="home-answer__index">03</p>
        <div>
          <p className="public-kicker">The execution boundary</p>
          <h2 id="about-nexahedron">One person. One question. No hidden interpretation.</h2>
          <p>NEXAHEDRON preserves the existing bounded session machine. ORION remains an optional, separately confirmed boundary after Rest. No private research surface, persistent profile or automatic judgment enters the Human View.</p>
        </div>
      </section>

      <section className="about-statement" aria-labelledby="about-purpose">
        <p className="home-answer__index">04</p>
        <div>
          <p className="public-kicker">Why another view?</p>
          <h2 id="about-purpose">A change of view changes what becomes available.</h2>
          <p>The Human View helps distinguish what a representation preserves, loses, adds or leaves unavailable. Those distinctions support orientation; they are not conclusions about the world.</p>
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
          <Link href="/orient">Enter the A0 Human View <span aria-hidden="true">→</span></Link>
          <Link href="/visitor-guide">Read the boundary guide <span aria-hidden="true">→</span></Link>
          <a href="https://nexah.de/about/">Open NEXAH method and science <span aria-hidden="true">↗</span></a>
          <a href="https://github.com/Scarabaeus1031/NEXAHEDRON">Inspect the reference implementation <span aria-hidden="true">↗</span></a>
        </div>
      </section>
    </article>
  );
}
