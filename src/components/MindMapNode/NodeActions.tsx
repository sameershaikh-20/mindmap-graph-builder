import React from 'react';
import { useGraphStore } from '../../store/useGraphStore';
import { NODE_COLORS } from '../../constants/config';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';

interface NodeActionsProps {
  nodeId: string;
  color: string;
  onStartEdit: () => void;
}

export const NodeActions = React.memo(function NodeActions({ nodeId, color, onStartEdit }: NodeActionsProps) {
  const addNode = useGraphStore((s) => s.actions.addNode);
  const deleteNode = useGraphStore((s) => s.actions.deleteNode);
  const updateNode = useGraphStore((s) => s.actions.updateNode);
  const selectedNodeId = useGraphStore((s) => s.selectedNodeId);
  const isSelected = selectedNodeId === nodeId;

  const handleAddChild = (e: React.MouseEvent) => {
    e.stopPropagation();
    addNode(nodeId);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteNode(nodeId);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onStartEdit();
  };

  const handleColorChange = (e: React.MouseEvent, newColor: string) => {
    e.stopPropagation();
    updateNode(nodeId, { color: newColor });
  };

  if (!isSelected) return null;

  return (
    <div
      style={{
        display: 'flex', flexDirection: 'column', gap: 4,
        marginTop: 8,
      }}
    >
      <div
        style={{
          display: 'flex', alignItems: 'center', gap: 2,
          padding: '4px 6px',
          background: 'rgba(26,26,46,0.95)', backdropFilter: 'blur(8px)',
          borderRadius: 8,
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
        }}
      >
        <button onClick={handleAddChild} aria-label="Add child node"
          style={{
            background: 'transparent', border: 'none', borderRadius: 6,
            color: '#a1a1aa', cursor: 'pointer', fontSize: 11, padding: '5px 10px',
            display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'Inter, sans-serif',
            fontWeight: 500, transition: 'all 0.15s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(99,102,241,0.2)'; e.currentTarget.style.color = '#fff'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#a1a1aa'; }}
        >
          <FiPlus size={12} /> Child
        </button>
        <div style={{ width: 1, height: 18, background: 'rgba(255,255,255,0.08)' }} />
        <button onClick={handleEdit} aria-label="Edit title"
          style={{
            background: 'transparent', border: 'none', borderRadius: 6,
            color: '#a1a1aa', cursor: 'pointer', padding: '5px 8px',
            display: 'flex', alignItems: 'center', transition: 'all 0.15s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = '#fff'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#a1a1aa'; }}
        >
          <FiEdit2 size={12} />
        </button>
        <button onClick={handleDelete} aria-label="Delete node"
          style={{
            background: 'transparent', border: 'none', borderRadius: 6,
            color: '#a1a1aa', cursor: 'pointer', padding: '5px 8px',
            display: 'flex', alignItems: 'center', transition: 'all 0.15s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(239,68,68,0.2)'; e.currentTarget.style.color = '#ef4444'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#a1a1aa'; }}
        >
          <FiTrash2 size={12} />
        </button>
      </div>

      <div
        style={{
          display: 'flex', alignItems: 'center', gap: 4, flexWrap: 'wrap',
          padding: '5px 8px',
          background: 'rgba(26,26,46,0.95)', backdropFilter: 'blur(8px)',
          borderRadius: 8,
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
        }}
      >
        {NODE_COLORS.map((c) => (
          <button
            key={c}
            onClick={(e) => handleColorChange(e, c)}
            aria-label={`Set color ${c}`}
            style={{
              width: 16, height: 16, borderRadius: '50%', border: 'none',
              background: c, cursor: 'pointer', padding: 0,
              outline: color === c ? '2px solid #fff' : '2px solid transparent',
              outlineOffset: 1,
              transition: 'all 0.15s',
              transform: color === c ? 'scale(1.2)' : 'scale(1)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.25)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = color === c ? 'scale(1.2)' : 'scale(1)'; }}
          />
        ))}
      </div>
    </div>
  );
});
