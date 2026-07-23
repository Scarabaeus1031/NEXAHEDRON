import { FoundationalCasePage } from "@/features/library/components/FoundationalCasePage";
import { foundationalCases } from "@/features/library/foundational-cases";

export default function MapCasePage() {
  return <FoundationalCasePage orientationCase={foundationalCases.map} />;
}
