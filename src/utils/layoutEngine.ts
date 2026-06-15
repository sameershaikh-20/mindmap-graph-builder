import type { Node } from '../types';
import { NODE_DEFAULTS } from '../constants/config';

export function layoutTree(nodes: Record<string, Node>, rootNodeId: string | null): Record<string, Node> {
  if (!rootNodeId || !nodes[rootNodeId]) return nodes;

  const result: Record<string, Node> = JSON.parse(JSON.stringify(nodes));

  const subtreeSizes: Record<string, number> = {};
  function countSubtree(id: string): number {
    const node = result[id];
    if (!node) return 0;
    let count = 1;
    for (const cid of node.childrenIds) count += countSubtree(cid);
    subtreeSizes[id] = count;
    return count;
  }
  countSubtree(rootNodeId);

  function layout(id: string, x: number, y: number, spacingX: number) {
    const node = result[id];
    if (!node) return;
    node.x = x;
    node.y = y;

    const children = node.childrenIds.filter((cid) => result[cid]);
    if (children.length === 0) return;

    const totalSize = children.reduce((s, cid) => s + (subtreeSizes[cid] || 1), 0);
    let curY = y - ((totalSize - 1) * NODE_DEFAULTS.minVerticalSpacing) / 2;

    for (const cid of children) {
      const size = subtreeSizes[cid] || 1;
      const childY = curY + (size * NODE_DEFAULTS.minVerticalSpacing) / 2 - NODE_DEFAULTS.minVerticalSpacing / 2;
      layout(cid, x + spacingX, childY, spacingX);
      curY += size * NODE_DEFAULTS.minVerticalSpacing;
    }
  }

  const root = result[rootNodeId];
  layout(rootNodeId, root.x, root.y, 250);
  return result;
}

export function collectDescendants(nodes: Record<string, Node>, id: string): string[] {
  const result: string[] = [];
  const stack = [id];
  while (stack.length > 0) {
    const cur = stack.pop()!;
    result.push(cur);
    const node = nodes[cur];
    if (node) for (const cid of node.childrenIds) stack.push(cid);
  }
  return result;
}
