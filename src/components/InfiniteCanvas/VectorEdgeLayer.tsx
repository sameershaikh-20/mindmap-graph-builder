import React from 'react';
import { useGraphStore } from '../../store/useGraphStore';
import { useBezierPath } from '../../hooks/useBezierPath';

interface EdgeLineProps {
  parentId: string;
  childId: string;
}

const EdgeLine = React.memo(function EdgeLine({ parentId, childId }: EdgeLineProps) {
  const { path } = useBezierPath(parentId, childId);

  if (!path) return null;

  return (
    <path
      d={path}
      stroke="#4a4a6a"
      strokeWidth={1.5}
      fill="none"
      strokeLinecap="round"
      opacity={0.6}
    />
  );
});

export const VectorEdgeLayer = React.memo(function VectorEdgeLayer() {
  const nodes = useGraphStore((s) => s.nodes);
  const panX = useGraphStore((s) => s.panX);
  const panY = useGraphStore((s) => s.panY);
  const zoomScale = useGraphStore((s) => s.zoomScale);

  const edges: { parentId: string; childId: string }[] = [];
  for (const id of Object.keys(nodes)) {
    const node = nodes[id];
    if (node.parentId && nodes[node.parentId]) {
      edges.push({ parentId: node.parentId, childId: id });
    }
  }

  return (
    <svg
      style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 0,
      }}
    >
      <g transform={`translate(${panX}, ${panY}) scale(${zoomScale})`}>
        {edges.map(({ parentId, childId }) => (
          <EdgeLine key={`${parentId}-${childId}`} parentId={parentId} childId={childId} />
        ))}
      </g>
    </svg>
  );
});
