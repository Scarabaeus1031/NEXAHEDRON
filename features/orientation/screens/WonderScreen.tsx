"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { PageIntro } from "@/components/ui/PageIntro";
import { wonderExamples } from "@/features/orientation/constants";
import { useAlphaJourney } from "@/hooks/use-alpha-journey";
import { alphaRoutes } from "@/lib/routes";

export function WonderScreen() {
  const router = useRouter();
  const { state, dispatch } = useAlphaJourney();
  const [value, setValue] = useState(state.wonder);
  const [showIssue, setShowIssue] = useState(false);

  function submitWonder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!value.trim()) {
      setShowIssue(true);
      return;
    }
    dispatch({ type: "SAVE_WONDER", value });
    router.push(alphaRoutes.object);
  }

  return (
    <section className="page page--focused" aria-labelledby="wonder-title">
      <PageIntro index="03" eyebrow="Wonder" title="What caught your attention?" titleId="wonder-title">
        <p>You do not need a complete question. Begin with the thing you noticed.</p>
      </PageIntro>

      <form className="wonder-form" onSubmit={submitWonder} noValidate>
        <label className="sr-only" htmlFor="wonder-text">
          What caught your attention?
        </label>
        <textarea
          id="wonder-text"
          name="wonder"
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
            if (event.target.value.trim()) setShowIssue(false);
          }}
          placeholder="Describe the thought, observation or fragment you want to stay with…"
          aria-describedby="wonder-guidance wonder-issue"
          aria-invalid={showIssue}
          rows={8}
          autoFocus
        />
        <p className="form-guidance" id="wonder-guidance">
          This remains in your browser as local application state. Nothing is sent to ORION.
        </p>
        <p className="field-issue" id="wonder-issue" role="alert">
          {showIssue ? "Add a thought or observation before continuing." : ""}
        </p>

        <div className="example-list" aria-label="Optional examples">
          <span>Examples</span>
          {wonderExamples.map((example) => (
            <button key={example} type="button" onClick={() => setValue(example)}>
              {example}
            </button>
          ))}
        </div>

        <button className="action action--primary" type="submit">
          Understand this <span aria-hidden="true">→</span>
        </button>
      </form>
    </section>
  );
}
