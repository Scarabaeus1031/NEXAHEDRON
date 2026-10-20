import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Visitor Guide",
  description: "When NEXAHEDRON may help, where it stops and how to begin one Orientation Session.",
  alternates: { canonical: "/visitor-guide" },
};

const places = [
  ["nexah.de", "Public and intellectual home", "https://nexah.de/visitor-guide/"],
  ["NEXAH", "Research and framework", "https://github.com/Scarabaeus1031/NEXAH"],
  ["ORION", "Certified deterministic Core", "https://github.com/Scarabaeus1031/NEXAH-ORION"],
  ["NEXAHEDRON", "Public Human-facing research demonstrator", "/"],
] as const;

const goodFor = [
  "read a scientific paper more carefully",
  "work through a difficult question",
  "understand why two explanations differ",
  "examine the relationship between a question and a source",
  "make assumptions and boundaries explicit",
  "preserve uncertainty instead of hiding it",
  "prepare for an important decision",
  "reflect before asking an AI or an expert",
  "organise your own thinking",
  "explore a problem without rushing to a conclusion",
] as const;

const notDesignedFor = [
  "tell you what is true",
  "replace experts or peer review",
  "make decisions for you",
  "validate scientific evidence",
  "compare documents automatically",
  "rank sources by authority",
  "generate conclusions",
  "provide legal, medical or financial advice",
  "replace your own judgment",
] as const;

export default function VisitorGuidePage() {
  return (
    <article className="public-page visitor-guide-page">
      <header className="public-page-intro">
        <p className="public-kicker">Visitor Guide</p>
        <h1>When should I enter the A0 Human View?</h1>
        <p>NEXAHEDRON is the <strong>A0 Human View</strong>. It is designed to help you place and turn a question deliberately—not to answer it for you.</p>
        <p>If you already know exactly what you need, you probably do not need NEXAHEDRON. If you are trying to understand a question more clearly, it may help.</p>
      </header>

      <section className="guide-use" aria-labelledby="guide-use-title">
        <div className="section-heading">
          <div>
            <p className="public-kicker">Purpose fit</p>
            <h2 id="guide-use-title">A place to orient—not an authority.</h2>
          </div>
          <p>The Workspace supports deliberate Human reasoning while leaving understanding, judgment and decisions with you.</p>
        </div>
        <div className="guide-use__columns">
          <section aria-labelledby="good-for-title">
            <h3 id="good-for-title">Good for</h3>
            <p>Use NEXAHEDRON when you want to:</p>
            <ul>{goodFor.map((item) => <li key={item}>{item}</li>)}</ul>
          </section>
          <section aria-labelledby="not-designed-title">
            <h3 id="not-designed-title">Not designed for</h3>
            <p>NEXAHEDRON is not intended to:</p>
            <ul>{notDesignedFor.map((item) => <li key={item}>{item}</li>)}</ul>
          </section>
        </div>
      </section>

      <section className="guide-session" aria-labelledby="guide-session-title">
        <p className="public-kicker">Inside a session</p>
        <h2 id="guide-session-title">Make your reasoning more visible.</h2>
        <p>A typical session moves from Question to Material, Relationship, Boundary, Turn, Reflection and Rest. The current Workspace holds this through Anchor, Place, Attend, Relate, Bound, Turn, Reflect and Rest.</p>
        <p>The system does not complete the reasoning for you. Most AI systems try to produce answers; NEXAHEDRON supports orientation before conclusions. Instead of beginning with <q>What is the answer?</q>, it begins with <q>What exactly is the question?</q></p>
      </section>

      <section className="guide-session" aria-labelledby="after-rest-title">
        <p className="public-kicker">After Rest</p>
        <h2 id="after-rest-title">Rest is already a complete outcome.</h2>
        <p>For many questions, the session simply ends. If appropriate, you may continue into ORION or another external process. You do not have to continue.</p>
        <p className="guide-rule"><strong>NEXAHEDRON helps you orient.</strong><br /><strong>You remain responsible for understanding, judgment and decisions.</strong></p>
      </section>

      <section className="ecosystem-guide" aria-labelledby="ecosystem-title">
        <div className="section-heading">
          <div><p className="public-kicker">Ecosystem map</p><h2 id="ecosystem-title">Four places. Four responsibilities.</h2></div>
          <p>The canonical public map is maintained by <a href="https://nexah.de/visitor-guide/">nexah.de</a>.</p>
        </div>
        <ol>{places.map(([name, role, href]) => <li className={name === "NEXAHEDRON" ? "is-current" : undefined} key={name}><a href={href}><strong>{name}</strong><span>{role}</span>{name === "NEXAHEDRON" ? <small>You are here</small> : null}</a></li>)}</ol>
      </section>

      <section className="guide-actions" aria-labelledby="begin-guide-title">
        <p className="public-kicker">One live bounded experiment</p>
        <h2 id="begin-guide-title">Bring one question. Stop when Rest is enough.</h2>
        <p>The Workspace keeps your Human-authored question, material, fragments, relationships, uncertainty and reflection visible in browser memory only. Reloading or closing the page loses that Working Session Record. After explicit confirmation the public Gateway may contact a compatible ORION Runtime; Gateway reachability is not a successful ORION result, and no Runtime version or certified Core execution is claimed unless the returned public contract proves it.</p>
        <div><Link className="public-link public-link--primary" href="/orient">Enter the Human View <span aria-hidden="true">→</span></Link><Link className="public-link public-link--text" href="/cases">See a Curated Reference Case <span aria-hidden="true">→</span></Link></div>
      </section>
    </article>
  );
}
