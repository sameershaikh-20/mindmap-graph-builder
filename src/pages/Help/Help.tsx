import { Card } from '../../components/UI/Card';

const shortcuts = [
  { keys: 'Ctrl/Cmd + Z', action: 'Undo' },
  { keys: 'Ctrl/Cmd + Shift + Z', action: 'Redo' },
  { keys: 'Ctrl/Cmd + S', action: 'Save' },
  { keys: 'Enter', action: 'Add child node' },
  { keys: 'Tab', action: 'Add sibling node' },
  { keys: 'Delete/Backspace', action: 'Delete selected node' },
  { keys: 'Escape', action: 'Deselect node' },
  { keys: 'Ctrl/Cmd + +/-', action: 'Zoom in/out' },
  { keys: 'Ctrl/Cmd + 0', action: 'Reset zoom' },
];

export const Help = () => {
  return (
    <div style={{ padding: '32px', maxWidth: 700, margin: '0 auto' }}>
      <h1 style={{ color: '#ffffff', fontSize: 24, fontWeight: 600, marginBottom: 32 }}>
        Help & Keyboard Shortcuts
      </h1>

      <Card padding={24}>
        <h3 style={{ color: '#ffffff', fontSize: 16, fontWeight: 600, marginBottom: 16 }}>
          Getting Started
        </h3>
        <p style={{ color: '#a1a1aa', fontSize: 14, lineHeight: 1.6, marginBottom: 8 }}>
          MindMap Graph Builder lets you create beautiful mind maps on an infinite canvas.
          Click anywhere to create a new root node, then use Enter to add child nodes.
        </p>
        <p style={{ color: '#a1a1aa', fontSize: 14, lineHeight: 1.6 }}>
          Drag nodes to reposition them, use the scroll wheel to zoom, and click and drag
          the background to pan around the canvas.
        </p>
      </Card>

      <Card padding={24} style={{ marginTop: 16 }}>
        <h3 style={{ color: '#ffffff', fontSize: 16, fontWeight: 600, marginBottom: 16 }}>
          Keyboard Shortcuts
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {shortcuts.map((s) => (
            <div
              key={s.keys}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '8px 0',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <span style={{ color: '#a1a1aa', fontSize: 13 }}>{s.action}</span>
              <kbd
                style={{
                  padding: '3px 8px',
                  borderRadius: 4,
                  background: '#2a2a4a',
                  color: '#c4c4d4',
                  fontSize: 12,
                  fontFamily: 'monospace',
                }}
              >
                {s.keys}
              </kbd>
            </div>
          ))}
        </div>
      </Card>

      <Card padding={24} style={{ marginTop: 16 }}>
        <h3 style={{ color: '#ffffff', fontSize: 16, fontWeight: 600, marginBottom: 16 }}>
          Need More Help?
        </h3>
        <p style={{ color: '#a1a1aa', fontSize: 14 }}>
          Contact us at support@mindmap.app for additional assistance.
        </p>
      </Card>
    </div>
  );
};

export default Help;
