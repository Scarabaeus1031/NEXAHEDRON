import type { Metadata } from "next";
import Link from "next/link";
import { PublicPageIntro } from "@/features/library/components/PublicPageIntro";
import { foundationRooms } from "@/features/library/data";

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
      <PublicPageIntro eyebrow="Reference Cases" title="A local view of the curated collection.">
        <p>
          This read-only surface arranges NEXAHEDRON&apos;s Human- and
          editorial-authored reference cases. It is not the canonical NEXAH
          Library and creates no Library authority.
        </p>
      </PublicPageIntro>

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
  title: "Reference Cases",
  description: "Explore NEXAHEDRON's local read-only collection of Curated Reference Cases.",
  alternates: { canonical: "/library" },
};
