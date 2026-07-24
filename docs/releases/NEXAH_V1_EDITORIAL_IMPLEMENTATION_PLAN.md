# NEXAH Version 1.0 Editorial Implementation Plan

- Status: Release implementation plan
- Version: 1.0
- Review date: 24 July 2026
- Release gate at start: Gate 1 GREEN
- Scope: editorial presentation and public navigation only
- Architecture change authority: none
- Version 2 authority: none

This plan translates the canonical Public Release Claim, Release Roadmap,
Ecosystem Consistency Audit, Ecosystem Architecture & Narrative Review and
Ecosystem Editorial Guide into concrete public-surface changes.

It introduces no new architecture, capability or authority. Scientific
research, experiments, papers, validation, history and specialist material
remain intact. Only their entrances and transitions are clarified.

## 1. Public Ecosystem Map

### 1.1 Review of the submitted visual

The submitted overview is a strong design proposal. It already provides:

- one visible ecosystem identity;
- distinct role columns;
- a central Human-authority statement;
- a shared-foundations area;
- audience-specific journeys;
- a consistent visual family;
- a useful “ecosystem at a glance” key;
- explicit authority boundaries.

Its basic form is suitable for a museum floor plan or subway map. Its current
content is not yet suitable as the canonical Version 1 public map.

### 1.2 Required corrections

| Finding | Why it matters | Required correction | Classification |
|---|---|---|---|
| Open Orientation Protocol is labeled `RFC-0011` | The canonical protocol is RFC-0001 | Label it `Open Orientation Protocol · RFC-0001` | ✓ Release Blocker |
| Orientation Language is labeled `RFC-0001` | RFC-0001 is the protocol; RFC-0011 is Orientation Memory & Language Evolution, not the Orientation Language itself | Label it `Orientation Language 1.0`; do not assign RFC-0011 to it | ✓ Release Blocker |
| “Future Applications” appears as a Version 1 chapter | Future applications are outside the frozen release | Remove the column from the canonical Version 1 map; include only a named bounded application if it is present in the immutable Version 1 manifest | ✓ Release Blocker |
| “Optional participation by ORION or other systems” appears under NEXAHEDRON | “Other systems” implies adapter participation outside Version 1 | Replace with `Optional boundary to the certified Core when explicitly offered and confirmed` | ✓ Release Blocker |
| Developer journey promises `ORION SDK / Interfaces` | No Version 1 SDK is part of the canonical claim | Replace with `ORION certified baseline and proofs` | ✓ Release Blocker |
| Builder journey promises component integration | A general integration surface is not a Version 1 claim | Route builders through Protocol → certified artifacts → reference implementation → bounded contribution | ✓ Release Blocker |
| The five columns are numbered “Chapter 1–5” | Numbering implies a mandatory sequence, while the canonical routes branch | Remove chapter numbers; retain role names | ✓ Important Before Release |
| “One Ecosystem. Many Roles. One Orientation.” | “One Orientation” may imply one final map or authority | Use `One ecosystem. Distinct roles. One coherent journey.` | ✓ Important Before Release |
| Internal `Gate 1: GREEN` appears as ecosystem status | Release gates are operational controls, not durable public identity | Replace with a linkable `Version 1 release status`; keep gate detail in the manifest | ✓ Important Before Release |
| The poster contains purpose, principles, roles, foundations, journeys, status and keys simultaneously | It explains more than a navigation map needs to explain | Produce a compact primary map; retain the full poster as a secondary downloadable overview | ✓ Important Before Release |
| Researcher route passes through ORION and NEXAHEDRON Experiments | Research does not require either component | Route Researcher to NEXAH Repository → evidence/papers → Library; offer ORION as a separate verification branch | ✓ Important Before Release |
| NEXAHEDRON and ORION columns contain implementation detail at equal visual weight to their role | First-time visitors need destinations before internal capability inventories | Lead with role and next action; move capability lists to expanded detail | ✓ Important Before Release |

### 1.3 Corrected Version 1 map

The canonical public map should contain four primary destinations:

