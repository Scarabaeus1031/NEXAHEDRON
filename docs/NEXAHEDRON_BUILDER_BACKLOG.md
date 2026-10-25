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

## Re-entry gate

Any backlog item needs one exact future task, owner, user value, boundary,
verification plan and explicit activation decision. Items are not combined
merely because they already exist in the same repository.
