import React, { useCallback, useRef, useState } from 'react';
import { useGraphStore } from '../../store/useGraphStore';
import { useAutoLayout } from '../../hooks/useAutoLayout';
import { useLocalStorageSync } from '../../hooks/useLocalStorageSync';
import { exportJSON, exportSVG, exportPNG } from '../../utils/exportUtils';
import { Button } from '../UI/Button';
import { Modal } from '../UI/Modal';

export const AssetPortArray = React.memo(function AssetPortArray() {
  const nodes = useGraphStore((s) => s.nodes);
  const rootNodeId = useGraphStore((s) => s.rootNodeId);
  const clearCanvas = useGraphStore((s) => s.actions.clearCanvas);
  const addToast = useGraphStore((s) => s.actions.addToast);
  const canUndo = useGraphStore((s) => s.historyIndex > 0);
  const canRedo = useGraphStore((s) => s.historyIndex < s.history.length - 1);
  const undo = useGraphStore((s) => s.actions.undo);
  const redo = useGraphStore((s) => s.actions.redo);

  const { triggerAutoLayout } = useAutoLayout();
  const { manualSave, importJSON, getSavedGraphs, loadSavedGraph, removeSavedGraph } = useLocalStorageSync();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [importText, setImportText] = useState('');
  const [showLoad, setShowLoad] = useState(false);
  const [savedGraphs, setSavedGraphs] = useState<any[]>([]);

  const handleExportJSON = useCallback(() => {
    exportJSON(nodes, rootNodeId);
    addToast('Exported as JSON', 'success');
  }, [nodes, rootNodeId, addToast]);

  const handleExportSVG = useCallback(() => {
    exportSVG(nodes, rootNodeId);
    addToast('Exported as SVG', 'success');
  }, [nodes, rootNodeId, addToast]);

  const handleExportPNG = useCallback(() => {
    exportPNG(nodes, rootNodeId);
    addToast('Exported as PNG', 'success');
  }, [nodes, rootNodeId, addToast]);

  const handleImportClick = useCallback(() => {
    setShowImport(true);
    setImportText('');
  }, []);

  const handleImportSubmit = useCallback(() => {
    importJSON(importText);
    setShowImport(false);
  }, [importText, importJSON]);

  const handleFileImport = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      importJSON(text);
    };
    reader.readAsText(file);
    e.target.value = '';
  }, [importJSON]);

  const handleLoadClick = useCallback(async () => {
    const graphs = await getSavedGraphs();
    setSavedGraphs(graphs);
    setShowLoad(true);
  }, [getSavedGraphs]);

  const handleLoad = useCallback(async (id: number) => {
    await loadSavedGraph(id);
    setShowLoad(false);
  }, [loadSavedGraph]);

  const handleDeleteGraph = useCallback(async (id: number) => {
    await removeSavedGraph(id);
    const graphs = await getSavedGraphs();
    setSavedGraphs(graphs);
  }, [removeSavedGraph, getSavedGraphs]);

  return (
    <>
      <div style={{
        position: 'fixed', top: 56, left: 16, zIndex: 50,
        display: 'flex', alignItems: 'center', gap: 4,
        background: 'rgba(30,30,63,0.85)', backdropFilter: 'blur(12px)',
        borderRadius: 10, padding: '6px 10px',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
        flexWrap: 'wrap', justifyContent: 'center',
      }}>
        <Button size="sm" variant="ghost" onClick={undo} disabled={!canUndo} aria-label="Undo">↩</Button>
        <Button size="sm" variant="ghost" onClick={redo} disabled={!canRedo} aria-label="Redo">↪</Button>
        <div style={{ width: 1, height: 20, background: 'rgba(255,255,255,0.1)', margin: '0 2px' }} />
        <Button size="sm" variant="ghost" onClick={triggerAutoLayout}>Auto-Arrange</Button>
        <Button size="sm" variant="ghost" onClick={() => setShowClearConfirm(true)}>Clear</Button>
        <div style={{ width: 1, height: 20, background: 'rgba(255,255,255,0.1)', margin: '0 2px' }} />
        <Button size="sm" variant="ghost" onClick={handleExportJSON}>JSON</Button>
        <Button size="sm" variant="ghost" onClick={handleExportSVG}>SVG</Button>
        <Button size="sm" variant="ghost" onClick={handleExportPNG}>PNG</Button>
        <Button size="sm" variant="ghost" onClick={handleImportClick}>Import</Button>
        <div style={{ width: 1, height: 20, background: 'rgba(255,255,255,0.1)', margin: '0 2px' }} />
        <Button size="sm" variant="ghost" onClick={manualSave}>Save</Button>
        <Button size="sm" variant="ghost" onClick={handleLoadClick}>Load</Button>

        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          style={{ display: 'none' }}
          onChange={handleFileImport}
        />
      </div>

      <Modal isOpen={showClearConfirm} onClose={() => setShowClearConfirm(false)} title="Clear Canvas">
        <p style={{ color: '#a1a1aa', fontSize: 14, margin: '0 0 16px' }}>
          Are you sure? This will delete all nodes.
        </p>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <Button variant="secondary" onClick={() => setShowClearConfirm(false)}>Cancel</Button>
          <Button variant="primary" onClick={() => { clearCanvas(); setShowClearConfirm(false); }}
            style={{ background: '#ef4444' }}>Clear</Button>
        </div>
      </Modal>

      <Modal isOpen={showImport} onClose={() => setShowImport(false)} title="Import JSON">
        <textarea
          value={importText}
          onChange={(e) => setImportText(e.target.value)}
          placeholder="Paste JSON here..."
          style={{
            width: '100%', minHeight: 150, background: '#12122a', border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 8, color: '#fff', padding: 12, fontSize: 12, fontFamily: 'monospace', resize: 'vertical',
          }}
        />
        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 12 }}>
          <Button variant="secondary" onClick={() => setShowImport(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleImportSubmit}>Import</Button>
        </div>
      </Modal>

      <Modal isOpen={showLoad} onClose={() => setShowLoad(false)} title="Load Saved Graph">
        {savedGraphs.length === 0 ? (
          <p style={{ color: '#a1a1aa', fontSize: 14 }}>No saved graphs found.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxHeight: 300, overflowY: 'auto' }}>
            {savedGraphs.map((g) => (
              <div key={g.id} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '8px 12px', background: '#12122a', borderRadius: 8,
                border: '1px solid rgba(255,255,255,0.06)',
              }}>
                <div>
                  <div style={{ color: '#fff', fontSize: 13 }}>{g.name}</div>
                  <div style={{ color: '#a1a1aa', fontSize: 11 }}>{new Date(g.updatedAt).toLocaleString()}</div>
                </div>
                <div style={{ display: 'flex', gap: 4 }}>
                  <Button size="sm" variant="primary" onClick={() => handleLoad(g.id!)}>Load</Button>
                  <Button size="sm" variant="ghost" onClick={() => handleDeleteGraph(g.id!)}
                    style={{ color: '#ef4444' }}>Del</Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Modal>
    </>
  );
});