```text
                              NEXAH
                     The Orientation Ecosystem
                                  │
                    Human authority remains central
                                  │
          ┌───────────────────────┼───────────────────────┐
          │                       │                       │
          ▼                       ▼                       ▼
       nexah.de            NEXAH Repository             ORION
   Public & intellectual     Research & Framework   Certified deterministic
          home                     record                    Core
          │                       │                       │
          ├───────────────┐       │                       │
          │               │       │                       │
          ▼               ▼       ▼                       ▼
   Library · Atlas   Visitor Guide · Papers      Certified artifacts
          │               │                               │
          └───────────────┴───────────────┬───────────────┘
                                          ▼
                                     NEXAHEDRON
                              Human-facing reference
                                   implementation
                                          │
                                          ▼
                                Orientation Session
                                and Orientation Record
```

This map expresses public roles, not software dependencies. The paths are
bidirectional where a visitor may return to the public home, source, Library or
owning repository.

### 1.4 Map labels

Each primary destination must contain exactly:

1. name;
2. role;
3. one-sentence responsibility;
4. one non-responsibility;
5. one next action.

| Destination | Responsibility | Non-responsibility | Next action |
|---|---|---|---|
| `nexah.de` | Explains NEXAH and routes visitors | Does not execute the reference Orientation Session | Choose a path |
| NEXAH Repository | Preserves research, Framework and intellectual lineage | Is not the public landing page or certified Core | Explore the research map |
| ORION | Publishes the certified deterministic Core | Does not interpret, decide or present the Human Workspace | Inspect the certified baseline |
| NEXAHEDRON | Demonstrates one complete Human Orientation Session | Does not own protocol, source identity, Core authority or Human meaning | Begin an Orientation |

### 1.5 Shared foundations

The primary map may list these existing foundations:

- Orientation Language 1.0;
- Open Orientation Protocol · RFC-0001;
- canonical governance;
- Public Release Claim;
- Version 1 Release Manifest;
- provenance and integrity.

RFC-0011 remains available through the protocol and research paths. It is not
presented as the Orientation Language or as a required first-screen foundation.

### 1.6 “You are here”

Every contextual use of the map must highlight exactly one current location:

- blue: `nexah.de`;
- navy: NEXAH Repository;
- green: ORION;
- violet: NEXAHEDRON;
- neutral: ecosystem manifest or GitHub index.

The highlight states location only. It does not indicate rank or authority.

## 2. Canonical Placement of the Ecosystem Map

### 2.1 Canonical location

The canonical editorial location is the **Visitor Guide on `nexah.de`**, under
the heading:

> How the NEXAH ecosystem is organized

This is the correct location because the Visitor Guide owns public orientation
across roles. It can explain the map without turning the homepage into an
architecture document or asking a repository to define the whole ecosystem.

The canonical map artifact must have:

- stable public URL;
- version label;
- accessible text equivalent;
- source and revision;
- alt text;
- links from each destination;
- explicit statement that it maps roles, not authority transfer or software
  execution.

### 2.2 Secondary placements

| Surface | Form | Highlight | Purpose |
|---|---|---|---|
| `nexah.de` homepage | Compact four-destination strip | `nexah.de` | Help visitors choose a path |
| Version 1 Release Manifest | Immutable full map and exact component revisions | Neutral | Bind editorial roles to released artifacts |
| About page | Compact ecosystem overview | `nexah.de` | Explain stewardship and boundaries |
| NEXAH README | Cropped contextual map plus link to canonical map | NEXAH Repository | Establish repository role |
| ORION README | Cropped contextual map plus link | ORION | Establish Core role |
| NEXAHEDRON README | Cropped contextual map plus link | NEXAHEDRON | Establish reference-implementation role |
| NEXAH Experience README | Cropped contextual map plus link | `nexah.de` | Establish website-source role |
| GitHub profile | Four-item text or compact SVG index | Neutral | Route technical visitors |

### 2.3 Placements not recommended

- Do not make the full poster the homepage hero.
- Do not duplicate the map source independently in every repository.
- Do not embed release-gate details in the evergreen Visitor Guide map.
- Do not make the map a mandatory precondition for beginning an Orientation.
- Do not show a future-applications destination in Version 1.
- Do not use the map as an architecture or dependency specification.

## 3. Homepage Implementation

### 3.1 `nexah.de`

**FIRST HEADLINE**

> NEXAH — The Orientation Ecosystem

