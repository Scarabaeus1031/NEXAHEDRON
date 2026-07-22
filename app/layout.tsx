import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NEXAHEDRON — The NEXAH Laboratory",
  description:
    "A calm, precise workspace for orientation through paths, evidence and limits.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
