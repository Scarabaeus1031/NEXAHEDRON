"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { JourneyProgress } from "@/components/layout/JourneyProgress";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { JourneyReflection } from "@/features/orientation/components/JourneyReflection";
import { useAlphaJourney } from "@/hooks/use-alpha-journey";
import { alphaRoutes } from "@/lib/routes";

export function AppShell({ children }: { readonly children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { dispatch } = useAlphaJourney();

  const isPublicExperience =
    pathname === "/" ||
    pathname.startsWith("/explore") ||
    pathname.startsWith("/cases") ||
    pathname.startsWith("/library") ||
    pathname.startsWith("/about");

  function returnToLanding() {
    dispatch({ type: "RESET" });
    router.push(alphaRoutes.landing);
  }

  return (
    <div className={isPublicExperience ? "site-shell site-shell--public" : "site-shell"}>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      {isPublicExperience ? (
        <PublicHeader pathname={pathname} />
      ) : (
        <>
          <header className="site-header">
            <button
              className="brand"
              type="button"
              onClick={returnToLanding}
              aria-label="NEXAHEDRON, return to landing"
            >
              <span className="brand__mark" aria-hidden="true">
                ✦
              </span>
              <span className="brand__copy">
                <span className="brand__name">NEXAHEDRON</span>
                <span className="brand__descriptor">The Orientation Laboratory</span>
              </span>
            </button>
            <Link className="header-link" href={alphaRoutes.choose}>
              Orientation modes
            </Link>
          </header>
          <JourneyProgress />
        </>
      )}
      <main
        className={pathname === "/confirmation" || pathname === "/orientation" ? "main--with-reflection" : undefined}
        id="main-content"
        tabIndex={-1}
      >
        {children}
        {!isPublicExperience ? <JourneyReflection pathname={pathname} /> : null}
      </main>
      {isPublicExperience ? (
        <PublicFooter />
      ) : (
        <footer className="site-footer">
          <span>NEXAHEDRON Alpha</span>
          <span>Orientation begins with what you already have.</span>
        </footer>
      )}
    </div>
  );
}
