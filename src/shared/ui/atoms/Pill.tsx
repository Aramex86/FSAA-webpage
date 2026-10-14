import type { ReactNode } from 'react';
import { cn } from '@/shared/lib/cn';

/* Atom — topbar status pill. */

type PillProps = {
  children: ReactNode;
  tone?: 'default' | 'live' | 'todo';
  hideOnMobile?: boolean;
  className?: string;
};

export function Pill({ children, tone = 'default', hideOnMobile, className }: PillProps) {
  return (
    <span className={cn('pill', tone === 'live' && 'live', tone === 'todo' && 'todo', hideOnMobile && 'hide-sm', className)}>
      {children}
    </span>
  );
}