# NEXAH Version 1.0 Release Roadmap

- Status: Proposed release plan
- Review date: 24 July 2026
- Scope: NEXAH ecosystem public release
- Authority: planning only
- Architecture change authority: none

This roadmap does not create a shared software version across independently
versioned NEXAH repositories. “NEXAH Version 1.0” means one public release set:
an immutable manifest identifies the exact Framework, Orientation Language,
ORION, public Experience, NEXAHEDRON reference implementation, protocol,
governance, Library and publication baselines released together.

The release is ready only when that set tells one coherent story and a
first-time visitor can verify its central claim through one real, bounded
orientation session.

# 1. Project Inventory

## 1.1 Logical layers

| Layer | Major artifacts |
|---|---|
| Research | Research portal, foundation studies, validation campaigns, applied cases, findings, Position Paper |
| Orientation Language and Protocol | Orientation Language 1.0, registries, RFC-0001, RFC-0011, Open Orientation Protocol |
| Governance | Ecosystem Constitution, Governance Index, ownership and compatibility policies, Adapter Governance Package, contribution and review rules |
| Certified Core | ORION Version 1 Certified Baseline, System Plate, certified Slices II–IV, canonical proofs and certification gates |
| Framework and reference implementations | NEXAH Framework and Kernel, NEXAHEDRON Laboratory, NEXAH Demonstrator, bounded domain applications |
| Library and publications | Publication Catalog, books, Atlas series, Reading Spaces, Living Atlas, Orientation Cases, editorial registry and source provenance |
| Public experience | `nexah.de`, NEXAH Experience repository, visitor guide, Laboratory and project explanation |
| Visual language | Atlas plates, posters, maps, diagrams, book and Reading Space design |
| Repository and developer experience | READMEs, repository maps, architecture indexes, examples, tests, release records, security, licenses and citation |
| Community and publication | contribution routes, code of conduct, issue routing, release notes, public repositories, hosting, support and archival policy |

These layers already exist. Version 1.0 requires consolidation and publication,
not a new conceptual layer.

## 1.2 Layer assessment

| Layer | Purpose | Primary audience | Current maturity | Missing before 1.0 | Dependencies | Priority | Version 1.0 output |
|---|---|---|---|---|---|---|---|
| Research | Preserve questions, methods, evidence, findings and limits | Researchers, reviewers | Substantial, active, not closed | A short public research state, claim register and explicit open questions | Position Paper, source records | High | One current research overview linked to reproducible records |
| Orientation Language and Protocol | Define stable semantics and participation boundaries | Architects, implementers, researchers | Stable by release assumption; distributed across several documents | One publication status page, reading order, compatibility statement and conformance scope | Governance, identity/version rules | Highest | Immutable protocol publication bundle |
| Governance | Keep authority, change and participation explicit | Maintainers, contributors, institutions | Constitution adopted; package status is not consistently reflected across repositories | Reconcile “Proposed” versus “stable”, name release stewards, publish decision and registry process | Protocol and repository ownership | Highest | One canonical governance index with current status |
| Certified Core | Provide deterministic, immutable orientation artifacts | Developers, reviewers | ORION Version 1 certified | Public repository/tag, release checksums, reproducible external verification and concise consumer guide | Exact Framework pin | Highest | Signed or checksummed ORION Version 1 release |
| Framework | Hold NEXAH semantics, implementations and bounded applications | Developers, researchers | Release candidate; Kernel remains 0.7; local tests green, final public CI not yet green | Owner-approved release identity, final clean CI, immutable artifacts and ecosystem manifest | Language, governance | Highest | Named Framework release with source and wheel |
| NEXAHEDRON | Prove the Human-facing Orientation Laboratory | Participants, designers, developers | Internal Alpha/dev; real architecture and Encounter work exist, no public 1.0 deployment | One complete public session, stable release artifact, privacy/security/accessibility review, release scope and support boundary | Protocol, Encounter, optional certified handoffs | Highest | NEXAHEDRON 1.0 reference release and public Laboratory |
| Library and publications | Preserve works, editions, relationships and editorial provenance | Readers, curators, educators | Rich and publicly browsable; 61 works and multiple Reading Spaces are recorded in the current Experience | Canonical catalog snapshot, edition/provenance review, stable “start here” collection and publication status | Editorial registry, source hosts | High | Versioned catalog and selected Version 1 collection |
| Public experience | Explain the project and route people to the right place | Everyone | `nexah.de` is live and substantial; static Experience remains alpha | Simplified IA, current status, clean separation from NEXAHEDRON, release manifest and verified production smoke test | Library, repositories, legal pages | Highest | `nexah.de` as the canonical public home |
| Visual language | Make orientation relationships legible | Readers, designers, educators | Mature and distinctive | Curated Version 1 set, captions, provenance, accessibility alternatives and status labels | Library and publication rights | Medium | A bounded visual collection, not the full archive |
| Repository and developer experience | Make the work reproducible and navigable | Developers, reviewers, collaborators | Strong individual repositories; ecosystem story remains fragmented | Cross-repository release manifest, common status vocabulary, canonical reading order, clean checkouts and no stale current-state documents | All release components | Highest | Reproducible release set and developer quick start |
| Community and publication | Make participation safe and maintainable | Contributors, adopters | Contribution, security, licensing and conduct documents largely exist | Maintainer roster, response expectations, release support period, issue templates and launch feedback route | Governance, public repositories | High | Public contribution and support boundary |

