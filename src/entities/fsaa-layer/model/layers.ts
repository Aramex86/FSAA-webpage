/* Entity fsaa-layer — the single source of truth about FSAA layers. */

import type { FsaaLayer, LayerBoundary, LayerId } from './types';

export const FSAA_LAYERS: FsaaLayer[] = [
  {
    id: 'app',
    name: 'app',
    purpose: 'router, providers, global config',
    mayImport: 'shared only',
    color: '#7ab8ff',
  },
  {
    id: 'pages',
    name: 'pages',
    purpose: 'route-level compositions',
    mayImport: 'features, shared',
    color: '#57d3e8',
  },
  {
    id: 'features',
    name: 'features',
    purpose: 'user scenarios AND large page blocks',
    mayImport: 'entities, shared',
    color: '#43e0bd',
  },
  {
    id: 'entities',
    name: 'entities',
    purpose: 'business models + data access',
    mayImport: 'shared',
    color: '#8fd96a',
  },
  {
    id: 'shared',
    name: 'shared',
    purpose: 'design tokens, generic UI, utils',
    mayImport: 'external libs only',
    color: '#e0c96a',
  },
];

export const IMPORT_RULES: string[] = [
  'A layer imports only layers below it: app → pages → features → entities → shared.',
  'Cross-feature imports go through public APIs only, never deep into another feature.',
  'Within a layer, features do not import each other; extract to entities when needed.',
  'shared imports nothing from the project layers — it is the ground truth of the stack.',
];

export function getLayerBoundary(id: LayerId): LayerBoundary {
  const index = FSAA_LAYERS.findIndex((layer) => layer.id === id);
  if (index === -1) throw new Error(`Unknown FSAA layer: "${String(id)}"`);
  return {
    layer: FSAA_LAYERS[index],
    above: FSAA_LAYERS.slice(0, index).map((l) => l.id),
    below: FSAA_LAYERS.slice(index + 1).map((l) => l.id),
  };
}