"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { PublicLanguage } from "@/components/layout/LanguageSwitch";
import { featuredWorks } from "@/features/library/featured-works";

type ShowcaseId = "books" | "interior" | "film" | "object" | "arcade" | "club";
type ShowcaseWindow = { id: ShowcaseId; number: string; label: string; title: string; note: string };

const showcaseWindowsEn: readonly ShowcaseWindow[] = [
  { id: "books", number: "01", label: "Read", title: "Three books", note: "Follow an idea across several pages." },
  { id: "interior", number: "02", label: "Enter", title: "The Living Interior", note: "A surface opens. A living field becomes visible." },
  { id: "film", number: "03", label: "Watch", title: "Short film", note: "2:48 minutes of image, time and sound." },
  { id: "object", number: "04", label: "Touch", title: "One object", note: "Turn it, change the distance and see the same form again." },
  { id: "arcade", number: "05", label: "Play", title: "Arcade", note: "Three worlds and one shared pulse." },
  { id: "club", number: "06", label: "Connect", title: "Club", note: "Enter relations as a playable room." },
] as const;

const showcaseWindowsDe: readonly ShowcaseWindow[] = [
  { id: "books", number: "01", label: "Lesen", title: "Drei Bücher", note: "Folge einer Idee über mehrere Seiten." },
  { id: "interior", number: "02", label: "Eintauchen", title: "The Living Interior", note: "Eine Oberfläche öffnet sich. Ein lebendiges Feld wird sichtbar." },
  { id: "film", number: "03", label: "Ansehen", title: "Kurzfilm", note: "2:48 Minuten aus Bild, Zeit und Klang." },
  { id: "object", number: "04", label: "Berühren", title: "Ein Objekt", note: "Drehe es, ändere den Abstand und sieh dieselbe Form erneut." },
  { id: "arcade", number: "05", label: "Spielen", title: "Arcade", note: "Drei Welten und ein gemeinsamer Puls." },
  { id: "club", number: "06", label: "Verbinden", title: "Club", note: "Betritt Beziehungen als spielbaren Raum." },
] as const;

const publicChannels = [
  { href: "https://nexah.de", mark: "N", label: "NEXAH" },
  { href: "https://www.are.na/nexah-scarabaeus1031/channels", mark: "A", label: "Are.na" },
  { href: "https://www.instagram.com/scarabaeus1033/", mark: "◎", label: "Instagram" },
  { href: "https://x.com/Scarabaeus1033", mark: "X", label: "X" },
  { href: "https://www.scarabaeus1033.net/", mark: "S", label: "Scarabæus 1033" },
] as const;

function NexahedronLivingInterior() {
  const previewRef = useRef<HTMLDivElement>(null);
  const [previewReady, setPreviewReady] = useState(false);

  useEffect(() => {
    const preview = previewRef.current;
    if (!preview) return;

    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      setPreviewReady(true);
      observer.disconnect();
    }, { rootMargin: "120px" });

    observer.observe(preview);
    return () => observer.disconnect();
  }, []);

  function applyPublicProjection(frame: HTMLIFrameElement) {
    const document = frame.contentDocument;
    if (!document) return;

    document.querySelectorAll<HTMLElement>("header.top, main > :not(.portal), body > footer, .scroll-cue").forEach((element) => {
      element.hidden = true;
      element.setAttribute("aria-hidden", "true");
      element.style.setProperty("display", "none", "important");
    });

    const previousStyle = document.getElementById("nexahedronLivingInteriorProjection");
    if (previousStyle) previousStyle.remove();

    const style = document.createElement("style");
    style.id = "nexahedronLivingInteriorProjection";
    style.textContent = `
      html, body, main { height: 100%; overflow: hidden !important; }
      header.top,
      .top.a0-context-ready,
      body > footer,
      main > :not(.portal),
      .scroll-cue { display: none !important; }
      .portal { min-height: 100% !important; height: 100% !important; }
      .portal-copy { top: 10% !important; }
      @media (max-width: 720px) {
        .portal-copy { top: 8% !important; }
        .portal h1 { font-size: clamp(3.5rem, 17vw, 5.5rem) !important; }
        .stage-rail button { min-height: 4.75rem !important; padding: .7rem .45rem !important; }
      }
    `;
    document.head.append(style);

    frame.contentWindow?.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }

  return (
    <div className="nexahedron-showcase-flagship nexahedron-showcase-interior" ref={previewRef}>
      {previewReady ? (
        <iframe
          loading="eager"
          onLoad={(event) => applyPublicProjection(event.currentTarget)}
          src="/a0-human/start/A0_THE_LIVING_INTERIOR.html#passage"
          title="The Living Interior preview"
        />
      ) : (
        <div className="nexahedron-showcase-interior__loading" role="status">Opening the Living Interior …</div>
      )}
      <div>
        <small>HUMAN VIEW · INNER PASSAGE</small>
        <strong>The Living Interior</strong>
        <p>A surface opens. Touch the five stations and observe how a visible shell becomes a living field with a trace that can be remembered.</p>
      </div>
    </div>
  );
}

