import Link from "next/link";

const humanWays = [
  {
    number: "01",
    title: "Ich habe eine Frage.",
    copy: "Schreib kurz, was unklar geblieben ist oder was du besser verstehen möchtest.",
    href: "mailto:contact@nexah.de?subject=Frage%20zu%20NEXAHEDRON",
    action: "Frage stellen ↗",
  },
  {
    number: "02",
    title: "Ich möchte etwas teilen.",
    copy: "Ein Bild, ein Gedanke, eine Referenz oder etwas, das du gebaut hast, genügt als Anfang.",
    href: "mailto:contact@nexah.de?subject=Etwas%20mit%20NEXAH%20teilen",
    action: "Etwas teilen ↗",
  },
] as const;

export function HumanConnect() {
  return (
    <section className="human-connect" aria-labelledby="human-connect-title">
      <div className="human-connect__halo" aria-hidden="true"><span /></div>
      <div className="human-connect__intro">
        <p className="human-connect__eyebrow">HUMAN CONNECT · EINE FRAGE REICHT</p>
        <h1 id="human-connect-title">Du musst den richtigen Weg noch nicht kennen.</h1>
        <p>
          Beginne bei dem, was dich gerade interessiert. Du musst weder ein Fach,
          einen Desk noch ein Projekt auswählen — wir helfen dabei, den passenden
          Anschluss zu finden.
        </p>
      </div>

      <div className="human-connect__ways" aria-label="Kontaktmöglichkeiten">
        {humanWays.map((way) => (
          <a href={way.href} key={way.number}>
            <small>{way.number}</small>
            <strong>{way.title}</strong>
            <span>{way.copy}</span>
            <b>{way.action}</b>
          </a>
        ))}
        <article>
          <small>03</small>
          <strong>Ich möchte erst weitersehen.</strong>
          <span>Kein Kontakt nötig. Kehre zur Human View zurück oder öffne die vollständige Karte aller Anschlüsse.</span>
          <div>
            <Link href="/?view=human">Human View ↙</Link>
            <a href="/a0-human/start/NEXAH_C_CONNECT.html">Alle Wege ansehen ↗</a>
          </div>
        </article>
      </div>

      <p className="human-connect__boundary">
        Eine Nachricht beginnt ein Gespräch. Sie wird nicht automatisch zu einem
        Research Intake, Finding oder Bauauftrag. Bitte sende keine vertraulichen
        Unterlagen, Zugangsdaten oder persönlichen Records.
      </p>
    </section>
  );
}
