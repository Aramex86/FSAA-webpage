import { Callout, DataTable, PageHeader, ProofBadge } from '@/shared/ui/molecules';
import type { Column } from '@/shared/ui/molecules';
import { CodeViewer } from '@/features/code-viewer';
import { DocsPager } from '@/features/docs-pager';
import { crumbFor } from '@/features/docs-registry';
import { docPageMetadata } from '@/shared/config/site';
import {
  CONTRACT_SNIPPET,
  RED_BINDING,
  RED_DRIFT,
  RED_RELATIVE,
  GREEN_RUN,
  CHECKLIST_SNIPPET,
  PROCEDURE_ROWS,
  type ProcedureRow,
} from '@/features/docs-agentic';

export const metadata = docPageMetadata({
  title: 'AI agents in FSAA: a contract, checks and procedures',
  description:
    'How AI agents work on FSAA codebases: AGENTS.md with check markers, the drift-check that keeps docs and code synchronized, step-by-step agent procedures, and the where-ui-goes navigation skill for external agents.',
  slug: '/agentic',
});

type Row = ProcedureRow;

const columns: Column<Row>[] = [
  { header: 'File', render: (row) => row.file },
  { header: 'What it does', render: (row) => row.what },
  { header: 'When', render: (row) => row.when },
];

export default function AgenticPage() {
  return (
    <>
      <PageHeader
        crumb={crumbFor('agentic')}
        title="AI agents — the contract, the checks, the procedures"
        lede="An AI agent working on an FSAA codebase is not a trust question, it is an engineering question. The starter templates ship a machine-readable contract, a check that fails when docs and code drift apart, and step-by-step procedures an agent can follow without a human in the loop."
      />

      <h2 id="why">Why agents need a contract</h2>
      <p>
        An agent has no memory of your discussions, no sense of what is load-bearing and what is
        decoration. Left with a plain README, it will put UI wherever it fits, call{' '}
        <code>fetch</code> inside component trees and reformat a lockfile, all in one PR. FSAA
        answers with a contract the agent can read <em>and</em> the CI can enforce — the same rules,
        one source of truth.
      </p>

      <h2 id="contract">The contract: AGENTS.md</h2>
      <p>
        Every rule in <code>AGENTS.md</code> carries a check marker. A rule without a working check
        fails CI — a rule nobody verifies is a suggestion, and suggestions rot within weeks. The
        file covers the package-manager decision, layer and UI placement, import boundaries, data
        access, file paths and the PR flow (~50 lines, machine and human readable in one sitting).
      </p>
      <CodeViewer file="AGENTS.md (excerpt — one rule, one check)" lang="text" code={CONTRACT_SNIPPET} />

      <h2 id="drift-check">Drift-check — the enforcement</h2>
      <p>
        The green case: every contract rule verified on every PR. The check runs in CI (
        <code>.github/workflows/</code>) and locally in under a second:
      </p>
      <CodeViewer file="node scripts/check-agents-md.mjs — green run" lang="text" code={GREEN_RUN} copyText="node scripts/check-agents-md.mjs" />

      <p>
        Three ways it goes red — and each message tells you exactly what broke. The third one
        resolves relative imports like a bundler would (since v4.4), because a plain
        <code>../..</code> regex cannot tell an illegal cross-slice hop from a legal dive down to entities:
      </p>
      <CodeViewer file="a rule with no check mapped" lang="text" code={RED_BINDING} copyText="node scripts/check-agents-md.mjs" />
      <CodeViewer file="code drifted from the rule" lang="text" code={RED_DRIFT} copyText="node scripts/check-agents-md.mjs" />
      <CodeViewer file="relative cross-slice import (resolved like a bundler)" lang="text" code={RED_RELATIVE} copyText="node scripts/check-agents-md.mjs" />

      <Callout tone="rule" label="The rule behind the check">
        A rule with no check is red, a check with no rule is red. This came out of a real bug:
        the &ldquo;which package manager is in charge&rdquo; fact lived in three places at once,
        and the CI went red ten seconds after a push that contained zero application lines.
        v4.6 closes the parity story completely: the drift-check DELEGATES its code checks to
        eslint-plugin-fsaa — the same npm rules the template wires into eslint.config.mjs — so
        your local lint and CI check one implementation. exactly the same violations, barrels (<code>index.ts</code>) included.
      </Callout>

      <h2 id="procedures">Procedures — what the agent runs, step by step</h2>
      <p>
        The templates ship <code>agents/</code> — numbered, one-screen procedures with a verify
        step that must end green. Each mirrors a real workflow from building FSAA itself.
      </p>
      <DataTable
        columns={columns}
        data={PROCEDURE_ROWS}
        rowKey={(row) => row.id}
        caption="agents/ — procedures and navigation shipped in both starter templates"
      />

      <h2 id="external">Navigation for external agents</h2>
      <p>
        <code>AGENTS.md</code> is written for the agent working <em>on the templates</em>. For an
        agent dropped into an app <em>built from</em> a template, the navigation file{' '}
        <code>agents/where-ui-goes.md</code> gives the layer map, the three boundaries and a
        checklist to run before writing any code:
      </p>
      <CodeViewer file="agents/where-ui-goes.md (excerpt)" lang="text" code={CHECKLIST_SNIPPET} />
      <Callout tone="quote" label="References, not copies">
        The navigation file links to the procedures; it does not duplicate them. A duplicated
        decision is a second copy that will silently rot — the docs website itself rotted once
        because nobody enforced its structure.
      </Callout>

      <h2 id="start">Getting started</h2>
      <p>
        Four steps, in order — none of them optional, all of them verified by the checks above:
      </p>
      <ol>
        <li>
          Scaffold your app with the CLI — <code>npm create fsaa@latest</code> (the <code>create-fsaa</code>
          npm package; while the registry release is pending:{" "}
          <code>npx github:Aramex86/fsaa init</code>). It downloads a starter, installs deps,
          and ends with a green drift-check as proof.
        </li>
        <li>Generate slices inside the project: <code>fsaa g &lt;slice-name&gt;</code> (or <code>npx create-fsaa g …</code>).</li>
        <li>Cold start with <code>agents/run-stack.md</code> — install, dev up, green checks.</li>
        <li>Point your agent (Claude Code, Cursor, …) at <code>AGENTS.md</code> and <code>agents/</code>; keep main protected PR-only — drift-check + lint + tests run on every PR.</li>
      </ol>

      <ProofBadge>
        Self-demonstrating: this docs site itself is built with FSAA — pages as features, the
        page registry as an entity, navigation filtered through a feature, imports enforced by
        the same ESLint boundaries.
      </ProofBadge>

      <DocsPager current="agentic" />
    </>
  );
}