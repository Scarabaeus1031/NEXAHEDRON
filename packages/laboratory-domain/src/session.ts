/** NEXAHEDRON-owned interaction states; none grants ORION authority. */
export type LaboratorySessionState =
  | "arrival"
  | "intake"
  | "orientation_choice"
  | "scope_confirmation"
  | "submitted"
  | "running"
  | "planned"
  | "blocked"
  | "invalid"
  | "failed"
  | "cancelled"
  | "report_inspection"
  | "atlas_or_library"
  | "reflection"
  | "departed";

export const LABORATORY_SESSION_SCHEMA =
  "nexahedron.laboratory-session/0.1-draft" as const;
