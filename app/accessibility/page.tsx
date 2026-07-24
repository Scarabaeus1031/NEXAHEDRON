import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accessibility",
  description: "Current accessibility support, known limits and the barrier-reporting route for NEXAHEDRON.",
  alternates: { canonical: "/accessibility" },
};

export default function AccessibilityPage() {
  return (
    <article className="public-page legal-public-page">
      <header><p className="public-kicker">Public information</p><h1>Accessibility</h1><p>NEXAHEDRON aims to make one complete Orientation Session usable with keyboard, screen magnification, reduced motion and assistive technology.</p></header>
      <section><h2>Current support</h2><p>The interface uses semantic headings, labelled fields, keyboard-operable controls, visible focus, text alternatives and responsive layouts. The Workspace preserves its reading and focus order as it unfolds.</p></section>
      <section><h2>Known limits</h2><p>Complex source surfaces, diagrams and historical source material may not yet have equivalent long-form alternatives. External sources retain their own accessibility responsibility.</p></section>
      <section><h2>Report a barrier</h2><p>Email <a href="mailto:contact@nexah.de">contact@nexah.de</a> with the page, the barrier and any relevant assistive technology. See the <a href="https://nexah.de/accessibility/">ecosystem accessibility statement</a>.</p></section>
      <section><h2>Status</h2><p>This statement provides a project commitment and contact route; it is not a declaration of formal statutory conformity. Last reviewed: 24 July 2026.</p></section>
    </article>
  );
}
