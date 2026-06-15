export function calculateBezierPath(
  x1: number, y1: number,
  x2: number, y2: number
): string {
  const dx = Math.abs(x2 - x1);
  const cx1 = x1 + Math.max(dx * 0.5, 100);
  const cy1 = y1;
  const cx2 = x2 - Math.max(dx * 0.5, 100);
  const cy2 = y2;
  return `M ${x1} ${y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}`;
}

export function getEdgeColor(_depth: number): string {
  return '#4a4a6a';
}
