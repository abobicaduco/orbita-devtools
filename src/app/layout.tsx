import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Starfield } from "@/components/Starfield";
import { siteConfig } from "@/site.config";
import { webAppJsonLd } from "@/lib/seo";

const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const sans = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.author.name, url: siteConfig.author.github }],
  creator: siteConfig.author.name,
  keywords: [...siteConfig.keywords],
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.svg" },
  other: { "google-adsense-account": siteConfig.adsense.client },
};

export const viewport: Viewport = {
  themeColor: "#0A0E1A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <head>
        {siteConfig.adsense.enabled && (
          <Script
            id="adsbygoogle-init"
            async
            strategy="afterInteractive"
            crossOrigin="anonymous"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${siteConfig.adsense.client}`}
          />
        )}
      </head>
      <body>
        <Starfield />
        <Script id="ld-webapp" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd()) }} />
        <Header />
        <main className="container-page py-8 sm:py-12">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
