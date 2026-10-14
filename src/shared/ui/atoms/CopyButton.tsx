'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/shared/lib/cn';

/* Atom — copies any text to the clipboard; textarea + execCommand fallback. */

const RESET_MS = 1400;

type CopyButtonProps = {
  text: string;
  label?: string;
  className?: string;
};

export function CopyButton({ text, label = 'Copy', className }: CopyButtonProps) {
  const [done, setDone] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const copy = async (): Promise<void> => {
    let ok = false;
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(text);
        ok = true;
      } catch {
        ok = false;
      }
    }
    if (!ok) {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      ok = document.execCommand('copy');
      document.body.removeChild(ta);
    }
    if (ok) {
      setDone(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setDone(false), RESET_MS);
    }
  };

  return (
    <button
      type="button"
      className={cn('copy', done && 'done', className)}
      onClick={() => void copy()}
      aria-label={label}
    >
      {done ? 'Copied' : label}
    </button>
  );
}