import type { OrionGateway } from "../../../packages/orion-gateway/src/index";

/** Dependencies admitted at the future Laboratory server composition root. */
export interface LaboratoryServerDependencies {
  readonly orion: OrionGateway;
}
