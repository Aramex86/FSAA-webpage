'use client';

import { useState } from 'react';
import { cn } from '@/shared/lib/cn';
import { Chip } from '@/shared/ui/atoms';
import { FSAA_LAYERS, getLayerBoundary } from '@/entities/fsaa-layer';
import type { LayerId } from '@/entities/fsaa-layer';

/* Presentational — the clickable layer stack. Controlled via callbacks. */

type LayerStackProps = {
  activeId: LayerId;
  onSelect: (id: LayerId) => void;
};

export function LayerStack({ activeId, onSelect }: LayerStackProps) {
  return (
    <div className="stack-wrap">
      <div className="rail">
        <span className="rail-label">imports ↓</span>
        <div className="rail-line" />
      </div>
      <div className="layers">
        {FSAA_LAYERS.map((layer, i) => (
          <button
            key={layer.id}
            type="button"
            className={cn('layer', activeId === layer.id && 'active')}
            style={{ ['--lc' as string]: layer.color }}
            onClick={() => onSelect(layer.id)}
            onMouseEnter={() => onSelect(layer.id)}
            onFocus={() => onSelect(layer.id)}
            aria-pressed={activeId === layer.id}
          >
            <span className="idx">{String(i + 1).padStart(2, '0')}</span>
            <span className="nm">{layer.name}</span>
            <span className="pp">{layer.purpose}</span>
            <span className="im">imports: {layer.mayImport}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* Presentational — boundary note under the stack. */

type LayerBoundaryNoteProps = {
  activeId: LayerId;
};

export function LayerBoundaryNote({ activeId }: LayerBoundaryNoteProps) {
  const { layer, above, below } = getLayerBoundary(activeId);

  return (
    <div className="layer-detail" style={{ ['--lc' as string]: layer.color }}>
      <b>{layer.name}</b> — {layer.purpose}. May import: {layer.mayImport}.{' '}
      {above.length === 0 ? (
        <span className="no">forbidden: nothing above it</span>
      ) : (
        <>
          forbidden: <span className="no">↑ {above.join(', ')}</span>
        </>
      )}
      {below.length === 0 ? ' It is the lowest layer.' : ` Sits above: ${below.join(', ')}.`}
    </div>
  );
}

/* Container — owns the selection state. */

export function LayerStackExplorer() {
  const [activeId, setActiveId] = useState<LayerId>('features');

  return (
    <div>
      <LayerStack activeId={activeId} onSelect={setActiveId} />
      <LayerBoundaryNote activeId={activeId} />
      <div className="stack-foot">
        <Chip tone="on">5 layers</Chip>
        <Chip>widgets layer removed</Chip>
        <Chip>downward imports only</Chip>
        <Chip>no layer skipping</Chip>
        <Chip>no circular deps</Chip>
        <Chip>public API via index.ts</Chip>
      </div>
    </div>
  );
}