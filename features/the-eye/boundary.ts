export const THE_EYE_MAX_ARTIFACT_BYTES = 2 * 1024 * 1024;

export class ArtifactBoundaryError extends Error {
  readonly code: string;
  constructor(code: string, message: string) {
    super(message);
    this.code = code;
  }
}
