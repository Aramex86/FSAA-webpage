import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { SITE } from '@/shared/config/site';
import '@/shared/ui/tokens.css';
import '@/shared/ui/docs-ui.css';

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} — ${SITE.fullName}`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.pitch,
  applicationName: SITE.name,
  keywords: [
    'FSAA',
    'Feature-Sliced Atomic Architecture',
    'feature-sliced design',
    'atomic design',
    'frontend architecture',
    'layered frontend',
    'graduation pattern',
  ],
  other: {
    'color-scheme': 'dark',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}