# RFC-0011 — Orientation Memory and Language Evolution

- Category: Architecture specification
- Status: Canonical
- Version: 1.0
- Date: 2026-07-24
- Depends on: RFC-0001 — The Open Orientation Protocol
- Implementation status: independent of any implementation
- Runtime effect: none

## Abstract

This RFC defines how Human-reviewed Orientation Records may contribute to a
shared Orientation Memory and how that memory may support the transparent,
versioned evolution of an Orientation Language.

The process is governed by explicit publication, provenance, review, and
versioning. It does not perform automatic learning, hidden collection, model
training, or automatic canonicalization.

Orientation Memory records documented paths of orientation. It is not a
database of facts. The Orientation Language evolves through Human stewardship,
not through provider behavior or statistical popularity.

## Conformance language

The terms **MUST**, **MUST NOT**, **REQUIRED**, **SHOULD**, **SHOULD NOT**, and
**MAY** indicate protocol requirements.

No requirement in this RFC authorizes implementation, persistence, publication,
new operators, or changes to an accepted grammar. Those require their existing
governance and implementation processes.

## 1. Orientation Records

An Orientation Record is an immutable, Human-reviewed account of one completed
or deliberately rested Orientation process.

It is not:

- a conversation transcript;
- a prompt or response history;
- a private note;
- an application event log;
- a database row;
- a model context;
- a training sample;
- a claim that the orientation is complete or correct.

An Orientation Record MAY include:

- the original Human Question;
- declared intent and boundaries;
- the exact Orientation Context versions used;
- encountered Source identities and versions;
- exact Human-kept fragments and locators;
- Human-authored relationships;
- accepted Contributions;
- content explicitly merged into Human-owned state;
- remaining Open Questions;
- uncertainty and declared limitations;
- the Rest boundary;
- complete provenance and review state.

### 1.1 Human review

The Human MUST review the proposed record before it can be considered complete.
The record MUST distinguish:

- exact Human-authored material;
- external Contributions;
- merged content and its origin;
- Source and Library declarations;
- kernel artifacts when present;
- unresolved and unknown values.

Review does not certify truth. It certifies that the record faithfully
represents the documented Orientation process within its declared boundaries.

### 1.2 Identity and immutability

Every Orientation Record MUST have:

- an immutable record identity;
- a record contract version;
- a record version;
- a review state;
- exact references to included object versions;
- an integrity reference;
- ordered provenance;
- declared visibility;
- declared lossiness;
- a terminal state, including Rest when applicable.

A changed Question, Source version, fragment, relationship, accepted
Contribution, Human merge, limitation, or provenance statement requires a new
record version. History MUST NOT be rewritten.

### 1.3 Difference from raw data

Raw data records occurrence or content. An Orientation Record records a
reviewed path through bounded material.

Its value lies in the explicit relationships among Question, Context,
Encounter, Contribution, Human Decision, uncertainty, and Rest. Removing those
relationships reduces the record to ungoverned material and destroys its
orientation-specific meaning.

An Orientation Record therefore cannot be reconstructed reliably from logs,
transcripts, or stored prompts alone.

## 2. Private and Shared Orientation

Private Orientation and Shared Orientation are distinct authority states.

```text
Private Orientation
        ↓ explicit Human publication decision
Shared Orientation Record
```

### 2.1 Private Orientation

Private Orientation remains under Human control. It MUST NOT become shared
through:

- default settings;
- background synchronization;
- analytics;
- model training;
- provider retention;
- popularity thresholds;
- application migration;
- inclusion in a shared collection;
- acceptance of a Contribution.

No participant may infer permission to publish from use of an Orientation
application.

### 2.2 Publication

Publishing an Orientation Record requires an explicit Human decision that
identifies:

- the exact record version;
- the intended visibility and audience;
- every included Human-authored field;
- included Sources, fragments, and their access constraints;
- included Contributions and provider provenance;
- redactions or omissions;
- declared publication lossiness;
- applicable withdrawal and supersession policy.

The publication decision is versioned and traceable.

### 2.3 Redaction and derived public records

