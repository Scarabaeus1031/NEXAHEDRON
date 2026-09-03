import type { Metadata } from "next";
import { TheEyeResultView } from "@/features/the-eye/TheEyeResultView";

export const metadata: Metadata = {
  title: "THE EYE · Sealed result view · NEXAHEDRON",
  description: "A bounded view of sealed THE EYE comparison artifacts, verified locally or before packaging.",
  robots: { index: false, follow: false },
};

export default function TheEyePage() {
  return <TheEyeResultView />;
}
