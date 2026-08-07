import type { Metadata } from "next";
import Link from "next/link";
import { CaseCard } from "@/features/library/components/CaseCard";
import { PublicPageIntro } from "@/features/library/components/PublicPageIntro";
import {
  evidencePaths,
  explorationQuestions,
  foundationRooms,
  orientationCases,
  relationshipPaths,
} from "@/features/library/data";

export default function ExplorePage() {
  return (
    <article className="public-page explore-page">
      <PublicPageIntro eyebrow="Explore further" title="Continue through relationships, questions, and evidence.">
        <p>
          Move beyond one case without losing its boundaries. Follow only the
          paths that remain visible and inspectable.
        </p>
      </PublicPageIntro>

      <section className="explore-featured" aria-labelledby="featured-title">
        <div className="section-heading">
          <div>
            <p className="public-kicker">Featured case</p>
            <h2 id="featured-title">One complete place to begin.</h2>
          </div>
          <Link href="/cases">View all cases</Link>
        </div>
        <CaseCard orientationCase={orientationCases[0]} />
      </section>

      <section className="explore-section" aria-labelledby="foundations-title">
        <div className="section-heading">
          <div>
            <p className="public-kicker">Foundations</p>
            <h2 id="foundations-title">Rooms that support many paths.</h2>
          </div>
        </div>
        <div className="room-grid">
          {foundationRooms.map((room) => (
            <article className="room-card" key={room.name}>
              <span>{String(room.caseCount).padStart(2, "0")} cases</span>
              <h3>{room.name}</h3>
              <p>{room.note}</p>
              <small>{room.caseCount > 0 ? "Open room" : "Room in preparation"}</small>
            </article>
          ))}
        </div>
      </section>

      <section className="explore-section" id="bridges" aria-labelledby="bridges-title">
        <div className="section-heading">
          <div>
            <p className="public-kicker">Bridges</p>
            <h2 id="bridges-title">Follow what connects.</h2>
          </div>
          <p>Every bridge names the relationship—and where it stops.</p>
        </div>
        <div className="bridge-list">
          {relationshipPaths.map((path) => (
            <article key={`${path.from}-${path.to}`}>
              <div>
                <span>{path.from}</span>
                <i aria-hidden="true" />
                <span>{path.to}</span>
              </div>
              <p>{path.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="explore-entry-grid" aria-label="Alternative ways to explore">
        <article>
          <p className="public-kicker">Browse by question</p>
          <h2>Start in your own words.</h2>
          <ul>
            {explorationQuestions.map((question) => <li key={question}>{question}</li>)}
          </ul>
        </article>
        <article>
          <p className="public-kicker">Browse by evidence</p>
          <h2>Follow what can be inspected.</h2>
          <ul>
            {evidencePaths.map((path) => (
              <li key={path.kind}><strong>{path.kind}</strong><span>{path.example}</span></li>
            ))}
          </ul>
        </article>
        <article className="random-discovery" id="discovery">
          <p className="public-kicker">Featured continuation</p>
          <h2>Leave room for surprise.</h2>
          <p>One reviewed case with enough context to decide whether to continue. Never an endless feed.</p>
          <Link href="/cases/plate-tectonics">Discover Plate Tectonics <span aria-hidden="true">→</span></Link>
        </article>
      </section>
    </article>
  );
}
export const metadata: Metadata = {
  title: "Explore Further",
  description: "Continue from an Orientation Case through visible relationships, questions and evidence.",
  alternates: { canonical: "/explore" },
};
