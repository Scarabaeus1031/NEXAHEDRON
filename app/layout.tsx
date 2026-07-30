import type { Metadata } from "next";
import { AppShell } from "@/components/layout/AppShell";
import { AlphaJourneyProvider } from "@/features/orientation/provider";
import "./globals.css";
import "../styles/public-experience.css";
import "../styles/laboratory-experience.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://nexahedron.com"),
  applicationName: "NEXAHEDRON",
  title: {
    default: "NEXAHEDRON — Orientation Research Demonstrator",
    template: "%s — NEXAHEDRON",
  },
  description: "A public Human-facing research demonstrator for one bounded experiment in orientation.",
  alternates: { canonical: "/" },
  authors: [{ name: "Haptikdesign GmbH", url: "https://nexah.de" }],
  creator: "Haptikdesign GmbH",
  publisher: "Haptikdesign GmbH",
  robots: { index: true, follow: true },
  icons: { icon: "/icon.svg" },
  openGraph: {
    title: "NEXAHEDRON — Orientation Research Demonstrator",
    description: "A public Human-facing research demonstrator for one bounded experiment in orientation.",
    images: [{ url: "/og.png", width: 1734, height: 909, alt: "NEXAHEDRON — Orientation Research Demonstrator" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "NEXAHEDRON — Orientation Research Demonstrator",
    description: "A public Human-facing research demonstrator for one bounded experiment in orientation.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AlphaJourneyProvider>
          <AppShell>{children}</AppShell>
        </AlphaJourneyProvider>
      </body>
    </html>
  );
}
