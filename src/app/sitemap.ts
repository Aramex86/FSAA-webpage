import type { MetadataRoute } from 'next';
import { docsSitemapEntries } from '@/features/docs-urls';

/* app/sitemap — one entry per documented page (Phase 1.5).
   Slugs come through features/docs-urls (entities registry wrapped for the app layer).
   force-static: required by output: 'export'. */
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return docsSitemapEntries().map((e) => ({
    url: e.url,
    lastModified: new Date(),
    changeFrequency: e.changeFrequency,
    priority: e.priority,
  }));
}