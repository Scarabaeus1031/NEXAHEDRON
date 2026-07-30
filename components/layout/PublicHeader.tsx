import Link from "next/link";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/library", label: "Reference Cases" },
  { href: "/about", label: "About" },
  { href: "/visitor-guide", label: "Visitor Guide" },
] as const;

export function PublicHeader({ pathname }: { readonly pathname: string }) {
  return (
    <header className="public-header">
      <Link className="public-brand" href="/" aria-label="NEXAHEDRON, home">
        <span className="public-brand__mark" aria-hidden="true">✦</span>
        <span className="public-brand__copy">
          <span className="public-brand__name">NEXAHEDRON</span>
          <span className="public-brand__descriptor">Research Demonstrator</span>
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
        <Link className="public-navigation__inquiry" href="/orient">
          Live Experiment <span aria-hidden="true">→</span>
        </Link>
        <a
          href="https://github.com/Scarabaeus1031/NEXAHEDRON"
          rel="noreferrer"
          target="_blank"
        >
          GitHub<span className="sr-only"> (opens in a new tab)</span>
        </a>
      </nav>
    </header>
  );
}
