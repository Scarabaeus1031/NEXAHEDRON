import Link from "next/link";

export function PublicFooter() {
  return (
    <footer className="public-footer">
      <p>
        <span>NEXAHEDRON</span>
        A place to find your bearings.
      </p>
      <nav aria-label="Footer navigation">
        <Link href="/explore">Explore</Link>
        <Link href="/about">About</Link>
        <a href="https://github.com/Scarabaeus1031/nexah">GitHub</a>
      </nav>
    </footer>
  );
}
