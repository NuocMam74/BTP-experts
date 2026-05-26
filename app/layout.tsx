import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Chatbot BTP — Agents IA spécialisés pour les pros du BTP",
  description:
    "Plateforme SaaS d'agents IA experts par métier : architecte, MOEX, économiste, géomètre, ingénieur structure, expert-comptable BTP. Analyse de documents techniques, livrables prêts à signer.",
};

// Script anti-flash : applique la classe `dark` AVANT le premier paint,
// d'après localStorage.theme ou prefers-color-scheme.
const THEME_BOOTSTRAP = `
(function() {
  try {
    var stored = localStorage.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var dark = stored === 'dark' || (stored !== 'light' && prefersDark);
    var root = document.documentElement;
    if (dark) root.classList.add('dark');
    else root.classList.remove('dark');
    root.style.colorScheme = dark ? 'dark' : 'light';
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOTSTRAP }} />
      </head>
      <body className="bg-canvas min-h-screen text-foreground antialiased">
        <SiteHeader />
        <div className="flex min-h-[calc(100vh-4rem)] flex-col">
          <div className="flex-1">{children}</div>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
