# NEXAH Version 1.0 Ecosystem Consistency Audit

- Status: Release audit
- Audit date: 24 July 2026
- Release gate at start: Gate 1 GREEN
- Authority: observational only
- Architecture change authority: none

## 1. Ecosystem Consistency Report

### Verdict

**No. The public surfaces do not yet tell one coherent Version 1 story.**

The canonical release documents now converge on a clear identity: NEXAH is an
orientation system in which Humans work with questions, real sources,
relationships, boundaries, uncertainty and provenance without transferring
judgment to software. ORION is the certified deterministic Core. NEXAHEDRON is
the Human-facing reference implementation. `nexah.de` is the public and
intellectual home.

The currently published surfaces still expose several earlier project states
at once:

- NEXAH as an experimental cartography framework for dynamical systems;
- `nexah.de` as Orientation Cartography and Orientation Science;
- ORION as a Runtime, Gateway, report and LYRA system;
- NEXAH Experience as a deployed but explicitly Alpha static experience;
- NEXAHEDRON as a local Alpha integration rather than a public Version 1
  reference implementation;
- the certified ORION Core, whose frozen Version 1 baseline explicitly excludes
  Runtime, Gateway, LYRA execution, Human Reports and Applications.

These statements describe real historical work, but they cannot all function
as the current public identity of one release.

### Audit basis and availability

| Surface | Observed state | Consistency finding | Classification |
|---|---|---|---|
| `nexah.de` | Publicly reachable; presents NEXAH, Library, Atlas, Visitor Guide, Laboratory and an Orientation entrance | Substantial intellectual home, but it also hosts an operational-looking ORION journey and therefore overlaps the intended NEXAHEDRON responsibility | ✓ Release Blocker |
| `nexahedron.com` | Public connection could not be established during the audit | The public claim names an experience that a reviewer cannot currently reach or verify | ✓ Release Blocker |
| Public `NEXAH` repository | Public README presents “The Cartography Laboratory” and an experimental complex-systems framework | Directly conflicts with the canonical ecosystem identity and broader Version 1 public claim | ✓ Release Blocker |
| Local release-candidate `NEXAH` front door | Presents “The Orientation Ecosystem” with current ownership and limits | Strong candidate front door, but it is not the story currently visible in the public repository | ✓ Release Blocker |
| Public `NEXAH-ORION` repository | Repository exists | The release-facing ORION identity is not reconciled with the new certified baseline | ✓ Release Blocker |
| Current ORION README | Calls ORION a stable-baseline candidate and claims Runtime, Gateway, reports and LYRA behavior | Contradicts the certified Version 1 baseline, which excludes those capabilities | ✓ Release Blocker |
| Public `NEXAH-Experience` repository | Repository exists; source for `nexah.de` | Calls itself an Alpha baseline and documents an older build-time ORION journey | ✓ Important Before Release |
| `NEXAHEDRON` repository | No corresponding public repository was found; local repository is `0.1.0-dev.0` | The canonical reference implementation cannot yet be independently inspected as a public release component | ✓ Release Blocker |
| GitHub profile | Personal profile with no coherent ecosystem-level front door; the visible NEXAH description remains narrow | Does not provide the canonical project entry, component roles or release status | ✓ Important Before Release |
| Position Paper, Public Release Claim, Release Roadmap, RFC-0001 and RFC-0011 | Canonical locally; no complete public reading path was found | A visitor cannot yet verify the claims from the public ecosystem alone | ✓ Release Blocker |
| Library, Atlas and books | Rich and publicly visible through `nexah.de` | Strong body of work, but publication status, canonical edition and “start here” priority are not consistently visible | ✓ Important Before Release |
| Governance | Substantial constitutional and repository governance exists | Current public visibility and the status of proposed adapter governance are not consistently separated from Version 1 authority | ✓ Important Before Release |

Availability findings describe the state observed during this audit. A
temporary network failure does not change the release requirement: the
canonical public experience must be independently reachable and verifiable
before release.

### 1.1 Identity

The intended identities are coherent:

