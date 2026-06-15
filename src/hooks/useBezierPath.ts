import { useMemo } from 'react';
import { useGraphStore } from '../store/useGraphStore';
import { calculateBezierPath, getEdgeColor } from '../utils/bezierCalculator';

export function useBezierPath(parentId: string, childId: string) {
  const parentNode = useGraphStore((s) => s.nodes[parentId]);
  const childNode = useGraphStore((s) => s.nodes[childId]);

  return useMemo(() => {
    if (!parentNode || !childNode) return { path: '', color: '' };
    const path = calculateBezierPath(parentNode.x, parentNode.y, childNode.x, childNode.y);
    const color = getEdgeColor(childNode.depth);
    return { path, color };
  }, [parentNode?.x, parentNode?.y, childNode?.x, childNode?.y, childNode?.depth]);
}