**FIRST PARAGRAPH**

> NEXAH helps people work with questions, sources, relationships, boundaries,
> uncertainty and provenance without transferring Human judgment to software.

**ROLE STATEMENT**

> `nexah.de` is the public and intellectual home of NEXAH.

**OWNERSHIP STATEMENT**

> This site explains the ecosystem, publishes its public reading paths and
> routes visitors to its Library, research, protocol, certified Core and
> reference implementation.

**NON-OWNERSHIP STATEMENT**

> It does not own the canonical research files, protocol semantics, ORION
> certification or the NEXAHEDRON Workspace.

**PRIMARY CTA**

Begin an Orientation

Destination: the verified NEXAHEDRON Version 1 session.

**SECONDARY CTA**

Read the Visitor Guide

**ECOSYSTEM MAP PLACEMENT**

Place the compact four-destination map directly after the opening explanation
and three primary paths, not before the visitor understands NEXAH.

The homepage map highlights `nexah.de` and says:

> You are at the public home. Choose the chapter that matches what you want to
> do.

**OUTBOUND LINKS**

- Visitor Guide;
- Position Paper;
- Library;
- Atlas;
- NEXAH Research & Framework Repository;
- ORION certified baseline;
- NEXAHEDRON;
- Version 1 Release Manifest;
- participation and governance.

**REMOVE OR REPOSITION**

- Replace “Enter ORION” as a public action with “Begin an Orientation.”
- Move technical ORION explanation into the Build and Verify path.
- Move raw publication volume below a curated Library entrance.
- Move unexplained research names below the Research & Foundation path.
- Preserve all research and publication links after the visitor has chosen
  that chapter.

### 3.2 Visitor Guide

Add the canonical ecosystem map after the initial explanation of NEXAH and
before role-specific reading paths.

Required sequence:

```text
What is NEXAH?
↓
What does Version 1 prove?
↓
How the ecosystem is organized
↓
Choose:
├── Read
├── Research
├── Build and Verify
└── Experience
```

Each map destination must be clickable and followed by one paragraph, not a
full subsystem explanation.

### 3.3 About page

Use the compact map under:

> One ecosystem. Distinct responsibilities.

The About page explains purpose, stewardship and ownership boundaries. It
must link detailed research to the NEXAH Repository and the Human experience
to NEXAHEDRON.

### 3.4 `nexahedron.com`

**FIRST HEADLINE**

> What are you trying to understand?

**FIRST PARAGRAPH**

> Begin with one genuine question. You will encounter one real source, keep
> exact fragments, create relationships, reflect and decide when to Rest.
> NEXAHEDRON preserves the work and its provenance; it does not decide what the
> material means.

**ROLE STATEMENT**

> NEXAHEDRON is the Human-facing reference implementation of the Open
> Orientation Protocol.

**OWNERSHIP STATEMENT**

> It owns the Workspace, Encounter, Reflection, Rest, Human confirmation and
> Orientation Record presentation.

**NON-OWNERSHIP STATEMENT**

> It does not own the protocol, Library identity, ORION certification, source
> authority or Human meaning and decisions.

**PRIMARY CTA**

Begin with Your Question

**SECONDARY CTA**

How This Session Works

**ECOSYSTEM MAP PLACEMENT**

Do not place the complete map before the question. Add a small “You are here:
NEXAHEDRON” context link beside About or Method. The full map opens on the
canonical Visitor Guide page.

**OUTBOUND LINKS**

- `nexah.de`;
- Public Release Claim;
- relevant source and Library record;
- protocol;
- NEXAHEDRON source repository;
- ORION certified baseline only when a visible session boundary references it.

## 4. Repository Implementation

### 4.1 NEXAH Repository

**FIRST HEADLINE**

> NEXAH — Research & Framework

**FIRST PARAGRAPH**

> This is the Research & Framework Repository of the NEXAH Orientation
> Ecosystem. It preserves the scientific, linguistic, architectural,
> experimental and historical work from which Version 1 emerged.

**ROLE STATEMENT**

> The full scientific workshop and intellectual record.

**OWNERSHIP STATEMENT**

> This repository owns its research corpus, Orientation Language, Framework,
> validation records, experiments, papers and historical development.

**NON-OWNERSHIP STATEMENT**