| Name | Canonical Version 1 role |
|---|---|
| NEXAH | The complete orientation ecosystem and its shared public identity |
| ORION | The certified deterministic Core; it owns certified structural orientation, not Human meaning or presentation |
| NEXAHEDRON | The Human-facing Orientation Laboratory and reference implementation |
| `nexah.de` | The public and intellectual home |
| `nexahedron.com` | The place to complete one Human Orientation Session |

The public ecosystem does not yet preserve those distinctions:

1. The public NEXAH repository still describes a narrower experimental
   cartography project.
2. `nexah.de` offers “Enter ORION” and an Orientation journey, making ORION
   appear to be the Human-facing product.
3. NEXAH Experience calls the public site an Alpha experience, while the
   coordinated release is called Version 1.0.
4. NEXAHEDRON is described canonically as the reference implementation but is
   neither publicly reachable nor publicly inspectable.
5. The ORION README assigns Runtime, Gateway, reports and LYRA to ORION even
   though the certified baseline excludes them.

A first-time visitor therefore cannot reliably answer “what belongs where?” or
“where should I begin?” from the public surfaces alone.

### 1.2 Terminology

| Term | Current consistency | Required Version 1 treatment | Classification |
|---|---|---|---|
| Orientation | Foundational and broadly consistent | Keep as the shared central term | — |
| Orientation Language | Stable in canonical documents, weakly exposed on public surfaces | Publish one canonical definition and link | ✓ Important Before Release |
| Protocol | RFCs and Open Orientation Protocol are canonical locally but not part of the obvious public path | Expose as the implementation-independent participation contract | ✓ Release Blocker |
| Framework | Used for NEXAH as a whole and for a release candidate/package | Distinguish ecosystem identity from the Framework repository/package in every front door | ✓ Important Before Release |
| Kernel | Used for the NEXAH Orientation Kernel and colloquially for ORION | Two apparent kernels create authority ambiguity; every public occurrence must name its exact owner | ✓ Release Blocker |
| ORION | Presented as both a certified Core and an executable Runtime/Gateway/report stack | Current public claims must match the certified baseline | ✓ Release Blocker |
| Library | Generally consistent as editorial/source authority | Preserve one canonical catalog and provenance owner | — |
| Laboratory | Used for the `nexah.de` Cartography Laboratory and the NEXAHEDRON Orientation Laboratory | Make the research area and Human-facing reference implementation visibly distinct | ✓ Important Before Release |
| Reference Implementation | Clear in the Public Release Claim, absent as a verifiable public product identity | Apply consistently to NEXAHEDRON and nowhere else | ✓ Release Blocker |
| Workspace | Defined in NEXAHEDRON, not visible in the current public journey | Use only for the continuous Human working surface | ✓ Release Blocker |
| Encounter | Defined in the canonical Human flow, absent from the reachable public session | Must describe actual contact with a real source, not a URL or title | ✓ Release Blocker |
| Reflection | Canonically Human-owned and passive; not evident in the reachable public flow | Preserve that exact role in the public session | ✓ Release Blocker |
| Rest | Canonical decision boundary, not evident in the reachable public flow | Make a valid session ending, not an error or incomplete workflow | ✓ Release Blocker |
| Orientation Record | Promised by the Public Release Claim; the public Experience currently presents an ORION report or blocker instead | Do not conflate the Human-owned record with an ORION report | ✓ Release Blocker |

No new terminology is required. The problem is that older and current meanings
remain simultaneously public.

### 1.3 Repository identity

No current public repository front door yet provides all five required facts:

1. what the repository owns;
2. what it does not own;
3. its current maturity;
4. its exact dependencies;
5. its canonical documentation and release status.

| Repository | Ownership clarity | Maturity clarity | Main inconsistency |
|---|---|---|---|
| NEXAH Framework | Strong in the local candidate, weak in the published README | Public surface says experimental; local candidate describes multiple independent maturity states | Published and release-candidate identities differ |
| ORION | Detailed ownership text exists | README says candidate/dev while later documents say Version 1 certified | README capabilities and status contradict the frozen baseline |
| NEXAH Experience | Ownership is clear | Explicit Alpha despite public deployment | It is not clearly separated from the planned NEXAHEDRON Version 1 session |
| NEXAHEDRON | Local ownership is clear | Dev/Alpha only; no verified public repository | Canonical release component is not publicly inspectable |

