import { FSAA_LAYERS, IMPORT_RULES } from '@/entities/fsaa-layer';
import type { FsaaLayer } from '@/entities/fsaa-layer';
import type { Column } from '@/shared/ui/molecules';

export type { FsaaLayer };

export const importRules = IMPORT_RULES;

/* Feature layer-stack — pages-layer access to the fsaa-layer entity.
   Exposes the canonical layer data + a DataTable config for docs composition. */

export const layerTableColumns: Array<Column<FsaaLayer>> = [
  {
    header: 'Layer',
    render: (layer) => layer.name,
    cellClassName: () => 'lay',
  },
  {
    header: 'Purpose',
    render: (layer) => layer.purpose,
  },
  {
    header: 'May import',
    render: (layer) => layer.mayImport,
  },
];

export const layerTableRowKey = (layer: FsaaLayer) => layer.id;
export const layerTableCaption = 'FSAA layers summary';