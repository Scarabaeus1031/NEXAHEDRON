# NEXAH Version 1.0 Release Completion Report

**Review date:** 24 July 2026
**Mode:** Release completion, consistency and public verification
**Decision:** **NO-GO**

This report distinguishes three states: implemented locally, verified locally,
and verified on the unauthenticated public web. A local implementation is not
reported as released.

## 1. Remaining Release Blockers

| Blocker | Evidence | Required release action |
|---|---|---|
| The canonical release artifacts are not published from one stable public location | The Position Paper and Public Release Claim exist in the NEXAHEDRON working tree. No ecosystem `NEXAH_V1_RELEASE_MANIFEST.md` exists in the inspected NEXAH repository, and the canonical documents are not reachable from the live public journey. | Publish the final Manifest, Public Release Claim, Position Paper, RFCs and governance with stable canonical URLs; link them from the Visitor Guide and every repository front door. |
| `nexah.de` still serves the pre-curation entrance | The unauthenticated homepage still says “A place for orientation cartography”, links the old illustrated Visitor Guide, and sends “Begin Orientation” to `/threshold/` with “Enter ORION”. | Review and publish the verified Experience build containing the new public headline, canonical Visitor Guide, corrected four-place ecosystem map and NEXAHEDRON handoff. |
| `nexahedron.com` is not publicly reachable | An unauthenticated request ended with `ERR_CONNECTION_RESET`. The configured Sites project has no custom domain and is restricted to one named owner. | Choose and document the production host, attach and validate `nexahedron.com`, enable unauthenticated access, then run the public smoke test. |
| NEXAHEDRON has no public source repository or immutable release revision | The local NEXAHEDRON tree has no configured Git remote and contains extensive uncommitted Alpha work. | Publish an intentionally reviewed source revision, tag it, and link that exact revision from the release manifest. |
| ORION’s certified baseline is not represented by a clean, reviewable repository state | The inspected ORION working tree contains the certified Slice II–IV artifacts as uncommitted files alongside unrelated modifications. | Freeze the accepted files in an intentional commit/tag before the ecosystem manifest names ORION Version 1. |
| Cross-repository Experience verification is red | `pnpm verify` stops because the Experience generator imports `HumanLanguageRequest`, which the current ORION checkout does not export. The isolated Astro check/build/link audit passes. | Pin the Experience to the intended immutable ORION revision or reconcile the build-time generator without changing the certified Core. |
| Legal deployment facts remain incomplete | The operator and contact are known, but production hosting provider, processing location, log recipients/retention, any applicable VAT/W-Id, and data-protection-officer applicability are not confirmed in the public legal record. | Confirm the facts with the operator/host and obtain legal review before publication. |

## 2. Legal & Operational Checklist

