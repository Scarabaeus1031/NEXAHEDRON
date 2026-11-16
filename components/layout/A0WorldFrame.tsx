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

const messageGallerySlides = [
  {
    id: "relation",
    image: "/media/nexah-entry-life-is-relation.jpg",
    width: 886,
    height: 886,
    altDe: "Ein Kind und ein kleiner Roboter blicken bei Sonnenaufgang gemeinsam über eine Stadt.",
    altEn: "A child and a small robot look across a city together at sunrise.",
    label: "RELATION",
    copyDe: "Leben ist Beziehung in Bewegung.",
    copyEn: "Life is relation in motion.",
  },
  {
    id: "memory",
    image: "/media/nexah-humanity-remembers.jpg",
    width: 1254,
    height: 627,
    altDe: "Zehn Erinnerungsbilder zwischen Blue Marble, Voyager, Spiel, Aufnahme und Bibliothek.",
    altEn: "Ten remembered images from Blue Marble and Voyager to play, recording and the library.",
    label: "MEMORY",
    copyDe: "Technologie verändert sich. Staunen verbindet.",
    copyEn: "Technology changes. Wonder connects.",
  },
  {
    id: "possibility",
    image: "/media/nexah-entry-ready-light-path.jpg",
    width: 886,
    height: 886,
    altDe: "Ein Kind, ein kleiner Roboter und ein alter Computer blicken auf eine Regenbogensäule über einer Stadt.",
    altEn: "A child, a small robot and a vintage computer face a rainbow column above a city.",
    label: "POSSIBILITY",
    copyDe: "Die Zukunft fühlte sich endlos an. Sie kann es noch immer.",
    copyEn: "The future felt endless. It still can.",
  },
  {
    id: "connection",
    image: "/media/nexah-connection-needs-no-signal.jpg",
    width: 886,
    height: 886,
    altDe: "Zwei Menschen mit Robothelmen sitzen bei Sonnenuntergang auf einer Bank.",
    altEn: "Two people in robot helmets sit on a bench at sunset.",
    label: "CONNECTION",
    copyDe: "Verbindung braucht kein Signal.",
    copyEn: "Connection needs no signal.",
  },
  {
    id: "presence",
    image: "/media/nexah-some-things-cant-be-downloaded.jpg",
    width: 886,
    height: 886,
    altDe: "Menschen fotografieren einen schwarzen Monolithen unter einem Sternenhimmel.",
    altEn: "People photograph a black monolith beneath a starry sky.",
    label: "PRESENCE",
    copyDe: "Manche Dinge kann man nicht herunterladen.",
    copyEn: "Some things cannot be downloaded.",
  },
] as const;

