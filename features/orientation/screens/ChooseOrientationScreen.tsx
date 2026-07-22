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

  return (
    <section className="page page--choose" aria-labelledby="choose-title">
      <PageIntro index="02" eyebrow="Choose Orientation" title="Choose how you would like to begin." titleId="choose-title">
        <p>Begin with curiosity, or enter the available Understand journey directly.</p>
      </PageIntro>

      <div className="wonder-entrance">
        <div>
          <p className="eyebrow">Alpha beginning</p>
          <h2>Wonder</h2>
          <p>Start with something that caught your attention—even if you cannot yet name why.</p>
        </div>
        <button className="text-action" type="button" onClick={beginWonder}>
          Begin with Wonder <span aria-hidden="true">→</span>
        </button>
      </div>

      <div className="mode-grid" aria-label="Orientation modes">
        {orientationModes.map((mode) => {
          const isAvailable = mode.availability === "available";
          return (
            <article className={`mode-card${isAvailable ? " is-available" : ""}`} key={mode.id}>
              <div className="mode-card__heading">
                <h2>{mode.name}</h2>
                <span className="status">{isAvailable ? "Available" : "Later"}</span>
              </div>
              <p>{mode.description}</p>
              {isAvailable ? (
                <button className="card-action" type="button" onClick={beginUnderstand}>
                  Choose Understand <span aria-hidden="true">→</span>
                </button>
              ) : (
                <span className="card-action card-action--disabled" aria-label={`${mode.name} will be available later`}>
                  Not yet available
                </span>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
