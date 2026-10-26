"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { featuredWorks } from "@/features/library/featured-works";

type ShowcaseId = "books" | "record" | "film" | "object" | "arcade" | "club";

const showcaseWindows: readonly { id: ShowcaseId; number: string; label: string; title: string; note: string }[] = [
  { id: "books", number: "01", label: "Lesen", title: "Drei Bücher", note: "Gedanken über mehrere Seiten verfolgen." },
  { id: "record", number: "02", label: "Hören", title: "Record / Play", note: "Eine flüchtige Stimme wird zur wiederholbaren Spur." },
  { id: "film", number: "03", label: "Sehen", title: "Kurzfilm", note: "2:48 Minuten aus Bild, Zeit und Ton." },
  { id: "object", number: "04", label: "Anfassen", title: "Ein Objekt", note: "Drehen, Abstand ändern und dieselbe Form neu sehen." },
  { id: "arcade", number: "05", label: "Spielen", title: "Arcade", note: "Drei Welten und ein gemeinsamer Puls." },
  { id: "club", number: "06", label: "Verbinden", title: "Club", note: "Relationen als spielbaren Raum betreten." },
] as const;

const publicChannels = [
  { href: "https://nexah.de", mark: "N", label: "NEXAH" },
  { href: "https://www.are.na/nexah-scarabaeus1031/channels", mark: "A", label: "Are.na" },
  { href: "https://www.instagram.com/scarabaeus1033/", mark: "◎", label: "Instagram" },
  { href: "https://x.com/Scarabaeus1033", mark: "X", label: "X" },
  { href: "https://www.scarabaeus1033.net/", mark: "S", label: "Scarabæus 1033" },
] as const;

function NexahedronRecordPlayer() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const viewer = document.createElement("model-viewer");
    viewer.setAttribute("src", "/a0-human/start/assets/3d/nexah_roedelheim_record_play.glb");
    viewer.setAttribute("alt", "Interaktives 3D-Modell des Rödelheim Record Play Instruments mit Graph-, Wave- und Fold-Spuren");
    viewer.setAttribute("camera-controls", "");
    viewer.setAttribute("rotation-per-second", "10deg");
    viewer.setAttribute("interaction-prompt", "auto");
    viewer.setAttribute("touch-action", "none");
    viewer.setAttribute("loading", "eager");
    viewer.setAttribute("reveal", "auto");
    viewer.setAttribute("shadow-intensity", "1");
    viewer.setAttribute("exposure", "1.05");

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const applyMotionPreference = () => {
      if (reducedMotion.matches) viewer.removeAttribute("auto-rotate");
      else viewer.setAttribute("auto-rotate", "");
    };
    applyMotionPreference();
    reducedMotion.addEventListener("change", applyMotionPreference);
    host.replaceChildren(viewer);

    return () => {
      reducedMotion.removeEventListener("change", applyMotionPreference);
      host.replaceChildren();
    };
  }, []);

  return (
    <div className="nexahedron-inline-record">
      <div ref={hostRef} className="nexahedron-inline-record__stage" />
      <div className="nexahedron-inline-record__meta">
        <p><strong>Record / Play</strong><br />Ziehen = drehen · Scrollen/Pinch = zoomen · GLB · 1.0 MB</p>
      </div>
    </div>
  );
}

function NexahedronObject() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const viewer = document.createElement("model-viewer");
    viewer.setAttribute("src", "/a0-human/start/downloads/A0_PENTAGON_KNICK_APERTURE_INTAKE_2026-10-25/deliverables/glb/NEXAH_Fuenflaschenkrone_Animiert_2026-10-25.glb");
    viewer.setAttribute("alt", "Interaktives illustratives 3D-Objekt einer fünfteiligen Krone");
    viewer.setAttribute("camera-controls", "");
    viewer.setAttribute("autoplay", "");
    viewer.setAttribute("rotation-per-second", "9deg");
    viewer.setAttribute("interaction-prompt", "auto");
    viewer.setAttribute("touch-action", "none");
    viewer.setAttribute("loading", "eager");
    viewer.setAttribute("reveal", "auto");
    viewer.setAttribute("shadow-intensity", "1");

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const applyMotionPreference = () => {
      if (reducedMotion.matches) viewer.removeAttribute("auto-rotate");
      else viewer.setAttribute("auto-rotate", "");
    };
    applyMotionPreference();
    reducedMotion.addEventListener("change", applyMotionPreference);
    host.replaceChildren(viewer);

    return () => {
      reducedMotion.removeEventListener("change", applyMotionPreference);
      host.replaceChildren();
    };
  }, []);

  return <div ref={hostRef} className="nexahedron-showcase-object" />;
}

