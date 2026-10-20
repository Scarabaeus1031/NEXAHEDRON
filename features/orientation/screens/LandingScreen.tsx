import Link from "next/link";
import { LivingWorkspaceHero } from "@/components/illustrations/LivingWorkspaceHero";

const viewChanges = [
  {
    mark: "I",
    title: "Preserved",
    description: "What remains available when the view changes?",
  },
  {
    mark: "L",
    title: "Lost",
    description: "What can no longer be recovered from this view alone?",
  },
  {
    mark: "A",
    title: "Added",
    description: "What belongs to the representation rather than its source?",
  },
  {
    mark: "U",
    title: "Unavailable",
    description: "What stays unresolved or outside the declared boundary?",
  },
] as const;

const humanViewSteps = [
  ["Anchor", "Begin with one real question."],
  ["Place", "Put one piece of material in view."],
  ["Attend", "Notice position, frame and selection."],
  ["Turn", "Consider what changes from another view."],
  ["Return", "Bring the difference back to Human judgment."],
] as const;

export function LandingScreen() {
  return (
    <article className="public-home">
      <section className="public-hero" aria-labelledby="landing-title">
        <div className="public-hero__copy">
          <p className="public-kicker">A0 · Human View</p>
          <p className="public-release-status">Public orientation instrument · browser-local</p>
          <h1 id="landing-title">How does a view change what can be known?</h1>
          <p className="public-hero__lead">
            NEXAHEDRON is the Human-facing view of A0. Bring one question into
            a bounded space, change position, keep the differences visible and
            return the result to your own judgment.
          </p>
          <div className="public-hero__actions">
            <Link className="public-link public-link--primary" href="/orient">
              Enter the Human View <span aria-hidden="true">→</span>
            </Link>
            <a className="public-hero__secondary" href="#how-it-works">
              See how it works <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
        <LivingWorkspaceHero />
      </section>

      <section className="home-answer" aria-labelledby="what-title">
        <p className="home-answer__index">01</p>
        <div>
          <p className="public-kicker">The Human View</p>
          <h2 id="what-title">One question. More than one possible view.</h2>
          <p>
            Every map, model, image and account begins from somewhere. The A0
            Human View makes that position inspectable without pretending that
            one representation contains the whole.
          </p>
        </div>
      </section>

      <section className="a0-view-change" id="how-it-works" aria-labelledby="change-title">
        <header>
          <p className="home-answer__index">02</p>
          <div>
            <p className="public-kicker">When the view changes</p>
            <h2 id="change-title">Keep the difference visible.</h2>
            <p>A0 asks four simple questions before a new view is treated as an answer.</p>
          </div>
        </header>
        <ol className="a0-view-change__grid">
          {viewChanges.map((item) => (
            <li key={item.mark}>
              <span aria-hidden="true">{item.mark}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </li>
          ))}
        </ol>
        <p className="a0-view-change__boundary">
          The instrument helps you hold these distinctions. It does not decide
          what the material means or what you should do.
        </p>
      </section>

      <section className="home-begin" id="enter-human-view" aria-labelledby="begin-title">
        <div className="home-begin__intro">
          <p className="home-answer__index">03</p>
          <p className="public-kicker">Enter A0</p>
          <h2 id="begin-title">Bring one question into view.</h2>
        </div>
        <section className="orientation-workspace-entrance" aria-labelledby="workspace-title">
          <div className="orientation-workspace-entrance__copy">
            <p className="public-kicker">A0 Human View</p>
            <h3 id="workspace-title">Begin with what you actually have.</h3>
            <p>
              Name your question and place one piece of material on the table.
              The session remains transient and Human-held. Rest is a complete
              ending; crossing the ORION boundary remains optional.
            </p>
            <Link className="public-link public-link--primary" href="/orient">
              Enter the Human View <span aria-hidden="true">→</span>
            </Link>
            <small>Human-authored · browser memory only · no automatic interpretation</small>
          </div>
          <div className="orientation-workspace-entrance__field">
            <p className="public-kicker">A bounded movement</p>
            <ol className="a0-human-view-steps">
              {humanViewSteps.map(([step, description], index) => (
                <li key={step}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div><strong>{step}</strong><small>{description}</small></div>
                </li>
              ))}
            </ol>
          </div>
        </section>
        <div className="a0-public-context">
          <div>
            <p className="public-kicker">Method and science</p>
            <h3>A0 belongs to NEXAH.</h3>
            <p>NEXAH holds the method, scientific context, sources and claim boundaries. This site holds the Human-facing experience.</p>
            <a href="https://nexah.de/about/" rel="noreferrer">Understand NEXAH <span aria-hidden="true">↗</span></a>
          </div>
          <div>
            <p className="public-kicker">Earlier public material</p>
            <h3>Reference cases remain available.</h3>
            <p>The existing curated cases stay visible as bounded editorial examples. They are not the source authority for A0.</p>
            <Link href="/library">Explore Reference Cases <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </section>
    </article>
  );
}
