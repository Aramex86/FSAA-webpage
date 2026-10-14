import type { ReactNode } from 'react';
import { cn } from '@/shared/lib/cn';

/* Molecule — emphasised note block with optional label. */

type CalloutProps = {
  children: ReactNode;
  label?: string;
  tone?: 'default' | 'quote' | 'rule' | 'stop';
};

export function Callout({ children, label, tone = 'default' }: CalloutProps) {
  const toneClass = {
    default: '',
    quote: 'quote',
    rule: 'rule',
    stop: 'stop',
  } as const;

  return (
    <div className={cn('callout', tone !== 'default' && toneClass[tone])}>
      {label ? <span className="k">{label}</span> : null}
      <p>{children}</p>
    </div>
  );
}