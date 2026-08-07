import Link from "next/link";
import { LivingWorkspaceHero } from "@/components/illustrations/LivingWorkspaceHero";

const orientationGates = [
  {
    title: "Wonder",
    kind: "wonder",
    intention: "Something caught my attention.",
    invitation: "Discover something unexpected.",
    action: "Leave room for surprise",
    href: "/explore#discovery",
  },
  {
    title: "Verify",
    kind: "verify",
    intention: "Can I trust this?",
    invitation: "Inspect evidence, uncertainty, boundaries, and lineage.",
    action: "Begin with evidence",
    href: "/cases/what-is-evidence",
  },
  {
    title: "Learn",
    kind: "learn",
    intention: "I want to understand this properly.",
    invitation: "Begin with a Curated Reference Case.",
    action: "Enter through a case",
    href: "/cases/plate-tectonics",
  },
  {
    title: "Connect",
    kind: "connect",
    intention: "How does this relate to other things?",
    invitation: "Follow bridges across subjects.",
    action: "Follow what connects",
    href: "/explore#bridges",
  },
  {
    title: "Turn",
    kind: "compare",
    intention: "What changes from another position?",
    invitation: "Change scale, reference, representation, or point of view.",
    action: "Consider another position",
    href: "/cases/plate-tectonics",
  },
  {
    title: "Explore",
    kind: "explore",
    intention: "Show me the wider landscape.",
    invitation: "Enter the curated reference collection without a fixed destination.",
    action: "Open the reference map",
    href: "/library",
  },
] as const;

function GateFigure({ kind }: { readonly kind: (typeof orientationGates)[number]["kind"] }) {
  if (kind === "verify") {
    return (
      <span className="orientation-gate__figure orientation-gate__figure--verify" aria-hidden="true">
        <i>Source</i><i>Claim</i><i>Boundary</i>
      </span>
    );
  }

  return (
    <span className={`orientation-gate__figure orientation-gate__figure--${kind}`} aria-hidden="true">
      <i /><i /><i /><i /><b />
    </span>
  );
}

export function LandingScreen() {
  return (
    <article className="public-home">
      <section className="public-hero" aria-labelledby="landing-title">
        <div className="public-hero__copy">
          <p className="public-kicker">Public Human-facing research demonstrator</p>
          <p className="public-release-status">Phase II · Bounded Public Workspace</p>
          <h1 id="landing-title">Can a bounded process help a Human find their bearings?</h1>
          <p className="public-hero__lead">
            NEXAHEDRON makes that research question public. Explore a
            Human-authored reference case or try the current live experiment.
            Neither path promises an answer or transfers judgment to software.
          </p>
          <div className="public-hero__actions">
            <Link className="public-link public-link--primary" href="/orient">
              Try the live experiment <span aria-hidden="true">→</span>
            </Link>
            <Link className="public-hero__secondary" href="#ways-in">
              Or explore ways in <span aria-hidden="true">↓</span>
            </Link>
          </div>
        </div>
        <LivingWorkspaceHero />
      </section>

      <section className="home-answer" aria-labelledby="what-title">
        <p className="home-answer__index">01</p>
        <div>
          <p className="public-kicker">What is this?</p>
          <h2 id="what-title">An open, bounded experiment.</h2>
          <p>
            The demonstrator places one Human question, available material,
            relationships, boundaries and reflection on one visible table.
            Its current working state exists only in the open browser session.
          </p>
        </div>
      </section>

      <section className="home-answer home-answer--offset" aria-labelledby="why-title">
        <p className="home-answer__index">02</p>
        <div>
          <p className="public-kicker">Why does it exist?</p>
          <h2 id="why-title">Information is abundant. Orientation is not.</h2>
          <p>
            Books, research, maps, repositories, and lived experience already
            exist. This experiment asks whether their relationships and
            boundaries can be made more visible without replacing Human
            interpretation.
          </p>
        </div>
      </section>

      <section className="home-begin" id="ways-in" aria-labelledby="begin-title">
        <div className="home-begin__intro">
          <p className="home-answer__index">03</p>
          <p className="public-kicker">Where can I begin?</p>
          <h2 id="begin-title">Choose your way in.</h2>
        </div>
        <section className="orientation-workspace-entrance" aria-labelledby="workspace-title">
          <div className="orientation-workspace-entrance__copy">
            <p className="public-kicker">Live Bounded Experiment</p>
            <h3 id="workspace-title">Bring what you have.</h3>
            <p>
              Orientation begins with something you bring—not something we provide.
              Begin by naming what caught your attention and what you want to understand.
            </p>
            <Link className="public-link public-link--primary" href="/orient">
              Enter the live experiment <span aria-hidden="true">→</span>
            </Link>
            <small>Human-authored · memory only · Rest is a valid ending · ORION is optional</small>
          </div>
          <div className="orientation-workspace-entrance__field">
            <p className="public-kicker">An Orientation may begin with</p>
            <ul>
              {[
                "a question",
                "an article",
                "a research paper",
                "a claim",
                "a source",
                "a relationship",
                "an observation",
                "a map",
                "a dataset",
                "an uncertainty",
              ].map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        </section>
        <div className="orientation-gates" aria-label="Ways to begin orientation">
          {orientationGates.map((gate, index) => (
            <Link className={`orientation-gate orientation-gate--${gate.kind}`} href={gate.href} key={gate.title}>
              <span className="orientation-gate__position" aria-hidden="true">
                <i>✦</i>{String(index + 1).padStart(2, "0")}
              </span>
              <GateFigure kind={gate.kind} />
              <strong>{gate.title}</strong>
              <p>{gate.intention}</p>
              <span className="orientation-gate__invitation">{gate.invitation}</span>
              <span className="orientation-gate__action">{gate.action} <span aria-hidden="true">→</span></span>
            </Link>
          ))}
        </div>
        <Link className="featured-entrance" href="/cases/plate-tectonics">
          <span className="featured-entrance__meta">Curated Reference Case · Human/editorial-authored · Earth Science</span>
          <strong>Plate Tectonics</strong>
          <span>
            See how moving plates connect landscapes, evidence, uncertainty,
            and the questions that follow.
          </span>
          <span className="featured-entrance__action">Explore the case <span aria-hidden="true">→</span></span>
        </Link>
        <Link className="public-link public-link--text" href="/library">
          Explore all Reference Cases <span aria-hidden="true">→</span>
        </Link>
      </section>
    </article>
  );
}
