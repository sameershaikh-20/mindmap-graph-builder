import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button = React.memo(function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  icon,
  fullWidth = false,
  children,
  disabled,
  style,
  ...props
}: ButtonProps) {
  const baseStyle: React.CSSProperties = {
    border: 'none',
    borderRadius: 6,
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontFamily: 'Inter, sans-serif',
    fontWeight: 500,
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    opacity: disabled ? 0.5 : 1,
    width: fullWidth ? '100%' : 'auto',
    outline: 'none',
    ...(size === 'sm' && { padding: '6px 12px', fontSize: '12px' }),
    ...(size === 'md' && { padding: '10px 16px', fontSize: '14px' }),
    ...(size === 'lg' && { padding: '12px 24px', fontSize: '16px' }),
    ...(variant === 'primary' && {
      background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
      color: '#fff',
      boxShadow: '0 4px 12px rgba(99,102,241,0.3)',
    }),
    ...(variant === 'secondary' && {
      background: 'transparent',
      color: '#a1a1aa',
      border: '1px solid rgba(255,255,255,0.2)',
    }),
    ...(variant === 'ghost' && {
      background: 'transparent',
      color: 'rgba(255,255,255,0.7)',
    }),
    ...(variant === 'danger' && {
      background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
      color: '#fff',
      boxShadow: '0 4px 12px rgba(239,68,68,0.3)',
    }),
    ...(variant === 'outline' && {
      background: 'transparent',
      color: '#a1a1aa',
      border: '1px solid rgba(255,255,255,0.2)',
    }),
    ...style,
  };

  return (
    <button
      style={baseStyle}
      disabled={disabled || isLoading}
      onMouseEnter={(e) => {
        if (disabled) return;
        const el = e.currentTarget;
        if (variant === 'ghost') {
          el.style.background = 'rgba(255,255,255,0.1)';
          el.style.transform = 'scale(1.1)';
        } else if (variant === 'secondary' || variant === 'outline') {
          el.style.background = 'rgba(255,255,255,0.08)';
          el.style.borderColor = 'rgba(255,255,255,0.4)';
        } else {
          el.style.transform = 'scale(1.05)';
          el.style.boxShadow = variant === 'primary'
            ? '0 6px 20px rgba(99,102,241,0.4)'
            : '0 6px 20px rgba(239,68,68,0.5)';
        }
      }}
      onMouseLeave={(e) => {
        if (disabled) return;
        const el = e.currentTarget;
        el.style.transform = 'scale(1)';
        el.style.background = variant === 'primary'
          ? 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)'
          : variant === 'danger'
            ? 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
            : 'transparent';
        el.style.borderColor = variant === 'secondary' || variant === 'outline'
          ? 'rgba(255,255,255,0.2)'
          : '';
        el.style.boxShadow = variant === 'primary'
          ? '0 4px 12px rgba(99,102,241,0.3)'
          : variant === 'danger'
            ? '0 4px 12px rgba(239,68,68,0.3)'
            : '';
      }}
      onPointerDown={(e) => {
        if (disabled) return;
        e.currentTarget.style.transform = 'scale(0.98)';
      }}
      onPointerUp={(e) => {
        if (disabled) return;
        e.currentTarget.style.transform = 'scale(1)';
      }}
      {...props}
    >
      {isLoading && <span style={{ display: 'inline-flex', alignItems: 'center' }}>...</span>}
      {icon && !isLoading && icon}
      {children}
    </button>
  );
});
