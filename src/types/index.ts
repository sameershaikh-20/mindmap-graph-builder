export interface Node {
  id: string;
  parentId: string | null;
  childrenIds: string[];
  x: number;
  y: number;
  title: string;
  color: string;
  isCollapsed: boolean;
  depth: number;
  metadata: {
    createdAt: Date;
    updatedAt: Date;
    tags: string[];
  };
}

export interface GraphState {
  nodes: Record<string, Node>;
  rootNodeId: string | null;
  panX: number;
  panY: number;
  zoomScale: number;
  selectedNodeId: string | null;
  activeBranches: number;
  maxDepth: number;
}

export interface HistoryEntry {
  nodes: Record<string, Node>;
  rootNodeId: string | null;
}

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}
