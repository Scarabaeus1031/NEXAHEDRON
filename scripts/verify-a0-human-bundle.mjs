import { createHash } from "node:crypto";
import { access, readdir, readFile } from "node:fs/promises";
import { dirname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const repositoryRoot = resolve(here, "..");
const bundleRoot = resolve(repositoryRoot, "public/a0-human");
const manifestPath = resolve(bundleRoot, "SOURCE_MANIFEST.json");
const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
const failures = [];

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

for (const path of (await walk(bundleRoot)).filter((candidate) => candidate.endsWith(".html"))) {
  const source = await readFile(path, "utf8");
  for (const token of ["A0_RESEARCH_DESK.html", "A0_RESEARCH_BACKLOG.html", "A0_BUILDER_LOG.html", "A0_LABORATORY.html", "SCIENCE_LAB/NAVIGATION", "NEXAH-Mission-Control"]) {
    if (source.includes(token)) failures.push(`private route in public HTML: ${relative(bundleRoot, path)} -> ${token}`);
  }
  const references = [
    ...source.matchAll(/<script\b[^>]*\bsrc=["']([^"']+)["']/gi),
    ...source.matchAll(/<link\b(?=[^>]*\brel=["']stylesheet["'])[^>]*\bhref=["']([^"']+)["']/gi),
  ].map((match) => match[1]);
  for (const reference of references) {
    if (/^(?:https?:|data:|\/\/)/i.test(reference)) continue;
    const cleanReference = decodeURIComponent(reference.split(/[?#]/, 1)[0]);
    const resolvedReference = resolve(dirname(path), cleanReference);
    if (!resolvedReference.startsWith(`${bundleRoot}/`)) {
      failures.push(`runtime reference escapes bundle: ${relative(bundleRoot, path)} -> ${reference}`);
      continue;
    }
    try {
      await access(resolvedReference);
    } catch {
      failures.push(`missing runtime reference: ${relative(bundleRoot, path)} -> ${reference}`);
    }
  }
}

for (const path of (await walk(bundleRoot)).filter((candidate) => /\.(?:css|csv|html|js|json|md|mjs|svg)$/i.test(candidate))) {
  const source = await readFile(path, "utf8");
  if (source.includes("/Users/tho2020/")) failures.push(`absolute private path in bundle: ${relative(bundleRoot, path)}`);
}

const publicNavigation = await Promise.all([
  "features/a0-human/A0HumanView.tsx",
  "components/layout/PublicHeader.tsx",
  "components/layout/PublicFooter.tsx",
  "app/sitemap.ts",
  "public/a0-human/start/nexahedron-public-navigation.js",
].map((path) => readFile(resolve(repositoryRoot, path), "utf8")));

const forbidden = [
  "A0_RESEARCH_DESK",
  "A0_RESEARCH_BACKLOG",
  "SCIENCE_LAB/NAVIGATION",
  "NEXAH-Mission-Control",
  "A0_BUILDER_LOG",
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
