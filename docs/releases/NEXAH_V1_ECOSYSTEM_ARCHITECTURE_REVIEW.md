# NEXAH Version 1.0 Ecosystem Architecture & Narrative Review

- Status: Release review
- Version: 1.0
- Review date: 24 July 2026
- Release gate at start: Gate 1 GREEN
- Authority: narrative and role clarification only
- Architecture change authority: none

This review applies the canonical Public Release Claim, Release Roadmap and
Ecosystem Consistency Audit. It does not redefine architecture, ownership,
protocol semantics or Version 1 scope.

Consistency does not require every surface to repeat the same content. It
requires every surface to identify its own responsibility, its limit and the
next appropriate destination.

## 1. Ecosystem Map

### 1.1 Finding

The proposed sequence is coherent as a list of major public components, but it
is not coherent as a single dependency chain:

```text
NEXAH
↓
nexah.de
↓
NEXAH Repository
↓
ORION
↓
NEXAHEDRON
↓
Future applications
```

It incorrectly implies that:

- the website owns the repository;
- the repository is a required step before ORION;
- ORION is the only route to NEXAHEDRON;
- NEXAHEDRON is the parent of future applications; and
- every visitor must traverse every layer.

The frozen architecture supports a clearer ecosystem map:

```text
                         NEXAH
                The Orientation Ecosystem
                              │
          ┌───────────────────┼───────────────────┐
          │                   │                   │
          ▼                   ▼                   ▼
      nexah.de        NEXAH Repository        Protocol and
   Public home        Research & Framework   Orientation Language
          │                   │                   │
          │                   ├──────────┐        │
          │                   │          │        │
          ▼                   ▼          ▼        ▼
 Library · Atlas           Research     ORION   Implementers
 Books · Papers          Framework   Certified
 Visitor Guide          Experiments     Core
          │                              │
          └──────────────┬───────────────┘
                         ▼
                    NEXAHEDRON
             Human-facing Reference
                  Implementation
                         │
                         ▼
               Orientation Session
               and Orientation Record
```

Future applications may implement the protocol or use certified components,
but they remain siblings of NEXAHEDRON beneath the NEXAH ecosystem. They do
not inherit authority from NEXAHEDRON.

### 1.2 Public hierarchy

The most coherent public hierarchy is:

1. **NEXAH** is the name of the complete ecosystem.
2. **`nexah.de`** is its canonical public entrance and routing surface.
3. **The NEXAH Repository** preserves the scientific and framework lineage.
4. **The Orientation Language and Open Orientation Protocol** define stable,
   implementation-independent language and participation boundaries.
5. **ORION** is the certified deterministic Core.
6. **NEXAHEDRON** is one Human-facing reference implementation.
7. **The Library, Atlas, books and papers** preserve the public intellectual
   record and are reached through `nexah.de`.

This is a role hierarchy, not a transfer-of-authority hierarchy. Each component
retains the authority assigned by the frozen architecture.

## 2. Repository Roles

### 2.1 NEXAH Repository

**Purpose**

Preserve and organize the research, scientific validation, language,
framework, experiments and historical development from which the Version 1
ecosystem emerged.

**Audience**

Researchers, scientific reviewers, framework developers, advanced readers and
contributors who need the full intellectual and technical record.

**Responsibility**

The repository owns its research corpus and Framework implementation areas,
including:

- JANUS;
- IEEE validation;
- the Human Field;
- Orientation Cartography;
- Orientation Language;
- Framework and Kernel work;
- architecture records;
- research papers;
- experiments;
- domain applications;
- historical development;
- explicit evidence, limitations and research status.

**Non-responsibility**

It is not the general public landing page, the certified ORION repository, the
Human-facing Laboratory, the canonical host of the public websites or the
owner of Human judgment.

**Narrative role**

This repository tells the chapter: **“Where did NEXAH come from, what has been
investigated, and what can be inspected or reproduced?”**

Its scientific depth is an asset. The problem is not the presence of advanced
material; the problem is a front door that does not first explain the
repository's role within the larger ecosystem.

