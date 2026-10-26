/* docs-agentic — real fragments from the FSAA starter templates (fsaa-next / fsaa-vite).
   Every snippet here mirrors a file that ships in the templates; keep them in sync
   with the templates (the templates are the source of truth). */

export const CONTRACT_SNIPPET = `# AGENTS.md — FSAA machine contract (excerpt)

## Data

<!--check: no-ui-fetch -->

src/features/**/ui/**, src/shared/ui/** and app/** pages must NOT call
fetch/axios directly. Data access belongs to feature logic (index.ts
/ entity API).`;

export const RED_BINDING = `FSAA drift-check  v4.3
  AGENTS.md: 12 rules · fsaa:contract
  ...
  ⚠ rule fake-rule-999 has a marker but no check is mapped

  ✗ drift detected: 0 rule(s), 1 binding issue(s) · 0.0s
exit code: 1`;

export const RED_DRIFT = `FSAA drift-check  v4.3
  AGENTS.md: 11 rules · fsaa:contract
  ...
  ✓ boundary-imports 2ms
  ✗ no-ui-fetch 1ms — fetch/axios found in: src/features/orders-overview/ui/OrdersOverview.tsx
  ✓ file-paths 0ms
  ✓ pr-flow 0ms
  ...
  ✗ drift detected: 1 rule(s), 0 binding issue(s) · 0.0s
exit code: 1`;

export const GREEN_RUN = `FSAA drift-check  v4.3
  AGENTS.md: 11 rules · fsaa:contract
  ──────────────────────────────────────────────
  ✓ cmd-pnpm-install 0ms
  ✓ cmd-pnpm-dev 0ms
  ✓ cmd-pnpm-lint 0ms
  ✓ cmd-pnpm-typecheck 0ms
  ✓ cmd-pnpm-build 0ms
  ✓ single-lockfile 0ms
  ✓ ui-location 0ms
  ✓ boundary-imports 3ms
  ✓ no-ui-fetch 1ms
  ✓ file-paths 0ms
  ✓ pr-flow 0ms
  ──────────────────────────────────────────────
  ✓ AGENTS.md OK: 11 rules verified · contract intact · 0.0s`;

export const CHECKLIST_SNIPPET = `# agents/where-ui-goes.md — before you write (3 questions)

1. Which feature owns this screen?
2. Where does the data live (which entity / api)?
3. Where do the tests go? (__tests__/ in the same commit - never empty)

Any answer missing -> open agents/add-module.md first.`;

export type ProcedureRow = {
  id: string;
  file: string;
  what: string;
  when: string;
};

export const PROCEDURE_ROWS: ProcedureRow[] = [
  {
    id: 'add-module',
    file: 'agents/add-module.md',
    what: 'Creates a feature slice: index.ts + ui/ + config/ (+ non-empty __tests__/), registers the route thin, lands via PR.',
    when: 'Adding a screen / scenario.',
  },
  {
    id: 'add-pattern',
    file: 'agents/add-pattern.md',
    what: 'Writes a recurring technique into docs/patterns/<name>.md and registers it in the README registry.',
    when: 'The same gotcha appeared twice.',
  },
  {
    id: 'run-stack',
    file: 'agents/run-stack.md',
    what: 'Cold start: Node 20+ check, pnpm install, dev server up, agent-verified 200s on routes, human-check row.',
    when: 'Fresh clone, first run.',
  },
  {
    id: 'where-ui-goes',
    file: 'agents/where-ui-goes.md',
    what: 'Navigation skill for external agents: the layer map, the 3 boundaries, the 3-question checklist. References the procedures, never duplicates them.',
    when: 'An agent opens the codebase for the first time.',
  },
];

export const procColumns = {
  header: '#',
  render: (row: ProcedureRow) => row.file.split('/')[1] ?? row.file,
} as const;