"use client";

import { useRouter } from "next/navigation";
import { PageIntro } from "@/components/ui/PageIntro";
import { MaterialFolio } from "@/features/orientation/components/MaterialFolio";
import { useAlphaJourney } from "@/hooks/use-alpha-journey";
import { alphaRoutes } from "@/lib/routes";

export function ConfirmationScreen() {
  const router = useRouter();
  const { dispatch } = useAlphaJourney();

  function editRequest() {
    dispatch({ type: "RESUME_SESSION", operation: "attend" });
    router.push(alphaRoutes.wonder);
  }

  return (
    <section className="page page--confirmation" aria-labelledby="confirmation-title">
      <PageIntro index="06" eyebrow="Confirmation" title="Confirm what you are preparing." titleId="confirmation-title">
        <p>Your Working Session Record remains intact in this open browser session. This review selects only the bounded fields that may cross the public Gateway.</p>
      </PageIntro>

      <MaterialFolio showOrientation />

      <div className="confirmation-boundary">
        <p className="eyebrow">Human decision</p>
        <p>Beginning Orientation submits only the confirmed fields above to the Gateway. A reachable Gateway may contact a compatible Runtime; neither reachability nor a contract-shaped response proves a successful certified Core result.</p>
        <span>Human confirmation · No external changes · Effects: none</span>
      </div>

      <div className="confirmation-actions">
        <button className="action action--quiet" type="button" onClick={editRequest}>Return to the table</button>
        <button className="action action--primary" type="button" onClick={() => {
          dispatch({ type: "BEGIN_ORIENTATION", requestId: `request-${crypto.randomUUID()}` });
          router.push(alphaRoutes.orientation);
        }}>
          Begin Orientation <span aria-hidden="true">→</span>
        </button>
      </div>
    </section>
  );
}
