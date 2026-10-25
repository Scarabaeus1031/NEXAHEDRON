import { createHash } from "node:crypto";
import { access, readdir, readFile } from "node:fs/promises";
import { dirname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const repositoryRoot = resolve(here, "..");
const bundleRoot = process.env.A0_PUBLIC_BUNDLE_ROOT
  ? resolve(process.env.A0_PUBLIC_BUNDLE_ROOT)
  : resolve(repositoryRoot, "public/a0-human");
const manifestPath = resolve(bundleRoot, "SOURCE_MANIFEST.json");
const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
const failures = [];
const dynamicAnchors = new Map([
  ["start/A0_GAME_OF_WORLDS_PLAY.html", new Set(["pulse", "life", "domains", "numbers", "control-room", "generation-weave"])],
  ["start/assets/game-of-worlds-play/three-domain-transition-test/index.html", new Set(["domains", "atlas", "blue-body", "fibonacci"])],
  ["start/A0_BLUE_PINK_DODECA_CELL_RETURN.html", new Set(["cell-machine"])],
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
    else files.push(path);
  }
  return files.sort();
}

const declared = new Set();
for (const entry of manifest.files ?? []) {
  declared.add(entry.bundle_path);
  const path = resolve(bundleRoot, entry.bundle_path);
  let bytes;
  try {
    bytes = await readFile(path);
  } catch {
    failures.push(`missing bundle file: ${entry.bundle_path}`);
    continue;
  }
  if (sha256(bytes) !== entry.bundle_sha256) failures.push(`bundle hash mismatch: ${entry.bundle_path}`);
}

for (const path of await walk(bundleRoot)) {
  if (path === manifestPath) continue;
  const bundlePath = relative(bundleRoot, path);
  if (!declared.has(bundlePath)) failures.push(`undeclared bundle file: ${bundlePath}`);
}

const bundleFiles = await walk(bundleRoot);
for (const path of bundleFiles.filter((candidate) => candidate.endsWith(".html"))) {
  const source = await readFile(path, "utf8");
  for (const token of ["A0_RESEARCH_DESK.html", "A0_RESEARCH_BACKLOG.html", "A0_BUILDER_LOG.html", "A0_CROWN_SHADOW_CONTACT_BENCH.html", "A0_LABORATORY.html", "SCIENCE_LAB/NAVIGATION", "NEXAH-Mission-Control"]) {
    if (source.includes(token)) failures.push(`private route in public HTML: ${relative(bundleRoot, path)} -> ${token}`);
  }
  const runtimeReferences = [
    ...source.matchAll(/<script\b[^>]*\bsrc=["']([^"']+)["']/gi),
    ...source.matchAll(/<link\b(?=[^>]*\brel=["']stylesheet["'])[^>]*\bhref=["']([^"']+)["']/gi),
  ].map((match) => match[1]);
  const navigationReferences = [
    ...source.matchAll(/<a\b[^>]*\bhref=["']([^"']+)["']/gi),
  ].map((match) => match[1]);
  for (const reference of [...runtimeReferences, ...navigationReferences]) {
    if (/^(?:https?:|data:|\/\/)/i.test(reference)) continue;
    if (/^(?:mailto:|tel:|javascript:|#)/i.test(reference)) continue;
    if (reference.includes("${")) continue;
    const [rawPath, fragment = ""] = reference.split("#", 2);
    const cleanReference = decodeURIComponent(rawPath.split("?", 1)[0]);
    if (!cleanReference) continue;
    const resolvedReference = resolve(dirname(path), cleanReference);
    if (!resolvedReference.startsWith(`${bundleRoot}/`)) {
      failures.push(`public reference escapes bundle: ${relative(bundleRoot, path)} -> ${reference}`);
      continue;
    }
    try {
      await access(resolvedReference);
    } catch {
      failures.push(`missing public reference: ${relative(bundleRoot, path)} -> ${reference}`);
      continue;
    }
    if (fragment && resolvedReference.endsWith(".html")) {
      const target = await readFile(resolvedReference, "utf8");
      const escaped = fragment.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const targetBundlePath = relative(bundleRoot, resolvedReference).replaceAll("\\", "/");
      const allowedDynamic = dynamicAnchors.get(targetBundlePath)?.has(fragment);
      if (!allowedDynamic && !new RegExp(`(?:id|name)=["']${escaped}["']`, "i").test(target)) {
        failures.push(`missing public anchor: ${relative(bundleRoot, path)} -> ${reference}`);
      }
    }
  }
}

for (const path of bundleFiles.filter((candidate) => /\.(?:css|csv|html|js|json|md|mjs|svg)$/i.test(candidate))) {
  const source = await readFile(path, "utf8");
  if (source.includes("/Users/tho2020/")) failures.push(`absolute private path in bundle: ${relative(bundleRoot, path)}`);
  if (/(?:\.\.\/)+(?:SCIENCE_LAB|10(?:%20| )NEXAH(?:%20| )CORE|20(?:%20| )EXPERIENCE(?:%20| )PRODUCTION|30(?:%20| )SCIENCE(?:%20| )LAB|00%20EXECUTIVE|Desktop(?:%20| )LOCAL|00_INCOMING)\//.test(source)) {
    failures.push(`unprojected source-tree route: ${relative(bundleRoot, path)}`);
  }
}

const publicNavigation = await Promise.all([
  "features/a0-human/A0HumanView.tsx",
  "components/layout/PublicHeader.tsx",
  "components/layout/PublicFooter.tsx",
  "app/sitemap.ts",
  "public/a0-human/start/nexahedron-public-navigation.js",
].map((path) => readFile(resolve(repositoryRoot, path), "utf8")));

const [seamChapter, lifePage, jointPage] = await Promise.all([
  "start/03_THREE_POSITIONS_SEAM_RETURN.html",
  "start/A0_GAME_4_LIFE_PLUS_1.html",
  "start/A0_JOINT_APPLICATION_DEMONSTRATOR.html",
].map((path) => readFile(resolve(bundleRoot, path), "utf8")));
if (/A0_SCIENTIFIC_POSITION_REPORT\.html\s+REST\s+CHemest/i.test(seamChapter)) {
  failures.push("partial public rewrite left a broken seam-source image path");
}
if (!lifePage.includes('data-public-src="../../previews/numbers-return-20261019/book/assets/game-of-worlds-play/index.html')) {
  failures.push("GAME 4 LIFE public bridge does not resolve from a0-human/start to the deployed preview");
}
if (!jointPage.includes("j.file.endsWith('.html')?j.file:'../'+j.file")) {
  failures.push("joint source buttons do not distinguish public HTML fallbacks from local source records");
}

if (!declared.has("start/NEXAH_C_CONNECT.html")) failures.push("missing public C Connect page");
if (!publicNavigation.at(-1)?.includes("NEXAH_C_CONNECT.html")) failures.push("missing public C Connect navigation route");

const forbidden = [
  "A0_RESEARCH_DESK",
  "A0_RESEARCH_BACKLOG",
  "SCIENCE_LAB/NAVIGATION",
  "NEXAH-Mission-Control",
  "A0_BUILDER_LOG",
  "A0_CROWN_SHADOW_CONTACT_BENCH",
];
for (const token of forbidden) {
  if (publicNavigation.some((source) => source.includes(token))) failures.push(`forbidden public-navigation token: ${token}`);
}

if (manifest.source_identity !== "BOOK-A0_NEXAH_APERTURE_JOURNEY") failures.push("unexpected source identity");
if (manifest.authority !== "PUBLICATION_AUTHORIZED_BY_HUMAN_OWNER_2026-10-22") failures.push("unexpected authority state");

if (failures.length) {
  console.error(JSON.stringify({ status: "FAIL", failures }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({
  status: "PASS",
  source_identity: manifest.source_identity,
  files: manifest.files.length,
  transformed_files: manifest.files.filter((entry) => entry.treatment === "PUBLIC_PRESENTATION_TRANSFORM").length,
  navigator_identity_effect: "ZERO",
  publication_authorized: true,
}, null, 2));