# 2. Release Model

Version 1.0 is a coordinated publication, not a monolithic package.

The release manifest must record:

- the exact NEXAH Framework commit, package version and artifacts;
- Orientation Language and protocol document versions;
- the exact ORION Version 1 commit and certification baseline;
- the exact `nexah.de` Experience commit and deployment artifact;
- the exact NEXAHEDRON commit and deployment artifact;
- the Library catalog snapshot and selected publication editions;
- the adopted governance documents;
- licenses, checksums, known limitations and compatibility notes;
- the date and authority of the release decision.

No component receives authority from appearing in the same manifest. Existing
ownership and version boundaries remain unchanged.

# 3. Public Sites

## 3.1 `nexah.de`

`nexah.de` is the canonical public and intellectual home of NEXAH.

It alone should own:

- the concise explanation of Orientation and NEXAH;
- the public Position Paper and protocol reading path;
- the current ecosystem status and release manifest;
- the Library, books, Atlas, posters and publication records;
- the research map and current open questions;
- governance, participation, citation and institutional information;
- the canonical links to every repository and reference implementation.

It may explain how NEXAHEDRON works, but it should not maintain a second
operational Orientation Session.

## 3.2 `nexahedron.com`

`nexahedron.com` is the public Orientation Laboratory and reference
implementation.

It alone should own:

- “Begin an Orientation” as its primary entrance;
- the Human Workspace, real Encounter, fragments, relations, Reflection and
  Rest;
- optional bounded external contributions when included in the declared
  release scope;
- the visible confirmation and authority boundaries;
- an inspectable Orientation Record;
- product limitations, session privacy and operational status.

It should explain only enough architecture to establish trust. Canonical
research, protocol, books, governance and Library records remain on
`nexah.de`.

## 3.3 What must not be duplicated

The following must have one canonical home:

- protocol and RFC texts;
- governance and ownership rules;
- Library identities, editions and provenance;
- research claims and evidence;
- ORION certification records;
- publication files and citations;
- release status.

The Laboratory may display a faithful excerpt or reference. It must link back
to the canonical record.

## 3.4 Movement between the sites

The natural public route is:

```text
nexah.de
  → understand the project
  → inspect one case or publication
  → try the Laboratory
  → nexahedron.com
  → complete or rest within one Orientation Session
  → return to the canonical source, Library or project documentation
```

The reverse link must be equally clear:

```text
nexahedron.com
  → “About this method”
  → the relevant canonical page on nexah.de
```

Current audit finding: `nexah.de` is publicly reachable and already contains a
substantial Home, Laboratory, Library, Living Atlas and Orientation threshold.
`nexahedron.com` refused a public connection during this review. The two-site
release boundary therefore does not yet exist publicly.

# 4. NEXAHEDRON Version 1.0 MVP

## 4.1 Required

The reference implementation must prove only these architectural claims:

1. A Human can begin with one genuine question.
2. The question remains the stable anchor of one continuous Workspace.
3. The Human can encounter one real, versioned source inside that Workspace.
4. The Human can keep exact fragments with stable location and provenance and
   return to the source.
5. The Human can explicitly relate fragments without the system inventing the
   relationship.
