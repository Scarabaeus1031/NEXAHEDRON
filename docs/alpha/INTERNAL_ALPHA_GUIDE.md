# NEXAHEDRON Alpha RC1 Review Guide

- Candidate: first live NEXAHEDRON → ORION Version 1 integration
- Audience: small internal review group
- Functional scope: Wonder entrance and Understand execution
- State: local and in-memory

## Reproduce the candidate

Requirements are Node.js 22.13+, Python 3.10+ and the exact ORION checkout
declared in `docs/upstream/orion-v1/SOURCE.yaml`.

```bash
npm ci
npm run check
npm test
npm run dev:orion
npm run dev -- --port 3001
```

Run the last two commands in separate terminals. Dependency verification stops
execution if either the ORION revision or canonical-content fingerprint differs.

## Primary journey

1. Open the Landing.
2. Open the Laboratory and begin with Wonder or Understand.
3. Define the Orientation Object.
4. complete Intention and Scope in the structured Request Editor.
5. confirm the Human-authored Orientation Request.
6. begin Orientation through the real Gateway.
7. inspect the resulting blocked, partial or complete Orientation Report; a
   Clarification Result; or a declared Runtime Error.
8. inspect exact Evidence References and Continuation Options when present.

Without a Library evidence adapter, the ordinary session-local path produces a
real blocked Orientation Report at the evidence boundary. This is the expected
Alpha result, not a fixture or simulated response.

## Boundary review

- External objects with unresolved identity produce Clarification Required.
- The frozen Gateway clarification-lineage limitation is displayed as the
  resulting Version 1 `validation_failed` Runtime Error after resubmission.
- A stopped browser-to-proxy request is a transport failure.
- An unreachable external Gateway is a Gateway failure.
- Invalid JSON, an invalid public envelope, a lifecycle violation and an
  unsupported contract version remain distinct visible boundary states.
- `unavailable` returned by ORION remains a public Runtime Error.

## Known limitations

- no Library evidence adapter or production evidence supply;
- clarification resubmission is blocked by the immutable Gateway lineage gap;
- no production ORION transport endpoint;
- Understand is the only executable Operator;
- no uploads, persistence, authentication, history, Library writes, Atlas
  mutation, providers or LUCY behavior.

## Feedback prompts

- Is every boundary state understandable without exposing internals?
- Does the blocked report feel trustworthy rather than broken?
- Is it clear what the Human supplied and what ORION returned?
- Is evidence absence visible without invented metadata?
- Does the next action remain under Human control?
