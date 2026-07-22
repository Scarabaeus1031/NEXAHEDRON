"use client";

import { useState } from "react";
import { OrientationLaboratory } from "./OrientationLaboratory";

export function FoundationShell() {
  const [journeyKey, setJourneyKey] = useState(0);

  const returnToArrival = (anchor?: string) => {
    setJourneyKey((key) => key + 1);
    if (anchor) requestAnimationFrame(() => document.querySelector(anchor)?.scrollIntoView());
    else requestAnimationFrame(() => document.querySelector("#main-content")?.scrollIntoView());
  };

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to the Laboratory
      </a>

      <div className="site-shell">
        <header className="site-header">
          <button className="brand" onClick={() => returnToArrival()} type="button" aria-label="Return to the NEXAHEDRON Laboratory arrival">
            <span className="brand-mark" aria-hidden="true" />
            <span className="brand-copy">
              <span className="wordmark">NEXAHEDRON</span>
              <span className="descriptor">The NEXAH Laboratory</span>
            </span>
          </button>

          <nav className="site-nav" aria-label="Primary navigation">
            <button onClick={() => returnToArrival()} type="button" aria-current="page">
              Laboratory
            </button>
            <button onClick={() => returnToArrival("#authority")} type="button">Principles</button>
          </nav>
        </header>

        <main id="main-content">
          <OrientationLaboratory key={journeyKey} />
        </main>

        <footer className="site-footer">
          <span>NEXAHEDRON · The NEXAH Laboratory</span>
          <span>Orientation over information.</span>
        </footer>
      </div>
    </>
  );
}
