import React, { useCallback } from 'react';
import { useGraphStore } from '../../store/useGraphStore';
import { useCanvasTransform } from '../../hooks/useCanvasTransform';

export const ZoomWidget = React.memo(function ZoomWidget() {
  const zoomScale = useGraphStore((s) => s.zoomScale);
  const setZoom = useGraphStore((s) => s.actions.setZoom);
  const { fitToScreen, resetView } = useCanvasTransform();

  const zoomIn = useCallback(() => setZoom(zoomScale + 0.1), [zoomScale, setZoom]);
  const zoomOut = useCallback(() => setZoom(zoomScale - 0.1), [zoomScale, setZoom]);

  return (
    <div style={{
      position: 'fixed', bottom: 24, left: 24, zIndex: 50,
      display: 'flex', alignItems: 'center', gap: 6,
      background: 'rgba(30,30,63,0.85)', backdropFilter: 'blur(12px)',
      borderRadius: 10, padding: '6px 12px',
      border: '1px solid rgba(255,255,255,0.08)',
      boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
    }}>
      <button onClick={zoomOut} aria-label="Zoom out"
        style={{ background: 'none', border: 'none', color: '#a1a1aa', cursor: 'pointer', fontSize: 16, padding: '2px 6px' }}>
        −
      </button>
      <span style={{ color: '#fff', fontSize: 12, minWidth: 44, textAlign: 'center', fontVariantNumeric: 'tabular-nums' }}>
        {Math.round(zoomScale * 100)}%
      </span>
      <button onClick={zoomIn} aria-label="Zoom in"
        style={{ background: 'none', border: 'none', color: '#a1a1aa', cursor: 'pointer', fontSize: 16, padding: '2px 6px' }}>
        +
      </button>
      <div style={{ width: 1, height: 20, background: 'rgba(255,255,255,0.1)', margin: '0 4px' }} />
      <button onClick={resetView} aria-label="Reset view"
        style={{ background: 'none', border: 'none', color: '#a1a1aa', cursor: 'pointer', fontSize: 11, padding: '2px 6px', whiteSpace: 'nowrap' }}>
        Reset
      </button>
      <button onClick={fitToScreen} aria-label="Fit to screen"
        style={{ background: 'none', border: 'none', color: '#a1a1aa', cursor: 'pointer', fontSize: 11, padding: '2px 6px', whiteSpace: 'nowrap' }}>
        Fit
      </button>
    </div>
  );
});
