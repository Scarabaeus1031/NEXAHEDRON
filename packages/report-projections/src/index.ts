/** A UI projection may expose existing report fields but never replace them. */
export interface ReportProjectionMetadata {
  readonly sourceReportId: string;
  readonly sourceSchemaVersion: string;
}
