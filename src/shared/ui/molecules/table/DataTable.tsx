import type { ReactNode } from 'react';
import type { Column } from './types';

/* Molecule — generic data table. Knows rows/columns, nothing about a domain. */

type DataTableProps<T> = {
  columns: Column<T>[];
  data: T[];
  rowKey: (row: T) => string;
  caption?: string;
  emptyLabel?: string;
};

export function DataTable<T>({
  columns,
  data,
  rowKey,
  caption,
  emptyLabel = 'No rows.',
}: DataTableProps<T>): ReactNode {
  return (
    <div className="table-wrap">
      <table className="dt">
        {caption ? <caption className="table-caption">{caption}</caption> : null}
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.header} className={col.className}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length}>{emptyLabel}</td>
            </tr>
          ) : (
            data.map((row) => (
              <tr key={rowKey(row)}>
                {columns.map((col) => (
                  <td
                    key={col.header}
                    className={typeof col.cellClassName === 'function' ? col.cellClassName(row) : undefined}
                  >
                    {col.render(row)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}