function NexahedronRecordPlayer({ language = "en" }: { readonly language?: PublicLanguage }) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const viewer = document.createElement("model-viewer");
    viewer.setAttribute("src", "/a0-human/start/assets/3d/nexah_roedelheim_record_play.glb");
    viewer.setAttribute("alt", "Interactive 3D model of the Rödelheim Record Play instrument with graph, wave and fold traces");
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
        <p><strong>Record / Play</strong><br />{language === "de" ? "Ziehen zum Drehen · scrollen oder zoomen · GLB · 1,0 MB" : "Drag to rotate · scroll or pinch to zoom · GLB · 1.0 MB"}</p>
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
    viewer.setAttribute("alt", "Interactive illustrative 3D object of a five-part crown");
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

function ShowcasePanel({ active }: { readonly active: ShowcaseId }) {
  if (active === "books") {
    return (
      <div className="nexahedron-showcase-books">
        {featuredWorks.map((work, index) => (
          <a href={work.href} key={work.href} target="_blank" rel="noopener noreferrer">
            <small>0{index + 1} · ARE.NA ORIGINAL ↗</small>
            <img src={work.cover} alt={`Cover of ${work.title}`} loading="lazy" />
            <strong>{work.title}</strong>
            <span>{work.note}</span>
          </a>
        ))}
      </div>
    );
  }

  if (active === "interior") return <NexahedronLivingInterior />;

  if (active === "film") {
    return (
      <div className="nexahedron-showcase-film">
        <video controls playsInline preload="metadata" poster="/media/framework-of-legibility-poster.jpg">
          <source src="/media/framework-of-legibility.mp4" type="video/mp4" />
          Your browser cannot play the film. <a href="/media/framework-of-legibility.mp4">Open the film directly.</a>
        </video>
        <p><strong>Framework of Legibility · 2:48</strong><br />Image and sound move through rooms, maps, light and shadow. The film is its own entrance, not a translation of the books.</p>
      </div>
    );
  }

  if (active === "object") {
    return (
      <div className="nexahedron-showcase-object-wrap">
        <NexahedronObject />
        <p><strong>Five-bottle crown · animated 3D object</strong><br />Drag to rotate; scroll or pinch to zoom. An illustrative exhibition object — not scientific evidence and not part of the tour.</p>
      </div>
    );
  }

  if (active === "club") {
    return (
      <div className="nexahedron-showcase-flagship">
        <iframe
          loading="lazy"
          src="/a0-human/start/A0_OPIUM.html"
          title="NEXAH Club preview"
        />
        <div>
          <small>HUMAN VIEW · CLUB</small>
          <strong>NEXAH Club</strong>
          <p>The existing entrance for rhythm, changes of view and encounter — without a Bench, Atlas or scientific control panel.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="nexahedron-showcase-flagship">
      <iframe
        loading="lazy"
        src="/a0-human/start/a0-public-arkade-index.html#arkade"
        title="NEXAH Arcade preview"
      />
      <div>
        <small>PLAY · THREE WORLDS</small>
        <strong>NEXAH Arcade</strong>
        <p>A playable entrance with three connected worlds and a visible Return.</p>
      </div>
    </div>
  );
}

export function A0WorldFrame({ source, title = "NEXAHEDRON · Foyer", language = "en" }: { readonly source: string; readonly title?: string; readonly language?: PublicLanguage }) {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const selectorRefs = useRef<Partial<Record<ShowcaseId, HTMLButtonElement | null>>>({});
  const [activeWindow, setActiveWindow] = useState<ShowcaseId | null>(null);
  const [isShowcaseExpanded, setIsShowcaseExpanded] = useState(false);

  const german = language === "de";
  const isFoyerSource = source.endsWith("/index.html");
  const showcaseWindows = german ? showcaseWindowsDe : showcaseWindowsEn;
  const activeDefinition = showcaseWindows.find((item) => item.id === activeWindow);

  function openShowcase(id: ShowcaseId) {
    setIsShowcaseExpanded(false);
    setActiveWindow(id);
    window.requestAnimationFrame(() => {
      const showcase = document.getElementById("nexahedron-showcase-window");
      showcase?.scrollTo({ top: 0, left: 0, behavior: "auto" });
      showcase?.scrollIntoView({ behavior: "auto", block: "start" });
    });
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

  const applyNexahedronProjection = useCallback((frame: HTMLIFrameElement) => {
    const document = frame.contentDocument;
    if (!document) return;

    const framePath = frame.contentWindow?.location.pathname ?? "";
    const isFoyer = framePath.endsWith("/index.html") || framePath.endsWith("/a0-human/start/");
    document.documentElement.dataset.nexahedronProjection = isFoyer ? "foyer" : "experience";

    if (isFoyer) {
      const depth = document.querySelector<HTMLDetailsElement>("details.portal-depth");
      const trailer = document.querySelector<HTMLElement>("#world-trailer");
      const intro = document.querySelector<HTMLElement>(".world-plate-intro");
      const trailerTitle = document.querySelector<HTMLElement>("#world-trailer-title");
      const trailerCopy = document.querySelector<HTMLElement>(".world-trailer-copy p");
      const trailerSmall = document.querySelector<HTMLElement>(".world-trailer-copy small");
      document.documentElement.lang = language;
      if (intro) intro.innerHTML = german
        ? "<strong>NEXAH ist eine offene, menschenzentrierte Orientierungspraxis: science-led, human-centered, instrument-enabled.</strong> A0 ist ihr gemeinsames methodisches Referenzobjekt. Hinter diesen Türen liegen Bücher, Bilder, Spiele, Instrumente, Forschung und Software — verbunden, aber nicht gleichgesetzt."
        : "<strong>NEXAH is an open, human-centred orientation practice: science-led, human-centred, instrument-enabled.</strong> A0 is its shared methodological reference object. Behind these doors are books, images, games, instruments, research and software — connected, but not equated.";
      if (trailerTitle) trailerTitle.textContent = german ? "Die Welt ist nicht nur eine Ansicht." : "The world is not one view.";
      if (trailerCopy) trailerCopy.textContent = german ? "Ein Gegenstand. Mehrere Schnitte. Sichtbare Übergänge. Und immer ein Weg zurück." : "One object. Several sections. Visible transitions. And always a way back.";
      if (trailerSmall) trailerSmall.textContent = german ? "00 · Welt-Trailer" : "00 · World trailer";
      if (depth) depth.open = true;
      if (trailer) {
        let entry = trailer.querySelector<HTMLAnchorElement>(".nexahedron-tour-entry");
        if (!entry) {
          entry = document.createElement("a");
          entry.className = "nexahedron-tour-entry";
          entry.target = "_parent";
          trailer.append(entry);
        }
        entry.className = "nexahedron-tour-entry";
        entry.href = german ? "/?view=human&lang=de" : "/?view=human";
        entry.target = "_parent";
        entry.textContent = german ? "Tour betreten →" : "Enter the tour →";
        trailer.dataset.nexahedronTarget = entry.href;
      }
      if (trailer && trailer.dataset.nexahedronEntryBound !== "true") {
        trailer.dataset.nexahedronEntryBound = "true";
        trailer.setAttribute("role", "link");
        trailer.setAttribute("tabindex", "0");
        trailer.setAttribute("aria-label", german ? "NEXAHEDRON-Tour betreten" : "Enter the NEXAHEDRON tour");

        const enterHumanView = (event: Event) => {
          const target = event.target as Element | null;
          if (target?.closest?.("button, a, input, select, textarea")) return;
          frame.contentWindow?.parent.location.assign(trailer.dataset.nexahedronTarget ?? "/?view=human");
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

  }, [german, language]);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const apply = () => applyNexahedronProjection(frame);
    apply();
    frame.addEventListener("load", apply);
    return () => frame.removeEventListener("load", apply);
  }, [source, applyNexahedronProjection]);

  return (
    <>
      <div className={`a0-source-module${isFoyerSource ? " a0-source-module--foyer" : ""}`}>
        {!isFoyerSource ? (
          <p className="a0-source-language-note" role="note">
            <span aria-hidden="true">DE</span>
            <strong>{german ? "Originalsprache: Deutsch" : "Original language: German"}</strong>
            {!german ? <small>Use your browser’s Translate function.</small> : null}
          </p>
        ) : null}
        <iframe
          ref={frameRef}
          className="a0-source-home-frame"
          src={source}
          title={title}
          onLoad={(event) => applyNexahedronProjection(event.currentTarget)}
        />
      </div>
      {isFoyerSource ? (
        <section className="nexahedron-first-contact" aria-labelledby="first-contact-title">
          <section className="nexahedron-showcase" aria-labelledby="nexahedron-showcase-title">
            <h2 className="sr-only" id="nexahedron-showcase-title">{german ? "Sechs Fenster in NEXAHEDRON" : "Six windows into NEXAHEDRON"}</h2>
            <div className="nexahedron-showcase-selectors" role="toolbar" aria-label={german ? "Eines von sechs Fenstern öffnen" : "Open one of six windows"}>
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
                <h1 id="first-contact-title">{german ? "Orientierung beginnt mit einem Unterschied." : "Orientation begins with a difference."}</h1>
                <p>{german ? "Wähle ein Fenster, berühre ein Objekt oder betritt eine spielbare Welt. Die geführte Tour bleibt der gemeinsame Weg durch die Welt." : "Choose a window, touch an object or enter a playable world. The guided tour remains the shared path through the world."}</p>
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
                      aria-label={`${activeDefinition.title} ${isShowcaseExpanded ? "return to the tile view" : "enlarge"}`}
                      onClick={() => setIsShowcaseExpanded((current) => !current)}
                      type="button"
                    >
                      {isShowcaseExpanded ? (german ? "Zurück ↙" : "Back ↙") : (german ? "Vergrößern ↗" : "Enlarge ↗")}
                    </button>
                    <button type="button" onClick={closeShowcase} aria-label={`${german ? "Schließen" : "Close"} ${activeDefinition.title}`}>{german ? "Schließen ×" : "Close ×"}</button>
                  </div>
                </header>
                <ShowcasePanel active={activeWindow} />
              </section>
            ) : null}
          </section>

          <section className="nexahedron-record-feature" id="record-player" aria-labelledby="record-player-title">
            <header>
              <p className="nexahedron-first-contact__eyebrow">{german ? "00 · EIN MOMENT, EIN RECORD, EIN RETURN" : "00 · ONE MOMENT, ONE RECORD, ONE RETURN"}</p>
              <h2 id="record-player-title">{german ? "Eine Stimme wird zum Record." : "A voice becomes a record."}</h2>
              <p>{german ? "Jemand singt. Ein Instrument wählt eine Spur aus und speichert sie; später wird daraus wieder Klang. Die Aufnahme bewahrt etwas vom Moment — sie ist nicht der Moment selbst." : "Someone sings. An instrument selects and stores a trace; later it becomes sound again. The recording preserves something of the moment — it is not the moment itself."}</p>
            </header>
            <NexahedronRecordPlayer language={language} />
          </section>

          <footer className="nexahedron-first-contact__entry" id="tour-entry">
            <Link href={german ? "/?view=human&lang=de" : "/?view=human"}>
              <span><small>{german ? "TOUR BETRETEN" : "ENTER THE TOUR"}</small><strong>{german ? "Ändere die Ansicht. Bewahre den Unterschied." : "Change the view. Keep the difference."}</strong></span>
              <b aria-hidden="true">→</b>
            </Link>
          </footer>

          <nav className="nexahedron-public-channels" aria-label={german ? "Öffentliche NEXAH-Kanäle" : "NEXAH public channels"}>
            <small>{german ? "WEITER" : "CONTINUE"}</small>
            <div>
              {publicChannels.map((channel) => (
                <a href={channel.href} key={channel.href} target="_blank" rel="noopener noreferrer" aria-label={`Open ${channel.label} in a new window`} title={channel.label}>
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
