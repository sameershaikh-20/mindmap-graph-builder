import React from 'react';

const depthColors: Record<number, { bg: string; border: string; shadow: string; glow: string }> = {
  0: {
    bg: 'linear-gradient(135deg, #312e81 0%, #1e1b4b 50%, #1a1a2e 100%)',
    border: '1.5px solid rgba(99,102,241,0.6)',
    shadow: '0 1px 2px rgba(0,0,0,0.1), 0 4px 8px rgba(0,0,0,0.15), 0 8px 24px rgba(0,0,0,0.2), 0 0 40px rgba(99,102,241,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
    glow: 'rgba(99,102,241,0.4)',
  },
  1: {
    bg: 'linear-gradient(135deg, #2e1065 0%, #1e1b4b 50%, #1a1a2e 100%)',
    border: '1px solid rgba(139,92,246,0.4)',
    shadow: '0 1px 2px rgba(0,0,0,0.1), 0 4px 8px rgba(0,0,0,0.15), 0 8px 24px rgba(0,0,0,0.2), 0 0 30px rgba(139,92,246,0.2), inset 0 1px 0 rgba(255,255,255,0.08)',
    glow: 'rgba(139,92,246,0.3)',
  },
  2: {
    bg: 'linear-gradient(135deg, #1e1b4b 0%, #1a1a2e 100%)',
    border: '1px solid rgba(167,139,250,0.3)',
    shadow: '0 1px 2px rgba(0,0,0,0.1), 0 4px 8px rgba(0,0,0,0.15), 0 8px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.06)',
    glow: 'rgba(167,139,250,0.2)',
  },
  3: {
    bg: 'linear-gradient(135deg, #1a1a2e 0%, #1e1e3f 100%)',
    border: '1px solid rgba(196,181,253,0.25)',
    shadow: '0 1px 2px rgba(0,0,0,0.1), 0 4px 8px rgba(0,0,0,0.15), 0 8px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05)',
    glow: 'rgba(196,181,253,0.15)',
  },
};

const getNodeStyle = (depth: number, isSelected: boolean): React.CSSProperties => {
  const colors = depthColors[depth] || depthColors[3];
  return {
    background: colors.border.includes('rgba(99,102,241')
      ? 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 50%, rgba(0,0,0,0.04) 100%), #1e1e3f'
      : 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 50%, rgba(0,0,0,0.03) 100%), #1e1e3f',
    border: isSelected ? '1.5px solid rgba(99,102,241,0.6)' : colors.border,
    boxShadow: isSelected
      ? `0 1px 2px rgba(0,0,0,0.1), 0 4px 8px rgba(0,0,0,0.15), 0 8px 24px rgba(0,0,0,0.2), 0 0 40px ${colors.glow}, inset 0 1px 0 rgba(255,255,255,0.08)`
      : colors.shadow,
  };
};

const getNodeAccent = (depth: number): string => {
  const accents: Record<number, string> = {
    0: '#6366f1',
    1: '#8b5cf6',
    2: '#a78bfa',
    3: '#c4b5fd',
  };
  return accents[depth] || '#6366f1';
};

export { getNodeStyle, getNodeAccent, depthColors };

export const NodeStyles = React.memo(function NodeStyles() {
  return (
    <style>{`
      @keyframes nodeFadeIn {
        from { opacity: 0; transform: scale(0.8); }
        to { opacity: 1; transform: scale(1); }
      }
      @keyframes glowPulse {
        0%, 100% { box-shadow: 0 0 20px rgba(99,102,241,0.3); }
        50% { box-shadow: 0 0 30px rgba(99,102,241,0.5); }
      }
    `}</style>
  );
});