**Visitor transition**

- General visitors return to `nexah.de`.
- Protocol implementers continue to the Orientation Language and RFCs.
- Core reviewers continue to ORION.
- People wishing to use the system continue to NEXAHEDRON.
- Contributors continue to the repository's research, Framework or governance
  contribution route.

### 2.2 ORION Repository

**Purpose**

Publish and preserve the certified deterministic Core and its frozen
certification record.

**Audience**

Protocol implementers, software reviewers, reproducibility reviewers,
researchers evaluating deterministic orientation and application developers
who need a certified Core boundary.

**Responsibility**

ORION owns only the responsibilities certified by its Version 1 baseline:

- immutable structural representation;
- structural inventory, summary and statistics;
- certified Relations;
- certified Navigation;
- certified Orientation Map;
- certified Expression;
- canonical serialization, provenance, deterministic replay and certification
  boundaries.

**Non-responsibility**

ORION does not own the public website, Human Workspace, Encounter, Reflection,
Rest, Human meaning, Library identity, presentation, Runtime, Gateway, LYRA
execution, Human Reports, applications or decisions.

**Narrative role**

ORION tells the chapter: **“Which deterministic responsibilities have been
implemented, externally checked and frozen?”**

**Visitor transition**

- Readers needing the conceptual purpose return to `nexah.de` or the Position
  Paper.
- Implementers continue to the protocol and certified reading order.
- Humans wishing to experience orientation continue to NEXAHEDRON.
- Reviewers continue to proofs, certification documents and reproducibility
  instructions.

### 2.3 NEXAH Experience Repository

**Purpose**

Own the source, deployment and verification of the editorial public experience
at `nexah.de`.

**Audience**

Website maintainers, editorial designers, accessibility reviewers, deployment
reviewers and contributors to the public intellectual home.

**Responsibility**

It owns:

- public presentation at `nexah.de`;
- site navigation;
- Visitor Guide presentation;
- Library, Atlas and Reading Space presentation;
- editorial routes;
- deployment and accessibility of the public home;
- temporary interaction state belonging to that site.

**Non-responsibility**

It does not own NEXAH research, protocol semantics, ORION certification,
Library identity, the NEXAHEDRON Workspace or Human interpretation.

**Narrative role**

This repository tells the chapter: **“How is the NEXAH public and intellectual
home published?”**

**Visitor transition**

The README should direct non-maintainers to `nexah.de`, NEXAHEDRON or the
canonical source repository rather than asking them to understand the site's
implementation history.

### 2.4 NEXAHEDRON Repository

**Purpose**

Provide the Human-facing reference implementation of the Open Orientation
Protocol.

**Audience**

First-time participants, Human-computer interaction reviewers, product
designers, protocol implementers and developers evaluating the reference
experience.

**Responsibility**

NEXAHEDRON owns:

- the continuous Human Workspace;
- Question Anchor;
- Encounter with a real source;
- Human-kept fragments and relationships;
- Reflection;
- Rest;
- explicit Human confirmation;
- local session presentation;
- the inspectable Orientation Record;
- truthful unsupported, unavailable and boundary states.

**Non-responsibility**

It does not own Orientation Language, protocol authority, NEXAH research,
Library source identity, ORION certification, Human meaning or decisions.
Its interface is not a requirement for other implementations.

**Narrative role**

NEXAHEDRON tells the chapter: **“What does one complete Human Orientation
Session feel like?”**

**Visitor transition**

- Participants return to the relevant canonical source or Library record.
- Curious visitors continue to `nexah.de`.
- Implementers continue to the protocol.
- Core reviewers continue to ORION.
- Product contributors continue to NEXAHEDRON's contribution boundary.

### 2.5 Other and future applications

**Purpose**

Demonstrate or apply bounded NEXAH responsibilities in declared domains.

**Audience**

Domain practitioners, application developers and reviewers of a particular
use.

**Responsibility**

Each application owns only its declared domain interaction, presentation and
application-specific state.

**Non-responsibility**

