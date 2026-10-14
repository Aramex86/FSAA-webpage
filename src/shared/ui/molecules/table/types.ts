import type { ReactNode } from 'react';

/* Generic column definition for DataTable. `render` returns a React node per row. */

export type Column<T> = {
  header: string;
  render: (row: T) => ReactNode;
  className?: string;
  cellClassName?: (row: T) => string | undefined;
};