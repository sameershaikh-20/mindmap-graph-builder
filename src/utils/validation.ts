import type { Node } from '../types';

export function validateGraphData(data: any): data is { nodes: Record<string, Node>; rootNodeId: string | null } {
  if (!data || typeof data !== 'object') return false;
  if (!data.nodes || typeof data.nodes !== 'object') return false;
  if (data.rootNodeId !== null && typeof data.rootNodeId !== 'string') return false;

  const ids = Object.keys(data.nodes);
  if (ids.length === 0) return false;

  for (const id of ids) {
    const n = data.nodes[id];
    if (!n || typeof n !== 'object') return false;
    if (typeof n.id !== 'string' || typeof n.x !== 'number' || typeof n.y !== 'number') return false;
    if (typeof n.title !== 'string' || typeof n.depth !== 'number') return false;
    if (n.parentId !== null && typeof n.parentId !== 'string') return false;
    if (!Array.isArray(n.childrenIds)) return false;
    if (!n.metadata || typeof n.metadata !== 'object') return false;
  }

  return true;
}
