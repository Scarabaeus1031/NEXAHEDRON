import Link from "next/link";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore" },
  { href: "/cases", label: "Cases" },
  { href: "/library", label: "Library" },
  { href: "/about", label: "About" },
] as const;

export function PublicHeader({ pathname }: { readonly pathname: string }) {
  return (
    <header className="public-header">
      <Link className="public-brand" href="/" aria-label="NEXAHEDRON, home">
        <span className="public-brand__mark" aria-hidden="true">✦</span>
        <span className="public-brand__copy">
          <span className="public-brand__name">NEXAHEDRON</span>
          <span className="public-brand__descriptor">The Orientation Laboratory</span>
        </span>
      </Link>
      <nav className="public-navigation" aria-label="Primary navigation">
        {navigation.map((item) => {
          const isCurrent =
            item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

          return (
            <Link
              href={item.href}
              key={item.href}
              aria-current={isCurrent ? "page" : undefined}
            >
              {item.label}
            </Link>
          );
        })}
        <a
          href="https://github.com/Scarabaeus1031/nexah"
          rel="noreferrer"
          target="_blank"
        >
          GitHub<span className="sr-only"> (opens in a new tab)</span>
        </a>
      </nav>
    </header>
  );
}
