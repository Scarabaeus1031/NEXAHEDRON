"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { PageIntro } from "@/components/ui/PageIntro";
import { orientationModes } from "@/features/orientation/constants";
import { useAlphaJourney } from "@/hooks/use-alpha-journey";
import { alphaRoutes } from "@/lib/routes";

export function ChooseOrientationScreen() {
  const router = useRouter();
  const { dispatch } = useAlphaJourney();

  function beginWonder() {
    dispatch({ type: "BEGIN_WONDER" });
    router.push(alphaRoutes.wonder);
  }

  function beginUnderstand() {
    dispatch({ type: "BEGIN_UNDERSTAND" });
    router.push(alphaRoutes.wonder);
  }

  const understand = orientationModes.find((mode) => mode.id === "understand");
  return (
    <section className="page page--choose" aria-labelledby="choose-title">
      <PageIntro index="02" eyebrow="Phase II · Live Bounded Experiment" title="Choose how you would like to enter the Workspace." titleId="choose-title">
        <p>Begin with curiosity or material. Both entrances open the same Human-held Workspace—not a finished orientation service.</p>
      </PageIntro>

      <aside className="experiment-agreement" aria-labelledby="experiment-agreement-title">
        <div>
          <p className="eyebrow">Before you begin</p>
          <h2 id="experiment-agreement-title">What this experiment holds—and where it stops.</h2>
        </div>
        <dl>
          <div><dt>You provide</dt><dd>The question, material, relationships, boundaries, reflection and decision to Rest.</dd></div>
          <div><dt>The Workspace holds</dt><dd>Your current working state in browser memory only. Reloading or closing this page loses it.</dd></div>
          <div><dt>ORION may contribute</dt><dd>Only after confirmation, through the public Gateway and a compatible Runtime. Availability does not guarantee a result.</dd></div>
          <div><dt>A valid ending</dt><dd>You may Rest without invoking ORION. No interpretation or decision is made for you.</dd></div>
        </dl>
        <p className="experiment-agreement__path">
          Anchor → Place → Attend → Relate → Bound → Turn → Reflect → Rest
        </p>
      </aside>

      <aside className="experiment-agreement" aria-labelledby="guided-orientation-entry-title">
        <div>
          <p className="eyebrow">Local guided path · PATH A</p>
          <h2 id="guided-orientation-entry-title">Guide me with questions</h2>
        </div>
        <p>
          Bring one open question or a direction to test. A deterministic sequence
          arranges only what you confirm and returns a transient Terrain Map at Rest.
        </p>
        <p className="experiment-agreement__path">
          Not an answer · no AI · no external evidence · no ORION or Gateway call
        </p>
        <Link className="text-action" href="/guided">
          Open Guided Orientation <span aria-hidden="true">→</span>
        </Link>
      </aside>

      <div className="laboratory-entrances" aria-label="Available ways to begin">
        <article className="laboratory-entrance laboratory-entrance--wonder">
          <div className="laboratory-entrance__figure" aria-hidden="true">
            <span /><span /><span /><i>✦</i>
          </div>
          <div className="laboratory-entrance__copy">
            <p className="eyebrow">01 · Begin with curiosity</p>
            <h2>Wonder</h2>
            <p>Start with something that caught your attention—even if you cannot yet name why.</p>
          </div>
          <button className="text-action" type="button" onClick={beginWonder}>
            Begin with Wonder <span aria-hidden="true">→</span>
          </button>
        </article>

        {understand ? (
          <article className="laboratory-entrance laboratory-entrance--understand">
            <div className="laboratory-entrance__figure" aria-hidden="true">
              <span /><span /><span /><i>02</i>
            </div>
            <div className="laboratory-entrance__copy">
              <div className="laboratory-entrance__meta">
                <p className="eyebrow">02 · Begin with material</p>
                <span className="status">Available</span>
              </div>
              <h2>{understand.name}</h2>
              <p>{understand.description}</p>
            </div>
            <button className="text-action" type="button" onClick={beginUnderstand}>
              Choose Understand <span aria-hidden="true">→</span>
            </button>
          </article>
        ) : null}
      </div>

      <p className="later-modes__note">
        Additional orientation modes remain outside the bounded Phase II release. Unsure whether this Workspace fits your question? <Link href="/visitor-guide">Read the Visitor Guide <span aria-hidden="true">→</span></Link>
      </p>
    </section>
  );
}
