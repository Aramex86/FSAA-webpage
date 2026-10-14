json package.json
{
  "name": "fsaa-site",
  "version": "0.1.0",
  "private": true,
  "description": "FSAA — Feature-Sliced Atomic Architecture. Documentation site. Built with FSAA itself: Next.js App Router mapped onto the five layers.",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "next": "15.1.6",
    "react": "19.0.0",
    "react-dom": "19.0.0"
  },
  "devDependencies": {
    "@types/node": "^22.10.7",
    "@types/react": "^19.0.7",
    "@types/react-dom": "^19.0.3",
    "eslint": "^8.57.1",
    "eslint-config-next": "15.1.6",
    "eslint-import-resolver-typescript": "^3.7.0",
    "eslint-plugin-import": "^2.31.0",
    "typescript": "^5.7.3"
  }
}

js next.config.mjs
/
 * FSAA docs site — static export.
 * output: 'export' produces ./out — deployable to GitHub Pages / Netlify / Cloudflare Pages
 * with a single command and no server runtime.
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  output: 'export',
  trailingSlash: false,
  reactStrictMode: true,
  images: { unoptimized: true }
};

export default nextConfig;

json tsconfig.json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/": ["./src/"],
      "@/shared/": ["./src/shared/"],
      "@/entities/": ["./src/entities/"],
      "@/features/": ["./src/features/"],
      "@/app/": ["./src/app/"]
    }
  },
  "include": ["next-env.d.ts", "/.ts", "/.tsx", ".next/types//*.ts"],
  "exclude": ["node_modules", "out", ".next"]
}

json .eslintrc.json
{
  "root": true,
  "extends": ["next/core-web-vitals"],
  "plugins": ["import"],
  "settings": {
    "import/resolver": {
      "typescript": { "project": "./tsconfig.json", "alwaysTryTypes": true }
    }
  },
  "rules": {
    "import/no-restricted-paths": [
      "error",
      {
        "zones": [
          {
            "target": "./src/shared",
            "from": ["./src/entities", "./src/features", "./src/app"],
            "message": "FSAA: shared must stay business-free — it may import external libs only."
          },
          {
            "target": "./src/entities",
            "from": ["./src/features", "./src/app"],
            "message": "FSAA: entities may import shared only (downward imports only)."
          },
          {
            "target": "./src/features",
            "from": ["./src/app"],
            "message": "FSAA: features may import entities and shared only."
          },
          {
            "target": "./src/app",
            "from": ["./src/entities"],
            "message": "FSAA: no layer skipping — pages go through features, never straight into entities."
          },
          {
            "target": "./src/!(app)/",
            "from": "./src/app",
            "message": "FSAA: nothing imports the app/pages layer (downward imports only)."
          }
        ]
      }
    ]
  },
  "overrides": [
    {
      "files": ["src/shared//*.{ts,tsx}"],
      "rules": {
        "no-restricted-imports": [
          "error",
          {
            "patterns": [
              { "group": ["@/entities/", "@/features/", "@/app/*"], "message": "FSAA: shared imports external libs only." }
            ]
          }
        ]
      }
    },
    {
      "files": ["src/features//*.{ts,tsx}"],
      "rules": {
        "no-restricted-imports": [
          "error",
          {
            "patterns": [
              { "group": ["@/app/*"], "message": "FSAA: features never import the app/pages layer." },
              { "group": ["@/features/*"], "message": "FSAA: no cross-feature imports — promote the shared part to shared/ui instead." },
              { "group": ["@/entities//model/", "@/entities//api/", "@/entities//config/", "@/features//ui/", "@/features//model/", "@/features//config/"], "message": "FSAA: import a module's public API (index.ts), never its internals." }
            ]
          }
        ]
      }
    },
    {
      "files": ["src/app//*.{ts,tsx}"],
      "rules": {
        "no-restricted-imports": [
          "error",
          {
            "patterns": [
              { "group": ["@/entities/*"], "message": "FSAA: no layer skipping — pages import features and shared." },
              { "group": ["@/features//ui/", "@/features//model/", "@/features//config/"], "message": "FSAA: import a feature's public API (index.ts)." }
            ]
          }
        ]
      }
    }
  ]
}

css src/shared/ui/fonts.css
/ shared/ui — external resources (fonts). fontsource CDN, no Google Fonts. /
@import url('https://cdn.jsdelivr.net/npm/@fontsource-variable/inter/index.css');
@import url('https://cdn.jsdelivr.net/npm/@fontsource-variable/jetbrains-mono/index.css');

css src/shared/ui/tokens.css
/* ==========================================================================
   shared/ui — design tokens + base typography.
   Business-free by definition: no page, feature or entity vocabulary here.
   ========================================================================== */
@import url('./fonts.css');

*,
*::before,
*::after { box-sizing: border-box; }

:root {
  --bg: #070a10;
  --panel: #0e1420;
  --panel-2: #121a27;
  --line: #1b2635;
  --line-soft: #141d29;
  --text: #e9eff8;
  --dim: #a9b7ca;
  --muted: #7286a0;
  --accent: #43e0bd;
  --accent-2: #7ab8ff;
  --accent-3: #b79bff;
  --warn: #ffcf6b;
  --danger: #ff8b8b;
  --sans: 'Inter Variable', Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  --mono: 'JetBrains Mono Variable', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  --r: 12px;
  --topbar: 58px;
}

html { scroll-behavior: smooth; }

body {
  margin: 0;
  background-color: var(--bg);
  color: var(--text);
  font-family: var(--sans);
  font-size: 15.5px;
  line-height: 1.68;
  -webkit-font-smoothing: antialiased;
  background-image:
    radial-gradient(900px 500px at 78% -8%, rgba(67, 224, 189, 0.1), transparent 60%),
    radial-gradient(700px 460px at 6% 0%, rgba(122, 184, 255, 0.08), transparent 62%),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.018) 1px, transparent 1px),
    linear-gradient(to right, rgba(255, 255, 255, 0.018) 1px, transparent 1px);
  background-size: auto, auto, 44px 44px, 44px 44px;
  background-attachment: fixed;
}

a { color: var(--accent-2); text-decoration: none; }
a:hover { text-decoration: underline; }
code, kbd, pre { font-family: var(--mono); }
::selection { background: rgba(67, 224, 189, 0.28); }
[hidden] { display: none !important; }
:focus-visible { outline: 2px solid rgba(67, 224, 189, 0.6); outline-offset: 2px; }

article { max-width: 840px; }

