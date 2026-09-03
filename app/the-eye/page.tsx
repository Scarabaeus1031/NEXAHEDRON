import type { Metadata } from "next";
import { TheEyeResultView } from "@/features/the-eye/TheEyeResultView";

export const metadata: Metadata = {
  title: "THE EYE · Local result view · NEXAHEDRON",
  description: "A bounded local view of A2-verified THE EYE comparison artifacts.",
  robots: { index: false, follow: false },
};

export default function TheEyePage() {
  return <TheEyeResultView />;
}