function ShowcasePanel({ active, onOpen }: { readonly active: ShowcaseId; readonly onOpen: (id: ShowcaseId) => void }) {
  if (active === "books") {
    return (
      <div className="nexahedron-showcase-books">
        {featuredWorks.map((work, index) => (
          <a href={work.href} key={work.href} target="_blank" rel="noopener noreferrer">
            <small>0{index + 1} · NEXAH LIBRARY ↗</small>
            <img src={work.cover} alt={`Cover von ${work.title}`} loading="lazy" />
            <strong>{work.title}</strong>
            <span>{work.note}</span>
          </a>
        ))}
      </div>
    );
  }

  if (active === "record") return <NexahedronRecordPlayer />;

  if (active === "film") {
    return (
      <div className="nexahedron-showcase-film">
        <video controls playsInline preload="metadata" poster="https://nexah.de/media/framework-of-legibility-poster.jpg">
          <source src="https://nexah.de/media/framework-of-legibility.mp4" type="video/mp4" />
          Dein Browser kann den Film nicht abspielen. <a href="https://nexah.de/media/framework-of-legibility.mp4">Film bei NEXAH öffnen.</a>
        </video>
        <p><strong>Framework of Legibility · 2:48</strong><br />Bild und Ton führen durch Räume, Karten, Licht und Schatten. Der Film ist ein eigener Zugang; keine Übersetzung der Bücher.</p>
      </div>
    );
  }

  if (active === "object") {
    return (
      <div className="nexahedron-showcase-object-wrap">
        <NexahedronObject />
        <p><strong>Fünfflaschenkrone · animiertes 3D-Objekt</strong><br />Ziehen zum Drehen, Scrollen oder Pinch zum Zoomen. Illustratives Ausstellungsobjekt — keine wissenschaftliche Evidenz und kein Teil der Tour.</p>
      </div>
    );
  }

  if (active === "club") {
    return (
      <div className="nexahedron-showcase-club">
        <div className="nexahedron-showcase-club__stage" aria-label="NEXAH Club · rhythmische Human View">
          <span className="nexahedron-showcase-club__orbit" aria-hidden="true" />
          <span className="nexahedron-showcase-club__record" aria-hidden="true"><i /></span>
          <p><small>NEXAH · CLUB</small><strong>Let the relations play.</strong><span>Ein Raum für Rhythmus, Blickwechsel und Begegnung. Keine Bench, kein Atlas, kein wissenschaftliches Bedienpult.</span></p>
        </div>
        <div className="nexahedron-showcase-club__choices">
          <article>
            <small>01 · CLUB</small>
            <strong>Im Raum bleiben.</strong>
            <span>Schauen, hören, bewegen — ohne weitere Werkzeugtiefe.</span>
          </article>
          <button type="button" onClick={() => onOpen("record")}>
            <small>02 · RECORD / CD PLAYER</small>
            <strong>Eine Spur auflegen.</strong>
            <span>Zum vorhandenen drehbaren Player wechseln →</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="nexahedron-showcase-flagship">
      <iframe
        loading="lazy"
        src="/a0-human/start/a0-public-arkade-index.html#arkade"
        title="NEXAH Arcade Vorschau"
      />
      <div>
        <small>PLAY · THREE WORLDS</small>
        <strong>NEXAH Arcade</strong>
        <p>Ein spielbarer Zugang mit drei verbundenen Welten und einem sichtbaren Return.</p>
        <Link href="/?view=arcade">Arcade öffnen →</Link>
      </div>
    </div>
  );
}

export function A0WorldFrame({ source, title = "NEXAHEDRON · Foyer" }: { readonly source: string; readonly title?: string }) {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const selectorRefs = useRef<Partial<Record<ShowcaseId, HTMLButtonElement | null>>>({});
  const [activeWindow, setActiveWindow] = useState<ShowcaseId | null>("record");
  const [isShowcaseExpanded, setIsShowcaseExpanded] = useState(false);

  const activeDefinition = showcaseWindows.find((item) => item.id === activeWindow);

  function openShowcase(id: ShowcaseId) {
    setIsShowcaseExpanded(false);
    setActiveWindow(id);
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
    window.requestAnimationFrame(() => document.getElementById("nexahedron-showcase-window")?.scrollIntoView({ behavior, block: "nearest" }));
  }

  function closeShowcase() {
    const previous = activeWindow;
    setIsShowcaseExpanded(false);
    setActiveWindow(null);
    if (previous) window.requestAnimationFrame(() => selectorRefs.current[previous]?.focus());
  }

  useEffect(() => {
    if (!activeWindow) return;
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      if (isShowcaseExpanded) {
        setIsShowcaseExpanded(false);
        return;
      }
      const previous = activeWindow;
      setActiveWindow(null);
      window.requestAnimationFrame(() => selectorRefs.current[previous]?.focus());
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [activeWindow, isShowcaseExpanded]);

  useEffect(() => {
    if (!isShowcaseExpanded) return;
    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => { document.documentElement.style.overflow = previousOverflow; };
  }, [isShowcaseExpanded]);

  function applyNexahedronProjection(frame: HTMLIFrameElement) {
    const document = frame.contentDocument;
    if (!document) return;

    const isFoyer = frame.contentWindow?.location.pathname.endsWith("/index.html") ?? false;
    document.documentElement.dataset.nexahedronProjection = isFoyer ? "foyer" : "experience";

    if (isFoyer) {
      const depth = document.querySelector<HTMLDetailsElement>("details.portal-depth");
      const trailer = document.querySelector<HTMLElement>("#world-trailer");
      if (depth) depth.open = true;
      if (trailer && !trailer.querySelector(".nexahedron-tour-entry")) {
        const entry = document.createElement("a");
        entry.className = "nexahedron-tour-entry";
        entry.href = "/?view=human";
        entry.target = "_parent";
        entry.textContent = "Tour betreten →";
        trailer.append(entry);
      }
      if (trailer && trailer.dataset.nexahedronEntryBound !== "true") {
        trailer.dataset.nexahedronEntryBound = "true";
        trailer.setAttribute("role", "link");
        trailer.setAttribute("tabindex", "0");
        trailer.setAttribute("aria-label", "NEXAHEDRON Tour betreten");

        const enterHumanView = (event: Event) => {
          const target = event.target as Element | null;
          if (target?.closest?.("button, a, input, select, textarea")) return;
          frame.contentWindow?.parent.location.assign("/?view=human");
        };

        trailer.addEventListener("click", enterHumanView);
        trailer.addEventListener("keydown", (event) => {
          if (event.key !== "Enter" && event.key !== " ") return;
          event.preventDefault();
          enterHumanView(event);
        });
      }
    }

    const previousStyle = document.getElementById("nexahedronFrameChromeStyle");
    if (previousStyle) previousStyle.remove();

    const style = document.createElement("style");
    style.id = "nexahedronFrameChromeStyle";
    style.textContent = `
      body > header.top,
      body > header.a0-context-ready {
        display: none !important;
      }

      html {
        scroll-padding-top: 0 !important;
      }

      html[data-nexahedron-projection="foyer"] #top > :not(.portal-depth) {
        display: none !important;
      }

      html[data-nexahedron-projection="foyer"] .portal-depth > summary,
      html[data-nexahedron-projection="foyer"] .portal-depth > :not(summary):not(#built-world) {
        display: none !important;
      }

      html[data-nexahedron-projection="foyer"] body > footer {
        display: none !important;
      }

      html[data-nexahedron-projection="foyer"] #built-world {
        min-height: 100svh !important;
        border-bottom: 0 !important;
      }

      html[data-nexahedron-projection="foyer"] .world-plate-inner {
        width: 100% !important;
        max-width: 92rem !important;
        padding-inline: clamp(1rem, 3vw, 3.5rem) !important;
      }

      html[data-nexahedron-projection="foyer"] .world-plate-head {
        display: grid !important;
        grid-template-columns: minmax(0, .95fr) minmax(22rem, 1.05fr) !important;
        gap: clamp(1.5rem, 4vw, 4rem) !important;
        align-items: end !important;
      }

      html[data-nexahedron-projection="foyer"] .world-plate-intro {
        display: block !important;
        max-width: 38rem !important;
        color: #b7c8d0 !important;
        font-size: clamp(.95rem, 1.35vw, 1.15rem) !important;
        line-height: 1.5 !important;
      }

      html[data-nexahedron-projection="foyer"] .world-plate h2 {
        color: #f4f2eb !important;
      }

      html[data-nexahedron-projection="foyer"] .world-map,
      html[data-nexahedron-projection="foyer"] .world-room--backstage,
      html[data-nexahedron-projection="foyer"] .world-plate-return {
        display: none !important;
      }

      html[data-nexahedron-projection="foyer"] #world-trailer {
        cursor: pointer;
      }

      html[data-nexahedron-projection="foyer"] #world-trailer:hover,
      html[data-nexahedron-projection="foyer"] #world-trailer:focus-visible {
        border-color: #e8b747 !important;
        box-shadow: 0 0 0 2px rgba(232,183,71,.22), 16px 16px 0 rgba(67,202,231,.08) !important;
      }

      html[data-nexahedron-projection="foyer"] #world-trailer:focus-visible {
        outline: 3px solid #f5ce68;
        outline-offset: 5px;
      }

      html[data-nexahedron-projection="foyer"] .nexahedron-tour-entry {
        position: absolute;
        z-index: 8;
        right: clamp(1rem, 3vw, 2.2rem);
        bottom: clamp(1rem, 3vw, 2rem);
        display: inline-flex;
        min-height: 2.6rem;
        align-items: center;
        padding: .72rem 1rem;
        border: 1px solid #e8b747;
        background: rgba(4,13,20,.9);
        color: #f5ce68;
        font: 800 .68rem/1 ui-monospace, SFMono-Regular, Menlo, monospace;
        letter-spacing: .09em;
        text-decoration: none;
        text-transform: uppercase;
      }

      html[data-nexahedron-projection="foyer"] .nexahedron-tour-entry:hover,
      html[data-nexahedron-projection="foyer"] .nexahedron-tour-entry:focus-visible {
        background: #e8b747;
        color: #07141e;
        outline: 2px solid #f5ce68;
        outline-offset: 3px;
      }

      html[data-nexahedron-projection="foyer"] #world-trailer::before {
        background:
          linear-gradient(90deg, rgba(4,13,20,.34), transparent 16%, transparent 84%, rgba(4,13,20,.38)),
          linear-gradient(transparent 50%, rgba(117,231,255,.035) 50%) !important;
        background-size: auto, 100% 4px !important;
        mix-blend-mode: normal !important;
      }

      html[data-nexahedron-projection="foyer"] #world-trailer::after {
        opacity: .72;
      }

      html[data-nexahedron-projection="experience"] .human-stage-fold--machina {
        display: none !important;
      }

      @media (max-width: 720px) {
        html[data-nexahedron-projection="foyer"] .world-plate-inner {
          padding: 2.5rem 1rem 3rem !important;
        }

        html[data-nexahedron-projection="foyer"] .world-plate-head {
          grid-template-columns: 1fr !important;
          gap: 1rem !important;
        }

        html[data-nexahedron-projection="foyer"] .world-trailer svg {
          min-height: 18rem !important;
        }

      }
    `;
    document.head.append(style);

    if (isFoyer) {
      frame.contentWindow?.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }

  }

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const apply = () => applyNexahedronProjection(frame);
    apply();
    frame.addEventListener("load", apply);
    return () => frame.removeEventListener("load", apply);
  }, [source]);

  return (
    <>
      <iframe
        ref={frameRef}
        className="a0-source-home-frame"
        src={source}
        title={title}
        onLoad={(event) => applyNexahedronProjection(event.currentTarget)}
      />
      {source.endsWith("/index.html") ? (
        <section className="nexahedron-first-contact" aria-labelledby="first-contact-title">
          <section className="nexahedron-showcase" aria-labelledby="nexahedron-showcase-title">
            <h2 className="sr-only" id="nexahedron-showcase-title">Sechs Fenster in NEXAHEDRON</h2>
            <div className="nexahedron-showcase-selectors" role="toolbar" aria-label="Sechs Fenster öffnen">
              {showcaseWindows.map((item) => (
                <button
                  aria-controls="nexahedron-showcase-window"
                  aria-expanded={activeWindow === item.id}
                  className={activeWindow === item.id ? "is-active" : undefined}
                  key={item.id}
                  onClick={() => openShowcase(item.id)}
                  ref={(node) => { selectorRefs.current[item.id] = node; }}
                  type="button"
                >
                  <small>{item.number} · {item.label}</small>
                  <strong>{item.title}</strong>
                  <span>{item.note}</span>
                </button>
              ))}
            </div>

            <div className="nexahedron-first-contact__editorial">
              <header className="nexahedron-first-contact__intro">
                <h1 id="first-contact-title">Orientierung beginnt mit einem Unterschied.</h1>
                <p>Wähle ein Fenster, berühre ein Objekt oder betrete eine spielbare Welt. Die geführte Tour bleibt der gemeinsame Weg durch die Welt.</p>
              </header>
            </div>

            {activeWindow && activeDefinition ? (
              <section
                aria-labelledby={`showcase-${activeWindow}-title`}
                aria-live="polite"
                aria-modal={isShowcaseExpanded || undefined}
                className={`nexahedron-showcase-window${isShowcaseExpanded ? " is-expanded" : ""}`}
                id="nexahedron-showcase-window"
                role={isShowcaseExpanded ? "dialog" : undefined}
              >
                <header>
                  <p><small>{activeDefinition.number} · {activeDefinition.label}</small><strong id={`showcase-${activeWindow}-title`}>{activeDefinition.title}</strong></p>
                  <div className="nexahedron-showcase-window__actions">
                    <button
                      aria-expanded={isShowcaseExpanded}
                      aria-label={`${activeDefinition.title} ${isShowcaseExpanded ? "zur Kachelansicht zurückführen" : "vergrößern"}`}
                      onClick={() => setIsShowcaseExpanded((current) => !current)}
                      type="button"
                    >
                      {isShowcaseExpanded ? "Zurück ↙" : "Vergrößern ↗"}
                    </button>
                    <button type="button" onClick={closeShowcase} aria-label={`${activeDefinition.title} schließen`}>Schließen ×</button>
                  </div>
                </header>
                <ShowcasePanel active={activeWindow} onOpen={openShowcase} />
              </section>
            ) : null}
          </section>

          <footer className="nexahedron-first-contact__entry" id="tour-entry">
            <Link href="/?view=human">
              <span><small>TOUR BETRETEN</small><strong>Wechsle die Ansicht. Behalte den Unterschied.</strong></span>
              <b aria-hidden="true">→</b>
            </Link>
          </footer>

          <nav className="nexahedron-public-channels" aria-label="NEXAH öffentliche Kanäle">
            <small>WEITERGEHEN</small>
            <div>
              {publicChannels.map((channel) => (
                <a href={channel.href} key={channel.href} target="_blank" rel="noopener noreferrer" aria-label={`${channel.label} in neuem Fenster öffnen`} title={channel.label}>
                  <span aria-hidden="true">{channel.mark}</span>
                </a>
              ))}
            </div>
          </nav>

        </section>
      ) : null}
    </>
  );
}
