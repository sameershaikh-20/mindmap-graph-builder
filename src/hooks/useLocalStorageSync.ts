import { useEffect, useCallback } from 'react';
import { useGraphStore } from '../store/useGraphStore';
import { saveGraph, listGraphs, loadGraph, deleteGraph } from '../db/indexedDB';
import { validateGraphData } from '../utils/validation';
import { AUTO_SAVE_INTERVAL } from '../constants/config';
import type { Node } from '../types';

export function useLocalStorageSync() {
  const loadGraphAction = useGraphStore((s) => s.actions.loadGraph);
  const addToast = useGraphStore((s) => s.actions.addToast);
  const setLastSaved = useGraphStore((s) => s.actions.setLastSaved);

  const persist = useCallback(() => {
    const state = useGraphStore.getState();
    const data = JSON.stringify({ nodes: state.nodes, rootNodeId: state.rootNodeId });
    saveGraph('Auto-save', data).then(() => {
      setLastSaved(new Date());
    }).catch(() => {});
  }, [setLastSaved]);

  useEffect(() => {
    const interval = setInterval(persist, AUTO_SAVE_INTERVAL);
    return () => clearInterval(interval);
  }, [persist]);

  const manualSave = useCallback(async () => {
    try {
      const state = useGraphStore.getState();
      const data = JSON.stringify({ nodes: state.nodes, rootNodeId: state.rootNodeId });
      await saveGraph('Manual Save', data);
      setLastSaved(new Date());
      addToast('Graph saved!', 'success');
    } catch {
      addToast('Failed to save', 'error');
    }
  }, [addToast, setLastSaved]);

  const importJSON = useCallback((jsonStr: string) => {
    try {
      const data = JSON.parse(jsonStr);
      if (!validateGraphData(data)) {
        addToast('Invalid graph data', 'error');
        return;
      }

      const nodes: Record<string, Node> = {};
      for (const id of Object.keys(data.nodes)) {
        const n = data.nodes[id];
        nodes[id] = {
          ...n,
          metadata: {
            ...n.metadata,
            createdAt: new Date(n.metadata.createdAt),
            updatedAt: new Date(n.metadata.updatedAt),
          },
        };
      }

      loadGraphAction(nodes, data.rootNodeId);
      addToast('Graph imported!', 'success');
    } catch {
      addToast('Invalid JSON file', 'error');
    }
  }, [loadGraphAction, addToast]);

  const getSavedGraphs = useCallback(async () => {
    try {
      return await listGraphs();
    } catch {
      return [];
    }
  }, []);

  const loadSavedGraph = useCallback(async (id: number) => {
    try {
      const saved = await loadGraph(id);
      if (!saved) {
        addToast('Graph not found', 'error');
        return;
      }
      const data = JSON.parse(saved.data);
      if (!validateGraphData(data)) {
        addToast('Invalid saved data', 'error');
        return;
      }
      const nodes: Record<string, Node> = {};
      for (const id of Object.keys(data.nodes)) {
        const n = data.nodes[id];
        nodes[id] = {
          ...n,
          metadata: {
            ...n.metadata,
            createdAt: new Date(n.metadata.createdAt),
            updatedAt: new Date(n.metadata.updatedAt),
          },
        };
      }
      loadGraphAction(nodes, data.rootNodeId);
      addToast('Graph loaded!', 'success');
    } catch {
      addToast('Failed to load graph', 'error');
    }
  }, [loadGraphAction, addToast]);

  const removeSavedGraph = useCallback(async (id: number) => {
    try {
      await deleteGraph(id);
      addToast('Graph deleted', 'info');
    } catch {
      addToast('Failed to delete', 'error');
    }
  }, [addToast]);

  return { manualSave, importJSON, getSavedGraphs, loadSavedGraph, removeSavedGraph };
}