> It is not the public landing page, certified ORION Core or Human-facing
> NEXAHEDRON Laboratory.

**PRIMARY CTA**

Explore the Research Map

**SECONDARY CTA**

Understand NEXAH at `nexah.de`

**ECOSYSTEM MAP PLACEMENT**

Place the contextual map after the identity block. Highlight NEXAH Repository
and show direct transitions to public home, protocol, ORION and NEXAHEDRON.

**OUTBOUND LINKS**

- `nexah.de`;
- Version 1 Release Manifest;
- Position Paper;
- ORION;
- NEXAHEDRON;
- Library and Atlas;
- governance and contribution routes.

**EDITORIAL REORDERING**

1. role and status;
2. ecosystem context;
3. choose a research territory;
4. current research and Framework state;
5. reproduction;
6. complete repository structure;
7. history.

JANUS, IEEE validation, Human Field, Cartography, Orientation Language,
Framework, architecture, papers and experiments remain first-class sections.

### 4.2 ORION Repository

**FIRST HEADLINE**

> ORION — Certified Deterministic Core

**FIRST PARAGRAPH**

> ORION publishes the certified deterministic Core of the NEXAH Orientation
> Ecosystem. Version 1 certifies bounded structural Representation, Relations,
> Navigation, Orientation Map and Expression responsibilities through
> immutable, reproducible artifacts.

**ROLE STATEMENT**

> The Build and Verify chapter of the ecosystem.

**OWNERSHIP STATEMENT**

> ORION owns only its certified deterministic artifacts, validation,
> conformance and certification boundaries.

**NON-OWNERSHIP STATEMENT**

> ORION does not own Runtime, Gateway, LYRA execution, Human Reports,
> presentation, applications, the Human Workspace, interpretation or decisions.

**PRIMARY CTA**

Inspect the Version 1 Certified Baseline

**SECONDARY CTA**

Reproduce the Certified Proof

**ECOSYSTEM MAP PLACEMENT**

Place the contextual map below the certification status. Highlight ORION.

**OUTBOUND LINKS**

- Version 1 Release Manifest;
- Open Orientation Protocol;
- NEXAH public home;
- NEXAH Repository;
- NEXAHEDRON.

**EDITORIAL REORDERING**

1. certified identity and exclusions;
2. frozen Version 1 reading order;
3. reproduction;
4. certified capability matrix;
5. current architecture;
6. historical phase material.

Runtime, Gateway, LYRA and report claims must not appear as certified Version 1
behavior.

### 4.3 NEXAHEDRON Repository

**FIRST HEADLINE**

> NEXAHEDRON — The Orientation Laboratory

**FIRST PARAGRAPH**

> NEXAHEDRON is the Human-facing reference implementation of the Open
> Orientation Protocol. Version 1 demonstrates one complete Orientation
> Session from a genuine question and real source through fragments,
> relationships, Reflection, Rest and an inspectable Orientation Record.

**ROLE STATEMENT**

> The Experience chapter of the ecosystem.

**OWNERSHIP STATEMENT**

> NEXAHEDRON owns the interaction, presentation and local flow of the Human
> Workspace.

**NON-OWNERSHIP STATEMENT**

> It does not own the Orientation Language, protocol, Library authority, ORION
> authority, source identity or Human meaning.

**PRIMARY CTA**

Open the Version 1 Laboratory

**SECONDARY CTA**

Inspect the Reference Session

**ECOSYSTEM MAP PLACEMENT**

Place the contextual map after the live and source links. Highlight
NEXAHEDRON.

**OUTBOUND LINKS**

- `nexahedron.com`;
- `nexah.de`;
- Public Release Claim;
- protocol;
- source and Library provenance;
- ORION certified baseline;
- contribution and security paths.

**EDITORIAL REORDERING**

1. Human experience and live session;
2. exact Version 1 scope and limits;
3. privacy and local state;
4. acceptance case;
5. reproduction;
6. architecture and historical Alpha milestones.

### 4.4 NEXAH Experience Repository

**FIRST HEADLINE**

> NEXAH Experience — Public Site

**FIRST PARAGRAPH**

> This repository publishes `nexah.de`, the public and intellectual home of the
> NEXAH Orientation Ecosystem. It owns website presentation, navigation,
> accessibility and deployment.

