"use client";

import { useEffect, useState } from "react";
import { THE_EYE_DEMO_IDS, THE_EYE_DEMOS, isTheEyeDemoId, type TheEyeDemoId } from "./catalog";
import type { IlauEntry, ResultProjection, TheEyeViewState, TransportEnvelope } from "./types";
import styles from "./TheEyeResultView.module.css";

const ALL_STATES: TheEyeViewState[] = [
  "NO_RESULT_SELECTED", "LOADING", "VERIFIED_PASS", "VERIFIED_FAIL", "VERIFIED_HOLD",
  "INPUT_REJECTED", "RESULT_INVALID", "RECEIPT_VALID", "RECEIPT_INVALID", "UNVERIFIED",
  "LOCAL_CONFIGURATION_MISSING", "STOPPED_BY_HUMAN",
];

function Status({ state, reason }: { state: TheEyeViewState; reason?: string }) {
  return <div className={`${styles.status} ${styles[`status_${state}`] ?? ""}`} role="status" aria-live="polite" aria-atomic="true">
    <span aria-hidden="true">{state.startsWith("VERIFIED_") || state === "RECEIPT_VALID" ? "✓" : state === "LOADING" ? "…" : "■"}</span>
    <strong>{state}</strong>{reason && reason !== state ? <small>{reason}</small> : null}
  </div>;
}

function TechnicalValue({ children }: { children: string | number | null }) {
  return <code className={styles.technical}>{children ?? "—"}</code>;
}

function Pair({ label, value }: { label: string; value: string | number }) {
  return <div className={styles.pair}><dt>{label}</dt><dd><TechnicalValue>{value}</TechnicalValue></dd></div>;
}

function IlauColumn({ letter, title, entries }: { letter: string; title: string; entries: IlauEntry[] }) {
  return <section className={styles.ilauCard} aria-labelledby={`ilau-${letter}`}>
    <header><span aria-hidden="true">{letter}</span><div><h3 id={`ilau-${letter}`}>{title}</h3><strong>{entries.length}</strong></div></header>
    {entries.length === 0 ? <p className={styles.zero}>0 entries</p> : <ol>{entries.map((entry) => <li key={entry.entry_id}>
      <TechnicalValue>{entry.entry_id}</TechnicalValue>
      <span>{entry.reason_code}</span>
      <small>A: {entry.relation_unit_id_a ?? "—"} · B: {entry.relation_unit_id_b ?? "—"} · {entry.side}</small>
    </li>)}</ol>}
  </section>;
}

const OUTCOME_EXPLANATIONS: Record<string, string> = {
  PASS: "The declared comparison criterion was met for this sealed demonstration. PASS does not mean scientifically correct.",
  FAIL: "One or more declared relations did not remain aligned. The machine evidence below shows the exact differences and residual reasons.",
  HOLD: "Required information was unavailable, so A2 did not resolve the declared comparison to PASS or FAIL.",
};

function IlauLegend() {
  return <section className={styles.legendPanel} aria-labelledby="ilau-legend-title">
    <div><p className={styles.eyebrow}>Reading key</p><h2 id="ilau-legend-title">What I / L / A / U mean</h2></div>
    <div className={styles.legend} aria-label="I L A U legend">
      <p><strong>I — Invariant</strong><span>remained the same under the declared comparison</span></p>
      <p><strong>L — Lost</strong><span>expected relation not observed</span></p>
      <p><strong>A — Added</strong><span>observed relation not expected</span></p>
      <p><strong>U — Unavailable</strong><span>could not be evaluated from the required information</span></p>
    </div>
  </section>;
}

