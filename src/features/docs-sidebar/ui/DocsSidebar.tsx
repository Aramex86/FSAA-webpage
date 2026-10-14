'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/shared/lib/cn';
import { NAV_SECTIONS, getPageNumber } from '@/entities/docs-page';
import { filterNav } from '../model/filterNav';
import type { NavSection } from '@/entities/docs-page';

/* Presentational — the ☰ button, shown ≤900px. */

export function SidebarToggle({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" className="burger" onClick={onClick} aria-label="Open navigation">
      ☰
    </button>
  );
}

const SEARCH_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <circle cx="11" cy="11" r="7" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

/* Presentational — the navigation aside; controlled query + open state. */

type SidebarNavProps = {
  sections: NavSection[];
  query: string;
  onQueryChange: (q: string) => void;
  open: boolean;
};

export function SidebarNav({ sections, query, onQueryChange, open }: SidebarNavProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent): void => {
      const target = e.target as HTMLElement | null;
      const typing =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target?.isContentEditable;
      if (e.key === '/' && !typing) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const empty = sections.length === 0;

  return (
    <aside className={cn('sidebar', open && 'open')} aria-label="Documentation navigation">
      <div className="search">
        {SEARCH_ICON}
        <input
          ref={inputRef}
          id="nav-filter"
          type="search"
          placeholder="Filter pages…"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          aria-label="Filter documentation pages"
        />
        <kbd>/</kbd>
      </div>

      {empty ? (
        <p className="nav-empty">No page matches “{query}”.</p>
      ) : (
        sections.map((section) => (
          <div className="navgroup" key={section.group}>
            <h5>{section.group}</h5>
            {section.pages.map((page) => (
              <Link key={page.id} href={page.slug} className="navlink">
                <span className="n">{getPageNumber(page.id)}</span>
                {page.nav}
              </Link>
            ))}
          </div>
        ))
      )}

      <div className="side-note">
        Honest framing: FSAA is a young methodology. The rules are small, explicit and enforced
        by lint — the docs state what is proven and what is still ahead.
      </div>
    </aside>
  );
}

/* Container — owns drawer + filter state; closes the drawer on navigation. */

export function DocsSidebar() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <SidebarToggle onClick={() => setOpen(true)} />
      <div
        className={cn('overlay', open && 'show')}
        onClick={() => setOpen(false)}
        aria-hidden={!open}
      />
      <SidebarNav sections={filterNav(NAV_SECTIONS, query)} query={query} onQueryChange={setQuery} open={open} />
    </>
  );
}