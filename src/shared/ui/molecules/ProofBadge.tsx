import type { ReactNode } from 'react';

/* Molecule — "used in production" ribbon. */

type ProofBadgeProps = {
  children: ReactNode;
};

export function ProofBadge({ children }: ProofBadgeProps) {
  return (
    <div className="proof">
      <span className="ic">✔</span>
      <p>{children}</p>
    </div>
  );
}