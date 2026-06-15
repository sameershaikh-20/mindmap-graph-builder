import React, { useCallback } from 'react';
import { useGraphStore } from '../../store/useGraphStore';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';

interface NodeActionsProps {
  nodeId: string;
  color: string;
  isEditing: boolean;
  onStartEdit: () => void;
}

export const NodeActions = React.memo(function NodeActions({ nodeId, isEditing, onStartEdit }: NodeActionsProps) {
  const addNode = useGraphStore((s) => s.actions.addNode);
  const deleteNode = useGraphStore((s) => s.actions.deleteNode);
  const selectedNodeId = useGraphStore((s) => s.selectedNodeId);
  const isSelected = selectedNodeId === nodeId;

  const handleAddChild = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    addNode(nodeId);
  }, [nodeId, addNode]);

  const handleDelete = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    deleteNode(nodeId);
  }, [nodeId, deleteNode]);

  const handleEdit = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onStartEdit();
  }, [onStartEdit]);

  if (!isSelected) return null;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        marginTop: 6,
        padding: '3px 4px',
        background: 'rgba(30,30,63,0.9)',
        borderRadius: 6,
        border: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <button
        onClick={handleAddChild}
        aria-label="Add child node"
        style={{
          background: 'transparent', border: 'none', borderRadius: 4,
          color: '#a1a1aa', cursor: 'pointer', fontSize: 11, padding: '4px 8px',
          display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'Inter, sans-serif',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(99,102,241,0.2)'; e.currentTarget.style.color = '#fff'; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#a1a1aa'; }}
      >
        <FiPlus size={12} /> Child
      </button>
      <div style={{ width: 1, height: 16, background: 'rgba(255,255,255,0.08)' }} />
      <button
        onClick={handleEdit}
        aria-label="Edit title"
        style={{
          background: 'transparent', border: 'none', borderRadius: 4,
          color: '#a1a1aa', cursor: 'pointer', padding: '4px 6px',
          display: 'flex', alignItems: 'center',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = '#fff'; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#a1a1aa'; }}
      >
        <FiEdit2 size={12} />
      </button>
      <button
        onClick={handleDelete}
        aria-label="Delete node"
        style={{
          background: 'transparent', border: 'none', borderRadius: 4,
          color: '#a1a1aa', cursor: 'pointer', padding: '4px 6px',
          display: 'flex', alignItems: 'center',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(239,68,68,0.2)'; e.currentTarget.style.color = '#ef4444'; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#a1a1aa'; }}
      >
        <FiTrash2 size={12} />
      </button>
    </div>
  );
});
