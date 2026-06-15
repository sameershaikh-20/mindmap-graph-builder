import { useCallback } from 'react';
import { useGraphStore } from '../store/useGraphStore';

export function useNodeSelection() {
  const selectedNodeId = useGraphStore((s) => s.selectedNodeId);
  const setSelectedNode = useGraphStore((s) => s.actions.setSelectedNode);

  const selectNode = useCallback((id: string) => {
    setSelectedNode(id === selectedNodeId ? null : id);
  }, [selectedNodeId, setSelectedNode]);

  const clearSelection = useCallback(() => {
    setSelectedNode(null);
  }, [setSelectedNode]);

  return { selectedNodeId, selectNode, clearSelection };
}
