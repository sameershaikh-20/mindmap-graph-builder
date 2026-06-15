import type { Node } from '../types';
import { saveAs } from 'file-saver';

export function exportJSON(nodes: Record<string, Node>, rootNodeId: string | null): void {
  const data = { nodes, rootNodeId, exportedAt: new Date().toISOString() };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  saveAs(blob, 'mindmap-export.json');
}

export function exportSVG(nodes: Record<string, Node>, rootNodeId: string | null): void {
  if (!rootNodeId || !nodes[rootNodeId]) return;

  const padding = 50;
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const id of Object.keys(nodes)) {
    const n = nodes[id];
    if (n.x < minX) minX = n.x;
    if (n.y < minY) minY = n.y;
    if (n.x > maxX) maxX = n.x;
    if (n.y > maxY) maxY = n.y;
  }
  const width = maxX - minX + 400;
  const height = maxY - minY + 200;

  let svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="${minX - padding} ${minY - padding} ${width} ${height}">
  <rect width="100%" height="100%" fill="#1a1a2e"/>
  <style>
    .node-rect { fill: #1e1e3f; stroke: #6366f1; stroke-width: 2; rx: 8; ry: 8; }
    .node-text { fill: #ffffff; font-family: Inter, sans-serif; font-size: 14px; }
    .edge { fill: none; stroke-width: 2; }
  </style>
`;

  for (const id of Object.keys(nodes)) {
    const n = nodes[id];
    if (n.parentId && nodes[n.parentId]) {
      const p = nodes[n.parentId];
      const dx = Math.abs(n.x - p.x);
      const cx1 = p.x + Math.max(dx * 0.5, 100);
      const cy1 = p.y;
      const cx2 = n.x - Math.max(dx * 0.5, 100);
      const cy2 = n.y;
      svgContent += `  <path class="edge" stroke="${getExportColor(n.depth)}" d="M ${p.x} ${p.y} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${n.x} ${n.y}"/>\n`;
    }
  }

  for (const id of Object.keys(nodes)) {
    const n = nodes[id];
    svgContent += `  <g transform="translate(${n.x - 100}, ${n.y - 30})">
    <rect class="node-rect" width="200" height="60"/>
    <text class="node-text" x="100" y="36" text-anchor="middle">${escapeXml(n.title)}</text>
  </g>\n`;
  }

  svgContent += '</svg>';
  const blob = new Blob([svgContent], { type: 'image/svg+xml' });
  saveAs(blob, 'mindmap-export.svg');
}

export function exportPNG(nodes: Record<string, Node>, rootNodeId: string | null): void {
  const svgBlob = new Blob([getSVGString(nodes, rootNodeId)], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(svgBlob);
  const img = new Image();
  img.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = img.width * 2;
    canvas.height = img.height * 2;
    const ctx = canvas.getContext('2d')!;
    ctx.scale(2, 2);
    ctx.drawImage(img, 0, 0);
    canvas.toBlob((blob) => {
      if (blob) saveAs(blob, 'mindmap-export.png');
      URL.revokeObjectURL(url);
    });
  };
  img.src = url;
}

function getSVGString(nodes: Record<string, Node>, rootNodeId: string | null): string {
  if (!rootNodeId || !nodes[rootNodeId]) return '';
  const padding = 50;
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const id of Object.keys(nodes)) {
    const n = nodes[id];
    if (n.x < minX) minX = n.x;
    if (n.y < minY) minY = n.y;
    if (n.x > maxX) maxX = n.x;
    if (n.y > maxY) maxY = n.y;
  }
  const width = maxX - minX + 400;
  const height = maxY - minY + 200;

  let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="${minX - padding} ${minY - padding} ${width} ${height}">
  <rect width="100%" height="100%" fill="#1a1a2e"/>
  <style>
    .node-rect { fill: #1e1e3f; stroke: #6366f1; stroke-width: 2; rx: 8; ry: 8; }
    .node-text { fill: #ffffff; font-family: Inter, sans-serif; font-size: 14px; }
    .edge { fill: none; stroke-width: 2; }
  </style>`;

  for (const id of Object.keys(nodes)) {
    const n = nodes[id];
    if (n.parentId && nodes[n.parentId]) {
      const p = nodes[n.parentId];
      const dx = Math.abs(n.x - p.x);
      svg += `  <path class="edge" stroke="${getExportColor(n.depth)}" d="M ${p.x} ${p.y} C ${p.x + Math.max(dx * 0.5, 100)} ${p.y}, ${n.x - Math.max(dx * 0.5, 100)} ${n.y}, ${n.x} ${n.y}"/>\n`;
    }
  }

  for (const id of Object.keys(nodes)) {
    const n = nodes[id];
    svg += `  <g transform="translate(${n.x - 100}, ${n.y - 30})">
    <rect class="node-rect" width="200" height="60"/>
    <text class="node-text" x="100" y="36" text-anchor="middle">${escapeXml(n.title)}</text>
  </g>\n`;
  }

  svg += '</svg>';
  return svg;
}

function getExportColor(depth: number): string {
  const colors = ['#6366f1', '#ec4899', '#14b8a6', '#f59e0b', '#22c55e', '#8b5cf6'];
  return colors[depth % colors.length];
}

function escapeXml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
