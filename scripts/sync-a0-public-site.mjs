import { cp, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { dirname, extname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const repositoryRoot = resolve(here, "..");
const ecosystemRoot = resolve(repositoryRoot, "../..");
const sourceRoot = resolve(
  ecosystemRoot,
  "30 SCIENCE LAB/NEXAH-Science-Lab/RESEARCH_PROGRAM_B_MATHEMATICAL_FOUNDATIONS/AXIOM0_QMODE_ORIENTATION_TO_MEASUREMENT_FOUNDATION_PACKAGE_2026-10-01/A0_BOOK",
);
const bundleRoot = resolve(repositoryRoot, "public/a0-human");
const targetRoot = resolve(bundleRoot, "start");
const overlaySource = resolve(here, "a0-public-navigation-overlay.js");
const sourceAssetIndex = resolve(sourceRoot, "assets/a0-asset-index-v1.json");
const legacyInstrumentEntries = [
  "A0_NEXAH_APERTURE_JOURNEY.html",
  "A0_TESSAREC_BLUE_BODY_LAB.html",
  "A0_BLUE_PINK_DODECA_CELL_RETURN.html",
  "A0_GAME_OF_WORLDS_PLAY.html",
];
const externalSources = new Map([
  ["e8-axis08-core.js", resolve(ecosystemRoot, "30 SCIENCE LAB/NEXAH-Science-Lab/SCIENCE_LAB/CASE_STUDIES/E8_DEMOS_INTERACTIVE_ORIENTATION_2026-09-21/REPAIR_R1/e8_axis08_core.js")],
  ["breath-model.js", resolve(ecosystemRoot, "30 SCIENCE LAB/NEXAH-Science-Lab/SCIENCE_LAB/CASE_STUDIES/NEXAH_CON_DAO_JANUS_BREATH_SEQUENCER_2026-10-06/breath-model.js")],
  ["nexah-profiles.js", resolve(ecosystemRoot, "30 SCIENCE LAB/NEXAH-Science-Lab/SCIENCE_LAB/RUNTIME/NEXAH_COMMON_RUNTIME_ADAPTER_V0_1/nexah-profiles.js")],
  ["cylinder-engine.js", resolve(ecosystemRoot, "10 NEXAH CORE/NEXAH/APPLICATIONS/game4life_plus1/cylinder-engine.js")],
  ["temporal-z-cylinder.js", resolve(ecosystemRoot, "10 NEXAH CORE/NEXAH/APPLICATIONS/game4life_plus1/temporal-z-cylinder.js")],
  ["domain-engine.js", resolve(ecosystemRoot, "10 NEXAH CORE/NEXAH/APPLICATIONS/game4life_plus1/three-domain-transition-test/domain-engine.js")],
  ["three.min.js", resolve(ecosystemRoot, "10 NEXAH CORE/NEXAH/APPLICATIONS/game4life_plus1/vendor/three-0.147.0/three.min.js")],
  ["OrbitControls.js", resolve(ecosystemRoot, "10 NEXAH CORE/NEXAH/APPLICATIONS/game4life_plus1/vendor/three-0.147.0/OrbitControls.js")],
  ["GLTFExporter.js", resolve(ecosystemRoot, "10 NEXAH CORE/NEXAH/APPLICATIONS/game4life_plus1/vendor/three-0.147.0/GLTFExporter.js")],
]);

const privatePages = new Set([
  "A0_ASSET_INDEX.html",
  "A0_BUILDER_LOG.html",
  "A0_CURSOR_HANDOFF_CLICKDUMMY.html",
  "A0_LABORATORY.html",
  "A0_RESEARCH_BACKLOG.html",
  "A0_RESEARCH_DESK.html",
  "NEXAH_C_CONNECT.html",
]);

const privateDestinations = new Map([
  ["A0_RESEARCH_DESK.html", "A0_SCIENCE.html"],
  ["A0_RESEARCH_BACKLOG.html", "A0_SCIENTIFIC_POSITION_REPORT.html"],
  ["A0_BUILDER_LOG.html", "A0_WERKBANK.html"],
  ["A0_LABORATORY.html", "A0_SCIENCE.html"],
  ["A0_ASSET_INDEX.html", "A0_WERKBANK.html"],
  ["A0_CURSOR_HANDOFF_CLICKDUMMY.html", "A0_WERKBANK.html"],
  ["NEXAH_C_CONNECT.html", "index.html"],
]);

const skippedDirectories = new Set(["DRAFTS", "public"]);
const textExtensions = new Set([".css", ".csv", ".html", ".js", ".json", ".md", ".mjs", ".mmd", ".svg"]);

function includeRootFile(name) {
  if (privatePages.has(name) || name.startsWith(".")) return false;
  if (["A0_BOOK_MANIFEST.json", "A0_INTEGRATION_CHECK58_FREEZE_MANIFEST.json"].includes(name)) return false;
  const extension = extname(name).toLowerCase();
  if (extension === ".html" || extension === ".css") return true;
  if (extension === ".js") return !/(?:^|-)tests\.|(?:^|_)tests\.|^build-|^validate-|^run_/i.test(name);
  if (extension === ".json") return !/(?:manifest_sha|authorization)/i.test(name);
  return false;
}

function includeNestedFile(path) {
  const sourceRelative = relative(sourceRoot, path).replaceAll("\\", "/");
  if (/^assets\/a0-field-notes\//.test(sourceRelative)) return false;
  if (/^assets\/a0-asset-index/i.test(sourceRelative)) return false;
  if (/^assets\/a0-nsn/i.test(sourceRelative)) return false;
  if (sourceRelative.startsWith("results/")) return /\.(?:png|jpe?g|svg|webp)$/i.test(sourceRelative);
  return true;
}

async function walk(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.name === ".DS_Store") continue;
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) {
      if (!skippedDirectories.has(entry.name)) files.push(...await walk(path));
    } else {
      files.push(path);
    }
  }
  return files;
}

