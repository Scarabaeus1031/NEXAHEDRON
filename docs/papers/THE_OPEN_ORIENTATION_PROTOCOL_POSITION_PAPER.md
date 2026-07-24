# The Open Orientation Protocol

## Position Paper v1.0

- Status: Architectural position
- Date: 2026-07-24
- Relationship to the RFC series: introductory and non-normative
- Implementation authority: none

## 1. Introduction

Modern civilization has become extraordinarily effective at producing and
preserving knowledge.

Books condense decades of thought into portable form. Scientific publishing
allows observations and methods to be examined beyond the place where they
originated. Databases make large bodies of structured information available
for repeated use. Software repositories preserve executable work and its
history. Libraries maintain collections across generations. Digital archives
extend access to fragile or distant material. Search engines make a remarkable
range of information discoverable within seconds. Artificial-intelligence
systems can generate explanations, comparisons, translations, and hypotheses
at a scale that would recently have been difficult to imagine.

These are substantial achievements. They have changed what a person can find
and what a group can build.

They have not removed a more basic difficulty: having access to information is
not the same as knowing how to orient within it.

A person investigating a question may move among a paper, a dataset, a map, a
repository, an archive, a search result, a conversation, and several generated
explanations. Each system presents material through its own boundaries. Each
has its own conventions for identity, version, authority, provenance, and
uncertainty. The person must remember which source said what, which version was
used, why two fragments appeared related, what was inferred, what remained
uncertain, and which conclusions were actually adopted.

This work is usually carried by the person in an informal and fragile way. It
may live in memory, browser tabs, notes, copied passages, filenames, or the
shape of a conversation. When the investigation is interrupted, shared with
another person, moved to another system, or revisited years later, much of that
orientation can disappear even when all the original information remains.

The problem becomes more visible as systems become more capable. A fluent
answer can gather material quickly, but it may be difficult to determine which
parts came from which source, which boundaries were applied, or which
alternatives were omitted. A carefully curated archive may preserve exact
documents while saying little about the path by which a particular question
was examined. A knowledge graph may expose connections without preserving why
a Human considered those connections useful. A search engine may retrieve
relevant pages without recording how the search changed the question.

Knowledge has not ceased to be scarce in every context. Many communities still
lack access, many records are absent, and much experience is poorly represented
in formal collections. Nevertheless, in a growing range of situations, the
central difficulty is no longer only obtaining more information. It is
maintaining a trustworthy position among heterogeneous information, systems,
representations, and authorities.

This paper calls that difficulty **orientation scarcity**.

Orientation is not a synonym for explanation or certainty. It is the ability to
see what is being considered, where it came from, how it has been represented,
which relationships are being proposed, what the boundaries are, what remains
unknown, and who is responsible for accepting or acting on the result.

The distinction matters:

- Knowledge may be abundant while provenance is fragmented.
- Sources may be accessible while their relationships remain unclear.
- Explanations may be fluent while their authority is ambiguous.
- Systems may be interoperable at the level of data while incompatible at the
  level of Human inquiry.
- A question may receive many answers without producing a stable orientation.

Orientation scarcity is also a coordination problem. Two people may possess
the same documents and still be unable to reconstruct one another's inquiry.
They may use different editions, attend to different fragments, apply
different boundaries, or attach different meanings to the same relation. A
shared folder solves access but not this divergence. A transcript preserves
sequence but rarely distinguishes proposal from adoption. A summary may
increase clarity while removing the decisions and uncertainties that produced
it. What is missing is a durable account of how material became relevant to a
particular Human question.

The Open Orientation Protocol begins from a modest premise: orientation may
deserve its own shared architectural layer.

## 2. The Missing Layer

Most existing information systems solve a particular part of the knowledge
problem well.

Libraries preserve and organize Sources. They sustain identity, custody,
cataloging, access, and editorial practices. Search engines retrieve material
from large and changing collections. Databases store structured values and
support precise queries. Repositories preserve files, versions, authorship,
and change history. Knowledge graphs represent entities and relations.
Scientific infrastructure supports data, methods, computation, citation, and
reproducibility. Note-taking systems help individuals retain and reorganize
their work. Artificial-intelligence systems can contribute language,
comparison, synthesis, and possible directions.

These systems are not deficient because they do not all perform the same role.
Their value often comes from specialization.

The difficulty appears between them.

Consider a researcher asking why a scientific explanation changed over time.
The investigation may require:

