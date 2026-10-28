/* docs-cli — real fragments from the published create-fsaa package (0.1.3).
   The npm registry is the source of truth for these snippets; sync on releases. */

export const INIT_GREEN = `> FSAA init — Feature-Sliced Atomic Architecture

  template: plain React (Vite + react-router)
  manager:  pnpm (contract)
  target:   ./final-app

> downloading template (codeload tarball)…
> renaming project…
> installing dependencies (this may take a minute)…

> running the contract drift-check as proof…

  FSAA drift-check  v4.4
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
  ✓ AGENTS.md OK: 11 rules verified · contract intact · 0.0s

====================================================
  ✔ final-app is ready (plain React (Vite + react-router))
  cd final-app
  pnpm run dev
  agent contract: AGENTS.md · skills: agents/
  generate slices: pnpm exec fsaa g <slice-name>
====================================================`;

export const G_OUT = `fsaa g checkout-report

  ✔ src/entities/checkout-report/  (index.ts, types.ts, api.ts, slice.ts, __tests__/)
  ✔ src/features/checkout-report/  (index.ts, ui/, config/, __tests__/)
  ✔ thin route registered (src/pages/CheckoutReportPage.tsx + router.tsx)

Verify (agents/add-module.md):
  pnpm lint · pnpm typecheck · pnpm test
  node scripts/check-agents-md.mjs`;

export const NO_TTY = `fsaa init < /dev/null        # in CI / piped stdin

  (no TTY — defaults applied: name=my-app, template=next;
   pin them with --name/--template)
  ...scaffold runs to the same green drift-check`;

export type CommandRow = { cmd: string; what: string };

export const COMMANDS: CommandRow[] = [
  {
    cmd: "npm create fsaa@latest",
    what: "The scaffold: interactive prompts (name, template next|vite). The package on npm is named create-fsaa, so the create-* convention works.",
  },
  {
    cmd: "npx create-fsaa my-app",
    what: "Same scaffold, positional name (create-app convention).",
  },
  {
    cmd: "fsaa init --name my-app --template vite",
    what: "Non-interactive: full flags. Without a TTY the defaults (my-app / next) apply automatically.",
  },
  {
    cmd: "fsaa g <slice-name>",
    what: "Generate the canonical pair (entity + feature + thin route) inside an existing FSAA app. Slices are kebab-case.",
  },
  {
    cmd: "fsaa help",
    what: "The help screen above.",
  },
];