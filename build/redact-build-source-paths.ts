import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import type { Plugin } from "vite";

export type ManifestIdentifierState = "SAFE_UNCHANGED" | "SAFE_NORMALIZED";

export interface ManifestIdentifierInspection {
  state: ManifestIdentifierState;
  value: string;
}

export const MAX_PERCENT_INSPECTION_DEPTH = 2;

const CONTROL_CHARACTER = /[\u0000-\u001f\u007f]/;
const WINDOWS_DRIVE_ABSOLUTE = /^[A-Za-z]:\//;
const FILE_URI = /^file:/i;

function rejectIdentifier(value: string, reason: string): never {
  throw new Error(`Rejected Vite manifest identifier (${reason}): ${value}`);
}

function inspectPercentEncoding(value: string): void {
  let inspected = value;
  for (let depth = 0; depth < MAX_PERCENT_INSPECTION_DEPTH; depth += 1) {
    let decoded = "";
    let encoded = false;
    for (let index = 0; index < inspected.length; index += 1) {
      const character = inspected[index];
      if (character !== "%") {
        decoded += character;
        continue;
      }
      const pair = inspected.slice(index + 1, index + 3);
      if (!/^[0-9A-Fa-f]{2}$/.test(pair)) {
        rejectIdentifier(value, "malformed percent encoding");
      }
      encoded = true;
      const byte = Number.parseInt(pair, 16);
      if (
        byte === 0x00 ||
        byte < 0x20 ||
        byte === 0x7f ||
        byte === 0x2e ||
        byte === 0x2f ||
        byte === 0x5c ||
        byte === 0x25
      ) {
        rejectIdentifier(value, "prohibited percent-encoded path token");
      }
      decoded += String.fromCharCode(byte);
      index += 2;
    }
    if (!encoded || decoded === inspected) return;
    inspected = decoded;
  }
}

function validateRelativeSegments(value: string, original: string): string[] {
  if (value.startsWith("/") || WINDOWS_DRIVE_ABSOLUTE.test(value)) {
    rejectIdentifier(original, "absolute path");
  }
  const segments = value.split("/");
  if (segments.some((segment) => segment === "" || segment === "." || segment === "..")) {
    rejectIdentifier(original, "empty or traversing path segment");
  }
  return segments;
}

/** Classifies one manifest identifier; rejection is the closed third state. */
export function inspectBuildManifestIdentifier(value: string): ManifestIdentifierInspection {
  if (value.length === 0 || value.trim() !== value) {
    rejectIdentifier(value, "empty or surrounding whitespace");
  }
  if (CONTROL_CHARACTER.test(value)) rejectIdentifier(value, "control character");
  if (FILE_URI.test(value)) rejectIdentifier(value, "file URI");
  inspectPercentEncoding(value);

  const normalized = value.replaceAll("\\", "/");
  if (normalized.startsWith("//")) rejectIdentifier(value, "UNC or network path");

  const segments = normalized.split("/");
  const nodeModulesIndex = segments.lastIndexOf("node_modules");
  const absolute = normalized.startsWith("/") || WINDOWS_DRIVE_ABSOLUTE.test(normalized);
  const traversing = segments.includes(".") || segments.includes("..");

  if (nodeModulesIndex >= 0 && nodeModulesIndex === segments.length - 1) {
    rejectIdentifier(value, "empty node_modules suffix");
  }

  if (absolute || traversing) {
    if (nodeModulesIndex < 0) rejectIdentifier(value, "unrelated absolute or traversing path");
    const suffix = segments.slice(nodeModulesIndex + 1);
    validateRelativeSegments(suffix.join("/"), value);
    return { state: "SAFE_NORMALIZED", value: `node_modules/${suffix.join("/")}` };
  }

  if (normalized !== value) rejectIdentifier(value, "ambiguous backslash separator");
  validateRelativeSegments(normalized, value);
  return { state: "SAFE_UNCHANGED", value };
}

export function normalizeBuildManifestModuleId(value: string): string {
  return inspectBuildManifestIdentifier(value).value;
}

export function normalizeBuildManifest(value: unknown): unknown {
  if (typeof value === "string") return normalizeBuildManifestModuleId(value);
  if (Array.isArray(value)) return value.map(normalizeBuildManifest);
  if (!value || typeof value !== "object") return value;

  const normalized: Record<string, unknown> = {};
  for (const [key, child] of Object.entries(value)) {
    const normalizedKey = normalizeBuildManifestModuleId(key);
    if (Object.hasOwn(normalized, normalizedKey)) {
      throw new Error(
        `Duplicate Vite manifest key after normalization: ${normalizedKey}`,
      );
    }
    normalized[normalizedKey] = normalizeBuildManifest(child);
  }
  return normalized;
}

/** Removes build-only labels and normalizes manifest IDs that disclose source roots. */
export function redactBuildSourcePaths(): Plugin {
  return {
    name: "nexahedron-redact-build-source-paths",
    enforce: "post",
    renderChunk(code) {
      return code
        .replace(/^\/\/#region .*$/gm, "//#region bundled module")
        .replace(/^\/\/#endregion .*$/gm, "//#endregion");
    },
    writeBundle(options) {
      if (!options.dir) return;
      const manifestPath = path.join(options.dir, ".vite", "manifest.json");
      let source: string;
      try {
        source = readFileSync(manifestPath, "utf8");
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code === "ENOENT") return;
        throw error;
      }

      const parsed = JSON.parse(source);
      writeFileSync(
        manifestPath,
        `${JSON.stringify(normalizeBuildManifest(parsed), null, 2)}\n`,
        "utf8",
      );
    },
  };
}