function VerifiedResult({ projection, receiptState, onReceipt, verificationStage }: { projection: ResultProjection; receiptState: TransportEnvelope | null; onReceipt: (variant: "valid" | "invalid") => void; verificationStage?: TransportEnvelope["verificationStage"] }) {
  const p = projection;
  return <>
    <section className={styles.outcome} aria-labelledby="outcome-title">
      <div><p className={styles.eyebrow}>Human-readable outcome</p><h2 id="outcome-title">Result: {p.outcome.decision}</h2><p className={styles.outcomeExplanation}>{OUTCOME_EXPLANATIONS[p.outcome.decision] ?? "Read the sealed machine evidence before making a Human decision."}</p><small className={styles.verificationStage}>{verificationStage === "VERIFIED_BEFORE_PACKAGING" ? "Curated demonstration · verified by A2 before packaging" : "Local demonstration · directly verified by A2"}</small></div>
      <dl><Pair label="CLI exit" value={p.exitCode} /><Pair label="Evidence stage" value={p.outcome.evidenceStage} /><Pair label="Mechanism status" value={p.outcome.mechanismStatus} /></dl>
      <p className={styles.mechanism}>PASS DOES NOT ESTABLISH A MECHANISM</p>
    </section>

    <details className={styles.panel} open><summary>Identity & declaration</summary><dl className={styles.identityGrid}>
      <Pair label="Profile" value={p.identity.profile} /><Pair label="Schema" value={p.identity.schemaVersion} />
      <Pair label="Result ID" value={p.identity.resultId} /><Pair label="Canonical result SHA-256" value={p.identity.canonicalResultSha256} />
      <Pair label="Record A" value={`${p.identity.recordAId} / ${p.identity.recordASha256}`} /><Pair label="Record B" value={`${p.identity.recordBId} / ${p.identity.recordBSha256}`} />
      <Pair label="Declaration" value={`${p.identity.declarationId} / ${p.identity.declarationSha256}`} /><Pair label="Domain" value={p.identity.domain} />
      <Pair label="Property" value={p.identity.property} /><Pair label="Transformation" value={p.identity.transformation} />
      <Pair label="Alignment" value={p.identity.alignmentMode} /><Pair label="Criterion" value={p.identity.criterion} />
    </dl></details>

    <section className={styles.panel} aria-labelledby="ilau-title"><div className={styles.sectionHead}><div><p className={styles.eyebrow}>Declared comparison partition</p><h2 id="ilau-title">I / L / A / U</h2></div><p>{p.ilau.invariant.length} / {p.ilau.lost.length} / {p.ilau.added.length} / {p.ilau.unavailable.length}</p></div>
      <p className={styles.note}>Canonical A2 partition. The reading key above explains the terms without replacing the sealed entries.</p>
      <p className={styles.note}>These are THE-EYE-local runtime classifications, not universal scientific categories.</p>
      <div className={styles.ilauGrid}><IlauColumn letter="I" title="Invariant" entries={p.ilau.invariant} /><IlauColumn letter="L" title="Lost" entries={p.ilau.lost} /><IlauColumn letter="A" title="Added" entries={p.ilau.added} /><IlauColumn letter="U" title="Unavailable" entries={p.ilau.unavailable} /></div>
    </section>

    <section className={styles.panel} aria-labelledby="residual-title"><div className={styles.sectionHead}><div><p className={styles.eyebrow}>Why this result occurred</p><h2 id="residual-title">Residual reasons</h2></div><strong>{p.residuals.length}</strong></div>
      {p.residuals.length === 0 ? <p className={styles.zero}>Residual count: 0</p> : <ol className={styles.residuals}>{p.residuals.map((r) => <li key={r.residual_id}><TechnicalValue>{r.residual_id}</TechnicalValue><strong>{r.reason_code}</strong><span>Unit: {r.relation_unit_id ?? "—"} · {r.gate_effect} · {r.severity}</span><details><summary>Expected / observed projection</summary><pre>{JSON.stringify({ expected: r.expected, observed: r.observed }, null, 2)}</pre></details></li>)}</ol>}
    </section>

    <section className={styles.panel} aria-labelledby="integrity-title"><div className={styles.sectionHead}><div><p className={styles.eyebrow}>Verification</p><h2 id="integrity-title">Integrity & exports</h2></div><strong>{p.verification.status}</strong></div>
      <dl className={styles.identityGrid}><Pair label="Self-hash verification" value={p.verification.status} /><Pair label="Tamper status" value={p.verification.status === "VALID" ? "NO_TAMPER_DETECTED" : "TAMPER_OR_INVALID"} /><Pair label="A2 reason" value={p.verification.reasonCode} /><Pair label="Canonical identity" value={p.verification.boundResultSha256 ?? "—"} /></dl>
      <div className={styles.exports}>{p.exports.map((item) => <a key={item.kind} href={item.href} download>{item.label}</a>)}</div>
    </section>

    <section className={styles.boundary} aria-labelledby="boundary-title"><p className={styles.eyebrow}>Provenance and boundary</p><h2 id="boundary-title">What this view establishes—and what it does not.</h2><dl className={styles.identityGrid}><Pair label="Classification" value={p.classification} /><Pair label="Domain boundary" value={p.boundaries.domainBoundary} /><Pair label="Evidence ceiling" value={p.boundaries.evidenceCeiling} /><Pair label="Mechanism nonclaim" value={p.boundaries.mechanismNonclaim} /></dl><p>{p.boundaries.humanAuthority}</p></section>

    <section className={styles.humanGate} aria-labelledby="human-gate-title"><p className={styles.eyebrow}>Human gate · separate from machine result</p><h2 id="human-gate-title">Return to the Human decision.</h2><p>The summary helps you read the result; the sealed machine evidence remains authoritative. No Human choice rewrites PASS, FAIL, HOLD or INPUT_REJECTED.</p><label className={styles.check}><input type="checkbox" /> I acknowledge that I reviewed this exact canonical result.</label><label>Human decision<select defaultValue="" aria-label="Human decision"><option value="" disabled>Choose only after review</option><option value="ACKNOWLEDGE">Acknowledge</option><option value="HOLD">Hold</option><option value="REJECT">Reject</option></select></label><p>No decision is preselected. A selection here is transient and does not create a receipt.</p>
      {p.exports.some((item) => item.kind === "receipt") ? <div className={styles.receiptActions}><button type="button" onClick={() => onReceipt("valid")}>Verify allowlisted receipt</button><button type="button" onClick={() => onReceipt("invalid")}>Run tampered receipt control</button></div> : <p>No receipt is present for this demonstration.</p>}
      {receiptState ? <Status state={receiptState.state} reason={receiptState.reasonCode} /> : null}
      <p className={styles.stopExplanation}><strong>STOP returns control to the Human.</strong> It does not rewrite, approve or invalidate a machine result.</p>
    </section>
  </>;
}

