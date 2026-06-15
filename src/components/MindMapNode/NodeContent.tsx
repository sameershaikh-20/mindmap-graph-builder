import React, { useState, useCallback, useRef } from 'react';
import type { Node } from '../../types';

interface NodeContentProps {
  node: Node;
  isEditing: boolean;
  onStartEdit: () => void;
  onFinishEdit: (title: string) => void;
  depth?: number;
}

export const NodeContent = React.memo(function NodeContent({
  node, isEditing, onStartEdit, onFinishEdit, depth = 0,
}: NodeContentProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [val, setVal] = useState(node.title);

  React.useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  React.useEffect(() => {
    setVal(node.title);
  }, [node.title]);

  const handleBlur = useCallback(() => {
    onFinishEdit(val);
  }, [val, onFinishEdit]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onFinishEdit(val);
    }
    if (e.key === 'Escape') {
      setVal(node.title);
      onFinishEdit(node.title);
    }
  }, [val, node.title, onFinishEdit]);

  if (isEditing) {
    return (
      <input
        ref={inputRef}
        value={val}
        onChange={(e) => setVal(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        style={{
          width: '100%', border: 'none', background: 'transparent',
          color: '#fff', fontSize: depth === 0 ? 15 : 13,
          fontWeight: depth === 0 ? 600 : 500, outline: 'none',
          fontFamily: 'Inter, sans-serif', padding: 0,
        }}
        aria-label="Edit node title"
      />
    );
  }

  return (
    <span
      onClick={onStartEdit}
      style={{
        color: '#fff', fontSize: depth === 0 ? 15 : 13,
        fontWeight: depth === 0 ? 600 : 500,
        cursor: 'text', wordBreak: 'break-word', lineHeight: 1.3,
        display: 'block', letterSpacing: depth === 0 ? '0.02em' : 'normal',
      }}
      title="Click to edit"
    >
      {node.title}
    </span>
  );
});
