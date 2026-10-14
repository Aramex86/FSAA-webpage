/* Public API of the docs-page entity. */
export {
  NAV_GROUPS,
  DOCS_PAGES,
  NAV_SECTIONS,
  isDocsPageId,
  getDocsPage,
  getPageNumber,
  getAdjacentPages,
  getCrumb,
} from './model/registry';
export type {
  DocsPageId,
  NavGroup,
  DocsPage,
  NavSection,
} from './model/types';