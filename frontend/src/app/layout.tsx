import type { Metadata } from "next";
import { Manrope, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AIRLOCK AI — Prove the test. Then trust the result.",
  description: "AI Security Evaluation Assurance Platform. Run adversarial model evaluations inside controlled environments, prevent canary contamination, and produce cryptographically verifiable evidence.",
  keywords: ["AI Security", "Model Evaluation", "Red Teaming", "AI Safety", "Cryptographic Audit", "Prompt Injection Defense"],
  icons: {
    icon: "/favicon.ico",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable} ${ibmPlexMono.variable} dark`}>
      <body className="min-h-screen bg-[#0B1220] text-[#F4F6FB] antialiased selection:bg-[#86A8FF]/20 selection:text-[#86A8FF]">
        {children}
      </body>
    </html>
  );
}