No application redefines NEXAH, the protocol, ORION, Library authority or Human
authority. Future applications are outside the Version 1 release unless named
in its immutable manifest.

**Narrative role**

Applications tell the chapter: **“How can the existing orientation structure
appear in one bounded context?”**

**Visitor transition**

Every application must link back to its governing protocol, source authority,
current status and the NEXAH public home.

## 3. Website Roles

### 3.1 `nexah.de`

**Purpose**

The canonical public and intellectual home of NEXAH.

**Audience**

Everyone: curious visitors, researchers, designers, developers, possible
collaborators and institutions.

**Responsibility**

It owns public explanation and routing:

- what Orientation is;
- what NEXAH is;
- why it matters;
- what exists today;
- the Position Paper;
- the public release claim and manifest;
- Visitor Guide;
- Library, Atlas, books, posters and papers;
- public research map;
- governance, participation, citation and repository links;
- handoff to NEXAHEDRON.

**Non-responsibility**

It does not own the canonical research files, protocol source, ORION
certification or the operational Human Workspace. It may summarize and link,
but it must not become a second NEXAHEDRON.

**Narrative role**

It tells the opening chapter: **“What is this ecosystem, why does it exist, and
where should I go?”**

**Visitor transition**

The visitor chooses a route:

- understand through the Position Paper;
- read through Library and Atlas;
- investigate through the NEXAH Repository;
- verify through ORION and protocol;
- participate through NEXAHEDRON;
- contribute through the appropriate repository.

### 3.2 `nexahedron.com`

**Purpose**

The public home of the NEXAHEDRON reference implementation.

**Audience**

Humans who want to complete one Orientation Session and reviewers validating
the reference experience.

**Responsibility**

It owns the executable Human experience:

- begin with one question;
- encounter one real source;
- keep exact fragments;
- create Human-authored relationships;
- reflect;
- rest;
- inspect the Orientation Record.

**Non-responsibility**

It should not duplicate the Library catalog, Position Paper, RFC corpus,
research archive, ORION certification or governance system. It links to their
canonical homes.

**Narrative role**

It tells the experiential chapter: **“Use the orientation process once.”**

**Visitor transition**

After a session, the Human can:

- return to the source;
- follow a canonical Library record;
- understand the method at `nexah.de`;
- inspect the protocol;
- inspect ORION when relevant;
- contribute to NEXAHEDRON.

### 3.3 GitHub public profile

**Purpose**

Provide the technical directory of the public ecosystem.

**Audience**

Developers, reviewers, researchers and contributors.

**Responsibility**

It owns repository discovery, not project explanation. It should identify the
canonical repositories, their roles, current release state and public homes.

**Non-responsibility**

It does not replace `nexah.de`, the release manifest, the Visitor Guide or
governance.

**Narrative role**

It tells the index chapter: **“Where does each body of work live?”**

**Visitor transition**

Every pinned repository should route to `nexah.de`, the release manifest and
the next role-specific repository.

## 4. Narrative Flow

### 4.1 Recommended flow

The proposed sequence:

```text
Discover
→ Understand
→ Research
→ Build
→ Experience
→ Apply
→ Contribute
```

contains the right chapters but is too linear. A curious visitor should not
have to research or build before experiencing NEXAH, and a researcher should
not have to use the reference application before inspecting evidence.

The stronger Version 1 narrative is:

```text
Discover
↓
Understand
↓
Choose a path
├── Research
├── Build and Verify
└── Experience
↓
Apply within a declared boundary
↓
Contribute to the responsible surface
```

This flow preserves distinct audiences:

- **Discover** — encounter the central idea at `nexah.de`.
- **Understand** — read the Visitor Guide, Public Release Claim or Position
  Paper.
- **Research** — enter the NEXAH Repository, papers, Library and Atlas.
- **Build and Verify** — inspect the protocol, Orientation Language and ORION.
- **Experience** — complete the NEXAHEDRON reference session.
- **Apply** — use only a declared Version 1 application or case.
- **Contribute** — enter through the repository that owns the proposed change.

### 4.2 Narrative invariant