- a modern review article;
- several historical papers;
- a dataset;
- a diagram;
- a repository containing analysis code;
- an archive describing the institutional context;
- a model-generated list of possible counterarguments;
- notes recording why certain passages matter.

No single component should own this entire process. The archive should not
decide the meaning of the data. The model should not become the authority for
the historical record. The repository should not decide which interpretation
the researcher accepts. The note-taking system should not silently convert a
copied passage into Evidence. The search engine should not determine when the
inquiry is sufficient.

Yet the Human needs a way to preserve the inquiry across all of them.

What is missing is not necessarily another comprehensive application. A single
application attempting to absorb Libraries, Sources, models, repositories,
search, analysis, and Human judgment would create a new concentration of
authority. It might improve convenience while making the boundaries less
visible.

The missing layer is instead a common protocol for orientation.

An Orientation Layer would not replace the systems below it. It would allow
them to participate through bounded roles:

- a Source remains a Source;
- a Library remains responsible for its own identities and Evidence;
- an external intelligence system contributes proposals;
- a deterministic kernel performs only its declared operations;
- an application presents the work;
- the Human retains intention, interpretation, acceptance, and decision.

Such a layer would preserve the state of an inquiry without requiring every
participant to share an implementation. It would make it possible to say:

- this was the exact question;
- this was the context disclosed for this operation;
- these were the Sources and versions encountered;
- these were the fragments the Human kept;
- this relationship was Human-authored;
- this observation was proposed by a named external system;
- this proposal was accepted but did not alter the work;
- this other proposal was merged into a Human-owned field;
- this uncertainty remained;
- this is where the Human chose to rest.

These statements are not primarily about user-interface behavior. They are
about exchange, authority, identity, and provenance.

The proposal therefore treats orientation as a layer between Human inquiry and
the systems that participate in it. It does not presume that all questions have
one correct representation or that every domain should use the same methods.
It asks instead whether different systems can share a minimal language for
bounded context, contribution, decision, and provenance.

## 3. Why Existing AI Is Not Enough

Large language models and related systems are remarkable contributors to
knowledge work. They can make unfamiliar material approachable, propose
questions, identify possible connections, translate terminology, and help a
person move through a difficult subject. These capabilities are relevant to
orientation.

They are not, by themselves, a stable shared Orientation Space.

This is an architectural observation, not a criticism of model quality.

A model normally receives a context chosen by an application or orchestration
system. That context may include source material, instructions, retrieved
documents, prior messages, hidden system text, and provider-specific metadata.
The Human may not know the complete boundary. The model then produces an
output, but the ownership of that output's meaning is not established merely
by generation.

Several distinctions remain necessary:

- The model did not author the Source it was shown.
- Receiving a fragment does not make the model its custodian or authority.
- Producing a plausible relationship does not make the relationship accepted.
- Expressing confidence does not establish evidential validity.
- Generating a source suggestion does not turn that suggestion into a resolved
  Source or Evidence.
- A provider's internal continuity does not constitute Human-owned,
  reproducible history.
- A fluent response does not establish why the Human adopted one part and
  rejected another.

Models also change. Providers replace versions, alter interfaces, modify
retention policies, and improve capabilities. Local models can disappear as
quickly as hosted ones. A durable orientation architecture should benefit from
these systems without making its basic records dependent on any one of them.

The Open Orientation Protocol therefore treats artificial intelligence as a
replaceable participant.

A participant receives an explicit, minimized Orientation Context. It returns
bounded Contributions rather than an unrestricted answer carrying implied
authority. Each Contribution retains its origin, context, provider or model
identity when available, time, limitations, and traceability. The Human then
decides whether to accept, reject, merge, discard, or postpone it.

This structure is intentionally conservative. It gives models room to be
useful while refusing to solve authority through fluency.

It also allows non-model systems to participate through comparable boundaries.
A scientific database may propose a Source path. A retrieval engine may return
a candidate collection. A specialist reasoning system may identify a possible
contradiction. A local model may raise an Open Question. The Orientation Layer
does not need to treat any of these systems as the owner of the inquiry.

The aim is not to constrain intelligence to the point of uselessness. It is to
make participation inspectable and reversible.

## 4. Orientation as Infrastructure

Digital infrastructure often becomes durable when a shared problem is
separated from a particular implementation.

HTTP did not define the purpose of every website. It provided a common
application-layer exchange model. Git did not define what software should be
written. It provided an object and history model that made distributed change
inspectable. Unicode did not decide what people should say. It established a
long-lived framework for representing text across systems. Markdown did not
define publishing as a whole. It provided a modest shared notation. The
Language Server Protocol did not require one editor or one programming
language. It established a boundary through which replaceable tools could
cooperate.

