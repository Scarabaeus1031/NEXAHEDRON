# NEXAHEDRON Builder Backlog

Status: `PRESERVED / UNLINKED / NOT ACTIVE`

Decision: Mission Control `D-073`, 19 October 2026

## Why this backlog exists

The public NEXAHEDRON frontdoor now uses the existing A0 Human Book and its
allowlisted playable entries. The former NEXAHEDRON Workspace is not deleted,
deprecated as source or reinterpreted as A0. It remains an engineering asset
whose next use must be selected deliberately.

Backlog placement is not activation, release authority, product validation or
evidence of Human utility.

## Preserved engine inventory

| Engine / surface | Current code home | Preserved value | Public disposition |
|---|---|---|---|
| Orientation Workspace | `features/orientation/`, `/orient`, `/wonder`, `/object`, `/request`, `/confirmation`, `/orientation` | bounded Human-authored session, explicit confirmation and browser-memory state | unlinked and excluded from sitemap |
| ORION consumer boundary | `packages/orion-gateway/`, `services/orion_transport/`, `/api/orientation` | verified Version 1 public-contract consumer and fail-closed transport seam | retained; no public entry or Runtime claim |
| Guided Orientation PATH A | `features/guided-orientation/`, `/guided` | separate local guided-path candidate | unlinked; not part of A0 Human Book |
| THE EYE local result view | `features/the-eye/`, `/the-eye`, related API routes | local result and receipt presentation work | unlinked; separate owner decision required |
| Curated Reference Cases | `features/library/`, `/library`, `/cases` | bounded editorial examples and public-reading components | retained as material; not primary navigation |
| Explore / Connect vocabulary | `/explore` and historical interface copy | prior bridge and continuation experiments | no general Connect engine; no public route promise |

## Current public boundary

The public navigation is limited to:

1. the NEXAHEDRON A0 Human View;
2. five allowlisted interactive Human stations;
3. the Human Return;
4. an external NEXAH method / Science door;
5. an external Scarabæus workshop / Builder door;
6. accessibility, privacy, contact and imprint.

The A0 Research Desk, A0 Research Backlog, Science Navigator / NSN, Mission
Control, Builder logs and non-allowlisted A0 Book surfaces are not public
NEXAHEDRON navigation.

## M-PUB01 A0 delta gate · 25 October 2026

| Task ID | Source / current finding | Next step | Completion criterion | Dependencies / priority |
|---|---|---|---|---|
| `M-PUB01-A0-01` | The local A0 source contains the Crown/Shadow Contact Bench, both GLBs, the D1–D2 clamp return and the 3°/111°/333° comparator. The current `public/a0-human/start/` bundle contains YUGO/IOTA, the angle SVG and Crown/Shadow CSS/JS/contract, but not the Contact-Bench HTML, its two GLBs or the D1–D2 clamp return. The existing bundle verifier currently fails on undeclared Finder-style numbered duplicates, so this is not a clean release candidate. | Re-run the existing allowlist/sync assessment against the current source; remove or explicitly dispose the undeclared duplicate bundle files; decide which Human-facing routes belong in the release cut. If selected, stage the exact HTML/GLB/result dependencies and run bundle, link/404, secret and accessibility checks. | `node scripts/verify-a0-human-bundle.mjs` passes; a local staging receipt lists every selected file and hash; all selected links return successfully; denied internal desks remain absent; and a separate Human Owner release authorization exists before promotion or deployment. | `OWNER_GATE / P1 within M-PUB01`; depends on the existing release cut and does not authorize cleanup, push, deployment, publication or outreach beyond the separately approved task. |

The later clamp report and prime/φ comparison material remain local until this
gate explicitly selects them. A missing public route is not treated as missing
repository custody.

### Current-cut disposition · 26 October 2026

`M-PUB01-A0-01` is **closed for the present NEXAHEDRON release cut**. The
Contact Bench, its GLBs, the D1–D2 clamp return and the 3°/111°/333° comparator
remain preserved source candidates and were not silently added to the Human
View. The existing allowlist is the release boundary.

- all `262` untracked Finder-style numbered copies were moved, not deleted, to
  the external local quarantine `NEXAHEDRON_RELEASE_QUARANTINE_2026-10-26`;
- `257` copies were byte-identical to their canonical filename and `5` retained
  an older differing work state; all remain recoverable in quarantine;
- `SOURCE_MANIFEST.json` now binds `763` public files, including `212` declared
  presentation transforms;
