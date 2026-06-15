import { useCallback, useRef } from 'react';
import { useGraphStore } from '../store/useGraphStore';

export function useDraggableNode(nodeId: string) {
  const moveNode = useGraphStore((s) => s.actions.moveNode);
  const dragRef = useRef(false);
  const offsetRef = useRef({ x: 0, y: 0 });

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    e.stopPropagation();
    const state = useGraphStore.getState();
    const node = state.nodes[nodeId];
    if (!node) return;
    dragRef.current = true;
    offsetRef.current = {
      x: e.clientX - (node.x * state.zoomScale + state.panX),
      y: e.clientY - (node.y * state.zoomScale + state.panY),
    };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, [nodeId]);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragRef.current) return;
    const state = useGraphStore.getState();
    const worldX = (e.clientX - offsetRef.current.x - state.panX) / state.zoomScale;
    const worldY = (e.clientY - offsetRef.current.y - state.panY) / state.zoomScale;
    moveNode(nodeId, worldX, worldY);
  }, [nodeId, moveNode]);

  const onPointerUp = useCallback(() => {
    dragRef.current = false;
  }, []);

  return { onPointerDown, onPointerMove, onPointerUp, dragRef };
}
