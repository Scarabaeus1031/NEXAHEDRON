"use client";

import { useEffect, useRef } from "react";

export function A0WorldFrame({ source, title = "NEXAHEDRON · Foyer" }: { readonly source: string; readonly title?: string }) {
  const frameRef = useRef<HTMLIFrameElement>(null);

  function applyNexahedronProjection(frame: HTMLIFrameElement) {
    const document = frame.contentDocument;
    if (!document) return;

    const isFoyer = frame.contentWindow?.location.pathname.endsWith("/index.html") ?? false;
    document.documentElement.dataset.nexahedronProjection = isFoyer ? "foyer" : "experience";

    if (isFoyer) {
      const intro = document.querySelector<HTMLElement>(".world-plate-intro");
      const humanDoor = document.querySelector<HTMLElement>(".world-room--human");
      if (intro) {
        intro.innerHTML = "<strong>NEXAHEDRON ist die öffentliche A0 Human View innerhalb von NEXAH.</strong> Hier wird Orientation zuerst als begrenzte Erfahrung begehbar: sehen, spielen, unterscheiden und zurückkehren. NEXAH hält dahinter Methode, Quellen, Science und Library.";
      }
      const doorCopy = humanDoor?.querySelector<HTMLElement>("p");
      const doorAction = humanDoor?.querySelector<HTMLElement>("b");
      if (doorCopy) doorCopy.textContent = "Ein geführter Weg durch Licht, Blick und Veränderung — mit einem sichtbaren Return.";
      if (doorAction) doorAction.textContent = "Human View starten →";
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

      html[data-nexahedron-projection="foyer"] .world-map {
        display: block !important;
        max-width: 46rem;
        margin-inline: auto;
        padding: 0 !important;
        border: 0 !important;
        background: transparent !important;
        box-shadow: none !important;
      }

      html[data-nexahedron-projection="foyer"] .world-room:not(.world-room--human),
      html[data-nexahedron-projection="foyer"] .world-plate-return {
        display: none !important;
      }

      html[data-nexahedron-projection="foyer"] .world-room--human {
        min-height: 0 !important;
        padding: 1.35rem 1.5rem !important;
        border: 1px solid #5c7180 !important;
        border-top: 3px solid var(--gold) !important;
        background: linear-gradient(115deg, rgba(10,29,42,.96), rgba(20,20,39,.94)) !important;
        box-shadow: 12px 12px 0 rgba(229,72,181,.08);
      }

      html[data-nexahedron-projection="foyer"] .world-room--human:hover,
      html[data-nexahedron-projection="foyer"] .world-room--human:focus-visible {
        border-color: var(--gold) !important;
      }

      html[data-nexahedron-projection="foyer"] .world-room--human h3 {
        font-size: clamp(1.55rem, 3vw, 2.35rem) !important;
      }

      html[data-nexahedron-projection="foyer"] .world-room--human p {
        max-width: 38rem;
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
    <iframe
      ref={frameRef}
      className="a0-source-home-frame"
      src={source}
      title={title}
      onLoad={(event) => applyNexahedronProjection(event.currentTarget)}
    />
  );
}