A redacted or minimized publication is a new immutable projection of the
private record. It MUST preserve a provenance reference to its origin without
exposing protected material. It MUST declare what classes of information were
removed and the resulting lossiness.

Redaction MUST NOT silently change authorship, authority, sequence, or review
state.

### 2.4 No hidden harvesting

Private material MUST NOT be harvested, sampled, aggregated, synchronized, or
used to evolve Orientation Memory or Language without the explicit publication
decision required by this section.

## 3. Orientation Memory

Orientation Memory is a versioned collection of published, Human-reviewed
Orientation Records and the governed Patterns derived from them.

It is not:

- a database of facts;
- a universal model of reality;
- a source of automatic truth;
- a provider memory;
- a model's hidden state;
- a training corpus;
- a replacement for Sources, Evidence, or Libraries.

### 3.1 What Orientation Memory preserves

Orientation Memory preserves documented paths such as:

- recurring bridges between disciplines;
- recurring Source paths;
- recurring uses of accepted operators;
- recurring representations;
- recurring transition structures;
- recurring boundaries and unresolved questions;
- repeated forms of successful clarification;
- failed or limited paths when publication includes them.

The memory records that a path occurred under stated conditions. It does not
assert that the path is universally valid.

### 3.2 Memory entry requirements

Every shared memory entry MUST retain:

- originating Orientation Record identities and versions;
- publication authority and review state;
- applicable Source and fragment lineage;
- relevant Human Decisions;
- known limitations;
- visibility and access conditions;
- derivation steps;
- memory-entry identity and version;
- supersession state without rewriting history.

### 3.3 Retrieval from memory

This RFC does not define search, ranking, recommendation, embeddings, or
retrieval. A future retrieval mechanism MUST preserve the distinction between:

- a prior Orientation path;
- a Pattern;
- a Grammar example;
- Source or Evidence;
- a current Human Question.

Retrieval cannot promote a frequently returned path into a canonical rule.

## 4. Orientation Patterns

An Orientation Pattern is a versioned, Human-reviewed description of a
recurring structure observed across eligible Orientation Records.

Patterns are not:

- laws;
- facts;
- proof;
- truth;
- causal conclusions by default;
- automatic grammar rules;
- model-generated generalizations.

Examples of possible Pattern subjects include:

- Astronomy ↔ Navigation;
- Biology ↔ Information;
- Maps ↔ Memory;
- Signal ↔ Representation.

These labels identify subjects for review. They do not establish that the named
relationship is valid in every Reference Space.

### 4.1 Pattern basis

A Pattern MUST identify:

- the exact reviewed records on which it is based;
- the recurring structure claimed;
- applicable relationship semantics;
- inclusion and exclusion conditions;
- Reference Spaces and representations involved;
- counterexamples and conflicting records when known;
- review authority;
- limitations;
- identity, version, provenance, and integrity.

### 4.2 Revisions

Patterns remain revisable. New records may:

- support continued use;
- narrow the applicable scope;
- reveal a counter-pattern;
- split one Pattern into multiple Patterns;
- show that recurrence was superficial;
- justify supersession or withdrawal.

Revision produces a new Pattern version or identity. It does not alter the
records or prior Pattern versions.

### 4.3 Popularity

Frequency may identify a Pattern Candidate for review. It MUST NOT determine
acceptance, authority, scope, or truth.

## 5. Language Evolution

The Orientation Language may evolve through reviewed proposals for:

- new concepts;
- new operators;
- new relationships;
- new representations;
- new transition types;
- new distinctions;
- new Pattern categories.

No addition becomes canonical automatically.

### 5.1 Extension proposal

A Language Extension Candidate MUST state:

- the Human Orientation problem it addresses;
- the existing Language limitation;
- the proposed term or structure;
- exact supporting Orientation Records and Pattern versions;
- intended semantics;
- boundaries and non-goals;
- interaction with existing Vocabulary and Grammar;
- ambiguity and collision analysis;
- provenance;
- compatibility implications;
- proposed version impact.

### 5.2 Review

Review MUST determine whether the proposal is:

- already expressible;
- a Vocabulary addition;
- a Grammar change;
- a Pattern only;
- an implementation concern;
- a domain-specific extension;
- incompatible with existing authority;
- insufficiently supported.

