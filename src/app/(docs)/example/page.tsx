import { Callout, DataTable, PageHeader } from '@/shared/ui/molecules';
import type { Column } from '@/shared/ui/molecules';
import { CodeViewer } from '@/features/code-viewer';
import { DocsPager } from '@/features/docs-pager';
import { SITE } from '@/shared/config/site';
import { crumbFor } from '@/features/docs-registry';

const TREE = `src/
├─ app/                    // routing + global layout
│  └─ layout.tsx
├─ pages/                  // route-level composition
│  └─ accounting/
│     ├─ index.ts
│     └─ AccountingPage.tsx
├─ features/
│  ├─ accounting-columns/  // business configuration for the table
│  │  ├─ index.ts
│  │  └─ ui/projectColumns.tsx
│  └─ accounting-table/    // page block: ui + model + api
│     ├─ index.ts
│     ├─ ui/AccountingTable.tsx
│     ├─ model/selectors.ts
│     └─ api/accountsApi.ts
├─ entities/
│  ├─ account/
│  │  ├─ index.ts
│  │  ├─ model/types.ts
│  │  └─ model/accounts.ts
│  └─ posting/
│     ├─ index.ts
│     └─ model/types.ts
└─ shared/
   ├─ ui/molecules/table/  // generic DataTable (graduated)
   ├─ config/              // design tokens config
   └─ lib/                 // cn(), formatting utils`;

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

const PROJECT_COLUMNS = `// features/accounting-columns/ui/projectColumns.tsx
// FEATURE = business configuration. It knows Account, Posting, money.
import { DataTable } from '@/shared/ui/molecules';

export const projectColumns: Column<AccountRow>[] = [
  { header: 'Account', render: (r) => r.code },
  { header: 'Period',  render: (r) => r.period },
  { header: 'Amount',  render: (r) => formatMoney(r.amount) },
];`;

const OVERVIEW = `// features/accounting-columns — same generic columns, overview variant
export const overviewColumns: Column<AccountRow>[] = [
  { header: 'Account', render: (r) => r.code },
  { header: 'Total',   render: (r) => formatMoney(r.sum) },
];`;

const FEATURE_API = `// features/accounting-table — page block owning data + composition
export { AccountingTable } from './ui/AccountingTable';

// ui/AccountingTable.tsx picks WHICH column set to render:
//   <DataTable columns={props.mode === 'overview' ? overviewColumns : projectColumns} />
// The project never configures its own columns.`;

const PAGE = `// pages/accounting/AccountingPage.tsx — composition only
import { AccountingTable } from '@/features/accounting-table';

export function AccountingPage() {
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
  { id: 'page', step: '01', unit: 'pages/accounting', imports: 'features/accounting-table' },
  { id: 'feature', step: '02', unit: 'features/accounting-table', imports: 'features/accounting-columns (public API), shared/ui/molecules' },
  { id: 'config', step: '03', unit: 'features/accounting-columns', imports: 'shared/ui/molecules (Column type)' },
  { id: 'molecule', step: '04', unit: 'shared/ui/molecules/table', imports: 'nothing project-level' },
];

const traceColumns: Column<TraceRow>[] = [
  { header: '#', render: (row) => row.step, cellClassName: () => 'lay' },
  { header: 'Unit', render: (row) => row.unit },
  { header: 'Imports', render: (row) => row.imports },
];

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
      <CodeViewer file="features/accounting-columns/ui/projectColumns.tsx" lang="tsx" code={PROJECT_COLUMNS} />
      <CodeViewer file="features/accounting-columns/ui/overviewColumns.tsx" lang="tsx" code={OVERVIEW} />
      <CodeViewer file="features/accounting-table/index.ts" lang="ts" code={FEATURE_API} />

      <h2 id="pages-composition">pages — route-level composition</h2>
      <CodeViewer file="pages/accounting/AccountingPage.tsx" lang="tsx" code={PAGE} />

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