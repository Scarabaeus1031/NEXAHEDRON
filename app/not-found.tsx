import Link from "next/link";

export default function NotFound() {
  return (
    <article className="public-page not-found-page">
      <p className="public-kicker">404 · Outside the current map</p>
      <h1>This place is not available.</h1>
      <p>The address may have changed, or this path may not belong to the current Version 1 Workspace.</p>
      <div><Link className="public-link public-link--primary" href="/">Return to NEXAHEDRON</Link><a className="public-link public-link--text" href="https://nexah.de/visitor-guide/">Open the ecosystem map</a></div>
    </article>
  );
}