An accepted candidate receives canonical authority only through the existing
Human governance process responsible for that Language layer.

### 5.3 Operators and executable behavior

Naming an operator or transition in Language does not create executable
behavior. Operator architecture, contracts, mathematics, implementation,
validation, and certification remain separate responsibilities.

Language governance MUST NOT be used to bypass those boundaries.

## 6. Grammar Evolution

Vocabulary, Grammar, Memory, and Protocol are distinct.

| Layer | Responsibility | Must not become |
|---|---|---|
| Vocabulary | define versioned concepts and permitted terms | an unreviewed list extracted from usage |
| Grammar | define how concepts and operations may relate | a collection of popular associations |
| Memory | preserve reviewed Orientation Records, Patterns, and Grammar examples | a truth database or training corpus |
| Protocol | define exchange, authority, provenance, and decision rules | the current Vocabulary, Grammar, or application |

### 6.1 Vocabulary change

A Vocabulary change adds, clarifies, deprecates, or supersedes a concept
without necessarily changing permitted relationships among concepts.

### 6.2 Grammar change

A Grammar change modifies permitted structural relationships, operations,
transitions, or invariants. It requires stronger review because it changes what
can be expressed as a valid Orientation.

### 6.3 Memory change

A Memory change adds a reviewed record, Pattern, example, correction,
supersession, or withdrawal declaration. It does not modify Grammar by itself.

### 6.4 Protocol change

A Protocol change modifies exchange or authority rules. Language usage cannot
silently change the Protocol. Protocol revision requires a separately reviewed
RFC.

### 6.5 Examples are not rules

Grammar examples in Orientation Memory illustrate accepted usage under named
conditions. Repeated examples do not create Grammar rules without explicit
Grammar review.

## 7. Relationship Types

Relationship types require explicit, versioned semantics because the same
surface phrase may imply different authority, direction, evidence, and
validity conditions.

Initial conceptual categories include:

- structural;
- functional;
- historical;
- causal;
- analogical;
- symbolic;
- mathematical;
- observational;
- methodological;
- representational.

This list is descriptive and extensible. It does not authorize executable
relations or change certified relation vocabularies.

### 7.1 Required semantics

Every canonical relationship type MUST declare:

- identity and version;
- definition;
- permitted endpoint domains;
- directionality;
- symmetry or asymmetry;
- whether transitivity is permitted, forbidden, or undefined;
- applicable Reference Space;
- minimum supporting declarations;
- evidence expectations when Evidence is required;
- counterexample and limitation treatment;
- invalid uses;
- provenance requirements;
- compatibility with existing relationship types.

Undefined properties remain undefined. Implementations MUST NOT infer them from
the relationship name.

### 7.2 Category boundaries

A relationship may participate in more than one reviewed description, but
categories MUST NOT be collapsed silently. In particular:

- temporal sequence does not establish causation;
- analogy does not establish structural equivalence;
- symbolic association does not establish historical transmission;
- functional similarity does not establish shared origin;
- mathematical correspondence does not establish physical identity;
- repeated observation does not establish a universal law.

### 7.3 Extension

A future relationship category requires the Language Extension process in
Section 5. Model output, co-occurrence, or popularity is insufficient.

## 8. Pattern Governance

The canonical lifecycle is:

```text
Private Relationship
        ↓ explicit publication
Published Orientation Record
        ↓ documented recurrence
Pattern Candidate
        ↓ Human review
Accepted Pattern
        ↓ demonstrated Language limitation
Grammar Extension Candidate
        ↓ Human governance
Accepted Grammar Version
```

Every transition preserves provenance. No stage is automatic.

### 8.1 Pattern Candidate

A Pattern Candidate identifies a possible recurrence and its exact record
basis. It has no canonical Pattern authority.

Candidates MAY be proposed by Humans or external participants. Their origin
must remain visible.

### 8.2 Human review

Review MUST examine:

- record eligibility and publication consent;
- identity and provenance continuity;
- recurrence under comparable Reference Spaces;
- contradictory and limiting records;
- alternative explanations;
- relationship semantics;
- scope;
- bias introduced by available records;
- whether the candidate belongs in Memory, Vocabulary, Grammar, or nowhere.

