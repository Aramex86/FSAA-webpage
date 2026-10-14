/* Entity method-profile — types for comparing methodologies on shared criteria. */

export type MethodId = 'fsaa' | 'fsd' | 'atomic' | 'bulletproof';

export type Verdict = 'yes' | 'no' | 'mid' | 'plain';

export type MethodCell = {
  verdict: Verdict;
  text: string;
  note?: string;
};

export type Method = {
  id: MethodId;
  label: string;
};

export type CriterionRow = {
  id: string;
  criterion: string;
  cells: Record<MethodId, MethodCell>;
};