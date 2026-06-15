import { useEffect } from 'react';
import { useGraphStore } from '../store/useGraphStore';

export function useKeyboardShortcuts() {
  const undo = useGraphStore((s) => s.actions.undo);
  const redo = useGraphStore((s) => s.actions.redo);
  const deleteNode = useGraphStore((s) => s.actions.deleteNode);
  const selectedNodeId = useGraphStore((s) => s.selectedNodeId);
  const setSelectedNode = useGraphStore((s) => s.actions.setSelectedNode);
  const addNode = useGraphStore((s) => s.actions.addNode);
  const setZoom = useGraphStore((s) => s.actions.setZoom);
  const zoomScale = useGraphStore((s) => s.zoomScale);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const ctrl = e.ctrlKey || e.metaKey;

      if (ctrl && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo();
      }
      if (ctrl && e.key === 'z' && e.shiftKey) {
        e.preventDefault();
        redo();
      }
      if (ctrl && e.key === 'Z') {
        e.preventDefault();
        redo();
      }
      if ((e.key === 'Delete' || e.key === 'Backspace') && selectedNodeId) {
        const state = useGraphStore.getState();
        const node = state.nodes[selectedNodeId];
        if (node && node.parentId !== null) {
          e.preventDefault();
          deleteNode(selectedNodeId);
        }
      }
      if (e.key === 'Enter' && !ctrl && selectedNodeId) {
        e.preventDefault();
        addNode(selectedNodeId);
      }
      if (e.key === 'Tab' && selectedNodeId) {
        e.preventDefault();
        const state = useGraphStore.getState();
        const node = state.nodes[selectedNodeId];
        if (node && node.parentId) {
          addNode(node.parentId);
        }
      }
      if (e.key === 'Escape') {
        setSelectedNode(null);
      }
      if (ctrl && (e.key === '=' || e.key === '+')) {
        e.preventDefault();
        setZoom(zoomScale + 0.1);
      }
      if (ctrl && e.key === '-') {
        e.preventDefault();
        setZoom(zoomScale - 0.1);
      }
      if (ctrl && e.key === '0') {
        e.preventDefault();
        useGraphStore.getState().actions.setPan(0, 0);
        setZoom(1);
      }
      if (ctrl && e.key === 's') {
        e.preventDefault();
        const state = useGraphStore.getState();
        const data = JSON.stringify({ nodes: state.nodes, rootNodeId: state.rootNodeId });
        localStorage.setItem('mindmap-autosave', data);
        state.actions.addToast('Saved!', 'success');
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [undo, redo, deleteNode, selectedNodeId, setSelectedNode, addNode, setZoom, zoomScale]);
}
