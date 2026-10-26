/* Entity docs-page — types for the static documentation page registry. */

export type DocsPageId =
  | 'home'
  | 'architecture'
  | 'agentic'
  | 'graduation'
  | 'example'
  | 'comparison'
  | 'adoption'
  | 'qa'
  | 'roadmap';

export type NavGroup = 'Overview' | 'Core rules' | 'In practice' | 'Context';

export type DocsPage = {
  id: DocsPageId;
  slug: string;
  group: NavGroup;
  title: string;
  nav: string;
  keywords: string[];
};

/** External nav links (templates, methodology repo) — real URLs, not doc pages.
    Lives in the registry so the sidebar renders them from one source of truth. */
export type NavExtLink = {
  id: string;
  href: string;
  nav: string;
  note: string;
  keywords: string[];
};

export type NavSection = {
  group: NavGroup;
  pages: DocsPage[];
};

/** A section that renders external links instead of doc pages. */
export type NavExtSection = {
  group: string;
  links: NavExtLink[];
};