6. Reflection remains passive, bounded and distinguishable from external
   contributions.
7. Any external contribution in the Version 1 scope is proposed, attributed
   and accepted or rejected by the Human; it never changes the Workspace
   automatically.
8. The Human can Rest without invoking ORION.
9. If the ORION boundary is offered, it is crossed only after explicit Human
   confirmation and only through a frozen public contract.
10. The session produces one immutable, inspectable Orientation Record that
    preserves the question, Human-kept material, relations, decisions,
    provenance, accepted contributions and final Rest state.
11. The complete public path has truthful empty, blocked, unavailable and
    failure states.
12. The release is reproducible, accessible, privacy-bounded and operationally
    supportable.

The single canonical acceptance case is:

```text
“What is Plate Tectonics?”
→ one real source
→ exact fragments
→ Human-authored relations
→ Reflection
→ optional bounded contribution
→ Human decision
→ Rest
→ inspectable Orientation Record
```

One excellent path is enough. General source coverage is not required.

## 4.2 Nice to have

- a second source format;
- a second carefully reviewed Orientation case;
- downloadable print projection of the Orientation Record;
- a second replaceable external participant;
- localized public explanation;
- additional visual accessibility modes.

Nice-to-have items may enter Version 1.0 only after all required items are
green and independently reviewed.

## 4.3 Future

- multi-source comparison;
- shared or persistent Memory;
- cross-session identity;
- accounts, collaboration and synchronization;
- broad source-adapter ecosystems;
- Library writes or automated ingestion;
- provider marketplaces;
- grammar-evolution tooling;
- federated Libraries;
- personalized ranking or recommendations;
- additional ORION modes;
- generalized evidence binding;
- NTO, advanced projection mathematics and alternative reference spaces.

# 5. `nexah.de` Information Architecture

The public website should answer five questions in this order.

## 5.1 Home

Answers:

1. What is Orientation?
2. What is NEXAH?
3. Why does it matter?
4. What exists today?
5. Where can I begin?

Primary actions:

- Read the Visitor Guide.
- Explore the Library.
- Begin in NEXAHEDRON.

The homepage should not make “Enter ORION” the general public action. ORION is
a certified subsystem, not the Human-facing place.

## 5.2 Orientation

- concise definition;
- Human authority;
- representations, relations, boundaries and provenance;
- what NEXAH is not;
- link to the Position Paper;
- link to the protocol path for technical readers.

## 5.3 Library

- Visitor Guide;
- selected Version 1 publications;
- Atlas and visual collection;
- catalog;
- Reading Spaces;
- provenance and edition status.

The Atlas is a Library entrance and relationship view, not a competing top-level
product.

## 5.4 Laboratory

- research process;
- current research questions;
- evidence and validation;
- repository map;
- certified ORION state;
- direct link to the NEXAHEDRON Laboratory.

This page explains the work; it does not duplicate the interactive Workspace.

## 5.5 Participate

- choose a contribution role;
- contribution guide;
- governance and decision process;
- code of conduct;
- security reporting;
- citation and licensing;
- current bounded needs.

## 5.6 About

- purpose and public identity;
- ecosystem responsibilities;
- people and stewardship;
- current release status;
- contact, privacy and legal information.

Recommended primary navigation:

```text
Home · Orientation · Library · Laboratory · Participate · About
```

“Explore” becomes contextual navigation within Orientation and Library rather
than an undefined top-level destination. “Begin Orientation” is a persistent
link to `nexahedron.com`.

# 6. Repository Structure for Version 1.0

## 6.1 Ecosystem structure

Do not merge mature repositories before release. Publish one small ecosystem
manifest that points to immutable component releases:

```text
NEXAH release set
├── NEXAH                 Framework, Language, Research, Governance, Library registry
├── NEXAH-ORION           certified deterministic Core
├── NEXAH-Experience      nexah.de public experience
└── NEXAHEDRON            Human-facing reference Laboratory
```

Each repository retains its own version, tests, changelog, release and
authority. Cross-repository links must use released tags or immutable commits,
never moving branches.

## 6.2 Canonical documentation layout

Within the owning repository, use the existing categories consistently:

