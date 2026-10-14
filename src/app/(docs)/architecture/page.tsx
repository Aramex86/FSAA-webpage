import { Callout, PageHeader } from '@/shared/ui/molecules';
import { CodeViewer } from '@/features/code-viewer';
import { crumbFor } from '@/features/docs-registry';
import { LayerStackExplorer } from '@/features/layer-stack-explorer';
import { DocsPager } from '@/features/docs-pager';
import { importRules, LayerTable } from '@/features/layer-stack';

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

      <DocsPager current="architecture" />
    </>
  );
}