import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error';
}

export const Badge = React.memo(function Badge({ children, variant = 'default' }: BadgeProps) {
  const colors = {
    default: { bg: '#2a2a4a', color: '#a1a1aa' },
    success: { bg: 'rgba(34,197,94,0.15)', color: '#22c55e' },
    warning: { bg: 'rgba(245,158,11,0.15)', color: '#f59e0b' },
    error: { bg: 'rgba(239,68,68,0.15)', color: '#ef4444' },
  };

  const c = colors[variant];

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '2px 8px',
        borderRadius: 4,
        fontSize: '11px',
        fontWeight: 500,
        background: c.bg,
        color: c.color,
      }}
    >
      {children}
    </span>
  );
});
