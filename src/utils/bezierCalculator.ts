export function calculateBezierPath(
  x1: number, y1: number,
  x2: number, y2: number
): string {
  const dx = Math.abs(x2 - x1);
  const dy = Math.abs(y2 - y1);
  const cx = Math.max(dx * 0.4, 80);
  const cy = Math.max(dy * 0.1, 20);
  return `M ${x1} ${y1} C ${x1 + cx} ${y1 - cy}, ${x2 - cx} ${y2 + cy}, ${x2} ${y2}`;
}

const depthColors: Record<number, string> = {
  0: '#6366f1',
  1: '#8b5cf6',
  2: '#a78bfa',
  3: '#c4b5fd',
  4: '#ddd6fe',
};

export function getEdgeColor(depth: number): string {
  return depthColors[depth] || '#6366f1';
}
