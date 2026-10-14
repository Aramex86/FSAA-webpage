/* Entity docs-page — static registry of all documentation pages.
   Single source of truth for slugs, ordering and navigation groups. */

import type { DocsPage, DocsPageId, NavGroup, NavSection } from './types';

export const NAV_GROUPS: NavGroup[] = ['Overview', 'Core rules', 'In practice', 'Context'];

export const DOCS_PAGES: DocsPage[] = [
  {
    id: 'home',
    slug: '/',
    group: 'Overview',
    title: 'FSAA — Feature-Sliced Atomic Architecture',
    nav: 'Home',
    keywords: ['fsaa', 'start', 'intro', 'overview', 'feature sliced atomic'],
  },
  {
    id: 'architecture',
    slug: '/architecture',
    group: 'Core rules',
    title: 'Architecture — layers and boundaries',
    nav: 'Architecture',
    keywords: ['layers', 'import rules', 'boundaries', 'atomic'],
  },
  {
    id: 'graduation',
    slug: '/graduation',
    group: 'Core rules',
    title: 'The graduation pattern',
    nav: 'Graduation pattern',
    keywords: ['graduation', 'promotion', 'shared ui', 'boundary'],
  },
  {
    id: 'example',
    slug: '/example',
    group: 'In practice',
    title: 'Worked example — accounting table',
    nav: 'Worked example',
    keywords: ['example', 'table', 'accounting', 'datatable', 'trace'],
  },
  {
    id: 'comparison',
    slug: '/comparison',
    group: 'In practice',
    title: 'FSAA vs other approaches',
    nav: 'Comparison',
    keywords: ['comparison', 'fsd', 'atomic design', 'bulletproof', 'matrix'],
  },
  {
    id: 'adoption',
    slug: '/adoption',
    group: 'In practice',
    title: 'Adoption guide',
    nav: 'Adoption',
    keywords: ['adoption', 'migration', 'checklist', 'review', 'enforcement'],
  },
  {
    id: 'roadmap',
    slug: '/roadmap',
    group: 'Context',
    title: 'Roadmap and status',
    nav: 'Roadmap',
    keywords: ['roadmap', 'phases', 'gaps', 'contribute', 'status'],
  },
];

export function isDocsPageId(value: string): value is DocsPageId {
  return DOCS_PAGES.some((p) => p.id === value);
}

function groupPages(group: NavGroup): DocsPage[] {
  return DOCS_PAGES.filter((p) => p.group === group);
}

export const NAV_SECTIONS: NavSection[] = NAV_GROUPS.map((group) => ({
  group,
  pages: groupPages(group),
})).filter((section) => section.pages.length > 0);

export function getDocsPage(id: DocsPageId): DocsPage {
  const page = DOCS_PAGES.find((p) => p.id === id);
  if (!page) throw new Error(`Unknown docs page: "${String(id)}"`);
  return page;
}

export function getPageNumber(id: DocsPageId): string {
  const index = DOCS_PAGES.findIndex((p) => p.id === id);
  if (index === -1) throw new Error(`Unknown docs page: "${String(id)}"`);
  return String(index + 1).padStart(2, '0');
}

export function getAdjacentPages(id: DocsPageId): { prev: DocsPage | null; next: DocsPage | null } {
  const index = DOCS_PAGES.findIndex((p) => p.id === id);
  if (index === -1) throw new Error(`Unknown docs page: "${String(id)}"`);
  return {
    prev: index > 0 ? DOCS_PAGES[index - 1] : null,
    next: index < DOCS_PAGES.length - 1 ? DOCS_PAGES[index + 1] : null,
  };
}

export function getCrumb(id: DocsPageId): string {
  const page = getDocsPage(id);
  return `${page.group} · FSAA docs`;
}