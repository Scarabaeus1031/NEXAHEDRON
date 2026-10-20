"use client";

import { useMemo, useState } from "react";

type Station = {
  readonly code: string;
  readonly symbol: string;
  readonly label: string;
  readonly kind: string;
  readonly mode: string;
  readonly title: string;
  readonly story: string;
  readonly action: string;
  readonly notice: string;
  readonly boundary: string;
  readonly sourceName: string;
  readonly source: string;
};

const stations: readonly Station[] = [
  {
    code: "01",
    symbol: "◇",
    label: "Körper drehen",
    kind: "Körper",
    mode: "TURN",
    title: "Was versteckt sich auf der Rückseite?",
    story: "Von vorn sieht ein Körper anders aus als von hinten. Dreh ihn — und entdecke, wie seine Flächen zusammenhängen.",
    action: "Ziehe am Körper oder benutze Links / Rechts. Halte die Drehung an und wechsle zur Draufsicht.",
    notice: "Achte darauf: In einer flachen Ansicht können Stellen zusammenrücken, die räumlich getrennt sind.",
    boundary: "Ein konstruiertes geometrisches Modell. Hülle und mathematisches Zustandsnetz sind nicht identisch.",
    sourceName: "Tessarec · Blue Body",
    source: "/a0-human/instruments/A0_TESSAREC_BLUE_BODY_LAB.html?human-stage=lab#lab",
  },
  {
    code: "02",
    symbol: "⊞",
    label: "Anders sehen",
    kind: "Perspektiven",
    mode: "VIEW",
    title: "Vier Bilder. Was gehört zusammen?",
    story: "Ein gemeinsames Register aus Punkten erscheint von vorn, oben und von der Seite verschieden.",
    action: "Verschiebe den Kanal-Regler. Suche die goldene Auswahl in allen vier Bildern.",
    notice: "Ein Punkt kann in einer Ansicht sichtbar sein und in einer anderen mit weiteren Punkten überlagern.",
    boundary: "Vier Projektionen eines gemeinsamen 48er-Adressregisters — keine nachgewiesene physische Innengeometrie.",
    sourceName: "Blue Body · vier Registeransichten",
    source: "/a0-human/instruments/A0_TESSAREC_BLUE_BODY_LAB.html?human-stage=blue-body-interior-crt16#blue-body-interior-crt16",
  },
  {
    code: "03",
    symbol: "⌁",
    label: "Eine Lücke finden",
    kind: "Faltung",
    mode: "FOLD",
    title: "Warum bleibt die Mitte offen?",
    story: "Vier Klappen bewegen sich zur Mitte. Falten allein garantiert noch nicht, dass sie sich dort treffen.",
    action: "Verändere Faltwinkel und Verlängerung. Wann wird aus einer Lücke Kontakt — und wann Überlappung?",
    notice: "Die Ansicht zeigt eine konstruierte Faltregel, keine Materialsimulation.",
    boundary: "Klappendicke, räumliche Kollisionen und eine baubare geschlossene Box sind damit nicht bewiesen.",
    sourceName: "Pentagon-Faltbox · Kontaktprojektion",
    source: "/a0-human/instruments/A0_TESSAREC_BLUE_BODY_LAB.html?human-stage=fold-contact#fold-contact",
  },
  {
    code: "04",
    symbol: "∞",
    label: "Eine Welt verändern",
    kind: "Fraktale",
    mode: "CHANGE",
    title: "Eine kleine Änderung. Eine andere Welt?",
    story: "Eine feste Rechenregel erzeugt sehr verschiedene Bilder — je nachdem, welchen Parameter du wählst.",
    action: "Wähle Interior, Boundary und Exterior. Verändere dann Re(c) oder Im(c) nur ein kleines Stück.",
    notice: "Parameterkarte, Julia-Bild und Punktbahn zeigen unterschiedliche Dinge.",
    boundary: "Endliche numerische Darstellung von z → z²+c — kein gemeinsamer physikalischer Mechanismus.",
    sourceName: "Mandelbrot ↔ Julia · Parameter und Bahn",
    source: "/a0-human/instruments/A0_BLUE_PINK_DODECA_CELL_RETURN.html?human-stage=formation#formation",
  },
  {
    code: "05",
    symbol: "▶",
    label: "Spielen & zurückkehren",
    kind: "Play",
    mode: "ARKADE",
    title: "Welche Welt möchtest du bewegen?",
    story: "Drei Welten reagieren auf unterschiedliche Regeln: LIFE, Three Domains und Numbers.",
    action: "Starte mit LIFE. Drücke PLAY oder +1 und wechsle dann die Ansicht. Vergleiche, was Bewegung jeweils bedeutet.",
    notice: "Jede Welt behält ihren eigenen Zustand und ihre eigene Uhr.",
    boundary: "Gemeinsame Bedienung macht die Welten vergleichbar, aber nicht zu demselben Operator.",
    sourceName: "NEXAH Arkade · Game of Worlds",
    source: "/a0-human/instruments/A0_GAME_OF_WORLDS_PLAY.html?world=life#life",
  },
] as const;

