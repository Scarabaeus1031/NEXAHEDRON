import type { Metadata } from "next";
import { ChooseOrientationScreen } from "@/features/orientation/screens/ChooseOrientationScreen";

export const metadata: Metadata = {
  title: "Begin Orientation",
  description: "Begin one bounded Human-owned Orientation Session in the NEXAHEDRON reference Workspace.",
  alternates: { canonical: "/orient" },
};

export default function ChooseOrientationPage() {
  return <ChooseOrientationScreen />;
}