Every surface should state:

```text
This is the chapter you are reading.
This is what this chapter can establish.
This is where the next chapter lives.
```

It should not reproduce the complete ecosystem explanation.

## 5. Cross-link Architecture

### 5.1 Canonical-link rule

Every concept or artifact has one canonical home. Other surfaces may provide a
short faithful description and a link.

| Subject | Canonical home | Permitted elsewhere |
|---|---|---|
| Public identity and first entrance | `nexah.de` | One-sentence role statement and link |
| Coordinated Version 1 status | Ecosystem release manifest | Status excerpt with exact manifest link |
| Public Release Claim | Canonical release document | Unchanged excerpt or direct link |
| Position Paper | Canonical public publication route | Abstract and citation |
| Orientation Language | NEXAH Repository canonical language area | Versioned reference |
| RFC-0001 and RFC-0011 | Canonical RFC publication area | Exact version link |
| Governance | Canonical governance index | Applicable rule and link |
| Research and experiments | NEXAH Repository | Curated public introduction |
| Library identity and provenance | Library registry | Faithful presentation |
| ORION certification | ORION repository | Certification reference |
| Human reference session | NEXAHEDRON | Invitation and status link |
| Orientation Record | The completed NEXAHEDRON session/export | Reference from relevant source or session page |

### 5.2 Required cross-links

**From every repository**

- NEXAH ecosystem home;
- ecosystem release manifest;
- repository role and non-role;
- canonical documentation for its responsibility;
- contribution route;
- adjacent next destination.

**From `nexah.de`**

- Position Paper;
- Visitor Guide;
- Library and Atlas;
- NEXAH Repository;
- protocol and governance;
- ORION certified baseline;
- NEXAHEDRON session;
- coordinated release manifest.

**From NEXAHEDRON**

- NEXAH public home;
- source and Library provenance;
- protocol;
- privacy and limitations;
- reference implementation source;
- ORION only when the session actually crosses or cites that boundary.

**From ORION**

- certified Version 1 baseline;
- reproducibility instructions;
- protocol;
- NEXAH public explanation;
- NEXAHEDRON as the Human-facing reference implementation.

### 5.3 Link-direction rule

Links should follow authority:

- summaries link to canonical sources;
- implementations link to specifications;
- applications link to certified dependencies;
- presentations link to provenance;
- historical documents link forward to current authority;
- canonical documents do not depend on explanatory copies.

## 6. Ownership Matrix

| Surface | Owns | Does not own | Primary audience | Natural next destination |
|---|---|---|---|---|
| NEXAH ecosystem | Shared identity and coordinated public release | Component implementation authority | Everyone | `nexah.de` |
| `nexah.de` | Public explanation, intellectual home and routing | Core, protocol, research files, Workspace | General visitors | Chosen role-specific path |
| NEXAH Repository | Research, Framework, Orientation Language, experiments and history | Public landing, certified ORION, Human Workspace | Researchers and framework developers | Paper, protocol, ORION or NEXAHEDRON |
| Library | Work, edition and editorial provenance | Human meaning, ORION behavior | Readers and curators | Source, related publication or session |
| ORION | Certified deterministic Core | Runtime, presentation, Human meaning and decisions | Implementers and reviewers | Proofs, protocol or NEXAHEDRON |
| NEXAH Experience | Implementation and deployment of `nexah.de` | Research authority, Core, Workspace | Website maintainers | Live site or owning source |
| NEXAHEDRON | Human-facing Workspace and reference session | Protocol, Library or Core authority | Participants and HCI reviewers | Record, source, `nexah.de` or protocol |
| GitHub profile | Repository directory | Canonical intellectual explanation | Technical visitors | Appropriate repository |
| Bounded applications | Declared domain presentation and use | Ecosystem-wide authority | Domain users | Governing source and contribution route |

## 7. Visitor Journey

### First-time curious visitor

1. Arrives at `nexah.de`.
2. Reads one plain-language definition of NEXAH.
3. Sees what Version 1 proves and intentionally excludes.
4. Chooses one of three dignified paths:
   - read;
   - inspect;
   - begin an Orientation.
