# Guided Orientation PATH A

- Status: NQMG-01 bounded local implementation
- Scope: deterministic, Human-held, browser-memory-only
- Public release authority: none
- ORION, Gateway, Evidence and THE EYE effects: none

## Purpose

Guided Orientation accepts one Human-authored question or direction and presents
one registered question at a time. It arranges only responses that the Human
explicitly confirms, answers, skips, corrects or stops. The final Terrain Map is
a transient Working Session view, not an answer or immutable Orientation Record.

```text
Human question
→ bounded registered questions
→ confirmed Human statements
→ perspective arrangement
→ Terrain Map
→ Human Rest or STOP
```

## Question registry

The local UI registry is version `1.0` and contains exactly:

```text
OPEN → SOURCE → ASSUMPTION → FEELING → MISSING
→ SELF_VIEW → OTHER_VIEW → SYSTEM_VIEW
→ CHANGE → REMAIN → MOVE → BOUNDARY → REVERSIBILITY → RETURN
```

Each entry declares an ID, version, label, purpose, prompt, nonclaim,
allowed next operator and skippability. This is a NEXAHEDRON interaction
registry, not an ORION Operator registry and not a canonical NEXAH semantic
extension. Unknown operators fail closed. `WHY THIS QUESTION?` renders only the
registered purpose and nonclaim.

## Deterministic routing and confirmation

The Human chooses one of three entrances: open question, direction to test, or
good for now. The third ends without creating a problem or result. The first two
require an exact opening statement, one explicit opening reason and a separate
confirmation before perspective work. No free text is classified or
paraphrased by software.

Each later step is advanced only by Continue or explicit Skip. Back, correction
and STOP remain available. Repeated text may remain in multiple Human-selected
categories; the application performs no conflict resolution.

## Terrain Map and memory boundary

The Terrain Map arranges confirmed Human fields for known, assumed, felt and
missing ground; self, other and system views; change, remainder, boundary,
reversibility and a possible Human-authored move. No Human status is preselected.

The state exists only inside the mounted client component. There is no storage
API, upload, account, analytics, network request, receipt or persistence path.
Reloading, navigating away or closing the session loses it.

## PATH A is not PATH B

PATH A asks, holds and arranges Human statements. It has no external Evidence
authority and does not invoke ORION or the Gateway.

PATH B would require an authoritative source, declared processor,
residual/uncertainty evaluation and an inspectable verified return. NQMG-01 does
not implement or claim that path. Existing THE EYE result authority and all
ORION Version 1 boundaries remain unchanged.

## Human STOP and limitations

STOP creates no receipt, approval, conclusion or immutable record. The path is
not scientific, evidential, therapeutic, diagnostic or advisory. It does not
verify whether a source statement is true, whether another person holds a view,
whether a remainder is an invariant, or whether a proposed move is safe or
reversible. No AI or automatic interpretation is present.
