"use client";

import { useRouter } from "next/navigation";
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
    router.push(alphaRoutes.object);
  }

  const understand = orientationModes.find((mode) => mode.id === "understand");
  const laterModes = orientationModes.filter((mode) => mode.availability === "later");

  return (
    <section className="page page--choose" aria-labelledby="choose-title">
      <PageIntro index="02" eyebrow="Choose Orientation" title="Choose how you would like to begin." titleId="choose-title">
        <p>Begin with curiosity, or enter the available Understand journey directly.</p>
      </PageIntro>

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

      <section className="later-modes" aria-labelledby="later-modes-title">
        <header>
          <div>
            <p className="eyebrow">Other ways of orienting</p>
            <h2 id="later-modes-title">Visible, but not yet open.</h2>
          </div>
          <p>The Laboratory is perfecting one path before opening the others.</p>
        </header>
        <div className="later-mode-list" aria-label="Orientation modes">
          {laterModes.map((mode) => (
            <article className="later-mode" key={mode.id}>
              <div className="mode-card__heading">
                <h3>{mode.name}</h3>
                <span className="status">Later</span>
              </div>
              <p>{mode.description}</p>
              <span className="sr-only" aria-label={`${mode.name} will be available later`}>Not yet available</span>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}
