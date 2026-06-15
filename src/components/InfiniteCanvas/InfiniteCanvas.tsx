import React, { useRef, useEffect } from 'react';
import { useGraphStore } from '../../store/useGraphStore';
import { selectVisibleNodeIds } from '../../store/selectors';
import { useCanvasTransform } from '../../hooks/useCanvasTransform';
import { GridBackground } from './GridBackground';
import { VectorEdgeLayer } from './VectorEdgeLayer';
import { MindMapNode } from '../MindMapNode/MindMapNode';

export const InfiniteCanvas = React.memo(function InfiniteCanvas() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const visibleNodeIds = useGraphStore(selectVisibleNodeIds);
  const {
    panX, panY, zoomScale,
    handleWheel, startPan, movePan, endPan,
  } = useCanvasTransform();

  const setSelectedNode = useGraphStore((s) => s.actions.setSelectedNode);

  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const prevent = (e: WheelEvent) => { if (e.ctrlKey || e.metaKey) e.preventDefault(); };
    el.addEventListener('wheel', prevent, { passive: false });
    return () => el.removeEventListener('wheel', prevent);
  }, []);

  const handleCanvasClick = React.useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setSelectedNode(null);
    }
  }, [setSelectedNode]);

  return (
    <div
      ref={canvasRef}
      style={{
        position: 'fixed', inset: 0, overflow: 'hidden',
        background: '#1a1a2e', cursor: 'grab',
        fontFamily: 'Inter, sans-serif',
      }}
      onPointerDown={(e) => {
        startPan(e);
        handleCanvasClick(e as any);
      }}
      onPointerMove={movePan}
      onPointerUp={endPan}
      onPointerLeave={endPan}
      onWheel={handleWheel}
      onClick={handleCanvasClick}
    >
      <GridBackground zoomScale={zoomScale} panX={panX} panY={panY} />
      <VectorEdgeLayer />
      <div style={{
        position: 'absolute', left: 0, top: 0,
        width: '100%', height: '100%',
        transform: `translate(${panX}px, ${panY}px)`,
      }}>
        <div style={{
          position: 'absolute', left: 0, top: 0,
          transform: `scale(${zoomScale})`,
          transformOrigin: '0 0',
        }}>
          {visibleNodeIds.map((id) => (
            <MindMapNode key={id} nodeId={id} />
          ))}
        </div>
      </div>
    </div>
  );
});
