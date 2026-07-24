import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact and responsible public routes for NEXAHEDRON.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <article className="public-page legal-public-page">
      <header><p className="public-kicker">Contact</p><h1>Reach the responsible place.</h1><p>Questions about the public Workspace, accessibility, privacy, security and participation use one maintained contact route.</p></header>
      <section><h2>General contact</h2><p><a href="mailto:contact@nexah.de">contact@nexah.de</a></p><p>Please do not send confidential source material, credentials or personal records.</p></section>
      <section><h2>Security</h2><p>Use the subject <code>[SECURITY] NEXAHEDRON</code> and follow the repository <a href="https://github.com/Scarabaeus1031/NEXAHEDRON/blob/main/SECURITY.md">Security Policy</a>. Do not disclose vulnerabilities publicly before review.</p></section>
      <section><h2>Other responsibilities</h2><p>Research and framework questions belong to <a href="https://github.com/Scarabaeus1031/NEXAH">NEXAH</a>. Certified Core questions belong to <a href="https://github.com/Scarabaeus1031/NEXAH-ORION">ORION</a>. The canonical provider identity remains in the <a href="/imprint">Imprint</a>.</p></section>
    </article>
  );
}
