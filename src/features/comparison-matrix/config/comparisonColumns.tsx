import { CRITERION_ROWS, METHODS } from '@/entities/method-profile';
import type { CriterionRow, MethodId, Verdict } from '@/entities/method-profile';
import type { Column } from '@/shared/ui/molecules';

/* Verdict → CSS class mapping for colored cells. */
export const VERDICT_CLASS: Record<Verdict, string | ''> = {
  yes: 'yes',
  no: 'no',
  mid: 'mid',
  plain: '',
};

/* Feature comparison-matrix — columns for the methodology comparison. */

export const comparisonColumns: Column<CriterionRow>[] = [
  {
    header: 'Criterion',
    render: (row) => row.criterion,
  },
  ...METHODS.map<Column<CriterionRow>>((method) => ({
    header: method.label,
    className: method.id === 'fsaa' ? 'fsaa-col' : undefined,
    render: (row) => {
      const cell = row.cells[method.id as MethodId];
      return (
        <span className={VERDICT_CLASS[cell.verdict]}>
          {cell.text}
          {cell.note ? <small>{cell.note}</small> : null}
        </span>
      );
    },
  })),
];