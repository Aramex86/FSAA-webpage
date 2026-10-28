/* features/docs-urls — pages-layer wrapper around the docs-page entity registry.
   Returns sitemap-ready entries for the app layer (FSAA: app must not import
   entities directly — it goes through features). */
import { DOCS_PAGES } from '@/entities/docs-page';
import { SITE_URL } from '@/shared/config/site';

export type DocsSitemapEntry = {
  url: string;
  changeFrequency: 'weekly';
  priority: number;
};

const PRIORITY_BY_SLUG: Record<string, number> = {
  '/': 1.0,
  '/architecture': 0.9,
  '/cli': 0.8,
  '/agentic': 0.8,
  '/graduation': 0.8,
  '/example': 0.8,
  '/comparison': 0.7,
  '/adoption': 0.7,
  '/roadmap': 0.5,
};

export function docsSitemapEntries(): DocsSitemapEntry[] {
  return DOCS_PAGES.map((p) => ({
    url: p.slug === '/' ? `${SITE_URL}/` : `${SITE_URL}${p.slug}/`,
    changeFrequency: 'weekly' as const,
    priority: PRIORITY_BY_SLUG[p.slug] ?? 0.5,
  }));
}
