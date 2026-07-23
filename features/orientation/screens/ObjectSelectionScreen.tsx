"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Field } from "@/components/ui/Field";
import { PageIntro } from "@/components/ui/PageIntro";
import { ReflectionMargin } from "@/features/orientation/components/ReflectionMargin";
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
        <p>Name what you are bringing. A title and type are enough to continue.</p>
      </PageIntro>

      {state.wonder ? (
        <blockquote className="wonder-reference">
          <span>Your Wonder</span>
          “{state.wonder}”
        </blockquote>
      ) : null}

      <div className="object-layout">
        <form className="object-form" onSubmit={submitObject} noValidate>
          <div className="object-primary-fields">
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
          </div>

          <section className="source-fields" aria-labelledby="source-fields-title">
            <header>
              <p className="eyebrow">Source · Optional</p>
              <h2 id="source-fields-title">Bring a reference.</h2>
              <p>Add a link or identify a local file. The current Alpha preserves the reference only.</p>
            </header>
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

            <Field id="object-file" label="Local file" optional hint="Uploaded file content is not transferred. File selection is represented locally. No upload occurs.">
              <input id="object-file" name="objectFile" type="file" onChange={chooseFile} aria-describedby="object-file-hint" />
            </Field>
          </section>

          <button className="action action--primary" type="submit">
            Continue <span aria-hidden="true">→</span>
          </button>
        </form>

        <div className="object-rail">
          <ObjectPreview />
          <ObjectReflection />
        </div>
      </div>
    </section>
  );
}

function describeFile(fileName: string) {
  if (!fileName) return "No local file selected";
  const extension = fileName.split(".").pop()?.toUpperCase();
  return extension && extension !== fileName.toUpperCase()
    ? `${extension} file selected`
    : "Local file selected";
}

function ObjectReflection() {
  const { state } = useAlphaJourney();
  const { object } = state;
  const source = object.url.trim()
    ? "A URL reference is present"
    : describeFile(object.fileName);

  return (
    <ReflectionMargin
      title={object.title.trim() ? "The material has an identity." : "The material is still open."}
      introduction="The Laboratory reflects only the identity and source details you provide. It has not inspected the material."
      notes={[
        { label: "Named as", value: object.type || "Type still open" },
        { label: "Source", value: source },
        { label: "Wonder", value: state.wonder ? "Original note preserved" : "No Wonder note" },
      ]}
      question="What makes this the right object for the orientation?"
    />
  );
}

function ObjectPreview() {
  const { state } = useAlphaJourney();
  const { object } = state;
  return (
    <aside className="object-preview" aria-labelledby="preview-title" aria-live="polite">
      <p className="eyebrow">Preview · Your material</p>
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
