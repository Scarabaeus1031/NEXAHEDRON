import { OrientationWorkspaceScreen } from "@/features/orientation/screens/OrientationWorkspaceScreen";

/**
 * The public Wonder route is the stable entry seam.
 * Its implementation now opens the complete canonical Orientation Session.
 */
export function WonderScreen() {
  return <OrientationWorkspaceScreen />;
}
