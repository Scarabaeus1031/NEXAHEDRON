# THE EYE curated online runtime boundary

Status: A6 deployment-ready candidate; not deployed or publicly released.

## Authority

Kernel 0.7 produces records. A4 performs the bounded lossless translation. A2 owns comparison, alignment, I/L/A/U, residuals, decisions, result self-hashes, and receipt verification. A6 selects, invokes A2 before packaging, redacts private provenance paths, and produces an immutable allowlisted package. NEXAHEDRON presents that package. The Human owns meaning, approval, release, and deployment.

`PASS` does not mean correct, scientifically valid, mechanism established, Human-approved, or production-certified. Scientific validity is not evaluated. Public demonstration is not a scientific result.

## Closed runtime modes

`THE_EYE_RUNTIME_MODE=LOCAL_VERIFIED` preserves A5. It requires `THE_EYE_LOCAL_ARTIFACT_ROOT` and `THE_EYE_A2_VERIFIER`, reads only the six catalogued local demonstrations, and invokes A2 during the local request.

`THE_EYE_RUNTIME_MODE=CURATED_BUNDLED` reads only the generated in-memory manifest and its 20 statically bundled assets. It performs package-integrity SHA-256 checks but does not execute A2, Kernel, ORION, a shell, a child process, a filesystem read, or an artifact network request. It reports `VERIFIED_BEFORE_PACKAGING`.

An absent or unknown mode fails closed. There is no fallback between modes.

## Package build

The deterministic local builder is invoked with explicit paths:

```text
node --no-warnings --experimental-strip-types \
  scripts/build-the-eye-a6-curated-package.mjs \
  ARTIFACT_ROOT A2_VERIFIER NEW_OUTPUT_ROOT
```

The output root must not already exist. The builder invokes the sealed A2 verifier through the preserved A5 server, verifies the expected result state and I/L/A/U/residual counts, verifies the one bundled receipt, applies the minimum public-safety provenance projection, and writes:

- `manifest.json`
- `assets/<fixed-demo-id>/*`
- `generated.ts`
- `validation-report.json`
- `run-record.json`

Timestamps, temporary paths, usernames, hostnames, random IDs, and environment dumps are excluded from canonical package output.

## Fixed demonstrations

- `a3-pass-exact-id`
- `a3-fail-explicit-mapping`
- `a3-hold-unavailable`
- `a3-input-rejected`
- `a4-kernel-current-repeat`
- `a4-kernel-synthetic-change`

No seventh ID, arbitrary path, upload, caller-selected import, or arbitrary export kind is accepted. `a3-input-rejected` contains no canonical result and no I/L/A/U partition.

## Public-safety projection

Canonical result JSON and faithful Markdown reports retain their exact source bytes. A4 provenance is reduced to a documented projection containing stable identifiers, hashes, revisions, counts, ordering nonclaims, warnings, a source-provenance hash, and an explicit redacted-field list. Private repository paths, complete edge maps, extraction expressions, and unrelated inspected filenames are not bundled.

The bundled runtime rechecks every listed package-asset hash and rejects missing, duplicated, oversized, tampered, unlisted, path-bearing, or secret-like content. Package hashing is an integrity check; it does not recalculate the A2 canonical result self-hash.

## Hosting boundary

The current project builds a Cloudflare Worker through Vinext and the Cloudflare Vite plugin. Curated assets are statically imported into the Worker. The curated request path does not rely on a local executable or persistent local filesystem. The build plugin removes bundler region labels that otherwise expose absolute build-machine source paths.

The existing `.openai/hosting.json` is unchanged. A6 creates no Sites version, deployment, preview, public URL, DNS change, release, tag, commit, push, or merge. A future private staging deployment requires a separate Human gate after A6 review and adoption.
