import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#0B1220] text-[#F4F6FC] antialiased">
        {children}
      </body>
    </html>
  );
}