5. Reads the Visitor Guide or one selected Library/Atlas entry.
6. Opens NEXAHEDRON.
7. Completes the bounded reference session.
8. Inspects the Orientation Record.
9. Returns to the source, project explanation or relevant repository.

The visitor is never required to understand repository names before
experiencing the project.

## 8. Developer Journey

1. Begins at the ecosystem release manifest.
2. Reads the Public Release Claim and component map.
3. Chooses the intended responsibility:
   - protocol implementation;
   - ORION verification;
   - NEXAHEDRON reference implementation;
   - public-site contribution;
   - Framework contribution.
4. Reads the owning repository's responsibility and non-responsibility.
5. Inspects the exact frozen input documents and dependency revisions.
6. Runs the repository's bounded reproduction or verification path.
7. Proposes changes only in the owning repository.

The developer should not infer architecture from package names or historical
phase documents.

## 9. Research Journey

1. Begins with the Position Paper or public research overview.
2. Enters the NEXAH Research & Framework Repository.
3. Selects a documented area such as JANUS, IEEE validation, Human Field,
   Cartography or an experiment.
4. Reads its status, method, evidence, limitations and historical context.
5. Follows citations into papers, Library records, Atlas plates or datasets.
6. Distinguishes research findings from released language and certified Core
   behavior.
7. Reproduces or challenges the relevant work.
8. Contributes through the research or Framework governance path.

The full research archive remains available. Progressive entry and status
labels make depth navigable without flattening it.

## 10. Recommended README Positioning

These are positioning requirements, not replacement README drafts.

### NEXAH Repository

The first screen should say:

> This is the Research & Framework Repository of the NEXAH Orientation
> Ecosystem. It preserves the scientific, linguistic, architectural,
> experimental and historical work from which Version 1 emerged. The public
> entrance is `nexah.de`; the Human-facing reference implementation is
> NEXAHEDRON; the certified deterministic Core is ORION.

Immediately follow with:

1. repository role;
2. what it contains;
3. current maturity by responsibility;
4. what it does not own;
5. a research-area index;
6. canonical Version 1 links;
7. contribution routes.

JANUS, IEEE validation, Human Field, Cartography, papers and experiments should
remain visible as first-class research territories.

### ORION

The first screen should say:

> ORION is the certified deterministic Core of the NEXAH Orientation
> Ecosystem. Version 1 certifies structural Representation, UNDERSTAND,
> Relations, Navigation, Orientation Map and Expression through immutable,
> reproducible boundaries.

It must immediately state the explicit exclusions of the certified baseline
and link first to the Version 1 Certified Baseline and reproduction path.

### NEXAH Experience

The first screen should say:

> This repository publishes `nexah.de`, the public and intellectual home of
> NEXAH. It owns presentation and routing, not NEXAH research, protocol
> semantics, ORION certification or the NEXAHEDRON Workspace.

General visitors should be routed to the live site before implementation
history.

### NEXAHEDRON

The first screen should say:

> NEXAHEDRON is the Human-facing reference implementation of the Open
> Orientation Protocol. Version 1 demonstrates one bounded Orientation Session
> from question and real source through fragments, relationships, Reflection,
> Rest and an inspectable Orientation Record.

It should then state current availability, exact Version 1 scope, privacy and
unsupported capabilities before development history.

### Other application repositories

Each should open with:

1. the declared domain;
2. its exact NEXAH dependency;
3. what it demonstrates;
4. what it cannot establish;
5. current status;
6. governing source and contribution route.

## 11. Recommended Website Positioning

### `nexah.de`

Position as:

> The public and intellectual home of the NEXAH Orientation Ecosystem.

Its primary questions are:

- What is Orientation?
- What is NEXAH?
- Why does it matter?
- What exists today?
- Where should I begin?

It should provide equal dignity to:

- understanding the work;
- entering the Library and Atlas;
- inspecting research;
- verifying protocol and Core;
- beginning the reference Orientation Session.

