/* Feature docs-sidebar — pure navigation filter logic. */

import type { DocsPage, NavSection } from '@/entities/docs-page';

export function filterNav(sections: NavSection[], query: string): NavSection[] {
  const q = query.trim().toLowerCase();
  if (!q) return sections;

  const matches = (page: DocsPage): boolean =>
    page.title.toLowerCase().includes(q) ||
    page.nav.toLowerCase().includes(q) ||
    page.group.toLowerCase().includes(q) ||
    page.keywords.some((k) => k.toLowerCase().includes(q));

  return sections
    .map((section) => ({ ...section, pages: section.pages.filter(matches) }))
    .filter((section) => section.pages.length > 0);
}