### 8.3 Accepted Pattern

Acceptance records that Human governance considers the Pattern useful within
its declared scope. It does not establish truth and does not change Grammar.

### 8.4 Grammar Extension Candidate

Only an accepted Pattern accompanied by a demonstrated Language limitation MAY
become one input to a Grammar Extension Candidate. Neither recurrence nor
Pattern acceptance is sufficient by itself.

### 8.5 No canonicalization by popularity

Counts, votes, citations, provider confidence, model agreement, or usage
frequency MAY inform review. They MUST NOT perform review or issue canonical
authority.

## 9. Versioning

Orientation Records, shared publications, Memory releases, Patterns,
Vocabulary, Grammar, and Protocol versions evolve independently.

### 9.1 Immutable versions

Each identity/version pair identifies exactly one immutable payload. Reusing a
pair for changed content is forbidden.

### 9.2 Version references

Every derived object MUST reference the exact versions on which it depends.
For example:

- a Pattern references exact published Orientation Record versions;
- a Grammar Extension Candidate references exact Pattern and Language
  versions;
- a Grammar example references the exact Grammar version it illustrates;
- a Memory release identifies the exact entries it contains.

### 9.3 Compatibility

An accepted release MUST declare:

- compatible prior versions;
- deprecated terms or structures;
- superseding identities;
- migration requirements when any exist;
- unresolved incompatibilities;
- whether older records remain valid under their original Language version.

Older records MUST remain reproducible under the versions they originally
used. A new Grammar MUST NOT retroactively reinterpret them.

### 9.4 Correction and withdrawal

Correction creates a new version. Withdrawal creates a versioned declaration
that the object should not be used prospectively under stated conditions.
Neither operation erases historical existence.

Legal or safety requirements may restrict access to content. The remaining
record MUST preserve as much identity and history as permitted without
fabricating availability.

## 10. Questions as Evolution Drivers

Questions expose the practical limits of the current Orientation Language.

A Question may reveal:

- a missing concept;
- a missing operator;
- a missing relationship;
- a missing distinction;
- a missing representation;
- a missing transition type;
- an ambiguity in existing Grammar;
- a domain boundary that current Language cannot express faithfully.

### 10.1 Question-derived proposals

A Language proposal grounded in a Question MUST preserve:

- the exact Question or an authorized published projection;
- the attempted Orientation path;
- the point at which existing Language became insufficient;
- workarounds considered;
- why existing terms or Grammar could not express the need;
- the minimum extension required.

### 10.2 No arbitrary accumulation

The Language does not evolve by collecting every encountered phrase or
association. It evolves in response to documented Human Orientation problems
that survive review.

Questions precede extensions because they make the practical need and boundary
inspectable.

## 11. Replaceable Intelligence

External intelligence systems may participate as contributors.

They may propose:

- relationships;
- operator candidates;
- Source paths;
- Questions;
- representations;
- Pattern Candidates;
- possible missing distinctions.

They MUST NOT:

- define the Orientation Language;
- approve or reject Patterns;
- publish private Orientation Records;
- issue Human Decisions;
- alter Vocabulary or Grammar;
- assign canonical versions;
- train on private records without separate explicit authority;
- convert recurrence into truth;
- hide their identity or provenance.

### 11.1 Provider independence

Every proposal remains attributable to the adapter, provider, model when
available, context, time, and contract version that produced it.

Removing or replacing every current model MUST leave:

- published Orientation Records;
- Human Decisions;
- accepted Patterns;
- Vocabulary and Grammar versions;
- governance history;
- provenance;
- future review capability

intact and usable.

### 11.2 No automatic learning

This RFC defines no:

- weight update;
- fine-tuning;
- embedding update;
- autonomous rule induction;
- hidden feedback loop;
- provider memory;
- behavioral personalization;
- self-modifying Grammar.

Systems may assist review, but only Human governance may adopt a Language
change.

## 12. Library Participation

Library and Orientation Memory preserve different objects.

