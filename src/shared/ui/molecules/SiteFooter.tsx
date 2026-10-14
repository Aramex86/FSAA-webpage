import Link from 'next/link';
import { SITE } from '@/shared/config/site';

/* Molecule — site footer strip inside the docs shell. */

export function SiteFooter() {
  return (
    <footer className="sitefoot">
      <b>
        {SITE.name} — {SITE.fullName}
      </b>
      <span>English · Next.js static export · no trackers</span>
      {SITE.repoUrl ? (
        <a href={SITE.repoUrl} target="_blank" rel="noreferrer">
          {SITE.repoLabel}
        </a>
      ) : (
        <span>GitHub link: TODO (Phase 0)</span>
      )}
    </footer>
  );
}