# NEXAHEDRON — Final Navigation & About Review

## Navigation decision

“Explore” should not remain in the primary navigation.

For a first-time visitor, “Explore” and “Cases” both promise discovery without
making their difference clear. “Cases” is the stronger public entrance because
it leads to complete, bounded experiences rather than an abstract mode of
browsing.

Cases is now the single primary discovery page. It inherits the clear invitation
“Begin with what draws your attention” and introduces the collection through a
subject or a question.

The existing Explore page remains available as a contextual continuation from
Cases, the Library, and existing orientation links. Its purpose is now explicit:
continue beyond one case through visible relationships, questions, and
evidence. Removing it from the menu eliminates the duplicate entrance without
breaking established paths or discarding Version 1 material.

The primary navigation now answers distinct visitor intentions:

| Destination | Visitor intention |
|---|---|
| Home | Understand where I have arrived |
| Cases | Begin with a complete example |
| Library | Browse the available material |
| About | Understand the project |
| Visitor Guide | Find my place in the ecosystem |
| Begin Orientation | Bring my own question |
| GitHub | Inspect the reference implementation |

## About implementation

The opening headline, typography, spacing, principles table, and visual language
remain unchanged.

Three concise identity sections now appear before “Why Orientation?”:

1. **NEXAH is a place for orientation.**
   Defines the Orientation Ecosystem through research, the deterministic Core,
   and the Human-facing Workspace.

2. **ORION makes structure inspectable.**
   Defines the certified deterministic Core and states that it does not decide
   meaning or Human action.

3. **One person. One question. One bounded session.**
   Defines NEXAHEDRON as the Human-facing Workspace and names the Human-owned
   Orientation Record.

The original “Finding is not the same as understanding,” durable principles,
and contribution sections follow in their existing order.

The invitation hierarchy now privileges experience:

1. Begin with a case.
2. Bring your own question.
3. Inspect the reference implementation.

No diagram, card system, repository explanation, or new component was added.
The existing `about-statement` composition carries the full revision.

## Visitor understanding

After the revision, a first-time visitor can explain the ecosystem in under one
minute:

> NEXAH is the Orientation Ecosystem. ORION is its certified deterministic
> Core. NEXAHEDRON is the Human-facing Workspace where a person can undertake
> one bounded Orientation Session while keeping judgment and the resulting
> Orientation Record Human-owned.

The page also answers why the project exists: finding and summarizing
information do not by themselves reveal relationships, support, boundaries, or
meaningful next directions.

The next action is unambiguous. A visitor may begin with an existing Case or
bring a question to the Workspace. Repository inspection is available, but no
longer presented as the first invitation.

## Final recommendation

Ship this navigation and About experience as the Version 1 editorial baseline.

The change removes one ambiguous primary-navigation choice, clarifies the three
ecosystem identities before presenting principles, and preserves every frozen
authority boundary. The page remains calm, typographically unchanged,
responsive through the existing layout rules, and free of new architectural or
technical language.

Verification confirmed:

- the production build succeeds;
- documentation consistency and lint checks pass;
- all 25 focused navigation, public-page, accessibility, and Orientation Case
  tests pass;
- the rendered About page has one H1 and a logical heading sequence;
- the identity sections and invitation actions appear in the intended order;
- the primary navigation contains no duplicate Explore entrance;
- the existing Explore route and its contextual landmarks remain available;
- the skip link, current-page state, focusable destinations, and existing
  responsive CSS remain intact;
- the tested desktop viewport has no horizontal overflow;
- `git diff --check` is clean.

The repository-wide verification still stops at the already documented ORION
canonical-content fingerprint mismatch: 64 of 69 tests pass, while five
cross-repository handoff and integration tests fail closed against the
unreviewed ORION checkout. That external dependency condition is unchanged by
this editorial pass and must remain visible in the overall release decision.
