import assert from "node:assert/strict";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { inspectBuildManifestIdentifier, normalizeBuildManifest, normalizeBuildManifestModuleId } from "../build/redact-build-source-paths.ts";
import { scanProductionOutput, validateViteManifest } from "../scripts/check-production-output-privacy.mjs";

const originalRoot = "/Users/example/NEXAH ECOSYSTEM/NEXAHEDRON";
const originalIds = ["layout-segment-context.js", "link.js", "router.js"].map((name) => `../../../Users/example/NEXAH ECOSYSTEM/NEXAHEDRON/node_modules/vinext/dist/shims/${name}`);

async function fixture() {
  const root = await mkdtemp(path.join(os.tmpdir(), "nexah-a6-1-test-"));
  await mkdir(path.join(root, "client", ".vite"), { recursive: true });
  await mkdir(path.join(root, "client", "assets"), { recursive: true });
  await writeFile(path.join(root, "client", "assets", "entry.js"), "export {};\n");
  const manifest = { entry: { file: "assets/entry.js", isEntry: true, imports: [], dynamicImports: [] } };
  await writeFile(path.join(root, "client", ".vite", "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);
  return root;
}

async function withFixture(run) {
  const root = await fixture();
  try { await run(root); } finally { await rm(root, { recursive: true, force: true }); }
}

test("normalizes the original Unix node_modules leak form", () => assert.equal(normalizeBuildManifestModuleId(originalIds[1]), "node_modules/vinext/dist/shims/link.js"));
test("normalizes an absolute Windows node_modules identifier", () => assert.equal(normalizeBuildManifestModuleId("C:\\Users\\example\\repo\\node_modules\\vinext\\dist\\shims\\link.js"), "node_modules/vinext/dist/shims/link.js"));
test("preserves an already project-relative package identifier", () => assert.equal(normalizeBuildManifestModuleId("node_modules/vinext/dist/shims/link.js"), "node_modules/vinext/dist/shims/link.js"));
test("rejects a future absolute non-package path in the normalizer itself", () => assert.throws(() => normalizeBuildManifestModuleId("/Users/example/private/source.ts"), /Rejected Vite manifest identifier/));
test("removes malicious build-root characters rather than emitting them", () => assert.equal(normalizeBuildManifestModuleId("../../../Users/a/$[]; secret/node_modules/pkg/index.js"), "node_modules/pkg/index.js"));
test("normalizes keys, src, imports and dynamic imports consistently", () => { const result = normalizeBuildManifest({ [originalIds[1]]: { src: originalIds[1], imports: [originalIds[2]], dynamicImports: [originalIds[0]] }, [originalIds[2]]: { file: "assets/router.js" }, [originalIds[0]]: { file: "assets/layout.js" } }); assert.deepEqual(Object.keys(result), ["node_modules/vinext/dist/shims/link.js", "node_modules/vinext/dist/shims/router.js", "node_modules/vinext/dist/shims/layout-segment-context.js"]); assert.equal(result["node_modules/vinext/dist/shims/link.js"].imports[0], "node_modules/vinext/dist/shims/router.js"); });
test("rejects a duplicate key created by normalization", () => assert.throws(() => normalizeBuildManifest({ [originalIds[1]]: {}, "node_modules/vinext/dist/shims/link.js": {} }), /Duplicate Vite manifest key/));
test("clean manifest remains valid and every output reference resolves", async () => withFixture(async (root) => assert.deepEqual((await validateViteManifest(root)).issues, [])));
test("missing manifest graph reference fails closed", async () => withFixture(async (root) => { const p=path.join(root,"client/.vite/manifest.json"); await writeFile(p, JSON.stringify({ entry: { file:"assets/entry.js", imports:["missing"] } })); assert.match((await validateViteManifest(root)).issues[0].issue, /UNRESOLVED_MANIFEST_KEY/); }));
test("directory traversal in a manifest value fails closed", async () => withFixture(async (root) => { const p=path.join(root,"client/.vite/manifest.json"); await writeFile(p, JSON.stringify({ entry: { file:"../entry.js" } })); assert.ok((await validateViteManifest(root)).issues.some((x) => x.issue === "UNSAFE_IDENTIFIER")); }));
test("absolute manifest value fails the production privacy gate", async () => withFixture(async (root) => { const p=path.join(root,"client/.vite/manifest.json"); await writeFile(p, JSON.stringify({ entry: { file:"assets/entry.js", src:"/Users/example/private.ts" } })); assert.ok((await scanProductionOutput(root)).finding_count > 0); }));
test("scanner inspects hidden .vite build directories", async () => withFixture(async (root) => assert.equal((await scanProductionOutput(root)).hidden_vite_manifest_scanned, true)));
test("scanner detects the current checkout root", async () => withFixture(async (root) => { await writeFile(path.join(root,"client/assets/entry.js"), originalRoot); assert.ok((await scanProductionOutput(root,[originalRoot])).findings.some((x) => x.classification === "DECLARED_BUILD_ROOT")); }));
test("scanner detects an alternative clean-run root", async () => withFixture(async (root) => { const alternate="/private/tmp/nexah-run-b"; await writeFile(path.join(root,"client/assets/entry.js"), alternate); assert.ok((await scanProductionOutput(root,[alternate])).findings.some((x) => x.classification === "DECLARED_BUILD_ROOT")); }));
test("scanner detects a private path inside a source map", async () => withFixture(async (root) => { await writeFile(path.join(root,"client/assets/entry.js.map"), JSON.stringify({ sources:["/Users/example/source.ts"] })); assert.ok((await scanProductionOutput(root)).findings.some((x) => x.file.endsWith(".map"))); }));
test("scanner detects a high-confidence secret value", async () => withFixture(async (root) => { await writeFile(path.join(root,"client/assets/entry.js"), "const credential='supersecretvalue';"); assert.ok((await scanProductionOutput(root)).findings.some((x) => x.classification === "SECRET_CREDENTIAL_VALUE")); }));
test("all twelve original leak positions are detected", async () => withFixture(async (root) => { const leak={}; for(let i=0;i<3;i++) leak[originalIds[i]]={file:"assets/entry.js",src:originalIds[i],imports:i===2?[originalIds[1]]:[],dynamicImports:i===1?[originalIds[2]]:[]}; leak.entry={file:"assets/entry.js",imports:[originalIds[1],originalIds[1]],dynamicImports:[originalIds[0],originalIds[1]]}; await writeFile(path.join(root,"client/.vite/manifest.json"),JSON.stringify(leak)); const report=await scanProductionOutput(root); assert.equal(report.findings.filter((x)=>x.pattern==="/Users/").length,12); }));
test("clean output produces a deterministic zero-finding report", async () => withFixture(async (root) => { const report=await scanProductionOutput(root); assert.equal(report.finding_count,0); assert.equal(report.hidden_vite_manifest_scanned,true); }));


const A6_1B_IDENTIFIER_CORPUS = [
  ["SAFE-001", "scoped package", "node_modules/@scope/package/file.js", "SAFE_UNCHANGED"],
  ["SAFE-002", "unscoped package", "node_modules/package/index.js", "SAFE_UNCHANGED"],
  ["SAFE-003", "nested package file", "node_modules/package/lib/nested.js", "SAFE_UNCHANGED"],
  ["SAFE-004", "Unicode segment", "node_modules/package/über.js", "SAFE_UNCHANGED"],
  ["SAFE-005", "dotted filename", "package.min.js", "SAFE_UNCHANGED"],
  ["SAFE-006", "dotted folder", "folder.name/file.js", "SAFE_UNCHANGED"],
  ["SAFE-007", "project-relative", "assets/entry.js", "SAFE_UNCHANGED"],
  ["SAFE-008", "harmless percent payload", "assets/title%20card.js", "SAFE_UNCHANGED"],
  ["NORMALIZE-001", "POSIX dependency realpath", "/synthetic/root/node_modules/pkg/a.js", "SAFE_NORMALIZED"],
  ["NORMALIZE-002", "Windows dependency realpath", "C:\\synthetic\\root\\node_modules\\pkg\\a.js", "SAFE_NORMALIZED"],
  ["NORMALIZE-003", "traversing dependency realpath", "../../../synthetic/root/node_modules/pkg/a.js", "SAFE_NORMALIZED"],
  ["REJECT-001", "unrelated POSIX absolute", "/absolute/posix/path", "REJECTED"],
  ["REJECT-002", "unrelated Windows drive", "C:\\absolute\\windows\\path", "REJECTED"],
  ["REJECT-003", "unrelated Windows slash drive", "C:/absolute/windows/path", "REJECTED"],
  ["REJECT-004", "UNC backslash", "\\\\server\\share\\path", "REJECTED"],
  ["REJECT-005", "UNC slash", "//server/share/path", "REJECTED"],
  ["REJECT-006", "file URI", "file:///absolute/path", "REJECTED"],
  ["REJECT-007", "misleading substring", "/not_node_modules/package/file.js", "REJECTED"],
  ["REJECT-008", "backup substring", "/node_modules_backup/package/file.js", "REJECTED"],
  ["REJECT-009", "hyphenated substring", "/path/my-node_modules/package/file.js", "REJECTED"],
  ["REJECT-010", "empty suffix", "/node_modules/", "REJECTED"],
  ["REJECT-011", "relative empty suffix", "node_modules/", "REJECTED"],
  ["REJECT-012", "Windows empty suffix", "C:\\root\\node_modules\\", "REJECTED"],
  ["REJECT-013", "root-only", "/", "REJECTED"],
  ["REJECT-014", "empty identifier", "", "REJECTED"],
  ["REJECT-015", "literal traversal", "../evil.js", "REJECTED"],
  ["REJECT-016", "literal current segment", "./entry.js", "REJECTED"],
  ["REJECT-017", "mixed traversal", "folder\\..\\evil.js", "REJECTED"],
  ["REJECT-018", "encoded traversal lower", "node_modules/pkg/%2e%2e/evil.js", "REJECTED"],
  ["REJECT-019", "encoded traversal mixed case", "node_modules/pkg/%2E%2e/evil.js", "REJECTED"],
  ["REJECT-020", "mixed encoded traversal", "node_modules/pkg/.%2e/evil.js", "REJECTED"],
  ["REJECT-021", "encoded slash", "node_modules/pkg/%2fetc", "REJECTED"],
  ["REJECT-022", "encoded backslash", "node_modules/pkg/%5Cevil", "REJECTED"],
  ["REJECT-023", "double encoded traversal", "node_modules/pkg/%252e%252e/evil.js", "REJECTED"],
  ["REJECT-024", "encoded percent", "node_modules/pkg/%25value", "REJECTED"],
  ["REJECT-025", "encoded NUL", "node_modules/pkg/%00evil", "REJECTED"],
  ["REJECT-026", "malformed percent short", "node_modules/pkg/%2", "REJECTED"],
  ["REJECT-027", "malformed percent nonhex", "node_modules/pkg/%GG", "REJECTED"],
  ["REJECT-028", "encoded separator plus traversal", "node_modules/pkg/..%2fsecret", "REJECTED"],
  ["REJECT-029", "backslash relative", "assets\\entry.js", "REJECTED"],
];

function classifyIdentifier(value) {
  try {
    return inspectBuildManifestIdentifier(value).state;
  } catch {
    return "REJECTED";
  }
}

test("A6.1B closed adversarial corpus has exact normalizer classifications", () => {
  for (const [id, inputClass, input, expected] of A6_1B_IDENTIFIER_CORPUS) {
    assert.equal(classifyIdentifier(input), expected, `${id}: ${inputClass}`);
    if (expected === "REJECTED") {
      assert.throws(() => normalizeBuildManifestModuleId(input), undefined, `${id}: ${inputClass}`);
    }
  }
});

test("A6.1B production scanner applies the shared rule to every corpus vector", async () => {
  for (const [id, inputClass, input, expected] of A6_1B_IDENTIFIER_CORPUS) {
    await withFixture(async (root) => {
      const manifestPath = path.join(root, "client", ".vite", "manifest.json");
      const normalized = expected === "SAFE_NORMALIZED" ? normalizeBuildManifestModuleId(input) : input;
      await writeFile(manifestPath, JSON.stringify({ entry: { file: "assets/entry.js", src: normalized, imports: [], dynamicImports: [] } }));
      const issues = (await validateViteManifest(root)).issues;
      assert.equal(issues.length, expected === "REJECTED" ? 1 : 0, `${id}: ${inputClass}`);
    });
  }
});

test("A6.1B scanner rejects raw identifiers that still require normalization", async () => {
  for (const [id, inputClass, input] of A6_1B_IDENTIFIER_CORPUS.filter((row) => row[3] === "SAFE_NORMALIZED")) {
    await withFixture(async (root) => {
      const manifestPath = path.join(root, "client", ".vite", "manifest.json");
      await writeFile(manifestPath, JSON.stringify({ entry: { file: "assets/entry.js", src: input, imports: [], dynamicImports: [] } }));
      assert.ok((await validateViteManifest(root)).issues.some((issue) => issue.issue === "IDENTIFIER_REQUIRES_NORMALIZATION"), `${id}: ${inputClass}`);
    });
  }
});

test("A6.1B rejects all required empty dependency suffix variants", () => {
  for (const value of ["/node_modules/", "node_modules/", "C:\\root\\node_modules\\", "C:/root/node_modules/", ".../node_modules"]) {
    assert.throws(() => normalizeBuildManifestModuleId(value));
  }
});

test("A6.1B rejects required encoded traversal spellings", () => {
  for (const value of ["%2e%2e", "%2E%2E", "%2e.", ".%2e", "%2e%2f", "%2e%2e%2f", "%2e%2e%5c", "%252e%252e", "%252f", "%255c", "..%2f", "%2f.."]) {
    assert.throws(() => normalizeBuildManifestModuleId(`node_modules/pkg/${value}/evil.js`));
  }
});

test("A6.1B retains collision rejection for normalized keys", () => {
  assert.throws(() => normalizeBuildManifest({
    "/synthetic/a/node_modules/pkg/a.js": {},
    "C:\\synthetic\\b\\node_modules\\pkg\\a.js": {},
  }), /Duplicate Vite manifest key/);
});

test("A6.1B preserves repeated safe references without merging", () => {
  const value = { entry: { file: "assets/entry.js", imports: ["node_modules/pkg/a.js", "node_modules/pkg/a.js"] } };
  assert.deepEqual(normalizeBuildManifest(value), value);
});
