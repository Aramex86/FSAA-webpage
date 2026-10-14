import type { ReactNode } from 'react';

/* Molecule — small framed card with optional number badge. */

type CardProps = {
  title: string;
  children: ReactNode;
  num?: string;
};

export function Card({ title, children, num }: CardProps) {
  return (
    <div className="card">
      {num ? <span className="num">{num}</span> : null}
      <h4>{title}</h4>
      <p>{children}</p>
    </div>
  );
}