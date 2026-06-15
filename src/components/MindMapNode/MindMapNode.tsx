import React, { useState, useCallback, useMemo } from 'react';
import { useGraphStore } from '../../store/useGraphStore';
import { useDraggableNode } from '../../hooks/useDraggableNode';
import { NodeContent } from './NodeContent';
import { NodeActions } from './NodeActions';
import { CollapseToggle } from './CollapseToggle';
import { NODE_DEFAULTS } from '../../constants/config';

interface MindMapNodeProps {
  nodeId: string;
}

const getNodeDepth = (node: any): number => {
  let depth = 0;
  let current = node;
  while (current.parentId) {
    depth++;
    current = useGraphStore.getState().nodes[current.parentId];
    if (!current) break;
  }
  return depth;
};

export const MindMapNode = React.memo(function MindMapNode({ nodeId }: MindMapNodeProps) {
  const node = useGraphStore((s) => s.nodes[nodeId]);
  const selectedNodeId = useGraphStore((s) => s.selectedNodeId);
  const setSelectedNode = useGraphStore((s) => s.actions.setSelectedNode);
  const deleteNode = useGraphStore((s) => s.actions.deleteNode);
  const toggleCollapse = useGraphStore((s) => s.actions.toggleCollapse);
  const updateNode = useGraphStore((s) => s.actions.updateNode);
  const addNode = useGraphStore((s) => s.actions.addNode);
  const zoomScale = useGraphStore((s) => s.zoomScale);

  const [isEditing, setIsEditing] = useState(false);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);

  const drag = useDraggableNode(nodeId);

  const isSelected = selectedNodeId === nodeId;
  const depth = useMemo(() => node ? getNodeDepth(node) : 0, [node]);
  const childCount = useMemo(() => node?.childrenIds?.length ?? 0, [node?.childrenIds]);
  const scaledWidth = NODE_DEFAULTS.width * zoomScale;
  const scaledHeight = NODE_DEFAULTS.height * zoomScale;

  const handleSelect = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedNode(nodeId);
  }, [nodeId, setSelectedNode]);

  const handleStartEdit = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleFinishEdit = useCallback((title: string) => {
    setIsEditing(false);
    if (title.trim()) {
      updateNode(nodeId, { title: title.trim() });
    }
  }, [nodeId, updateNode]);

  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setContextMenu({ x: e.clientX, y: e.clientY });
  }, []);

  const closeContextMenu = useCallback(() => {
    setContextMenu(null);
  }, []);

  const handleDelete = useCallback(() => {
    deleteNode(nodeId);
    setContextMenu(null);
  }, [nodeId, deleteNode]);

  const handleAddChild = useCallback(() => {
    addNode(nodeId);
    setContextMenu(null);
  }, [nodeId, addNode]);

  const handleToggleCollapse = useCallback(() => {
    toggleCollapse(nodeId);
  }, [nodeId, toggleCollapse]);

  if (!node) return null;

  const nodeColor = node.color || '#6366f1';
  const nodeStyle: React.CSSProperties = {
    position: 'absolute',
    left: node.x - scaledWidth / 2,
    top: node.y - scaledHeight / 2,
    width: scaledWidth,
    minHeight: scaledHeight,
    background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 50%, rgba(0,0,0,0.04) 100%), #1e1e3f',
    borderRadius: depth === 0 ? 14 : depth === 1 ? 12 : NODE_DEFAULTS.borderRadius,
    border: isSelected ? `1.5px solid ${nodeColor}` : `1px solid ${nodeColor}33`,
    boxShadow: isSelected
      ? `0 1px 2px rgba(0,0,0,0.1), 0 4px 8px rgba(0,0,0,0.15), 0 8px 24px rgba(0,0,0,0.2), 0 0 30px ${nodeColor}66, inset 0 1px 0 rgba(255,255,255,0.08)`
      : `0 1px 2px rgba(0,0,0,0.1), 0 4px 8px rgba(0,0,0,0.15), 0 8px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.08)`,
    padding: depth === 0 ? '16px 20px' : '12px 16px',
    cursor: 'grab',
    transition: isEditing ? 'none' : 'all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
    zIndex: isSelected ? 10 : 1,
    touchAction: 'none',
    userSelect: 'none',
    transform: isSelected ? 'scale(1.03)' : 'scale(1)',
    willChange: 'transform, box-shadow',
  };

  return (
    <>
      <div
        style={nodeStyle}
        onPointerDown={(e) => {
          handleSelect(e);
          drag.onPointerDown(e);
        }}
        onPointerMove={drag.onPointerMove}
        onPointerUp={drag.onPointerUp}
        onClick={handleSelect}
        onDoubleClick={handleStartEdit}
        onContextMenu={handleContextMenu}
        onPointerLeave={closeContextMenu}
        role="button"
        tabIndex={0}
        aria-label={`Node: ${node.title}`}
        aria-selected={isSelected}
      >
        {depth > 0 && (
          <div style={{
            position: 'absolute', top: 0, left: 12, right: 12, height: 1,
            background: `linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)`,
          }} />
        )}
        <CollapseToggle
          isCollapsed={node.isCollapsed}
          childCount={childCount}
          onToggle={handleToggleCollapse}
          depth={depth}
        />
        <NodeContent
          node={node}
          isEditing={isEditing}
          onStartEdit={handleStartEdit}
          onFinishEdit={handleFinishEdit}
          depth={depth}
        />
        <NodeActions
          nodeId={nodeId}
          color={node.color}
          isEditing={isEditing}
          onStartEdit={handleStartEdit}
        />
      </div>

      {contextMenu && (
        <div
          style={{
            position: 'fixed', left: contextMenu.x, top: contextMenu.y, zIndex: 100,
            background: 'rgba(26,26,46,0.95)', backdropFilter: 'blur(16px)',
            borderRadius: 10, padding: 6, minWidth: 180,
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(99,102,241,0.1)',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {[
              { icon: '➕', label: 'Add Child', action: handleAddChild },
              { icon: '✏️', label: 'Edit', action: handleStartEdit },
              { icon: node.isCollapsed ? '🔽' : '🔼', label: node.isCollapsed ? 'Expand' : 'Collapse', action: handleToggleCollapse },
            ].map((item) => (
              <button
                key={item.label}
                onClick={item.action}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '8px 12px', border: 'none', background: 'transparent',
                  color: '#e0e0e0', cursor: 'pointer',
                  fontSize: 13, borderRadius: 6, textAlign: 'left',
                  transition: 'all 0.15s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(99,102,241,0.15)'; e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#e0e0e0'; }}
              >
                <span style={{ fontSize: 12, width: 18, textAlign: 'center' }}>{item.icon}</span>
                {item.label}
              </button>
            ))}
            <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', margin: '4px 8px' }} />
            <button
              onClick={handleDelete}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '8px 12px', border: 'none', background: 'transparent',
                color: '#ef4444', cursor: 'pointer',
                fontSize: 13, borderRadius: 6, textAlign: 'left',
                transition: 'all 0.15s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(239,68,68,0.15)'; e.currentTarget.style.color = '#fca5a5'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#ef4444'; }}
            >
              <span style={{ fontSize: 12, width: 18, textAlign: 'center' }}>🗑️</span>
              Delete
            </button>
          </div>
        </div>
      )}
    </>
  );
});
