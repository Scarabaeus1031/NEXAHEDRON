"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { PageIntro } from "@/components/ui/PageIntro";
import { ReflectionMargin } from "@/features/orientation/components/ReflectionMargin";
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

      <div className="reflection-workspace reflection-workspace--wonder">
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

        <ReflectionMargin
          title={value.trim() ? "A starting point is taking shape." : "Begin before you know the answer."}
          introduction={value.trim()
            ? "The Laboratory is holding your note as the beginning of the orientation."
            : "A complete question is not required. One noticed fragment is enough."}
          notes={[
            { label: "Starting point", value: value.trim() ? "A Human note is present" : "Still open" },
            { label: "Meaning", value: "Not inferred" },
            { label: "Next", value: "Name the material or subject" },
          ]}
          question={value.trim()
            ? "What about this matters enough to continue?"
            : "What do you want to stay with for a moment?"}
        />
      </div>
    </section>
  );
}
