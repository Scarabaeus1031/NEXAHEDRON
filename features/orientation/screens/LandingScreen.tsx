import Link from "next/link";

const orientationGates = [
  {
    title: "Wonder",
    intention: "Something caught my attention.",
    invitation: "Discover something unexpected.",
    action: "Leave room for surprise",
    href: "/explore#discovery",
  },
  {
    title: "Compare",
    intention: "How are these things different?",
    invitation: "Place ideas beside each other.",
    action: "Compare visible relationships",
    href: "/cases/plate-tectonics#case-05",
  },
  {
    title: "Connect",
    intention: "How are these ideas related?",
    invitation: "Follow bridges across subjects.",
    action: "Follow what connects",
    href: "/explore#bridges",
  },
  {
    title: "Verify",
    intention: "Can I trust this?",
    invitation: "Inspect evidence, uncertainty, boundaries, and lineage.",
    action: "Begin with evidence",
    href: "/cases/what-is-evidence#case-06",
  },
  {
    title: "Explore",
    intention: "Show me the landscape.",
    invitation: "Enter the Library without a fixed destination.",
    action: "Open the atlas",
    href: "/library",
  },
  {
    title: "Learn",
    intention: "I want to understand one topic well.",
    invitation: "Begin with a complete Orientation Case.",
    action: "Enter through a case",
    href: "/cases/plate-tectonics",
  },
] as const;

export function LandingScreen() {
  return (
    <article className="public-home">
      <section className="public-hero" aria-labelledby="landing-title">
        <div className="public-hero__copy">
          <p className="public-kicker">The Orientation Laboratory</p>
          <h1 id="landing-title">Find your bearings.</h1>
          <p className="public-hero__lead">
            NEXAHEDRON helps people orient themselves across existing knowledge.
          </p>
          <Link className="public-link public-link--primary" href="#ways-in">
            Choose your way in <span aria-hidden="true">↓</span>
          </Link>
        </div>
        <div className="orientation-field" aria-hidden="true">
          <span className="orientation-field__orbit orientation-field__orbit--one" />
          <span className="orientation-field__orbit orientation-field__orbit--two" />
          <span className="orientation-field__axis orientation-field__axis--one" />
          <span className="orientation-field__axis orientation-field__axis--two" />
          <span className="orientation-field__point orientation-field__point--one" />
          <span className="orientation-field__point orientation-field__point--two" />
          <span className="orientation-field__point orientation-field__point--three" />
          <span className="orientation-field__center">✦</span>
        </div>
      </section>

      <section className="home-answer" aria-labelledby="what-title">
        <p className="home-answer__index">01</p>
        <div>
          <p className="public-kicker">What is this?</p>
          <h2 id="what-title">A library of orientation.</h2>
          <p>
            Not a collection of isolated answers. A place to see a subject, its
            context, its evidence, its limits, and the paths that remain open.
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
            exist. NEXAHEDRON helps make their relationships and boundaries
            visible without replacing them.
          </p>
        </div>
      </section>

      <section className="home-begin" id="ways-in" aria-labelledby="begin-title">
        <div className="home-begin__intro">
          <p className="home-answer__index">03</p>
          <p className="public-kicker">Where can I begin?</p>
          <h2 id="begin-title">Choose your way in.</h2>
        </div>
        <div className="orientation-gates" aria-label="Ways to begin orientation">
          {orientationGates.map((gate, index) => (
            <Link className="orientation-gate" href={gate.href} key={gate.title}>
              <span className="orientation-gate__position" aria-hidden="true">
                <i>✦</i>{String(index + 1).padStart(2, "0")}
              </span>
              <strong>{gate.title}</strong>
              <p>{gate.intention}</p>
              <span className="orientation-gate__invitation">{gate.invitation}</span>
              <span className="orientation-gate__action">{gate.action} <span aria-hidden="true">→</span></span>
            </Link>
          ))}
        </div>
        <Link className="featured-entrance" href="/cases/plate-tectonics">
          <span className="featured-entrance__meta">Featured Orientation Case · Earth Science</span>
          <strong>Plate Tectonics</strong>
          <span>
            See how moving plates connect landscapes, evidence, uncertainty,
            and the questions that follow.
          </span>
          <span className="featured-entrance__action">Explore the case <span aria-hidden="true">→</span></span>
        </Link>
        <Link className="public-link public-link--text" href="/explore">
          Or explore the Library <span aria-hidden="true">→</span>
        </Link>
      </section>
    </article>
  );
}