function sanitizeText(text, sourcePath, targetPath) {
  let output = text;

  if (sourcePath.endsWith("a0-application-demonstrator-suite.js")) {
    output = output.replace("  'use strict';", "  'use strict';\n  const root = typeof window !== 'undefined' ? window : globalThis;");
  }

  for (const [privatePage, publicPage] of privateDestinations) {
    output = output.replaceAll(privatePage, publicPage);
  }

  output = output
    .replaceAll(/DRAFTS\/A0_HUMAN_BOOK_DRAFT\.html(?:#[A-Za-z0-9_-]+)?/g, "A0_NEXAH_APERTURE_JOURNEY.html#human-view")
    .replaceAll("a0-application-demonstrator-suite.js?rev=20261018-app-suite-r1", "a0-application-demonstrator-suite.js?rev=20261022-public-r1")
    .replaceAll(/DRAFTS\/A0_FAMILY_NAVIGATOR_DEMO\.html(?:#[A-Za-z0-9_-]+)?/g, "A0_FAMILY_CONNECTION_ATLAS.html")
    .replaceAll(/assets\/a0-nsn-[A-Za-z0-9_.-]+\.json(?:#[^\"'\s<]*)?/g, "A0_SCIENTIFIC_POSITION_REPORT.html")
    .replaceAll(/\/a0-human\/instruments\//g, "/a0-human/start/")
    .replaceAll(/(?:\.\.\/){2,}SCIENCE_LAB\/NAVIGATION\/[^\"'\s<]*/g, "https://nexah.de/")
    .replaceAll(/(?:\.\.\/){2,}00%20EXECUTIVE\/NEXAH-Mission-Control\/[^\"'\s<]*/g, "https://nexah.de/")
    .replaceAll(/(?:\.\.\/){1,}[^\"'\s<]+\.md(?:#[^\"'\s<]*)?/g, "https://nexah.de/")
    .replaceAll(/results\/[A-Za-z0-9_.-]+\.json(?:#[^\"'\s<]*)?/g, "A0_SCIENTIFIC_POSITION_REPORT.html")
    .replaceAll(/\/Users\/tho2020\/[^\"\n<]*/g, "[redacted-local-source]")
    .replaceAll(/file:\/\/[^\"'\s<]*/g, "[redacted-local-uri]")
    .replaceAll(/\/(?:private\/tmp|var\/folders)\/[^\"'\s<]*/g, "[redacted-temporary-source]")
    .replaceAll(/(?:\.\.\/)*REVIEWS\/NEXAH_THE_EYE_[^\"'\s<]*/g, "https://nexah.de/")
    .replaceAll(/SCIENCE_LAB\/NAVIGATION/g, "PUBLIC_SCIENCE_CONTEXT")
    .replaceAll(/NEXAH-Mission-Control/g, "PUBLIC_OWNER_CONTEXT")
    .replaceAll(/Mission-Control/g, "Owner-Context")
    .replaceAll(/NEXAH_A0_RESEARCH_DESK/g, "PUBLIC_A0_SCIENCE_CONTEXT")
    .replaceAll(/SRC:A0OE:A0_RESEARCH_DESK_CHECK58/g, "PUBLIC:A0:SCIENCE_CONTEXT")
    .replaceAll(/NSN/g, "Source Lineage");

  for (const externalName of externalSources.keys()) {
    const externalTarget = resolve(targetRoot, "assets/external", externalName);
    const browserPath = relative(dirname(targetPath), externalTarget).replaceAll("\\", "/");
    output = output.replaceAll(new RegExp(`(?:\\.\\.\\/)+[^\\"'\\s<]*${externalName.replaceAll(".", "\\.")}`, "g"), browserPath);
  }
  output = output.replaceAll(
    /(?:\.\.\/)+[^\"'\s<]*e8_axis08_core\.js/g,
    relative(dirname(targetPath), resolve(targetRoot, "assets/external/e8-axis08-core.js")).replaceAll("\\", "/"),
  );
  output = output.replaceAll(/book\/a0-arkade\.css/g, "a0-arkade.css");

  if (extname(sourcePath).toLowerCase() === ".html" && !output.includes("nexahedron-public-navigation.js")) {
    const overlayPath = relative(dirname(targetPath), resolve(targetRoot, "nexahedron-public-navigation.js")).replaceAll("\\", "/");
    output = output.replace(
      /<\/body>/i,
      `  <script src="${overlayPath}?rev=public-current-20261022"></script>\n</body>`,
    );
  }

  return output;
}

async function copySourceFile(sourcePath) {
  const sourceRelative = relative(sourceRoot, sourcePath);
  const targetPath = resolve(targetRoot, sourceRelative);
  await mkdir(dirname(targetPath), { recursive: true });
  if (textExtensions.has(extname(sourcePath).toLowerCase())) {
    const text = await readFile(sourcePath, "utf8");
    await writeFile(targetPath, sanitizeText(text, sourcePath, targetPath), "utf8");
  } else {
    await cp(sourcePath, targetPath);
  }
}

async function writePublicAssetIndex(copiedFiles) {
  const sourceIndex = JSON.parse(await readFile(sourceAssetIndex, "utf8"));
  const copiedPaths = new Set(copiedFiles.map(path => relative(sourceRoot, path).replaceAll("\\", "/")));
  const files = (sourceIndex.files || [])
    .filter(item => item.extension === ".html" && copiedPaths.has(item.path) && !privatePages.has(item.path))
    .map(item => ({
      path: item.path,
      name: item.name,
      extension: item.extension,
      format: item.format,
      role: item.role,
      registered_surface: Boolean(item.registered_surface),
      work: item.work,
      family: item.family,
      title: item.title,
      headline: item.headline,
      description: item.description,
      publication_state: "public_projection",
      status: "PUBLIC_A0_SITE_ROUTE",
      claim_boundary: "PUBLIC_NAVIGATION_ONLY_NO_NEW_IDENTITY_RELATION_EVIDENCE_PROMOTION_OR_CLAIM",
    }));
  const publicIndex = {
    schema: "nexah.a0-public-asset-index/1.0.0",
    title: "A0 PUBLIC TOOL ROUTES",
    generated: "2026-10-22",
    status: "PUBLIC_NAVIGATION_PROJECTION",
    identity_reuse: ["BOOK-A0_NEXAH_APERTURE_JOURNEY"],
    authority_boundary: "Public navigation only. Private workspace, governance, records and source inventory are excluded.",
    root: "A0_BOOK_PUBLIC",
    counts: { html: files.length },
    family_order: (sourceIndex.family_order || []).filter(family => family !== "Repository Records"),
    external_instruments: [],
    files,
  };
  const targetPath = resolve(targetRoot, "assets/a0-asset-index-v1.js");
  await mkdir(dirname(targetPath), { recursive: true });
  await writeFile(targetPath, `window.A0_ASSET_INDEX = ${JSON.stringify(publicIndex)};\n`, "utf8");
}

await rm(targetRoot, { recursive: true, force: true });
await rm(resolve(bundleRoot, "instruments"), { recursive: true, force: true });
await mkdir(targetRoot, { recursive: true });

const rootEntries = await readdir(sourceRoot, { withFileTypes: true });
const sourceFiles = [];
for (const entry of rootEntries) {
  const path = resolve(sourceRoot, entry.name);
  if (entry.isFile() && includeRootFile(entry.name)) sourceFiles.push(path);
  if (entry.isDirectory() && ["assets", "operator-registry", "results"].includes(entry.name)) {
    sourceFiles.push(...(await walk(path)).filter(includeNestedFile));
  }
}

for (const sourcePath of sourceFiles.sort()) await copySourceFile(sourcePath);
await writePublicAssetIndex(sourceFiles);
for (const [name, sourcePath] of externalSources) {
  const targetPath = resolve(targetRoot, "assets/external", name);
  await mkdir(dirname(targetPath), { recursive: true });
  await cp(sourcePath, targetPath);
}
await cp(overlaySource, resolve(targetRoot, "nexahedron-public-navigation.js"));
await mkdir(resolve(bundleRoot, "instruments"), { recursive: true });
for (const name of legacyInstrumentEntries) {
  const target = `../start/${name}`;
  const redirect = `<!doctype html>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width,initial-scale=1">\n<title>A0 · Weiterleitung</title>\n<meta http-equiv="refresh" content="0; url=${target}">\n<link rel="canonical" href="${target}">\n<p><a href="${target}">Zur aktuellen A0-Seite →</a></p>\n`;
  await writeFile(resolve(bundleRoot, "instruments", name), redirect, "utf8");
}

console.log(JSON.stringify({
  status: "SYNCED",
  source: relative(ecosystemRoot, sourceRoot),
  target: relative(repositoryRoot, targetRoot),
  files: sourceFiles.length + externalSources.size + legacyInstrumentEntries.length + 2,
  private_pages_excluded: [...privatePages].sort(),
  navigator_identity_effect: "ZERO",
}, null, 2));
