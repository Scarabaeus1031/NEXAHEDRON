# THE EYE local result view

`/the-eye` is a local-only inspection surface for six fixed A3/A4 demonstrations. It is not a general file browser, comparator, scientific application, ORION bridge, or public deployment.

The guided experience follows one presentation-only sequence: orient, choose a sealed demonstration, see the exact result, understand I/L/A/U, inspect the complete machine evidence, and return to a separate Human decision. `PASS` means only that the declared comparison criterion was met; it does not establish scientific correctness or a mechanism. `STOP` returns control to the Human without rewriting, approving or invalidating the machine result.

The first demonstration is visually recommended for orientation only. No demonstration is automatically selected or fetched, and the six canonical IDs and expected outcomes remain unchanged.

Start the existing local NEXAHEDRON process with two server-only environment values:

- `THE_EYE_LOCAL_ARTIFACT_ROOT`: canonical directory containing the allowlisted `a3/` and `a4/` artifact layout.
- `THE_EYE_A2_VERIFIER`: absolute path to the sealed A2 executable exposing `verify-result` and `verify-receipt`.

The local server canonically resolves every allowlisted artifact, rejects traversal, absolute client paths, symlink escape, non-JSON/Markdown types, non-files, missing files, and files larger than 2 MiB. The browser supplies only one of six closed demonstration IDs. It receives no private filesystem path and no shell input.

Canonical A2 JSON remains the sole result authority. The server invokes A2 before projecting a result. TypeScript does not calculate alignment, I/L/A/U, residuals, decisions, evidence stage, mechanism status, canonical JSON, self-hashes, or receipt validity. An unavailable A2 verifier produces `UNVERIFIED`.

Exports return the original artifact bytes. Markdown is exposed only after its result ID, canonical result hash, decision, I/L/A/U counts, and residual count agree with the A2-verified result. Human controls are separate and transient; no option is preselected and STOP creates no receipt.

The workspace status copy describes the current private staging boundary. It does not expose the private deployment location, workspace identity or custody metadata, and it does not authorize public release.
