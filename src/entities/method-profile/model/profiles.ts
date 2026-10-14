/* Entity method-profile — methodology profiles scored on shared criteria. */

import type { CriterionRow, Method, MethodId } from './types';

export const METHODS: Method[] = [
  { id: 'fsaa', label: 'FSAA' },
  { id: 'fsd', label: 'FSD' },
  { id: 'atomic', label: 'Atomic Design' },
  { id: 'bulletproof', label: 'Bulletproof React' },
];

type Cell = CriterionRow['cells'][MethodId];

const uiPlacement = (text: string, note?: string): Cell => ({ verdict: 'mid', text, note });
const logicPlacement = (text: string, note?: string): Cell => ({ verdict: 'plain', text, note });
const midCell = (text: string, note?: string): Cell => ({ verdict: 'mid', text, note });
const lowCell = (text: string, note?: string): Cell => ({ verdict: 'plain', text, note });
const yesCell = (text: string, note?: string): Cell => ({ verdict: 'yes', text, note });
const noCell = (text: string, note?: string): Cell => ({ verdict: 'no', text, note });

export const CRITERION_ROWS: CriterionRow[] = [
  {
    id: 'ui-placement',
    criterion: 'Where reusable UI lives',
    cells: {
      fsaa: { verdict: 'yes', text: 'shared/ui for earned UI; feature ui/ until then' },
      fsd: uiPlacement('shared/ui for everything reusable', 'Debates where widgets vs features ui live'),
      atomic: uiPlacement('atoms/molecules/organisms folders', 'Placement follows atom size, not reuse reality'),
      bulletproof: uiPlacement('components/ folder by type', 'Flat, grows heavy in big apps'),
    },
  },
  {
    id: 'business-logic',
    criterion: 'Where business logic lives',
    cells: {
      fsaa: logicPlacement('features/{name}/model + entities/{name}/model'),
      fsd: logicPlacement('features/model, entities/model', 'Same idea, stricter segment list'),
      atomic: logicPlacement('container/component split', 'Logic placement drifts by developer'),
      bulletproof: logicPlacement('hooks/, services/, api/', 'Clear but not sliced by domain'),
    },
  },
  {
    id: 'large-blocks',
    criterion: 'Large page blocks',
    cells: {
      fsaa: { verdict: 'yes', text: 'features — a block is a feature with ui/model/api' },
      fsd: { verdict: 'mid', text: 'widgets layer (separate)', note: 'The widgets-vs-feature debate' },
      atomic: { verdict: 'no', text: 'not addressed', note: 'Only organism size hints' },
      bulletproof: { verdict: 'no', text: 'not addressed' },
    },
  },
  {
    id: 'widgets',
    criterion: 'Widgets layer',
    cells: {
      fsaa: { verdict: 'no', text: 'removed — features absorb them' },
      fsd: { verdict: 'yes', text: 'dedicated layer' },
      atomic: { verdict: 'no', text: 'no such concept' },
      bulletproof: { verdict: 'no', text: 'no such concept' },
    },
  },
  {
    id: 'organisms',
    criterion: 'Organisms',
    cells: {
      fsaa: { verdict: 'no', text: 'removed — either shared/ui molecule or feature ui/' },
      fsd: uiPlacement('n/a — not used'),
      atomic: logicPlacement('core tier', 'Ambiguous size rules'),
      bulletproof: { verdict: 'no', text: 'no such concept' },
    },
  },
  {
    id: 'enforcement',
    criterion: 'Enforcement',
    cells: {
      fsaa: { verdict: 'yes', text: 'ESLint import boundaries shipped with the docs' },
      fsd: { verdict: 'mid', text: 'stepper/linter advice', note: 'Stepper is community tooling' },
      atomic: { verdict: 'no', text: 'guidelines only' },
      bulletproof: { verdict: 'no', text: 'guidelines only' },
    },
  },
  {
    id: 'threshold',
    criterion: 'Adoption threshold',
    cells: {
      fsaa: midCell('low — five folders and one lint config'),
      fsd: midCell('medium — seven layers to explain first'),
      atomic: lowCell('low — familiar vocabulary', 'But no boundary rules'),
      bulletproof: lowCell('low — flat folders', 'Structure thins as app grows'),
    },
  },
  {
    id: 'what-it-is',
    criterion: 'What it fundamentally is',
    cells: {
      fsaa: logicPlacement('layered architecture with an atomic vocabulary inside shared'),
      fsd: logicPlacement('layered architecture based on slices and segments'),
      atomic: logicPlacement('a composition hierarchy for UI'),
      bulletproof: logicPlacement('a folder convention built around React patterns'),
    },
  },
  {
    id: 'hybrid',
    criterion: 'Hybrid with other methods',
    cells: {
      fsaa: yesCell('by design — FSD layers + atomic naming', 'That is the whole point'),
      fsd: midCell('possible, informal'),
      atomic: midCell('usually paired with component structure'),
      bulletproof: midCell('orthogonal, can coexist'),
    },
  },
];