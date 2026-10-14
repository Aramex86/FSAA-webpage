import type { ReactNode } from 'react';
import { SiteFooter } from '@/shared/ui/molecules';
import { DocsSidebar } from '@/features/docs-sidebar';
import { DocsToc } from '@/features/docs-toc';
import { SiteHeader } from '@/features/site-header';

/* Docs shell — topbar, sidebar, main article, right TOC. */

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader />
      <div className="shell">
        <DocsSidebar />
        <main className="main">
          <article>{children}</article>
        </main>
        <DocsToc />
        <SiteFooter />
      </div>
    </>
  );
}