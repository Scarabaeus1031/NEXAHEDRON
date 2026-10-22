import { createHash } from "node:crypto";
import { readdir, readFile, writeFile } from "node:fs/promises";
import { dirname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const repositoryRoot = resolve(here, "..");
const ecosystemRoot = resolve(repositoryRoot, "../..");
const bundleRoot = process.env.A0_PUBLIC_BUNDLE_ROOT
  ? resolve(process.env.A0_PUBLIC_BUNDLE_ROOT)
  : resolve(repositoryRoot, "public/a0-human");
const a0BookRoot = resolve(
  ecosystemRoot,
  "30 SCIENCE LAB/NEXAH-Science-Lab/RESEARCH_PROGRAM_B_MATHEMATICAL_FOUNDATIONS/AXIOM0_QMODE_ORIENTATION_TO_MEASUREMENT_FOUNDATION_PACKAGE_2026-10-01/A0_BOOK",
);
const manifestPath = resolve(bundleRoot, "SOURCE_MANIFEST.json");

const transformed = new Set([
  "start/nexahedron-public-navigation.js",
  "instruments/A0_NEXAH_APERTURE_JOURNEY.html",
  "instruments/A0_TESSAREC_BLUE_BODY_LAB.html",
  "instruments/A0_BLUE_PINK_DODECA_CELL_RETURN.html",
  "instruments/A0_GAME_OF_WORLDS_PLAY.html",
]);

const externalSources = new Map([
  ["start/assets/external/e8-axis08-core.js", "30 SCIENCE LAB/NEXAH-Science-Lab/SCIENCE_LAB/CASE_STUDIES/E8_DEMOS_INTERACTIVE_ORIENTATION_2026-09-21/REPAIR_R1/e8_axis08_core.js"],
  ["start/assets/external/breath-model.js", "30 SCIENCE LAB/NEXAH-Science-Lab/SCIENCE_LAB/CASE_STUDIES/NEXAH_CON_DAO_JANUS_BREATH_SEQUENCER_2026-10-06/breath-model.js"],
  ["start/assets/external/nexah-profiles.js", "30 SCIENCE LAB/NEXAH-Science-Lab/SCIENCE_LAB/RUNTIME/NEXAH_COMMON_RUNTIME_ADAPTER_V0_1/nexah-profiles.js"],
  ["start/assets/external/cylinder-engine.js", "10 NEXAH CORE/NEXAH/APPLICATIONS/game4life_plus1/cylinder-engine.js"],
  ["start/assets/external/temporal-z-cylinder.js", "10 NEXAH CORE/NEXAH/APPLICATIONS/game4life_plus1/temporal-z-cylinder.js"],
  ["start/assets/external/domain-engine.js", "10 NEXAH CORE/NEXAH/APPLICATIONS/game4life_plus1/three-domain-transition-test/domain-engine.js"],
  ["start/assets/external/three.min.js", "10 NEXAH CORE/NEXAH/APPLICATIONS/game4life_plus1/vendor/three-0.147.0/three.min.js"],
  ["start/assets/external/OrbitControls.js", "10 NEXAH CORE/NEXAH/APPLICATIONS/game4life_plus1/vendor/three-0.147.0/OrbitControls.js"],
  ["start/assets/external/GLTFExporter.js", "10 NEXAH CORE/NEXAH/APPLICATIONS/game4life_plus1/vendor/three-0.147.0/GLTFExporter.js"],
  [
    "instruments/assets/e8-axis08-core.js",
    "30 SCIENCE LAB/NEXAH-Science-Lab/SCIENCE_LAB/CASE_STUDIES/E8_DEMOS_INTERACTIVE_ORIENTATION_2026-09-21/REPAIR_R1/e8_axis08_core.js",
  ],
  [
    "instruments/assets/breath-model.js",
    "30 SCIENCE LAB/NEXAH-Science-Lab/SCIENCE_LAB/CASE_STUDIES/NEXAH_CON_DAO_JANUS_BREATH_SEQUENCER_2026-10-06/breath-model.js",
  ],
  [
    "instruments/assets/game-of-worlds-play/vendor/three-0.147.0/three.min.js",
    "10 NEXAH CORE/NEXAH/APPLICATIONS/game4life_plus1/vendor/three-0.147.0/three.min.js",
  ],
  [
    "instruments/assets/game-of-worlds-play/vendor/three-0.147.0/OrbitControls.js",
    "10 NEXAH CORE/NEXAH/APPLICATIONS/game4life_plus1/vendor/three-0.147.0/OrbitControls.js",
  ],
  [
    "instruments/assets/game-of-worlds-play/vendor/three-0.147.0/GLTFExporter.js",
    "10 NEXAH CORE/NEXAH/APPLICATIONS/game4life_plus1/vendor/three-0.147.0/GLTFExporter.js",
  ],
]);

function sha256(bytes) {
  return createHash("sha256").update(bytes).digest("hex");
}

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(path));
    else if (path !== manifestPath) files.push(path);
  }
  return files.sort();
}

function sourcePathFor(bundlePath, targetPath) {
  const external = externalSources.get(bundlePath);
  if (external) return resolve(ecosystemRoot, external);
  if (bundlePath === "start/nexahedron-public-navigation.js") return targetPath;
  if (bundlePath.startsWith("start/")) return resolve(a0BookRoot, bundlePath.replace(/^start\//, ""));
  return resolve(a0BookRoot, bundlePath.replace(/^instruments\//, ""));
}

const files = [];
for (const targetPath of await walk(bundleRoot)) {
  const bundlePath = relative(bundleRoot, targetPath);
  const sourcePath = sourcePathFor(bundlePath, targetPath);
  const [targetBytes, sourceBytes] = await Promise.all([
    readFile(targetPath),
    readFile(sourcePath),
  ]);
  const sourceHash = sha256(sourceBytes);
  const bundleHash = sha256(targetBytes);
  files.push({
    bundle_path: bundlePath,
    source_path: relative(ecosystemRoot, sourcePath),
    source_sha256: sourceHash,
    bundle_sha256: bundleHash,
    treatment: transformed.has(bundlePath) || sourceHash !== bundleHash
      ? "PUBLIC_PRESENTATION_TRANSFORM"
      : "BYTE_COPY",
  });
}

const manifest = {
  schema_id: "nexahedron.a0-human.source-manifest",
  schema_version: "1.0",
  date: "2026-10-22",
  decision: "D-073_D-074_PLUS_EXPLICIT_HUMAN_OWNER_RELEASE_2026-10-22",
  source_identity: "BOOK-A0_NEXAH_APERTURE_JOURNEY",
  public_entry_source: "A0_BOOK/index.html",
  projection_role: "NEXAHEDRON_PUBLIC_CURRENT_A0_SITE_WITH_PRIVATE_BOUNDARIES_REMOVED",
  authority: "PUBLICATION_AUTHORIZED_BY_HUMAN_OWNER_2026-10-22",
  claim_ceiling: "HUMAN_FACING_ORIENTATION_INSTRUMENT_NOT_SCIENTIFIC_EVIDENCE_OR_GENERAL_THEORY",
  deny_by_default: [
    "A0_RESEARCH_DESK",
    "A0_RESEARCH_BACKLOG",
    "SCIENCE_NAVIGATOR_NSN",
    "MISSION_CONTROL",
    "A0_BUILDER_LOGS",
    "A0_LABORATORY",
    "A0_ASSET_INDEX",
    "DRAFTS",
  ],
  files,
};

await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
console.log(`Wrote ${relative(repositoryRoot, manifestPath)} with ${files.length} source-bound files.`);