function NexahedronMessageGallery({ language = "en" }: { readonly language?: PublicLanguage }) {
  const galleryRef = useRef<HTMLElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [hasFocusWithin, setHasFocusWithin] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const german = language === "de";
  const lastSlide = messageGallerySlides.length - 1;
  const slide = messageGallerySlides[activeSlide];

  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { threshold: 0.35 });
    observer.observe(gallery);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const applyMotionPreference = () => {
      if (reducedMotion.matches) setIsPaused(true);
    };
    applyMotionPreference();
    reducedMotion.addEventListener("change", applyMotionPreference);
    return () => reducedMotion.removeEventListener("change", applyMotionPreference);
  }, []);

  useEffect(() => {
    if (isPaused || isHovering || hasFocusWithin || !isVisible) return;
    const timeout = window.setTimeout(() => {
      if (activeSlide >= lastSlide) {
        setIsPaused(true);
        return;
      }
      setActiveSlide((current) => current + 1);
    }, 7000);
    return () => window.clearTimeout(timeout);
  }, [activeSlide, hasFocusWithin, isHovering, isPaused, isVisible, lastSlide]);

  function selectSlide(index: number) {
    setIsPaused(true);
    setActiveSlide(index);
  }

  function togglePlayback() {
    if (isPaused && activeSlide === lastSlide) setActiveSlide(0);
    setIsPaused((paused) => !paused);
  }

  return (
    <section
      className="nexahedron-message-gallery"
      aria-labelledby="nexahedron-entry-visuals-title"
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setHasFocusWithin(false);
      }}
      onFocusCapture={() => setHasFocusWithin(true)}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      ref={galleryRef}
    >
      <header>
        <div className="nexahedron-message-gallery__copy">
          <p>HUMANITY REMEMBERS</p>
          <h2 id="nexahedron-entry-visuals-title">{german ? "Momente, die uns staunen ließen." : "The moments that made us wonder."}</h2>
          <span>{german ? "Technologie verändert sich. Neugier bleibt." : "Technology changes. Curiosity remains."}</span>
        </div>
        <div className="nexahedron-message-gallery__controls" aria-label={german ? "Bildfolge steuern" : "Control image sequence"}>
          <output aria-live="polite">{String(activeSlide + 1).padStart(2, "0")} / {String(messageGallerySlides.length).padStart(2, "0")}</output>
          <button disabled={activeSlide === 0} onClick={() => selectSlide(activeSlide - 1)} type="button" aria-label={german ? "Vorheriges Bild" : "Previous image"}>←</button>
          <button aria-pressed={isPaused} onClick={togglePlayback} type="button">{isPaused ? (german ? "Abspielen" : "Play") : (german ? "Pause" : "Pause")}</button>
          <button disabled={activeSlide === lastSlide} onClick={() => selectSlide(activeSlide + 1)} type="button" aria-label={german ? "Nächstes Bild" : "Next image"}>→</button>
        </div>
      </header>
      <div className="nexahedron-message-gallery__stage" aria-label={german ? "NEXAH-Bildfolge" : "NEXAH image sequence"}>
        <figure className={slide.id === "memory" ? "is-wide" : activeSlide % 2 === 0 ? "is-image-left" : "is-image-right"} key={slide.id}>
          <img alt={german ? slide.altDe : slide.altEn} height={slide.height} src={slide.image} width={slide.width} />
          <figcaption>
            <small>{String(activeSlide + 1).padStart(2, "0")} · {slide.label}</small>
            <strong>{german ? slide.copyDe : slide.copyEn}</strong>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

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
    viewer.setAttribute("camera-orbit", "-12deg 72deg 58%");
    viewer.setAttribute("field-of-view", "32deg");
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
    document.documentElement.lang = language;

    if (isFoyer) {
      const template = document.querySelector<HTMLTemplateElement>("#a0-built-world-concept");
      const main = document.querySelector<HTMLElement>("main#top");
      if (!document.querySelector("#built-world") && template && main) {
        main.prepend(template.content.cloneNode(true));
      }
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
      if (trailer && trailer.dataset.nexahedronPauseBound !== "true") {
        trailer.dataset.nexahedronPauseBound = "true";
        const toggle = trailer.querySelector<HTMLButtonElement>(".world-trailer-toggle");
        const signal = trailer.querySelector<HTMLElement>(".world-trailer-live");
        toggle?.addEventListener("click", () => {
          const paused = trailer.dataset.paused !== "true";
          trailer.dataset.paused = String(paused);
          toggle.textContent = paused ? "Play" : "Pause";
          toggle.setAttribute("aria-pressed", String(paused));
          if (signal) signal.textContent = paused ? "World signal · paused" : "World signal · running";
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

      html[data-nexahedron-projection="experience"] .mc-status,
      html[data-nexahedron-projection="experience"] .a0-human-overview,
      html[data-nexahedron-projection="experience"] body > footer {
        display: none !important;
      }

      html {
        scroll-padding-top: 0 !important;
      }

      html[data-nexahedron-projection="foyer"] #top > :not(#built-world) {
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
      {isFoyerSource ? (
        <div className="nexahedron-first-contact nexahedron-first-contact--prelude">
          <section className="nexahedron-welcome" aria-labelledby="nexahedron-welcome-title">
            <p>{german ? "WILLKOMMEN · EIN PFAD ODER EIN FENSTER" : "WELCOME · ONE PATH OR ONE WINDOW"}</p>
            <h2 id="nexahedron-welcome-title">{german ? "Du bist im NEXAHEDRON." : "You are in NEXAHEDRON."}</h2>
            <div>
              <p>{german ? "Du musst nicht zuerst das Ganze verstehen. Folge einem Pfad — oder öffne ein Fenster. Du kannst jederzeit zurückkehren." : "You do not need to understand the whole before you begin. Follow one path — or open one window. You can always return."}</p>
              <nav aria-label={german ? "Einstieg wählen" : "Choose an entrance"}>
                <a href="#nexahedron-reading-path">{german ? "Dem Pfad folgen ↓" : "Follow the path ↓"}</a>
                <a href="#nexahedron-showcase-selectors">{german ? "Ein Fenster öffnen ↓" : "Open a window ↓"}</a>
              </nav>
            </div>
            <small>ONE SOURCE · MANY VIEWS · EXPLICIT RETURN</small>
          </section>
        </div>
      ) : null}
      <div className={`a0-source-module${isFoyerSource ? " a0-source-module--foyer" : ""}`}>
        {!isFoyerSource ? (
          <p className="a0-source-language-note" role="note">
            <span aria-hidden="true">{german ? "DE" : "EN"}</span>
            <strong>{german ? "Deutsche Fassung" : "English edition"}</strong>
            <small>{german ? "Dieselbe A0-Identität · derselbe Return" : "Same A0 identity · same return"}</small>
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
        <section className="nexahedron-first-contact" data-a0-source={source} aria-label={german ? "NEXAHEDRON-Einstieg" : "NEXAHEDRON entrance"}>
          <section className="nexahedron-showcase" aria-labelledby="nexahedron-showcase-title">
            <h2 className="sr-only" id="nexahedron-showcase-title">{german ? "Sechs Fenster in NEXAHEDRON" : "Six windows into NEXAHEDRON"}</h2>
            <section className="nexahedron-reading-path" id="nexahedron-reading-path" aria-labelledby="nexahedron-reading-path-title">
              <header>
                <p>{german ? "EIN EINGANG · FÜNF STATIONEN · IMMER EIN RETURN" : "ONE ENTRANCE · FIVE STATIONS · ALWAYS RETURN"}</p>
                <h2 id="nexahedron-reading-path-title">{german ? "Die Fenster bleiben offen. Die Tour hält den Faden." : "The windows stay open. The tour holds the thread."}</h2>
                <span>{german ? "Wenn du zum ersten Mal hier bist, folge dieser Spur. Danach kannst du jedes Fenster frei öffnen." : "If this is your first visit, follow this thread. Afterwards, every window remains yours to open."}</span>
              </header>
              <ol aria-label={german ? "Geführter NEXAHEDRON-Lesepfad" : "Guided NEXAHEDRON reading path"}>
                <li><b>H</b><small>{german ? "HUMAN VIEW" : "HUMAN VIEW"}</small><strong>{german ? "Beginne innen." : "Begin inside."}</strong></li>
                <li><b>I</b><small>{german ? "BEOBACHTUNG" : "OBSERVATION"}</small><strong>{german ? "Sieh die Ansicht." : "See the view."}</strong></li>
                <li><b>II</b><small>{german ? "DIFFERENZ" : "DIFFERENCE"}</small><strong>{german ? "Ändere eine Bedingung." : "Change one condition."}</strong></li>
                <li><b>III</b><small>TIME AFTER TIME</small><strong>{german ? "Folge Spur und Return." : "Follow trace and return."}</strong></li>
                <li><b>+1</b><small>LIVING BLUEPRINT</small><strong>{german ? "Wähle den nächsten Weg." : "Choose the next way."}</strong></li>
              </ol>
              <Link href={german ? "/?view=human&lang=de" : "/?view=human"}>
                <span><small>{german ? "GEFÜHRT BEGINNEN" : "START THE GUIDED PATH"}</small><strong>H → I → II → III → +1</strong></span>
                <b aria-hidden="true">→</b>
              </Link>
            </section>
          </section>

          <section className="nexahedron-record-feature" id="record-player" aria-labelledby="record-player-title">
            <header>
              <p className="nexahedron-first-contact__eyebrow">{german ? "00 · EIN MOMENT, EIN RECORD, EIN RETURN" : "00 · ONE MOMENT, ONE RECORD, ONE RETURN"}</p>
              <h2 id="record-player-title">{german ? "Eine Stimme wird zum Record." : "A voice becomes a record."}</h2>
              <p>{german ? "Jemand singt. Ein Instrument wählt eine Spur aus und speichert sie; später wird daraus wieder Klang. Die Aufnahme bewahrt etwas vom Moment — sie ist nicht der Moment selbst." : "Someone sings. An instrument selects and stores a trace; later it becomes sound again. The recording preserves something of the moment — it is not the moment itself."}</p>
            </header>
            <NexahedronRecordPlayer language={language} />
          </section>

          <section className="nexahedron-free-windows" aria-labelledby="nexahedron-free-windows-title">
            <header>
              <p>{german ? "T − V + I · ZUSÄTZLICHE FENSTER · UNGEFÜHRT" : "T − V + I · ADDITIONAL WINDOWS · UNGUIDED"}</p>
              <h2 id="nexahedron-free-windows-title">{german ? "Hier darfst du den Faden loslassen." : "Here, you may let go of the thread."}</h2>
              <span>{german ? "Diese sechs Fenster gehören nicht zur Reihenfolge. Öffne eines aus Neugier, verändere die Ansicht und kehre zurück, wenn du möchtest." : "These six windows are not a sequence. Open one out of curiosity, change the view and return whenever you wish."}</span>
            </header>
            <div className="nexahedron-showcase-selectors" id="nexahedron-showcase-selectors" role="toolbar" aria-label={german ? "Eines von sechs Fenstern öffnen" : "Open one of six windows"}>
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
                  <small>W{item.number} · {item.label}</small>
                  <strong>{item.title}</strong>
                  <span>{item.note}</span>
                </button>
              ))}
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

          <NexahedronMessageGallery language={language} />

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
