import React from 'react';

interface SpinnerProps {
  size?: number;
}

export const Spinner = React.memo(function Spinner({ size = 24 }: SpinnerProps) {
  return (
    <div
      style={{
        width: size,
        height: size,
        border: '2px solid rgba(255,255,255,0.1)',
        borderTopColor: '#6366f1',
        borderRadius: '50%',
        animation: 'spin 0.6s linear infinite',
      }}
    />
  );
});
