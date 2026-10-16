import { Button, Chip } from '@/shared/ui/atoms';
import { Callout, Card, PageHeader, ProofBadge } from '@/shared/ui/molecules';
import { LayerStackExplorer } from '@/features/layer-stack-explorer';
import { DocsPager } from '@/features/docs-pager';
import { RepoCta } from '@/features/repo-cta';
import { SITE, docPageMetadata } from '@/shared/config/site';
import { crumbFor } from '@/features/docs-registry';

export const metadata = docPageMetadata({
  absoluteTitle: 'FSAA — Where does UI go? FSD + Atomic Design unified',
  title: 'FSAA — Feature-Sliced Atomic Architecture',
  description:
    'FSAA unifies Feature-Sliced Design and Atomic Design and answers the question both leave open: where does UI go? Decision rules, layers, graduation pattern.',
  slug: '/',
});

export default function HomePage() {
  return (
    <>
      <PageHeader crumb={crumbFor('home')} title={`${SITE.name} — ${SITE.fullName}`} />

      <div className="chips">
        <Chip tone="on">Open source</Chip>
        <Chip>Methodology + rules</Chip>
        <Chip>React-first</Chip>
        <Chip>Frontend architecture</Chip>
      </div>

      <p className="pitch">
        FSAA is FSD + Atomic Design with an answer to the question both leave open:{' '}
        <strong>where does UI go?</strong>
      </p>

      <div className="cta">
        <Button href="/architecture">Read the architecture →</Button>
        <Button variant="ghost" href="/graduation">
          The graduation pattern
        </Button>
        <RepoCta />
      </div>

      <h2 id="layer-stack">The layer stack</h2>
      <p>
        Five layers. Imports flow down, never up, never skip. Click or hover a layer to see its
        allowed and forbidden imports.
      </p>
      <LayerStackExplorer />

      <h2 id="three-things">Three things FSAA adds</h2>
      <div className="cards">
        <Card num="01" title="The graduation pattern">
          Feature UI lives flat in features/&lt;name&gt;/ui/. It is promoted to shared/ui only
          after a second feature actually reuses it.
        </Card>
        <Card num="02" title="The boundary test">
          One question decides shared vs feature: could the component be described without
          business vocabulary? Generic DataTable passes; projectColumns does not.
        </Card>
        <Card num="03" title="No widgets layer">
          Large compositions are features, not a UI level. Container/presentational split
          happens at the export level, not in the filesystem.
        </Card>
      </div>

      <h2 id="positioning">Positioning</h2>
      <Callout tone="quote" label="Position">
        “{SITE.positioning}”
      </Callout>
      <ProofBadge>{SITE.proof}</ProofBadge>

      <h2 id="where-to-start">Where to start</h2>
      <div className="cards">
        <Card title="Read the architecture">
          Layers, import rules, and where Atomic Design levels actually live.
        </Card>
        <Card title="Open the worked example">
          Projects/Orders case study: one generic table, two business features.
        </Card>
        <Card title="Compare the methods">
          FSAA vs FSD vs Atomic Design vs Bulletproof React — including “isn’t this just a
          hybrid?”
        </Card>
      </div>

      <DocsPager current="home" />
    </>
  );
}