import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Visitor Guide",
  description: "Where NEXAHEDRON belongs, what it owns and how to begin one Orientation Session.",
  alternates: { canonical: "/visitor-guide" },
};

const places = [
  ["nexah.de", "Public and intellectual home", "https://nexah.de/visitor-guide/"],
  ["NEXAH", "Research and framework", "https://github.com/Scarabaeus1031/NEXAH"],
  ["ORION", "Certified deterministic Core", "https://github.com/Scarabaeus1031/NEXAH-ORION"],
  ["NEXAHEDRON", "Public Human-facing research demonstrator", "/"],
] as const;

export default function VisitorGuidePage() {
  return (
    <article className="public-page visitor-guide-page">
      <header className="public-page-intro"><p className="public-kicker">Visitor Guide</p><h1>You are in a public research demonstrator.</h1><p>NEXAHEDRON presents Curated Reference Cases and one Live Bounded Experiment. It owns neither NEXAH research, ORION certification, Library authority nor Human meaning.</p></header>
      <section className="ecosystem-guide" aria-labelledby="ecosystem-title">
        <div className="section-heading"><div><p className="public-kicker">Ecosystem map</p><h2 id="ecosystem-title">Four places. Four responsibilities.</h2></div><p>The canonical public map is maintained by <a href="https://nexah.de/visitor-guide/">nexah.de</a>.</p></div>
        <ol>{places.map(([name, role, href]) => <li className={name === "NEXAHEDRON" ? "is-current" : undefined} key={name}><a href={href}><strong>{name}</strong><span>{role}</span>{name === "NEXAHEDRON" ? <small>You are here</small> : null}</a></li>)}</ol>
      </section>
      <section className="guide-actions" aria-labelledby="begin-guide-title"><p className="public-kicker">One live bounded experiment</p><h2 id="begin-guide-title">Bring one question. Stop when Rest is enough.</h2><p>The Workspace keeps your Human-authored question, material, fragments, relationships, uncertainty and reflection visible in memory. Reloading or closing the page loses that Working Session Record. After explicit confirmation the public Gateway may contact a compatible ORION Runtime; Gateway reachability is not a successful ORION result, and no Runtime version or certified Core execution is claimed unless the returned public contract proves it.</p><div><Link className="public-link public-link--primary" href="/orient">Try the live experiment <span aria-hidden="true">→</span></Link><Link className="public-link public-link--text" href="/cases">See a Curated Reference Case <span aria-hidden="true">→</span></Link></div></section>
    </article>
  );
}
