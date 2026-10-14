import Link from 'next/link';
import { Pill } from '@/shared/ui/atoms';
import { SITE } from '@/shared/config/site';

/* Feature site-header — sticky topbar with brand + status pills. */

export function SiteHeader() {
  return (
    <header className="topbar">
      <Link href="/" className="brand">
        <svg className="mark" viewBox="0 0 26 26" aria-hidden>
          <rect x="3" y="3" width="20" height="5" rx="1.5" fill="#7ab8ff" />
          <rect x="3" y="10.5" width="20" height="5" rx="1.5" fill="#43e0bd" />
          <rect x="3" y="18" width="20" height="5" rx="1.5" fill="#e0c96a" />
        </svg>
        <span>
          <b>{SITE.name}</b>
          <small>{SITE.tagline}</small>
        </span>
      </Link>
      <div className="top-spacer" />
      <div className="top-meta">
        <Pill>{SITE.version}</Pill>
        <Pill tone="live" hideOnMobile>
          {SITE.phaseLabel}
        </Pill>
        {SITE.repoUrl ? (
          <a href={SITE.repoUrl} target="_blank" rel="noreferrer" className="pill live hide-sm">
            {SITE.repoLabel}
          </a>
        ) : (
          <Pill tone="todo" hideOnMobile>
            repo link: TODO
          </Pill>
        )}
      </div>
    </header>
  );
}