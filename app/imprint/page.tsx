import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Imprint",
  description: "Canonical provider information for NEXAHEDRON.",
  alternates: { canonical: "/imprint" },
};

export default function ImprintPage() {
  return (
    <article className="public-page legal-public-page">
      <header><p className="public-kicker">Public information</p><h1>Imprint</h1><p>NEXAH maintains one canonical provider notice for its public websites.</p></header>
      <section><h2>Canonical provider information</h2><p>The legally maintained provider identity, address, representative, register and editorial responsibility are published at <a href="https://nexah.de/imprint/">nexah.de/imprint/</a>.</p><p>This page intentionally references that canonical notice instead of duplicating legal facts that could drift.</p></section>
      <section><h2>Contact</h2><p><a href="mailto:contact@nexah.de">contact@nexah.de</a></p></section>
    </article>
  );
}