**ROLE STATEMENT**

> The publication source of the Discover and Understand chapter.

**OWNERSHIP STATEMENT**

> It owns the implementation and operation of the public website.

**NON-OWNERSHIP STATEMENT**

> It does not own NEXAH research, protocol semantics, ORION certification,
> Library identity or the NEXAHEDRON Workspace.

**PRIMARY CTA**

Visit `nexah.de`

**SECONDARY CTA**

Verify the Public Site

**ECOSYSTEM MAP PLACEMENT**

Place the contextual map after the live-site link. Highlight `nexah.de`, not
the repository itself.

**OUTBOUND LINKS**

- `nexah.de`;
- Version 1 Release Manifest;
- NEXAH Repository;
- ORION;
- NEXAHEDRON;
- canonical Library and protocol sources.

**EDITORIAL REORDERING**

1. live site and role;
2. release and deployment status;
3. verification;
4. ownership boundary;
5. contribution;
6. sprint and implementation history.

## 5. GitHub Implementation

### 5.1 Profile front door

**FIRST HEADLINE**

> NEXAH — The Orientation Ecosystem

**FIRST PARAGRAPH**

> NEXAH is an orientation ecosystem with separate public, research,
> deterministic Core and Human-experience responsibilities. Begin at
> `nexah.de`; use these repositories to inspect or contribute to a specific
> chapter.

**ROLE STATEMENT**

> Technical directory of the public ecosystem.

**OWNERSHIP STATEMENT**

> The profile organizes repository discovery.

**NON-OWNERSHIP STATEMENT**

> It does not replace the public website, release manifest, protocol or
> repository-specific governance.

**PRIMARY CTA**

Visit `nexah.de`

**SECONDARY CTA**

Inspect the Version 1 Release Manifest

**ECOSYSTEM MAP PLACEMENT**

Use the compact neutral map. Do not embed the full poster in a narrow profile
README.

**CANONICAL REPOSITORY ORDER**

1. NEXAH — Research & Framework;
2. NEXAH-ORION — Certified deterministic Core;
3. NEXAHEDRON — Human-facing reference implementation;
4. NEXAH-Experience — source of `nexah.de`.

**OUTBOUND LINKS**

- public sites;
- four current repositories;
- release manifest;
- protocol;
- governance;
- contribution and security routes.

**DO NOT SHOW FIRST**

- unrelated repositories;
- historical repositories without status;
- personal biography before ecosystem identity;
- moving development status without release context;
- Version 2 proposals.

### 5.2 Repository metadata

Apply this description pattern:

```text
[Role] within the NEXAH Orientation Ecosystem.
```

Recommended descriptions:

- **NEXAH:** `Research, Orientation Language and Framework repository within the NEXAH Orientation Ecosystem.`
- **NEXAH-ORION:** `Certified deterministic Core of the NEXAH Orientation Ecosystem.`
- **NEXAHEDRON:** `Human-facing reference implementation of the Open Orientation Protocol.`
- **NEXAH-Experience:** `Source and publication repository for nexah.de, the public and intellectual home of NEXAH.`

Every repository homepage field should point to its public experience when one
exists, otherwise to `nexah.de`.

## 6. Cross-link Implementation

### 6.1 Required links by surface

| Surface | Inbound identity link | Primary outbound | Secondary outbound | Canonical status link |
|---|---|---|---|---|
| `nexah.de` | Public root | NEXAHEDRON | Visitor Guide, Library, research, protocol | Release Manifest |
| Visitor Guide | `nexah.de` | Chosen chapter | Position Paper and Public Release Claim | Release Manifest |
| NEXAH Repository | `nexah.de` | Research Map | ORION, protocol, NEXAHEDRON | Release Manifest |
| ORION | `nexah.de` | Certified Baseline | Protocol and NEXAHEDRON | Release Manifest |
| NEXAHEDRON | `nexah.de` | Live Laboratory | Source, protocol and ORION | Release Manifest |
| NEXAH Experience | live `nexah.de` | Verification | Owning content repositories | Release Manifest |
| GitHub profile | `nexah.de` | Canonical repository set | Protocol and contribution | Release Manifest |

