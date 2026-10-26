import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About NEXAHEDRON",
  description: "What NEXAHEDRON is, how its Human View relates to NEXAH, and what its public rooms are for.",
  alternates: { canonical: "/about-nexahedron" },
};

const rooms = [
  {
    index: "01",
    title: "Human View",
    copy: "Der geführte Weg. Du schaust, veränderst eine Ansicht und kehrst mit einem sichtbaren Unterschied zurück.",
    href: "/?view=human",
    action: "Human View öffnen",
    tone: "human",
  },
  {
    index: "02",
    title: "Arcade",
    copy: "Einzelne spielbare Räume. Weniger Technik, klare Regeln und immer ein Weg zurück in den Zusammenhang.",
    href: "/?view=arcade",
    action: "Arcade betreten",
    tone: "arcade",
  },
  {
    index: "03",
    title: "Club",
    copy: "Relationen werden räumlich, rhythmisch und erfahrbar. Ein freierer Kanal — aber weiterhin Teil der Human View.",
    href: "/?view=club",
    action: "Club betreten",
    tone: "club",
  },
  {
    index: "04",
    title: "C Connect",
    copy: "Die Karte der verbundenen Türen. Sie zeigt, welcher Raum welche Verantwortung trägt, ohne sie gleichzusetzen.",
    href: "/?view=connect",
    action: "Verbindungen ansehen",
    tone: "connect",
  },
] as const;

export default function AboutNexahedronPage() {
  return (
    <article className="public-page about-nexahedron-page">
      <section className="nexahedron-about-hero" aria-labelledby="nexahedron-about-title">
        <div>
          <p className="public-kicker">ABOUT NEXAHEDRON · A0 HUMAN VIEW</p>
          <h1 id="nexahedron-about-title">Erst erleben.<br /><em>Dann einordnen.</em></h1>
          <p>NEXAHEDRON ist die öffentliche Human View von A0 innerhalb des NEXAH-Orientierungsfeldes. Die Methode wird hier nicht zuerst erklärt, sondern als begrenzte Erfahrung begehbar.</p>
          <nav aria-label="About NEXAHEDRON Einstieg">
            <Link href="/about">To NEXAH <span aria-hidden="true">→</span></Link>
          </nav>
        </div>
        <div className="nexahedron-about-mark" aria-hidden="true">
          <span />
          <span />
          <i>✦</i>
          <small>ONE HUMAN VIEW<br />EXPLICIT RETURN</small>
        </div>
      </section>

      <section className="nexahedron-about-relation" aria-labelledby="nexahedron-relation-title">
        <header>
          <p className="public-kicker">ONE FIELD · DIFFERENT RESPONSIBILITIES</p>
          <h2 id="nexahedron-relation-title">Zwei Maßstäbe.<br />Eine klare Rückbindung.</h2>
        </header>
        <div>
          <article>
            <small>HIER · EXPERIENCE</small>
            <h3>NEXAHEDRON</h3>
            <p>macht einen begrenzten Human-Weg sichtbar und spielbar. Es trägt Darstellung, Interaktion und den Rückweg — nicht die ganze Methode oder wissenschaftliche Autorität.</p>
          </article>
          <article>
            <small>DAHINTER · ORIENTATION</small>
            <h3>NEXAH</h3>
            <p>hält das weitere Feld: Methode, Quellen, Science, Bücher und Library. Dorthin führt der Weg, wenn du wissen möchtest, warum etwas trägt und wo seine Grenzen liegen.</p>
          </article>
        </div>
      </section>

      <section className="nexahedron-about-rooms" id="nexahedron-rooms" aria-labelledby="nexahedron-rooms-title">
        <header>
          <div>
            <p className="public-kicker">THE PUBLIC ROOMS</p>
            <h2 id="nexahedron-rooms-title">Vier Zugänge.<br />Nicht vier Systeme.</h2>
          </div>
          <p>Jede Rubrik öffnet eine andere Art des Erlebens. Quelle, Verantwortung und Return bleiben getrennt und sichtbar.</p>
        </header>
        <div className="nexahedron-room-grid">
          {rooms.map((room) => (
            <Link className={`nexahedron-room nexahedron-room--${room.tone}`} href={room.href} key={room.title}>
              <small>{room.index}</small>
              <h3>{room.title}</h3>
              <p>{room.copy}</p>
              <strong>{room.action} <span aria-hidden="true">↗</span></strong>
            </Link>
          ))}
        </div>
      </section>

      <section className="nexahedron-library-reserve" aria-labelledby="nexahedron-library-title">
        <div>
          <p className="public-kicker">LIBRARY · VORGEMERKT</p>
          <h2 id="nexahedron-library-title">Lesepfade bekommen später einen eigenen Raum.</h2>
        </div>
        <div>
          <p>Eine kuratierte Library-Sektion kann Bücher, Serien und weiterführende Lesepfade an die Human View anschließen. Bis ihre öffentliche Strecke source-bound geklärt ist, bleibt sie eine sichtbare Vormerkung — keine behauptete aktive Integration.</p>
          <span>IN PREPARATION · SOURCE &amp; EDITORIAL AUTHORITY REMAIN WITH NEXAH</span>
        </div>
      </section>

      <section className="nexahedron-about-next" aria-labelledby="nexahedron-next-title">
        <p className="public-kicker">THE NEXT SCALE</p>
        <h2 id="nexahedron-next-title">Du hast den Raum gesehen.<br />Jetzt kannst du das Feld öffnen.</h2>
        <p>Auf „To NEXAH“ beginnt die Einordnung: Visitor Guide, Methode, Quellen und öffentlicher Science-Kontext.</p>
        <Link href="/about">To NEXAH <span aria-hidden="true">→</span></Link>
      </section>
    </article>
  );
}
