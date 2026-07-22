const places = ["Question", "Orientation", "Evidence", "Atlas", "Reflection"];

const authorities = [
  {
    name: "NEXAH",
    role: "Defines the Orientation Space and preserves canonical framework authority.",
  },
  {
    name: "ORION",
    role: "Navigates registered paths, validates boundaries and produces reports.",
  },
  {
    name: "LYRA",
    role: "Translates human intent and faithfully explains structured results.",
  },
  {
    name: "Library",
    role: "Owns evidence, knowledge identity and editorial authority.",
  },
  {
    name: "Human",
    role: "Retains intention, Reflection and every consequential decision.",
  },
] as const;

export function FoundationShell() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to the Laboratory
      </a>

      <div className="site-shell">
        <header className="site-header">
          <a className="brand" href="#top" aria-label="NEXAHEDRON home">
            <span className="brand-mark" aria-hidden="true" />
            <span className="brand-copy">
              <span className="wordmark">NEXAHEDRON</span>
              <span className="descriptor">The NEXAH Laboratory</span>
            </span>
          </a>

          <nav className="site-nav" aria-label="Primary navigation">
            <a href="#top" aria-current="page">
              Home
            </a>
            <a href="#laboratory-boundary">Principles</a>
          </nav>
        </header>

        <main id="main-content">
          <section className="hero" id="top" aria-labelledby="hero-heading">
            <div className="hero-copy">
              <p className="eyebrow">Orientation Workspace · Phase I</p>
              <h1 id="hero-heading">Bring a question. Find orientation. Not answers.</h1>
              <p className="hero-intro">
                A calm, inspectable place for seeing registered paths, evidence,
                uncertainty and limits—while the decision remains yours.
              </p>
              <a className="primary-link" href="#foundation-status">
                Enter the Laboratory
              </a>
            </div>

            <aside className="hero-aside" aria-labelledby="places-heading">
              <p className="eyebrow" id="places-heading">
                The orientation path
              </p>
              <ol className="orientation-axis">
                {places.map((place) => (
                  <li key={place}>{place}</li>
                ))}
              </ol>
            </aside>
          </section>

          <section
            className="boundary-section"
            id="laboratory-boundary"
            aria-labelledby="boundary-heading"
          >
            <div className="section-heading">
              <div>
                <p className="section-index">01 · Authority remains visible</p>
                <h2 id="boundary-heading">One Laboratory. Distinct responsibilities.</h2>
              </div>
            </div>

            <div className="authority-grid">
              {authorities.map((authority) => (
                <article className="authority-card" key={authority.name}>
                  <h3>{authority.name}</h3>
                  <p>{authority.role}</p>
                </article>
              ))}
            </div>
          </section>

          <section
            className="foundation-note"
            id="foundation-status"
            aria-labelledby="foundation-heading"
          >
            <div>
              <p className="section-index">02 · Foundation status</p>
              <h2 id="foundation-heading">The room is prepared.</h2>
            </div>
            <p>
              This milestone establishes the application boundary and accessible
              spatial frame. No orientation is executed here yet, and no missing
              capability is represented as complete.
            </p>
          </section>
        </main>

        <footer className="site-footer">
          <span>NEXAHEDRON · The NEXAH Laboratory</span>
          <span>Orientation over information.</span>
        </footer>
      </div>
    </>
  );
}