const differenceQuestions = [
  ["I", "Preserved", "Was bleibt in der neuen Ansicht verfügbar?"],
  ["L", "Lost", "Was kann aus dieser Ansicht allein nicht zurückgewonnen werden?"],
  ["A", "Added", "Was gehört zur Darstellung und nicht zu ihrer Quelle?"],
  ["U", "Unavailable", "Was bleibt außerhalb der gewählten Grenze?"],
] as const;

export function A0HumanView() {
  const [stationIndex, setStationIndex] = useState(0);
  const [loadedStation, setLoadedStation] = useState<number | null>(null);
  const station = stations[stationIndex];
  const progress = useMemo(() => `${station.code} / ${String(stations.length).padStart(2, "0")}`, [station]);
  const progressPercent = `${((stationIndex + 1) / stations.length) * 100}%`;

  function selectStation(index: number) {
    setLoadedStation(index);
    setStationIndex(index);
    requestAnimationFrame(() => {
      document.getElementById("a0-station-stage")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  function move(delta: number) {
    const next = stationIndex + delta;
    if (next >= stations.length) {
      document.getElementById("a0-return")?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    if (next >= 0) selectStation(next);
  }

  return (
    <article className="a0-human-view">
      <section className="a0-human-hero" aria-labelledby="a0-human-title">
        <p className="a0-human-eyebrow">A0 · Human View · fünf spielbare Kapitel</p>
        <h1 id="a0-human-title">Dreh es um.<br /><em>Schau noch einmal.</em></h1>
        <p className="a0-human-lead">
          Ein Körper. Mehrere Ansichten. Eine Welt, die auf deine Berührung
          reagiert. Dieses Buch wird nicht nur gelesen: Es lädt dich zum
          Drehen, Sehen und Spielen ein — ohne Vorwissen.
        </p>
        <div className="a0-human-actions">
          <a className="a0-human-primary" href="#a0-instrument">Das Buch betreten <span aria-hidden="true">↓</span></a>
          <a className="a0-human-secondary" href="#a0-return">Worum es geht <span aria-hidden="true">↘</span></a>
        </div>
        <p className="a0-human-quiet">In deinem Tempo. Jede Station kann übersprungen oder erneut geöffnet werden.</p>
      </section>

      <section className="a0-human-experience" id="a0-instrument" aria-labelledby="a0-station-title">
        <div className="a0-arcade-deck">
          <div className="a0-arcade-head">
            <div>
              <p>A0 BOOK PLAYER</p>
              <span>Fünf Kapitel · frei blättern oder der Reihe folgen</span>
            </div>
            <div className="a0-arcade-paddles" aria-label="Durch die Kapitel blättern">
              <button
                aria-label="Vorheriges Kapitel"
                disabled={stationIndex === 0}
                onClick={() => move(-1)}
                type="button"
              >←</button>
              <output aria-live="polite">{progress}</output>
              <button
                aria-label={stationIndex === stations.length - 1 ? "Zum Human Return" : "Nächstes Kapitel"}
                onClick={() => move(1)}
                type="button"
              >→</button>
            </div>
          </div>
          <div className="a0-arcade-progress" aria-hidden="true"><i style={{ width: progressPercent }} /></div>
          <nav className="a0-station-rail" aria-label="Stationen der A0 Human View">
            {stations.map((item, index) => (
              <button
                aria-current={index === stationIndex ? "step" : undefined}
                key={item.code}
                onClick={() => selectStation(index)}
                type="button"
              >
                <span className="a0-station-symbol" aria-hidden="true">{item.symbol}</span>
                <span className="a0-station-label">
                  <small>{item.code} · {item.mode}</small>
                  <strong>{item.label}</strong>
                </span>
                {index === stationIndex ? <i>JETZT</i> : null}
              </button>
            ))}
          </nav>
        </div>

        <div className="a0-station-page" id="a0-station-stage" key={station.code}>
          <div className="a0-station-copy">
            <div>
              <p className="a0-human-eyebrow">{progress} · {station.kind}</p>
              <h2 id="a0-station-title">{station.title}</h2>
              <p>{station.story}</p>
            </div>
            <aside className="a0-station-mission" aria-label="Einladung und Beobachtung">
              <span>Probier es aus</span>
              <p>{station.action}</p>
              <small>{station.notice}</small>
            </aside>
          </div>

          <div className="a0-instrument-window">
            <div className="a0-instrument-bar">
              <span>{station.sourceName}</span>
              {loadedStation === stationIndex ? (
                <button onClick={() => setLoadedStation(null)} type="button">Instrument schließen</button>
              ) : (
                <button onClick={() => setLoadedStation(stationIndex)} type="button">Instrument öffnen →</button>
              )}
            </div>
            {loadedStation === stationIndex ? (
              <iframe
                key={station.source}
                src={station.source}
                title={`${station.sourceName} · öffentliche A0 Human-Ansicht`}
                sandbox="allow-scripts allow-same-origin"
              />
            ) : (
              <div className="a0-instrument-poster" aria-label="Schematische Vorschau des Instruments">
                <span className="a0-poster-symbol" aria-hidden="true">{station.symbol}</span>
                <p>{station.mode} · {station.label}</p>
                <small>Das bestehende source-bound A0-Instrument ist bereit.</small>
              </div>
            )}
          </div>

          <div className="a0-journey-controls">
            <button disabled={stationIndex === 0} onClick={() => move(-1)} type="button">← Zurückblättern</button>
            <button className="a0-control-primary" onClick={() => move(1)} type="button">
              {stationIndex === stations.length - 1 ? "Buch schließen · zum Return →" : `Nächste Seite · ${stations[stationIndex + 1].label} →`}
            </button>
          </div>
          <details className="a0-source-note">
            <summary>Was sehe ich hier eigentlich?</summary>
            <p>{station.boundary}</p>
            <p>Jede Station ist ein eigenes Instrument. Beim Wechsel wird das Fenster geschlossen; sein Zustand wird nicht in die nächste Station übertragen.</p>
          </details>
        </div>
      </section>

      <section className="a0-human-return" id="a0-return" tabIndex={-1} aria-labelledby="a0-return-title">
        <p className="a0-human-eyebrow">Was nimmst du mit?</p>
        <h2 id="a0-return-title">Ein Bild ist ein Blick.<br />Nicht das ganze Objekt.</h2>
        <p>
          Du hast Körper, Register, Faltung, Fraktal und Spiel aus verschiedenen
          Positionen betrachtet. Nicht alles folgt derselben Regel. Aber jedes
          Kapitel lässt dich prüfen: Was ändere ich — und was sehe ich deshalb anders?
        </p>
        <ol className="a0-difference-grid">
          {differenceQuestions.map(([mark, title, copy]) => (
            <li key={mark}><span>{mark}</span><strong>{title}</strong><p>{copy}</p></li>
          ))}
        </ol>
        <div className="a0-field-doors">
          <a href="https://nexah.de/about/">
            <small>Methode · Science · Quellen</small>
            <strong>NEXAH verstehen <span aria-hidden="true">↗</span></strong>
          </a>
          <a href="https://scarabaeus1033.net/">
            <small>Werkstatt · Manufaktur · Builder</small>
            <strong>Scarabæus besuchen <span aria-hidden="true">↗</span></strong>
          </a>
        </div>
        <p className="a0-human-boundary">Human View ≠ wissenschaftlicher Beweis. Navigation verändert weder Quellenstatus noch Evidenz.</p>
      </section>
    </article>
  );
}