### 6.2 Link implementation rules

- Use immutable tags or commits for cross-repository release dependencies.
- Use stable public URLs for visitor paths.
- Label destinations by role, not only by project name.
- Link summaries back to canonical documents.
- Mark external destinations before navigation when the change of context is
  not obvious.
- Preserve a return link to the originating chapter.
- Do not duplicate canonical RFC, governance, release or Library content.
- Validate every release-path link from an unauthenticated session.

### 6.3 Context strip

Every repository README should include a small context strip:

```text
NEXAH ecosystem
→ You are here: [role]
→ Continue to: [next chapter]
```

This strip links to the canonical map and release manifest. It does not create
a new navigation system.

## 7. README Implementation

### 7.1 Shared first-screen order

Every canonical repository README must follow this order above the first
technical section:

1. title;
2. role within NEXAH;
3. one-sentence description;
4. current status;
5. ownership;
6. non-ownership;
7. primary CTA;
8. secondary CTA;
9. contextual ecosystem map;
10. canonical release and governance links.

### 7.2 Shared “Where am I?” block

Use:

> **NEXAH ecosystem role**
>
> You are in **[repository role]**. This repository owns **[responsibility]**.
> It does not own **[boundary]**. Continue to **[destination]** for
> **[next purpose]**.

### 7.3 Content preserved below the entrance

Do not remove:

- research areas;
- mathematical and scientific detail;
- experiments;
- architecture records;
- proof chains;
- historical phases;
- publication catalogs;
- implementation documentation.

Reorder only when current identity, status or next action is hidden beneath
them.

### 7.4 Status block

Each README must distinguish:

| Status dimension | Required value |
|---|---|
| Repository/package version | Exact local release value |
| Version 1 release membership | Included or not included, with manifest link |
| Certification | Exact certified responsibility only |
| Research status | Active, experimental, historical or released |
| Public availability | Live, unavailable or source only |

No single badge may imply all five dimensions.

## 8. Navigation Implementation

### 8.1 Challenge to the proposed linear route

The proposed route:

```text
nexah.de
→ Visitor Guide
→ Position Paper
→ Library
→ NEXAHEDRON
→ Orientation Record
→ Research
→ Contribution
```

is useful as one possible long-form tour but should not become the mandatory
public journey. It makes the Position Paper and Library prerequisites for using
NEXAH and asks every visitor to become a researcher and contributor.

### 8.2 Canonical first-time route

```text
nexah.de
↓
Visitor understands NEXAH in one screen
↓
Choose:
├── Visitor Guide or Position Paper
├── Library or Atlas
├── Research & Framework Repository
├── Protocol or ORION verification
└── NEXAHEDRON session
↓
Return to source, public home or responsible contribution path
```

### 8.3 Recommended first-time experience

For the visitor who wants to understand and use the project:

```text
nexah.de
→ Visitor Guide
→ NEXAHEDRON
→ Orientation Record
→ Source or Library
→ optional Position Paper or Research
```

The Position Paper remains prominent but is not a usage prerequisite.

### 8.4 Research route

```text
nexah.de
→ Position Paper
→ NEXAH Research & Framework Repository
→ selected research territory
→ evidence, paper or Library record
→ reproduce, critique or contribute
```

ORION appears only when the researcher chooses to inspect certified
deterministic behavior.

### 8.5 Developer route

```text
Release Manifest
→ Open Orientation Protocol
→ owning repository
→ certified or canonical artifact
→ smallest reproduction
→ tests and conformance
→ contribution
```

No SDK is promised.

### 8.6 Builder route

```text
Public Release Claim
→ Protocol
→ certified artifacts
→ NEXAHEDRON as one reference implementation
→ declare application boundary
→ bounded contribution
```

No general integration framework is implied.

### 8.7 Navigation acceptance

Every route must:

- explain a destination before leaving the current surface;
- provide a return path;
- preserve role labels;
- expose status when it changes interpretation;
- avoid requiring internal acronyms;
- end in a surface that owns the promised action.

## 9. Editorial Consistency Checklist

### Identity

- [ ] NEXAH is named as the complete ecosystem.
- [ ] The current surface is named as one chapter.
- [ ] The surface's purpose is visible within 30 seconds.
- [ ] The surface's audience is evident.
- [ ] The next destination is explicit.

