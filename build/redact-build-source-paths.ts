import type { Plugin } from "vite";

/** Removes bundler-only region labels that disclose absolute build-machine paths. */
export function redactBuildSourcePaths(): Plugin {
  return {
    name: "nexahedron-redact-build-source-paths",
    enforce: "post",
    renderChunk(code) {
      return code
        .replace(/^\/\/#region .*$/gm, "//#region bundled module")
        .replace(/^\/\/#endregion .*$/gm, "//#endregion");
    },
  };
}
