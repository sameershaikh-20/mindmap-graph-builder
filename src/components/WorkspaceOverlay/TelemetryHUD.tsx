import React, { useState } from 'react';
import { useGraphStore } from '../../store/useGraphStore';
import { FiInfo } from 'react-icons/fi';

export const TelemetryHUD = React.memo(function TelemetryHUD() {
  const [expanded, setExpanded] = useState(false);
  const activeBranches = useGraphStore((s) => s.activeBranches);
  const maxDepth = useGraphStore((s) => s.maxDepth);
  const panX = useGraphStore((s) => s.panX);
  const panY = useGraphStore((s) => s.panY);
  const zoomScale = useGraphStore((s) => s.zoomScale);
  const lastSaved = useGraphStore((s) => s.lastSaved);

  return (
    <div
      style={{
        position: 'fixed', top: 16, right: 16, zIndex: 50,
        background: 'rgba(30,30,63,0.85)', backdropFilter: 'blur(12px)',
        borderRadius: 10,
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
        fontFamily: 'Inter, sans-serif', fontSize: 11,
        color: '#a1a1aa', overflow: 'hidden', transition: 'all 0.2s',
      }}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: expanded ? '8px 12px 6px' : '6px 10px',
          background: 'none', border: 'none', color: '#a1a1aa',
          cursor: 'pointer', fontSize: 11, fontFamily: 'Inter, sans-serif',
        }}
      >
        <FiInfo size={12} />
        {expanded && <span style={{ color: '#fff', fontWeight: 600 }}>Telemetry</span>}
      </button>
      {expanded && (
        <div style={{ padding: '0 12px 10px', lineHeight: 1.7 }}>
          <div>Nodes: <span style={{ color: '#fff' }}>{activeBranches}</span></div>
          <div>Depth: <span style={{ color: '#fff' }}>{maxDepth}</span></div>
          <div>Pan: <span style={{ color: '#fff', fontVariantNumeric: 'tabular-nums' }}>{Math.round(panX)}, {Math.round(panY)}</span></div>
          <div>Zoom: <span style={{ color: '#fff' }}>{zoomScale.toFixed(2)}x</span></div>
          <div>Saved: <span style={{ color: '#fff' }}>{lastSaved ? lastSaved.toLocaleTimeString() : '—'}</span></div>
        </div>
      )}
    </div>
  );
});
