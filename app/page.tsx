import { A0WorldFrame } from "@/components/layout/A0WorldFrame";
import { HumanConnect } from "@/features/connect/HumanConnect";

export default async function Home({
  searchParams,
}: {
  readonly searchParams: Promise<{ readonly view?: string; readonly from?: string }>;
}) {
  const view = (await searchParams).view;
  const sources: Readonly<Record<string, string>> = {
    human: "/a0-human/start/A0_NEXAH_APERTURE_JOURNEY.html#human-view",
    arcade: "/a0-human/start/a0-public-arkade-index.html#arkade",
    club: "/a0-human/start/A0_OPIUM.html",
  };
  const titles: Readonly<Record<string, string>> = {
    human: "NEXAHEDRON · A0 Human View",
    arcade: "NEXAHEDRON · Arcade",
    club: "NEXAHEDRON · O·PIUM Club",
  };
  if (view === "connect") return <HumanConnect />;
  const source = view ? sources[view] ?? "/a0-human/start/index.html" : "/a0-human/start/index.html";
  const title = view ? titles[view] ?? "NEXAHEDRON · Foyer" : "NEXAHEDRON · Foyer";

  return <A0WorldFrame source={source} title={title} />;
}