h1 { font-size: clamp(28px, 3.6vw, 40px); line-height: 1.14; letter-spacing: -0.9px; margin: 0 0 12px; font-weight: 800; }
h2 { font-size: 21px; letter-spacing: -0.3px; margin: 44px 0 14px; font-weight: 700; padding-bottom: 9px; border-bottom: 1px solid var(--line-soft); scroll-margin-top: 84px; }
h3 { font-size: 16px; margin: 28px 0 10px; font-weight: 650; scroll-margin-top: 84px; }
h4 { margin: 0 0 8px; font-size: 15px; font-weight: 680; }
p { margin: 0 0 14px; color: var(--dim); }
strong { color: var(--text); font-weight: 650; }
em { color: #cfe9ff; }
ul, ol { margin: 0 0 16px; padding-left: 20px; color: var(--dim); }
li { margin-bottom: 7px; }
li::marker { color: var(--accent); }
hr { border: 0; border-top: 1px solid var(--line-soft); margin: 34px 0; }

code.inline {
  font-size: 0.88em;
  background: var(--panel-2);
  border: 1px solid var(--line);
  padding: 1.5px 6px;
  border-radius: 6px;
  color: #bfe9ff;
}

.yes { color: #7fe9c8; font-weight: 650; }
.no { color: var(--danger); font-weight: 650; }
.mid { color: var(--warn); font-weight: 650; }

css src/shared/ui/docs-ui.css
/* ==========================================================================
   shared/ui — generic UI styles (atoms, molecules, docs chrome primitives).
   Every class here is describable without business vocabulary.
   ========================================================================== */

/ ---- shell ---- /
.shell { display: grid; grid-template-columns: 264px minmax(0, 1fr) 214px; align-items: start; max-width: 1560px; margin: 0 auto; }
.main { min-width: 0; padding: 34px 46px 70px; }
.overlay { display: none; position: fixed; inset: var(--topbar) 0 0; background: rgba(4, 7, 12, 0.6); z-index: 55; }
.overlay.show { display: block; }

/ ---- topbar ---- /
.topbar { position: sticky; top: 0; z-index: 60; height: var(--topbar); display: flex; align-items: center; gap: 14px; padding: 0 18px; background: rgba(7, 10, 16, 0.85); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); border-bottom: 1px solid var(--line); }
.brand { display: flex; align-items: center; gap: 10px; font-weight: 700; color: var(--text); }
.brand:hover { text-decoration: none; }
.mark { width: 26px; height: 26px; flex: 0 0 auto; display: block; }
.brand b { font-size: 15.5px; display: block; line-height: 1.15; }
.brand small { display: block; font-size: 10.5px; font-weight: 500; color: var(--muted); letter-spacing: 0.06em; text-transform: uppercase; }
.top-spacer { flex: 1; }
.top-meta { display: flex; align-items: center; gap: 8px; }

/ ---- atoms ---- /
.pill { font-size: 11px; font-weight: 600; letter-spacing: 0.03em; padding: 4px 9px; border-radius: 999px; border: 1px solid var(--line); background: var(--panel); color: var(--dim); white-space: nowrap; }
.pill.live { color: #8ff0d8; border-color: rgba(67, 224, 189, 0.35); background: rgba(67, 224, 189, 0.09); }
.pill.todo { color: var(--warn); border-color: rgba(255, 207, 107, 0.32); background: rgba(255, 207, 107, 0.08); }

.chip { font-size: 11.5px; font-weight: 600; padding: 4px 10px; border-radius: 999px; border: 1px solid var(--line); background: var(--panel); color: var(--muted); }
.chip.on { color: #9ff0dc; border-color: rgba(67, 224, 189, 0.3); background: rgba(67, 224, 189, 0.07); }
.chips { display: flex; flex-wrap: wrap; gap: 7px; margin-bottom: 18px; }

.status { font-size: 10.8px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; padding: 4px 9px; border-radius: 999px; white-space: nowrap; }
.status.prog { background: rgba(255, 207, 107, 0.12); color: var(--warn); border: 1px solid rgba(255, 207, 107, 0.32); }
.status.plan { background: var(--panel-2); color: var(--muted); border: 1px solid var(--line); }

.btn { display: inline-flex; align-items: center; gap: 8px; padding: 10px 16px; border-radius: 10px; font-size: 14px; font-weight: 650; cursor: pointer; border: 1px solid transparent; font-family: inherit; background: var(--accent); color: #04231d; transition: 0.16s; text-align: left; }
.btn:hover { background: #5cf0cd; text-decoration: none; transform: translateY(-1px); }
.btn.ghost { background: var(--panel); border-color: var(--line); color: var(--dim); }
.btn.ghost:hover { border-color: rgba(67, 224, 189, 0.4); color: var(--text); background: var(--panel-2); }
.btn.todo { border-style: dashed; border-color: rgba(255, 207, 107, 0.4); color: var(--warn); background: rgba(255, 207, 107, 0.05); cursor: not-allowed; }
.btn.todo:hover { transform: none; background: rgba(255, 207, 107, 0.09); }
.todo-chip { font-family: var(--mono); font-size: 9.5px; letter-spacing: 0.08em; padding: 2px 5px; border-radius: 4px; background: rgba(255, 207, 107, 0.16); color: var(--warn); border: 1px solid rgba(255, 207, 107, 0.3); }
.cta { display: flex; flex-wrap: wrap; gap: 10px; margin: 6px 0 8px; }

.copy { font: inherit; font-size: 11.5px; font-weight: 600; color: var(--muted); background: transparent; border: 1px solid var(--line); border-radius: 7px; padding: 3px 9px; cursor: pointer; transition: 0.15s; }
.copy:hover { color: var(--text); border-color: rgba(67, 224, 189, 0.4); }
.copy.done { color: #04231d; background: var(--accent); border-color: var(--accent); }

/ ---- molecules ---- /
.crumb { font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--muted); font-weight: 700; margin-bottom: 10px; }
.lede { font-size: 17px; color: var(--dim); margin: 0 0 26px; max-width: 70ch; }

.pitch { font-size: clamp(20px, 2.5vw, 27px); line-height: 1.4; color: var(--text); font-weight: 500; letter-spacing: -0.35px; margin: 0 0 22px; max-width: 30ch; }
.pitch strong { color: var(--accent); font-weight: 700; }

.cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(232px, 1fr)); gap: 12px; margin: 8px 0 6px; }
.card { border: 1px solid var(--line); border-radius: var(--r); background: linear-gradient(180deg, var(--panel), rgba(14, 20, 32, 0.55)); padding: 16px; position: relative; overflow: hidden; transition: 0.18s; }
.card:hover { border-color: rgba(67, 224, 189, 0.34); transform: translateY(-2px); }
.card .num { font-family: var(--mono); font-size: 11px; color: var(--accent); letter-spacing: 0.1em; display: block; margin-bottom: 8px; font-weight: 600; }
.card h4 { margin: 0 0 7px; font-size: 15.5px; font-weight: 680; letter-spacing: -0.15px; }
.card p { margin: 0; font-size: 13.5px; line-height: 1.6; color: var(--muted); }
.card::after { content: ''; position: absolute; inset: 0 0 auto 0; height: 1px; background: linear-gradient(90deg, transparent, rgba(67, 224, 189, 0.45), transparent); opacity: 0.6; }

.callout { border: 1px solid var(--line); border-left: 3px solid var(--accent); border-radius: 10px; background: var(--panel); padding: 14px 16px; margin: 18px 0; font-size: 14.2px; color: var(--dim); }
.callout.quote { border-left-color: var(--accent-3); }
.callout.rule { border-left-color: var(--warn); }
.callout.stop { border-left-color: var(--danger); }
.callout p:last-child { margin-bottom: 0; }
.callout .k { display: block; font-size: 10.5px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--muted); font-weight: 700; margin-bottom: 6px; }

.proof { display: flex; gap: 12px; align-items: flex-start; border: 1px solid rgba(67, 224, 189, 0.28); background: rgba(67, 224, 189, 0.06); border-radius: 11px; padding: 14px 16px; margin: 18px 0; }
.proof .ic { font-size: 17px; line-height: 1.3; }
.proof p { margin: 0; font-size: 13.8px; color: #cdf3e8; }
.proof b { color: #fff; }

.table-wrap { overflow-x: auto; border: 1px solid var(--line); border-radius: 12px; margin: 14px 0 18px; background: var(--panel); }
table.dt { border-collapse: collapse; width: 100%; font-size: 13.8px; min-width: 520px; }
table.dt th, table.dt td { text-align: left; padding: 11px 14px; border-bottom: 1px solid var(--line-soft); vertical-align: top; }
table.dt thead th { font-size: 10.6px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); font-weight: 700; background: var(--panel-2); border-bottom: 1px solid var(--line); white-space: nowrap; }
table.dt tbody tr:last-child td { border-bottom: 0; }
table.dt tbody tr:hover { background: rgba(255, 255, 255, 0.022); }
table.dt td.lay, table.dt th.lay { font-family: var(--mono); font-weight: 700; white-space: nowrap; }
table.dt td.lay { color: var(--accent); }
table.dt td small { display: block; color: var(--muted); font-size: 12.3px; margin-top: 3px; }
table.dt .fsaa-col { background: rgba(67, 224, 189, 0.055); }

.code { border: 1px solid var(--line); border-radius: 12px; overflow: hidden; margin: 16px 0; background: #0a0f17; }
.code-head { display: flex; align-items: center; gap: 10px; padding: 8px 12px; background: var(--panel-2); border-bottom: 1px solid var(--line); }
.code-file { font-family: var(--mono); font-size: 11.8px; color: var(--dim); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; flex: 1; }
.code-lang { font-family: var(--mono); font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); }
.code pre { margin: 0; padding: 14px 15px; overflow-x: auto; font-size: 12.9px; line-height: 1.66; tab-size: 2; }
.code pre code { color: #d8e4f2; white-space: pre; }
.c-cmt { color: #5b6c85; font-style: italic; }
.c-str { color: #9fdca8; }
.c-kw { color: #7ab8ff; }
.c-lit { color: #ffcf6b; }
.c-tag { color: #43e0bd; }
.c-typ { color: #c3aaff; }
.c-num { color: #ff9e7a; }
.c-att { color: #8fd3ff; }
.c-fn { color: #ffd479; }
pre.tree { font-size: 12.7px; line-height: 1.72; }
.tree .td { color: #7ab8ff; font-weight: 600; }
.tree .tf { color: #d8e4f2; }
.tree .tg { color: #3d4c60; }
.tree .tc { color: #5b6c85; font-style: italic; }
.tree .tk { color: #43e0bd; }

.split { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin: 16px 0; }
.panel { border: 1px solid var(--line); border-radius: 12px; padding: 15px 16px; background: var(--panel); }
.panel h4 { margin: 0 0 10px; font-size: 14px; font-weight: 680; display: flex; align-items: center; gap: 8px; }
.panel h4 .dot { width: 7px; height: 7px; border-radius: 50%; }
.panel.good h4 .dot { background: var(--accent); box-shadow: 0 0 10px rgba(67, 224, 189, 0.6); }
.panel.bad h4 .dot { background: var(--danger); box-shadow: 0 0 10px rgba(255, 139, 139, 0.5); }
.panel ul { margin: 0; padding-left: 18px; }
.panel li { font-size: 13.4px; margin-bottom: 6px; }

.steps { counter-reset: s; list-style: none; padding: 0; margin: 14px 0; }
.steps li { counter-increment: s; position: relative; padding: 11px 14px 11px 48px; margin-bottom: 8px; border: 1px solid var(--line); border-radius: 10px; background: var(--panel); font-size: 13.7px; color: var(--dim); }
.steps li::before { content: counter(s, decimal-leading-zero); position: absolute; left: 14px; top: 11px; font-family: var(--mono); font-size: 12px; color: var(--accent); font-weight: 700; }
.steps li b { color: var(--text); }

.phase { display: grid; grid-template-columns: 74px minmax(0, 1fr) auto; gap: 14px; align-items: center; border: 1px solid var(--line); border-radius: 11px; padding: 13px 15px; margin-bottom: 9px; background: var(--panel); transition: 0.16s; }
.phase:hover { border-color: rgba(122, 184, 255, 0.35); }
.phase .p { font-family: var(--mono); font-size: 12.5px; color: var(--accent-2); font-weight: 700; }
.phase .t { font-size: 14.2px; color: var(--text); font-weight: 600; }
.phase .t small { display: block; font-weight: 400; font-size: 12.6px; color: var(--muted); margin-top: 2px; }

.atomic { border: 1px solid var(--line); border-radius: 14px; padding: 16px; background: var(--panel); margin: 16px 0; }
.atomic-title { font-family: var(--mono); font-size: 13.5px; color: var(--accent); font-weight: 700; display: block; margin-bottom: 12px; }
.lvl { display: grid; grid-template-columns: 96px minmax(0, 1fr); gap: 12px; align-items: center; border: 1px solid var(--line); border-radius: 9px; padding: 10px 12px; margin-bottom: 8px; background: var(--panel-2); }
.lvl b { font-family: var(--mono); font-size: 12.6px; color: #c3aaff; }
.lvl span { font-size: 13px; color: var(--dim); }
.lvl.removed { border-style: dashed; border-color: rgba(255, 139, 139, 0.35); background: rgba(255, 139, 139, 0.045); }
.lvl.removed b { color: #ffa3a3; text-decoration: line-through; }
.lvl.removed span { color: var(--muted); }

.decision { border: 1px solid var(--line); border-radius: 14px; background: var(--panel); padding: 18px; margin: 18px 0; }
.decision-q { font-size: 16.5px; line-height: 1.55; color: var(--text); font-style: italic; margin: 0 0 16px; padding-left: 14px; border-left: 3px solid var(--accent-3); }
.decision-out { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 16px; }
.out { border-radius: 10px; padding: 12px 14px; border: 1px solid var(--line); }
.out.yes { background: rgba(67, 224, 189, 0.07); border-color: rgba(67, 224, 189, 0.3); }
.out.no { background: rgba(255, 139, 139, 0.06); border-color: rgba(255, 139, 139, 0.26); }
.out b { display: block; font-family: var(--mono); font-size: 13px; margin-bottom: 3px; }
.out.yes b { color: #7fe9c8; }
.out.no b { color: #ffa3a3; }
.out span { font-family: var(--mono); font-size: 12.3px; color: var(--dim); }
.verdicts { list-style: none; padding: 0; margin: 0; }
.verdicts li { display: flex; gap: 9px; align-items: flex-start; font-size: 13.6px; margin-bottom: 8px; color: var(--dim); }
.verdicts .tick { font-family: var(--mono); font-weight: 700; flex: 0 0 auto; }
.verdicts .pass .tick { color: #7fe9c8; }
.verdicts .fail .tick { color: #ffa3a3; }

.flow { display: grid; grid-template-columns: 1fr 108px 1fr; gap: 12px; align-items: stretch; margin: 20px 0; }
.flow-node { border: 1px solid var(--line); border-radius: 12px; background: var(--panel); padding: 14px; }
.flow-node h4 { margin: 0 0 10px; font-size: 13.8px; font-weight: 680; color: var(--text); }
.flow-node h4 span { display: block; font-family: var(--mono); font-size: 10.5px; letter-spacing: 0.1em; color: var(--accent); text-transform: uppercase; margin-bottom: 3px; }
.flow-node p { font-size: 12.8px; color: var(--muted); margin: 10px 0 0; line-height: 1.55; }
pre.mini { font-size: 12.1px; line-height: 1.7; background: #0a0f17; border: 1px solid var(--line-soft); border-radius: 8px; padding: 10px 12px; overflow-x: auto; color: #cddced; margin: 0; white-space: pre; font-family: var(--mono); }
pre.mini .d { color: #7ab8ff; }
pre.mini .f { color: #d8e4f2; }
pre.mini .c { color: #5b6c85; font-style: italic; }
pre.mini .a { color: #43e0bd; }
.flow-arrow { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px; text-align: center; }
.flow-arrow .lbl { font-family: var(--mono); font-size: 10.5px; color: var(--muted); line-height: 1.4; }
.flow-arrow .ar { font-size: 20px; color: var(--accent); }
.rule-line { font-size: 16px; color: var(--text); font-weight: 600; text-align: center; margin: 18px 0 6px; letter-spacing: -0.2px; }
.rule-line::before, .rule-line::after { content: '—'; color: var(--accent); margin: 0 10px; font-weight: 400; }

.sitefoot { max-width: 840px; margin-top: 36px; padding-top: 20px; border-top: 1px solid var(--line-soft); font-size: 12.4px; color: var(--muted); display: flex; flex-wrap: wrap; gap: 8px 18px; align-items: center; }
.sitefoot b { color: var(--dim); }

/ ---- layer stack diagram ---- /
.stack-wrap { border: 1px solid var(--line); border-radius: 16px; background: radial-gradient(600px 260px at 20% 0%, rgba(122, 184, 255, 0.07), transparent 70%), linear-gradient(180deg, #0d1421, #0a0f18); padding: 20px; margin: 20px 0 10px; }
.stack { display: flex; gap: 16px; }
.rail { width: 44px; flex: 0 0 auto; display: flex; flex-direction: column; align-items: center; }
.rail-line { flex: 1; width: 2px; background: linear-gradient(180deg, rgba(122, 184, 255, 0.55), rgba(67, 224, 189, 0.65)); border-radius: 2px; position: relative; min-height: 40px; }
.rail-line::after { content: ''; position: absolute; bottom: -1px; left: 50%; transform: translateX(-50%); border-left: 6px solid transparent; border-right: 6px solid transparent; border-top: 9px solid rgba(67, 224, 189, 0.85); }
.rail-label { writing-mode: vertical-rl; font-family: var(--mono); font-size: 10.5px; letter-spacing: 0.16em; color: var(--muted); text-transform: uppercase; margin-bottom: 8px; }
.layers { flex: 1; display: flex; flex-direction: column; gap: 9px; min-width: 0; }
.layer { display: grid; grid-template-columns: 22px 88px minmax(0, 1fr) auto; gap: 12px; align-items: center; width: 100%; text-align: left; padding: 11px 14px; border-radius: 11px; cursor: pointer; border: 1px solid var(--line); background: linear-gradient(90deg, rgba(255, 255, 255, 0.035), rgba(255, 255, 255, 0.01)); color: var(--text); font: inherit; transition: 0.16s; box-shadow: 3px 3px 0 rgba(0, 0, 0, 0.28); }
.layer:hover { border-color: rgba(67, 224, 189, 0.45); transform: translateX(3px); }
.layer.active { border-color: var(--lc, var(--accent)); background: linear-gradient(90deg, rgba(67, 224, 189, 0.13), rgba(255, 255, 255, 0.02)); }
.layer .idx { font-family: var(--mono); font-size: 11px; color: var(--lc, var(--accent)); text-align: center; font-weight: 600; }
.layer .nm { font-family: var(--mono); font-size: 14px; font-weight: 700; color: var(--lc, var(--accent)); letter-spacing: -0.2px; }
.layer .pp { font-size: 13.3px; color: var(--dim); min-width: 0; }
.layer .im { font-size: 11.5px; color: var(--muted); font-family: var(--mono); white-space: nowrap; }
.layer .im b { color: #cfe3f7; font-weight: 600; }
.layer-detail { margin-top: 14px; padding: 12px 14px; border-radius: 10px; border: 1px dashed var(--line); background: rgba(0, 0, 0, 0.22); font-size: 13.4px; color: var(--dim); min-height: 46px; }
.layer-detail b { color: var(--accent); }
.layer-detail .no { color: var(--danger); font-family: var(--mono); font-size: 12.5px; }
.stack-foot { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 14px; }

/ ---- sidebar ---- /
.sidebar { position: sticky; top: var(--topbar); height: calc(100vh - var(--topbar)); overflow-y: auto; padding: 20px 14px 40px 20px; border-right: 1px solid var(--line-soft); }
.search { position: relative; margin-bottom: 16px; }
.search input { width: 100%; padding: 9px 32px; border-radius: 10px; border: 1px solid var(--line); background: var(--panel); color: var(--text); font: inherit; font-size: 13.5px; outline: none; }
.search input:focus { border-color: rgba(67, 224, 189, 0.5); box-shadow: 0 0 0 3px rgba(67, 224, 189, 0.1); }
.search svg { position: absolute; left: 10px; top: 10px; opacity: 0.55; }
.search kbd { position: absolute; right: 8px; top: 8px; font-size: 10.5px; color: var(--muted); border: 1px solid var(--line); border-radius: 5px; padding: 1px 5px; background: var(--bg); }
.navgroup { margin-bottom: 18px; }
.navgroup h5 { margin: 0 0 7px 8px; font-size: 10.5px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--muted); font-weight: 700; }
.navlink { display: flex; align-items: center; gap: 9px; padding: 7px 10px; border-radius: 9px; color: var(--dim); font-size: 14px; font-weight: 500; border: 1px solid transparent; }
.navlink:hover { background: var(--panel); color: var(--text); text-decoration: none; }
.navlink .n { font-family: var(--mono); font-size: 11px; color: var(--muted); width: 14px; flex: 0 0 auto; }
.navlink.active { background: rgba(67, 224, 189, 0.09); border-color: rgba(67, 224, 189, 0.28); color: #c9fff1; }
.navlink.active .n { color: var(--accent); }
.nav-empty { padding: 8px 10px; color: var(--muted); font-size: 13px; }
.side-note { margin-top: 22px; padding: 12px; border: 1px dashed var(--line); border-radius: 11px; font-size: 12px; color: var(--muted); line-height: 1.55; }
.side-note b { color: var(--dim); }
.burger { position: fixed; top: 12px; left: 12px; z-index: 70; display: none; background: var(--panel); border: 1px solid var(--line); border-radius: 9px; width: 38px; height: 34px; color: var(--text); cursor: pointer; font-size: 16px; }

/ ---- toc + pager ---- /
.toc { position: sticky; top: var(--topbar); height: calc(100vh - var(--topbar)); overflow-y: auto; padding: 36px 20px 40px 8px; }
.toc h6 { margin: 0 0 10px; font-size: 10.5px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--muted); font-weight: 700; }
.toc a { display: block; font-size: 12.8px; color: var(--muted); padding: 4px 10px; border-left: 2px solid var(--line); line-height: 1.45; }
.toc a:hover { color: var(--text); text-decoration: none; border-left-color: var(--dim); }
.toc a.on { color: var(--accent); border-left-color: var(--accent); }
.toc a.sub { padding-left: 22px; font-size: 12.2px; }

.pager { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; max-width: 840px; margin: 44px 0 0; }
.pager a { border: 1px solid var(--line); border-radius: 12px; padding: 13px 15px; background: var(--panel); transition: 0.16s; display: block; }
.pager a:hover { border-color: rgba(67, 224, 189, 0.38); text-decoration: none; transform: translateY(-2px); }
.pager .dir { font-size: 10.5px; letter-spacing: 0.11em; text-transform: uppercase; color: var(--muted); font-weight: 700; display: block; }
.pager .ttl { font-size: 14.5px; color: var(--text); font-weight: 640; margin-top: 3px; display: block; }
.pager .next { text-align: right; }

/ ---- responsive ---- /
@media (max-width: 1240px) {
  .shell { grid-template-columns: 248px minmax(0, 1fr); }
  .toc { display: none; }
  .main { padding: 30px 34px 60px; }
}
@media (max-width: 900px) {
  .shell { grid-template-columns: minmax(0, 1fr); }
  .topbar { padding-left: 60px; }
  .burger { display: block; }
  .sidebar { position: fixed; top: var(--topbar); left: 0; width: 280px; z-index: 58; background: #080c13; border-right: 1px solid var(--line); transform: translateX(-102%); transition: transform 0.22s ease; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5); }
  .sidebar.open { transform: none; }
  .main { padding: 24px 18px 56px; }
  .layer { grid-template-columns: 20px 74px minmax(0, 1fr); gap: 9px; }
  .layer .im { grid-column: 2 / -1; font-size: 11px; }
  .flow { grid-template-columns: 1fr; }
  .flow-arrow { flex-direction: row; padding: 4px 0; }
  .flow-arrow .ar { transform: rotate(90deg); }
  .split, .decision-out { grid-template-columns: 1fr; }
  .pager { grid-template-columns: 1fr; }
  .phase { grid-template-columns: 60px minmax(0, 1fr); row-gap: 8px; }
  .phase .status { grid-column: 2; justify-self: start; }
  .top-meta .hide-sm { display: none; }
  .rail { width: 30px; }
}
@media (max-width: 520px) {
  .pitch { font-size: 21px; }
  .code pre { font-size: 12.1px; }
}

ts src/shared/lib/cn.ts
/ shared/lib — class name joiner. Business-free util. */
export type ClassValue = string | false | null | undefined;

export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(' ');
}

ts src/shared/config/site.ts
/
 * shared/config — site-wide configuration and canonical copy.
 * NOTE: repoUrl is intentionally null until Phase 0 publishes the repository.
 * The UI renders a dashed "TODO" control instead of a dead link.
 */
export const SITE = {
  name: 'FSAA',
  fullName: 'Feature-Sliced Atomic Architecture',
  tagline: 'Feature-Sliced Atomic',
  version: 'v0.1 draft',
  phaseLabel: 'Phase 0 · in progress',
  repoUrl: null as string | null, // TODO(Phase 0): real repository URL
  repoLabel: 'GitHub repository',
  repoTodoTitle: 'Placeholder — the real repository URL lands in Phase 0. Not a working link.',
  pitch: 'FSAA is FSD + Atomic Design with an answer to the question both leave open: where does UI go?',
  positioning:
    'FSAA is not a new architecture theory. It is a practical, opinionated assembly of two proven methods — Feature-Sliced Design and Atomic Design — with the missing decision rules added. We do not claim a revolution.',
  proof:
    'Used in production on an internal financial accounting tool with real daily users (managers, director, accounting).',
  graduationMotto: 'Features own their UI until it earns sharing.',
  boundaryTest:
    'If I removed this component from the app entirely, could it still be described without mentioning users, orders, or projects?',
  keyExampleRule:
    'The table component stays generic; business-specific columns live in their features. If two entities need the same visual pattern, extract the pattern into shared, keep entity configuration in features.',
  hybridAnswer:
    '“Isn’t this just FSD + Atomic?” — Yes, deliberately. The value is not novelty, it is the missing decision rules: the graduation pattern, the boundary test for shared, and the removal of organisms. We do not claim a revolution.'
} as const;

tsx src/shared/ui/atoms/Button.tsx
import Link from 'next/link';
import type { ReactNode, MouseEvent } from 'react';
import { cn } from '@/shared/lib/cn';

export type ButtonVariant = 'primary' | 'ghost' | 'todo';

export type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: ButtonVariant;
  title?: string;
  onClick?: (event: MouseEvent) => void;
  ariaLabel?: string;
};

/ atom — generic action control. Renders a link when href is present. */
export function Button({ children, href, variant = 'primary', title, onClick, ariaLabel }: ButtonProps) {
  const className = cn('btn', variant === 'ghost' && 'ghost', variant === 'todo' && 'todo');

  if (href) {
    return (
      
        {children}
      
    );
  }

  if (variant === 'todo') {
    return (
      
        {children}
      
    );
  }

  return (
    
      {children}
    
  );
}

tsx src/shared/ui/atoms/Chip.tsx
import type { ReactNode } from 'react';
import { cn } from '@/shared/lib/cn';

export type ChipProps = { children: ReactNode; tone?: 'default' | 'on' };

/ atom — small label chip. */
export function Chip({ children, tone = 'default' }: ChipProps) {
  return {children};
}

tsx src/shared/ui/atoms/Pill.tsx
import type { ReactNode } from 'react';
import { cn } from '@/shared/lib/cn';

export type PillProps = { children: ReactNode; tone?: 'default' | 'live' | 'todo'; hideOnMobile?: boolean };

/ atom — status pill for chrome (topbar, headers). */
export function Pill({ children, tone = 'default', hideOnMobile = false }: PillProps) {
  return {children};
}

tsx src/shared/ui/atoms/StatusBadge.tsx
import type { ReactNode } from 'react';
import { cn } from '@/shared/lib/cn';

export type StatusBadgeProps = { children: ReactNode; tone: 'prog' | 'plan' };

/ atom — roadmap-style status badge. */
export function StatusBadge({ children, tone }: StatusBadgeProps) {
  return {children};
}

tsx src/shared/ui/atoms/CopyButton.tsx
'use client';

import { useCallback, useState } from 'react';

export type CopyButtonProps = { text: string; label?: string };

/
 * atom — copy-to-clipboard control.
 * Boundary test: describable without any business vocabulary → shared.
 */
export function CopyButton({ text, label = 'Copy' }: CopyButtonProps) {
  const [done, setDone] = useState(false);

  const markDone = useCallback(() => {
    setDone(true);
    window.setTimeout(() => setDone(false), 1400);
  }, []);

  const legacyCopy = useCallback((value: string) => {
    try {
      const area = document.createElement('textarea');
      area.value = value;
      area.style.position = 'fixed';
      area.style.opacity = '0';
      document.body.appendChild(area);
      area.select();
      document.execCommand('copy');
      document.body.removeChild(area);
    } catch {
      / clipboard unavailable — the snippet stays readable /
    }
  }, []);

  const onCopy = useCallback(() => {
    if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text).then(markDone, () => {
        legacyCopy(text);
        markDone();
      });
      return;
    }
    legacyCopy(text);
    markDone();
  }, [text, markDone, legacyCopy]);

  return (
    
      {done ? 'Copied' : label}
    
  );
}

ts src/shared/ui/atoms/index.ts
/ shared/ui/atoms — public API */
export { Button } from './Button';
export type { ButtonProps, ButtonVariant } from './Button';
export { Chip } from './Chip';
export type { ChipProps } from './Chip';
export { Pill } from './Pill';
export type { PillProps } from './Pill';
export { StatusBadge } from './StatusBadge';
export type { StatusBadgeProps } from './StatusBadge';
export { CopyButton } from './CopyButton';
export type { CopyButtonProps } from './CopyButton';

tsx src/shared/ui/molecules/PageHeader.tsx
import type { ReactNode } from 'react';

export type PageHeaderProps = { crumb: string; title: string; lede: ReactNode };

/ molecule — standard docs page heading block. */
export function PageHeader({ crumb, title, lede }: PageHeaderProps) {
  return (
    <>
      {crumb}
      {title}
      {lede}
    
  );
}

tsx src/shared/ui/molecules/Callout.tsx
import type { ReactNode } from 'react';
import { cn } from '@/shared/lib/cn';

export type CalloutTone = 'default' | 'quote' | 'rule' | 'stop';

export type CalloutProps = { children: ReactNode; tone?: CalloutTone; label?: string };

/ molecule — emphasised note block. */
export function Callout({ children, tone = 'default', label }: CalloutProps) {
  return (
    
      {label ? {label} : null}
      {children}
    
  );
}

tsx src/shared/ui/molecules/Card.tsx
import type { ReactNode } from 'react';

export type CardProps = { index?: string; title: string; children: ReactNode };

/ molecule — content card. Pair with  for the grid. */
export function Card({ index, title, children }: CardProps) {
  return (
    
      {index ? {index} : null}
      {title}
      {children}
    
  );
}

tsx src/shared/ui/molecules/ProofBadge.tsx
import type { ReactNode } from 'react';

export type ProofBadgeProps = { children: ReactNode };

/ molecule — evidence badge ("used in production"). */
export function ProofBadge({ children }: ProofBadgeProps) {
  return (
    
      ✔
      {children}
    
  );
}

ts src/shared/ui/molecules/table/types.ts
import type { ReactNode } from 'react';

/ Generic column contract. No business vocabulary — passes the boundary test. */
export type Column = {
  key: string;
  header: ReactNode;
  render: (row: T) => ReactNode;
  className?: string;
};

tsx src/shared/ui/molecules/table/DataTable.tsx
import type { ReactNode } from 'react';
import type { Column } from './types';

export type DataTableProps = {
  columns: Column[];
  data: T[];
  rowKey: (row: T) => string;
  caption?: ReactNode;
  emptyLabel?: string;
};

/
 * molecule — generic table.
 * Knows nothing about methods, layers, projects or orders: it renders columns + data.
 */
export function DataTable({ columns, data, rowKey, caption, emptyLabel = 'No rows.' }: DataTableProps) {
  return (
    
      
        {caption ? {caption} : null}
        
          
            {columns.map((column) => (
              
                {column.header}
              
            ))}
          
        
        
          {data.length === 0 ? (
            
              {emptyLabel}
            
          ) : (
            data.map((row) => (
              
                {columns.map((column) => (
                  
                    {column.render(row)}
                  
                ))}
              
            ))
          )}
        
      
    
  );
}

ts src/shared/ui/molecules/table/index.ts
export { DataTable } from './DataTable';
export type { DataTableProps } from './DataTable';
export type { Column } from './types';

tsx src/shared/ui/molecules/SiteFooter.tsx
import { SITE } from '@/shared/config/site';

/ molecule — docs footer chrome. */
export function SiteFooter() {
  return (
    
      
        {SITE.name} — {SITE.fullName}
      
      English · Next.js static export · no trackers
      
        GitHub link: TODO (Phase 0)
      
    
  );
}

ts src/shared/ui/molecules/index.ts
/ shared/ui/molecules — public API */
export { PageHeader } from './PageHeader';
export type { PageHeaderProps } from './PageHeader';
export { Callout } from './Callout';
export type { CalloutProps, CalloutTone } from './Callout';
export { Card } from './Card';
export type { CardProps } from './Card';
export { ProofBadge } from './ProofBadge';
export type { ProofBadgeProps } from './ProofBadge';
export { DataTable } from './table';
export type { DataTableProps, Column } from './table';
export { SiteFooter } from './SiteFooter';

ts src/entities/docs-page/model/types.ts
export type DocsPageId =
  | 'home'
  | 'architecture'
  | 'graduation'
  | 'example'
  | 'comparison'
  | 'adoption'
  | 'roadmap';

export type NavGroup = 'Overview' | 'Core rules' | 'In practice' | 'Context';

export type DocsPage = {
  id: DocsPageId;
  slug: string;
  group: NavGroup;
  title: string;
  nav: string;
  keywords: string;
};

export type NavSection = { group: NavGroup; pages: DocsPage[] };

ts src/entities/docs-page/model/registry.ts
import type { DocsPage, DocsPageId, NavGroup, NavSection } from './types';

/ Data access for the docs page registry (source of truth for navigation + pager). */
export const NAV_GROUPS: NavGroup[] = ['Overview', 'Core rules', 'In practice', 'Context'];

export const DOCS_PAGES: DocsPage[] = [
  { id: 'home', slug: '/', group: 'Overview', title: 'Home', nav: 'Home', keywords: 'pitch overview layers diagram differentiators fsaa fsd atomic design' },
  { id: 'architecture', slug: '/architecture', group: 'Core rules', title: 'Architecture', nav: 'Architecture', keywords: 'layers import rules public api index.ts atoms molecules shared widgets removed' },
  { id: 'graduation', slug: '/graduation', group: 'Core rules', title: 'Graduation Pattern', nav: 'Graduation Pattern', keywords: 'graduation promotion shared boundary test reusable feature ui flat atoms molecules' },
  { id: 'example', slug: '/example', group: 'In practice', title: 'Example', nav: 'Example · Projects/Orders', keywords: 'example projects orders datatable columns file tree case study' },
  { id: 'comparison', slug: '/comparison', group: 'Context', title: 'Comparison', nav: 'Comparison', keywords: 'comparison fsd atomic design bulletproof react hybrid honest table widgets organisms' },
  { id: 'adoption', slug: '/adoption', group: 'In practice', title: 'Adoption', nav: 'Adoption', keywords: 'adoption migration when to use when not team size project size scope' },
  { id: 'roadmap', slug: '/roadmap', group: 'Context', title: 'Roadmap', nav: 'Roadmap', keywords: 'roadmap phases status boilerplate eslint import checker ci promotion repo readme' }
];

export const NAVSECTIONS: NavSection[] = NAVGROUPS.map((group) => ({
  group,
  pages: DOCS_PAGES.filter((page) => page.group === group)
}));

export function getDocsPage(id: DocsPageId): DocsPage {
  const page = DOCS_PAGES.find((candidate) => candidate.id === id);
  if (!page) throw new Error(Unknown docs page: ${id});
  return page;
}

export function getPageNumber(id: DocsPageId): string {
  return String(DOCS_PAGES.findIndex((page) => page.id === id) + 1).padStart(2, '0');
}

export function getAdjacentPages(id: DocsPageId): { prev: DocsPage | null; next: DocsPage | null } {
  const index = DOCS_PAGES.findIndex((page) => page.id === id);
  return { prev: DOCSPAGES[index - 1] ?? null, next: DOCSPAGES[index + 1] ?? null };
}

export function getCrumb(id: DocsPageId): string {
  return ${getDocsPage(id).group} · FSAA docs;
}

ts src/entities/docs-page/index.ts
/ entities/docs-page — public API */
export { DOCSPAGES, NAVGROUPS, NAV_SECTIONS, getDocsPage, getPageNumber, getAdjacentPages, getCrumb } from './model/registry';
export type { DocsPage, DocsPageId, NavGroup, NavSection } from './model/types';

ts src/entities/fsaa-layer/model/types.ts
export type LayerId = 'app' | 'pages' | 'features' | 'entities' | 'shared';

export type FsaaLayer = {
  id: LayerId;
  name: LayerId;
  purpose: string;
  mayImport: string;
  color: string;
};

export type LayerBoundary = {
  layer: FsaaLayer;
  above: LayerId[];
  below: LayerId[];
};

ts src/entities/fsaa-layer/model/layers.ts
import type { FsaaLayer, LayerBoundary, LayerId } from './types';

/ The canonical FSAA stack. Five layers — the widgets layer is deliberately absent. */
export const FSAA_LAYERS: FsaaLayer[] = [
  { id: 'app', name: 'app', purpose: 'router, providers, global config', mayImport: 'shared only', color: '#7ab8ff' },
  { id: 'pages', name: 'pages', purpose: 'route-level compositions', mayImport: 'features, shared', color: '#57d3e8' },
  { id: 'features', name: 'features', purpose: 'user scenarios AND large page blocks', mayImport: 'entities, shared', color: '#43e0bd' },
  { id: 'entities', name: 'entities', purpose: 'business models + data access', mayImport: 'shared', color: '#8fd96a' },
  { id: 'shared', name: 'shared', purpose: 'design tokens, generic UI, utils', mayImport: 'external libs only', color: '#e0c96a' }
];

export const IMPORT_RULES: string[] = [
  'Downward only — a layer never imports from a layer above it.',
  'No layer skipping — pages cannot import entities directly; they go through a feature.',
  'No circular dependencies — neither between layers nor inside one.',
  'Public API per module — every module exposes its surface through index.ts.'
];

export function getLayerBoundary(id: LayerId): LayerBoundary {
  const index = FSAA_LAYERS.findIndex((layer) => layer.id === id);
  const layer = FSAA_LAYERS[index];
  if (!layer) throw new Error(Unknown FSAA layer: ${id});
  return {
    layer,
    above: FSAA_LAYERS.slice(0, index).map((item) => item.id),
    below: FSAA_LAYERS.slice(index + 1).map((item) => item.id)
  };
}

ts src/entities/fsaa-layer/index.ts
/ entities/fsaa-layer — public API */
export { FSAALAYERS, IMPORTRULES, getLayerBoundary } from './model/layers';
export type { FsaaLayer, LayerBoundary, LayerId } from './model/types';

ts src/entities/method-profile/model/types.ts
export type MethodId = 'fsaa' | 'fsd' | 'atomic' | 'bulletproof';

export type Verdict = 'yes' | 'no' | 'mid' | 'plain';

export type MethodCell = { verdict: Verdict; text: string; note?: string };

export type Method = { id: MethodId; label: string };

export type CriterionRow = {
  id: string;
  criterion: string;
  cells: Record;
};

ts src/entities/method-profile/model/profiles.ts
import type { CriterionRow, Method } from './types';

/ Business model + data: the four methods FSAA is compared against. */
export const METHODS: Method[] = [
  { id: 'fsaa', label: 'FSAA' },
  { id: 'fsd', label: 'FSD' },
  { id: 'atomic', label: 'Atomic Design' },
  { id: 'bulletproof', label: 'Bulletproof React' }
];

export const CRITERION_ROWS: CriterionRow[] = [
  {
    id: 'ui-placement',
    criterion: 'Answers “where does UI go?”',
    cells: {
      fsaa: { verdict: 'yes', text: 'Yes', note: 'graduation pattern + boundary test' },
      fsd: { verdict: 'no', text: 'No', note: 'the open question' },
      atomic: { verdict: 'mid', text: 'Partly', note: 'UI only, no business logic' },
      bulletproof: { verdict: 'no', text: 'No' }
    }
  },
  {
    id: 'business-logic',
    criterion: 'Business logic placement',
    cells: {
      fsaa: { verdict: 'yes', text: 'entities + features' },
      fsd: { verdict: 'yes', text: 'entities + features' },
      atomic: { verdict: 'no', text: 'silent' },
      bulletproof: { verdict: 'mid', text: 'features (advice)' }
    }
  },
  {
    id: 'large-blocks',
    criterion: 'Large page blocks',
    cells: {
      fsaa: { verdict: 'plain', text: 'are features' },
      fsd: { verdict: 'plain', text: 'widgets layer' },
      atomic: { verdict: 'plain', text: 'organisms' },
      bulletproof: { verdict: 'plain', text: 'unspecified' }
    }
  },
  {
    id: 'widgets',
    criterion: 'widgets layer',
    cells: {
      fsaa: { verdict: 'no', text: 'removed', note: 'deliberately' },
      fsd: { verdict: 'mid', text: 'optional', note: 'controversial' },
      atomic: { verdict: 'plain', text: 'n/a' },
      bulletproof: { verdict: 'plain', text: 'n/a' }
    }
  },
  {
    id: 'organisms',
    criterion: 'organisms level',
    cells: {
      fsaa: { verdict: 'no', text: 'does not exist', note: 'becomes a feature' },
      fsd: { verdict: 'plain', text: 'n/a' },
      atomic: { verdict: 'mid', text: 'exists', note: 'becomes a dumping ground' },
      bulletproof: { verdict: 'plain', text: 'n/a' }
    }
  },
  {
    id: 'enforcement',
    criterion: 'Enforced import boundaries',
    cells: {
      fsaa: { verdict: 'mid', text: 'rules + lint planned', note: 'Phase 2–3, not shipped' },
      fsd: { verdict: 'plain', text: 'convention, community lint configs' },
      atomic: { verdict: 'no', text: 'none' },
      bulletproof: { verdict: 'no', text: 'none', note: 'a set of advice, not an architecture' }
    }
  },
  {
    id: 'threshold',
    criterion: 'Entry threshold',
    cells: {
      fsaa: { verdict: 'plain', text: 'low–medium', note: '5 layers, 2 atomic levels' },
      fsd: { verdict: 'mid', text: 'high', note: '7 layers incl. widgets' },
      atomic: { verdict: 'plain', text: 'low' },
      bulletproof: { verdict: 'plain', text: 'low' }
    }
  },
  {
    id: 'what-it-is',
    criterion: 'What it is',
    cells: {
      fsaa: { verdict: 'plain', text: 'methodology + decision rules' },
      fsd: { verdict: 'plain', text: 'methodology' },
      atomic: { verdict: 'plain', text: 'naming taxonomy for UI' },
      bulletproof: { verdict: 'plain', text: 'advice collection' }
    }
  },
  {
    id: 'hybrid',
    criterion: '“Isn’t this just FSD + Atomic?”',
    cells: {
      fsaa: { verdict: 'yes', text: 'Yes — deliberately.', note: 'the value is the missing rules' },
      fsd: { verdict: 'plain', text: '—' },
      atomic: { verdict: 'plain', text: '—' },
      bulletproof: { verdict: 'plain', text: '—' }
    }
  }
];

ts src/entities/method-profile/index.ts
/ entities/method-profile — public API */
export { METHODS, CRITERION_ROWS } from './model/profiles';
export type { CriterionRow, Method, MethodCell, MethodId, Verdict } from './model/types';

ts src/features/code-viewer/model/tokenize.ts
export type Token = { t: string; c?: string };

export type CodeLang = 'tsx' | 'ts' | 'json' | 'tree' | 'text';

const MASTER = new RegExp(
  [
    '(\\/\\/[^\\n]*)',
    '(\\/\\[\\s\\S]?\\*\\/)',
    '("(?:[^"\\\\\\n]|\\\\.)"|\'(?:[^\'\\\\\\n]|\\\\.)\')',
    '\\b(import|export|from|const|let|var|function|return|type|interface|extends|implements|default|as|async|await|new|if|else|for|while|typeof|readonly)\\b',
    '\\b(true|false|null|undefined)\\b',
    '( last) out.push({ t: source.slice(last, match.index) });
    let cls = CLASSES[0];
    for (let group = 1; group  {
    const commentAt = line.indexOf('//');
    const code = commentAt >= 0 ? line.slice(0, commentAt) : line;
    const comment = commentAt >= 0 ? line.slice(commentAt) : '';
    const guides = (TREE_GUIDES.exec(code) ?? [''])[0];
    const rest = code.slice(guides.length);
    const name = rest.trimEnd();

    if (guides) out.push({ t: guides, c: 'tg' });
    if (name) {
      const isDir = name.endsWith('/');
      const isPublicApi = name === 'index.ts';
      out.push({ t: isDir ? name : rest, c: isDir ? 'td' : isPublicApi ? 'tk' : 'tf' });
    }
    if (comment) out.push({ t: comment, c: 'tc' });
    if (lineIndex 
      
        {file}
        {lang}
        
      
      
        
          {tokens.map((token, index) => (
            
              {token.t}
            
          ))}
        
      
    
  );
}

export type CodeViewerProps = { file: string; lang: CodeLang; code: string };

/ Container: owns tokenization, delegates rendering. Same file — export-level split. */
export function CodeViewer({ file, lang, code }: CodeViewerProps) {
  const tokens = tokenize(code, lang);
  return ;
}

tsx src/features/code-viewer/ui/SnippetList.tsx
import type { ReactNode } from 'react';
import { CodeViewer } from './CodeViewer';
import type { CodeLang } from '../model/tokenize';

export type Snippet = { file: string; lang: CodeLang; code: string };

/ Presentational helper: render a sequence of snippets under one heading block. */
export function SnippetList({ snippets, intro }: { snippets: Snippet[]; intro?: ReactNode }) {
  return (
    <>
      {intro}
      {snippets.map((snippet) => (
        
      ))}
    
  );
}

ts src/features/code-viewer/index.ts
/ features/code-viewer — public API */
export { CodeViewer, CodeFrame } from './ui/CodeViewer';
export type { CodeViewerProps, CodeFrameProps } from './ui/CodeViewer';
export { SnippetList } from './ui/SnippetList';
export type { Snippet } from './ui/SnippetList';

tsx src/features/layer-stack-explorer/ui/LayerStackExplorer.tsx
'use client';

import { useState } from 'react';
import { Chip } from '@/shared/ui/atoms';
import { FSAA_LAYERS, getLayerBoundary, type FsaaLayer, type LayerId } from '@/entities/fsaa-layer';

export type LayerStackProps = {
  layers: FsaaLayer[];
  activeId: LayerId;
  onSelect: (id: LayerId) => void;
};

/ Presentational: the visual layered diagram with the import-direction rail. */
export function LayerStack({ layers, activeId, onSelect }: LayerStackProps) {
  return (
    
      
        imports ↓
        
      
      
        {layers.map((layer, index) => (
           onSelect(layer.id)}
            onMouseEnter={() => onSelect(layer.id)}
            onFocus={() => onSelect(layer.id)}
            aria-pressed={layer.id === activeId}
          >
            {index + 1}
            {layer.name}
            {layer.purpose}
            
              imports: {layer.mayImport}
            
          
        ))}
      
    
  );
}

export type LayerBoundaryNoteProps = { activeId: LayerId };

/ Presentational: allowed / forbidden imports for the selected layer. */
export function LayerBoundaryNote({ activeId }: LayerBoundaryNoteProps) {
  const { layer, above, below } = getLayerBoundary(activeId);
  return (
    
      {layer.name} — {layer.purpose}. May import: {layer.mayImport}.{' '}
      forbidden: {above.length ? ↑ ${above.join(', ')} : 'nothing above it'}
      {below.length ?  · sits above: ${below.join(', ')} : ' · lowest layer'}
    
  );
}

/ Container: owns the selection state. */
export function LayerStackExplorer() {
  const [activeId, setActiveId] = useState('features');

  return (
    
      
      
      
        5 layers
        widgets layer removed
        downward imports only
        no layer skipping
        no circular deps
        public API via index.ts
      
    
  );
}

ts src/features/layer-stack-explorer/index.ts
/ features/layer-stack-explorer — public API */
export { LayerStackExplorer, LayerStack, LayerBoundaryNote } from './ui/LayerStackExplorer';
export type { LayerStackProps, LayerBoundaryNoteProps } from './ui/LayerStackExplorer';

ts src/features/docs-sidebar/model/filterNav.ts
import type { NavSection } from '@/entities/docs-page';

/ Pure model logic: filter navigation sections by a query. */
export function filterNav(sections: NavSection[], query: string): NavSection[] {
  const q = query.trim().toLowerCase();
  if (!q) return sections;

  return sections
    .map((section) => ({
      ...section,
      pages: section.pages.filter(
        (page) =>
          page.title.toLowerCase().includes(q) ||
          page.nav.toLowerCase().includes(q) ||
          page.keywords.includes(q) ||
          section.group.toLowerCase().includes(q)
      )
    }))
    .filter((section) => section.pages.length > 0);
}

tsx src/features/docs-sidebar/ui/DocsSidebar.tsx
'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_SECTIONS, getPageNumber, type NavSection } from '@/entities/docs-page';
import { filterNav } from '../model/filterNav';

export type SidebarToggleProps = { open: boolean; onToggle: () => void };

/ Presentational: mobile drawer trigger. */
export function SidebarToggle({ open, onToggle }: SidebarToggleProps) {
  return (
    
      ☰
    
  );
}

export type SidebarNavProps = {
  sections: NavSection[];
  pathname: string;
  query: string;
  onQueryChange: (value: string) => void;
  onNavigate: () => void;
  open: boolean;
};

/ Presentational: search filter + grouped nav links + honest-framing note. */
export function SidebarNav({ sections, pathname, query, onQueryChange, onNavigate, open }: SidebarNavProps) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (event.key === '/' && target?.tagName !== 'INPUT') {
        event.preventDefault();
        document.getElementById('nav-filter')?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  return (
    
      
        
          
          
        
         onQueryChange(event.target.value)}
        />
        /
      

      
        {sections.length === 0 ? (
          No page matches “{query}”.
        ) : (
          sections.map((section) => (
            
              {section.group}
              {section.pages.map((page) => (
                
                  {getPageNumber(page.id)}
                  {page.nav}
                
              ))}
            
          ))
        )}
      

      
        Honest framing. FSAA is an assembly of two proven methods plus the decision rules they omit. Not a new
        theory.
      
    
  );
}

/ Container: owns drawer + filter state, reads the docs registry. */
export function DocsSidebar() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const pathname = usePathname();

  const toggle = useCallback(() => setOpen((value) => !value), []);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    close();
  }, [pathname, close]);

  return (
    <>
      
      {open ?  : null}
      
    
  );
}

ts src/features/docs-sidebar/index.ts
/ features/docs-sidebar — public API */
export { DocsSidebar, SidebarNav, SidebarToggle } from './ui/DocsSidebar';
export type { SidebarNavProps, SidebarToggleProps } from './ui/DocsSidebar';

tsx src/features/docs-toc/ui/DocsToc.tsx
'use client';

import { useEffect, useState } from 'react';
import { useScrollSpy } from '../model/useScrollSpy';

type TocEntry = { id: string; label: string; level: 2 | 3 };

/ Container: collects article headings from the DOM and tracks the active one. */
export function DocsToc() {
  const [entries, setEntries] = useState([]);
  const activeId = useScrollSpy(entries.map((entry) => entry.id));

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll('article h2, article h3'));
    setEntries(
      nodes
        .filter((node) => node.id)
        .map((node) => ({
          id: node.id,
          label: node.textContent?.trim() ?? '',
          level: node.tagName === 'H3' ? 3 : 2
        }))
    );
  }, []);

  if (entries.length 
      On this page
      {entries.map((entry) => (
        
          {entry.label}
        
      ))}
    
  );
}

ts src/features/docs-toc/model/useScrollSpy.ts
'use client';

import { useEffect, useState } from 'react';

/ Feature-local hook: which heading is currently in view. */
export function useScrollSpy(ids: string[]): string {
  const [activeId, setActiveId] = useState(ids[0] ?? '');

  useEffect(() => {
    if (ids.length === 0) return;
    let frame = 0;

    const compute = () => {
      frame = 0;
      let current = ids[0];
      ids.forEach((id) => {
        const node = document.getElementById(id);
        if (node && node.getBoundingClientRect().top  {
      if (frame) return;
      frame = window.requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [ids.join('|')]);

  return activeId;
}

ts src/features/docs-toc/index.ts
/ features/docs-toc — public API */
export { DocsToc } from './ui/DocsToc';

tsx src/features/docs-pager/ui/DocsPager.tsx
import Link from 'next/link';
import { getAdjacentPages, type DocsPageId } from '@/entities/docs-page';

export type DocsPagerProps = { currentId: DocsPageId };

/ Container + presentational in one module: prev/next built from the docs registry. */
export function DocsPager({ currentId }: DocsPagerProps) {
  const { prev, next } = getAdjacentPages(currentId);

  return (
    
      {prev ? (
        
          ← Previous
          {prev.title}
        
      ) : (
        
      )}
      {next ? (
        
          Next →
          {next.title}
        
      ) : (
        
      )}
    
  );
}

ts src/features/docs-pager/index.ts
/ features/docs-pager — public API */
export { DocsPager } from './ui/DocsPager';
export type { DocsPagerProps } from './ui/DocsPager';

tsx src/features/site-header/ui/SiteHeader.tsx
import Link from 'next/link';
import { Pill } from '@/shared/ui/atoms';
import { SITE } from '@/shared/config/site';

/ Presentational: top bar with brand mark and status pills. */
export function SiteHeader() {
  return (
    
      
        
          
          
          
        
        
          {SITE.name}
          {SITE.tagline}
        
      
      
      
        {SITE.version}
        
          {SITE.phaseLabel}
        
        repo link: TODO
      
    
  );
}

ts src/features/site-header/index.ts
/ features/site-header — public API */
export { SiteHeader } from './ui/SiteHeader';

tsx src/features/repo-cta/ui/RepoCta.tsx
import { Button } from '@/shared/ui/atoms';
import { SITE } from '@/shared/config/site';

/
 * NOT shared: this control cannot be described without the project's repository,
 * so the boundary test sends it to a feature. Renders a marked TODO until Phase 0 ships the URL.
 */
export function RepoCta() {
  if (SITE.repoUrl) {
    return (
      
        {SITE.repoLabel}
      
    );
  }

  return (
    
      {SITE.repoLabel} TODO
    
  );
}

ts src/features/repo-cta/index.ts
/ features/repo-cta — public API */
export { RepoCta } from './ui/RepoCta';

tsx src/features/comparison-matrix/config/comparisonColumns.tsx
import type { Column } from '@/shared/ui/molecules';
import { METHODS, type CriterionRow } from '@/entities/method-profile';

const VERDICT_CLASS: Record = {
  yes: 'yes',
  no: 'no',
  mid: 'mid',
  plain: ''
};

/
 * Business configuration (the analogue of projectColumns in the Projects/Orders example):
 * the DataTable molecule stays generic, the method-specific cells live here in the feature.
 */
export const comparisonColumns: Column[] = [
  {
    key: 'criterion',
    header: 'Criterion',
    render: (row) => {row.criterion}
  },
  ...METHODS.map((method) => ({
    key: method.id,
    header: method.label,
    className: method.id === 'fsaa' ? 'fsaa-col' : undefined,
    render: (row: CriterionRow) => {
      const cell = row.cells[method.id];
      return (
        <>
          {cell.text}
          {cell.note ? {cell.note} : null}
        
      );
    }
  }))
];

tsx src/features/comparison-matrix/ui/ComparisonMatrix.tsx
import { DataTable } from '@/shared/ui/molecules';
import { CRITERION_ROWS } from '@/entities/method-profile';
import { comparisonColumns } from '../config/comparisonColumns';

/ Container: wires entity data + feature columns into the generic molecule. */
export function ComparisonMatrix() {
  return (
     row.id}
      caption="FSAA compared with FSD, Atomic Design and Bulletproof React"
    />
  );
}

ts src/features/comparison-matrix/index.ts
/ features/comparison-matrix — public API */
export { ComparisonMatrix } from './ui/ComparisonMatrix';

tsx src/app/layout.tsx
/
 * app layer — providers, global config, global styles.
 * Imports shared only: no features, no entities.
 * Route-level composition (the docs shell) lives in app/(docs)/layout.tsx — that is the pages layer.
 */
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import '@/shared/ui/tokens.css';
import '@/shared/ui/docs-ui.css';
import { SITE } from '@/shared/config/site';

export const metadata: Metadata = {
  title: { default: ${SITE.name} — ${SITE.fullName}, template: %s · ${SITE.name} },
  description:
    'FSAA is FSD + Atomic Design with an answer to the question both leave open: where does UI go? Graduation pattern, boundary test, no organisms.',
  applicationName: SITE.name,
  keywords: ['FSAA', 'Feature-Sliced Atomic Architecture', 'FSD', 'Atomic Design', 'frontend architecture'],
  other: { 'color-scheme': 'dark' }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    
      {children}
    
  );
}

tsx src/app/(docs)/layout.tsx
/
 * pages layer — route-level composition (docs shell).
 * Imports features + shared only; never entities (no layer skipping).
 */
import type { ReactNode } from 'react';
import { SiteHeader } from '@/features/site-header';
import { DocsSidebar } from '@/features/docs-sidebar';
import { DocsToc } from '@/features/docs-toc';
import { SiteFooter } from '@/shared/ui/molecules';

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      
      
        
        
          {children}
          
        
        
      
    
  );
}

tsx src/app/(docs)/page.tsx
import type { Metadata } from 'next';
import { SITE } from '@/shared/config/site';
import { Button, Chip } from '@/shared/ui/atoms';
import { Callout, Card, PageHeader, ProofBadge } from '@/shared/ui/molecules';
import { LayerStackExplorer } from '@/features/layer-stack-explorer';
import { RepoCta } from '@/features/repo-cta';
import { DocsPager } from '@/features/docs-pager';

export const metadata: Metadata = { title: 'Home' };

export default function HomePage() {
  return (
    <>
      

      
        
          Open source
          Methodology + rules
          React-first
          Frontend architecture
        
        
          FSAA is FSD + Atomic Design with an answer to the question both leave open:{' '}
          where does UI go?
        
        
          Read the architecture →
          
            The graduation pattern
          
          
        
      

      The layer stack
      
        Five layers. Imports flow down, never up, never skip. Click or hover a layer to see its allowed and forbidden
        imports.
      
      

      Three things FSAA adds
      
        
          Feature UI lives flat in features/&lt;name&gt;/ui/. It is promoted to{' '}
          shared/ui only after a second feature actually reuses it.
        
        
          One question decides shared vs feature: could the component be described without business vocabulary? Generic
          DataTable passes; projectColumns does not.
        
        
          Large compositions are features, not a UI level. Container/presentational split happens at the export level,
          not in the filesystem.
        
      

      Positioning
      
        “{SITE.positioning}”
      
      
        Proof of use. {SITE.proof}
      

      Where to start
      
        
          Layers, import rules, and where Atomic Design levels actually live.
        
        
          Projects/Orders case study: one generic table, two business features.
        
        
          FSAA vs FSD vs Atomic Design vs Bulletproof React — including “isn’t this just a hybrid?”
        
      

      
    
  );
}

tsx src/app/(docs)/architecture/page.tsx
import type { Metadata } from 'next';
import { PageHeader, Callout } from '@/shared/ui/molecules';
import { DataTable, type Column } from '@/shared/ui/molecules';
import { IMPORT_RULES } from '@/entities/fsaa-layer';
import { LayerStackExplorer } from '@/features/layer-stack-explorer';
import { CodeViewer } from '@/features/code-viewer';
import { DocsPager } from '@/features/docs-pager';

export const metadata: Metadata = { title: 'Architecture' };

type LayerRow = { id: string; responsibility: string; mayImport: string };

const LAYER_ROWS: LayerRow[] = [
  { id: 'app', responsibility: 'router, providers, global config', mayImport: 'shared only' },
  { id: 'pages', responsibility: 'route-level compositions', mayImport: 'features, shared' },
  { id: 'features', responsibility: 'user scenarios and large page blocks', mayImport: 'entities, shared' },
  { id: 'entities', responsibility: 'business models + data access', mayImport: 'shared' },
  { id: 'shared', responsibility: 'design tokens, generic UI, utils', mayImport: 'external libs only' }
];

const layerColumns: Column[] = [
  { key: 'layer', header: 'Layer', className: 'lay', render: (row) => row.id },
  { key: 'responsibility', header: 'Responsibility', render: (row) => row.responsibility },
  { key: 'mayImport', header: 'May import', render: (row) => {row.mayImport} }
];

const ENTITY_API = // entities/project/index.ts — public API of the module
export type { Project, ProjectStatus } from './model/types';
export { projectApi } from './api/projectApi';;

const LINT_INTENT = // .eslintrc.json — the rules this very site is built with (see repo root)
"import/no-restricted-paths": ["error", { "zones": [
  // shared must stay business-free
  { "target": "./src/shared",   "from": ["./src/entities", "./src/features", "./src/app"] },
  // entities: downward imports only
  { "target": "./src/entities", "from": ["./src/features", "./src/app"] },
  // features: never up into the app/pages layer
  { "target": "./src/features", "from": ["./src/app"] },
  // no layer skipping: pages never import entities directly
  { "target": "./src/app",      "from": ["./src/entities"] }
]}];

export default function ArchitecturePage() {
  return (
    <>
      
            Five layers, one direction of dependency, and exactly two Atomic Design levels — both inside{' '}
            shared/ui.
          
        }
      />

      Layer stack
      Top-down dependency order. A layer may import only from the layers listed in its “may import” column.
       row.id} />
      

      
        
          The widgets layer is not part of FSAA. It is the layer FSD users argue about most, and its
          job — “a large block on a page” — is already covered by features.
        
      

      Import rules
      
        {IMPORT_RULES.map((rule) => (
          {rule}
        ))}
      
      
      

      Where Atomic Design lives
      
        Atomic levels exist in exactly one place: inside shared/ui. Two levels, no more.
      
      
        shared/ui/
        
          atoms
          Button · Chip · Pill · StatusBadge · CopyButton
        
        
          molecules
          DataTable · Callout · Card · PageHeader · ProofBadge · SiteFooter
        
        
          organisms
          not part of FSAA — a large composition is a feature
        
      
      
        Inside a feature there is no Atomic Design at all: components sit flat in ui/{' '}
        until they earn promotion. That rule is the graduation pattern.
      

      
        
          The split happens at the export level, not the filesystem level:{' '}
          features/code-viewer/ui/CodeViewer.tsx exports both{' '}
          CodeViewer (container) and CodeFrame{' '}
          (presentational) from one file.
        
      

      
    
  );
}

tsx src/app/(docs)/graduation/page.tsx
import type { Metadata } from 'next';
import { SITE } from '@/shared/config/site';
import { PageHeader } from '@/shared/ui/molecules';
import { DocsPager } from '@/features/docs-pager';

export const metadata: Metadata = { title: 'Graduation Pattern' };

const STAGE_1 = features/projects-overview/ui/
  ProjectsOverview.tsx
  ProjectStatusPill.tsx
  ProjectsToolbar.tsx
  ProjectsEmptyState.tsx;

const STAGE_2 = shared/ui/atoms/StatusPill.tsx   // business-free name + props

features/projects-overview/ui/   → imports it
features/orders-overview/ui/     → imports it;

export default function GraduationPage() {
  return (
    <>
      
            The signature FSAA rule: UI starts feature-local and flat, and is promoted to{' '}
            shared/ui only when a second feature proves it is reusable.
          
        }
      />

      The rule
      
        Feature-local UI lives flat in features/&lt;name&gt;/ui/ —
        typically 5–10 components, with no atoms, no molecules, no Atomic Design vocabulary inside a feature. A
        component is promoted to shared/ui only when it proves reusable
        in another feature, and promotion reorganizes it into an atom or a molecule.
      

      
        
          
            Stage 1Flat, feature-local
          
          {STAGE_1}
          No Atomic levels here. Naming may contain business vocabulary.
        
        
          
            a 2nd feature
            
            needs it
          
          →
          promote
        
        
          
            Stage 2Graduated to shared
          
          {STAGE_2}
          Renamed to drop business words, re-filed as an atom or a molecule.
        
      

      {SITE.graduationMotto}

      Boundary test for shared
      
        “{SITE.boundaryTest}”
        
          
            Yes → shared
            shared/ui/atoms|molecules
          
          
            No → feature
            features/&lt;name&gt;/ui
          
        
        
          
            ✔
            
              A generic DataTable passes — describable with zero business words.
            
          
          
            ✘
            
              projectColumns fails — the name itself says “project”. It stays in the
              feature.
            
          
        
      

      The pattern applied to this site
      
        
          shared/ui/molecules/table/DataTable.tsx is generic (columns, data, rowKey) —
          it passes the boundary test, so it is shared.
        
        
          features/comparison-matrix/config/comparisonColumns.tsx is business
          configuration — it fails the test, so it stays in the feature.
        
        
          features/code-viewer/model/tokenize.ts is used by one feature today. It stays
          flat and feature-local until a second feature needs it.
        
        
          features/repo-cta cannot be described without the project’s repository — not
          shared.
        
      

      No pre-promotion
      
        
          Used by one feature → it stays in that feature. Do not move it “just in case”.
        
        
          Used by two or more → promote, then apply the boundary test to name and place it.
        
        Promotion is a refactor with a diff, not a day-one folder plan.
      

      Why this matters
      
        FSD does not say where UI goes, so teams either duplicate components per feature or dump everything into a
        shared folder on day one. Atomic Design says where UI goes, but says nothing about business logic, so its{' '}
        organisms folder becomes a dumping ground. Graduation resolves both: UI is local by default, shared by
        evidence.
      

      
    
  );
}

tsx src/app/(docs)/example/page.tsx
import type { Metadata } from 'next';
import { SITE } from '@/shared/config/site';
import { Callout, DataTable, PageHeader, type Column } from '@/shared/ui/molecules';
import { CodeViewer } from '@/features/code-viewer';
import { DocsPager } from '@/features/docs-pager';

export const metadata: Metadata = { title: 'Example · Projects/Orders' };

const TREE = src/
├── shared/ui/
│   ├── atoms/
│   │   ├── TableCell.tsx
│   │   └── TableHeaderCell.tsx
│   └── molecules/table/
│       ├── types.ts                   // Column
│       └── DataTable.tsx              // generic: columns, data, isLoading
├── entities/
│   ├── project/                       // data access, types
│   │   └── api/ model/ index.ts
│   └── order/                         // data access, types
│       └── api/ model/ index.ts
├── features/
│   ├── projects-overview/
│   │   ├── config/
│   │   │   └── projectColumns.tsx     // shared atoms + feature actions
│   │   ├── model/
│   │   │   └── useProjects.ts         // wraps entities/project
│   │   ├── ui/
│   │   │   └── ProjectsOverview.tsx   // useProjects + projectColumns + DataTable
│   │   └── index.ts                   // public API
│   └── orders-overview/
│       ├── config/
│       │   └── orderColumns.tsx       // same DataTable, other columns
│       └── model/ ui/ index.ts
└── pages/
    ├── ProjectsPage.tsx               // renders ProjectsOverview
    └── OrdersPage.tsx                 // renders OrdersOverview;

const DATATABLE = // shared/ui/molecules/table/DataTable.tsx
// Generic: columns, data, isLoading. Knows nothing about projects or orders.
import { TableCell } from '../../atoms/TableCell';
import { TableHeaderCell } from '../../atoms/TableHeaderCell';
import type { Column } from './types';

export type DataTableProps = {
  columns: Column[];
  data: T[];
  isLoading: boolean;
};

export function DataTable({ columns, data, isLoading }: DataTableProps) {
  if (isLoading) return Loading…;

  return (
    
      
        
          {columns.map((c) => {c.header})}
        
      
      
        {data.map((row) => (
          
            {columns.map((c) => {c.render(row)})}
          
        ))}
      
    
  );
};

const PROJECT_COLUMNS = // features/projects-overview/config/projectColumns.tsx
// Business columns: shared atoms + feature-owned actions.
import type { Column } from '../../../shared/ui/molecules/table/types';
import type { Project } from '../../../entities/project';

export const projectColumns: Column[] = [
  { key: 'name',   header: 'Project',     render: (p) => p.name },
  { key: 'orders', header: 'Open orders', render: (p) => p.ordersCount },
  { key: 'status', header: 'Status',      render: (p) => p.status },
];;

const OVERVIEW = // features/projects-overview/ui/ProjectsOverview.tsx
import { DataTable } from '../../../shared/ui/molecules/table/DataTable';
import { useProjects } from '../model/useProjects';
import { projectColumns } from '../config/projectColumns';

export function ProjectsOverview() {
  const { data, isLoading } = useProjects();

  return ;
};

const FEATURE_API = // features/projects-overview/index.ts — the only public surface
export { ProjectsOverview } from './ui/ProjectsOverview';;

const PAGE = // pages/ProjectsPage.tsx
import { ProjectsOverview } from '../features/projects-overview';

export function ProjectsPage() {
  return ;
};

type TraceRow = { id: string; from: string; imports: string; rule: string };

const TRACE_ROWS: TraceRow[] = [
  { id: '1', from: 'pages/ProjectsPage', imports: 'features/projects-overview', rule: 'pages → features, via public API' },
  { id: '2', from: 'features/projects-overview', imports: 'entities/project, shared/ui', rule: 'features → entities, shared' },
  { id: '3', from: 'features/orders-overview', imports: 'entities/order, shared/ui', rule: 'no dependency on the other feature' },
  { id: '4', from: 'shared/ui/molecules/table', imports: 'shared/ui/atoms', rule: 'shared stays business-free' },
  { id: '5', from: 'entities/project', imports: 'shared only', rule: 'never imports features or pages' }
];

const traceColumns: Column[] = [
  { key: 'from', header: 'From', className: 'lay', render: (row) => row.from },
  { key: 'imports', header: 'Imports', render: (row) => row.imports },
  { key: 'rule', header: 'Rule satisfied', render: (row) => row.rule }
];

export default function ExamplePage() {
  return (
    <>
      

      File tree
      
        One DataTable molecule in shared/ui, consumed by
        two independent features with different business columns.
      
      

      
        “{SITE.keyExampleRule}”
      

      shared — the generic molecule
      

      features — the business configuration
      
      
      

      pages — route-level composition
      

      Import trace
       row.id} />
      
        orderColumns.tsx differs from{' '}
        projectColumns.tsx in content only — the visual pattern, the table, is already
        shared.
      

      
        
          This docs site is built the same way: shared/ui/molecules/table/DataTable.tsx{' '}
          is generic, while features/comparison-matrix/config/comparisonColumns.tsx{' '}
          holds the business configuration for the Comparison page.
        
      

      
    
  );
}

tsx src/app/(docs)/comparison/page.tsx
import type { Metadata } from 'next';
import { SITE } from '@/shared/config/site';
import { Callout, PageHeader } from '@/shared/ui/molecules';
import { ComparisonMatrix } from '@/features/comparison-matrix';
import { DocsPager } from '@/features/docs-pager';

export const metadata: Metadata = { title: 'Comparison' };

export default function ComparisonPage() {
  return (
    <>
      

      FSAA vs FSD vs Atomic Design vs Bulletproof React
      

      The hybrid question, answered openly
      
        {SITE.hybridAnswer}
      

      What FSAA takes from each
      
        
          
            
            Taken from FSD
          
          
            Layered slices with downward-only imports
            
              entities / features /{' '}
              pages split
            
            
              Public API per module (index.ts)
            
          
        
        
          
            
            Taken from Atomic Design
          
          
            
              atoms and molecules — inside shared/ui only
            
            Shared vocabulary for generic, reusable UI
            Dropped: organisms, and pre-planned sharing
          
        
      

      
    
  );
}

tsx src/app/(docs)/adoption/page.tsx
import type { Metadata } from 'next';
import { Callout, Chip, PageHeader } from '@/shared/ui/molecules';
import { Chip as ChipAtom } from '@/shared/ui/atoms';
import { DocsPager } from '@/features/docs-pager';

export const metadata: Metadata = { title: 'Adoption' };

export default function AdoptionPage() {
  return (
    <>
      

      Scope
      
        medium+ projects
        teams of 3+
        long-lived codebases
        React / TS frontends
      
      FSAA is built for codebases that outlive their first release and are read by more people than wrote them.

      Use / don’t use
      
        
          
            
            Use FSAA when
          
          
            Several business entities share visual patterns (tables, lists, forms)
            3+ engineers touch the same folders weekly
            Arguments about “where does this component go” recur
            The app will be maintained for years, not weeks
            You already like FSD but keep improvising on UI placement
          
        
        
          
            
            Skip FSAA when
          
          
            Small projects and single-screen tools
            Throwaway prototypes, hackathons, demos
            Solo work with a lifespan under a few months
            The team has no appetite for import rules or lint setup
          
        
      

      
        
          Layer rules are cheap to state and expensive to enforce without tooling. Until the Phase 2 boilerplate and
          Phase 3 import checker ship, enforcement is lint plus code review — factor that in.
        
      

      Migration notes
      Incremental, folder by folder. No big-bang rewrite.
      
        
          Create the five layer roots (app, pages,{' '}
          features, entities,{' '}
          shared) next to the existing structure. Leave old folders in place.
        
        
          
            Move generic UI into shared/ui
          {' '}
          as atoms and molecules. Apply the boundary test to every candidate; anything needing business words stays out.
        
        
          
            Move large page blocks into features
          
          . Whatever sits in organisms-style folders becomes a feature with a flat ui/.
        
        
          
            Add index.ts public APIs
          {' '}
          to every module and replace deep imports with public-API imports.
        
        
          Migrate one route at a time: page → its features → their entities. Ship each route separately.
        
        
          Turn on lint enforcement — see .eslintrc.json in this repository for a
          working zone configuration.
        
      

      Review checklist
      
        Does the import point downward, with no skipped layer?
        
          Is the new component in shared describable without business vocabulary?
        
        Is feature UI flat, with no atoms/molecules folders inside a feature?
        
          Does the module expose only its index.ts?
        
        Is any large block modelled as a feature rather than an “organism”?
      

      Tip: run lint in CI from day one — the rules are only real if they fail the build.

      
    
  );
}

tsx src/app/(docs)/roadmap/page.tsx
import type { Metadata } from 'next';
import { SITE } from '@/shared/config/site';
import { StatusBadge } from '@/shared/ui/atoms';
import { DataTable, PageHeader, ProofBadge, type Column } from '@/shared/ui/molecules';
import { RepoCta } from '@/features/repo-cta';
import { DocsPager } from '@/features/docs-pager';
import { Button } from '@/shared/ui/atoms';

export const metadata: Metadata = { title: 'Roadmap' };

type Phase = { id: string; phase: string; title: string; detail: string; status: 'In progress' | 'Planned' };

const PHASES: Phase[] = [
  { id: '0', phase: 'Phase 0', title: 'Repository + README', detail: 'Public repo skeleton, canonical definitions, this content as source of truth.', status: 'In progress' },
  { id: '1', phase: 'Phase 1', title: 'Documentation site', detail: 'Architecture, graduation pattern, example, comparison, adoption — the pages you are reading.', status: 'In progress' },
  { id: '2', phase: 'Phase 2', title: 'Boilerplate: Vite + React + TS', detail: 'Starter template with ESLint import enforcement for the five layers and the public-API rule.', status: 'Planned' },
  { id: '3', phase: 'Phase 3', title: 'Architecture import checker + CI', detail: 'Standalone checker for downward-only imports and layer skipping, wired into CI as a failing check.', status: 'Planned' },
  { id: '4', phase: 'Phase 4', title: 'Promotion', detail: 'Public release, write-ups, talks, community feedback loop.', status: 'Planned' }
];

type GapRow = { id: string; item: string; verdict: 'mid' | 'no'; status: string; note: string };

const GAP_ROWS: GapRow[] = [
  { id: 'repo', item: 'Public repository URL', verdict: 'mid', status: 'TODO', note: 'Placeholder on this site until Phase 0 publishes the repo.' },
  { id: 'lint', item: 'Lint config', verdict: 'mid', status: 'Draft', note: 'A working zone config ships with this site; the packaged preset is Phase 2.' },
  { id: 'checker', item: 'Import checker', verdict: 'mid', status: 'Planned', note: 'Phase 3 — standalone CI check does not exist yet.' },
  { id: 'adapters', item: 'Non-React adapters', verdict: 'no', status: 'Out of scope', note: 'FSAA is React-first; layer rules are framework-agnostic, tooling is not.' }
];

const gapColumns: Column[] = [
  { key: 'item', header: 'Item', render: (row) => {row.item} },
  { key: 'status', header: 'Status', render: (row) => {row.status} },
  { key: 'note', header: 'Note', render: (row) => row.note }
];

export default function RoadmapPage() {
  return (
    <>
      

      Phases
      {PHASES.map((phase) => (
        
          {phase.phase}
          
            {phase.title}
            {phase.detail}
          
          {phase.status}
        
      ))}

      Proof badge
      
        Used in production {SITE.proof.replace('Used in production', '').replace(/^ on/, 'on')}
      

      Known gaps
       row.id} />

      Contribute
      
        Feedback channels open with the Phase 0 repository. Until then the canonical definitions live in this
        documentation; nothing here is marketing copy, and claims are kept to what is actually shipped.
      
      
        
        
          Read the comparison →
        
      

      
    
  );
}

tsx src/app/(docs)/not-found.tsx
import { Button } from '@/shared/ui/atoms';

export default function NotFound() {
  return (
    <>
      Error · FSAA docs
      404 — page not found
      
        This route is not in the docs registry. Imports only flow downward; links only flow to real pages.
      
      
        Back to Home
        
          Architecture
        
      
    
  );
}

markdown README.md
FSAA — documentation site

Docs site for FSAA (Feature-Sliced Atomic Architecture), built with FSAA itself: Next.js (App Router, TypeScript,
static export) sliced into the five layers.

FSAA is FSD + Atomic Design with an answer to the question both leave open: where does UI go?
FSAA is not a new architecture theory — it is an opinionated assembly of two proven methods plus the missing
decision rules. No revolution claimed.

Run
bash
npm install
npm run dev        # http://localhost:3000

Build & deploy (static, one command)
bash
npm run build      # output: 'export' → ./out
npx netlify deploy --prod --dir=out     # Netlify
npx gh-pages -d out                     # GitHub Pages
npx wrangler pages deploy out           # Cloudflare Pages

No trackers, no analytics, no client-side data fetching. Fonts: fontsource CDN with system fallback.

Layer mapping (Next.js App Router → FSAA)

| FSAA layer | Where it lives here                                              | May import              |
| ---------- | ---------------------------------------------------------------- | ----------------------- |
| app      | src/app/layout.tsx (root layout, metadata, global CSS)         | shared only           |
| pages    | src/app/(docs)/layout.tsx + src/app/(docs)//page.tsx        | features, shared    |
| features | src/features/*                                                  | entities, shared    |
| entities | src/entities/*                                                  | shared                |
| shared   | src/shared/*                                                    | external libs only      |

widgets layer: removed. organisms level: does not exist — large compositions are features.
Atomic levels (atoms, molecules) live only in src/shared/ui/.

Structure

src/
├── app/                                   # app layer (root) + pages layer (routes)
│   ├── layout.tsx                         # providers, metadata, global styles — imports shared only
│   └── (docs)/
│       ├── layout.tsx                     # pages layer: docs shell = header + sidebar + content + toc
│       ├── page.tsx                       # Home
│       ├── architecture/page.tsx
│       ├── graduation/page.tsx
│       ├── example/page.tsx
│       ├── comparison/page.tsx
│       ├── adoption/page.tsx
│       ├── roadmap/page.tsx
│       └── not-found.tsx
├── entities/                              # business models + data access (imports shared only)
│   ├── docs-page/                         # page registry: nav sections, prev/next, crumbs
│   ├── fsaa-layer/                        # the canonical layer stack + boundary derivation
│   ├── method-profile/                    # FSAA/FSD/Atomic/Bulletproof comparison data
│   └── */index.ts                         # public API of each module
├── features/                              # user scenarios AND large page blocks (flat ui/)
│   ├── site-header/ui/SiteHeader.tsx
│   ├── docs-sidebar/{ui,model}/           # drawer + filter + grouped nav
│   ├── docs-toc/{ui,model}/               # on-this-page scroll spy
│   ├── docs-pager/ui/DocsPager.tsx        # prev/next from the registry
│   ├── layer-stack-explorer/ui/           # interactive layer diagram
│   ├── code-viewer/{ui,model}/            # snippet frame + tokenizer (feature-local logic)
│   ├── comparison-matrix/{ui,config}/     # business columns for the generic DataTable
│   ├── repo-cta/ui/RepoCta.tsx            # not shared: fails the boundary test
│   └── */index.ts                         # public API of each module
└── shared/
    ├── config/site.ts                     # canonical copy, version, repo URL (null = TODO)
    ├── lib/cn.ts
    └── ui/
        ├── fonts.css  tokens.css  docs-ui.css   # design tokens + generic styles
        ├── atoms/                         # Button, Chip, Pill, StatusBadge, CopyButton
        └── molecules/                     # DataTable (+ types), Callout, Card, PageHeader, ProofBadge, SiteFooter

FSAA decisions visible in this repo

Graduation pattern. features/code-viewer/model/tokenize.ts is used by one feature → it stays flat and
  feature-local. DataTable is reused by two pages (Architecture, Example, Comparison, Roadmap) through
  features/comparison-matrix → it lives in shared/ui/molecules.
Boundary test. DataTable is describable without business words → shared. comparisonColumns says “method /
  criterion” → stays in the feature. RepoCta cannot be described without the project’s repo → feature, not shared.
No organisms. SiteHeader, DocsSidebar, DocsToc, ComparisonMatrix are large compositions modelled as
  features, not as a UI level.
Export-level container/presentational split. features/code-viewer/ui/CodeViewer.tsx exports CodeViewer
  (container) and CodeFrame (presentational); features/docs-sidebar/ui/DocsSidebar.tsx exports DocsSidebar,
  SidebarNav, SidebarToggle; features/layer-stack-explorer/ui/LayerStackExplorer.tsx exports the container plus
  LayerStack and LayerBoundaryNote.
Public API per module. Every entity and feature exposes index.ts; pages import @/features/, never
  @/features//ui/.
No cross-feature imports. The mobile drawer state lives inside docs-sidebar (its own fixed toggle + overlay), so
  site-header does not need to know about it.

Lint enforcement

.eslintrc.json encodes the import rules with import/no-restricted-paths zones (shared ← nothing, entities ←
features/app, features ← app, app ← entities) plus no-restricted-imports patterns that block deep imports into module
internals and cross-feature imports.
bash
npm run lint
npm run typecheck

TODO (Phase 0)

Replace SITE.repoUrl (src/shared/config/site.ts, currently null) with the real repository URL — the UI renders a
  dashed TODO control instead of a dead link until then.
Package the ESLint preset (eslint-config-fsaa) — Phase 2.
Standalone import checker for CI — Phase 3.

Proof

Used in production on an internal financial accounting tool with real daily users (managers, director, accounting).

text .gitignore
node_modules
.next
out
build
.DS_Store
*.pem
npm-debug.log*
.env*.local
.vercel
next-env.d.ts
.tsbuildinfo