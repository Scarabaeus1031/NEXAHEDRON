# NEXAHEDRON Release Readiness Report

> Historical gate record. This report preserves the findings from the
> pre-freeze audit. The current release decision is recorded in
> `NEXAHEDRON_V1_RELEASE_PREPARATION_REPORT.md` and `VERSION1_FINAL_HANDOFF.md`.

**Review date:** 24 July 2026
**Review scope:** NEXAHEDRON Version 1 public release gate
**Decision:** **NO-GO**

## Executive Summary

NEXAHEDRON is locally buildable, testable and understandable as the
Human-facing reference implementation of the NEXAH Orientation Ecosystem. The
public entrance, Visitor Guide, legal routes, repository policies, metadata and
Human-owned Orientation Record are implemented. The frozen ORION boundary
remains unchanged.

The repository is not ready for an immediate public release. The canonical
domain is unreachable, the advertised NEXAHEDRON repository does not exist
publicly, the local tree is not an immutable release revision, deployment
privacy facts are unresolved, and the frozen Public Alpha roadmap still
identifies unclosed production, clarification, operations, security and
accessibility gates. These are release and governance issues, not requests for
new architecture.

## Repository Readiness

| Item | Result | Evidence |
|---|---|---|
| README and repository identity | Pass locally | The first screen identifies NEXAHEDRON as the Human-facing reference implementation, names NEXAH, ORION and the public home, and states current limits. |
| CONTRIBUTING | Pass locally | Reproduction, contribution scope, ownership boundaries, review and checks are documented. |
| CODE_OF_CONDUCT | Pass locally | Conduct expectations, scope and a private reporting route exist. |
| SECURITY | Pass locally | Private disclosure, supported-version policy and subsystem scope exist. |
| Software license | Pass locally | Apache License 2.0 exists and is declared in `package.json`. |
| Documentation license | Pass locally | CC BY 4.0 is declared separately. |
| Licensing scope | Pass locally | Code, documentation, generated declarations, third-party material and marks are distinguished. |
| Citation | Pass locally | `CITATION.cff` identifies the project, author, license and exact-revision expectation. |
| Release and governance references | Pass locally | The README and checks link current architecture, roadmap, policies and this gate. |
| Automated policy presence | Pass | `npm run check:docs` verifies the contributor, conduct, security, license and citation documents. |
| Public source repository | **Fail** | `https://github.com/Scarabaeus1031/NEXAHEDRON` returned HTTP 404 during unauthenticated verification. |
| Immutable release revision | **Fail** | The local branch has no Git remote and contained 114 changed or untracked entries at review time. |
| Release identity | **Fail** | `package.json` and `CITATION.cff` still identify `0.1.0-dev.0`; no public tag or release manifest binds an exact NEXAHEDRON revision. |

The repository content is a viable release candidate. It is not yet a
reviewable public release artifact.

## Website Readiness

Implemented and verified locally:

- landing page with one primary Orientation action;
- consistent public navigation and footer;
- local Visitor Guide with a four-place ecosystem map and “You are here” state;
- About, Contact, Imprint, Privacy and Accessibility routes;
- canonical page metadata and per-page titles for principal public entrances;
- OpenGraph and social preview metadata;
- favicon;
- `robots.txt`;
- `sitemap.xml`;
- custom 404 page;
- responsive public navigation rules;
- reduced-motion and visible-focus rules;
- canonical links to NEXAH, ORION and the ecosystem Visitor Guide.

Production-render verification confirms that `robots.txt`, `sitemap.xml`,
canonical metadata, OpenGraph metadata, the social preview and favicon
declaration are emitted. The custom missing route returns HTTP 404.

Public verification fails:

- `https://nexahedron.com` could not accept an HTTPS connection;
- the hosted custom domain, TLS behavior, redirects and anonymous access cannot
  therefore be accepted;
- external links to the planned NEXAHEDRON repository and its security policy
  lead to a repository that is not public;
- no hosted mobile, screen-reader or supported-browser matrix has been run.

## Visitor Journey

One anonymous local production walkthrough was completed:

1. The landing page states what NEXAHEDRON is and offers one clear primary
   action.
