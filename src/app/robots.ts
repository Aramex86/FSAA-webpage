import type { MetadataRoute } from 'next';

/* app/robots — allow all crawlers, point at the sitemap (Phase 1.5).
   force-static: required by output: 'export'. */
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://aramex86.github.io/fsaa/sitemap.xml',
  };
}