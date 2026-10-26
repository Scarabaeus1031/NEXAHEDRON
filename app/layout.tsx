import type { Metadata } from "next";
import Script from "next/script";
import { AppShell } from "@/components/layout/AppShell";
import { AlphaJourneyProvider } from "@/features/orientation/provider";
import "./globals.css";
import "../styles/public-experience.css";
import "../styles/a0-human-view.css";
import "../styles/laboratory-experience.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://nexahedron.com"),
  applicationName: "NEXAHEDRON",
  title: {
    default: "NEXAHEDRON — Human View · NEXAH A0",
    template: "%s — NEXAHEDRON",
  },
  description: "The Human-facing A0 entrance: read, turn, compare, change, play and return with the difference visible.",
  alternates: { canonical: "/" },
  authors: [{ name: "Haptikdesign GmbH", url: "https://nexah.de" }],
  creator: "Haptikdesign GmbH",
  publisher: "Haptikdesign GmbH",
  robots: { index: true, follow: true },
  icons: { icon: "/icon.svg" },
  openGraph: {
    title: "NEXAHEDRON — Human View · NEXAH A0",
    description: "A source-bound A0 entrance for reading, turning, comparing, changing, playing and returning.",
    images: [{ url: "/og.png", width: 1734, height: 909, alt: "NEXAHEDRON — Human View · NEXAH A0" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "NEXAHEDRON — Human View · NEXAH A0",
    description: "A source-bound A0 entrance for reading, turning, comparing, changing, playing and returning.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body>
        <Script type="module" src="/a0-human/start/assets/vendor/model-viewer.min.js" strategy="afterInteractive" />
        <AlphaJourneyProvider>
          <AppShell>{children}</AppShell>
        </AlphaJourneyProvider>
      </body>
    </html>
  );
}