It should not host a second operational Orientation flow.

### `nexahedron.com`

Position as:

> The Human-facing NEXAHEDRON Orientation Laboratory and Version 1 reference
> implementation.

Its primary question is:

- What are you trying to understand?

Architecture explanation should be limited to what establishes trust,
provenance, authority and limitations during the session.

### GitHub

Position as the technical directory. Repository descriptions should follow one
pattern:

```text
[Repository role] within the NEXAH Orientation Ecosystem.
```

The profile should link first to `nexah.de` and the Version 1 manifest, not
attempt to reproduce the complete public narrative.

## 12. Recommended GitHub Organization Structure

No new ownership structure is required for Version 1. The public repository set
should be presented in this order:

1. **NEXAH** — Research & Framework Repository;
2. **NEXAH-ORION** — Certified deterministic Core;
3. **NEXAHEDRON** — Human-facing reference implementation;
4. **NEXAH-Experience** — source of the public intellectual home.

The GitHub profile or organization front door should contain:

- one sentence defining NEXAH;
- a link to `nexah.de`;
- a link to the immutable Version 1 manifest;
- the four repositories with one-line roles;
- a visible separation between current, historical and experimental
  repositories;
- contribution and security links.

Historical repositories may remain public. Their descriptions should identify
their historical status and point to the current owning repository. They
should not occupy canonical profile positions.

The GitHub structure must not imply that all repositories share one package
version, release lifecycle or authority.

## 13. Remaining Inconsistencies

### ✓ Release Blocker

1. **No authoritative public release spine.** The immutable manifest and
   cross-repository reading order are not yet the shared public reference.
2. **The public NEXAH repository front door tells the historical experimental
   cartography story without first identifying the repository as Research &
   Framework within the complete ecosystem.**
3. **The current ORION front door conflicts with the certified baseline** by
   assigning Runtime, Gateway, reports or LYRA behavior to Version 1.
4. **NEXAHEDRON is not yet a publicly verifiable Version 1 reference
   implementation.**
5. **The reachable public Orientation entrance does not demonstrate the
   canonical NEXAHEDRON session and Orientation Record.**
6. **The canonical Position Paper, Public Release Claim, RFCs, governance and
   certified baseline do not yet form one complete public reading path.**
7. **Component status and coordinated-release status remain conflated** across
   Alpha, development, release-candidate, certified and Version 1 labels.

### ✓ Important Before Release

1. Every repository needs a first-screen role, non-role, maturity, dependency
   and next-destination panel.
2. The terms Framework, Kernel, Laboratory, Report and Orientation Record need
   unambiguous owners at every current public occurrence.
3. The Visitor Guide does not yet act as the complete role-based routing layer.
4. GitHub descriptions and canonical pins do not yet present the ecosystem as
   one coordinated repository set.
5. Library, Atlas, books and research areas need consistent canonical-edition
   and status labels.
6. Historical and pre-deployment records remain too easy to mistake for
   current instructions.
7. The shared visual family is not yet matched by equally consistent
   repository headers and release-state cues.

### ✓ Version 2

1. Additional reference applications.
2. Broad application catalogs beyond the exact Version 1 manifest.
3. Adapter ecosystems and provider participation not required by the frozen
   Version 1 acceptance session.
4. Shared Memory, collaboration, synchronization and cross-session identity.

These Version 2 items do not block the narrative coherence of Version 1 and
must not be introduced to solve a publication problem.

## Closing Assessment

The ecosystem architecture is coherent when expressed as one identity with
several bounded public chapters:

```text
NEXAH names the whole.
nexah.de explains and routes.
The NEXAH Repository preserves research and Framework depth.
The protocol defines participation.
ORION certifies deterministic responsibility.
NEXAHEDRON demonstrates the Human experience.
Applications remain bounded uses.
```

No research needs to be removed, hidden or reduced. The release problem is not
excess depth. It is insufficient role framing at the entrances to that depth.

Version 1 becomes coherent when every surface says what chapter it contains,
what it cannot establish and where the reader should continue.
