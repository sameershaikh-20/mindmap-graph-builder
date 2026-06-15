import { v4 as uuidv4 } from 'uuid';
import type { Node, GraphState, HistoryEntry, ToastMessage } from '../types';

interface Actions {
  addNode: (parentId: string | null, x?: number, y?: number) => string;
  updateNode: (id: string, updates: Partial<Node>) => void;
  deleteNode: (id: string) => void;
  moveNode: (id: string, x: number, y: number) => void;
  setSelectedNode: (id: string | null) => void;
  toggleCollapse: (id: string) => void;
  setPan: (panX: number, panY: number) => void;
  setZoom: (zoomScale: number) => void;
  undo: () => void;
  redo: () => void;
  clearCanvas: () => void;
  loadGraph: (nodes: Record<string, Node>, rootNodeId: string | null) => void;
  addToast: (message: string, type: ToastMessage['type']) => void;
  removeToast: (id: string) => void;
  autoArrange: () => void;
  setLastSaved: (date: Date | null) => void;
}

export type Store = GraphState & {
  history: HistoryEntry[];
  historyIndex: number;
  toasts: ToastMessage[];
  lastSaved: Date | null;
  actions: Actions;
};

function createNode(parentId: string | null, depth: number, x: number, y: number): Node {
  return {
    id: uuidv4(),
    parentId,
    childrenIds: [],
    x,
    y,
    title: 'New Node',
    color: '#6366f1',
    isCollapsed: false,
    depth,
    metadata: {
      createdAt: new Date(),
      updatedAt: new Date(),
      tags: [],
    },
  };
}

function computeStats(nodes: Record<string, Node>, _rootNodeId: string | null) {
  const ids = Object.keys(nodes);
  let maxDepth = 0;
  for (const id of ids) {
    const d = nodes[id].depth;
    if (d > maxDepth) maxDepth = d;
  }
  return {
    activeBranches: ids.length,
    maxDepth,
  };
}

function pushHistory(state: { nodes: Record<string, Node>; rootNodeId: string | null; history: HistoryEntry[]; historyIndex: number }) {
  const entry: HistoryEntry = {
    nodes: JSON.parse(JSON.stringify(state.nodes)),
    rootNodeId: state.rootNodeId,
  };
  const newHistory = state.history.slice(0, state.historyIndex + 1);
  newHistory.push(entry);
  if (newHistory.length > 50) newHistory.shift();
  return { history: newHistory, historyIndex: newHistory.length - 1 };
}

