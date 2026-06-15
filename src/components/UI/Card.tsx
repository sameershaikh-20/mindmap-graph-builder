import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hover?: boolean;
  padding?: number;
}

export const Card = React.memo(function Card({
  children,
  hover = false,
  padding = 16,
  style,
  ...props
}: CardProps) {
  return (
    <div
      style={{
        background: '#2a2a4a',
        borderRadius: 8,
        border: '1px solid rgba(255, 255, 255, 0.08)',
        padding: `${padding}px`,
        transition: 'all 0.2s',
        cursor: hover ? 'pointer' : 'default',
        ...style,
      }}
      onMouseEnter={(e) => {
        if (hover) {
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.16)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        }
      }}
      onMouseLeave={(e) => {
        if (hover) {
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
          e.currentTarget.style.boxShadow = 'none';
        }
      }}
      {...props}
    >
      {children}
    </div>
  );
});
