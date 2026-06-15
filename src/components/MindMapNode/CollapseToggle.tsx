import React from 'react';

interface CollapseToggleProps {
  isCollapsed: boolean;
  childCount: number;
  onToggle: () => void;
}

export const CollapseToggle = React.memo(function CollapseToggle({
  isCollapsed, childCount, onToggle,
}: CollapseToggleProps) {
  if (childCount === 0) return null;

  return (
    <div style={{
      position: 'absolute', top: -8, right: -8, zIndex: 5,
    }}>
      <button
        onClick={(e) => { e.stopPropagation(); onToggle(); }}
        aria-label={isCollapsed ? 'Expand branch' : 'Collapse branch'}
        style={{
          width: 20, height: 20, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.2)',
          background: '#1a1a2e', color: '#a1a1aa', cursor: 'pointer', fontSize: 10,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.2s', padding: 0,
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = '#6366f1'; e.currentTarget.style.color = '#fff'; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = '#1a1a2e'; e.currentTarget.style.color = '#a1a1aa'; }}
      >
        {isCollapsed ? childCount : '−'}
      </button>
    </div>
  );
});
