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
3. Use the recorded Orientation Object.
4. Use the recorded intention.
5. Confirm the scope.
6. Inspect Summary, Path, Evidence, Blockers and Inspect.
7. Pause in Reflection.
8. Continue to Departure.

## Boundary review

Choose **Compare**, describe a Document and enter a comparison intention. The
Laboratory must stop before scope confirmation and state that nothing was sent
or inferred.

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
- Did the blocked report feel trustworthy and understandable?
- What, if anything, suggested an answer machine rather than an Orientation Laboratory?

Record observations by screen, quote confusing copy exactly and distinguish
clarity issues from requests for new functionality. New functionality remains
outside this alpha.
