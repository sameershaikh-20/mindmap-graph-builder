import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, style, ...props }, ref) => {
    return (
      <div style={{ marginBottom: '16px' }}>
        {label && (
          <label
            style={{
              display: 'block',
              marginBottom: '8px',
              color: '#ffffff',
              fontSize: '14px',
              fontWeight: 500,
            }}
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          style={{
            width: '100%',
            padding: '10px 12px',
            borderRadius: 6,
            border: error ? '2px solid #ef4444' : '2px solid rgba(255,255,255,0.08)',
            background: '#1e1e3f',
            color: '#ffffff',
            fontSize: '14px',
            fontFamily: 'Inter, sans-serif',
            outline: 'none',
            transition: 'border-color 0.2s',
            boxSizing: 'border-box',
            ...style,
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = error ? '#ef4444' : '#6366f1';
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = error ? '#ef4444' : 'rgba(255,255,255,0.08)';
          }}
          {...props}
        />
        {error && (
          <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px', margin: '4px 0 0' }}>
            {error}
          </p>
        )}
        {helperText && !error && (
          <p style={{ color: '#a1a1aa', fontSize: '12px', marginTop: '4px', margin: '4px 0 0' }}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);
