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
  ["NEXAHEDRON", "Human-facing reference implementation", "/"],
] as const;

export default function VisitorGuidePage() {
  return (
    <article className="public-page visitor-guide-page">
      <header className="public-page-intro"><p className="public-kicker">Visitor Guide</p><h1>You are in the Human-facing Workspace.</h1><p>NEXAHEDRON demonstrates one complete, local Orientation Session. It presents the table; it does not own research, deterministic orientation or Human meaning.</p></header>
      <section className="ecosystem-guide" aria-labelledby="ecosystem-title">
        <div className="section-heading"><div><p className="public-kicker">Ecosystem map</p><h2 id="ecosystem-title">Four places. Four responsibilities.</h2></div><p>The canonical public map is maintained by <a href="https://nexah.de/visitor-guide/">nexah.de</a>.</p></div>
        <ol>{places.map(([name, role, href]) => <li className={name === "NEXAHEDRON" ? "is-current" : undefined} key={name}><a href={href}><strong>{name}</strong><span>{role}</span>{name === "NEXAHEDRON" ? <small>You are here</small> : null}</a></li>)}</ol>
      </section>
      <section className="guide-actions" aria-labelledby="begin-guide-title"><p className="public-kicker">One bounded session</p><h2 id="begin-guide-title">Bring one question. Stop when Rest is enough.</h2><p>The Workspace keeps your question, material, selected fragments, relationships, uncertainty and reflection visible. The resulting Orientation Record remains Human-owned. After explicit confirmation, the Readiness Alpha can invoke the pinned ORION Version 1 Gateway. It has no production evidence adapter and does not claim evidence-bound Orientation.</p><div><Link className="public-link public-link--primary" href="/orient">Begin an Orientation <span aria-hidden="true">→</span></Link><Link className="public-link public-link--text" href="/about">Read the boundaries <span aria-hidden="true">→</span></Link></div></section>
    </article>
  );
}
