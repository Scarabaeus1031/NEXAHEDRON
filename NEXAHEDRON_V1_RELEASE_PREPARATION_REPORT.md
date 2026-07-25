# NEXAHEDRON Version 1 Release Preparation Report

> Historical preparation record. The current immutable source identity is
> recorded in
> [`NEXAHEDRON Version 1 Source Release`](docs/releases/NEXAHEDRON_V1_SOURCE_RELEASE.md).

**Review date:** 2026-07-24
**Repository:** `/Users/tho2020/Documents/NEXAHEDRON`
**Repository status:** **APPROVED AS VERSION 1 RELEASE CANDIDATE**
**ORION dependency:** **RESOLVED AND VERIFIED**
**Deployment status:** ready for a controlled production deployment

## Repository Status

The complete Version 1 candidate is present in the repository. Historical
documentation and provenance are preserved. Generated build output, caches,
local environment files, and other non-source artifacts are excluded.

The public repository front door includes:

- `README.md`
- `LICENSE`
- `LICENSE-DOCS.md`
- `LICENSES.md`
- `CITATION.cff`
- `CONTRIBUTING.md`
- `CODE_OF_CONDUCT.md`
- `SECURITY.md`
- issue templates and a pull-request template
- repository metadata guidance

## ORION Status

The protected dependency in `docs/upstream/orion-v1/SOURCE.yaml` is:

- Repository: `https://github.com/Scarabaeus1031/NEXAH-ORION.git`
- Revision: `d34fbb2f99334534f4db89465a29f8bdb16d14d3`
- Version: `1.0.0`
- Canonical-content fingerprint:
  `6201362c094530a0a31fa3d80b46c9131011bb8c8d400183271b0da0eb423f8d`
- Contract suite: `1.0`

The immutable commit and annotated `v1.0.0` tag are published. NEXAHEDRON
verified the revision and fingerprint, regenerated its contract declarations,
and completed its real Gateway integration checks against that exact source.

## Build and Test Status

| Verification | Result |
| --- | --- |
| ORION revision and fingerprint | Passed |
| Generated contract drift | Passed |
| Architecture boundaries | Passed |
| Documentation assertions | Passed |
| ESLint | Passed |
| Production build | Passed |
| Application tests | 69 passed, 0 failed, 0 skipped |
| Real ORION Gateway integration | 4 passed |
| `git diff --check` | Passed |

Vinext emits an experimental-glob warning and an incomplete static-route
classification warning. These are upstream toolchain notices, not application
compile failures.

## Deployment Architecture

NEXAHEDRON is a Vinext React Server Components application with a Cloudflare
Worker entry point and `/api/orientation`. It is not a standard OVH static-site
upload.

The approved production architecture is:

1. deploy the immutable candidate through the existing Sites/Cloudflare
   project;
2. keep OVH as registrar and DNS owner;
3. point `nexahedron.com` to the exact records supplied for the deployed site;
4. use `contact@nexah.de` as the project contact;
5. run an anonymous production smoke test after DNS and TLS become active.

The optional ORION boundary remains fail-closed unless Operations supplies a
production `ORION_GATEWAY_URL`. This does not affect the Human-owned Workspace,
Encounter, Reflection, Rest, or Orientation Record.

## GitHub Readiness

Approved public settings:

- **Repository:** `Scarabaeus1031/NEXAHEDRON`
- **Description:** The Human-facing reference implementation of NEXAH — The
  Orientation Ecosystem: one bounded Workspace for Encounter, Reflection,
  Rest, and a Human-owned Orientation Record.
- **Homepage:** `https://nexahedron.com`
- **Topics:** `nexah`, `human-orientation`, `orientation`,
  `reference-implementation`, `human-centered-design`, `provenance`,
  `cloudflare-workers`
- **Visibility:** public

The local repository is ready to publish. Creating the GitHub repository,
configuring its protection and security settings, and pushing the frozen
revision are repository-owner actions.

## Remaining Owner Actions

1. **GitHub owner:** create `Scarabaeus1031/NEXAHEDRON`, apply the approved
   metadata, protect the default branch, and publish the frozen commit.
2. **Operations:** apply the supplied `nexahedron.com` DNS records at OVH and
   verify TLS.
3. **Operations:** set `ORION_GATEWAY_URL` only if the optional ORION boundary
   is included in the public release.
4. **Release owner:** perform the anonymous production smoke test and approve
   the public release.

## Release Recommendation

### Repository

**APPROVED AS VERSION 1 RELEASE CANDIDATE**

### External Dependency

**RESOLVED**

The immutable ORION Version 1 pin and canonical fingerprint are published and
fully verified.

### Deployment

**APPROVED FOR CONTROLLED PRODUCTION DEPLOYMENT**

Public release approval remains conditional only on repository-owner actions,
DNS/TLS activation, declared production environment configuration, and the
post-deployment smoke test.
