"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { ReactNode } from "react";
import { JourneyProgress } from "@/components/layout/JourneyProgress";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { WorkspaceTrace } from "@/components/layout/WorkspaceTrace";
import { JourneyReflection } from "@/features/orientation/components/JourneyReflection";
import { WorkspaceDraftProvider } from "@/features/orientation/workspace-context";
import { useAlphaJourney } from "@/hooks/use-alpha-journey";
import { alphaRoutes } from "@/lib/routes";

export function AppShell({ children }: { readonly children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { state, dispatch } = useAlphaJourney();

  if (pathname === "/") {
    const activeView = searchParams.get("view") ?? "foyer";
    const activeDescriptor = {
      human: "A0 Human View",
      arcade: "Arcade",
      club: "O·PIUM Club",
      connect: "Human Connect",
    }[activeView];
    const connectPortal = (
      <Link
        className="a0-source-host-dot"
        href="/?view=connect&from=human"
        aria-current={activeView === "connect" ? "page" : undefined}
        aria-label="Human Connect · Frage stellen oder etwas teilen"
        title="Human Connect · Frage stellen oder etwas teilen"
      >
        <span aria-hidden="true" />
      </Link>
    );

    return (
      <div className="a0-source-home-shell" data-active-view={activeView}>
        <a className="skip-link" href="#main-content">Skip to A0 Human View</a>
        {activeView !== "foyer" ? (
          <nav className="ecosystem-rail" aria-label="NEXAH ecosystem">
            <span>NEXAH ECOSYSTEM</span>
            <a href="https://nexah.de">NEXAH</a>
            <a href="https://nexah.de/a0/">A0 SCIENCE</a>
            <Link href="/" aria-current="page">NEXAHEDRON</Link>
            <a href="https://www.scarabaeus1033.net">SCARABÆUS 1033</a>
          </nav>
        ) : null}
        <header className="a0-source-host-header" data-active-view={activeView}>
          <Link className="a0-source-host-brand" href="/" aria-label={activeDescriptor ? `NEXAHEDRON, ${activeDescriptor} home` : "NEXAHEDRON home"}>
            <span aria-hidden="true">✦</span>
            <strong>NEXAHEDRON</strong>
            {activeDescriptor ? <small>{activeDescriptor}</small> : null}
          </Link>
          {activeView !== "foyer" ? (
          <nav className="a0-source-host-nav" aria-label="NEXAHEDRON Flagships">
            <Link data-route="human" href="/?view=human" aria-current={activeView === "human" ? "page" : undefined}>Human View</Link>
            {activeView === "human" ? connectPortal : null}
            <Link href="/about">To NEXAH</Link>
            {activeView === "foyer" || activeView === "connect" ? connectPortal : null}
            <span className="a0-source-host-portals" aria-label="Connected NEXAH places">
              <a
                className="a0-source-host-scarab"
                href="https://www.scarabaeus1033.net/"
                aria-label="Scarabæus 1033 · Builder and workshop"
                title="Scarabæus 1033 · Builder and workshop"
              >
                <svg aria-hidden="true" viewBox="0 0 32 32">
                  <path d="M11 10.5c1.2-2.2 2.8-3.3 5-3.3s3.8 1.1 5 3.3M16 7.2V3.8M12.4 6.3 10 3.7M19.6 6.3 22 3.7M9.5 13.2 5 10.8M22.5 13.2l4.5-2.4M9 18.2H4.5M23 18.2h4.5M10.2 23.2 6.5 27M21.8 23.2l3.7 3.8" />
                  <path d="M9.2 15.4c0-4.1 3-6.7 6.8-6.7s6.8 2.6 6.8 6.7v4.8c0 4.6-3 7.8-6.8 7.8s-6.8-3.2-6.8-7.8Z" />
                  <path d="M16 9v18.5M9.5 17.5h13" />
                </svg>
              </a>
            </span>
          </nav>
          ) : (
            <nav className="a0-source-host-nav a0-source-host-nav--foyer" aria-label="Primary navigation">
              <Link href="/" aria-current="page">A0 World</Link>
              <Link href="/about">To NEXAH</Link>
              {connectPortal}
              <span className="a0-source-host-portals" aria-label="Connected NEXAH places">
                <a
                  className="a0-source-host-scarab"
                  href="https://www.scarabaeus1033.net/"
                  aria-label="Scarabæus 1033 · Builder and workshop"
                  title="Scarabæus 1033 · Builder and workshop"
                >
                  <svg aria-hidden="true" viewBox="0 0 32 32">
                    <path d="M11 10.5c1.2-2.2 2.8-3.3 5-3.3s3.8 1.1 5 3.3M16 7.2V3.8M12.4 6.3 10 3.7M19.6 6.3 22 3.7M9.5 13.2 5 10.8M22.5 13.2l4.5-2.4M9 18.2H4.5M23 18.2h4.5M10.2 23.2 6.5 27M21.8 23.2l3.7 3.8" />
                    <path d="M9.2 15.4c0-4.1 3-6.7 6.8-6.7s6.8 2.6 6.8 6.7v4.8c0 4.6-3 7.8-6.8 7.8s-6.8-3.2-6.8-7.8Z" />
                    <path d="M16 9v18.5M9.5 17.5h13" />
                  </svg>
                </a>
              </span>
            </nav>
          )}
        </header>
        <main className="a0-source-home-main" id="main-content">{children}</main>
      </div>
    );
  }

  const isPublicExperience =
    pathname.startsWith("/explore") ||
    pathname.startsWith("/cases") ||
    pathname.startsWith("/library") ||
    pathname.startsWith("/about-nexahedron") ||
    pathname.startsWith("/about") ||
    pathname.startsWith("/visitor-guide") ||
    pathname.startsWith("/contact") ||
    pathname.startsWith("/imprint") ||
    pathname.startsWith("/privacy") ||
    pathname.startsWith("/accessibility");
  const isWorkspace = [
    "/wonder",
    "/object",
    "/request",
    "/confirmation",
    "/orientation",
  ].includes(pathname);
  const isExperimentEntry = pathname === "/orient" || pathname === "/the-eye";
  const shellClassName = isPublicExperience
    ? `site-shell site-shell--public${pathname === "/about" || pathname === "/about-nexahedron" ? " site-shell--nexah-threshold" : ""}`
    : "site-shell";

  function returnToLanding() {
    dispatch({ type: "RESET" });
    router.push(alphaRoutes.landing);
  }

  return (
    <div className={shellClassName}>
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
                <span className="brand__descriptor">A0 Human View</span>
              </span>
            </button>
            <Link className="header-link" href={alphaRoutes.choose}>
              Orientation modes
            </Link>
            {pathname !== "/the-eye" ? (
              <Link className="header-link" href="/the-eye">THE EYE results</Link>
            ) : null}
          </header>
          {isWorkspace ? (
            <WorkspaceTrace pathname={pathname} />
          ) : isExperimentEntry ? null : (
            <JourneyProgress />
          )}
        </>
      )}
      <WorkspaceDraftProvider key={`${state.step}:${state.wonder}`} initialWonder={state.wonder}>
        <main
          className={isWorkspace ? "workspace-table" : undefined}
          id="main-content"
          tabIndex={-1}
        >
          <div className={isWorkspace ? "workspace-table__work" : undefined}>
            {children}
          </div>
          {isWorkspace ? <JourneyReflection pathname={pathname} /> : null}
        </main>
      </WorkspaceDraftProvider>
      {isPublicExperience ? (
        <PublicFooter />
      ) : (
        <footer className="site-footer">
          <span>NEXAHEDRON · Reference Workspace</span>
          <span><Link href="/privacy">Privacy</Link> · <Link href="/imprint">Imprint</Link></span>
        </footer>
      )}
    </div>
  );
}