2. The Visitor Guide identifies nexah.de, NEXAH, ORION and NEXAHEDRON with
   distinct responsibilities and marks NEXAHEDRON as the current place.
3. A first-time Human begins with Wonder.
4. The Human enters “What is plate tectonics?” and completes Anchor, Place,
   Attend, Relate, Bound, Turn and Reflect.
5. Rest produces a visible
   **“Orientation Record · held, not closed”** containing the Human-authored
   anchor, material, attention, relationship, uncertainty and reflection.
6. No ORION request occurs during this complete Human-owned session.
7. Selecting “Prepare for ORION” opens the explicit confirmation review; it
   does not lead to an empty page.
8. The review explains exactly what may cross the public ORION boundary and
   retains a safe return to the table.

The local journey therefore passes the Version 1 Human-owned path. The same
journey cannot be accepted as public because no unauthenticated production
origin exists.

## Legal Review

This section is an operational release checklist, not legal advice.

| Item | Status | Required action |
|---|---|---|
| Provider identity / Imprint | Implemented | NEXAHEDRON links to one canonical NEXAH provider notice rather than duplicating mutable company facts. Obtain final operator review. |
| Contact | Implemented | `contact@nexah.de` is used consistently for general, accessibility, privacy and security contact. |
| Privacy | **Blocked** | The local notice correctly describes browser-session state and the explicit ORION boundary, but hosting provider, processing location, recipients and technical-log retention are not yet frozen. |
| Copyright | Implemented locally | The public footer identifies Haptikdesign GmbH and the Version 1 reference implementation. |
| License references | Implemented locally | Software, documentation and scope notices are distinct. |
| Open-source notices | Partially complete | Repository licensing scope exists; distribution-specific third-party notices must be verified against the final production artifact. |
| Security disclosure | Implemented locally | The owning policy and private contact route exist, but their public URLs cannot work until the repository is published. |
| Canonical URLs | **Blocked** | Metadata uses `https://nexahedron.com`, but that origin is unavailable. |

Canonical maintenance strategy:

- maintain company identity, address, representative and register once at the
  canonical NEXAH Imprint;
- maintain a service-specific NEXAHEDRON privacy notice because hosting and
  processing differ by service;
- maintain accessibility, security and licensing notices in the surface or
  repository that owns the affected responsibility;
- review all links, facts and review dates together for each coordinated
  release.

## Accessibility Review

Verified:

- semantic landmarks and heading structure;
- keyboard-operable buttons, links, radios and text fields in the complete
  Orientation walkthrough;
- labelled fields and explicit status language;
- skip link and visible-focus rules;
- responsive CSS down to the declared 280-pixel minimum;
- public navigation reflows into a three-column grid below 520 pixels;
- reduced-motion rules;
- an Accessibility page with current support, known limits and a barrier
  reporting route.

Not verified:

- screen-reader output in the declared supported combinations;
- touch and physical-device mobile navigation;
- 200% and 400% zoom journey completion;
- Windows high-contrast behavior;
- the complete hosted keyboard/focus matrix;
- accessibility of external source material.

Local semantics are strong, but the frozen roadmap explicitly requires public
keyboard, screen-reader, focus, mobile and supported-browser verification.
That release gate remains open.

## Cross-Repository Consistency

The local NEXAHEDRON front door consistently assigns:

- public and intellectual home to `nexah.de`;
- research and framework to NEXAH;
- certified deterministic Core to ORION;
- Human-facing reference implementation and Workspace presentation to
  NEXAHEDRON;
- intention, meaning, confirmation, Rest and the Orientation Record to the
  Human.

Unauthenticated public verification found:

- `nexah.de` reachable;
- NEXAH reachable;
- NEXAH-ORION reachable;
- NEXAHEDRON repository absent;
- `nexahedron.com` unreachable.

The current public NEXAH repository still leads with “The Cartography
Laboratory” and an active exploratory research framework. That is compatible
with its research history, but it does not yet provide the same concise
ecosystem role language used by the NEXAHEDRON front door. This is an editorial
coordination issue and must be resolved in the owning repository rather than
by changing NEXAHEDRON’s architecture.

