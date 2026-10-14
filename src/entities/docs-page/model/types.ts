/* Entity docs-page — types for the static documentation page registry. */

export type DocsPageId =
  | 'home'
  | 'architecture'
  | 'graduation'
  | 'example'
  | 'comparison'
  | 'adoption'
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

export type NavSection = {
  group: NavGroup;
  pages: DocsPage[];
};