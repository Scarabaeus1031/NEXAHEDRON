import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "From NEXAHEDRON to NEXAH",
  description: "Von der A0 Human View zur weiteren NEXAH-Methode, zum Visitor Guide und zum öffentlichen Forschungskontext.",
  alternates: { canonical: "/about" },
};

const nexahDoors = [
  {
    index: "01",
    eyebrow: "Begin with the field",
    title: "Visitor Guide",
    copy: "Lerne die größere NEXAH-Landschaft kennen und wähle, wo du eintreten möchtest.",
    href: "https://nexah.de/visitor-guide/",
    action: "Open at nexah.de",
  },
  {
    index: "02",
    eyebrow: "Understand the practice",
    title: "Method & context",
    copy: "Lies, wie menschliches Urteil, Quellen, Öffnungen und ein ausdrücklicher Return zusammengehören.",
    href: "https://nexah.de/about/",
    action: "Continue to NEXAH",
  },
  {
    index: "03",
    eyebrow: "Inspect the record",
    title: "Science Lab",
    copy: "Sieh öffentliche Forschungsrecords, Grenzen und quellgebundene Arbeit — ohne private Steuerflächen zu betreten.",
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
          <p>NEXAHEDRON ist die A0 Human View: ein begrenzter Ort zum Eintreten, Hinsehen, Drehen und Zurückkehren. NEXAH ist die weitere Praxis dahinter — Methode, Quellenlandschaft und öffentlicher Forschungskontext.</p>
          <div className="about-threshold-actions">
            <a className="about-threshold-actions__primary" href="#crossing">Cross to NEXAH <span aria-hidden="true">↓</span></a>
            <Link href="/">Return to A0 World <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
        <div className="about-threshold-orbit" aria-hidden="true">
          <span className="about-threshold-orbit__outer" />
          <span className="about-threshold-orbit__inner" />
          <i>✦</i>
          <small>EINE SICHT<br />WEITERES FELD</small>
        </div>
        <div className="about-threshold-route" aria-label="Weg von NEXAHEDRON zu NEXAH">
          <span>NEXAHEDRON<br /><small>A0 Human View</small></span>
          <i aria-hidden="true" />
          <span>NEXAH<br /><small>Methode · Quellen · Forschung</small></span>
        </div>
      </section>

      <section className="about-crossing" id="crossing" aria-labelledby="about-crossing-title">
        <div>
          <p className="public-kicker">The threshold</p>
          <h2 id="about-crossing-title">The room ends.<br />The field opens.</h2>
        </div>
        <p>Dies ist weder ein Wechsel der Zuständigkeit noch ein zweites System. Es ist ein Wechsel des Maßstabs. Die Erfahrung bleibt NEXAHEDRON; Fragen, Quellen und Methode kehren in den weiteren NEXAH-Kontext zurück.</p>
      </section>

      <section className="about-roles" aria-label="Wege zu NEXAH und Scarabæus">
        <article className="about-roles__nexah">
          <span>THERE · ORIENTATION</span>
          <div className="about-roles__field" aria-hidden="true">
            <span className="about-roles__field-ring about-roles__field-ring--outer" />
            <span className="about-roles__field-ring about-roles__field-ring--inner" />
            <span className="about-roles__field-axis about-roles__field-axis--x" />
            <span className="about-roles__field-axis about-roles__field-axis--y" />
            <i>✦</i>
          </div>
          <h2>NEXAH</h2>
          <p>Hier liegen die weitere Methode, ihre öffentliche Erklärung und die Wege zu Quellen, Forschung und anschließender Arbeit.</p>
          <a href="https://nexah.de/">Enter nexah.de <span aria-hidden="true">↗</span></a>
        </article>
        <article className="about-roles__scarabaeus">
          <span>ELSEWHERE · WORKSHOP</span>
          <Image src="/images/scarabaeus-1033.webp" alt="" aria-hidden="true" width={1024} height={1024} />
          <h2>SCARABÆUS <em>1033</em></h2>
          <p>Die dunklere visuelle Werkstatt desselben Feldes — hier können Symbole, Bilder und spekulative Formen bestehen, bevor sie in Erklärung, Forschung oder Anwendung eintreten.</p>
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
          <p>Keine einzelne Tür beansprucht das Ganze. Jede öffnet eine andere öffentliche Sicht und hält ihre Quelle sichtbar.</p>
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

      <section className="about-return" id="return-to-nexahedron" aria-label="Rückkehr zu NEXAHEDRON">
        <div>
          <span>RETURN · NEXAHEDRON</span>
          <h2>Back to the Human View.</h2>
        </div>
        <p>Du kannst zur A0 Human View zurückkehren, ohne die Unterscheidung zwischen Erfahrung und Quelle zu verlieren.</p>
        <Link href="/">Return to NEXAHEDRON <span aria-hidden="true">↗</span></Link>
      </section>
    </article>
  );
}
