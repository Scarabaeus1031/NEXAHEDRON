import type { Metadata } from "next";
import { ChooseOrientationScreen } from "@/features/orientation/screens/ChooseOrientationScreen";

export const metadata: Metadata = {
  title: "Live Bounded Experiment",
  description: "Enter the Human-held, memory-only Phase II Orientation Workspace.",
  alternates: { canonical: "/orient" },
};

export default function ChooseOrientationPage() {
  return <ChooseOrientationScreen />;
}
