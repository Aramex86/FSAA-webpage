import { getCrumb } from '@/entities/docs-page';
import type { DocsPageId } from '@/entities/docs-page';

export type { DocsPageId };

/* Feature docs-registry — pages-layer access to the docs-page entity registry.
   Pages compose crumbs through this feature (FSAA: no layer skipping in the pages layer). */
export function crumbFor(id: DocsPageId): string {
  return getCrumb(id);
}