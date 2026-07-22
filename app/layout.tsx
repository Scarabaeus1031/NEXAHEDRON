import type { Metadata } from "next";
import { AppShell } from "@/components/layout/AppShell";
import { AlphaJourneyProvider } from "@/features/orientation/provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "NEXAHEDRON — The Orientation Laboratory",
  description: "NEXAHEDRON helps people orient themselves across existing knowledge.",
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
