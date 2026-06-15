import type { Node } from '../types';

export function collectDescendants(nodes: Record<string, Node>, id: string): string[] {
  const result: string[] = [];
  const stack = [id];
  while (stack.length > 0) {
    const cur = stack.pop()!;
    result.push(cur);
    const node = nodes[cur];
    if (node && !node.isCollapsed) {
      for (const cid of node.childrenIds) {
        stack.push(cid);
      }
    }
  }
  return result;
}

export function getNodeDepth(nodes: Record<string, Node>, id: string): number {
  let depth = 0;
  let current = nodes[id];
  while (current && current.parentId) {
    depth++;
    current = nodes[current.parentId];
    if (!current) break;
  }
  return depth;
}
