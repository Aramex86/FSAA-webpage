import { Callout, PageHeader } from '@/shared/ui/molecules';
import { CodeViewer } from '@/features/code-viewer';
import { crumbFor } from '@/features/docs-registry';
import { LayerStackExplorer } from '@/features/layer-stack-explorer';
import { DocsPager } from '@/features/docs-pager';
import { importRules, LayerTable } from '@/features/layer-stack';
import { docPageMetadata } from '@/shared/config/site';

const ENTITY_API = `// entities/account/index.ts — public API of an entity
export { type Account, createEmptyAccount } from './model/types';
export { useAccounts, accountApi } from './model/accounts';

// Everything else (internal files) is import-forbidden outside the entity.`;

const LINT_INTENT = `// lint intent — boundaries as compiler errors, not review comments
import/no-restricted-paths: [
  ['error', { zones: [
    { target: './src/shared',   from: './src/entities' },
    { target: './src/shared',   from: './src/features' },
    { target: './src/entities', from: './src/features' },
    { target: './src/features', from: './src/app' }, // no skipping layers
  ]}],
]`;

export const metadata = docPageMetadata({
  title: 'Architecture: five layers, import rules',
  description:
    'FSAA architecture: five layers (app, pages, features, entities, shared), strict import rules, no organisms layer. How boundaries are enforced in review and tooling.',
  slug: '/architecture',
});

export default function ArchitecturePage() {
  return (
    <>
      <PageHeader
        crumb={crumbFor('architecture')}
        title="Architecture — layers and boundaries"
        lede="Five layers on one strict direction of imports. Everything else in FSAA follows from this stack."
      />

      <h2 id="layer-stack">Layer stack</h2>
      <p>
        The stack is small on purpose: five layers instead of FSD&apos;s seven, because the widgets
        layer is gone and its content lives inside features.
      </p>
      <LayerStackExplorer />
      <LayerTable />

      <Callout tone="rule" label="Rule">
        The widgets layer is removed by design. If a block is big, it is a feature; if it is
        generic, it belongs to shared/ui. There is no third home.
      </Callout>

      <h2 id="import-rules">Import rules</h2>
      <p>Four rules, in priority order:</p>
      <ol>
        {importRules.map((rule) => (
          <li key={rule}>{rule}</li>
        ))}
      </ol>
      <CodeViewer file="lint intent" lang="ts" code={LINT_INTENT} />
      <CodeViewer file="entities/account/index.ts" lang="ts" code={ENTITY_API} />

      <h2 id="where-atomic-lives">Where Atomic Design lives</h2>
      <Callout label="Scope">
        Atomic vocabulary is used only inside shared/ui. Features may have &quot;big&quot; and &quot;small&quot;
        components — nobody grades them by size.
      </Callout>

      <div className="atomic">
        <div className="atomic-title">Atomic tiers inside shared/ui</div>
        <div className="lvl">
          <span className="lv">atoms</span>
          <span className="what">Button, Chip, Pill, CopyButton — generic action control and labels</span>
        </div>
        <div className="lvl">
          <span className="lv">molecules</span>
          <span className="what">Callout, Card, DataTable, PageHeader — composed from atoms</span>
        </div>
        <div className="lvl removed">
          <span className="lv">organisms</span>
          <span className="what">tier removed — either a shared molecule or a feature ui component</span>
        </div>
      </div>

      <Callout tone="rule" label="Rule">
        Feature ui/ stays flat. Do not create atoms/molecules folders inside a feature — promote
        to shared only via the graduation pattern.
      </Callout>

      <Callout label="Split">
        Molecules shared between features get an export-level split: one file per export, a
        barrel at the folder root, no cross-imports between molecule folders.
      </Callout>

      <h2 id="nextjs">FSAA in Next.js App Router</h2>
      <p>
        Next.js collides with FSD&apos;s layer names: its <code>app/</code> folder is the router, and{' '}
        <code>pages/</code> is the legacy Pages Router — so FSD teams rename layers to{' '}
        <code>_app</code>/<code>_pages</code>. FSAA removes the collision instead of renaming:{' '}
        <strong>the App Router itself is the pages layer</strong>.
      </p>
      <CodeViewer
        file="structure (Next.js template)"
        lang="tree"
        code={`src/
  features/    # user scenarios incl. large page-level blocks
  entities/    # business models + data access
  shared/      # tokens, atoms/molecules, utilities
app/
  layout.tsx            # app layer: providers, global config
  projects/page.tsx     # thin route = the page composition`}
      />
      <p>
        Route files stay thin (import → render → <code>Suspense</code>) — that thinness IS the
        page composition. Everything on the routes is a composition-layer concern:
      </p>
      <ol>
        <li><strong><code>layout.tsx</code></strong> — root layout is the FSAA app layer (providers); section layouts are page-level compositions</li>
        <li><strong><code>loading.tsx</code> / <code>error.tsx</code></strong> — Suspense/error wrappers around compositions; pages-layer, never features</li>
        <li><strong>Route groups <code>(marketing)</code></strong> — allowed: pages grouped by scenario, as long as import directions stay intact</li>
        <li><strong>Parallel routes <code>@slot</code></strong> — a slot references a feature; it never implements one itself</li>
      </ol>
      <Callout tone="rule" label="Rule">
        Business logic never enters app/ route files. If a route file grows beyond import →
        render → wrapper, the content belongs in a feature.
      </Callout>

      <DocsPager current="architecture" />
    </>
  );
}