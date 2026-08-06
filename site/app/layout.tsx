import type { Metadata, Viewport } from "next";
import { DM_Sans, Fraunces, JetBrains_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { BIZ } from "@/lib/business";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { MobileDock } from "@/components/site/MobileDock";
import { localBusinessJsonLd } from "@/lib/schema";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", display: "optional", adjustFontFallback: true });
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", display: "optional", adjustFontFallback: true });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "optional", adjustFontFallback: true });

export const metadata: Metadata = {
  metadataBase: new URL(BIZ.url),
  title: {
    default: `${BIZ.name} — Door Supply, Installation & Repair NYC`,
    template: `%s — ${BIZ.name}`,
  },
  description:
    `${BIZ.name} provides commercial and residential door supply, custom installation, hardware, and structural door repairs across Manhattan and Brooklyn from our East Village headquarters. Free estimates — call ${BIZ.phone}.`,
  keywords: [
    "door supply East Village",
    "door installation NYC",
    "door repair Manhattan NY",
    "commercial doors Lower East Side",
    "custom door installation Brooklyn",
    "door hardware supply NYC",
  ],
  openGraph: {
    type: "website",
    siteName: BIZ.name,
    url: BIZ.url,
    locale: "en_US",
    title: `${BIZ.name} — Door Supply, Installation & Repair NYC`,
    description:
      "Commercial and residential door supply, custom installation, hardware, and structural repairs across Manhattan & Brooklyn from 99 Loisaida Ave.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: `${BIZ.name} — NYC door supply and installation`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${BIZ.name} — NYC door supply & repair`,
    description: "Door supply, installation, hardware, and structural repair for Manhattan and Brooklyn.",
    images: ["/opengraph-image.png"],
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#F8F6F3",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US" className={`${dmSans.variable} ${fraunces.variable} ${mono.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              'if(location.protocol==="http:"&&location.hostname==="eastvillagedoorsupplieranddoorrepair.com"){location.replace("https://"+location.host+location.pathname+location.search+location.hash)}',
          }}
        />
      </head>
      <body className="font-sans bg-cream-100 text-cream-900 antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <MobileDock />
        <Toaster position="top-center" theme="light" richColors />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd()) }}
        />
      </body>
    </html>
  );
}
