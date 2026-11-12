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
    copy: "The guided path. You look, change a view and return with a visible difference.",
    href: "/?view=human",
    action: "Open the Human View",
    tone: "human",
  },
  {
    index: "02",
    title: "Arcade",
    copy: "Individual playable rooms. Less machinery, clear rules and always a path back into context.",
    href: "/?view=arcade",
    action: "Enter the Arcade",
    tone: "arcade",
  },
  {
    index: "03",
    title: "Club",
    copy: "Relations become spatial, rhythmic and tangible. A freer channel — while remaining part of the Human View.",
    href: "/?view=club",
    action: "Enter the Club",
    tone: "club",
  },
  {
    index: "04",
    title: "C Connect",
    copy: "The map of connected doors. It shows which room carries which responsibility without treating them as equivalent.",
    href: "/?view=connect",
    action: "View the connections",
    tone: "connect",
  },
] as const;

export default function AboutNexahedronPage() {
  return (
    <article className="public-page about-nexahedron-page">
      <section className="nexahedron-about-hero" aria-labelledby="nexahedron-about-title">
        <div>
          <p className="public-kicker">ABOUT NEXAHEDRON · A0 HUMAN VIEW</p>
          <h1 id="nexahedron-about-title">Experience first.<br /><em>Then find the context.</em></h1>
          <p>NEXAHEDRON is the public A0 Human View within the NEXAH orientation field. The method is not explained first here; it becomes accessible as a bounded experience.</p>
          <nav aria-label="About NEXAHEDRON entry">
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
          <h2 id="nexahedron-relation-title">Two scales.<br />One clear return.</h2>
        </header>
        <div>
          <article>
            <small>HERE · EXPERIENCE</small>
            <h3>NEXAHEDRON</h3>
            <p>makes one bounded Human path visible and playable. It carries presentation, interaction and the way back — not the whole method or scientific authority.</p>
          </article>
          <article>
            <small>BEYOND · ORIENTATION</small>
            <h3>NEXAH</h3>
            <p>holds the wider field: method, sources, Science, books and Library. The path continues there when you want to know why something holds and where its boundaries lie.</p>
          </article>
        </div>
      </section>

      <section className="nexahedron-about-rooms" id="nexahedron-rooms" aria-labelledby="nexahedron-rooms-title">
        <header>
          <div>
            <p className="public-kicker">THE PUBLIC ROOMS</p>
            <h2 id="nexahedron-rooms-title">Four entrances.<br />Not four systems.</h2>
          </div>
          <p>Each section opens a different kind of experience. Source, responsibility and Return remain separate and visible.</p>
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
          <p className="public-kicker">LIBRARY · RESERVED</p>
          <h2 id="nexahedron-library-title">Reading paths will receive their own room later.</h2>
        </div>
        <div>
          <p>A curated Library section can connect books, series and further reading paths to the Human View. Until its public source-bound route is settled, it remains a visible reservation — not a claimed active integration.</p>
          <span>IN PREPARATION · SOURCE &amp; EDITORIAL AUTHORITY REMAIN WITH NEXAH</span>
        </div>
      </section>

      <section className="nexahedron-about-next" aria-labelledby="nexahedron-next-title">
        <p className="public-kicker">THE NEXT SCALE</p>
        <h2 id="nexahedron-next-title">You have seen the room.<br />Now you can open the field.</h2>
        <p>“To NEXAH” begins the wider context: Visitor Guide, method, sources and public Science context.</p>
        <Link href="/about">To NEXAH <span aria-hidden="true">→</span></Link>
      </section>
    </article>
  );
}
