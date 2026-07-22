import Link from "next/link";

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
          <Link className="public-link public-link--primary" href="/cases/plate-tectonics">
            Enter through a case <span aria-hidden="true">→</span>
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

      <section className="home-begin" aria-labelledby="begin-title">
        <div className="home-begin__intro">
          <p className="home-answer__index">03</p>
          <p className="public-kicker">Where can I begin?</p>
          <h2 id="begin-title">Begin with something you want to understand.</h2>
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
