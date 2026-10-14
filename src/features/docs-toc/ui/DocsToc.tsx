'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/shared/lib/cn';
import { useScrollSpy } from '../model/useScrollSpy';
import type { TocEntry } from '../model/useScrollSpy';

/* Feature docs-toc — sticky "On this page" outline for the current article. */

export function DocsToc() {
  const [entries, setEntries] = useState<TocEntry[]>([]);

  useEffect(() => {
    const article = document.querySelector('article');
    if (!article) return;

    const collect = (): TocEntry[] =>
      Array.from(article.querySelectorAll('h2[id], h3[id]')).map((h) => ({
        id: h.id,
        label: h.textContent ?? '',
        level: h.tagName === 'H2' ? 2 : 3,
      }));

    setEntries(collect());
  }, []);

  const activeId = useScrollSpy(entries);

  if (entries.length === 0) return null;

  return (
    <aside className="toc" aria-label="On this page">
      <h6>On this page</h6>
      {entries.map((entry) => (
        <a
          key={entry.id}
          href={`#${entry.id}`}
          className={cn(activeId === entry.id && 'on', entry.level === 3 && 'sub')}
        >
          {entry.label}
        </a>
      ))}
    </aside>
  );
}