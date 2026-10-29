import { Callout, DataTable, PageHeader } from '@/shared/ui/molecules';
import type { Column } from '@/shared/ui/molecules';
import { CodeViewer } from '@/features/code-viewer';
import { DocsPager } from '@/features/docs-pager';
import { crumbFor } from '@/features/docs-registry';
import { docPageMetadata } from '@/shared/config/site';
import { INIT_GREEN, G_OUT, NO_TTY, COMMANDS, type CommandRow } from '@/features/docs-cli';

export const metadata = docPageMetadata({
  title: 'FSAA CLI: npm create fsaa@latest',
  description:
    'The FSAA CLI scaffolds an app from the official starter templates in one command: npm create fsaa@latest. Zero dependencies, contract drift-check as init proof, and fsaa g to generate canonical slices.',
  slug: '/cli',
});

type Row = CommandRow;

const columns: Column<Row>[] = [
  { header: 'Command', render: (row) => row.cmd },
  { header: 'What it does', render: (row) => row.what },
];

export default function CliPage() {
  return (
    <>
      <PageHeader
        crumb={crumbFor('cli')}
        title="CLI — one command to an FSAA app"
        lede="npm create fsaa@latest downloads an official starter, renames it to your project, installs dependencies with pnpm, and ends with a green contract drift-check as proof. Zero runtime dependencies — plain Node 20+."
      />

      <h2 id="commands">The commands</h2>
      <p>
        The package on npm is <code>create-fsaa</code>, so the standard <code>npm create fsaa</code>{' '}
        convention works. The binary inside is just <code>fsaa</code>.
      </p>
      <DataTable columns={columns} data={COMMANDS} rowKey={(row) => row.cmd} caption="create-fsaa — every command" />

      <h2 id="init">What init does, end to end</h2>
      <p>
        A real run (captured live, template <code>vite</code>):
      </p>
      <CodeViewer file="npm create fsaa@latest — a real run" lang="text" code={INIT_GREEN} copyText="npm create fsaa@latest" />

      <p>
        The final step is the agent contract itself: <code>AGENTS.md</code> is verified against the
        freshly unpacked code before the CLI reports success — a scaffold cannot lie. The code
        checks run through <code>eslint-plugin-fsaa</code> — the same npm rules the scaffold wires
        into <code>eslint.config.mjs</code>, so the contract and your linter share one
        implementation from day one.
      </p>

      <h2 id="g">fsaa g — generate a canonical slice</h2>
      <p>
        Inside a scaffolded project, one command produces the entity + feature pair exactly per{' '}
        <code>agents/add-module.md</code>: index, types, api, slice, tests — and the thin route file:
      </p>
      <CodeViewer file="fsaa g checkout-report — real output" lang="text" code={G_OUT} copyText="fsaa g checkout-report" />

      <h2 id="no-tty">Scripts and CI — no prompts, no hanging</h2>
      <p>
        When the CLI runs from a script, there is no keyboard. So it does not wait: missing
        answers fall back to defaults (<code>my-app</code>, template <code>next</code>) — and it
        says so in the log, once:
      </p>
      <CodeViewer file="npm create fsaa@latest -- init --name ci-app --template vite" lang="text" code={NO_TTY} copyText="npm create fsaa@latest -- init --name ci-app --template vite" />
      <p>
        Note the <code>--</code> after <code>npm create fsaa@latest</code>: everything after it goes
        into the CLI itself (npm&rsquo;s separator, same as <code>npm create vite</code>). For
        deterministic pipelines pin BOTH values explicitly; the run ends with the same green
        drift-check as an interactive one.
      </p>

      <h2 id="birth">The name — as it actually happened</h2>
      <Callout tone="quote" label="npm renamed us before we shipped">
        The package was built as <code>fsaa</code> — and npm rejected the name at publish time with a
        403: &ldquo;Package name too similar to existing packages (fs, flat, gsap, …).&rdquo; The
        typosquat-protection policy cannot be argued with, so the industry convention solved it:{' '}
        <code>create-fsaa</code>, which makes <code>npm create fsaa</code> work. Same day the first
        published version crashed on load (a backtick inside a template-literal) — fixed in the next
        release within an hour, and the whole story is this section. Working docs: real failures ship.
      </Callout>

      <h2 id="verify">Verify</h2>
      <p>Scaffolds prove themselves — run the same battery any time:</p>
      <ol>
        <li><code>pnpm lint</code> · <code>pnpm typecheck</code> · <code>pnpm test</code></li>
        <li><code>node scripts/check-agents-md.mjs</code> — 12 rules green (code checks via eslint-plugin-fsaa)</li>
      </ol>

      <DocsPager current="cli" />
    </>
  );
}