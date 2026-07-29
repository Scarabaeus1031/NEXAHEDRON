# ORION Version 1 Live Integration

- Status: implemented with one immutable-boundary blocker
- Consumer: NEXAHEDRON Alpha
- Dependency: external ORION Version 1 Release Candidate
- Supported operator: Understand only
- Effects: none

## Immutable dependency identity

The executable dependency is identified by both the audited ORION repository
base revision and its canonical-content fingerprint, recorded in
`docs/upstream/orion-v1/SOURCE.yaml`. Before development transport, integration
tests or contract generation starts, NEXAHEDRON hashes the frozen contract
specifications, policies, operators, public models, Gateway, Runtime, corpus
manifest, workspace declaration and Version file. Revision or content mismatch
stops execution.

TypeScript declarations under `packages/orion-gateway/src/generated/` are
derived mechanically from the verified `orion.public_contracts.models` module.
They are generated artifacts, not a second semantic authority.

## Boundary

NEXAHEDRON maps its Human-confirmed local state to an exact
`orion.orientation-request/1.0` object. Its same-origin transport route forwards
the transport envelope to the NEXAHEDRON-owned Python HTTP adapter. That adapter
invokes `OrientationGateway.handle` and serializes only the Gateway's validated
public contract outcomes.

```text
NEXAHEDRON interaction state
  → request mapping
  → POST /api/orientation
  → NEXAHEDRON HTTP transport adapter
  → immutable OrientationGateway
  → immutable OrientationRuntime
  → public Version 1 contracts
  → direct presentation mapping
```

The transport adapter imports only `orion.gateway` and
`orion.public_contracts`. It contains no Operator, evidence-selection,
validation, provider, prompt, persistence or report-interpretation behavior.

## Request identity mapping

- Human-confirmed mode is always `understand`.
- Human intention, focus, success boundary and Scope are copied without
  semantic rewriting.
- Human-created Questions, Notes, Observations, Ideas and Conversations receive
  a session-local identity and version `1`.
- External objects without a supplied version remain `unknown`; source owner is
  also `unknown`. Missing identity is never invented.
- Wonder remains a Human annotation.
- Effects are always `none`.
- No Evidence Reference is constructed by the application. Evidence remains a
  Library/external-authority responsibility.

## Public outcomes

The presentation layer discriminates only by the frozen `schema_version` and
renders:

- complete, partial and blocked `OrientationReport` objects;
- `ClarificationResult` with its associated clarification Runtime Error;
- every declared `RuntimeError.kind`, including unsupported and unavailable;
- associated `ContinuationOption` and exact `EvidenceReference` objects.

Report sections preserve contract order. Evidence order is the report's order.
Empty fields remain visible as `None` or `Not provided`. No summary, evidence,
confidence or recovery behavior is invented.

## Consumer failure categories

Failures before a valid public outcome are presented independently:

- `transport_failure` — the browser request could not complete;
- `gateway_failure` — the external Gateway boundary could not be reached;
- `contract_violation` — the returned outcome set violates the public lifecycle;
- `invalid_public_response` — JSON or envelope structure is not consumable;
- `unsupported_contract_version` — a public discriminator is not Version 1.0.

ORION `RuntimeError(kind="unavailable")` is a validated public Runtime outcome
and remains distinct from all five consumer boundary failures.

## Current evidence boundary

The Alpha has no Library adapter. It therefore submits an empty evidence array.
After readiness succeeds, the real Runtime correctly returns a blocked report:

```text
no contract-valid Evidence Reference traces to this report
```

Integration tests also pass a freshly constructed, contract-valid public
Evidence Reference through the same transport and real Gateway. That proves the
complete report and continuation path without adding a production fixture or
alternate Runtime path. The application itself never fabricates that evidence.

## Immutable clarification-lineage blocker

A clarified request is required to contain `clarification_of`. The frozen
cross-contract validator requires that reference to resolve to the exact prior
`ClarificationResult` in the validated contract set.

The frozen `OrientationGateway.handle` public signature accepts only the new
request payload and evidence. It has no parameter for prior clarification
contracts. During outcome validation it constructs a contract set containing
only the new request and new outcomes. The required prior clarification is
therefore absent, and the Gateway returns the valid public Runtime Error:

```text
kind: validation_failed
reason_code: runtime_outcome_invalid
```

NEXAHEDRON preserves the original request, collects only the missing values,
constructs request version `2` with the correct `clarification_of`, and submits
it unchanged. It does not remove lineage, call the Runtime directly, inject a
private contract into the Gateway, or change ORION.

This prevents the clarification loop from completing through the immutable
public Gateway. Resolution requires an approved ORION compatibility decision;
it cannot be solved inside NEXAHEDRON without violating the accepted boundary.

## Runtime configuration

The external transport is configured with `ORION_GATEWAY_URL`. Local development
defaults to `http://127.0.0.1:4317/orientation/v1/requests`. The Python adapter
uses `ORION_SOURCE_PATH` to locate the pinned external checkout and requires
Python 3.10 or newer. `ORION_PYTHON` may select the interpreter explicitly.

The controlled Readiness Alpha deployment configures an authenticated
server-side Version 1 Gateway through `ORION_GATEWAY_URL` and
`ORION_GATEWAY_BEARER_TOKEN`. The bearer credential is never exposed to the
browser. A missing hosted credential fails closed as `gateway_failure` with
`gateway_credentials_unavailable`; an unreachable endpoint remains
`gateway_unavailable`.

This deployment does not make Runtime or Gateway part of the certified Version
1 Core, add a production evidence adapter, or resolve the immutable
clarification-lineage blocker described above.