```text
README.md                  five-minute entry and current status
docs/
  architecture/           current architecture only
  concepts/               stable conceptual foundations
  development/            implementation and reproduction
  governance/             decisions and participation rules
  papers/                 position and research papers
  releases/               immutable release records
  rfcs/                    protocol specifications
  roadmap/                 current plans, clearly non-authoritative
  historical/             superseded or dated records
examples/                  smallest executable or inspectable proof
```

Books, Atlas files and other publications remain Library artifacts. The code
repository should contain their catalog, provenance, stable references and only
those source assets intentionally released there.

## 6.3 Root README requirements

Every root README must state, above the fold:

- what this repository owns;
- what it explicitly does not own;
- current release status;
- the exact supported entry point;
- how to reproduce it;
- where canonical architecture and governance live;
- which other repository versions it consumes.

## 6.4 Current coherence finding

The individual repositories are unusually well documented, but the ecosystem
still tells more than one current-state story:

- ORION is certified Version 1;
- the Framework is an unnamed release candidate with Kernel version 0.7;
- NEXAH Experience is publicly deployed but calls itself alpha;
- NEXAHEDRON is version `0.1.0-dev.0` and has no reachable public domain;
- release and deployment documents dated 22 July still say publication is
  pending although `nexah.de` is live;
- Adapter governance is assumed stable for this plan but files in the
  NEXAHEDRON repository remain labeled as proposals.

Version 1.0 requires a single status reconciliation, not more architecture.

# 7. Communication and Onboarding

## 7.1 Curious visitor

```text
nexah.de Home
→ Visitor Guide
→ one Orientation Case or Atlas plate
→ NEXAHEDRON
```

## 7.2 Researcher

```text
Position Paper
→ research state and claims
→ RFC-0001
→ RFC-0011
→ validation records and open questions
```

## 7.3 Developer

```text
ecosystem release manifest
→ owning repository README
→ System Plate and authority boundaries
→ smallest executable example
→ tests and conformance
```

## 7.4 Designer

```text
Visitor Guide
→ Human Workspace and Encounter principles
→ visual language and Atlas
→ live NEXAHEDRON session
→ design contribution boundary
```

## 7.5 Potential collaborator

```text
Position Paper
→ current release scope
→ Governance and contribution route
→ current bounded needs
→ issue or proposal template
```

## 7.6 Never show first

Do not begin public onboarding with:

- internal ORION work-package history;
- complete architecture directories;
- historical diagrams;
- speculative roadmaps;
- provider-specific adapter material;
- field mathematics without its research status;
- raw publication catalogs without a curated entrance;
- blocked Runtime or Gateway diagnostics;
- repository topology before purpose.

# 8. Strict Version 2 Deferral

The following are unnecessary for an honest Version 1.0 and must not block it:

- general-purpose orientation across every domain;
- multiple simultaneous sources;
- automatic source discovery or search;
- shared, long-lived or distributed Orientation Memory;
- automatic language evolution;
- multiple model-provider integrations;
- adapter registries or marketplaces beyond the minimum proof;
- accounts, teams and collaboration;
- synchronization and cloud history;
- federated Library identity;
- Library ingestion and publishing workflows;
- automatic evidence extraction;
- recommendations, ranking or personalization;
- semantic interpretation by NEXAHEDRON;
- additional ORION Operators or modes;
- LYRA as an independent public application;
- SIRIUS;
- NTO execution, new geometry or alternative reference frames;
- generalized SDKs, plugins and transport frameworks;
- a complete standards-organization submission.

# 9. Version 1.0 Release Checklist

Status meanings:

- **Complete** — an accepted artifact or reproducible capability exists.
- **Needs revision** — the substance exists but its status, packaging,
  verification or public explanation is not release-ready.
- **Missing** — the required public artifact or proof does not exist.

## 9.1 Research

| Status | Item |
|---|---|
| Complete | Research archive, foundation material, applied cases and validation records exist |
| Complete | Position Paper exists |
| Needs revision | One concise current research state and claim/limit register |
| Needs revision | Public separation of established, candidate, exploratory and historical results |
| Missing | Version 1 research snapshot in the ecosystem release manifest |

## 9.2 Documentation

| Status | Item |
|---|---|
| Complete | Core architecture, authority boundaries and Orientation Language documentation |
| Complete | ORION System Plate and Version 1 Certified Baseline |
| Needs revision | One cross-ecosystem reading order |
| Needs revision | Current versus historical status labels across repositories |
| Needs revision | Public terminology consistency for Framework, Kernel, ORION, Experience and NEXAHEDRON |
| Missing | One concise Version 1 capability-and-limit statement |

