# Purpose

NEXAH is an Orientation Layer that helps Humans orient across existing
information without replacing its sources or Human judgment. NEXAHEDRON is the
Orientation Laboratory and consumes immutable ORION Version 1 public behavior.
Implementation follows the documented architecture. Agents improve the
implementation; they do not redesign accepted boundaries.

These instructions apply to the entire repository unless a more specific
`AGENTS.md` exists in a subdirectory.

# Read first

Before changing files, read in this order:

1. [`MANIFESTO.md`](MANIFESTO.md)
2. [`README.md`](README.md)
3. [`CONTRIBUTING.md`](CONTRIBUTING.md)
4. Current Architecture:
   [`APPLICATION_ARCHITECTURE.md`](docs/architecture/APPLICATION_ARCHITECTURE.md)
   and
   [`AUTHORITY_BOUNDARIES.md`](docs/architecture/AUTHORITY_BOUNDARIES.md)
5. Current Roadmap:
   [`NEXAHEDRON_ALPHA_EXECUTION_ROADMAP.md`](docs/roadmap/NEXAHEDRON_ALPHA_EXECUTION_ROADMAP.md)

Then read every canonical document named by the files you will touch. Evidence
work requires the Evidence Architecture and Evidence Binding Architecture.
ORION integration work requires the live-integration documentation and pinned
source manifest.

Do not begin implementation until the owning boundary, current behavior and
active milestone are understood.

# Working rules

- **Reproduce before changing.** Observe the current behavior and run the
  relevant existing test before implementing a fix.
- **Never invent architecture.** Use accepted documents and existing seams. A
  convenient local abstraction does not create new authority.
- **Never duplicate ORION logic.** NEXAHEDRON must not perform Orientation,
  readiness inference, evidence selection, report validation or Continuation
  generation.
- **Respect authority boundaries.** Preserve Human intention and decisions,
  Library evidence authority, ORION navigation authority and NEXAHEDRON
  presentation responsibility.
- **Use only public ORION boundaries.** Never import Runtime internals,
  Operators, provider code or private validation into NEXAHEDRON.
- **Prefer small verified changes.** Separate behavior, cleanup, generated
  output and governance work.
- **Keep history readable.** Preserve historical records. Correct current
  guidance prospectively rather than rewriting earlier phase evidence.
- **Preserve generated files.** Do not hand-edit generated contract
  declarations. Change their authoritative source only when authorized, then
  use the documented generation command.
- **Preserve exact public values.** Do not repair, merge, reorder or reinterpret
  public contract fields in presentation or transport.
- **Keep unknowns visible.** Never replace `unknown`, unavailable, blocked or
  unverified states with invented defaults.
- **Fail closed.** Dependency, contract and version mismatch must stop the
  affected execution path with a clear diagnostic.
- **Protect user material.** Do not place submitted content, credentials or
  private diagnostics in logs, fixtures or committed files.
- **Respect the worktree.** Existing unrelated changes belong to the user. Do
  not overwrite, revert or reformat them.
- **Run verification after every change.** Report only commands actually run
  and their real results.

# Protected surfaces

Do not modify these without explicit, accepted governance authority:

- ORION public contracts, executable contract models and validators;
- Evidence Architecture;
- Evidence Binding Architecture;
- authority and responsibility boundaries;
- public identity, lifecycle and version semantics;
- ORION Version 1 Runtime or Gateway behavior;
- version pins and compatibility policy;
- canonical roadmaps;
- Launch Strategy;
- Manifesto;
- accepted ADRs and governance decisions;
- the meaning of public outcomes or effects.

A user request to implement a feature is not automatically governance authority.
If work requires a protected change, stop and identify the exact governing
document and required review path.

# Safe work

Safe work is bounded by the current roadmap and the user's explicit request.
Examples include:

- regression and integration tests for existing behavior;
- confirmed bug fixes;
- accessibility fixes;
- current-documentation corrections;
- frontend presentation and interaction within existing contracts;
- transport hardening that preserves Gateway semantics;
- build, tooling, deployment and CI improvements;
- dependency and generated-contract verification;
- security and privacy hardening;
- measured performance improvements without semantic change;
- small refactors with unchanged behavior;
- small UX improvements supported by an observed problem;
- reproducibility and diagnostics improvements.

Safe work stops being safe when it crosses a protected surface or expands the
active milestone.

# Unsafe work

Do not perform the following without separately accepted authority:

- add or implement new Orientation Operators;
- change Runtime or Gateway behavior;
- create hidden fallback or alternate execution paths;
- replace real integration with mocks, fixtures or simulated reports;
- add client-side reasoning, readiness inference or report interpretation;
- manufacture Evidence References, relationship or report traceability;
- reassign Human, Library, ORION, LYRA, NEXAH or NEXAHEDRON authority;
- change public contracts, validators or identity semantics;
- reinterpret existing fields to support a new feature;
- weaken dependency, architecture or contract verification;
- silently introduce persistence, providers, authentication or Library writes;
- begin Version 2 design or implementation;
- implement deferred Atlas, LUCY, federation or advanced evidence work;
- disguise research or future behavior as current capability;
- broaden product claims through code or documentation.

# Verification

For implementation changes, run the complete repository verification:

```bash
npm run check
npm test
```

Use `npm ci` first when dependencies are not already installed or the lockfile
changed.

For documentation-only changes, at minimum run:

```bash
npm run check:docs
git diff --check
```

Also run any narrower test that reproduces the changed behavior. Browser-facing
changes require the relevant browser or rendered-interface verification.
Integration changes require the real Gateway integration tests.

Never claim a check passed when it was not run. If verification is blocked,
state the exact command, blocker and unverified risk.

# Pull Requests

Keep pull requests small, focused and independently reviewable.

Every pull request should explain:

- the observed problem;
- why this repository and component own it;
- what changed and what intentionally did not change;
- why the solution preserves current boundaries;
- user-visible effects, including none;
- verification commands and results;
- remaining limitations;
- whether any protected surface was reviewed.

Do not combine implementation with a governance decision. Governance is
reviewed and accepted first; implementation follows in a separate change.

# When uncertain

Stop.

State the uncertainty precisely. Reference the governing document and affected
boundary. Explain what can be verified without making an assumption.

Do not guess, invent a default, weaken a check or move responsibility into a
convenient layer.

# Final principle

Improve the implementation.

Protect the architecture.