### Responsibility

- [ ] Ownership is stated.
- [ ] Non-ownership is stated.
- [ ] Human authority is preserved.
- [ ] Library, protocol, ORION and application authority are not conflated.
- [ ] No current wording expands Version 1.

### Terminology

- [ ] Open Orientation Protocol is RFC-0001.
- [ ] Orientation Language 1.0 is not mislabeled as RFC-0011.
- [ ] RFC-0011 retains its correct title and status.
- [ ] “Framework” is qualified as NEXAH Framework.
- [ ] “Kernel” has an explicit owner.
- [ ] ORION is described as the certified deterministic Core.
- [ ] NEXAHEDRON is described as the Human-facing reference implementation.
- [ ] Orientation Record is not called an ORION Report.

### Status

- [ ] Component version is explicit.
- [ ] Release membership links to the manifest.
- [ ] Certification is limited to its exact responsibility.
- [ ] Research status is explicit.
- [ ] Historical and proposed material is labeled.
- [ ] No stale deployment statement is presented as current.

### Navigation

- [ ] Primary CTA lands at a surface that owns the action.
- [ ] Secondary CTA serves a different but relevant visitor intention.
- [ ] The ecosystem map highlights the current location.
- [ ] Outbound links use role-based labels.
- [ ] A return path exists.
- [ ] All release-path links pass unauthenticated verification.

### Accessibility

- [ ] The map has a complete text equivalent.
- [ ] Color is not the only location indicator.
- [ ] Map nodes are keyboard reachable.
- [ ] Link purpose is understandable out of context.
- [ ] Small text remains readable at supported breakpoints.
- [ ] The compact map works without horizontal scrolling where required.

## 10. Release Implementation Checklist

### Map

- [ ] Correct RFC labels.
- [ ] Remove Future Applications from the Version 1 map.
- [ ] Remove SDK/interface and general integration promises.
- [ ] Replace numbered chapters with role names.
- [ ] Produce compact primary map.
- [ ] Preserve the full corrected poster as a secondary artifact.
- [ ] Add accessible text equivalent.
- [ ] Publish canonical map in the Visitor Guide.
- [ ] Record the map revision in the Release Manifest.

### `nexah.de`

- [ ] Implement approved headline and first paragraph.
- [ ] Add role, ownership and non-ownership statements.
- [ ] Route primary CTA to verified NEXAHEDRON.
- [ ] Add compact homepage map.
- [ ] Add canonical Visitor Guide map.
- [ ] Remove “Enter ORION” as the Human-facing primary action.
- [ ] Verify public paths and return links.

### NEXAH Repository

- [ ] Position as Research & Framework.
- [ ] Preserve and index all scientific territories.
- [ ] Add contextual map.
- [ ] Add status dimensions.
- [ ] Add public home, manifest, ORION and NEXAHEDRON transitions.
- [ ] Move historical chronology below current orientation.

### ORION

- [ ] Position as Certified Deterministic Core.
- [ ] Make certified baseline the first technical path.
- [ ] State certified exclusions.
- [ ] Remove current-facing Runtime, Gateway, LYRA and Human Report claims.
- [ ] Add contextual map.
- [ ] Add protocol and NEXAHEDRON transitions.

### NEXAHEDRON

- [ ] Position as Human-facing reference implementation.
- [ ] Lead with the live Version 1 session.
- [ ] State Workspace ownership and authority limits.
- [ ] Add contextual map.
- [ ] Publish privacy, limitations and acceptance case.
- [ ] Verify Orientation Record path.

### NEXAH Experience

- [ ] Position as source of `nexah.de`.
- [ ] Lead with live site and deployment status.
- [ ] State content-authority limits.
- [ ] Add contextual map.
- [ ] Move sprint history below current guidance.
- [ ] Remove stale pre-deployment state from current navigation.

### GitHub

- [ ] Add ecosystem profile statement.
- [ ] Pin the four canonical repositories in role order.
- [ ] Apply role-based descriptions.
- [ ] Link public sites and release manifest.
- [ ] Mark historical repositories.
- [ ] Remove historical projects from canonical positions.

### Cross-surface verification