- `npm run check:a0-human`: `PASS`;
- the only same-origin shell escape is the explicitly allowlisted public route
  `/about#crossing`;
- the denied private Desk, Backlog, Navigator, Mission Control and Builder-log
  routes remain absent.

This is release hygiene and custody, not a new Finding, Paper state,
mathematical relation or Science-Desk change.

## Re-entry gate

Any backlog item needs one exact future task, owner, user value, boundary,
verification plan and explicit activation decision. Items are not combined
merely because they already exist in the same repository.

## Presentation return · 26 October 2026

`PRESENTATION_ACCESSIBILITY_RETURN / NO_NEW_FINDING`

The local Human-facing shell now identifies the active existing room on both
sides of the header, moves the existing C Connect orb beside that room and
keeps the Scarabæus workshop mark separate. The Human route retains its own
stage line and ends with an explicit stop/return after the three curated
doors. Reduced Motion preserves the marker without pulsing.

This closes no preserved engine item and activates no re-entry gate. It is not
a Finding, mathematical relation, Paper claim, Human-utility result, release
or deployment. The Science Desk, Findings/Paper Workspace and Mathfield remain
unchanged. The detailed source-bound receipt remains with the Builder Public
Desk in `PUBLIC_NEXAHEDRON_HUMAN_READING_2026-10-25.md`.

## About / Human View release-preparation return · 26 October 2026

`M-PUB01 / LOCAL VERIFIED / NOT PUSHED / NOT DEPLOYED`

The existing public shell now includes `/about-nexahedron` immediately before
`/about` (`To NEXAH`). The page explains NEXAHEDRON as the public A0 Human
View, names Human View, Arcade, Club and C Connect, and returns to NEXAH for
method, sources, Science and Library. Library remains visibly marked
`VORGEMERKT`; no active Library integration is claimed.

The change reuses the existing NEXAHEDRON repository identity and the existing
Mission Control priority `M-PUB01`. It creates no Navigator identity, relation,
Study, Finding, Paper state or science promotion.

Release-preparation evidence:

- certified ORION source pin `d34fbb2f99334534f4db89465a29f8bdb16d14d3`
  and canonical-content fingerprint verified;
- `npm run check`: PASS;
- `npm test`: PASS — `198` tests, `175` passed, `23` intentionally skipped,
  `0` failed; five ORION transport integration tests also passed;
- `npm run check:a0-human`: PASS — `763` bound files and `212` declared
  transforms;
- production privacy scan: PASS — `0` findings;
- no commit, push, publication or deployment has been performed by this
  return.

The Builder Desk owns the implementation receipt. Mission Control continues to
own release currentness and the separate Human Owner push/deployment gate.

## Parked Human Arcade simplification · 26 October 2026

`M-PUB01-NXH-ARCADE-HUMAN-01 / PARKED / NOT ACTIVE`

The present NEXAHEDRON Human Entry is frozen at the locally reviewed state.
Further Arcade reduction is recorded as a separate Builder UX task and is not
part of the current presentation pass.

| Field | Bound disposition |
|---|---|
| Existing identity | Reuses the existing NEXAHEDRON Arcade and `M-PUB01`; creates no new route family, Navigator identity, Study or Finding. |
| Human value | A first-time visitor can enter and play without seeing Builder Bench controls or having to choose between implementation-facing actions. |
| Proposed scope | Provide a Human View projection of Arcade with the primary play/return path, fewer visible controls and no Bench access. Remove the in-window `Arcade öffnen` action: it leaves the embedded Human View and breaks page continuity. Playing and returning must remain inside the current page. Preserve the full Builder surface at its existing internal route. |
| Explicitly out of scope | No Arcade mechanics rewrite, no new demonstrator, no deletion of Builder controls, no change to source data or scientific status, and no deployment. |
| Required UX checks | Normal and narrow width; keyboard and visible focus; Reduced Motion; start/play/return; lossless return to the Human Entry; no route or control that exposes the Builder Bench. |
| Owner | Builder Desk implementation under Human Owner acceptance; Mission Control retains `M-PUB01` priority and release authority. |
| Activation gate | One explicit Human Owner instruction to start this exact task after the current Human Entry freeze. |
| Done when | The Human projection has no control that navigates away to Arcade or Builder, passes the stated UX checks, keeps play and Return in the current page, leaves the Builder route intact, and records changed files, tests and open limits in a bounded local return. |

Parking this task does not reopen the current release cut, alter the frozen
Human Entry, authorize a commit or push, or imply that the present Arcade has
failed technical validation.
