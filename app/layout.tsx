import type { Metadata } from "next";
import { AppShell } from "@/components/layout/AppShell";
import { AlphaJourneyProvider } from "@/features/orientation/provider";
import "./globals.css";
import "../styles/public-experience.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://nexahedron.com"),
  title: "NEXAHEDRON — The Orientation Laboratory",
  description: "NEXAHEDRON helps people orient themselves across existing knowledge.",
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
