import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { SITE } from "@/shared/config/site";
import "@/shared/ui/tokens.css";
import "@/shared/ui/docs-ui.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://aramex86.github.io"),
  title: {
    default: `${SITE.name} — ${SITE.fullName}`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.pitch,
  applicationName: SITE.name,
  keywords: [
    "FSAA",
    "Feature-Sliced Atomic Architecture",
    "feature-sliced design",
    "atomic design",
    "frontend architecture",
    "layered frontend",
    "graduation pattern",
  ],
  openGraph: {
    type: "website",
    siteName: "FSAA — Feature-Sliced Atomic Architecture",
    url: "https://aramex86.github.io/fsaa/",
    title: "FSAA — Feature-Sliced Atomic Architecture",
    description: SITE.pitch,
    images: [
      {
        url: "https://aramex86.github.io/fsaa/og.png",
        width: 1200,
        height: 630,
        alt: "FSAA — Feature-Sliced Atomic Architecture",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FSAA — Feature-Sliced Atomic Architecture",
    description: SITE.pitch,
  },
  icons: {
    icon: "/fsaa/favicon.ico",
    apple: "/fsaa/apple-touch-icon.png",
  },
};

/* Phase 1.5 — JSON-LD structured data (WebSite + SoftwareApplication), emitted in root layout. */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: `${SITE.name} — ${SITE.fullName}`,
      url: "https://aramex86.github.io/fsaa/",
      description: SITE.pitch,
      inLanguage: "en",
    },
    {
      "@type": "SoftwareApplication",
      name: "FSAA — Feature-Sliced Atomic Architecture",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Any",
      description: SITE.positioning,
      url: "https://aramex86.github.io/fsaa/",
      license: "https://github.com/Aramex86/fsaa#MIT-1-ov-file",
      author: { "@type": "Person", name: "Veaceslav Bezusco" },
    },
  ],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
