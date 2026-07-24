"use client";

import { useRef, useState } from "react";
import {
  createEncounterFragment,
  plateTectonicsSource,
} from "@/features/encounter/plate-tectonics-source";
import { useAlphaJourney } from "@/hooks/use-alpha-journey";
import type { EncounterFragment } from "@/types/alpha";

interface PendingSelection {
  readonly fragment: EncounterFragment;
}

function sourceBlockFor(node: Node | null) {
  if (!node) return null;
  const element = node.nodeType === Node.ELEMENT_NODE
    ? node as Element
    : node.parentElement;
  return element?.closest<HTMLElement>("[data-encounter-block]") ?? null;
}

function characterOffset(block: HTMLElement, node: Node, offset: number) {
  const range = document.createRange();
  range.selectNodeContents(block);
  range.setEnd(node, offset);
  return range.toString().length;
}

export function PlateTectonicsEncounter() {
  const { state, dispatch } = useAlphaJourney();
  const articleRef = useRef<HTMLElement>(null);
  const [pending, setPending] = useState<PendingSelection | null>(null);
  const [selectionIssue, setSelectionIssue] = useState("");
  const [returnedFragmentId, setReturnedFragmentId] = useState<string | null>(null);
  const encounter = state.workspace.encounter;
  const isOpen = encounter.sourceId === plateTectonicsSource.sourceId;

  function openSource() {
    dispatch({
      type: "OPEN_ENCOUNTER_SOURCE",
      sourceId: plateTectonicsSource.sourceId,
      title: plateTectonicsSource.title,
      url: plateTectonicsSource.canonicalUrl,
    });
  }

  function readSelection() {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount !== 1 || selection.isCollapsed) {
      setPending(null);
      return;
    }
    const range = selection.getRangeAt(0);
    const startBlock = sourceBlockFor(range.startContainer);
    const endBlock = sourceBlockFor(range.endContainer);
    if (
      !startBlock
      || startBlock !== endBlock
      || !articleRef.current?.contains(startBlock)
    ) {
      setPending(null);
      setSelectionIssue("Keep one exact passage from a single source paragraph.");
      return;
    }

    const blockId = startBlock.dataset.encounterBlock;
    if (!blockId) return;
    const startOffset = characterOffset(startBlock, range.startContainer, range.startOffset);
    const endOffset = characterOffset(startBlock, range.endContainer, range.endOffset);
    const exactText = range.toString();

    try {
      const fragment = createEncounterFragment({
        blockId,
        startOffset,
        endOffset,
        exactText,
      });
      setPending({ fragment });
      setSelectionIssue("");
    } catch {
      setPending(null);
      setSelectionIssue("That selection could not be located exactly. Select one passage and try again.");
    }
  }

  function keepSelection() {
    if (!pending) return;
    dispatch({ type: "KEEP_ENCOUNTER_FRAGMENT", fragment: pending.fragment });
    window.getSelection()?.removeAllRanges();
    setPending(null);
  }

  function keepWholeBlock(blockId: string) {
    const block = plateTectonicsSource.blocks.find((candidate) => candidate.blockId === blockId);
    if (!block) return;
    const fragment = createEncounterFragment({
      blockId,
      startOffset: 0,
      endOffset: block.text.length,
      exactText: block.text,
    });
    dispatch({ type: "KEEP_ENCOUNTER_FRAGMENT", fragment });
  }

  function returnToSource(fragment: EncounterFragment) {
    const block = articleRef.current?.querySelector<HTMLElement>(
      `[data-encounter-block="${fragment.locator.blockId}"]`,
    );
    const textNode = block?.firstChild;
    if (!block || !textNode) return;

    block.scrollIntoView({ behavior: "smooth", block: "center" });
    block.focus({ preventScroll: true });
    const range = document.createRange();
    range.setStart(textNode, fragment.locator.startOffset);
    range.setEnd(textNode, fragment.locator.endOffset);
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
    setReturnedFragmentId(fragment.fragmentId);
  }

  if (!isOpen) {
    return (
      <section className="encounter-entry" aria-labelledby="encounter-entry-title">
        <div>
          <p className="eyebrow">One real Encounter · Plate Tectonics</p>
          <h3 id="encounter-entry-title">{plateTectonicsSource.title}</h3>
          <p>
            Open the source itself on this table. Read it, keep exact passages,
            and return to their original location at any time.
          </p>
        </div>
        <dl>
          <div><dt>Source authority</dt><dd>{plateTectonicsSource.sourceAuthority}</dd></div>
          <div><dt>Version</dt><dd>Publication record · 1996</dd></div>
          <div><dt>Representation</dt><dd>HTML text</dd></div>
        </dl>
        <button className="action action--primary" type="button" onClick={openSource}>
          Open source on this table <span aria-hidden="true">→</span>
        </button>
      </section>
    );
  }

  return (
    <section className="encounter-table" aria-labelledby="encounter-source-title">
      <header className="encounter-table__header">
        <div>
          <p className="eyebrow">Source Surface · read before orienting</p>
          <h3 id="encounter-source-title">{plateTectonicsSource.title}</h3>
          <p>{plateTectonicsSource.authors.join(" · ")}</p>
        </div>
        <dl>
          <div><dt>Source</dt><dd>{plateTectonicsSource.sourceAuthority}</dd></div>
          <div><dt>Version</dt><dd>{plateTectonicsSource.sourceVersion}</dd></div>
          <div><dt>DOI</dt><dd>{plateTectonicsSource.doi}</dd></div>
        </dl>
      </header>

      <div className="encounter-table__surface">
        <article
          className="source-surface"
          ref={articleRef}
          aria-label="USGS source text"
          onMouseUp={readSelection}
          onKeyUp={readSelection}
        >
          <header>
            <span>{plateTectonicsSource.sectionLabel}</span>
            <p>Select an exact passage in one paragraph. The surrounding source remains visible.</p>
          </header>
          {plateTectonicsSource.blocks.map((block) => {
            const wholeBlockHeld = encounter.fragments.some(
              (fragment) => (
                fragment.locator.blockId === block.blockId
                && fragment.locator.startOffset === 0
                && fragment.locator.endOffset === block.text.length
              ),
            );
            return (
              <div className="source-block" key={block.blockId}>
                <p
                  className={encounter.fragments.some(
                    (fragment) => (
                      fragment.fragmentId === returnedFragmentId
                      && fragment.locator.blockId === block.blockId
                    ),
                  ) ? "is-returned" : undefined}
                  data-encounter-block={block.blockId}
                  id={`encounter-${block.blockId}`}
                  tabIndex={-1}
                >
                  {block.text}
                </p>
                <button
                  type="button"
                  disabled={wholeBlockHeld}
                  onClick={() => keepWholeBlock(block.blockId)}
                >
                  {wholeBlockHeld ? "Paragraph held" : `Keep paragraph ${block.ordinal} exactly`}
                </button>
              </div>
            );
          })}
          <footer>
            <a href={plateTectonicsSource.canonicalUrl} target="_blank" rel="noreferrer">
              Inspect the source authority <span aria-hidden="true">↗</span>
            </a>
            <span>{plateTectonicsSource.representationLabel}</span>
          </footer>
        </article>

        <aside className="encounter-margin" aria-labelledby="encounter-margin-title">
          <header>
            <p className="eyebrow">Encounter Margin · Human-held</p>
            <h4 id="encounter-margin-title">Fragments remain attached to the source.</h4>
          </header>

          <div className="selection-note" aria-live="polite">
            {pending ? (
              <>
                <span>Exact selection</span>
                <blockquote>{pending.fragment.exactText}</blockquote>
                <p>
                  {pending.fragment.locator.sectionId} · {pending.fragment.locator.blockId}
                  {" · "}characters {pending.fragment.locator.startOffset}–{pending.fragment.locator.endOffset}
                </p>
                <button className="action action--quiet" type="button" onClick={keepSelection}>
                  Keep this fragment
                </button>
              </>
            ) : (
              <p>Select words in the source. Nothing is extracted automatically.</p>
            )}
            {selectionIssue ? <p className="field-issue" role="alert">{selectionIssue}</p> : null}
          </div>

          <ol className="encounter-fragments">
            {encounter.fragments.map((fragment, index) => (
              <li key={fragment.fragmentId}>
                <span>Fragment {String(index + 1).padStart(2, "0")}</span>
                <blockquote>{fragment.exactText}</blockquote>
                <dl>
                  <div><dt>Location</dt><dd>{fragment.locator.blockId} · {fragment.locator.startOffset}–{fragment.locator.endOffset}</dd></div>
                  <div><dt>Version</dt><dd>{fragment.sourceVersion}</dd></div>
                  <div><dt>Type</dt><dd>{fragment.representationType}</dd></div>
                </dl>
                <div>
                  <button
                    type="button"
                    aria-label={`Return fragment ${index + 1} to source`}
                    onClick={() => returnToSource(fragment)}
                  >
                    Return to source
                  </button>
                  <button
                    type="button"
                    aria-label={`Remove fragment ${index + 1}`}
                    onClick={() => dispatch({
                      type: "REMOVE_ENCOUNTER_FRAGMENT",
                      fragmentId: fragment.fragmentId,
                    })}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ol>

          {encounter.fragments.length >= 2 ? (
            <label className="encounter-relation">
              <span>Relationship you notice</span>
              <textarea
                value={encounter.fragmentRelation}
                onChange={(event) => dispatch({
                  type: "EDIT_ENCOUNTER_RELATION",
                  value: event.target.value,
                })}
                placeholder="These passages belong together because…"
                rows={4}
              />
              <small>No relation is inferred or completed.</small>
            </label>
          ) : null}

          <footer className="encounter-provenance">
            <span>Provenance</span>
            <ul>
              {plateTectonicsSource.provenance.map((item) => <li key={item}>{item}</li>)}
            </ul>
            <p>Working fragments are not Evidence and do not cross into ORION.</p>
          </footer>
        </aside>
      </div>
    </section>
  );
}
