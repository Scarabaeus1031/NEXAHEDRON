import type { Metadata } from "next";
import Link from "next/link";
import { PublicPageIntro } from "@/features/library/components/PublicPageIntro";
import { foundationRooms } from "@/features/library/data";
import { featuredWorks } from "@/features/library/featured-works";

const atlasPoints = [
  { name: "Earth", className: "atlas-point atlas-point--earth atlas-point--open", available: true },
  { name: "Evidence", className: "atlas-point atlas-point--evidence atlas-point--open", available: true },
  { name: "Systems", className: "atlas-point atlas-point--systems atlas-point--open", available: true },
  { name: "Maps", className: "atlas-point atlas-point--maps atlas-point--open", available: true },
  { name: "Time", className: "atlas-point atlas-point--time", available: false },
] as const;

export default function LibraryPage() {
  return (
    <article className="public-page library-page">
      <PublicPageIntro eyebrow="Library" title="Read, watch, and follow a question further.">
        <p>
          This local NEXAHEDRON view brings selected public works, film and
          reference cases together. It remains a presentation surface: canonical
          work identity and publication authority stay with the NEXAH Library.
        </p>
      </PublicPageIntro>

      <section className="library-media" aria-labelledby="library-media-title">
        <div className="section-heading">
          <div>
            <p className="public-kicker">Books &amp; film</p>
            <h2 id="library-media-title">One field. More than one medium.</h2>
          </div>
          <p>A book develops an argument across pages. A film connects image, time and sound. Neither replaces the other.</p>
        </div>
        <div className="library-media__books" aria-label="Selected works from the NEXAH Library">
          {featuredWorks.map((work, index) => (
            <a href={work.href} key={work.href} target="_blank" rel="noopener noreferrer">
              <small>0{index + 1} · NEXAH LIBRARY ↗</small>
              <img src={work.cover} alt={`Cover of ${work.title}`} loading="lazy" />
              <strong>{work.title}</strong>
              <span>{work.note}</span>
            </a>
          ))}
        </div>
        <div className="library-media__film">
          <div>
            <p className="public-kicker">Film · 2:48 minutes</p>
            <h3>Framework of Legibility</h3>
            <p>Image and sound move through rooms, maps, light and shadow — showing how legibility depends on frame, motion and point of view.</p>
            <small>The film and books are not translations of one another. They open different routes into the same field.</small>
          </div>
          <video controls playsInline preload="metadata" poster="https://nexah.de/media/framework-of-legibility-poster.jpg">
            <source src="https://nexah.de/media/framework-of-legibility.mp4" type="video/mp4" />
            Your browser cannot play the embedded film. <a href="https://nexah.de/media/framework-of-legibility.mp4">Open the film at NEXAH.</a>
          </video>
        </div>
      </section>

      <section className="library-atlas" aria-labelledby="atlas-title">
        <div className="section-heading">
          <div>
            <p className="public-kicker">Atlas</p>
            <h2 id="atlas-title">The first visible terrain.</h2>
          </div>
          <p>The local collection is intentionally small. Available reference cases and unimplemented frontiers are clearly distinguished.</p>
        </div>
        <div className="atlas-layout">
          <div className="atlas-map" aria-hidden="true">
            <span className="atlas-ring atlas-ring--outer" />
            <span className="atlas-ring atlas-ring--inner" />
            <i className="atlas-path atlas-path--one" />
            <i className="atlas-path atlas-path--two" />
            <i className="atlas-path atlas-path--three" />
            {atlasPoints.map((point) => (
              <span className={point.className} key={point.name}>
                <b />{point.name}
              </span>
            ))}
          </div>
          <div className="atlas-key">
            <p className="public-kicker">How to read this view</p>
            <dl>
              <div><dt><span className="key-mark key-mark--open" />Open room</dt><dd>A reviewed case can be entered now.</dd></div>
              <div><dt><span className="key-mark" />Frontier</dt><dd>A meaningful direction without a published case yet.</dd></div>
              <div><dt><span className="key-line" />Path</dt><dd>A named relationship that can be followed.</dd></div>
            </dl>
            <Link href="/cases">Enter the first collection <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </section>

      <section className="library-rooms" aria-labelledby="rooms-title">
        <div className="section-heading">
          <div>
            <p className="public-kicker">Collections as rooms</p>
            <h2 id="rooms-title">Each room develops a way of seeing.</h2>
          </div>
        </div>
        <div className="library-room-list">
          {foundationRooms.map((room, index) => (
            <article key={room.name}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div><h3>{room.name}</h3><p>{room.note}</p></div>
              <small>{room.caseCount ? `${room.caseCount} open case` : "Frontier"}</small>
              {room.caseCount ? <Link href={room.href} aria-label={`Enter ${room.name}`}>→</Link> : <i aria-hidden="true">○</i>}
            </article>
          ))}
        </div>
      </section>

      <section className="library-paths" aria-labelledby="paths-title">
        <div>
          <p className="public-kicker">Paths</p>
          <h2 id="paths-title">A subject is only one way in.</h2>
          <p>You may move through the reference collection by question, relationship, evidence, pattern, or uncertainty.</p>
        </div>
        <ol>
          <li><span>01</span><strong>Question</strong><p>Begin with what you are trying to understand.</p></li>
          <li><span>02</span><strong>Relationship</strong><p>Follow a cause, contrast, dependency, or transformation.</p></li>
          <li><span>03</span><strong>Evidence</strong><p>Trace what can be inspected across different cases.</p></li>
          <li><span>04</span><strong>Frontier</strong><p>Approach what remains unknown without turning it into an answer.</p></li>
        </ol>
        <Link className="public-link public-link--primary" href="/explore">Choose a path <span aria-hidden="true">→</span></Link>
      </section>
    </article>
  );
}
export const metadata: Metadata = {
  title: "Library",
  description: "Selected books, film and read-only reference cases from the NEXAHEDRON Human View.",
  alternates: { canonical: "/library" },
};
