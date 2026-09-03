import { lstat, readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { inspectBuildManifestIdentifier } from "../build/redact-build-source-paths.ts";

export const PRIVATE_OUTPUT_PATTERNS = [
  ["PRIVATE_ABSOLUTE_PATH", "/Users/"],
  ["PRIVATE_ABSOLUTE_PATH", "/private/"],
  ["PRIVATE_ABSOLUTE_PATH", "/private/tmp"],
  ["PRIVATE_ABSOLUTE_PATH", "/var/folders/"],
  ["PRIVATE_FILE_URI", "file://"],
  ["PRIVATE_URL_ENCODED_PATH", "Users%2F"],
  ["PRIVATE_URL_ENCODED_PATH", "%2FUsers%2F"],
  ["PRIVATE_USER_IDENTIFIER", "NEXAH ECOSYSTEM"],
  ["PRIVATE_USER_IDENTIFIER", "tho2020"],
  ["ENVIRONMENT_DUMP", "HOME="],
  ["ENVIRONMENT_DUMP", "PWD="],
  ["ENVIRONMENT_DUMP", "OLDPWD="],
  ["PACKAGE_MANAGER_PRIVATE_PATH", "node_modules/.pnpm"],
  ["LOCAL_EXECUTABLE_PATH", "/eye-a2"],
  ["PRIVATE_PROVENANCE_PATH", "/REVIEWS/NEXAH_THE_EYE_"],
];

const SECRET_PATTERNS = [
  ["SECRET_PRIVATE_KEY", /-----BEGIN [^-\n]*PRIVATE KEY-----/g],
  ["SECRET_ACCESS_TOKEN", /\b(?:sk-[A-Za-z0-9_-]{20,}|gh[pousr]_[A-Za-z0-9_]{20,}|AKIA[A-Z0-9]{16})\b/g],
  ["SECRET_CREDENTIAL_VALUE", /\b(?:authorization|password|credential|cookie)\s*[:=]\s*["'][^"'\s]{8,}["']/gi],
];

function occurrences(haystack, needle) {
  const found = [];
  let offset = 0;
  while ((offset = haystack.indexOf(needle, offset)) >= 0) {
    found.push(offset);
    offset += Math.max(needle.length, 1);
  }
  return found;
}

async function outputFiles(root, directory = root) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    const relativePath = path.relative(root, fullPath).replaceAll(path.sep, "/");
    if (entry.isSymbolicLink()) {
      files.push({ relative_path: relativePath, absolute_path: fullPath, kind: "symlink" });
    } else if (entry.isDirectory()) {
      files.push(...(await outputFiles(root, fullPath)));
    } else if (entry.isFile()) {
      files.push({ relative_path: relativePath, absolute_path: fullPath, kind: "file" });
    }
  }
  return files.sort((a, b) => a.relative_path.localeCompare(b.relative_path));
}

export async function validateViteManifest(outputRoot) {
  const clientRoot = path.join(outputRoot, "client");
  const manifestPath = path.join(clientRoot, ".vite", "manifest.json");
  const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
  const keys = new Set(Object.keys(manifest));
  const issues = [];
  const checkSafe = (value, location) => {
    try {
      const inspection = inspectBuildManifestIdentifier(value);
      if (inspection.state !== "SAFE_UNCHANGED" || inspection.value !== value) {
        issues.push({ location, value, issue: "IDENTIFIER_REQUIRES_NORMALIZATION" });
      }
    } catch (error) {
      issues.push({
        location,
        value,
        issue: "UNSAFE_IDENTIFIER",
        detail: String(error instanceof Error ? error.message : error),
      });
    }
  };

  const inspectIdentifiers = (value, location) => {
    if (typeof value === "string") {
      checkSafe(value, location);
      return;
    }
    if (Array.isArray(value)) {
      value.forEach((item, index) => inspectIdentifiers(item, `${location}[${index}]`));
      return;
    }
    if (!value || typeof value !== "object") return;
    for (const [key, child] of Object.entries(value)) {
      checkSafe(key, `${location}.key:${key}`);
      inspectIdentifiers(child, `${location}.${key}`);
    }
  };

  inspectIdentifiers(manifest, "manifest");

  for (const [key, chunk] of Object.entries(manifest)) {
    if (!chunk || typeof chunk !== "object" || Array.isArray(chunk)) {
      issues.push({ location: `key:${key}`, value: String(chunk), issue: "INVALID_CHUNK_RECORD" });
      continue;
    }

    for (const field of ["imports", "dynamicImports"]) {
      for (const reference of chunk[field] ?? []) {
        if (!keys.has(reference)) {
          issues.push({ location: `${key}.${field}`, value: reference, issue: "UNRESOLVED_MANIFEST_KEY" });
        }
      }
    }
    for (const field of ["file", "css", "assets"]) {
      const references = field === "file" ? [chunk[field]] : (chunk[field] ?? []);
      for (const reference of references) {
        if (typeof reference !== "string") continue;
        try {
          const metadata = await lstat(path.join(clientRoot, reference));
          if (!metadata.isFile()) throw new Error("not a file");
        } catch {
          issues.push({ location: `${key}.${field}`, value: reference, issue: "UNRESOLVED_OUTPUT_FILE" });
        }
      }
    }
  }

  return { valid_json: true, entries: keys.size, issues };
}

export async function scanProductionOutput(outputRoot, additionalForbiddenRoots = []) {
  const root = path.resolve(outputRoot);
  const files = await outputFiles(root);
  const findings = [];
  const patterns = [
    ...PRIVATE_OUTPUT_PATTERNS,
    ...additionalForbiddenRoots.filter(Boolean).map((value) => ["DECLARED_BUILD_ROOT", path.resolve(value)]),
  ];

  for (const file of files) {
    if (file.kind === "symlink") {
      findings.push({ file: file.relative_path, classification: "SYMLINK_IN_OUTPUT", pattern: "symlink", offset: 0 });
      continue;
    }
    const bytes = await readFile(file.absolute_path);
    const text = bytes.toString("utf8");
    for (const [classification, patternValue] of patterns) {
      for (const offset of occurrences(text, patternValue)) {
        findings.push({ file: file.relative_path, classification, pattern: patternValue, offset });
      }
    }
    for (const [classification, expression] of SECRET_PATTERNS) {
      expression.lastIndex = 0;
      for (const match of text.matchAll(expression)) {
        findings.push({ file: file.relative_path, classification, pattern: expression.source, offset: match.index ?? 0 });
      }
    }
  }

  const manifest = await validateViteManifest(root);
  for (const issue of manifest.issues) {
    findings.push({ file: "client/.vite/manifest.json", classification: `MANIFEST_${issue.issue}`, pattern: issue.value, offset: 0 });
  }
  findings.sort((a, b) => a.file.localeCompare(b.file) || a.offset - b.offset || a.classification.localeCompare(b.classification));
  return {
    schema: "nexah.production-output-privacy-scan/1.0",
    files_scanned: files.length,
    hidden_vite_manifest_scanned: files.some((file) => file.relative_path === "client/.vite/manifest.json"),
    manifest_entries: manifest.entries,
    finding_count: findings.length,
    findings,
  };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const [outputRoot = "dist", ...forbiddenRoots] = process.argv.slice(2);
  const report = await scanProductionOutput(outputRoot, forbiddenRoots);
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  if (report.finding_count !== 0) process.exitCode = 1;
}
