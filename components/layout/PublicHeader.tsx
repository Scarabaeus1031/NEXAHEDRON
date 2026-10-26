import Link from "next/link";

export function PublicHeader({ pathname }: { readonly pathname: string }) {
  const isHome = pathname === "/";
  const isAbout = pathname === "/about";
  const isLibrary = pathname === "/library";

  return (
    <header className="public-header">
      <Link className="public-brand" href="/" aria-label="NEXAHEDRON, home">
        <span className="public-brand__mark" aria-hidden="true">✦</span>
        <span className="public-brand__copy">
          <span className="public-brand__name">NEXAHEDRON</span>
          <span className="public-brand__descriptor">A0 Human View</span>
        </span>
      </Link>
      <nav className="public-navigation" aria-label="Primary navigation">
        <Link href="/" aria-current={isHome ? "page" : undefined}>A0 World</Link>
        <Link href="/library" aria-current={isLibrary ? "page" : undefined}>Library</Link>
        <Link href="/about" aria-current={isAbout ? "page" : undefined}>To NEXAH</Link>
        <span className="public-navigation__portals" aria-label="Connected NEXAH places">
          <Link
            className="public-navigation__dot"
            href="/?view=connect&from=human"
            aria-label="Human Connect · Frage stellen oder etwas teilen"
            title="Human Connect · Frage stellen oder etwas teilen"
          ><span aria-hidden="true" /></Link>
          <a
            className="public-navigation__scarab"
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
    </header>
  );
}
