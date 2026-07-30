# NEXAHEDRON Alignment Implementation Impact Matrix

- Status: Non-canonical implementation review
- Purpose: bounded correction plan derived from adopted decisions D1–D6
- Authority: none beyond the adoption record cited below
- Governing decision:
  `docs/governance/NEXAHEDRON_ARCHITECTURE_ALIGNMENT_ADOPTION.md`
- Historical evidence:
  `docs/reviews/NEXAHEDRON_ARCHITECTURE_ALIGNMENT_DRAFT.md`,
  `docs/reviews/NEXAHEDRON_AUTHORITY_CONFLICT_REVIEW.md`, and
  `docs/reviews/NEXAHEDRON_OWNER_DECISION_REVIEW.md`

This matrix records the impact assessment completed before implementation. It
does not create architecture, expand NEXAHEDRON authority, or alter the status
of the adopted decisions.

## Treatment classes

- **Locally normative:** valid only inside an explicitly named NEXAHEDRON
  interaction, presentation, transient-state, or transport-consumer boundary.
- **Scope clarification required:** content remains useful, but its authority
  or implemented status must be bounded explicitly.
- **Active research:** a proposal or specification without adoption by every
  authority it describes.
- **Derived reference:** a local explanation of authority owned elsewhere.
- **Historical / partially superseded:** lineage remains visible, while a
  later decision governs current public presentation.
- **Contradictory:** the statement conflicts with D1–D6 or observed capability
  and must be corrected on a current public surface.

## Impact matrix

