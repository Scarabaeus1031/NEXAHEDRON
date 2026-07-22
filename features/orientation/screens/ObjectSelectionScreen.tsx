"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Field } from "@/components/ui/Field";
import { PageIntro } from "@/components/ui/PageIntro";
import { orientationObjectTypes } from "@/features/orientation/constants";
import { useAlphaJourney } from "@/hooks/use-alpha-journey";
import { alphaRoutes } from "@/lib/routes";
import type { OrientationObjectType } from "@/types/alpha";

export function ObjectSelectionScreen() {
  const router = useRouter();
  const { state, dispatch } = useAlphaJourney();
  const [showIssues, setShowIssues] = useState(false);

  function update(value: { title?: string; type?: OrientationObjectType; url?: string; fileName?: string }) {
    dispatch({ type: "UPDATE_OBJECT", value });
  }

  function chooseFile(event: ChangeEvent<HTMLInputElement>) {
    update({ fileName: event.target.files?.[0]?.name ?? "" });
  }

  function submitObject(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!state.object.title.trim() || !state.object.type) {
      setShowIssues(true);
      return;
    }
    dispatch({ type: "COMPLETE_OBJECT" });
    router.push(alphaRoutes.request);
  }

  return (
    <section className="page" aria-labelledby="object-title">
      <PageIntro index="04" eyebrow="Object Selection" title="What would you like to orient?" titleId="object-title">
        <p>Give the material a clear identity. You can bring the material itself later.</p>
      </PageIntro>

      {state.wonder ? (
        <blockquote className="wonder-reference">
          <span>Your Wonder</span>
          “{state.wonder}”
        </blockquote>
      ) : null}

      <div className="object-layout">
        <form className="object-form" onSubmit={submitObject} noValidate>
          <Field id="object-title-input" label="Object title">
            <input
              id="object-title-input"
              name="objectTitle"
              value={state.object.title}
              onChange={(event) => update({ title: event.target.value })}
              aria-invalid={showIssues && !state.object.title.trim()}
              aria-describedby="object-title-issue"
              autoComplete="off"
              required
            />
            <span className="field-issue" id="object-title-issue" role="alert">
              {showIssues && !state.object.title.trim() ? "Add a title." : ""}
            </span>
          </Field>

          <Field id="object-type" label="Object type">
            <select
              id="object-type"
              name="objectType"
              value={state.object.type}
              onChange={(event) => update({ type: event.target.value as OrientationObjectType })}
              aria-invalid={showIssues && !state.object.type}
              aria-describedby="object-type-issue"
              required
            >
              <option value="">Choose a type</option>
              {orientationObjectTypes.map((type) => <option key={type}>{type}</option>)}
            </select>
            <span className="field-issue" id="object-type-issue" role="alert">
              {showIssues && !state.object.type ? "Choose an object type." : ""}
            </span>
          </Field>

          <Field id="object-url" label="URL" optional hint="A reference only; the page is not retrieved in this sprint.">
            <input
              id="object-url"
              name="objectUrl"
              type="url"
              inputMode="url"
              placeholder="https://"
              value={state.object.url}
              onChange={(event) => update({ url: event.target.value })}
              aria-describedby="object-url-hint"
            />
          </Field>

          <Field id="object-file" label="Uploaded file" optional hint="File selection is represented locally. No upload occurs.">
            <input id="object-file" name="objectFile" type="file" onChange={chooseFile} aria-describedby="object-file-hint" />
          </Field>

          <button className="action action--primary" type="submit">
            Continue <span aria-hidden="true">→</span>
          </button>
        </form>

        <ObjectPreview />
      </div>
    </section>
  );
}

function ObjectPreview() {
  const { state } = useAlphaJourney();
  const { object } = state;
  return (
    <aside className="object-preview" aria-labelledby="preview-title" aria-live="polite">
      <p className="eyebrow">Preview</p>
      <h2 id="preview-title">{object.title || "Untitled orientation object"}</h2>
      <dl>
        <div><dt>Type</dt><dd>{object.type || "Not selected"}</dd></div>
        <div><dt>URL</dt><dd>{object.url || "None"}</dd></div>
        <div><dt>File</dt><dd>{object.fileName || "None selected"}</dd></div>
        <div><dt>Mode</dt><dd>Understand</dd></div>
      </dl>
    </aside>
  );
}
