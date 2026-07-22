"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { JourneyProgress } from "@/components/layout/JourneyProgress";
import { useAlphaJourney } from "@/hooks/use-alpha-journey";
import { alphaRoutes } from "@/lib/routes";

export function AppShell({ children }: { readonly children: ReactNode }) {
  const router = useRouter();
  const { dispatch } = useAlphaJourney();

  function returnToLanding() {
    dispatch({ type: "RESET" });
    router.push(alphaRoutes.landing);
  }

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <header className="site-header">
        <button
          className="brand"
          type="button"
          onClick={returnToLanding}
          aria-label="NEXAHEDRON, return to landing"
        >
          <span className="brand__mark" aria-hidden="true">
            N
          </span>
          <span className="brand__copy">
            <span className="brand__name">NEXAHEDRON</span>
            <span className="brand__descriptor">The Orientation Laboratory</span>
          </span>
        </button>
        <Link className="header-link" href={alphaRoutes.choose}>
          Laboratory
        </Link>
      </header>
      <JourneyProgress />
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <footer className="site-footer">
        <span>NEXAHEDRON Alpha</span>
        <span>Orientation begins with what you already have.</span>
      </footer>
    </div>
  );
}