| Library preserves | Orientation Memory preserves |
|---|---|
| Sources | published Orientation Records |
| Source identities and versions | reviewed Orientation paths |
| Evidence objects | accepted and superseded Patterns |
| Collections | Grammar examples |
| editorial and access declarations | Language-evolution provenance |

### 12.1 Independent ownership

The Library does not own the Orientation Language merely because its Sources
appear in Orientation Records.

Orientation Memory does not own, copy, reissue, or reinterpret Sources merely
because it references them.

### 12.2 References

Memory entries MUST reference exact Library or Source identities and versions
when available. They MUST preserve authority, access, licensing, provenance,
and unavailable states.

A fragment in an Orientation Record does not become Evidence. A Pattern
derived from records does not become Evidence. Library Evidence does not become
a Grammar rule.

### 12.3 Portability

Libraries and Orientation Memory MAY be implemented or hosted independently.
Exchange requires stable references and explicit access authority. Storage
location does not transfer semantic ownership.

## 13. Long-term Ecosystem

The architectural sequence is:

```text
Open Orientation Protocol
        ↓
Orientation Grammar
        ↓
Orientation Memory
        ↓
Orientation Kernel
        ↓
Reference Implementations
        ↓
Applications
```

### 13.1 Open Orientation Protocol

The Protocol defines exchange, authority, provenance, and Human Decision rules.

### 13.2 Orientation Grammar

The Grammar defines the versioned language through which orientation
structures and transitions can be expressed.

### 13.3 Orientation Memory

Memory preserves published, reviewed Orientation paths, Patterns, and Grammar
examples. It provides inspectable historical material for future review.

### 13.4 Orientation Kernel

A Kernel performs only its declared and certified orientation
responsibilities. It consumes explicit versions and does not redefine
Protocol, Grammar, or Memory.

### 13.5 Reference implementations

Reference implementations demonstrate conformance and Human interaction. They
do not own the Protocol or Grammar.

### 13.6 Applications

Applications adapt the protocol to domains and environments. Domain use does
not transfer authority or permit silent Grammar changes.

### 13.7 Shared language

Independent systems may share the same Orientation Language when they:

- identify the exact Grammar version;
- preserve referenced object identities and provenance;
- implement compatible authority boundaries;
- keep extensions distinguishable from canonical Language;
- exchange records through accepted Protocol contracts.

## 14. Design Principles

### 14.1 Questions Before Answers

Language changes begin with documented limits encountered in real Human
Questions.

### 14.2 Patterns Before Conclusions

Recurrence becomes a reviewable Pattern before any stronger claim is
considered.

### 14.3 Relationships Before Categories

The protocol preserves explicit relationships and their semantics rather than
reducing material to broad labels.

### 14.4 Memory Before Training

Reviewed records remain inspectable and versioned. They are not silently
converted into model training.

### 14.5 Review Before Adoption

No record, Pattern, term, relationship, or Grammar change becomes canonical
without Human review.

### 14.6 Version Before Replacement

Change creates a new version and preserves the prior state.

### 14.7 Human Stewardship

Humans retain publication, review, acceptance, canonicalization, and
withdrawal authority.

### 14.8 Transparent Evolution

Every Language change states its need, basis, reviewers, provenance,
compatibility, and limitations.

### 14.9 Grammar Over Guessing

Undefined relations and operations remain undefined. Implementations do not
invent semantics from names or usage.

### 14.10 Open Participation

Humans and independent systems may propose additions through the same bounded,
traceable process.

### 14.11 Authority Never Emerges Automatically

Recurrence, popularity, provider agreement, storage, processing, and fluent
expression do not create canonical authority.

## 15. Closing

The Orientation Language is not complete. New Human Questions may expose
missing concepts, relationships, representations, and distinctions.

The Language evolves when those limits are documented in reproducible
Orientation Records, examined as Pattern Candidates, and accepted through
transparent Human governance.

Its purpose is not to create a system that knows everything. Its purpose is to
cultivate a shared language through which Humans and independent systems can
orient across disciplines, generations, and technologies.

If every current artificial-intelligence model disappeared, published
Orientation Records, accepted Patterns, Grammar versions, provenance, and
Human governance would remain. The Language could continue to evolve because
its authority resides in transparent stewardship rather than hidden learning.
