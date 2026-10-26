import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "From NEXAHEDRON to NEXAH",
  description: "Cross from the A0 Human View into the wider NEXAH method, visitor guide and public science context.",
  alternates: { canonical: "/about" },
};

const nexahDoors = [
  {
    index: "01",
    eyebrow: "Begin with the field",
    title: "Visitor Guide",
    copy: "Meet the larger NEXAH landscape and choose where you want to enter.",
    href: "https://nexah.de/visitor-guide/",
    action: "Open at nexah.de",
  },
  {
    index: "02",
    eyebrow: "Understand the practice",
    title: "Method & context",
    copy: "Read how Human judgment, sources, apertures and explicit return belong together.",
    href: "https://nexah.de/about/",
    action: "Continue to NEXAH",
  },
  {
    index: "03",
    eyebrow: "Inspect the record",
    title: "Science Lab",
    copy: "See public research records, limits and source-bound work without entering private control surfaces.",
    href: "https://github.com/Scarabaeus1031/NEXAH-Science-Lab",
    action: "Open the public source",
  },
] as const;

export default function AboutPage() {
  return (
    <article className="public-page about-page about-threshold-page">
      <section className="about-threshold-hero" aria-labelledby="about-threshold-title">
        <div className="about-threshold-hero__copy">
          <p className="public-kicker">NEXAHEDRON → NEXAH</p>
          <h1 id="about-threshold-title">Experience the world.<br /><em>Then meet the method.</em></h1>
          <p>NEXAHEDRON is the A0 Human View: one bounded place to enter, look, turn and return. NEXAH is the wider practice behind it—the method, source landscape and public scientific context.</p>
          <div className="about-threshold-actions">
            <a className="about-threshold-actions__primary" href="#crossing">Cross to NEXAH <span aria-hidden="true">↓</span></a>
            <Link href="/">Return to A0 World <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
        <div className="about-threshold-orbit" aria-hidden="true">
          <span className="about-threshold-orbit__outer" />
          <span className="about-threshold-orbit__inner" />
          <i>✦</i>
          <small>ONE VIEW<br />WIDER FIELD</small>
        </div>
        <div className="about-threshold-route" aria-label="Route from NEXAHEDRON to NEXAH">
          <span>NEXAHEDRON<br /><small>A0 Human View</small></span>
          <i aria-hidden="true" />
          <span>NEXAH<br /><small>Method · sources · science</small></span>
        </div>
      </section>

      <section className="about-crossing" id="crossing" aria-labelledby="about-crossing-title">
        <div>
          <p className="public-kicker">The threshold</p>
          <h2 id="about-crossing-title">The room ends.<br />The field opens.</h2>
        </div>
        <p>This is not a change of ownership or a second system. It is a change of scale. The experience remains NEXAHEDRON; the questions, sources and method return to the wider NEXAH context.</p>
      </section>

      <section className="about-roles" aria-label="NEXAH and Scarabæus destinations">
        <article>
          <span>THERE · ORIENTATION</span>
          <h2>NEXAH</h2>
          <p>Holds the wider method, its public explanation and the paths toward sources, science and further work.</p>
          <a href="https://nexah.de/">Enter nexah.de <span aria-hidden="true">↗</span></a>
        </article>
        <article className="about-roles__scarabaeus">
          <span>ELSEWHERE · WORKSHOP</span>
          <Image src="/images/scarabaeus-1033.webp" alt="" aria-hidden="true" width={1024} height={1024} />
          <h2>SCARABÆUS <em>1033</em></h2>
          <p>The darker visual workshop of the same field—where symbols, images and speculative forms can exist before they enter explanation, research or application.</p>
          <a href="https://www.scarabaeus1033.net/">Enter the visual codex <span aria-hidden="true">↗</span></a>
        </article>
        <span className="about-roles__joint" aria-hidden="true">✦</span>
      </section>

      <section className="about-nexah-doors" id="nexah-field" aria-labelledby="about-nexah-doors-title">
        <div className="about-nexah-clock" aria-hidden="true">
          <span className="about-nexah-clock__ring about-nexah-clock__ring--outer" />
          <span className="about-nexah-clock__ring about-nexah-clock__ring--inner" />
          <span className="about-nexah-clock__axis about-nexah-clock__axis--x" />
          <span className="about-nexah-clock__axis about-nexah-clock__axis--y" />
          <i>✦</i>
        </div>
        <header>
          <div>
            <p className="public-kicker">Three doors into NEXAH</p>
            <h2 id="about-nexah-doors-title">Choose what you need next.</h2>
          </div>
          <p>No single door claims to be the whole. Each opens a different public view and keeps its source visible.</p>
        </header>
        <div>
          {nexahDoors.map((door) => (
            <a href={door.href} key={door.title}>
              <small>{door.index} · {door.eyebrow}</small>
              <h3>{door.title}</h3>
              <p>{door.copy}</p>
              <strong>{door.action} <span aria-hidden="true">↗</span></strong>
            </a>
          ))}
        </div>
      </section>

      <section className="about-return" id="return-to-nexahedron" aria-label="Return to NEXAHEDRON">
        <div>
          <span>RETURN · NEXAHEDRON</span>
          <h2>Back to the Human View.</h2>
        </div>
        <p>You can return to the A0 Human View without losing the distinction between experience and source.</p>
        <Link href="/">Return to NEXAHEDRON <span aria-hidden="true">↗</span></Link>
      </section>
    </article>
  );
}
