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
      display: 'flex', alignItems: 'center', gap: 4,
      background: 'rgba(26,26,46,0.9)', backdropFilter: 'blur(16px)',
      borderRadius: 12, padding: '4px 6px',
      border: '1px solid rgba(255,255,255,0.1)',
      boxShadow: '0 4px 24px rgba(0,0,0,0.4), 0 0 0 1px rgba(99,102,241,0.08)',
    }}>
      <button onClick={zoomOut} aria-label="Zoom out"
        style={{
          background: 'rgba(255,255,255,0.05)', border: 'none', borderRadius: 8,
          color: '#a1a1aa', cursor: 'pointer', fontSize: 14, padding: '6px 10px',
          transition: 'all 0.15s',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(99,102,241,0.2)'; e.currentTarget.style.color = '#fff'; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#a1a1aa'; }}
      >
        −
      </button>
      <div style={{
        color: '#fff', fontSize: 12, minWidth: 52, textAlign: 'center',
        fontVariantNumeric: 'tabular-nums', fontWeight: 500, padding: '6px 4px',
      }}>
        {Math.round(zoomScale * 100)}%
      </div>
      <button onClick={zoomIn} aria-label="Zoom in"
        style={{
          background: 'rgba(255,255,255,0.05)', border: 'none', borderRadius: 8,
          color: '#a1a1aa', cursor: 'pointer', fontSize: 14, padding: '6px 10px',
          transition: 'all 0.15s',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(99,102,241,0.2)'; e.currentTarget.style.color = '#fff'; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#a1a1aa'; }}
      >
        +
      </button>
      <div style={{ width: 1, height: 24, background: 'rgba(255,255,255,0.1)', margin: '0 4px' }} />
      <button onClick={resetView} aria-label="Reset view"
        style={{
          background: 'rgba(255,255,255,0.05)', border: 'none', borderRadius: 8,
          color: '#a1a1aa', cursor: 'pointer', fontSize: 11, padding: '6px 10px',
          whiteSpace: 'nowrap', fontFamily: 'Inter, sans-serif', fontWeight: 500,
          transition: 'all 0.15s',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(99,102,241,0.2)'; e.currentTarget.style.color = '#fff'; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#a1a1aa'; }}
      >
        Reset
      </button>
      <button onClick={fitToScreen} aria-label="Fit to screen"
        style={{
          background: 'rgba(255,255,255,0.05)', border: 'none', borderRadius: 8,
          color: '#a1a1aa', cursor: 'pointer', fontSize: 11, padding: '6px 10px',
          whiteSpace: 'nowrap', fontFamily: 'Inter, sans-serif', fontWeight: 500,
          transition: 'all 0.15s',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(99,102,241,0.2)'; e.currentTarget.style.color = '#fff'; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#a1a1aa'; }}
      >
        Fit
      </button>
    </div>
  );
});
