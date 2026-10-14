'use client';

/* Feature docs-toc — scroll-spy hook, rAF-throttled. */

import { useEffect, useState } from 'react';

export type TocEntry = {
  id: string;
  label: string;
  level: 2 | 3;
};

const OFFSET = 84;

export function useScrollSpy(entries: TocEntry[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(
    () => entries[0]?.id ?? null,
  );

  useEffect(() => {
    let raf = 0;

    const update = (): void => {
      raf = 0;
      let current: string | null = null;
      for (const entry of entries) {
        const el = document.getElementById(entry.id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= OFFSET) current = entry.id;
      }
      setActiveId(current ?? entries[0]?.id ?? null);
    };

    const onScroll = (): void => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [entries]);

  return activeId;
}