The Open Orientation Protocol is comparable to these efforts only in spirit.
It does not perform their functions and is not yet mature enough to claim
their level of interoperability.

The relevant lesson is narrower: when a responsibility is expressed as an open
protocol, the first application no longer has to remain the permanent center.

Treating orientation as infrastructure would mean that:

- a Question could retain identity when moved between tools;
- a bounded Context could be inspected before an external system receives it;
- Source and fragment references could retain provenance across applications;
- Contributions could remain distinguishable from Human Decisions;
- a Human-reviewed Orientation Record could outlive the session that created
  it;
- different implementations could share a Grammar without sharing providers;
- historical records could remain interpretable under the versions they used.

This does not require one global system. It requires stable boundaries and
explicit compatibility.

An open protocol also makes disagreement easier to locate. Two implementations
might disagree about presentation while sharing the same Contribution
contract. Two communities might maintain different Orientation Grammars while
sharing provenance rules. A domain-specific kernel might support operations
that another kernel does not. These differences need not be hidden behind a
single product experience.

Protocols do not eliminate governance. In many cases they make governance more
important. Someone must define identities, versions, compatibility,
registries, conformance, and change processes. The Open Orientation Protocol
therefore does not assume that openness automatically produces neutrality.
Its architecture must be reviewed for institutional capture, semantic
fragmentation, privacy, and long-term stewardship.

The current proposal is best understood as a constitutional foundation for
such infrastructure. It defines the responsibilities that should remain
separate before more detailed exchange specifications are written.

## 5. Core Principles

### Human meaning remains Human

Systems can organize, retrieve, compare, translate, calculate, and propose.
They do not acquire ownership of what an orientation means to a person. The
Human retains the decisions to adopt, revise, continue, rest, or act.

### Sources retain ownership

Copying, indexing, displaying, or processing a Source does not transfer its
ownership. Source identity, version, access, and licensing remain visible.
Applications and models do not become Source authorities through use.

### Evidence remains traceable

Evidence is not simply information that appears relevant. Its source,
authority, version, provenance, validation state, and relationship to a
particular use must remain distinguishable. A Contribution or frequently used
Source does not become Evidence automatically.

### Context is explicit

Context is a bounded, versioned object, not whatever an application happens to
send to a model. When external participation is involved, the Human should be
able to inspect what will be disclosed and for which operation.

### Questions precede conclusions

Orientation begins from an expressed Human Question. The Question establishes
why material is being encountered and why a Contribution may be useful. Later
systems may propose refinements, but they do not silently replace it.

### Unknown remains unknown

Missing identity, uncertain provenance, unavailable Sources, unresolved
relationships, and unsupported operations remain visible. A plausible default
is not a substitute for an explicit unknown.

### Authority does not follow data flow

Receiving or storing an object does not transfer authority over it. A Library
may preserve a kernel-issued artifact without owning its semantics. A model may
read a Human-kept fragment without owning the Source. An application may
present a Contribution without accepting it.

### Intelligence is replaceable

The protocol depends on bounded contracts rather than provider-specific
behavior. Replacing a model should not require rewriting Human Decisions,
Source identity, or historical Orientation Records.

### History is immutable

Changes create new versions. Corrections, redactions, supersessions, and
withdrawals should not silently rewrite prior records. Historical
reproducibility and present access are different questions.

### Participation is explicit

External systems participate only through named operations. Background access,
silent provider substitution, hidden synchronization, and automatic adoption
are incompatible with Human-governed orientation.

### Rest is valid

Orientation need not continue until an application runs out of options. The
Human may decide that the current state is sufficient for now. Rest does not
claim completeness or certainty.

## 6. The Architecture

The proposal can be summarized as:

```text
Question
        ↓
Orientation Context
        ↓
Contributions
        ↓
Human Decision
        ↓
Orientation Record
        ↓
Orientation Memory
        ↓
Orientation Language
        ↓
Future Questions
```

This is a conceptual sequence, not a required screen flow.

### Question

The Question identifies what the Human is trying to orient. It is not
necessarily polished or stable. Its importance lies in making the purpose of
the inquiry explicit.

Questions also reveal limitations in the available language. A person may
encounter a distinction for which no suitable concept exists, a relationship
that cannot be stated precisely, or a transition that no current representation
supports. These difficulties become relevant later when the shared
Orientation Language is reviewed.

