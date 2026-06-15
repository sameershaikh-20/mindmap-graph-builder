import type { Store } from './actions';

export const selectNodeIds = (state: Store) => Object.keys(state.nodes);

export const selectNode = (id: string) => (state: Store) => state.nodes[id];

let _cachedVisibleIds: string[] = [];
export const selectVisibleNodeIds = (state: Store) => {
  const visible = new Set<string>();
  const rootId = state.rootNodeId;
  if (!rootId) return _cachedVisibleIds;

  const traverse = (nid: string) => {
    visible.add(nid);
    const node = state.nodes[nid];
    if (node && !node.isCollapsed) {
      for (const cid of node.childrenIds) {
        traverse(cid);
      }
    }
  };
  traverse(rootId);
  const result = Array.from(visible);
  if (
    _cachedVisibleIds.length === result.length &&
    _cachedVisibleIds.every((id, i) => id === result[i])
  ) {
    return _cachedVisibleIds;
  }
  _cachedVisibleIds = result;
  return result;
};

let _cachedTransform: { panX: number; panY: number; zoomScale: number } | null = null;
export const selectCanvasTransform = (state: Store) => {
  const t = { panX: state.panX, panY: state.panY, zoomScale: state.zoomScale };
  if (
    _cachedTransform &&
    _cachedTransform.panX === t.panX &&
    _cachedTransform.panY === t.panY &&
    _cachedTransform.zoomScale === t.zoomScale
  ) {
    return _cachedTransform;
  }
  _cachedTransform = t;
  return t;
};

let _cachedStats: { activeBranches: number; maxDepth: number } | null = null;
export const selectGraphStats = (state: Store) => {
  const s = { activeBranches: state.activeBranches, maxDepth: state.maxDepth };
  if (
    _cachedStats &&
    _cachedStats.activeBranches === s.activeBranches &&
    _cachedStats.maxDepth === s.maxDepth
  ) {
    return _cachedStats;
  }
  _cachedStats = s;
  return s;
};

let _cachedToasts: readonly { id: string; message: string; type: 'success' | 'error' | 'info' }[] = [];
export const selectToasts = (state: Store) => {
  const t = state.toasts;
  if (_cachedToasts === t) return _cachedToasts;
  _cachedToasts = t;
  return t;
};

export const selectCanUndo = (state: Store) => state.historyIndex > 0;

export const selectCanRedo = (state: Store) => state.historyIndex < state.history.length - 1;
