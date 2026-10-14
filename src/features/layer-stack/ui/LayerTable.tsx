import { DataTable } from '@/shared/ui/molecules';
import { FSAA_LAYERS } from '@/entities/fsaa-layer';

import { layerTableCaption, layerTableColumns, layerTableRowKey } from '../model/layerData';

/* Presentational: the layers summary table for the architecture page. */
export function LayerTable() {
  return (
    <DataTable
      columns={layerTableColumns}
      data={FSAA_LAYERS}
      rowKey={layerTableRowKey}
      caption={layerTableCaption}
    />
  );
}