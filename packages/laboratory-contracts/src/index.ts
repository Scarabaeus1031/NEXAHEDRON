import type { LaboratorySessionState } from "../../laboratory-domain/src/session";

export const LABORATORY_CONTRACT_SCHEMA =
  "nexahedron.laboratory-contract/0.1-draft" as const;

export interface LaboratorySessionSnapshot {
  readonly sessionId: string;
  readonly state: LaboratorySessionState;
  readonly revision: number;
}

/** Reference only; an approved ORION contract will define the report payload. */
export interface OrionReportReference {
  readonly reportId: string;
  readonly schemaVersion: string;
}
