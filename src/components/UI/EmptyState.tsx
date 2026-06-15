import React from 'react';
import { Button } from './Button';

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: { label: string; onClick: () => void };
}

export const EmptyState = React.memo(function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div
      style={{
        textAlign: 'center',
        padding: '60px 20px',
        color: '#a1a1aa',
      }}
    >
      <p style={{ fontSize: '18px', fontWeight: 600, color: '#ffffff', marginBottom: 8 }}>
        {title}
      </p>
      {description && (
        <p style={{ fontSize: '14px', marginBottom: 24 }}>{description}</p>
      )}
      {action && (
        <Button onClick={action.onClick}>{action.label}</Button>
      )}
    </div>
  );
});