This is a release audit, not legal advice. The applicable German provider
information duties are described in
[DDG § 5](https://www.gesetze-im-internet.de/ddg/__5.html); information duties
for personal-data processing are described in
[GDPR Article 13](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32016R0679).
Accessibility duties depend on the service and legal applicability; the public
information requirement for covered services appears in
[BFSG § 14](https://www.gesetze-im-internet.de/bfsg/__14.html).

| Item | nexah.de | nexahedron.com | Release state |
|---|---|---|---|
| Impressum | Operator, address, managing director, email and register are present. Local revision makes it the canonical provider notice for both services. | Local footer links to the canonical nexah.de notice. | **Needs factual review:** add VAT/W-Id only if one exists; verify all DDG-required data. |
| Privacy Policy | Detailed notice exists. Local revision limits its scope to nexah.de. | A service-specific local page documents browser state and the explicit ORION boundary. | **Blocker:** hosting provider, processing location and log retention are not confirmed. |
| Contact | `contact@nexah.de` and a contact route are present. | Local legal pages use the same canonical contact. | Ready after publication. |
| Copyright | Local nexah.de footer names Haptikdesign GmbH and NEXAH. | Existing NEXAHEDRON footer identifies the product but not a copyright owner. | Add one approved ecosystem-wide wording to the NEXAHEDRON public footer. |
| License references | NEXAH, ORION and NEXAH Experience expose code, documentation and scope licenses. | Only a local `LICENSE` was found. | **Blocker:** publish NEXAHEDRON licensing scope and third-party notices. |
| Repository links | Corrected local front doors link NEXAH, ORION and Experience ownership. | Local footer links the public NEXAH source because no NEXAHEDRON repository exists. | **Blocker:** publish and link the responsible NEXAHEDRON repository. |
| Accessibility statement | Implemented locally with support, known limits and contact route. | Implemented locally with support, known limits and contact route. | Publish, then perform keyboard and assistive-technology checks. |
| Security disclosure | NEXAH, ORION and Experience contain `SECURITY.md`; local public links point to the canonical policy. | No NEXAHEDRON security policy was found. | Publish an owning-repository security route before release. |
| Open-source notices | Experience links its licensing scope locally. | No complete notices page was found. | Publish the owning notices and dependencies. |
| Canonical URLs | Astro emits canonical URLs under `https://nexah.de`. | Metadata declares `https://nexahedron.com`. | **Blocker:** the latter URL does not resolve publicly. |
| Footer consistency | Implemented locally: Contact, Accessibility, Privacy, Imprint, Security, Open Source. | Implemented locally: ecosystem map, About, Accessibility, Privacy, Imprint, Security, Open Source. | Not yet publicly verified. |

### Canonical maintenance strategy

Maintain legal operator identity, postal address, representative, register and
contact once on `nexah.de/imprint/`. All NEXAH public services link to that
canonical provider notice. Maintain a separate privacy and accessibility notice
for each service because hosting, storage and interaction differ. Maintain
security and open-source notices in the repository that owns the affected
software. A release owner must review all legal links and dates as one checklist
before each coordinated release.

## 3. Website Readiness

### nexah.de

Implemented locally:

- public-home role is explicit;
- first headline and paragraph describe the ecosystem without making ORION the
  visitor entrance;
- `/visitor-guide/` contains the canonical corrected Version 1 ecosystem map;
- the map contains only nexah.de, NEXAH, ORION and NEXAHEDRON;
- the future-application column and incorrect RFC labels are removed;
- header, footer, privacy, imprint and accessibility routes are reconciled;
- Astro type check, static build and all 206 internal-link checks pass.

Not released:

- the live site still exposes the old first screen and old `/threshold/` handoff;
- the full repository verification is blocked by the ORION export mismatch.

### nexahedron.com

Implemented and verified locally:

- NEXAHEDRON is positioned as the Human-facing reference implementation;
- the Rest sheet is visibly identified as the Human-owned Orientation Record;
- public and Workspace footers link the canonical ecosystem/legal routes;
- service-specific Privacy and Accessibility pages exist;
- production build succeeds;
- all 67 local tests pass.

Not released:

- `nexahedron.com` is not publicly reachable;
- the configured Sites project is owner-only and has no custom domain;
- the public host and its privacy facts are not frozen.

## 4. Repository Readiness

| Repository | Front-door result | Public release result |
|---|---|---|
| NEXAH | Local README now states “Research & Framework”, names its non-responsibilities and links the public journey. | Not yet published. The public repository still contains the previous wording. |
| ORION | Local README now leads with the certified deterministic Core and excludes Runtime, Gateway, LYRA execution and Human authority from the baseline. | Not reviewable as a release until the large dirty working tree is frozen intentionally. |
| NEXAH Experience | Local README now identifies the repository as the public-home implementation and routes visitors onward. | Build is clean; coordinated verify is blocked by the ORION pin/API mismatch. |
| NEXAHEDRON | Local README now identifies the reference implementation and marks the old live integration narrative as historical. | No public repository, remote or release revision exists. |

No architecture document was changed by this sprint. README changes are public
positioning only.

## 5. GitHub Readiness

Unauthenticated inspection confirms that the profile:

- identifies the work as “Orientation cartography · NEXAH”;
- links `nexah.de`;
- exposes NEXAH, NEXAH-ORION and NEXAH-Experience.

Remaining issues:

- no profile README or contextual ecosystem map is visible;
- NEXAHEDRON is absent as a public repository;
- repository descriptions still use pre-freeze language;
- the coordinated release manifest is not pinned as the status authority.

The profile itself is understandable, but it is not yet a complete Version 1
front door.

## 6. Ecosystem Map Implementation Status

The submitted visual was treated as a proposal, not as authority. The canonical
local map corrects the following:

- RFC-0001 is no longer mislabeled;
- Orientation Language is not mislabeled as RFC-0001;
- Future Applications are removed from the Version 1 public map;
- unsupported SDK/interface and component-integration promises are removed;
- numbered “chapters” no longer imply one mandatory linear sequence;
- the map contains four present-tense public responsibilities only.

Canonical placement is `/visitor-guide/` on nexah.de. The homepage contains a
contextual instance. Repository READMEs use compact textual variants. The
NEXAHEDRON public UI links back to the canonical map rather than reproducing an
architecture-heavy diagram inside the Human Workspace.

**Status:** implemented locally; not public.

## 7. Cross-link Verification

| Transition | Local | Public |
|---|---:|---:|
| nexah.de → Visitor Guide | Pass | Fail: live site points to the older illustrated guide |
| Visitor Guide → Position Paper / Release Claim / Manifest | Not complete | Fail |
| Visitor Guide → NEXAH research | Pass | Not published |
| Visitor Guide → ORION baseline | Pass | Not published from the guide |
| Visitor Guide → NEXAHEDRON | Pass | Destination unavailable |
| NEXAHEDRON → Orientation Record | Pass in build/tests | Not publicly executable |
| NEXAHEDRON → canonical legal pages | Pass locally | Not public |
| Repositories → public home / next chapter | Implemented locally | Not published |

The Experience static-link audit reports no broken internal links across 206
generated pages. External-release links cannot be accepted until their target
revisions and domains are public.

## 8. Visitor Walkthrough Verification

An unauthenticated first-time walkthrough was attempted against the public
ecosystem.

1. **Discover NEXAH — partial pass.** `nexah.de` loads and communicates
   orientation cartography.
2. **Understand the ecosystem — fail.** The live site does not expose the
   corrected ecosystem map or the four current responsibilities.
3. **Choose an appropriate path — partial pass.** Library, Laboratory and Atlas
   are available, but the primary visitor route is the older guide.
4. **Begin an Orientation — fail.** The live action opens the old threshold and
   names ORION; the intended `nexahedron.com` destination is unreachable.
5. **Inspect the Orientation Record — fail publicly.** The local Workspace and
   test suite reach the Rest/Orientation Record boundary, but no unauthenticated
   production route exists.
6. **Reach the research — pass.** The Laboratory and GitHub links reach the
   NEXAH research repository.
7. **Identify the responsible repository — partial pass.** NEXAH, ORION and
   Experience are visible; NEXAHEDRON has no public owning repository.
8. **Understand Version 1 limits — fail as one journey.** Boundaries exist in
   individual materials, but the Release Claim and Manifest are not public
   anchors in the visitor route.

The public journey therefore fails at the transition from understanding to
experience.

## 9. Final Release Recommendations

Complete these actions in order; do not add scope:

1. Freeze and publish the exact NEXAH, ORION, Experience and NEXAHEDRON source
   revisions that constitute Version 1.
2. Create the final ecosystem Release Manifest from those immutable revisions
   and publish the Position Paper, Public Release Claim, RFCs and governance at
   stable URLs.
3. Resolve the Experience’s immutable ORION dependency mismatch and obtain a
   fully green coordinated verification.
4. Confirm NEXAHEDRON production hosting, privacy facts, licensing scope,
   security policy and public source repository.
5. Publish `nexahedron.com`, verify DNS/TLS/canonical redirects, then run the
   full unauthenticated Orientation Session through the Orientation Record.
6. Publish the verified nexah.de build and repeat the complete cross-site link,
   keyboard, responsive and legal-footer audit.
7. Update GitHub profile/repository descriptions and pin the release manifest
   as the single status authority.

## 10. Go / No-Go Assessment

**NO-GO for NEXAH Version 1.0 public release.**

The public editorial model is now implemented locally and the two website
builds are independently green at their presentation boundaries. The release
is not yet coherent on the public web: nexah.de is still on the old entrance,
nexahedron.com is unavailable, the NEXAHEDRON source is unpublished, the
coordinated manifest has no verifiable public artifact set, the Experience
cross-repository verification is red, and deployment-specific legal facts are
unfinished.

No architectural work is required to reach GO. The remaining work is release
ownership: freeze, publish, configure, verify and obtain legal sign-off.
