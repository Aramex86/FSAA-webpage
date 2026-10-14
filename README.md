# FSAA — Feature-Sliced Atomic Architecture (docs site)

Documentation site for **FSAA**, a frontend architecture methodology that combines FSD-style
sliced layers with Atomic Design vocabulary — minus the widgets layer, minus organisms, plus
the graduation pattern. The site itself is structured by FSAA's own five layers.

English · Next.js 15 static export · no trackers. The site is built according to the FSAA
methodology it documents.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export to ./out
npm run start    # serve the production build
npm run lint     # ESLint incl. layer-boundary rules
npm run typecheck
```

## Build / deploy

`next.config.mjs` sets `output: 'export'` — `npm run build` produces a fully static `out/`
directory deployable to any static hosting (GitHub Pages, Netlify, S3, nginx).

## FSAA layer mapping of this repo

| Layer    | Contains                                                        | May import      |
| -------- | --------------------------------------------------------------- | --------------- |
| app      | routes, layouts, metadata                                       | all lower layers|
| pages    | route-level compositions (here: the group route)                | features, shared|
| features | code-viewer, layer-stack, layer-stack-explorer, docs-sidebar, docs-toc, docs-registry, … | entities, shared|
| entities | docs-page, fsaa-layer, method-profile (models + registries)     | shared          |
| shared   | tokens.css, docs-ui.css, atoms, molecules, cn(), site config    | external libs   |

## Structure

```
src/
├─ app/                    # Next.js App Router — the only place that knows routes
├─ features/               # user scenarios & large page blocks (ui/ + model/ + config/)
├─ entities/               # business models: docs-page, fsaa-layer, method-profile
└─ shared/
   ├─ ui/atoms/            # Button, Chip, Pill, StatusBadge, CopyButton
   ├─ ui/molecules/        # PageHeader, Callout, Card, ProofBadge, table/, SiteFooter
   ├─ lib/                 # cn()
   └─ config/              # SITE
```

## FSAA decisions applied here

- **No widgets layer** — every large page block (sidebar, explorer, matrix) is a feature.
- **No organisms tier** — shared/ui stops at atoms + molecules; bigger compositions became
  features instead.
- **Graduation pattern** — UI lives inside features until a second consumer appears and it
  passes the boundary test (`shared/ui/molecules/table` is the example).
- **Public APIs** — cross-slice imports go through each slice's `index.ts` only.

## Enforcement

`.eslintrc.json` ships `import/no-restricted-paths` zones mirroring the layer map:
shared ← everything; entities ← features/app; features ← app; plus bans on deep imports into
other slices' internals. A boundary violation is a failed lint run, not an argument.

## TODO

- [ ] Phase 0 — finalize methodology text (draft v0.1)
- [x] Phase 1 — reference repository published at
      [github.com/Aramex86/FSAA-webpage](https://github.com/Aramex86/FSAA-webpage);
      `SITE.repoUrl` in `src/shared/config/site.ts` is set (all "TODO" UI states flipped)
- [ ] Phase 2 — codemods for migration
- [ ] Phase 3 — adopter case studies

## Proof

Used in production on an internal financial accounting tool with real daily users (managers,
director, accounting).