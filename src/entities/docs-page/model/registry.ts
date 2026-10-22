import type { DocsPage, DocsPageId, NavGroup, NavSection, NavExtSection } from './types';

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
    id: 'qa',
    slug: '/qa',
    group: 'Context',
    title: 'Q&A — hard questions, straight answers',
    nav: 'Q&A',
    keywords: ['qa', 'questions', 'answers', 'critique', 'skeptics', 'review', 'maintainer', 'risk'],
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

/* External nav sections — starter templates + methodology repo.
   Rendered by the sidebar after the doc-page sections;
   filterable together with the doc pages (see docs-sidebar filterNav). */
export const NAV_EXT_SECTIONS: NavExtSection[] = [
  {
    group: 'Templates',
    links: [
      {
        id: 'tpl-next',
        href: 'https://github.com/Aramex86/fsaa-next',
        nav: 'Next.js App Router ›',
        note: 'Next.js 15 + React 19 template',
        keywords: ['template', 'next', 'nextjs', 'app router', 'boilerplate', 'starter'],
      },
      {
        id: 'tpl-vite',
        href: 'https://github.com/Aramex86/fsaa-vite',
        nav: 'Plain React (Vite) ›',
        note: 'Vite 7 + react-router template',
        keywords: ['template', 'vite', 'react', 'spa', 'boilerplate', 'starter'],
      },
      {
        id: 'ext-methodology',
        href: 'https://github.com/Aramex86/fsaa',
        nav: 'Methodology repo ›',
        note: 'README, contributing, placement issues',
        keywords: ['repo', 'github', 'methodology', 'source'],
      },
    ],
  },
];