### Orientation Context

The Orientation Context is the exact bounded state made available for one
operation. It may include the Question, intent, active Source, Human-kept
fragments, Human-authored relationships, boundaries, current phase, and
permitted Contribution types.

The Context is immutable after approval. If it changes, it receives a new
identity. This makes permission and provenance specific rather than
approximate.

The Context is also minimized. A system does not receive the entire Workspace
merely because it can process it. Unrelated history, private diagnostics,
credentials, undisclosed material, and inferred personal attributes remain
outside the boundary.

### Contributions

External systems participate through proposed Contributions. The initial
architecture uses deliberately weak forms:

- an Observation;
- an Open Question;
- a Suggested Source.

These forms can direct attention without claiming that a conclusion is true or
that an action should follow. Each Contribution retains its exact Context,
origin, limitations, and traceability.

### Human Decision

The Human may accept, reject, merge, discard, or postpone a Contribution.
Acceptance records usefulness but changes nothing automatically. Merge is the
only action that copies selected Contribution content into a Human-owned
field, and the copied material retains its lineage.

This distinction prevents generated material from entering the Orientation
State merely because it was displayed.

### Orientation Record

An Orientation Record is a Human-reviewed account of one completed or
deliberately rested process. It is not a transcript, prompt history, or training
sample.

The Record can preserve the original Question, Context versions, encountered
Sources, exact fragments, Human relationships, Contributions, Decisions,
merged material, remaining Open Questions, limitations, uncertainty, and
provenance.

Private work does not become a shared Record automatically. Publication
requires a separate Human decision identifying the exact version and disclosed
content.

### Orientation Memory

Orientation Memory preserves published, Human-reviewed Orientation paths. It
is not a database of facts.

Over time, records may reveal recurring structures: bridges between
disciplines, useful Source paths, repeated representations, recurring
transitions, or common boundaries. These recurrences may become Pattern
Candidates. They do not become accepted Patterns or Grammar rules through
frequency alone.

### Orientation Language

The Orientation Language contains the concepts and Grammar used to describe
orientation. It may evolve when real Questions expose missing distinctions,
relationships, representations, or transition types.

Evolution is reviewed and versioned. Memory can provide examples and Pattern
bases, but Memory does not own the Language. External systems may propose
extensions, but they cannot approve them. An accepted Grammar version remains
a Human-governed artifact.

### Future Questions

Every orientation can change what becomes visible next. A resolved ambiguity
may reveal another boundary. A Source may introduce a new Question. A Pattern
may fail in a different Reference Space. A Grammar extension may make a
previously inexpressible inquiry possible.

The sequence is therefore recursive. It returns to Human Questions rather than
terminating in a system-owned conclusion.

## 7. Why NEXAHEDRON Exists

The Open Orientation Protocol is not an application. A protocol of this kind
still needs to be tested through actual Human use.

NEXAHEDRON exists as the first reference implementation.

Its purpose is to make architectural claims observable:

- Can a Human remain oriented around one persistent Question?
- Can real Source material remain present rather than collapse into metadata?
- Can exact fragments retain their Source context?
- Can external Contributions remain visibly separate from Human Reflection?
- Can a Human accept or merge a proposal without losing provenance?
- Can Rest remain a valid ending?
- Can a deterministic orientation kernel remain outside the Human Workspace
  until explicitly invoked?

A reference implementation is valuable because specifications can appear
clear while failing in use. A boundary that is easy to state may be confusing
in an interface. Provenance that is complete in a data model may be unreadable
to a person. Consent that is technically explicit may arrive too late to be
meaningful. The application provides a place to discover such problems.

NEXAHEDRON does not own the protocol. Its visual language, routes, component
structure, technology choices, and current source limitations are not
normative.

Future implementations may look entirely different. A scientific notebook
might use Orientation Contexts around experiments. An integrated development
environment might preserve Questions, repository fragments, and diagnostic
Contributions. A browser might allow a person to collect exact fragments
across sources while retaining versions and authority. An educational tool
might make Questions, uncertainty, and Rest visible during study. A medical
system would require additional professional, regulatory, and safety
boundaries.

The protocol should remain meaningful if NEXAHEDRON disappears. The reference
implementation succeeds architecturally only if other systems can challenge,
replace, or reinterpret its interface while preserving the protocol's
authority boundaries.

## 8. Research Questions

The proposal leaves substantial questions unresolved.

### How should Orientation Memory evolve?

