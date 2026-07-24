import Link from "next/link";

export function PublicFooter() {
  return (
    <footer className="public-footer">
      <p>
        <span><i aria-hidden="true">✦</i> NEXAHEDRON</span>
        A place to find your bearings.
      </p>
      <nav aria-label="Footer navigation">
        <a href="https://nexah.de/visitor-guide/">Ecosystem map</a>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
        <Link href="/accessibility">Accessibility</Link>
        <Link href="/privacy">Privacy</Link>
        <Link href="/imprint">Imprint</Link>
        <a href="https://github.com/Scarabaeus1031/NEXAHEDRON/security/policy">Security</a>
        <a href="https://github.com/Scarabaeus1031/NEXAHEDRON">Open source</a>
      </nav>
      <small>© Haptikdesign GmbH · NEXAHEDRON Version 1 reference implementation</small>
    </footer>
  );
}
