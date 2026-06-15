import React from 'react';

interface CollapseToggleProps {
  isCollapsed: boolean;
  childCount: number;
  onToggle: () => void;
  depth?: number;
}

const depthAccents: Record<number, string> = {
  0: '#6366f1',
  1: '#8b5cf6',
  2: '#a78bfa',
  3: '#c4b5fd',
};

export const CollapseToggle = React.memo(function CollapseToggle({
  isCollapsed, childCount, onToggle, depth = 0,
}: CollapseToggleProps) {
  if (childCount === 0) return null;

  const accent = depthAccents[depth] || '#6366f1';

  return (
    <div style={{
      position: 'absolute', top: -10, right: -10, zIndex: 5,
    }}>
      <button
        onClick={(e) => { e.stopPropagation(); onToggle(); }}
        aria-label={isCollapsed ? 'Expand branch' : 'Collapse branch'}
        style={{
          width: 22, height: 22, borderRadius: '50%',
          border: `2px solid ${isCollapsed ? accent : 'rgba(255,255,255,0.2)'}`,
          background: isCollapsed ? accent : '#1a1a2e',
          color: isCollapsed ? '#fff' : '#a1a1aa',
          cursor: 'pointer', fontSize: 10, fontWeight: 600,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.2s', padding: 0,
          boxShadow: isCollapsed ? `0 2px 8px ${accent}40` : 'none',
        }}
        onMouseEnter={(e) => {
          if (!isCollapsed) {
            e.currentTarget.style.background = accent;
            e.currentTarget.style.color = '#fff';
            e.currentTarget.style.borderColor = accent;
            e.currentTarget.style.boxShadow = `0 2px 8px ${accent}40`;
          }
        }}
        onMouseLeave={(e) => {
          if (!isCollapsed) {
            e.currentTarget.style.background = '#1a1a2e';
            e.currentTarget.style.color = '#a1a1aa';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
            e.currentTarget.style.boxShadow = 'none';
          }
        }}
      >
        {isCollapsed ? childCount : '−'}
      </button>
    </div>
  );
});