### 1.4 Website identity

`nexah.de` already behaves well as a Library, Atlas, research and intellectual
home. Its editorial visual language and conceptual content are strong.

It does not yet preserve the approved two-site boundary. Its current
“Begin Orientation / Enter ORION” route leads into a static or blocked ORION
journey rather than into the canonical NEXAHEDRON flow:

```text
question
→ real source
→ exact fragments
→ Human relationships
→ Reflection
→ Rest
→ Orientation Record
```

This duplicates the Laboratory responsibility while failing to demonstrate the
public release claim. `nexahedron.com` was unavailable during the audit, so the
Human-facing half of the intended public system could not be evaluated.

### 1.5 Navigation

The required path is not currently traversable as one coherent experience.

| Transition | Result |
|---|---|
| Website → Library | Works |
| Library → Position Paper | No obvious canonical path verified |
| Position Paper → Orientation Session | No verified public handoff to NEXAHEDRON |
| Orientation Session → Orientation Record | Not publicly demonstrable |
| Orientation Record → GitHub | Not applicable because the Record is absent |
| GitHub → Protocol | Not reliably discoverable from the public repository/profile front doors |

The Visitor Guide helps explain NEXAH, but it does not yet function as the
canonical cross-surface reading and action path.

### 1.6 Status

The ecosystem currently exposes incompatible release vocabularies:

| Surface or artifact | Visible status |
|---|---|
| NEXAH coordinated release | Version 1.0 in the canonical Public Release Claim |
| Release Roadmap file metadata | Proposed, although it is now declared canonical |
| Public NEXAH repository | Experimental / active exploratory research |
| NEXAH Framework local candidate | Release Candidate, unnamed, not released |
| Orientation Language | 1.0 canonical |
| ORION certified baseline | Version 1 certified |
| ORION README/package | Stable-baseline candidate / `0.3.0-dev.0` |
| NEXAH Experience | Publicly deployed Alpha / `0.1.0-alpha.0` |
| NEXAHEDRON | Alpha / `0.1.0-dev.0` |
| Adapter Governance Package | Proposed, not accepted |

Component versions may legitimately differ. Their status labels may not imply
that the coordinated public release is both certified, experimental, Alpha,
development and unreleased without an explicit manifest explaining the
relationship.

### 1.7 Public claims

The Public Release Claim and Position Paper are compatible with each other and
with the intended architecture. The following current public statements are
not compatible with them:

- the public NEXAH repository reduces the project to an experimental
  complex-systems cartography framework;
- the ORION README claims capabilities excluded by the certified baseline;
- the current public Orientation route presents an ORION blocker/report rather
  than a complete Human Orientation Session and Record;
- the Public Release Claim says visitors can use NEXAHEDRON, while no public
  NEXAHEDRON surface was verifiable;
- the roadmap calls the two-site separation canonical while the reachable site
  still combines the intellectual home and operational Orientation entrance.

These are demonstrability failures, not wording preferences.

### 1.8 Visual identity

The editorial family is already recognizable:

- cream, navy and gold;
- book, atlas and museum-like composition;
- restrained diagrams and cartographic motifs;
- consistent concern for provenance, boundaries and Human judgment.

The main visual inconsistency is not style but context. `nexah.de` and the local
NEXAHEDRON Workspace look related, while GitHub front doors, status badges and
repository descriptions present different generations of the project. The
public ecosystem therefore feels visually related but institutionally
fragmented.

### 1.9 Release-readiness conclusion

Gate 1 is valid: the canonical Public Release Claim is bounded and coherent.
The ecosystem is not yet ready for public Version 1.0 because that claim cannot
currently be followed and verified across the public surfaces.

This audit does not identify an architectural gap. It identifies a publication
and consistency gap.

## 2. Prioritized Punch List

1. **✓ Release Blocker — Publish one authoritative ecosystem release spine.**
   Publish an immutable Version 1 manifest and reading order that name the
   exact component versions, commits, public URLs, statuses, canonical
   documents, checksums, limitations and entry path. Every public front door
   must link to it.

