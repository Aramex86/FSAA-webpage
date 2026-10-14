import { DataTable } from '@/shared/ui/molecules';
import { CRITERION_ROWS } from '@/entities/method-profile';
import { comparisonColumns } from '../config/comparisonColumns';

/* Feature comparison-matrix — FSAA vs FSD vs Atomic Design vs Bulletproof React. */

export function ComparisonMatrix() {
  return (
    <DataTable
      columns={comparisonColumns}
      data={CRITERION_ROWS}
      rowKey={(row) => row.id}
      caption="FSAA compared with FSD, Atomic Design and Bulletproof React"
    />
  );
}