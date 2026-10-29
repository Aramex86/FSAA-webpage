/* docs-cli — real fragments from the published create-fsaa package (0.2.0).
   The npm registry is the source of truth for these snippets; sync on releases.
   Re-captured live 29.10: v4.6 drift-check delegates code checks to
   eslint-plugin-fsaa@0.1.1 (wired into the templates' eslint config). */

export const INIT_GREEN = `> FSAA init — Feature-Sliced Atomic Architecture

  template: plain React (Vite + react-router)
  manager:  pnpm (contract)
  target:   ./probe-app

> downloading template (codeload tarball)…
> renaming project…
> installing dependencies (this may take a minute)…

> running the contract drift-check as proof…

  FSAA drift-check  v4.6
  AGENTS.md: 12 rules · code checks: eslint-plugin-fsaa
  ──────────────────────────────────────────────
  ✓ cmd-pnpm-install 0ms
  ✓ cmd-pnpm-dev 0ms
  ✓ cmd-pnpm-lint 0ms
  ✓ cmd-pnpm-typecheck 0ms
  ✓ cmd-pnpm-build 0ms
  ✓ script-policy 0ms
  ✓ single-lockfile 0ms
  ✓ ui-location 687ms
  ✓ boundary-imports 0ms
  ✓ no-ui-fetch 0ms
  ✓ file-paths 0ms
  ✓ pr-flow 0ms
  ──────────────────────────────────────────────
  ✓ AGENTS.md OK: 12 rules verified · contract intact · 0.7s

====================================================
  ✔ probe-app is ready (plain React (Vite + react-router))
  cd probe-app
  pnpm run dev
  agent contract: AGENTS.md · skills: agents/ · lint rules: eslint-plugin-fsaa
  generate slices: pnpm exec fsaa g <slice-name> (or: npx create-fsaa g <slice-name>)
====================================================`;

export const G_OUT = `fsaa g checkout-report

  ✔ src/entities/checkout-report/  (index.ts, types.ts, api.ts, slice.ts, __tests__/)
  ✔ src/features/checkout-report/  (index.ts, ui/, config/, __tests__/)
  ✔ thin route registered (src/pages/CheckoutReportPage.tsx + router.tsx)

Verify (agents/add-module.md):
  pnpm lint · pnpm typecheck · pnpm test
  node scripts/check-agents-md.mjs`;

/* captured live 28.10: a scaffolding inside a script (stdin not a terminal) */
export const NO_TTY = `$ npm create fsaa@latest -- init --name ci-app --template vite   (script: no keyboard)
> downloading template (codeload tarball)…
> renaming project…
> installing dependencies (this may take a minute)…

> running the contract drift-check as proof…
  FSAA drift-check  v4.6
  AGENTS.md: 12 rules · code checks: eslint-plugin-fsaa
  ──────────────────────────────────────────────
  ✓ cmd-pnpm-install 0ms
  ✓ cmd-pnpm-dev 0ms
  ✓ cmd-pnpm-lint 0ms
  ✓ cmd-pnpm-typecheck 0ms
  ✓ cmd-pnpm-build 0ms
  ✓ script-policy 0ms
  ✓ single-lockfile 0ms
  ✓ ui-location 746ms
  ✓ boundary-imports 0ms
  ✓ no-ui-fetch 0ms
  ✓ file-paths 0ms
  ✓ pr-flow 0ms
  ──────────────────────────────────────────────
  ✓ AGENTS.md OK: 12 rules verified · contract intact · 0.7s

====================================================
  ✔ ci-app is ready (plain React (Vite + react-router))
  cd ci-app
  pnpm run dev
  agent contract: AGENTS.md · skills: agents/ · lint rules: eslint-plugin-fsaa
====================================================`;

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
    cmd: "fsaa g entity|feature <name>",
    what: "Same canon as the pair, one side at a time: entity = index/types/api/slice/__tests__, feature = index/ui/config/__tests__. Name matches the entity the feature consumes.",
  },
  {
    cmd: "fsaa g atom|molecule <Name>",
    what: "Shared primitives: atoms/<Name>.tsx (stateless) and molecules/<Name>/ — with the graduation hint printed (shared earns its place on the SECOND duplication). PascalCase.",
  },
  {
    cmd: "fsaa g page <name> [route]",
    what: "Thin page composing an EXISTING feature (+ router registration on vite). Refuses to scaffold an orphan page — pages compose features.",
  },
  {
    cmd: "fsaa help",
    what: "The help screen above.",
  },
];