## 9.3 Protocol

| Status | Item |
|---|---|
| Complete | RFC-0001 and RFC-0011 are stable by release assumption |
| Complete | Open Orientation Protocol Position Paper |
| Complete | Human authority, Rest, provenance and contribution boundaries are defined |
| Needs revision | Canonical publication status and compatibility page |
| Needs revision | Governance Package repository status must match the approved release assumption |
| Missing | Version 1 protocol bundle with immutable identifiers and checksums |

## 9.4 Repository

| Status | Item |
|---|---|
| Complete | Framework, ORION and Experience have strong READMEs, licenses and reproducibility guidance |
| Complete | Framework has contribution, conduct, security, citation and licensing documents |
| Needs revision | Final public repository identities, tags and immutable cross-links must be verified together |
| Needs revision | Stale release/deployment status documents must be corrected prospectively |
| Needs revision | NEXAHEDRON worktree must become a clean, reviewable release baseline |
| Missing | Ecosystem release manifest |
| Missing | Clean-checkout verification report for the complete release set |

## 9.5 Reference implementation

| Status | Item |
|---|---|
| Complete | ORION Version 1 certified deterministic Core |
| Complete | NEXAH Framework executable implementation and demonstrators exist |
| Complete | NEXAHEDRON Human Workspace and Plate Tectonics Encounter exist locally |
| Needs revision | Framework final public CI and owner-approved release identity |
| Needs revision | NEXAHEDRON must be reduced to and verified against the Version 1 MVP |
| Needs revision | One immutable Orientation Record must close the Human session |
| Missing | Stable public `nexahedron.com` deployment |
| Missing | Public end-to-end acceptance proof for the canonical Plate Tectonics session |
| Missing | Production privacy, security, accessibility and operational verification |

## 9.6 Website

| Status | Item |
|---|---|
| Complete | `nexah.de` is live with Home, Library, Laboratory, Atlas and legal pages |
| Complete | Visitor Guide and substantial publication catalog exist |
| Needs revision | Simplify primary information architecture |
| Needs revision | Remove the duplicate operational Orientation entrance from `nexah.de` once NEXAHEDRON is live |
| Needs revision | Publish current release status and manifest |
| Needs revision | Reconcile live deployment with documents that still say deployment is pending |
| Missing | Reachable `nexahedron.com` |
| Missing | Verified two-site cross-navigation and production smoke test |

## 9.7 Communication

| Status | Item |
|---|---|
| Complete | Public purpose and Human-first principles are clear |
| Complete | Library and visual language provide multiple accessible entrances |
| Needs revision | Separate “learn about NEXAH” from “use NEXAHEDRON” consistently |
| Needs revision | Audience-specific reading paths must be exposed, not only documented internally |
| Missing | Release announcement with exact claims, limits and support boundary |
| Missing | One five-minute demonstration and one independently reproducible walkthrough |

## 9.8 Publication

| Status | Item |
|---|---|
| Complete | Code and documentation licensing is defined in the main repositories |
| Complete | NEXAH has citation metadata |
| Needs revision | Verify rights and provenance for the selected Version 1 books, images and source excerpts |
| Needs revision | Resolve final legal and hosting facts for all public surfaces |
| Missing | Owner-approved release names and tags for every component |
| Missing | Checksums, release notes, changelog and rollback records for the coordinated release |
| Missing | Final release review and signed decision |

# 10. Release Gates

Version 1.0 is ready only when all six gates are green.

## Gate 1 — Claim

- one paragraph defines what Version 1.0 proves;
- the claim does not imply universal validation, autonomous reasoning or
  production evidence coverage;
- current non-capabilities are published beside the claim.

## Gate 2 — Immutable release set

- every component is identified by tag and commit;
- artifacts and documents have checksums;
- dependencies use immutable references;
- no required repository contains unreviewed release changes.

## Gate 3 — Public experience

- `nexah.de` explains the project and routes correctly;
- `nexahedron.com` completes the canonical Human session;
- the same canonical source and provenance are visible throughout;
- the two sites do not compete or duplicate authority.

## Gate 4 — Reproduction

