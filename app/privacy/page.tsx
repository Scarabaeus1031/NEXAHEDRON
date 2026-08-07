import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How the NEXAHEDRON Workspace handles local session material and explicit ORION confirmation.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <article className="public-page legal-public-page">
      <header><p className="public-kicker">Public information</p><h1>Privacy</h1><p>The NEXAHEDRON Phase II Workspace stores its working state in the current browser session. It has no user accounts, advertising or marketing analytics.</p></header>
      <section><h2>Controller and contact</h2><p>Haptikdesign GmbH, Fuchstanzstraße 33–35, 60489 Frankfurt am Main, Germany. Contact: <a href="mailto:contact@nexah.de">contact@nexah.de</a>.</p><p>The canonical provider details are maintained in the <a href="https://nexah.de/imprint/">NEXAH imprint</a>.</p></section>
      <section><h2>Workspace data</h2><p>Questions, notes, selected fragments, relationships and reflections remain in local browser state unless the Human explicitly crosses the ORION confirmation boundary. Closing or resetting the session removes this transient Workspace state.</p></section>
      <section><h2>Hosting and technical logs</h2><p>The hosting service may process technically necessary connection data, including IP address, request time, requested resource, HTTP status and browser information, to deliver and secure the site. Final hosting provider, processing location and retention details must be recorded before the public custom domain is released.</p></section>
      <section><h2>External links and services</h2><p>External links create a connection only after they are opened. The Workspace does not call an LLM, search provider or analytics service. An ORION request is made only after explicit Human confirmation and only when an external ORION endpoint has been configured.</p></section>
      <section><h2>Your rights</h2><p>Requests concerning access, correction, deletion, restriction, portability or objection may be sent to <a href="mailto:contact@nexah.de">contact@nexah.de</a>. The full rights and complaint information is maintained in the <a href="https://nexah.de/privacy/">canonical NEXAH privacy notice</a>.</p></section>
      <section><h2>Status</h2><p>Last reviewed: 7 August 2026. Final hosting details remain a release blocker.</p></section>
    </article>
  );
}
