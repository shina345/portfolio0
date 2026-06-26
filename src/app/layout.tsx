import type { Metadata } from "next";
import "./globals.css";
import { LenisProvider } from "@/components/providers/lenis-provider";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Preloader } from "@/components/3d/preloader";

export const metadata: Metadata = {
  title: "Oyebamiji Shinaayomi — Full Stack & 3D Web Developer",
  description:
    "Portfolio of Oyebamiji Shinaayomi — a full stack developer specializing in React, Next.js, Three.js, and interactive 3D web experiences. Available for freelance and full-time roles.",
  keywords: ["developer", "portfolio", "React", "Three.js", "Next.js", "3D", "web developer"],
  openGraph: {
    title: "Oyebamiji Shinaayomi — Full Stack & 3D Web Developer",
    description: "Interactive 3D portfolio showcasing full stack and 3D web development work.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ background: "#030303" }}>
      <body>
        <ThemeProvider>
          <LenisProvider>
            <CustomCursor />
            <Preloader />
            <div className="scanline" />
            {children}
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
