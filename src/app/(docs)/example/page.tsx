import { Callout, DataTable, PageHeader } from '@/shared/ui/molecules';
import type { Column } from '@/shared/ui/molecules';
import { CodeViewer } from '@/features/code-viewer';
import { DocsPager } from '@/features/docs-pager';
import { SITE, docPageMetadata } from '@/shared/config/site';
import { crumbFor } from '@/features/docs-registry';

const TREE = `src/
├─ features/
│  ├─ accounting-columns/  // business configuration for the table
│  │  ├─ index.ts
│  │  ├─ config/           // columns — plain data, testable
│  │  │  ├─ projectColumns.tsx
│  │  │  └─ overviewColumns.tsx
│  │  ├─ ui/               // slice components (no fetch, no business logic)
│  │  └─ __tests__/        // logic-level tests — never empty on commit
│  └─ accounting-table/    // page block: composition of the generic table
│     ├─ index.ts
│     └─ ui/AccountingTable.tsx
├─ entities/
│  ├─ account/
│  │  ├─ index.ts
│  │  └─ account.ts        // type + data access — ALL business logic lives here
│  └─ posting/
│     ├─ index.ts
│     └─ posting.ts        // may grow api.ts / slice.ts / types.ts when needed
└─ shared/
   ├─ ui/molecules/table/  // generic DataTable (graduated)
   └─ config/              // design tokens config
app/
├─ layout.tsx              // shell only — root layout
└─ accounting/page.tsx     // thin route: import → render → Suspense`;

const DATATABLE = `// shared/ui/molecules/table — generic, domain-free
export type Column<T> = {
  header: string;
  render: (row: T) => ReactNode;
  className?: string;
};

export function DataTable<T>(props: {
  columns: Column<T>[];
  data: T[];
  rowKey: (row: T) => string;
  caption?: string;
}) {
  // one generic table for the whole app — used by 2 pages + 1 feature
}`;

const PROJECT_COLUMNS = `// features/accounting-columns/config/projectColumns.tsx
// FEATURE CONFIG = business configuration. It knows Account, Posting, money.
import { DataTable } from '@/shared/ui/molecules';

export const projectColumns: Column<AccountRow>[] = [
  { header: 'Account', render: (r) => r.code },
  { header: 'Period',  render: (r) => r.period },
  { header: 'Amount',  render: (r) => formatMoney(r.amount) },
];`;

const OVERVIEW = `// features/accounting-columns/config/overviewColumns.tsx — overview variant
export const overviewColumns: Column<AccountRow>[] = [
  { header: 'Account', render: (r) => r.code },
  { header: 'Total',   render: (r) => formatMoney(r.sum) },
];`;

const FEATURE_API = `// features/accounting-table — page block, composition only
export { AccountingTable } from './ui/AccountingTable';

// ui/AccountingTable.tsx picks WHICH column set to render:
//   <DataTable columns={props.mode === 'overview' ? overviewColumns : projectColumns} />
// Business logic and data access live in entities — this feature is pure composition.`;

const PAGE = `// app/accounting/page.tsx — thin route: import → render → Suspense
import { AccountingTable } from '@/features/accounting-table';

export const metadata = { title: 'Accounting' };

export default function AccountingPage() {
  return (
    <>
      <h1>Accounting</h1>
      <AccountingTable mode="full" />
    </>
  );
}`;

type TraceRow = {
  id: string;
  step: string;
  unit: string;
  imports: string;
};

const TRACE_ROWS: TraceRow[] = [
  { id: 'page', step: '01', unit: 'app/accounting/page.tsx', imports: 'features/accounting-table (public API)' },
  { id: 'feature', step: '02', unit: 'features/accounting-table', imports: 'features/accounting-columns (public API), shared/ui/molecules' },
  { id: 'config', step: '03', unit: 'features/accounting-columns/config', imports: 'shared/ui/molecules (Column type)' },
  { id: 'molecule', step: '04', unit: 'shared/ui/molecules/table', imports: 'nothing project-level' },
];

const traceColumns: Column<TraceRow>[] = [
  { header: '#', render: (row) => row.step, cellClassName: () => 'lay' },
  { header: 'Unit', render: (row) => row.unit },
  { header: 'Imports', render: (row) => row.imports },
];

export const metadata = docPageMetadata({
  title: 'Worked example: generic DataTable in shared, business columns in features',
  description:
    'A worked accounting-table example: the DataTable stays generic in shared, business columns live in feature config, all business logic in entities.',
  slug: '/example',
});

export default function ExamplePage() {
  return (
    <>
      <PageHeader
        crumb={crumbFor('example')}
        title="Worked example — accounting table"
        lede="One real module from the production tool: a financial accounting table, sliced end to end."
      />

      <h2 id="file-tree">File tree</h2>
      <CodeViewer file="src/" lang="tree" code={TREE} />
      <Callout tone="quote" label="Key rule">{SITE.keyExampleRule}</Callout>

      <h2 id="shared-table">shared — the generic molecule</h2>
      <p>
        The table itself is domain-free. It graduated early because several pages and features
        render tabular data.
      </p>
      <CodeViewer file="shared/ui/molecules/table/types.ts" lang="ts" code={DATATABLE} />

      <h2 id="feature-columns">features — the business configuration</h2>
      <p>
        Column definitions know money, accounts and periods — that is why they are a feature,
        not a shared molecule.
      </p>
      <CodeViewer file="features/accounting-columns/config/projectColumns.tsx" lang="tsx" code={PROJECT_COLUMNS} />
      <CodeViewer file="features/accounting-columns/config/overviewColumns.tsx" lang="tsx" code={OVERVIEW} />
      <CodeViewer file="features/accounting-table/index.ts" lang="ts" code={FEATURE_API} />

      <h2 id="pages-composition">app/ — thin route composition</h2>
      <CodeViewer file="app/accounting/page.tsx" lang="tsx" code={PAGE} />

      <h2 id="import-trace">Import trace</h2>
      <DataTable columns={traceColumns} data={TRACE_ROWS} rowKey={(row) => row.id} caption="Who imports whom" />

      <Callout tone="rule" label="Direction">
        Every arrow points downward. <code>orderColumns</code> vs <code>projectColumns</code> is
        configuration inside the feature — the shared molecule never learns about either.
      </Callout>

      <Callout label="Cross-check">
        This example is the graduation pattern in action: the DataTable left a feature only after
        the second consumer appeared.
      </Callout>

      <DocsPager current="example" />
    </>
  );
}