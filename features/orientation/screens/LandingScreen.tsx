import { ActionLink } from "@/components/ui/ActionLink";
import { alphaRoutes } from "@/lib/routes";

export function LandingScreen() {
  return (
    <section className="landing" aria-labelledby="landing-title">
      <div className="landing__statement">
        <p className="eyebrow">The Orientation Laboratory</p>
        <h1 id="landing-title">A place to find your bearings.</h1>
        <p className="landing__introduction">
          NEXAHEDRON helps people orient themselves across existing knowledge.
        </p>
        <ActionLink href={alphaRoutes.choose}>Open the Laboratory</ActionLink>
      </div>
      <aside className="landing__note" aria-label="About the Laboratory">
        <p>Bring a question, a document, an idea, or simply something that caught your attention.</p>
        <p>The knowledge remains where it is. Here, orientation begins.</p>
      </aside>
    </section>
  );
}
