/* Public API of the docs-page entity. */
export {
  NAV_GROUPS,
  NAV_SECTIONS,
  NAV_EXT_SECTIONS,
  DOCS_PAGES,
  isDocsPageId,
  getDocsPage,
  getPageNumber,
  getAdjacentPages,
  getCrumb,
} from './model/registry';
export type {
  DocsPageId,
  DocsPage,
  NavGroup,
  NavSection,
  NavExtSection,
  NavExtLink,
} from './model/types';