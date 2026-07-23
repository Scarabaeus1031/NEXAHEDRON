import Link from "next/link";
import { CaseSection } from "@/features/library/components/CaseSection";
import type { FoundationalCase } from "@/features/library/foundational-cases";

function CaseEvidence({ items }: { readonly items: FoundationalCase["evidence"] }) {
  return (
    <div className="case-evidence-list">
      {items.map((item) => (
        <article id={`evidence-${item.id}`} key={item.id}>
          <span className="case-evidence-list__id">{item.id}</span>
          <div>
            <p className="public-kicker">{item.publisher}</p>
            <h3>{item.title}</h3>
            <dl>
              <div><dt>Bears on</dt><dd>{item.role}</dd></div>
              <div><dt>Limit</dt><dd>{item.limit}</dd></div>
            </dl>
            <a href={item.href} rel="noreferrer" target="_blank">
              Inspect source <span className="sr-only">(opens in a new tab)</span><span aria-hidden="true">↗</span>
            </a>
          </div>
        </article>
      ))}
    </div>
  );
}

export function FoundationalCasePage({ orientationCase }: { readonly orientationCase: FoundationalCase }) {
  return (
    <article className={`orientation-case foundational-case foundational-case--${orientationCase.slug}`}>
      <header className="orientation-case__hero">
        <nav aria-label="Breadcrumb">
          <Link href="/cases">Cases</Link><span aria-hidden="true">/</span><span>{orientationCase.category}</span>
        </nav>
        <p className="public-kicker">Foundational Orientation Case · {orientationCase.readingTime}</p>
        <h1>{orientationCase.title}</h1>
        <p className="orientation-case__dek">{orientationCase.dek}</p>
        <dl className="case-position">
          <div><dt>Position</dt><dd>Foundation</dd></div>
          <div><dt>Evidence</dt><dd>{orientationCase.evidence.length} public sources</dd></div>
          <div><dt>Boundary</dt><dd>Introductory orientation</dd></div>
          <div><dt>Status</dt><dd>Canonical</dd></div>
        </dl>
      </header>

      <CaseSection index="01" title="Human Intention">
        <blockquote>“{orientationCase.intention}”</blockquote>
        <p>{orientationCase.intentionBoundary}</p>
      </CaseSection>

      <CaseSection index="02" title="Starting Orientation">
        <div className="starting-grid">
          {orientationCase.starting.map((item) => (
            <div key={item.label}><span>{item.label}</span><p>{item.text}</p></div>
          ))}
        </div>
      </CaseSection>

      <CaseSection index="03" title="Subject">
        <p className="case-lead">{orientationCase.subjectLead}</p>
        {orientationCase.subject.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        <figure className="foundation-relationship" aria-label={orientationCase.visual.label}>
          <ol>
            {orientationCase.visual.steps.map((step, index) => (
              <li key={step.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{step.title}</strong>
                <small>{step.note}</small>
              </li>
            ))}
          </ol>
          <figcaption>{orientationCase.visual.caption}</figcaption>
        </figure>
      </CaseSection>

      <CaseSection index="04" title="Context">
        <ol className="context-trace">
          {orientationCase.context.map((item) => (
            <li key={item.label}><span>{item.label}</span><strong>{item.title}</strong><p>{item.text}</p></li>
          ))}
        </ol>
      </CaseSection>

      <CaseSection index="05" title="Relationships">
        <div className="relationship-table" role="table" aria-label={`${orientationCase.title} relationships`}>
          <div role="row" className="relationship-table__head"><span role="columnheader">From</span><span role="columnheader">Relationship</span><span role="columnheader">To</span></div>
          {orientationCase.relationships.map((item) => (
            <div role="row" key={`${item.from}-${item.to}`}><span role="cell">{item.from}</span><strong role="cell">{item.relation}</strong><span role="cell">{item.to}</span></div>
          ))}
        </div>
        <aside className="orientation-shift">
          <span>Orientation boundary</span>
          <p>{orientationCase.relationshipNote}</p>
        </aside>
      </CaseSection>

      <CaseSection index="06" title="Evidence" tone="evidence">
        <p className="case-lead">{orientationCase.evidenceLead}</p>
        <p>Each source supports a bounded part of this orientation. Its limitation remains attached.</p>
        <CaseEvidence items={orientationCase.evidence} />
      </CaseSection>

      <CaseSection index="07" title="Assumptions">
        <ol className="numbered-notes">
          {orientationCase.assumptions.map((item, index) => (
            <li key={item}><span>{String(index + 1).padStart(2, "0")}</span><p>{item}</p></li>
          ))}
        </ol>
      </CaseSection>

      <CaseSection index="08" title="Uncertainty" tone="unknown">
        <p className="case-lead">Uncertainty has a location.</p>
        <div className="unknown-grid">
          {orientationCase.uncertainties.map((item) => (
            <article key={item.title}><span>Uncertain</span><h3>{item.title}</h3><p>{item.text}</p></article>
          ))}
        </div>
      </CaseSection>

      <CaseSection index="09" title="Boundaries">
        <aside className="case-boundary case-boundary--split">
          <div><p className="public-kicker">This orientation supports</p><p>{orientationCase.supports}</p></div>
          <div><p className="public-kicker">It does not establish</p><p>{orientationCase.doesNotEstablish}</p></div>
        </aside>
      </CaseSection>

      <CaseSection index="10" title="Unknowns" tone="unknown">
        <p className="case-lead">The open edge is part of the map.</p>
        <div className="unknown-grid">
          {orientationCase.unknowns.map((item) => (
            <article key={item.title}><span>Open</span><h3>{item.title}</h3><p>{item.text}</p></article>
          ))}
        </div>
      </CaseSection>

      <CaseSection index="11" title="Continuations">
        <p className="case-lead">Choose a path—or stop here.</p>
        <div className="continuation-grid">
          {orientationCase.continuations.map((item, index) => (
            <article key={item.title}>
              <span>{String(index + 1).padStart(2, "0")} · Next path</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              {item.href.startsWith("/") ? (
                <Link href={item.href}>{item.action} <span aria-hidden="true">→</span></Link>
              ) : (
                <a href={item.href} rel="noreferrer" target="_blank">{item.action} <span className="sr-only">(opens in a new tab)</span><span aria-hidden="true">↗</span></a>
              )}
            </article>
          ))}
        </div>
      </CaseSection>

      <CaseSection index="12" title="Reflection" tone="reflection">
        <p className="case-lead">What changed?</p>
        {orientationCase.reflection.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        <Link className="public-link public-link--primary" href="/cases">Return to the collection <span aria-hidden="true">→</span></Link>
      </CaseSection>
    </article>
  );
}
