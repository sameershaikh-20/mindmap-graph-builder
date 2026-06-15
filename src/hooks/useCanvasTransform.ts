import { useCallback, useRef, useEffect, useState } from 'react';
import { useGraphStore } from '../store/useGraphStore';

export function useCanvasTransform() {
  const panX = useGraphStore((s) => s.panX);
  const panY = useGraphStore((s) => s.panY);
  const zoomScale = useGraphStore((s) => s.zoomScale);
  const setPan = useGraphStore((s) => s.actions.setPan);
  const setZoom = useGraphStore((s) => s.actions.setZoom);

  const isPanning = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });
  const [spaceHeld, setSpaceHeld] = useState(false);
  const targetPan = useRef({ x: panX, y: panY });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !(e.target instanceof HTMLInputElement)) {
        e.preventDefault();
        setSpaceHeld(true);
      }
    };
    const up = (e: KeyboardEvent) => {
      if (e.code === 'Space') setSpaceHeld(false);
    };
    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);
    return () => {
      window.removeEventListener('keydown', down);
      window.removeEventListener('keyup', up);
    };
  }, []);

  useEffect(() => {
    targetPan.current = { x: panX, y: panY };
  }, [panX, panY]);

  const animatePan = useCallback((toX: number, toY: number) => {
    targetPan.current = { x: toX, y: toY };
    const startX = panX;
    const startY = panY;
    const startTime = performance.now();
    const duration = 200;

    const tick = (now: number) => {
      const t = Math.min((now - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      const x = startX + (toX - startX) * ease;
      const y = startY + (toY - startY) * ease;
      setPan(x, y);
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    };
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(tick);
  }, [panX, panY, setPan]);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    const newZoom = Math.max(0.1, Math.min(5, zoomScale + delta));

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const worldX = (mouseX - panX) / zoomScale;
    const worldY = (mouseY - panY) / zoomScale;

    const newPanX = mouseX - worldX * newZoom;
    const newPanY = mouseY - worldY * newZoom;

    setZoom(newZoom);
    setPan(newPanX, newPanY);
  }, [panX, panY, zoomScale, setPan, setZoom]);

  const startPan = useCallback((e: React.PointerEvent) => {
    if (e.button === 1 || (e.button === 0 && (spaceHeld || e.currentTarget === e.target))) {
      isPanning.current = true;
      lastPos.current = { x: e.clientX, y: e.clientY };
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    }
  }, [spaceHeld]);

  const movePan = useCallback((e: React.PointerEvent) => {
    if (!isPanning.current) return;
    const dx = e.clientX - lastPos.current.x;
    const dy = e.clientY - lastPos.current.y;
    lastPos.current = { x: e.clientX, y: e.clientY };
    setPan(panX + dx, panY + dy);
  }, [panX, panY, setPan]);

  const endPan = useCallback(() => {
    isPanning.current = false;
  }, []);

  const fitToScreen = useCallback(() => {
    const state = useGraphStore.getState();
    const ids = Object.keys(state.nodes);
    if (ids.length === 0) return;

    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (const id of ids) {
      const n = state.nodes[id];
      if (n.x < minX) minX = n.x;
      if (n.y < minY) minY = n.y;
      if (n.x > maxX) maxX = n.x;
      if (n.y > maxY) maxY = n.y;
    }

    const w = window.innerWidth;
    const h = window.innerHeight;
    const graphW = maxX - minX + 400;
    const graphH = maxY - minY + 200;
    const scale = Math.min(w / graphW, h / graphH, 2);
    const centerX = (minX + maxX) / 2;
    const centerY = (minY + maxY) / 2;

    setZoom(scale);
    animatePan(w / 2 - centerX * scale, h / 2 - centerY * scale);
  }, [setPan, setZoom, animatePan]);

  const resetView = useCallback(() => {
    setZoom(1);
    animatePan(0, 0);
  }, [setZoom, animatePan]);

  useEffect(() => {
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return {
    panX, panY, zoomScale,
    handleWheel, startPan, movePan, endPan, isPanning,
    fitToScreen, resetView, spaceHeld,
  };
}
