import { createHash } from "node:crypto";

export const CONFIRMED_LOCAL_SOURCE_SCHEMA =
  "orion.confirmed-local-source/0.1-alpha" as const;
export const CONFIRMED_LOCAL_TEXT_MEDIA_TYPE =
  "text/plain;charset=utf-8" as const;
export const WHOLE_TEXT_FRAGMENT = "whole" as const;

export interface WorkingMaterialSeed {
  readonly materialId: string;
  readonly orientationObjectId: string;
  readonly humanOwner: string;
  readonly content?: string;
}

export interface WorkingMaterialSnapshot {
  readonly materialId: string;
  readonly orientationObjectId: string;
  readonly humanOwner: string;
  readonly revision: number;
  readonly content: string;
}

export interface HumanConfirmation {
  readonly confirmedBy: string;
  readonly accepted: true;
}

export interface ConfirmedMaterialArtifact {
  readonly schema_version: typeof CONFIRMED_LOCAL_SOURCE_SCHEMA;
  readonly orientation_object_id: string;
  readonly orientation_object_version: string;
  readonly source: {
    readonly entry_id: string;
    readonly source_owner: string;
    readonly source_ref: string;
    readonly source_version: string;
    readonly fragment_ref: typeof WHOLE_TEXT_FRAGMENT;
    readonly media_type: typeof CONFIRMED_LOCAL_TEXT_MEDIA_TYPE;
    readonly content: string;
    readonly integrity_sha256: string;
  };
  readonly confirmation: {
    readonly confirmed_by: string;
    readonly confirmed_revision: number;
    readonly confirmation_id: string;
  };
}

export interface ConfirmedMaterialValidation {
  readonly valid: boolean;
  readonly checks: readonly string[];
  readonly errors: readonly string[];
}

function requireText(value: string, fieldName: string): string {
  if (typeof value !== "string" || !value.trim()) {
    throw new TypeError(`${fieldName} must be non-empty text`);
  }
  return value;
}

function sha256Text(value: string): string {
  return createHash("sha256").update(value, "utf8").digest("hex");
}

function canonicalize(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(canonicalize);
  if (value !== null && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value)
        .sort(([left], [right]) => (left < right ? -1 : left > right ? 1 : 0))
        .map(([key, item]) => [key, canonicalize(item)]),
    );
  }
  return value;
}

function canonicalJson(value: unknown): string {
  return JSON.stringify(canonicalize(value));
}

function deepFreeze<T>(value: T): Readonly<T> {
  if (value !== null && typeof value === "object" && !Object.isFrozen(value)) {
    for (const item of Object.values(value)) deepFreeze(item);
    Object.freeze(value);
  }
  return value;
}

function confirmationDigestPayload(
  entryId: string,
  revision: string,
  confirmedBy: string,
  confirmedRevision: number,
) {
  return {
    entry_id: entryId,
    revision,
    confirmed_by: confirmedBy,
    confirmed_revision: confirmedRevision,
    fragment_ref: WHOLE_TEXT_FRAGMENT,
  };
}

/** Human-owned material remains mutable until the Human explicitly confirms it. */
export class MutableWorkingMaterial {
  readonly #materialId: string;
  readonly #orientationObjectId: string;
  readonly #humanOwner: string;
  #revision = 1;
  #content: string;

  constructor(seed: WorkingMaterialSeed) {
    this.#materialId = requireText(seed.materialId, "materialId");
    this.#orientationObjectId = requireText(
      seed.orientationObjectId,
      "orientationObjectId",
    );
    this.#humanOwner = requireText(seed.humanOwner, "humanOwner");
    this.#content = seed.content ?? "";
  }

  edit(content: string): WorkingMaterialSnapshot {
    if (typeof content !== "string") {
      throw new TypeError("content must be text");
    }
    this.#content = content;
    this.#revision += 1;
    return this.snapshot();
  }

  snapshot(): WorkingMaterialSnapshot {
    return deepFreeze({
      materialId: this.#materialId,
      orientationObjectId: this.#orientationObjectId,
      humanOwner: this.#humanOwner,
      revision: this.#revision,
      content: this.#content,
    });
  }
}

/**
 * Cross the Human-confirmation boundary once, producing no side effects and
 * invoking no ORION behavior.
 */
