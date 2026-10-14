'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import { cn } from '@/shared/lib/cn';

/* Atom — generic action control. Owns variants, no domain knowledge. */

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: 'primary' | 'ghost' | 'todo';
  title?: string;
  onClick?: () => void;
  className?: string;
};

export function Button({ children, href, variant = 'primary', title, onClick, className }: ButtonProps) {
  const cls = cn(
    'btn',
    variant === 'ghost' && 'ghost',
    variant === 'todo' && 'todo',
    className,
  );

  if (href) {
    return (
      <Link href={href} className={cls} title={title} onClick={onClick}>
        {children}
      </Link>
    );
  }

  if (variant === 'todo') {
    return (
      <span className={cls} title={title} role="button" aria-disabled>
        {children}
        <span className="todo-chip">TODO</span>
      </span>
    );
  }

  return (
    <button type="button" className={cls} title={title} onClick={onClick}>
      {children}
    </button>
  );
}