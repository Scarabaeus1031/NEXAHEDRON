import Link from "next/link";

export function PublicHeader({ pathname }: { readonly pathname: string }) {
  const isHome = pathname === "/";

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
        <Link href="/" aria-current={isHome ? "page" : undefined}>Human View</Link>
        <Link href="/#a0-instrument">Kapitel</Link>
        <Link href="/#a0-return">Return</Link>
        <a href="https://nexah.de/about/">NEXAH <span aria-hidden="true">↗</span></a>
        <a className="public-navigation__inquiry" href="https://scarabaeus1033.net/">
          Scarabæus <span aria-hidden="true">↗</span>
        </a>
      </nav>
    </header>
  );
}