Memory must preserve reviewed paths without becoming a truth database or an
unbounded collection. Criteria for inclusion, correction, withdrawal,
federation, and long-term custody remain open.

### What constitutes a useful Orientation Pattern?

Recurrence is not enough. A useful Pattern may need comparable Reference
Spaces, explicit boundaries, counterexamples, and evidence of practical value.
Different disciplines may require different standards of review.

### How should Grammar change?

Vocabulary additions, relationship semantics, new representations, and
Grammar changes carry different compatibility risks. A durable review and
versioning model is still needed.

### How should Human governance scale?

“Human-reviewed” is not a sufficient institutional design. Roles such as
record author, affected participant, publisher, domain reviewer, Language
steward, and registry authority may need to be separated. Governance must
avoid both unaccountable centralization and semantic fragmentation.

### How should provenance survive generations of software?

Identifiers, cryptographic methods, resolvers, file formats, and hosting
institutions change. Long-term provenance requires more than preserving a
current JSON object or URL.

### How should different Orientation Languages interact?

Independent communities may develop different Grammars or relationship
semantics. Translation cannot be assumed to be lossless. Compatibility,
mapping, and declared non-equivalence require study.

### What is the durable identity model?

The protocol depends on immutable identities for Contexts, Records, Sources,
fragments, Contributions, Patterns, and Grammar versions. Issuing domains,
collision handling, resolution, and long-term availability are not yet fully
specified.

### How should privacy coexist with immutable history?

Private Orientation must never become shared automatically. Published records
may later require redaction, withdrawal, or restricted access. Reproducibility
and legitimate deletion obligations may conflict.

### How should conformance be assessed?

An implementation may support Context and Contributions but not Memory or a
kernel. Useful partial conformance requires profiles, capability negotiation,
and testable boundaries.

### How should presentation influence be governed?

An application may preserve formal authority while manipulating attention
through ordering, defaults, or visual emphasis. Human authority requires more
than correct object ownership.

### Where should standardization stop?

Too little specification produces incompatible systems. Too much
standardization may impose one cultural or disciplinary model of orientation.
The protocol must distinguish universal exchange requirements from
domain-specific Grammar and practice.

These questions are not secondary cleanup. They determine whether the proposal
can become durable shared infrastructure.

## 9. Relationship to the RFC Series

This Position Paper motivates the problem. It is non-normative.

The RFC series defines the architecture and its future contracts:

```text
Position Paper
        ↓
RFC-0001
The Open Orientation Protocol
        ↓
RFC-0011
Orientation Memory and Language Evolution
        ↓
Future RFCs
```

RFC-0001 defines the constitutional foundation: authorities, Orientation
State, explicit Context, Contributions, Human Decisions, provenance,
replaceable intelligence, and the distinction between protocol, kernel,
reference implementation, and application.

RFC-0011 describes how published, Human-reviewed Orientation Records may form
an Orientation Memory and how that memory may support transparent,
versioned Language evolution without automatic learning.

Future RFCs are expected to address narrower architectural responsibilities,
including Context, Source Surfaces, Encounter, Contributions, Adapter
Participation, Library exchange, Human Decisions, Provenance, Grammar,
identity, compatibility, governance, security, and conformance.

The series is intentionally incremental. A reserved or proposed RFC does not
authorize implementation. Detailed specifications should follow demonstrated
needs and preserve the boundaries established before them.

## 10. Closing

The Open Orientation Protocol asks whether orientation itself should be treated
as a first-class layer of digital infrastructure.

The proposal begins from an observable condition: people increasingly work
across many capable knowledge systems, but the context, provenance,
relationships, uncertainty, and decisions that make an inquiry understandable
often remain local, informal, and fragile.

A protocol may provide one way to preserve those elements without requiring a
single application or intelligence provider to own the process.

The current architecture is incomplete. Its identity, compatibility,
governance, security, conformance, privacy, and long-term preservation models
require further work. It is not yet a mature interoperability standard, and it
may prove too broad or too formal for some forms of inquiry.

Nevertheless, the underlying question appears worth discussing:

Can Humans, Sources, Libraries, deterministic systems, and replaceable
intelligence participate in one Orientation Space while keeping authority,
provenance, uncertainty, and Human meaning distinct?

Whether the Open Orientation Protocol proves useful will depend on its ability
to help Humans orient together across knowledge, disciplines, and technologies
without hiding the origin of material or transferring ownership of meaning to
the systems that assist them.

This paper offers no prediction about that outcome. It is an invitation to
examine the problem and the proposed boundaries carefully.
