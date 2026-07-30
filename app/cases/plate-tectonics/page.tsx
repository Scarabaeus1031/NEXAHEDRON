import Link from "next/link";
import { caseLineages } from "@/features/library/case-lineage";
import { CaseLineage } from "@/features/library/components/CaseLineage";
import { CaseSection } from "@/features/library/components/CaseSection";

const evidence = [
  {
    id: "E1",
    title: "This Dynamic Earth: The Story of Plate Tectonics",
    publisher: "U.S. Geological Survey",
    role: "Framework, plate definition, boundary behavior, magnetic evidence, and open questions.",
    limit: "An authoritative introductory synthesis, not a current primary study of every region.",
    href: "https://pubs.usgs.gov/gip/dynamic/dynamic.html",
  },
  {
    id: "E2",
    title: "What are the different types of plate tectonic boundaries?",
    publisher: "NOAA Ocean Exploration",
    role: "The broad relationships among divergent, convergent, and transform boundaries.",
    limit: "A concise educational overview; local boundaries can be more complex.",
    href: "https://oceanexplorer.noaa.gov/ocean-fact/plate-boundaries/",
  },
  {
    id: "E3",
    title: "GPS and tectonics",
    publisher: "NSF GAGE",
    role: "Direct measurement of present-day crustal movement through time series and velocity.",
    limit: "Measurements depend on station, time span, uncertainty, and reference frame.",
    href: "https://spotlight.unavco.org/how-gps-works/gps-and-tectonics/gps-and-tectonics.html",
  },
] as const;

