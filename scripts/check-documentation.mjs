import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");
const [
  readme,
  changelog,
  integration,
  alpha,
  architecture,
  authority,
  contributing,
  codeOfConduct,
  security,
  documentationLicense,
  licenses,
  citation,
] = await Promise.all([
  read("README.md"),
  read("CHANGELOG.md"),
  read("docs/integration/ORION_V1_LIVE_INTEGRATION.md"),
  read("docs/alpha/INTERNAL_ALPHA_GUIDE.md"),
  read("docs/architecture/APPLICATION_ARCHITECTURE.md"),
  read("docs/architecture/AUTHORITY_BOUNDARIES.md"),
  read("CONTRIBUTING.md"),
  read("CODE_OF_CONDUCT.md"),
  read("SECURITY.md"),
  read("LICENSE-DOCS.md"),
  read("LICENSES.md"),
  read("CITATION.cff"),
]);

for (const document of [readme, changelog, integration, alpha]) {
  assert.match(document, /ORION Version 1/);
  assert.match(document, /Library evidence adapter|Library adapter/);
  assert.match(document, /clarification/i);
}
assert.doesNotMatch(alpha, /deterministic fixture only|no live ORION gateway|recorded Understand \+ Observation journey completes/i);
assert.match(architecture, /POST \/api\/orientation/);
assert.doesNotMatch(architecture, /No server endpoint/);
assert.match(authority, /frozen ORION Version 1 public boundary/);
assert.doesNotMatch(authority, /future approved ORION public consumer contract/);
assert.match(contributing, /Code of Conduct/i);
assert.match(codeOfConduct, /contact@nexah\.de/);
assert.match(security, /contact@nexah\.de/);
assert.match(documentationLicense, /Creative Commons Attribution 4\.0/);
assert.match(licenses, /Apache License 2\.0/);
assert.match(citation, /title:\s+"NEXAHEDRON:/);
console.log("NEXAHEDRON current-documentation consistency checks passed.");