| Finding | Current statement or function | D1–D6 | Required correction | Risk | Proposed treatment |
|---|---|---|---|---|---|
| `README.md` | Calls NEXAHEDRON primarily a Human-facing reference implementation and promises a Human-owned Orientation Record | D1, D5 | Lead with public Human-facing research demonstrator; describe the current Rest output as transient and in-memory | High: repository front door overstates role and durability | Correct current front-door text; retain reference implementation as subordinate technical description |
| `docs/architecture/APPLICATION_ARCHITECTURE.md` | Describes the application and Gateway seam but uses stale release-candidate wording and does not separate all four ORION states | D1, D6 | Bound the architecture to demonstrator responsibilities and distinguish Core, compatible Runtime, Gateway reachability, and observed outcome | High: implementation status may be read as certified capability | Scope clarification; do not change frozen Core claims |
| `docs/architecture/AUTHORITY_BOUNDARIES.md` | Generally separates authorities but describes the owned experience as a Laboratory rather than a bounded demonstrator | D1, D3, D6 | Add adopted public role and explicit no-Library-authority / no-runtime-authority statements | Medium | Keep locally normative; clarify scope |
| `docs/EDITORIAL_STRATEGY.md` | “Canonical editorial constitution” for an Orientation Library and Canonical Cases | D2, D3, D4 | Preserve the proposal but mark its original status as historical and its current status as partially superseded for public cases and Library authority | High: claims authority owned elsewhere | Add provenance-preserving status notice only; no large rewrite |
| `docs/rfcs/RFC-0001_OPEN_ORIENTATION_PROTOCOL.md` | “Canonical” repository-wide protocol with ecosystem responsibilities | D4 | Mark as active research in this repository; preserve previous status and content | High: local implementation could appear to create ecosystem authority | Status/scope notice only |
| `docs/rfcs/RFC-0011_ORIENTATION_MEMORY_AND_LANGUAGE_EVOLUTION.md` | “Canonical” memory/language architecture and immutable Orientation Record | D4, D5 | Mark as active research; explicitly state current Rest view does not implement its record contract | High | Status/scope notice only |
| `docs/architecture/EVIDENCE_ARCHITECTURE.md` | “Canonical architectural reference” spanning Library and ORION authority | D3, D4 | Mark as active research / derived reference pending adoption by named owners | High | Status/scope notice only |
| `docs/architecture/EVIDENCE_BINDING_ARCHITECTURE.md` | “Canonical governance decision” spanning source authorities and ORION | D3, D4 | Preserve Option B as historical design decision, but remove implied ecosystem authority from its current status | High | Status/scope notice only |
| `docs/WEBSITE_EXPERIENCE.md` | Prescribes the Laboratory and Orientation Library as a broad public experience | D1–D4 | Mark as historical / partially superseded experience blueprint | Medium | Status notice only |
| `docs/releases/NEXAH_V1_PUBLIC_RELEASE_CLAIM.md` | Canonical coordinated claim; promises inspectable Orientation Record | D1, D5 | Preserve release history but add notice that D1–D6 govern current NEXAHEDRON representation | High | Historical release record; no body rewrite |
| `docs/research/NEXAH_EVALUATION_PROTOCOL.md` | “Canonical research protocol baseline” | D4 | Bound to a NEXAHEDRON-local evaluation reference unless adopted by external owners | Medium | Active research / locally derived evaluation reference |
| Other release/editorial/roadmap records | Numerous historical promises of persistence, Library authority, and complete records | D3–D5 | Do not rewrite historical records in bulk; place them behind current front-door and adoption notices | Medium: archival claims remain searchable | Historical lineage; enumerate in follow-up ledger if canonical publication is requested |
| Root `MANIFESTO.md` | Cross-repository manifesto copy | D4 | Do not edit in this pass; its canonical home and adoption require the owning repository | High: protected constitutional lineage | Derived reference; owner/cross-repository action only |
| Homepage | Product-like claim “helps people orient” and “Orientation Laboratory”; curated and live paths are not distinguished | D1, D2 | State research question, bounded demonstrator role, current capability and separate entry to curated cases vs live experiment | High: first-visitor expectation failure | Correct current public surface in existing visual system |
| Global metadata / titles / OG | “The Orientation Laboratory” and general solution claim | D1 | Use research-demonstrator identity and bounded description | High: search/social previews overclaim | Correct current metadata |
| About | Calls NEXAHEDRON a Workspace and promises a Human-owned Orientation Record | D1, D5, D6 | Explain demonstrator, bounded experiment, transient record and optional ORION boundary concisely | High | Correct current page without adding a new architecture surface |
| Visitor Guide | “Reference implementation”, Orientation Record, and “pinned ORION Version 1 Gateway” without runtime evidence | D1, D5, D6 | Describe public demonstrator, in-memory Working Session Record and separately observable Gateway/Runtime/outcome states | High | Correct current guide |
| Public navigation | “Library” can imply an independent canonical NEXAH Library; “Begin Orientation” implies a delivered solution | D1, D3 | Keep URLs, use “Reference Cases” and “Live Experiment” as visible labels | Medium | Editorial label change only; no route removal or redirect |
| `/library` | Presents “The Orientation Library” as a NEXAHEDRON-owned landscape | D2, D3 | Retain route for bookmarks; present a local read-only Reference Case collection with source and authority limits | High | Preserve route, metadata canonical URL and content structure; relabel surface |
| `/cases` | “Five canonical cases” | D2 | “Five Curated Reference Cases”; disclose Human/editorial authorship and non-live origin | High | Correct current surface |
| Individual case pages | “Canonical Orientation Case”, status Canonical, canonical demonstration lineage | D2 | Use “Curated Reference Case”; show editorial producer, provenance and explicit non-ORION/non-live status | High | Correct shared case data/components and Plate Tectonics page |
| Case data and fixtures | `CaseStatus` includes and fixtures use `Canonical` | D2 | Replace current public status with `Curated Reference Case`; retain source dates and lineage | High | Correct current data and tests; no case deletion |
| Workspace entry `/orient` | Offers session modes without explaining bounded experiment or transient storage | D1, D5, D6 | Add compact experiment agreement before actions: Human input, memory-only state, Rest, optional ORION boundary | High | Add concise semantic section using existing styles |
| Workspace header | “Orientation Session” without live-experiment status | D1 | Identify Live Bounded Experiment and Human-held browser session | Medium | Correct label and supporting text |
| Rest view | “Orientation Record” and “stop without losing the work” | D5 | Call it Working Session Record / Rest View; state it survives only in the open browser state and is lost on reload/close | Critical | Correct current UI and tests |
| Confirmation | “completed session remains intact”; ORION boundary lacks layered status | D5, D6 | Qualify “intact in this browser session”; explain request crosses Gateway toward a compatible Runtime, not directly into certified capability | High | Correct presentation only |
| ORION loading | “being oriented” and “Receiving report” imply successful semantic result | D6 | Describe operational submission and waiting for a contract-shaped outcome; show producer/boundary status | High | Correct wording; no transport change |
| ORION clarification | Correctly preserves lineage but does not clearly identify producer and non-success state | D6 | Label it as an ORION public-contract clarification, not an orientation result | Medium | Add shared outcome provenance/status block |
| ORION boundary failure | Technical failure view lacks a dignified Rest/working-record continuation | D5, D6 | Show Gateway boundary as producer/status/STOP; offer return to the Human-held session | High | Extend presentation callback only |
| ORION runtime error | Error details lack Core/Runtime/Gateway separation and no return path | D5, D6 | Identify received contract type and failure boundary; offer return to Human-held session | High | Extend presentation callback only |
| ORION report | Generic “Orientation Report” can look like certified Core success without evidence of Runtime/Core identity | D6 | Display only verifiable producer (`ORION public Gateway response`), contract type, accepted outcome status and explicit certification non-claim | Critical | Presentation-only status block; do not assert unseen Runtime version |
| API route / Gateway code | Implements transport fallback and boundary errors | D6 | No new integration; keep behavior. Surface only states proven by returned types and local configuration | High if changed | Read-only in this pass except tests if public labels depend on it |
| Public version/release wording | “Version 1” and public preview may imply production product | D1 | Retain factual repository version but pair it with “public research demonstrator / bounded experiment” | Medium | Current metadata/footer/frontdoor correction |
| Tests and fixtures | Assert canonical cases, Laboratory identity, and old record wording | D1, D2, D5, D6 | Replace assertions with adopted terminology and add experiment/storage/ORION-boundary assertions | High | Update only tests coupled to corrected public contract |

