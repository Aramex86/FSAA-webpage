/* Feature docs-sidebar — pure navigation filter logic. */

import type { DocsPage, NavSection, NavExtSection } from '@/entities/docs-page';

const matchesPage = (page: DocsPage, q: string): boolean =>
  page.title.toLowerCase().includes(q) ||
  page.nav.toLowerCase().includes(q) ||
  page.group.toLowerCase().includes(q) ||
  page.keywords.some((k) => k.toLowerCase().includes(q));

const matchesLink = (
  link: { nav: string; note: string; keywords: string[] },
  q: string,
): boolean =>
  link.nav.toLowerCase().includes(q) ||
  link.note.toLowerCase().includes(q) ||
  link.keywords.some((k) => k.toLowerCase().includes(q));

export function filterNav(
  sections: NavSection[],
  extSections: NavExtSection[],
  query: string,
): { sections: NavSection[]; extSections: NavExtSection[] } {
  const q = query.trim().toLowerCase();
  if (!q) return { sections, extSections };

  const filteredSections = sections
    .map((section) => ({ ...section, pages: section.pages.filter((p) => matchesPage(p, q)) }))
    .filter((section) => section.pages.length > 0);

  const filteredExt = extSections
    .map((section) => ({ ...section, links: section.links.filter((l) => matchesLink(l, q)) }))
    .filter((section) => section.links.length > 0);

  return { sections: filteredSections, extSections: filteredExt };
}