export function TheEyeResultView() {
  const [selected, setSelected] = useState<TheEyeDemoId | "">("");
  const [envelope, setEnvelope] = useState<TransportEnvelope>({ schema: "nexah.the_eye.local_view/1.0", state: "NO_RESULT_SELECTED", reasonCode: "NO_RESULT_SELECTED" });
  const [receiptState, setReceiptState] = useState<TransportEnvelope | null>(null);

  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("demo");
    if (requested && isTheEyeDemoId(requested)) void selectDemo(requested);
    // The optional deep link is resolved once; later selection remains explicitly Human-driven.
  }, []);

  async function selectDemo(id: TheEyeDemoId) {
    setSelected(id); setReceiptState(null); setEnvelope({ schema: "nexah.the_eye.local_view/1.0", state: "LOADING", reasonCode: "LOADING" });
    try { const response = await fetch(`/api/the-eye/results?demo=${encodeURIComponent(id)}`, { cache: "no-store" }); setEnvelope(await response.json()); }
    catch { setEnvelope({ schema: "nexah.the_eye.local_view/1.0", state: "UNVERIFIED", reasonCode: "LOCAL_SERVER_UNAVAILABLE" }); }
  }

  async function verifyReceipt(variant: "valid" | "invalid") {
    if (!selected) return;
    const response = await fetch("/api/the-eye/receipts", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ demo: selected, variant }) });
    setReceiptState(await response.json());
  }

  function stop() { setSelected(""); setReceiptState(null); setEnvelope({ schema: "nexah.the_eye.local_view/1.0", state: "STOPPED_BY_HUMAN", reasonCode: "HUMAN_STOP" }); }

  return <section className={styles.page} aria-labelledby="the-eye-title">
    <div className={styles.stagingStatus} aria-label="Workspace status"><span>Workspace-private staging</span><span>Sealed demonstrations</span><span>Anonymous access denied</span><span>Public release not active</span></div>
    <header className={styles.hero}><div><p className={styles.eyebrow}>Result view · sealed artifacts only</p><h1 id="the-eye-title">THE EYE</h1><p className={styles.intro}>THE EYE compares two ordered structures and shows what remained invariant, what was lost, what was added, and what could not be evaluated.</p><p className={styles.scope}>This workspace presents six sealed demonstrations. It does not accept uploads or run arbitrary comparisons. NEXAHEDRON presents; A2 verifies; the Human decides.</p></div><div className={styles.stopGroup}><button className={styles.stop} type="button" onClick={stop}>STOP</button><small>Returns control to you without changing the machine result.</small></div></header>
    <ol className={styles.journey} aria-label="Review journey"><li>Orient</li><li>Choose</li><li>See result</li><li>Understand I/L/A/U</li><li>Inspect evidence</li><li>Human decision</li></ol>
    <IlauLegend />
    <section className={styles.choose} aria-labelledby="choose-title"><div className={styles.sectionHead}><div><p className={styles.eyebrow}>Choose one sealed example</p><h2 id="choose-title">Six demonstrations</h2></div><p>Canonical IDs and outcomes remain unchanged.</p></div>
    <nav className={styles.selector} aria-label="THE EYE demonstration results">{THE_EYE_DEMO_IDS.map((id, index) => { const demo = THE_EYE_DEMOS[id]; return <button key={id} type="button" aria-pressed={selected === id} onClick={() => selectDemo(id)}><span className={styles.choiceNumber}>{index + 1}</span><span><strong>{demo.displayTitle}</strong><small>{demo.description}</small>{demo.recommended ? <em>Recommended first</em> : null}</span></button>; })}</nav></section>
    <Status state={envelope.state} reason={envelope.reasonCode} />
    {envelope.projection ? <VerifiedResult projection={envelope.projection} receiptState={receiptState} onReceipt={verifyReceipt} verificationStage={envelope.verificationStage} /> : <section className={styles.empty} aria-labelledby="current-state-title"><p className={styles.eyebrow}>Current view state</p><h2 id="current-state-title">{envelope.state === "NO_RESULT_SELECTED" ? "Choose a sealed demonstration to begin." : envelope.state}</h2><p>{envelope.state === "NO_RESULT_SELECTED" ? "New here? Start with PASS · Exact ID. No directory browsing, upload or arbitrary path input is available." : envelope.state === "INPUT_REJECTED" ? `A2 rejected the inputs before producing a result partition. No result exists for this demonstration. CLI exit ${envelope.runtime?.exit_code ?? 30}.` : envelope.state === "STOPPED_BY_HUMAN" ? "The review stopped and control returned to you. No receipt was created and no machine result was changed." : envelope.state === "LOADING" ? "Loading the selected sealed demonstration." : `Closed diagnostic: ${envelope.reasonCode}`}</p></section>}
    <aside className={styles.stateIndex} aria-label="Implemented state contract"><span>Implemented state contract</span><p>{ALL_STATES.join(" · ")}</p></aside>
  </section>;
}
