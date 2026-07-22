# NEXAHEDRON Internal Alpha Guide

- Candidate: Phase I.2 deterministic Orientation Laboratory
- Audience: small internal review group
- Purpose: evaluate clarity, confidence and first-time understanding
- Functional scope: one recorded `Understand + Observation` journey
- Architecture status: frozen and unchanged

## Review objective

The alpha should answer four questions within the first twenty seconds:

1. Is NEXAH understood as the Orientation Layer?
2. Is NEXAHEDRON understood as the Orientation Laboratory and first application?
3. Is it clear that knowledge remains in its existing sources?
4. Is the invitation to begin an orientation understandable without a prepared question?

## Reproduce the candidate

Requires Node.js 22.13 or newer.

```bash
npm ci
npm run check
npm test
npm run dev -- --port 3001
```

Open `http://localhost:3001/`.

## Primary review journey

1. Read the landing without prior explanation.
2. Choose **Understand**.
3. Choose the **Recorded observation** example.
4. Choose the **Understand** intention example.
5. Confirm the scope.
6. Inspect Summary, Path, Evidence, Blockers and Inspect.
7. Continue the orientation directly or pause in Reflection first.
8. From Continuation, return to the report, refine the intention or revisit the material.

## Boundary review

Choose **Compare**, select a material kind, name both subjects and enter a
comparison intention. The
Laboratory must stop before scope confirmation and state that nothing was sent
or inferred.

## Mode entrance review

Open each of the seven modes once and return with **Change mode**. Verify that
the opening question, supporting language, examples, fields, next action and
visual emphasis fit the selected intention. Compare and Connect should ask for
two anchors. The remaining modes should ask for one starting material. None of
these entrances should suggest that the Laboratory has already interpreted the
material.

## Known limitations

- deterministic fixture only;
- only the recorded Understand + Observation journey completes;
- no live ORION gateway or consumer contract;
- no uploads, ingestion or active connectors;
- no Library reads or writes;
- no Atlas mutation or publication;
- no persistence, accounts, analytics or saved progress;
- no LUCY behavior;
- source types on the landing are ecosystem context, not active capability.

## Feedback prompts

- What did you think NEXAH was after twenty seconds?
- What did you think NEXAHEDRON was?
- Where did the language feel technical or uncertain?
- Was the next action clear at every step?
- Did each mode feel like a genuinely different entrance rather than renamed copy?
- Did the blocked report feel trustworthy and understandable?
- Did the report feel like the beginning of further orientation rather than a terminal answer?
- What, if anything, suggested an answer machine rather than an Orientation Laboratory?

Record observations by screen, quote confusing copy exactly and distinguish
clarity issues from requests for new functionality. New functionality remains
outside this alpha.