export function confirmWorkingMaterial(
  material: MutableWorkingMaterial,
  confirmation: HumanConfirmation,
): ConfirmedMaterialArtifact {
  if (!(material instanceof MutableWorkingMaterial)) {
    throw new TypeError("material must be MutableWorkingMaterial");
  }
  if (confirmation?.accepted !== true) {
    throw new Error("explicit Human confirmation is required");
  }

  const snapshot = material.snapshot();
  const confirmedBy = requireText(confirmation.confirmedBy, "confirmedBy");
  if (confirmedBy !== snapshot.humanOwner) {
    throw new Error("only the Human owner may confirm this Working Material");
  }
  requireText(snapshot.content, "content");

  const contentSha256 = sha256Text(snapshot.content);
  const sourceVersion = `sha256:${contentSha256}`;
  const entryId = `confirmed-${snapshot.materialId}`;
  const confirmationSha256 = sha256Text(
    canonicalJson(
      confirmationDigestPayload(
        entryId,
        sourceVersion,
        confirmedBy,
        snapshot.revision,
      ),
    ),
  );

  return deepFreeze({
    schema_version: CONFIRMED_LOCAL_SOURCE_SCHEMA,
    orientation_object_id: snapshot.orientationObjectId,
    orientation_object_version: String(snapshot.revision),
    source: {
      entry_id: entryId,
      source_owner: snapshot.humanOwner,
      source_ref: `nexahedron://confirmed-source/${snapshot.materialId}`,
      source_version: sourceVersion,
      fragment_ref: WHOLE_TEXT_FRAGMENT,
      media_type: CONFIRMED_LOCAL_TEXT_MEDIA_TYPE,
      content: snapshot.content,
      integrity_sha256: contentSha256,
    },
    confirmation: {
      confirmed_by: confirmedBy,
      confirmed_revision: snapshot.revision,
      confirmation_id: `confirmation-${confirmationSha256.slice(0, 16)}`,
    },
  });
}

/** Validate only the local confirmation artifact and Alpha profile invariants. */
export function validateConfirmedMaterial(
  artifact: ConfirmedMaterialArtifact,
): ConfirmedMaterialValidation {
  const checks: string[] = [];
  const errors: string[] = [];
  const check = (name: string, condition: boolean, error: string) => {
    checks.push(name);
    if (!condition) errors.push(error);
  };

  const content = artifact?.source?.content;
  const contentSha256 =
    typeof content === "string" ? sha256Text(content) : "";
  const expectedSourceVersion = `sha256:${contentSha256}`;
  const confirmation = artifact?.confirmation;
  const expectedConfirmationId =
    confirmation &&
    typeof artifact?.source?.entry_id === "string" &&
    typeof confirmation.confirmed_by === "string" &&
    Number.isInteger(confirmation.confirmed_revision) &&
    confirmation.confirmed_revision > 0
      ? `confirmation-${sha256Text(
          canonicalJson(
            confirmationDigestPayload(
              artifact.source.entry_id,
              expectedSourceVersion,
              confirmation.confirmed_by,
              confirmation.confirmed_revision,
            ),
          ),
        ).slice(0, 16)}`
      : "";

  check(
    "schema_version",
    artifact?.schema_version === CONFIRMED_LOCAL_SOURCE_SCHEMA,
    "unsupported Confirmed Material schema",
  );
  check(
    "exact_text_profile",
    artifact?.source?.media_type === CONFIRMED_LOCAL_TEXT_MEDIA_TYPE &&
      artifact?.source?.fragment_ref === WHOLE_TEXT_FRAGMENT,
    "Confirmed Material must use the whole UTF-8 plain-text profile",
  );
  check(
    "content_integrity",
    Boolean(content) &&
      artifact?.source?.integrity_sha256 === contentSha256 &&
      artifact?.source?.source_version === expectedSourceVersion,
    "Confirmed Material content integrity does not match",
  );
  check(
    "human_ownership",
    Boolean(artifact?.source?.source_owner) &&
      artifact?.source?.source_owner === confirmation?.confirmed_by,
    "Confirmed Material must be confirmed by its Human owner",
  );
  check(
    "confirmation_identity",
    Boolean(expectedConfirmationId) &&
      confirmation?.confirmation_id === expectedConfirmationId,
    "Confirmed Material confirmation identity does not match",
  );
  check(
    "version_alignment",
    artifact?.orientation_object_version ===
      String(confirmation?.confirmed_revision),
    "Orientation Object version must match the confirmed material revision",
  );
  check(
    "identity_present",
    Boolean(
      artifact?.orientation_object_id?.trim() &&
        artifact?.source?.entry_id?.trim() &&
        artifact?.source?.source_ref?.trim(),
    ),
    "Confirmed Material identity is incomplete",
  );

  return deepFreeze({
    valid: errors.length === 0,
    checks: deepFreeze(checks),
    errors: deepFreeze(errors),
  });
}

/** Canonical UTF-8 JSON representation, including one final newline. */
export function serializeConfirmedMaterial(
  artifact: ConfirmedMaterialArtifact,
): string {
  const validation = validateConfirmedMaterial(artifact);
  if (!validation.valid) {
    throw new Error(`invalid Confirmed Material: ${validation.errors.join("; ")}`);
  }
  return `${canonicalJson(artifact)}\n`;
}