## Build Status

**Pass.**

`npm run check` completed successfully:

- exact ORION dependency revision and fingerprint verified;
- generated public contract declarations verified;
- architecture boundary checks passed;
- current-documentation checks passed;
- ESLint passed.

`npm test` completed successfully:

- production build passed;
- all application tests passed;
- all real Gateway integration tests passed.

The vinext build emitted one informational route-classification notice for
static analysis of API usage. It did not fail the build and does not identify a
Version 1 inconsistency.

`git diff --check` passed.

## Test Status

| Verification | Result |
|---|---:|
| JavaScript/TypeScript tests | 69 passed, 0 failed, 0 skipped |
| Real ORION Gateway integration tests | 4 passed, 0 failed |
| Production build | Pass |
| Dependency/fingerprint verification | Pass |
| Generated contract drift check | Pass |
| Architecture checks | Pass |
| Documentation checks | Pass |
| Lint | Pass |
| Anonymous local desktop journey to Orientation Record | Pass |
| “Prepare for ORION” transition to confirmation | Pass |
| Public custom-domain smoke test | Fail |
| Hosted mobile/accessibility/browser matrix | Not run |

## Release Blockers

### MUST FIX before release

1. **Publish an immutable NEXAHEDRON source revision.** Create the owning public
   repository, review the current dirty tree, commit intentionally, tag the
   release candidate and bind it from the release manifest.
2. **Publish the production origin.** Configure `nexahedron.com`, TLS,
   canonical redirects, anonymous access, environment variables and rollback;
   then run the same anonymous walkthrough against the public origin.
3. **Freeze deployment privacy facts and obtain legal review.** Record the
   actual host, processing locations, recipients, technical-log purposes and
   retention before publication.
4. **Choose the honest frozen release claim.** Under the accepted roadmap, the
   current system may be named **NEXAHEDRON Readiness Alpha** after the other
   gates close. It must not claim evidence-bound Orientation Alpha while there
   is no legitimate production evidence path.
5. **Provide the production ORION boundary or keep it visibly unavailable.** A
   public release that exposes “Begin Orientation” across that boundary needs
   the pinned production Gateway endpoint, health/failure verification,
   request/payload/origin/timeout controls and named incident/rollback
   ownership. Otherwise the public release must stop at the Human-owned
   Orientation Record and state that limit before confirmation.
6. **Resolve or explicitly exclude the clarification lifecycle.** The frozen
   immutable-lineage incompatibility prevents a complete clarification
   resubmission. It may not be hidden, bypassed or presented as complete.
7. **Complete hosted accessibility and browser verification.** Run keyboard,
   focus, screen-reader, zoom, mobile and supported-browser checks on the exact
   deployed revision.
8. **Re-run the complete cross-site link and identity audit.** All public
   NEXAHEDRON, NEXAH, ORION, legal and Visitor Guide targets must resolve from
   an unauthenticated session.

### SHOULD FIX after release

- add automated external-link monitoring for canonical ecosystem and policy
  URLs;
- add automated validation of `CITATION.cff` and final distribution notices;
- add richer structured data only after the published public identity and URLs
  are stable;
- broaden the documented assistive-technology matrix beyond the minimum
  supported release set.

These items must not be used to delay publication once every MUST FIX item is
green.

### Future ideas (ignore for Version 1)

- accounts, cloud persistence, collaboration and synchronization;
- multi-source Encounter;
- additional Orientation modes;
- AI adapters, recommendations or automatic interpretation;
- new ORION contracts or changes to frozen authority;
- Version 2 application capabilities.

## Final GO / NO-GO Decision

**NO-GO for immediate public release.**

The local NEXAHEDRON release candidate is green and the complete Human-owned
Orientation journey is demonstrable. No architectural redesign is required.
The remaining work is release completion: publish an immutable repository and
production origin, freeze operational and legal facts, declare the honest
Readiness Alpha scope, verify the public boundary and complete the hosted
accessibility/browser matrix.

A GO may be issued only when the exact published revision can be reached and
replayed anonymously, every MUST FIX item above is green, and no public surface
claims more than the verified Version 1 responsibility boundary.
