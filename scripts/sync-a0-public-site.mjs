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
const bundleRoot = process.env.A0_PUBLIC_BUNDLE_ROOT
  ? resolve(process.env.A0_PUBLIC_BUNDLE_ROOT)
  : resolve(repositoryRoot, "public/a0-human");
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
]);

const privateDestinations = new Map([
  ["A0_RESEARCH_DESK.html", "A0_SCIENCE.html"],
  ["A0_RESEARCH_BACKLOG.html", "A0_SCIENTIFIC_POSITION_REPORT.html"],
  ["A0_BUILDER_LOG.html", "A0_WERKBANK.html"],
  ["A0_LABORATORY.html", "A0_SCIENCE.html"],
  ["A0_ASSET_INDEX.html", "A0_WERKBANK.html"],
  ["A0_CURSOR_HANDOFF_CLICKDUMMY.html", "A0_WERKBANK.html"],
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
  const publicPosition = relative(dirname(targetPath), resolve(targetRoot, "A0_SCIENTIFIC_POSITION_REPORT.html")).replaceAll("\\", "/");

  // The public orientation map is a projection of the A0 corpus, not a set of
  // aliases for private work surfaces. Remove those records before the generic
  // route rewrites below can turn them into duplicate public entries.
  if (sourcePath.endsWith("a0-orientation-map.js")) {
    for (const privatePage of privatePages) {
      const escaped = privatePage.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      output = output.replace(new RegExp(`\\{\\"file\\":\\"${escaped}\\"[^}]*\\},?`, "g"), "");
      output = output.replace(new RegExp(`\\{file:'${escaped}'[^}]*\\},?`, "g"), "");
    }
    output = output.replace(/^[\t ]+$/gm, "");
  }

  if (sourcePath.endsWith("a0-application-demonstrator-suite.js")) {
    output = output.replace("  'use strict';", "  'use strict';\n  const root = typeof window !== 'undefined' ? window : globalThis;");
  }

  // Preserve the explicitly vendored runtime set before broader source-tree
  // references are folded back to the public scientific-position page.
  for (const externalName of externalSources.keys()) {
    const externalTarget = resolve(targetRoot, "assets/external", externalName);
    const browserPath = relative(dirname(targetPath), externalTarget).replaceAll("\\", "/");
    output = output.replaceAll(new RegExp(`(?:\\.\\.\\/)+[^\\"'\\s<]*${externalName.replaceAll(".", "\\.")}`, "g"), browserPath);
  }
  output = output.replaceAll(
    /(?:\.\.\/)+[^"'\s<]*e8_axis08_core\.js/g,
    relative(dirname(targetPath), resolve(targetRoot, "assets/external/e8-axis08-core.js")).replaceAll("\\", "/"),
  );

  for (const [privatePage, publicPage] of privateDestinations) {
    const escaped = privatePage.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    output = output.replaceAll(new RegExp(`${escaped}(?:#[A-Za-z0-9_-]+)?`, "g"), publicPage);
  }

  output = output
    .replaceAll(/DRAFTS\/A0_HUMAN_BOOK_DRAFT\.html(?:#[A-Za-z0-9_-]+)?/g, "A0_NEXAH_APERTURE_JOURNEY.html#human-view")
    .replaceAll("a0-application-demonstrator-suite.js?rev=20261018-app-suite-r1", "a0-application-demonstrator-suite.js?rev=20261022-public-r1")
    .replaceAll(/DRAFTS\/A0_FAMILY_NAVIGATOR_DEMO\.html(?:#[A-Za-z0-9_-]+)?/g, "A0_FAMILY_CONNECTION_ATLAS.html")
    .replaceAll(/assets\/a0-nsn-[A-Za-z0-9_.-]+\.json(?:#[^\"'\s<]*)?/g, "A0_SCIENTIFIC_POSITION_REPORT.html")
    .replaceAll(/\/a0-human\/instruments\//g, "/a0-human/start/")
    .replaceAll(/(?:\.\.\/)+SCIENCE_LAB\/[^\"'`\s<)]*/g, publicPosition)
    .replaceAll(/(?:\.\.\/)+(?:10(?:%20| )NEXAH(?:%20| )CORE|20(?:%20| )EXPERIENCE(?:%20| )PRODUCTION|30(?:%20| )SCIENCE(?:%20| )LAB|00%20EXECUTIVE)\/[^\"'`\s<)]*/g, publicPosition)
    .replaceAll(/(?:\.\.\/)+(?:Desktop(?:%20| )LOCAL|00_INCOMING|NEXAH(?:%20| )OUTREACH)\/[^\"'`\s<)]*/g, publicPosition)
    .replaceAll(/(?:\.\.\/)*[A-Za-z0-9_.-]+\.(?:md|cjs)(?:#[^\"'`\s<)]*)?/g, publicPosition)
    .replaceAll(/\/a0-human\/previews\/[^\"'`\s<)]*/g, publicPosition)
    .replaceAll(/results\/[A-Za-z0-9_.-]+\.json(?:#[^\"'\s<]*)?/g, "A0_SCIENTIFIC_POSITION_REPORT.html")
    .replaceAll(/href=(["'])\/Users\/tho2020\/[^"'\n<]*\1/g, `href="${publicPosition}"`)
    .replaceAll(/href=(["'])file:\/\/[^"'\s<]*\1/g, `href="${publicPosition}"`)
    .replaceAll(/\/Users\/tho2020\/[^\"\n<]*/g, "[redacted-local-source]")
    .replaceAll(/file:\/\/[^\"'\s<]*/g, "[redacted-local-uri]")
    .replaceAll(/\/(?:private\/tmp|var\/folders)\/[^\"'\s<]*/g, "[redacted-temporary-source]")
    .replaceAll(/(?:\.\.\/)*REVIEWS\/NEXAH_THE_EYE_[^\"'\s<]*/g, "https://nexah.de/")
    .replaceAll(/SCIENCE_LAB\/NAVIGATION/g, "PUBLIC_SCIENCE_CONTEXT")
    .replaceAll(/NEXAH-Mission-Control/g, "PUBLIC_OWNER_CONTEXT")
    .replaceAll(/Mission-Control/g, "Owner-Context")
    .replaceAll(/NEXAH_A0_RESEARCH_DESK/g, "PUBLIC_A0_SCIENCE_CONTEXT")
    .replaceAll(/SRC:A0OE:A0_RESEARCH_DESK_CHECK58/g, "PUBLIC:A0:SCIENCE_CONTEXT")
    .replaceAll(/NSN/g, "Source Lineage")
    .replaceAll(/A0 Science Desk/g, "A0 Science")
    .replaceAll(/A0 Research Desk/g, "A0 Science")
    .replaceAll(/Research Desk/g, "A0 Science")
    .replaceAll(/Science Desk/g, "A0 Science")
    .replaceAll(/Science Mission Control/g, "A0 Science")
    .replaceAll(/NEXAH Navigator/g, "Source & Evidence")
    .replaceAll(/Science Navigator/g, "Source & Evidence")
    .replaceAll(/A0 ASSET INDEX · Internal Workspace/g, "Werkbank · öffentliche Route")
    .replaceAll(/Builder-Log/g, "Werkbank")
    .replaceAll(/Builder Log/g, "Werkbank")
    .replaceAll(/A0 Backlog/g, "Scientific Position")
    .replaceAll(/Research Backlog/g, "Scientific Position")
    .replaceAll(/NEXAH · Laboratory/g, "NEXAH · A0 Science")
    .replaceAll(/Desk · intern/g, "A0")
    .replaceAll(/ein Desk/g, "eine öffentliche Einordnung")
    .replaceAll(/der Desk/g, "die wissenschaftliche Einordnung")
    .replaceAll(/\bDesk\b/g, "Arbeitsfläche")
    .replaceAll(/Internal guided-reading surface/g, "Public guided-reading surface")
    .replaceAll(/Interne Navigation\./g, "Öffentliche Navigation.")
    .replaceAll(/Interne A0‑Lesefläche\./g, "Öffentliche A0‑Lesefläche; der Quellenstatus bleibt unverändert.")
    .replaceAll(/Internal · no Study activation · not public/g, "Public instrument · no Study activation · no evidence promotion")
    .replaceAll(/Interner A0-Demonstrator/g, "A0-Demonstrator")
    .replaceAll(/A0 A0 Science/g, "A0 Science")
    .replaceAll(/im internen A0 Science/g, "in der öffentlichen A0-Einordnung")
    .replaceAll(/Navigator damals/g, "Source Graph damals")
    .replaceAll(/Der Source & Evidence/g, "Source & Evidence");

  if (sourcePath.endsWith("a0-context-navigation.js")) {
    output = output
      .replace(/\s*const internalMenu = document\.createElement\("details"\);[\s\S]*?overviewBody\.append\(internalMenu\);/, "")
      .replace("Übersicht · Bereiche, Seiteninhalt und interne Arbeitsseiten", "Übersicht · Bereiche, Seiteninhalt und öffentliche Wege");
  }

  if (sourcePath.endsWith("a0-public-arkade-index.html")) {
    output = output.replaceAll(/(["'])book\//g, "$1");
  }

  if (sourcePath.endsWith("NEXAH_C_CONNECT.html")) {
    output = output
      .replaceAll("info@nexah.de", "contact@nexah.de")
      .replace(
        "Der lokale Navigator und Asset Index bleiben die präziseren Instrumente für Herkunft, aktuelle Records und A0-Artefakte.",
        "Die öffentliche Science-Einordnung und Werkbank halten Herkunft, aktuelle Records und A0-Artefakte nachvollziehbar.",
      )
      .replace("<strong>A0 Asset Index</strong>", "<strong>Werkbank</strong>")
      .replace("vorhandene öffentliche Türen und lokale Arbeitsräume", "vorhandene öffentliche Türen und begrenzte Werkstattwege");
  }

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
  if (sourcePath.endsWith(".packed.js")) {
    // Generated self-contained viewer payloads can be several megabytes on a
    // single line. They contain no navigation surface and remain byte copies.
    await cp(sourcePath, targetPath);
  } else if (textExtensions.has(extname(sourcePath).toLowerCase())) {
    const text = await readFile(sourcePath, "utf8");
    await writeFile(targetPath, sanitizeText(text, sourcePath, targetPath), "utf8");
  } else {
    await cp(sourcePath, targetPath);
  }
}

const dynamicAnchors = new Map([
  ["A0_GAME_OF_WORLDS_PLAY.html", new Set(["pulse", "life", "domains", "numbers", "control-room", "generation-weave"])],
  ["assets/game-of-worlds-play/three-domain-transition-test/index.html", new Set(["domains", "atlas", "blue-body", "fibonacci"])],
  ["A0_BLUE_PINK_DODECA_CELL_RETURN.html", new Set(["cell-machine"])],
]);

async function pathExists(path) {
  try {
    await readFile(path);
    return true;
  } catch {
    return false;
  }
}

async function repairPublicHtmlNavigation(htmlPath) {
  const source = await readFile(htmlPath, "utf8");
  const pattern = /<a\b[^>]*\bhref=(["'])([^"']*)\1[^>]*>/gi;
  const matches = [...source.matchAll(pattern)];
  if (!matches.length) return;
  let cursor = 0;
  let output = "";
  for (const match of matches) {
    output += source.slice(cursor, match.index);
    let openingTag = match[0];
    const reference = match[2];
    let replacement = reference;
    if (!/^(?:https?:|data:|\/\/|mailto:|tel:|javascript:|#)/i.test(reference) && !reference.includes("${")) {
      const [beforeHash, fragment = ""] = reference.split("#", 2);
      const [rawPath, query = ""] = beforeHash.split("?", 2);
      let decodedPath = rawPath;
      try { decodedPath = decodeURIComponent(rawPath); } catch { /* keep original for a safe fallback */ }
      const targetPath = resolve(dirname(htmlPath), decodedPath);
      const insideBundle = targetPath === targetRoot || targetPath.startsWith(`${targetRoot}/`);
      const exists = insideBundle && await pathExists(targetPath);
      if (!exists) {
        replacement = relative(dirname(htmlPath), resolve(targetRoot, "A0_SCIENTIFIC_POSITION_REPORT.html")).replaceAll("\\", "/");
      } else if (fragment && targetPath.endsWith(".html")) {
        const targetSource = await readFile(targetPath, "utf8");
        const escaped = fragment.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const targetRelative = relative(targetRoot, targetPath).replaceAll("\\", "/");
        const isDynamic = dynamicAnchors.get(targetRelative)?.has(fragment);
        const existsInMarkup = new RegExp(`(?:id|name)=["']${escaped}["']`, "i").test(targetSource);
        replacement = `${rawPath}${query ? `?${query}` : ""}${isDynamic || existsInMarkup ? `#${fragment}` : ""}`;
      }
    }
    if (replacement !== reference) openingTag = openingTag.replace(reference, replacement);
    output += openingTag;
    cursor = match.index + match[0].length;
  }
  output += source.slice(cursor);
  if (output !== source) await writeFile(htmlPath, output, "utf8");
}

async function writePublicAssetIndex(copiedFiles) {
  const sourceIndex = JSON.parse(await readFile(sourceAssetIndex, "utf8"));
  const targetPath = resolve(targetRoot, "assets/a0-asset-index-v1.js");
  const publicMetadata = (value) => sanitizeText(String(value ?? ""), sourceAssetIndex, targetPath);
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
      work: publicMetadata(item.work),
      family: item.family,
      title: publicMetadata(item.title),
      headline: publicMetadata(item.headline),
      description: publicMetadata(item.description),
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
for (const sourcePath of sourceFiles.filter((path) => path.endsWith(".html"))) {
  await repairPublicHtmlNavigation(resolve(targetRoot, relative(sourceRoot, sourcePath)));
}
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