2. **✓ Release Blocker — Reconcile the public NEXAH repository front door.**
   Replace the publicly visible experimental-cartography identity with the
   already approved NEXAH Orientation Ecosystem identity and bounded Version 1
   claim. Preserve the former text as historical material rather than current
   identity.

3. **✓ Release Blocker — Reconcile ORION with its certified baseline.**
   Remove current-facing claims that Version 1 includes Runtime, Gateway, LYRA,
   Human Reports or other capabilities excluded by the certified baseline.
   Make the Version 1 Certified Baseline the first reading path.

4. **✓ Release Blocker — Publish and verify NEXAHEDRON Version 1.**
   Provide the public repository and reachable Laboratory, with one complete
   Plate Tectonics session ending in an inspectable Orientation Record.

5. **✓ Release Blocker — Correct the public Orientation entrance.**
   `nexah.de` must route Human participation to the verified NEXAHEDRON session
   and must not present the older blocked ORION journey as the Version 1 Human
   experience.

6. **✓ Release Blocker — Publish the canonical document path.**
   Make the Position Paper, Public Release Claim, RFC-0001, RFC-0011,
   governance baseline and limitations publicly readable from one stable
   route.

7. **✓ Release Blocker — Normalize release status.**
   Record component-specific Alpha, development, certified and release statuses
   once in the release manifest. Correct stale “Proposed”, “pending” and
   “unreleased” labels where an authoritative decision has already superseded
   them.

8. **✓ Important Before Release — Give every repository one bounded identity
   panel.** State ownership, non-ownership, maturity, dependencies, canonical
   documentation and release status in the first screen of each README.

9. **✓ Important Before Release — Make the Visitor Guide the public routing
   layer.** It should lead visitors to the Position Paper, one Library entry,
   the NEXAHEDRON session, the resulting Record, GitHub and the protocol without
   requiring them to infer repository relationships.

10. **✓ Important Before Release — Reconcile GitHub profile metadata.** Make
    the canonical NEXAH repository, ORION, NEXAH Experience and NEXAHEDRON
    discoverable as one bounded set, with consistent descriptions and home
    links.

11. **✓ Important Before Release — Curate the Version 1 Library and Atlas
    entrance.** Mark canonical editions, provenance, status and one recommended
    starting collection without restructuring the Library.

12. **✓ Important Before Release — Align public visual status cues.** Use the
    established visual family for repository headers, release-state labels and
    handoff links so that current, historical and proposed material cannot be
    mistaken for one another.

13. **✓ Important Before Release — Retire stale operational status pages from
    current navigation.** Preserve them as historical records, but do not let
    pre-deployment or pre-repository instructions describe the current public
    state.

14. **✓ Version 2 — Adapter participation and provider-neutral external
    contributions.** These remain outside Version 1 unless already required by
    the single frozen acceptance session.

15. **✓ Version 2 — Shared Memory, language evolution, broad source coverage,
    accounts, collaboration and synchronization.** None is required to make
    the Version 1 public claim coherent or demonstrable.

## 3. Next Single Release Blocker

### ✓ Release Blocker — Publish the authoritative Version 1 ecosystem manifest

This is the next blocker because every other consistency correction needs one
public source of truth. At present, a reviewer must reconcile incompatible
status and capability claims across websites, repositories and documents.
Without an immutable manifest, correcting one README or route can create
another untracked version of the story.

The blocker is complete only when one publicly reachable manifest:

1. names every Version 1 component and its exact immutable revision;
2. records each component's own version and maturity without implying one
   shared software version;
3. links the canonical Position Paper, Public Release Claim, RFCs, governance,
   ORION certification, Library snapshot and Visitor Guide;
4. identifies `nexah.de` as the intellectual home and `nexahedron.com` as the
   reference Laboratory;
5. states the exact implemented and excluded capabilities;
6. provides the canonical first-time reading and session path;
7. is linked from every public website and repository front door; and
8. can be verified from a clean, unauthenticated browser session.

This task introduces no new architecture and no new claim. It makes the
already approved release set observable.
