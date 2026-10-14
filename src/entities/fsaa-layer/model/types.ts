/* Entity fsaa-layer — types for the FSAA layer taxonomy. */

export type LayerId = 'app' | 'pages' | 'features' | 'entities' | 'shared';

export type FsaaLayer = {
  id: LayerId;
  name: string;
  purpose: string;
  mayImport: string;
  color: string;
};

export type LayerBoundary = {
  layer: FsaaLayer;
  above: LayerId[];
  below: LayerId[];
};