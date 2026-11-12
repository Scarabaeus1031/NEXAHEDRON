import Link from "next/link";
import type { PublicLanguage } from "@/components/layout/LanguageSwitch";

const humanWays = [
  {
    number: "01",
    title: "I have a question.",
    copy: "Tell us briefly what remains unclear or what you would like to understand better.",
    href: "mailto:contact@nexah.de?subject=Question%20about%20NEXAHEDRON",
    action: "Ask a question ↗",
  },
  {
    number: "02",
    title: "I would like to share something.",
    copy: "An image, a thought, a reference or something you built is enough to begin.",
    href: "mailto:contact@nexah.de?subject=Share%20something%20with%20NEXAH",
    action: "Share something ↗",
  },
] as const;

export function HumanConnect({ language = "en" }: { readonly language?: PublicLanguage }) {
  const german = language === "de";
  const ways = german ? [
    { number: "01", title: "Ich habe eine Frage.", copy: "Sag uns kurz, was unklar bleibt oder was du besser verstehen möchtest.", href: "mailto:contact@nexah.de?subject=Frage%20zu%20NEXAHEDRON", action: "Frage stellen ↗" },
    { number: "02", title: "Ich möchte etwas teilen.", copy: "Ein Bild, ein Gedanke, eine Referenz oder etwas Gebautes genügt für den Anfang.", href: "mailto:contact@nexah.de?subject=Etwas%20mit%20NEXAH%20teilen", action: "Etwas teilen ↗" },
  ] : humanWays;
  return (
    <section className="human-connect" aria-labelledby="human-connect-title">
      <div className="human-connect__halo" aria-hidden="true"><span /></div>
      <div className="human-connect__intro">
        <p className="human-connect__eyebrow">{german ? "HUMAN CONNECT · EINE FRAGE REICHT" : "HUMAN CONNECT · ONE QUESTION IS ENOUGH"}</p>
        <h1 id="human-connect-title">{german ? "Du musst den richtigen Weg noch nicht kennen." : "You do not need to know the right path yet."}</h1>
        <p>
          {german ? "Beginne mit dem, was dich gerade interessiert. Du musst weder Disziplin, Desk noch Projekt wählen — wir helfen, den passenden Anschluss zu finden." : "Begin with what interests you now. You do not need to choose a discipline, a Desk or a project — we will help find the appropriate connection."}
        </p>
      </div>

      <div className="human-connect__ways" aria-label="Ways to make contact">
        {ways.map((way) => (
          <a href={way.href} key={way.number}>
            <small>{way.number}</small>
            <strong>{way.title}</strong>
            <span>{way.copy}</span>
            <b>{way.action}</b>
          </a>
        ))}
        <article>
          <small>03</small>
          <strong>{german ? "Ich möchte erst weitersehen." : "I would like to keep exploring first."}</strong>
          <span>{german ? "Kein Kontakt nötig. Kehre zur Human View zurück oder öffne die vollständige Karte der Verbindungen." : "No contact required. Return to the Human View or open the complete map of connections."}</span>
          <div>
            <Link href={german ? "/?view=human&lang=de" : "/?view=human"}>Human View ↙</Link>
            <a href="/a0-human/start/NEXAH_C_CONNECT.html">{german ? "Alle Wege ansehen ↗" : "View all paths ↗"}</a>
          </div>
        </article>
      </div>

      <p className="human-connect__boundary">
        {german ? "Eine Nachricht beginnt ein Gespräch. Sie wird nicht automatisch zu Research Intake, Finding oder Bauauftrag. Bitte sende keine vertraulichen Dokumente, Zugangsdaten oder persönlichen Akten." : "A message begins a conversation. It does not automatically become a Research Intake, Finding or build commission. Please do not send confidential documents, credentials or personal records."}
      </p>
    </section>
  );
}
