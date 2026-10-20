import type { Metadata } from "next";
import { GuidedOrientationScreen } from "@/features/guided-orientation/GuidedOrientationScreen";

export const metadata: Metadata = {
  title: "Guided Orientation",
  description: "A deterministic, Human-held question path ending at Rest.",
  robots: { index: false, follow: false },
};

export default function GuidedOrientationPage() {
  return <GuidedOrientationScreen />;
}
