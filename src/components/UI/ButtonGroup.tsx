import React from 'react';

interface ButtonGroupProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export const ButtonGroup = React.memo(function ButtonGroup({ children, style }: ButtonGroupProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        background: 'rgba(255,255,255,0.04)',
        padding: '4px 6px',
        borderRadius: 6,
        ...style,
      }}
    >
      {children}
    </div>
  );
});

export const GroupDivider = React.memo(function GroupDivider() {
  return (
    <div style={{
      width: 1,
      height: 24,
      background: 'rgba(255,255,255,0.1)',
      margin: '0 4px',
      flexShrink: 0,
    }} />
  );
});
