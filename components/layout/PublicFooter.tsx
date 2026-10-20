import Link from "next/link";

export function PublicFooter() {
  return (
    <footer className="public-footer">
      <p>
        <span><i aria-hidden="true">✦</i> NEXAHEDRON</span>
        The A0 Human View by NEXAH.
      </p>
      <nav aria-label="Footer navigation">
        <a href="https://nexah.de/about/">NEXAH method &amp; science</a>
        <a href="https://scarabaeus1033.net/">Scarabæus workshop</a>
        <Link href="/contact">Contact</Link>
        <Link href="/accessibility">Accessibility</Link>
        <Link href="/privacy">Privacy</Link>
        <Link href="/imprint">Imprint</Link>
      </nav>
      <small>© Haptikdesign GmbH · source-bound instruments · Human judgment remains Human</small>
    </footer>
  );
}
