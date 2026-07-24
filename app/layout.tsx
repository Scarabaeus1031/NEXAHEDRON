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
    default: "NEXAHEDRON — The Orientation Laboratory",
    template: "%s — NEXAHEDRON",
  },
  description: "NEXAHEDRON helps people orient themselves across existing knowledge.",
  alternates: { canonical: "/" },
  authors: [{ name: "Haptikdesign GmbH", url: "https://nexah.de" }],
  creator: "Haptikdesign GmbH",
  publisher: "Haptikdesign GmbH",
  robots: { index: true, follow: true },
  icons: { icon: "/icon.svg" },
  openGraph: {
    title: "NEXAHEDRON — The Orientation Laboratory",
    description: "NEXAHEDRON helps people orient themselves across existing knowledge.",
    images: [{ url: "/og.png", width: 1734, height: 909, alt: "NEXAHEDRON — The Orientation Laboratory" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "NEXAHEDRON — The Orientation Laboratory",
    description: "NEXAHEDRON helps people orient themselves across existing knowledge.",
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