- [ ] Every public front door links the same release manifest.
- [ ] Every public claim matches the canonical claim.
- [ ] Every status is current.
- [ ] Every primary CTA reaches an owned capability.
- [ ] Every canonical document is publicly readable.
- [ ] Every public source is reachable without authentication.
- [ ] No Version 2 terminology appears in the Version 1 map or first-time path.

## 11. Remaining Release Blockers

1. **✓ Release Blocker — The authoritative Version 1 Release Manifest is not
   yet the shared public spine.**
2. **✓ Release Blocker — The submitted map contains incorrect RFC ownership
   and Version 2 or unimplemented promises.**
3. **✓ Release Blocker — The public NEXAH repository does not yet identify
   itself first as Research & Framework within the complete ecosystem.**
4. **✓ Release Blocker — ORION's public entrance is not yet reconciled with the
   certified Version 1 baseline.**
5. **✓ Release Blocker — NEXAHEDRON is not yet a publicly verified Version 1
   reference implementation.**
6. **✓ Release Blocker — `nexah.de` still routes the Human-facing action toward
   the older ORION journey rather than the canonical NEXAHEDRON session.**
7. **✓ Release Blocker — The canonical Position Paper, Public Release Claim,
   protocol, governance and release status are not yet one public reading
   path.**
8. **✓ Release Blocker — Component maturity and coordinated Version 1 release
   membership remain unreconciled.**

### Important before release

1. **✓ Important Before Release — Apply the shared first-screen structure to
   every canonical repository.**
2. **✓ Important Before Release — Publish the corrected accessible map and
   contextual derivatives.**
3. **✓ Important Before Release — Reconcile GitHub profile metadata and
   repository ordering.**
4. **✓ Important Before Release — Label historical, experimental and proposed
   material consistently.**
5. **✓ Important Before Release — Verify all public transitions and return
   paths.**

No Version 2 work is required or permitted by this plan.

## 12. Final Implementation Order

The order is determined by editorial dependency. Each step must finish green
before the next begins.

### Step 1 — Publish the Version 1 Release Manifest

Establish the immutable component set, canonical URLs, status vocabulary,
revisions, checksums, limitations and reading order.

**STOP:** one public source of release truth exists.

### Step 2 — Correct and publish the canonical ecosystem map

Correct RFC ownership, remove Version 2 and unimplemented promises, create the
compact map and accessible text equivalent, and bind its revision in the
manifest.

**STOP:** one canonical role map exists.

### Step 3 — Implement the `nexah.de` public entrance

Apply the headline, description, role, CTAs, compact map and Visitor Guide map.
Correct the NEXAHEDRON handoff.

**STOP:** the public home explains and routes without duplicating the
Laboratory.

### Step 4 — Implement the NEXAH Repository front door

Apply Research & Framework positioning, preserve the complete scientific
territories, add status and contextual navigation.

**STOP:** advanced material remains intact and newly oriented.

### Step 5 — Implement the ORION front door

Align claims with the certified baseline, prioritize certification and
reproduction, add role boundaries and contextual links.

**STOP:** ORION tells only its certified Version 1 chapter.

### Step 6 — Publish the NEXAHEDRON front door and live reference session

Apply Human-facing reference positioning and verify the complete
Question → Source → Fragments → Relationships → Reflection → Rest →
Orientation Record path.

**STOP:** the canonical public experience is demonstrable.

### Step 7 — Implement the NEXAH Experience front door

Clarify its website-source responsibility, current deployment state and
non-ownership; move implementation chronology below current guidance.

**STOP:** the public site and its source repository are not confused.

### Step 8 — Implement GitHub profile and metadata

Publish the canonical repository order, role descriptions, status links and
historical labels.

**STOP:** technical discovery reflects the same ecosystem map.

### Step 9 — Complete cross-link and status verification

Test the full visitor, researcher, developer and builder paths without
authentication. Verify claims, roles, status, accessibility, return links and
canonical ownership.

**STOP:** every public surface answers:

```text
I am here.
This surface owns this responsibility.
The next relevant chapter is there.
```

### Step 10 — Release editorial sign-off

Review the complete public ecosystem against the Editorial Consistency
Checklist and Public Release Claim.

**STOP:** editorial presentation is release-ready. No architecture or
scientific content has changed.
