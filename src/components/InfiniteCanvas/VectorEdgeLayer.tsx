import React from 'react';
import { useGraphStore } from '../../store/useGraphStore';
import { useBezierPath } from '../../hooks/useBezierPath';

interface EdgeLineProps {
  parentId: string;
  childId: string;
}

const EdgeLine = React.memo(function EdgeLine({ parentId, childId }: EdgeLineProps) {
  const { path, color } = useBezierPath(parentId, childId);

  if (!path) return null;

  return (
    <g>
      {/* Glow behind edge */}
      <path
        d={path}
        stroke={color}
        strokeWidth={4}
        fill="none"
        strokeLinecap="round"
        opacity={0.08}
      />
      {/* Main edge */}
      <path
        d={path}
        stroke={color}
        strokeWidth={2}
        fill="none"
        strokeLinecap="round"
        opacity={0.5}
      />
      {/* Bright core */}
      <path
        d={path}
        stroke={color}
        strokeWidth={1}
        fill="none"
        strokeLinecap="round"
        opacity={0.8}
      />
    </g>
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
      <defs>
        <filter id="edge-glow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g transform={`translate(${panX}, ${panY}) scale(${zoomScale})`} filter="url(#edge-glow)">
        {edges.map(({ parentId, childId }) => (
          <EdgeLine key={`${parentId}-${childId}`} parentId={parentId} childId={childId} />
        ))}
      </g>
    </svg>
  );
});