export function createGraphStore(set: any, get: any): Store {
  const rootId = uuidv4();
  const initialNodes: Record<string, Node> = {
    [rootId]: createNode(null, 0, 0, 0),
  };
  initialNodes[rootId].title = 'Central Idea';

  const centerX = typeof window !== 'undefined' ? window.innerWidth / 2 : 0;
  const centerY = typeof window !== 'undefined' ? window.innerHeight / 2 : 0;
  return {
    nodes: initialNodes,
    rootNodeId: rootId,
    panX: centerX,
    panY: centerY,
    zoomScale: 1,
    selectedNodeId: null,
    activeBranches: 1,
    maxDepth: 0,
    history: [{ nodes: JSON.parse(JSON.stringify(initialNodes)), rootNodeId: rootId }],
    historyIndex: 0,
    toasts: [],
    lastSaved: null,

    actions: {
      addNode: (parentId: string | null, x?: number, y?: number) => {
        const state = get();
        const parent = parentId ? state.nodes[parentId] : null;
        const depth = parent ? parent.depth + 1 : 0;
        const nodeX = x ?? (parent ? parent.x + 250 : 0);
        const nodeY = y ?? (parent ? parent.y + (parent.childrenIds.length * 120) - 60 : 0);
        const node = createNode(parentId, depth, nodeX, nodeY);

        const newNodes = { ...state.nodes, [node.id]: node };
        if (parentId && parent) {
          newNodes[parentId] = {
            ...parent,
            childrenIds: [...parent.childrenIds, node.id],
          };
        }

        const hist = pushHistory({ ...state, nodes: newNodes });
        set({
          nodes: newNodes,
          ...computeStats(newNodes, state.rootNodeId),
          ...hist,
        });
        return node.id;
      },

      updateNode: (id: string, updates: Partial<Node>) => {
        const state = get();
        if (!state.nodes[id]) return;
        const updated = { ...state.nodes[id], ...updates, metadata: { ...state.nodes[id].metadata, updatedAt: new Date() } };
        const newNodes = { ...state.nodes, [id]: updated };
        const hist = pushHistory({ ...state, nodes: newNodes });
        set({ nodes: newNodes, ...hist });
      },

      deleteNode: (id: string) => {
        const state = get();
        if (id === state.rootNodeId) return;
        const node = state.nodes[id];
        if (!node) return;

        const idsToRemove = new Set<string>();
        const collectDescendants = (nid: string) => {
          idsToRemove.add(nid);
          const n = state.nodes[nid];
          if (n) for (const cid of n.childrenIds) collectDescendants(cid);
        };
        collectDescendants(id);

        const newNodes: Record<string, Node> = {};
        for (const key of Object.keys(state.nodes)) {
          if (!idsToRemove.has(key)) {
            newNodes[key] = { ...state.nodes[key] };
          }
        }

        if (node.parentId && newNodes[node.parentId]) {
          newNodes[node.parentId] = {
            ...newNodes[node.parentId],
            childrenIds: newNodes[node.parentId].childrenIds.filter((cid) => cid !== id),
          };
        }

        const sel = idsToRemove.has(state.selectedNodeId ?? '') ? null : state.selectedNodeId;
        const hist = pushHistory({ ...state, nodes: newNodes });
        set({
          nodes: newNodes,
          selectedNodeId: sel,
          ...computeStats(newNodes, state.rootNodeId),
          ...hist,
        });
      },

      moveNode: (id: string, x: number, y: number) => {
        const state = get();
        const node = state.nodes[id];
        if (!node) return;
        state.nodes[id] = { ...node, x, y, metadata: { ...node.metadata, updatedAt: new Date() } };
        set({ nodes: { ...state.nodes } });
      },

      setSelectedNode: (id: string | null) => {
        set({ selectedNodeId: id });
      },

      toggleCollapse: (id: string) => {
        const state = get();
        const node = state.nodes[id];
        if (!node) return;
        state.actions.updateNode(id, { isCollapsed: !node.isCollapsed });
      },

      setPan: (panX: number, panY: number) => {
        set({ panX, panY });
      },

      setZoom: (zoomScale: number) => {
        set({ zoomScale: Math.max(0.1, Math.min(5, zoomScale)) });
      },

      undo: () => {
        const state = get();
        if (state.historyIndex <= 0) return;
        const newIndex = state.historyIndex - 1;
        const entry = state.history[newIndex];
        set({
          nodes: JSON.parse(JSON.stringify(entry.nodes)),
          rootNodeId: entry.rootNodeId,
          historyIndex: newIndex,
          ...computeStats(entry.nodes, entry.rootNodeId),
        });
      },

      redo: () => {
        const state = get();
        if (state.historyIndex >= state.history.length - 1) return;
        const newIndex = state.historyIndex + 1;
        const entry = state.history[newIndex];
        set({
          nodes: JSON.parse(JSON.stringify(entry.nodes)),
          rootNodeId: entry.rootNodeId,
          historyIndex: newIndex,
          ...computeStats(entry.nodes, entry.rootNodeId),
        });
      },

      clearCanvas: () => {
        set((state: any) => {
          const rootId = uuidv4();
          const root = createNode(null, 0, 0, 0);
          root.title = 'Central Idea';
          const newNodes = { [rootId]: root };
          const hist = pushHistory({ ...state, nodes: newNodes, rootNodeId: rootId });
          return {
            nodes: newNodes,
            rootNodeId: rootId,
            selectedNodeId: null,
            ...computeStats(newNodes, rootId),
            ...hist,
          };
        });
      },

      loadGraph: (nodes: Record<string, Node>, rootNodeId: string | null) => {
        set({
          nodes,
          rootNodeId,
          selectedNodeId: null,
          ...computeStats(nodes, rootNodeId),
          history: [{ nodes: JSON.parse(JSON.stringify(nodes)), rootNodeId }],
          historyIndex: 0,
        });
      },

      addToast: (message: string, type: ToastMessage['type']) => {
        const id = uuidv4();
        set((state: any) => ({
          toasts: [...state.toasts, { id, message, type }],
        }));
        setTimeout(() => get().actions.removeToast(id), 3000);
      },

      removeToast: (id: string) => {
        set((state: any) => ({
          toasts: state.toasts.filter((t: ToastMessage) => t.id !== id),
        }));
      },

      autoArrange: () => {
        const state = get();
        if (!state.rootNodeId) return;

        const subtreeSizes: Record<string, number> = {};
        const countSubtree = (nid: string): number => {
          const n = state.nodes[nid];
          if (!n) return 0;
          let count = 1;
          for (const cid of n.childrenIds) count += countSubtree(cid);
          subtreeSizes[nid] = count;
          return count;
        };
        countSubtree(state.rootNodeId);

        const layoutNode = (nid: string, x: number, y: number, spacingX: number) => {
          const n = state.nodes[nid];
          if (!n) return;
          state.actions.updateNode(nid, { x, y });

          const children = n.childrenIds.filter((cid: string) => state.nodes[cid]);
          if (children.length === 0) return;

          const totalSubtreeSize = children.reduce((sum: number, cid: string) => sum + (subtreeSizes[cid] || 1), 0);
          const vertSpacing = 100;
          let currentY = y - ((totalSubtreeSize - 1) * vertSpacing) / 2;

          for (const cid of children) {
            const childSize = subtreeSizes[cid] || 1;
            layoutNode(cid, x + spacingX, currentY + (childSize * vertSpacing) / 2 - vertSpacing / 2, spacingX);
            currentY += childSize * vertSpacing;
          }
        };

        const root = state.nodes[state.rootNodeId];
        layoutNode(state.rootNodeId, root.x, root.y, 250);

        const hist = pushHistory(state);
        set({ ...state, ...hist });
      },

      setLastSaved: (date: Date | null) => {
        set({ lastSaved: date });
      },
    },
  };
}
