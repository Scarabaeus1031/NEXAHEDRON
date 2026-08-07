"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Field } from "@/components/ui/Field";
import { PageIntro } from "@/components/ui/PageIntro";
import { MaterialFolio } from "@/features/orientation/components/MaterialFolio";
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

      <div className="object-layout">
        <form className="object-form" onSubmit={submitObject} noValidate>
          <MaterialFolio>
            {state.wonder ? (
              <blockquote className="material-folio__origin">
                <span>Your Wonder</span>
                “{state.wonder}”
              </blockquote>
            ) : null}

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
                <p className="eyebrow">Reference · Optional</p>
                <h2 id="source-fields-title">Bring a reference.</h2>
                <p>The reference remains with this local folio. Its contents are not opened.</p>
              </header>
              <Field id="object-url" label="URL" optional hint="The address is held as a reference only.">
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

              <Field id="object-file" label="Local file reference" optional hint="Only the filename is held locally. The file is not read or uploaded.">
                <input id="object-file" name="objectFile" type="file" onChange={chooseFile} aria-describedby="object-file-hint" />
              </Field>
            </section>
          </MaterialFolio>

          <button className="action action--primary" type="submit">
            Continue <span aria-hidden="true">→</span>
          </button>
        </form>

      </div>
    </section>
  );
}
