"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
  const { state, dispatch } = useAlphaJourney();

  const isPublicExperience =
    pathname === "/" ||
    pathname.startsWith("/explore") ||
    pathname.startsWith("/cases") ||
    pathname.startsWith("/library") ||
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
                <span className="brand__descriptor">Human Orientation Workspace</span>
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
