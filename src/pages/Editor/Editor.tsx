import { useParams, useNavigate } from 'react-router-dom';
import { useKeyboardShortcuts } from '../../hooks/useKeyboardShortcuts';
import { useLocalStorageSync } from '../../hooks/useLocalStorageSync';
import { useAutoLayout } from '../../hooks/useAutoLayout';
import { InfiniteCanvas } from '../../components/InfiniteCanvas/InfiniteCanvas';
import { WorkspaceOverlay } from '../../components/WorkspaceOverlay/WorkspaceOverlay';
import { ToastContainer } from '../../components/UI/Toast';
import { NodeStyles } from '../../components/MindMapNode/NodeStyles';
import { FiArrowLeft, FiSave, FiDownload, FiFileText, FiImage, FiUpload, FiLayout } from 'react-icons/fi';
import { Button } from '../../components/UI/Button';
import { ButtonGroup, GroupDivider } from '../../components/UI/ButtonGroup';
import { useGraphStore } from '../../store/useGraphStore';
import { useCallback, useRef, useEffect, useState } from 'react';

export const Editor = () => {
  const { graphId } = useParams();
  const navigate = useNavigate();
  const lastSaved = useGraphStore((s) => s.lastSaved);
  const manualSave = useLocalStorageSync().manualSave;
  const { importJSON } = useLocalStorageSync();
  const { triggerAutoLayout } = useAutoLayout();
  const actions = useGraphStore((s) => s.actions);
  const canUndo = useGraphStore((s) => s.historyIndex > 0);
  const canRedo = useGraphStore((s) => s.historyIndex < s.history.length - 1);
  const undo = useGraphStore((s) => s.actions.undo);
  const redo = useGraphStore((s) => s.actions.redo);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useKeyboardShortcuts();
  useLocalStorageSync();

  useEffect(() => {
    if (!graphId) return;
    const saved = localStorage.getItem(`graph-${graphId}`);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.nodes && data.rootNodeId) {
          actions.loadGraph(data.nodes, data.rootNodeId);
        }
      } catch {}
    }
  }, [graphId, actions]);

  const handleExportJSON = useCallback(() => {
    const state = useGraphStore.getState();
    const data = JSON.stringify({ nodes: state.nodes, rootNodeId: state.rootNodeId }, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mindmap-${graphId}.json`;
    a.click();
    URL.revokeObjectURL(url);
    actions.addToast('JSON exported', 'success');
  }, [graphId, actions]);

  const handleExportSVG = useCallback(() => {
    const svg = document.querySelector('svg');
    if (!svg) return;
    const clone = svg.cloneNode(true) as SVGElement;
    const data = new XMLSerializer().serializeToString(clone);
    const blob = new Blob([data], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mindmap-${graphId}.svg`;
    a.click();
    URL.revokeObjectURL(url);
    actions.addToast('SVG exported', 'success');
  }, [graphId, actions]);

  const handleExportPNG = useCallback(() => {
    const svg = document.querySelector('svg');
    if (!svg) return;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const data = new XMLSerializer().serializeToString(svg);
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.fillStyle = '#1a1a2e';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `mindmap-${graphId}.png`;
        a.click();
        URL.revokeObjectURL(url);
        actions.addToast('PNG exported', 'success');
      });
    };
    img.src = 'data:image/svg+xml;base64,' + btoa(data);
  }, [graphId, actions]);

  const handleClear = useCallback(() => {
    actions.clearCanvas();
    actions.addToast('Canvas cleared', 'info');
  }, [actions]);

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

  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const saveIndicator = lastSaved
    ? `Saved ${Math.floor((now - new Date(lastSaved).getTime()) / 1000)}s ago`
    : 'Not saved yet';

  const isSynced = lastSaved && (now - new Date(lastSaved).getTime()) < 5000;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#1a1a2e' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 16px',
          background: 'rgba(26,26,46,0.95)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          zIndex: 10,
          backdropFilter: 'blur(12px)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button
            onClick={() => navigate('/dashboard')}
            style={{
              background: 'none',
              border: 'none',
              color: '#a1a1aa',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontSize: 13,
              fontFamily: 'Inter, sans-serif',
              padding: '4px 8px',
              borderRadius: 4,
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(99,102,241,0.15)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#a1a1aa'; e.currentTarget.style.background = 'none'; }}
          >
            <FiArrowLeft size={16} />
            Back
          </button>
          <span style={{ color: '#ffffff', fontSize: 14, fontWeight: 500 }}>
            Mind Map
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{
              width: 6, height: 6, borderRadius: '50%',
              background: isSynced ? '#22c55e' : '#a1a1aa',
              boxShadow: isSynced ? '0 0 8px rgba(34,197,94,0.5)' : 'none',
              transition: 'background 0.3s',
            }} />
            <span style={{ color: '#a1a1aa', fontSize: 11, fontFamily: 'Inter, sans-serif' }}>
              {saveIndicator}
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <ButtonGroup>
            <Button variant="ghost" size="sm" onClick={undo} disabled={!canUndo} aria-label="Undo">↶</Button>
            <Button variant="ghost" size="sm" onClick={redo} disabled={!canRedo} aria-label="Redo">↷</Button>
          </ButtonGroup>

          <GroupDivider />

          <ButtonGroup>
            <Button variant="ghost" size="sm" icon={<FiLayout size={14} />} onClick={triggerAutoLayout}>
              Arrange
            </Button>
            <Button variant="ghost" size="sm" onClick={handleClear}>
              Clear
            </Button>
          </ButtonGroup>

          <GroupDivider />

          <ButtonGroup>
            <Button variant="ghost" size="sm" icon={<FiFileText size={14} />} onClick={handleExportJSON}>
              JSON
            </Button>
            <Button variant="ghost" size="sm" icon={<FiImage size={14} />} onClick={handleExportSVG}>
              SVG
            </Button>
            <Button variant="ghost" size="sm" icon={<FiDownload size={14} />} onClick={handleExportPNG}>
              PNG
            </Button>
          </ButtonGroup>

          <GroupDivider />

          <ButtonGroup>
            <Button variant="ghost" size="sm" icon={<FiUpload size={14} />} onClick={() => fileInputRef.current?.click()}>
              Import
            </Button>
            <Button variant="ghost" size="sm" icon={<FiSave size={14} />} onClick={manualSave}>
              Save
            </Button>
          </ButtonGroup>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          style={{ display: 'none' }}
          onChange={handleFileImport}
        />
      </div>

      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        <NodeStyles />
        <InfiniteCanvas />
        <WorkspaceOverlay />
        <ToastContainer />
      </div>
    </div>
  );
};

export default Editor;