## Chosen minimum coherent implementation

1. Preserve `/library` as a stable route. Change its visible role to
   **Reference Cases**. This is clearer than “Case Library” because it avoids
   implying a second NEXAH Library authority.
2. Keep `/cases` and every existing case URL. Classify all current cases as
   **Curated Reference Cases** and expose their Human/editorial origin.
3. Reframe the public front door as a **public Human-facing research
   demonstrator** that contains two distinguishable experiences:
   curated reference cases and one live bounded experiment.
4. Add a compact experiment agreement at `/orient` before either live entry.
   It creates no consent or persistence contract; it discloses the implemented
   boundary.
5. Rename the current Rest output **Working Session Record** and disclose
   memory-only storage at the point of use.
6. Add one reusable, presentation-only ORION boundary summary to loading,
   clarification, boundary failure, runtime error, and report states. It will
   state only what the current transport and returned contract prove.
7. Add provenance-preserving status notices to the small set of documents
   whose current headers assert authority beyond D4. Do not rewrite their
   historical bodies.

## Explicitly deferred

- durable or immutable Orientation Record;
- persistence, export, resume, or synchronization;
- new ORION Runtime integration or Runtime identity discovery;
- changes to NEXAH, ORION, NEXAH-Experience, or the root Manifesto authority;
- removal or redirection of `/library`;
- historical-document cleanup beyond status and scope notices;
- any Rails, LYRA, LUCY, retrieval, RL, or model capability.