export default function PlateTectonicsCasePage() {
  return (
    <article className="orientation-case">
      <header className="orientation-case__hero">
        <nav aria-label="Breadcrumb">
          <Link href="/cases">Cases</Link><span aria-hidden="true">/</span><span>Earth Science</span>
        </nav>
        <p className="public-kicker">Curated Reference Case · Human/editorial-authored · 12 min</p>
        <h1>Plate Tectonics</h1>
        <p className="orientation-case__dek">
          Moving plates, geological patterns, inspectable evidence, and the limits of prediction.
        </p>
        <dl className="case-position">
          <div><dt>Position</dt><dd>Introduction</dd></div>
          <div><dt>Evidence</dt><dd>3 public sources</dd></div>
          <div><dt>Boundary</dt><dd>Conceptual understanding</dd></div>
          <div><dt>Status</dt><dd>Curated Reference Case</dd></div>
          <div><dt>Producer</dt><dd>Human and editorial authors</dd></div>
          <div><dt>Not produced by</dt><dd>Live Workspace or ORION</dd></div>
        </dl>
      </header>

      <CaseSection index="01" title="Human Intention">
        <blockquote>“I want to understand what plate tectonics is, why it is accepted, and where I should continue.”</blockquote>
        <p>This asks for orientation—not an earthquake forecast, a complete history of geology, or a calculation for one location.</p>
      </CaseSection>

      <CaseSection index="02" title="Starting Orientation">
        <p>Someone may already know that Earth&apos;s surface is divided into plates, that the plates move slowly, and that earthquakes and volcanoes often appear near their edges.</p>
        <div className="starting-grid">
          <div><span>Likely known</span><p>Plates move. Mountains, earthquakes, and volcanoes are connected to that motion.</p></div>
          <div><span>Still unclear</span><p>What a plate is, how movement is observed, and where this framework stops explaining.</p></div>
        </div>
      </CaseSection>

      <CaseSection index="03" title="Subject">
        <p className="case-lead">Plate tectonics is the broad scientific framework in which Earth&apos;s outer rigid layer is divided into moving plates.</p>
        <div className="subject-composition">
          <p>A tectonic plate is a large, irregular slab of lithosphere: the crust and rigid uppermost mantle. Plates move relative to one another rather than remaining fixed.</p>
          <div className="subject-field" aria-label="Processes connected by the plate tectonics framework">
            <strong>Moving plates</strong>
            <span>Seafloor formation</span>
            <span>Ocean trenches</span>
            <span>Mountain building</span>
            <span>Earthquakes</span>
            <span>Volcanoes</span>
          </div>
        </div>
        <p>These connections do not imply that every geological event occurs on one simple boundary line.</p>
        <p className="source-marker">Supported by <a href="#evidence-E1">E1</a> and <a href="#evidence-E2">E2</a></p>
      </CaseSection>

      <CaseSection index="04" title="Context">
        <ol className="context-trace">
          <li><span>Earlier observation</span><strong>Apparent fit of continents</strong><p>Suggestive, but not enough on its own.</p></li>
          <li><span>Connected record</span><strong>Ocean floor and magnetic patterns</strong><p>Earthquakes and volcanoes could be seen in relation.</p></li>
          <li><span>Present measurement</span><strong>Crustal motion</strong><p>Direct measurements made the movement observable.</p></li>
        </ol>
        <aside className="orientation-shift">
          <span>The orientation shift</span>
          <p>From isolated landforms and events to related consequences of moving lithospheric plates.</p>
        </aside>
      </CaseSection>

      <CaseSection index="05" title="Relationships">
        <div className="relationship-table" role="table" aria-label="Plate boundary relationships">
          <div role="row" className="relationship-table__head"><span role="columnheader">Motion</span><span role="columnheader">Boundary</span><span role="columnheader">Common observations</span></div>
          <div role="row"><span role="cell">Move apart</span><strong role="cell">Divergent</strong><span role="cell">Mid-ocean ridges, shallow earthquakes, volcanism</span></div>
          <div role="row"><span role="cell">Move together</span><strong role="cell">Convergent</strong><span role="cell">Trenches, volcanic arcs, earthquakes, mountain ranges</span></div>
          <div role="row"><span role="cell">Slide past</span><strong role="cell">Transform</strong><span role="cell">Faults and earthquakes</span></div>
        </div>
        <div className="relationship-sequence" aria-label="Central relationship">
          <span>Relative motion</span><i aria-hidden="true">→</i><span>Boundary interaction</span><i aria-hidden="true">→</i><span>Processes and observations</span>
        </div>
        <p>These are broad relationships. Some boundary zones are wide, locally complicated, or difficult to define.</p>
      </CaseSection>

      <CaseSection index="06" title="Evidence" tone="evidence">
        <p className="case-lead">No single observation carries the whole framework.</p>
        <p>Different evidence bears on different parts of the orientation. Each source remains separate from the explanation and open for inspection.</p>
        <div className="case-evidence-list">
          {evidence.map((item) => (
            <article id={`evidence-${item.id}`} key={item.id}>
              <span className="case-evidence-list__id">{item.id}</span>
              <div>
                <p className="public-kicker">{item.publisher}</p>
                <h3>{item.title}</h3>
                <dl>
                  <div><dt>Bears on</dt><dd>{item.role}</dd></div>
                  <div><dt>Limit</dt><dd>{item.limit}</dd></div>
                </dl>
                <a href={item.href} rel="noreferrer" target="_blank">Inspect source <span className="sr-only">(opens in a new tab)</span><span aria-hidden="true">↗</span></a>
              </div>
            </article>
          ))}
        </div>
      </CaseSection>

      <CaseSection index="07" title="Assumptions">
        <ol className="numbered-notes">
          <li><span>01</span><p>This uses a broad plate model appropriate to an introduction, not every local deformation.</p></li>
          <li><span>02</span><p>Public scientific sources are treated as authoritative for their stated observations—not infallible.</p></li>
          <li><span>03</span><p>Direct present-day measurements remain distinct from inferences about geological history.</p></li>
          <li><span>04</span><p>The Human intention is conceptual understanding, not hazard assessment.</p></li>
        </ol>
      </CaseSection>

      <CaseSection index="08" title="Unknowns & Boundaries" tone="unknown">
        <p className="case-lead">Unknown is a valid position.</p>
        <div className="unknown-grid">
          <article><span>Open</span><h3>Forces in each region</h3><p>Which driving and resisting forces dominate in every regional setting?</p></article>
          <article><span>Open</span><h3>Local representation</h3><p>How well does a rigid-plate model describe a particular broad boundary zone?</p></article>
          <article><span>Not concluded</span><h3>Specific prediction</h3><p>The framework does not determine the exact timing, place, or impact of a future earthquake.</p></article>
        </div>
        <aside className="case-boundary">
          <p className="public-kicker">This orientation supports</p>
          <p>Plate tectonics offers a well-supported large-scale account connecting relative plate motion, boundary interactions, and many major geological patterns.</p>
          <p className="public-kicker">It does not establish</p>
          <p>That every event lies on a boundary, that boundaries are perfectly narrow, or that knowing a boundary type predicts a specific hazardous event.</p>
        </aside>
      </CaseSection>

      <CaseSection index="09" title="Continuations">
        <p className="case-lead">Choose a path—or stop here.</p>
        <div className="continuation-grid">
          <article><span>01 · Measurement</span><h3>Inspect measured motion</h3><p>Move from “plates move” to an inspectable record of present-day motion.</p><a href={evidence[2].href}>Open GPS evidence <span aria-hidden="true">↗</span></a></article>
          <article><span>02 · Comparison</span><h3>Compare boundary types</h3><p>See what changes when plates separate, converge, or slide past.</p><a href={evidence[1].href}>Inspect boundary examples <span aria-hidden="true">↗</span></a></article>
          <article><span>03 · Boundary</span><h3>Separate explanation from prediction</h3><p>Ask what additional evidence a regional hazard assessment would require.</p><Link href="/explore">Follow the evidence path <span aria-hidden="true">→</span></Link></article>
        </div>
      </CaseSection>

      <CaseSection index="10" title="Reflection" tone="reflection">
        <p className="case-lead">What changed?</p>
        <p>“Plates move and cause earthquakes” has become a more useful position: plates are identified, relative motion connects to boundary type, several observations support different parts of the framework, and its limits remain visible.</p>
        <p>The purpose was not to say everything. It was to make a grounded next step possible.</p>
      </CaseSection>

      <CaseLineage lineage={caseLineages["plate-tectonics"]} />

      <nav className="case-end-navigation" aria-label="Case navigation">
        <Link className="public-link public-link--primary" href="/explore">Continue exploring <span aria-hidden="true">→</span></Link>
      </nav>
    </article>
  );
}
