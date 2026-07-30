import type { Metadata } from "next";
import { ChooseOrientationScreen } from "@/features/orientation/screens/ChooseOrientationScreen";

export const metadata: Metadata = {
  title: "Live Bounded Experiment",
  description: "Enter one Human-held, memory-only experiment in orientation.",
  alternates: { canonical: "/orient" },
};

export default function ChooseOrientationPage() {
  return <ChooseOrientationScreen />;
}
