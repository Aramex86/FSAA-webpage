import type { ReactNode } from 'react';
import { cn } from '@/shared/lib/cn';

/* Atom — small static label. */

type ChipProps = {
  children: ReactNode;
  tone?: 'default' | 'on';
  className?: string;
};

export function Chip({ children, tone = 'default', className }: ChipProps) {
  return <span className={cn('chip', tone === 'on' && 'on', className)}>{children}</span>;
}