- independent reviewers reproduce the Framework, ORION, Experience and
  NEXAHEDRON release artifacts from clean checkouts;
- public CI is green;
- the canonical acceptance session is replayable;
- failures remain truthful and bounded.

## Gate 5 — Safety and participation

- privacy, retention, logging and prohibited-content rules match reality;
- accessibility and supported-browser review passes;
- security, incident, rollback and support owners are named;
- governance and contribution paths are public.

## Gate 6 — Human review

- at least one researcher, developer, designer and first-time participant
  complete their intended onboarding path;
- critical comprehension and trust failures are resolved;
- release stewards approve the final manifest and public claim.

# 11. Highest-Impact Remaining Tasks

| Rank | Task | Effort class | Why it comes first |
|---:|---|---|---|
| 1 | Approve the exact Version 1.0 public claim and release-set scope | Hours | Every status, MVP and announcement depends on it |
| 2 | Create the ecosystem release manifest and cross-repository reading order | Days | Converts separate mature projects into one inspectable release |
| 3 | Reconcile all current status labels, especially Governance, deployed Experience and proposed adapter documents | Days | Prevents contradictory authority and maturity claims |
| 4 | Assign final component release identities, produce clean commits and obtain green public CI | Days | Creates immutable, publishable baselines |
| 5 | Complete the minimal NEXAHEDRON session through Rest and an immutable Orientation Record | Weeks | Proves the Human-facing claim rather than only describing it |
| 6 | Deploy and verify `nexahedron.com` as the Laboratory | Days | Establishes the missing public product boundary |
| 7 | Refocus `nexah.de` around the six-question information architecture and link its action to NEXAHEDRON | Weeks | Makes the ecosystem understandable without erasing the Library |
| 8 | Complete privacy, security, accessibility, browser, incident and rollback review | Weeks | Makes public participation responsible and supportable |
| 9 | Curate and verify the Version 1 Library/publication set, editions, rights and provenance | Days | Prevents the rich archive from overwhelming or weakening the release |
| 10 | Run external release-candidate review and close only release-blocking findings | Weeks | Tests coherence with real readers before the final declaration |

# 12. Final Assessment

## Is the project ready?

No. The intellectual identity, protocol foundation, certified ORION Core,
Library and public `nexah.de` experience are mature enough for Version 1.0.
The coordinated public release is not yet ready.

The gap is not more theory. It is release convergence:

- no immutable ecosystem release set exists;
- component status statements conflict;
- the Framework lacks its final owner-approved release identity and green final
  public CI;
- NEXAHEDRON remains a local development Alpha;
- `nexahedron.com` is not reachable;
- the two-site responsibility boundary is not yet public;
- the canonical Human session has no independently verified public Version 1
  acceptance proof.

## What the first release should feel like

A first-time visitor arrives at `nexah.de` and understands the project before
meeting its architecture. The first page says, in plain language, that NEXAH
helps people inspect representations, relationships, limits and possible paths
without replacing sources or Human judgment.

The visitor can choose one of three clear actions: read the Visitor Guide,
explore a curated work, or begin an Orientation. The Library feels substantial
but bounded; editions, sources and status are visible. The Laboratory page
shows how the research, protocol and certified Core relate without asking the
visitor to learn the repository structure.

Choosing “Begin an Orientation” opens `nexahedron.com`. One question sits at
the center of a quiet Workspace. A real Plate Tectonics source opens on the
same table. The visitor reads it, keeps exact fragments, relates them, sees
their provenance, writes a reflection and decides whether another bounded
contribution is useful. Nothing silently changes their work. They may stop at
any time.

At Rest, the visitor sees an Orientation Record: not an answer and not a claim
of certainty, but an inspectable account of the question, source, fragments,
relations, decisions, boundaries and remaining uncertainty. Links return to
the original source, the relevant Library record and the public explanation of
the method.

A researcher can follow the evidence and protocol. A developer can reproduce
the released components. A designer can inspect the Human and authority
boundaries. A collaborator can find the right contribution route. Nobody has
to infer which part is current, experimental or historical.

Version 1.0 should feel smaller than the total project and more trustworthy
because of that reduction. Its achievement is not that NEXAH can already do
everything. Its achievement is that one complete orientation experience,
supported by a coherent body of research, protocol, governance, publications
and certified software, is public, inspectable and honest.
