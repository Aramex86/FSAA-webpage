import Link from 'next/link';
import { getAdjacentPages } from '@/entities/docs-page';
import type { DocsPageId } from '@/entities/docs-page';

/* Feature docs-pager — prev/next strip at the bottom of every docs page. */

export function DocsPager({ current }: { current: DocsPageId }) {
  const { prev, next } = getAdjacentPages(current);
  if (!prev && !next) return null;

  return (
    <nav className="pager" aria-label="Page navigation">
      {prev ? (
        <Link href={prev.slug}>
          <span className="dir">← Previous</span>
          <span className="ttl">{prev.nav}</span>
        </Link>
      ) : (
        <span />
      )}
      <span />
      {next ? (
        <Link href={next.slug} className="next">
          <span className="dir">Next →</span>
          <span className="ttl">{next.nav}</span>
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}