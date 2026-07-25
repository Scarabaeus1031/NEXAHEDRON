# NEXAHEDRON Version 1 Source Release

**Release date:** 26 July 2026  
**Version:** `1.0.0`  
**Tag:** `v1.0.0`  
**Repository:** `https://github.com/Scarabaeus1031/NEXAHEDRON`

## Status

NEXAHEDRON Version 1 is the first public, immutable source baseline of the
Human-facing reference implementation of NEXAH.

The annotated `v1.0.0` tag identifies the exact release revision. Repository,
workspace and citation metadata use the same `1.0.0` component version.

## Scope

The source release includes:

- the bounded Human-owned Orientation Session;
- the Human-owned Orientation Record;
- the optional fail-closed consumer boundary to immutable ORION Version 1;
- exact ORION dependency and generated-contract verification;
- the public Laboratory presentation and interaction implementation;
- architecture, contribution, security, licensing and release documentation;
- executable checks and real Gateway integration tests.

## Limits

This source release does not:

- change NEXAH, OLS or ORION semantics;
- synchronize independently versioned NEXAH ecosystem components;
- claim a complete production ORION service;
- claim production Library evidence integration, persistence or accounts;
- close historical deployment, privacy, accessibility or operational gates;
- convert historical Alpha and release-preparation reports into current
  capability claims.

The public website may identify itself as a Version 1 development preview while
these operational limits remain visible.

## Provenance

The release descends from candidate commit
`f273ae5009b15f5f7606b494276b906fc72cfe2b`, which prepared the complete
Version 1 source candidate. The `v1.0.0` tag, rather than a floating branch,
is the durable public source identity.

Historical preparation and gate records remain unchanged:

- [`NEXAHEDRON Version 1 Release Preparation Report`](../../NEXAHEDRON_V1_RELEASE_PREPARATION_REPORT.md)
- [`NEXAHEDRON Release Readiness Report`](../../NEXAHEDRON_RELEASE_READINESS_REPORT.md)

## Verification

The complete repository verification passed on 26 July 2026:

```sh
npm run check
npm test
git diff --check
```

Results:

- immutable ORION revision and canonical fingerprint verified;
- generated contracts, architecture, current documentation and lint passed;
- production build passed;
- 69 application tests passed;
- 4 real ORION Gateway integration tests passed;
- `git diff --check` passed.

The annotated release tag and public release notes preserve this verification
summary beside the exact source identity.
