import { useState } from 'react';
import { FiMonitor, FiClock, FiDatabase, FiAlertTriangle, FiTrash2 } from 'react-icons/fi';

const Toggle = ({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) => (
  <div
    onClick={onToggle}
    style={{
      width: 44, height: 24, borderRadius: 12,
      background: enabled ? '#6366f1' : 'rgba(255,255,255,0.12)',
      cursor: 'pointer', position: 'relative',
      transition: 'background 0.2s',
    }}
  >
    <div style={{
      width: 18, height: 18, borderRadius: '50%',
      background: '#fff', position: 'absolute',
      top: 3, left: enabled ? 23 : 3,
      transition: 'left 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
    }} />
  </div>
);

export const Settings = () => {
  const [autoSave, setAutoSave] = useState(true);
  const [autoSaveInterval, setAutoSaveInterval] = useState(30);
  const [animations, setAnimations] = useState(true);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const handleClearData = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div style={{ padding: '32px', maxWidth: 700, margin: '0 auto' }}>
      <div style={{ marginBottom: 36 }}>
        <h1 style={{ color: '#ffffff', fontSize: 26, fontWeight: 700, marginBottom: 8, letterSpacing: '-0.02em' }}>
          Settings
        </h1>
        <p style={{ color: '#a1a1aa', fontSize: 14 }}>
          Manage your workspace preferences
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Appearance */}
        <div style={{
          background: '#2a2a4a', borderRadius: 12,
          border: '1px solid rgba(255,255,255,0.06)',
          padding: 24, position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 4, background: 'linear-gradient(180deg, #6366f1, #4f46e5)', borderRadius: '12px 0 0 12px' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 8,
              background: 'rgba(99,102,241,0.12)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#6366f1',
            }}>
              <FiMonitor size={18} />
            </div>
            <h3 style={{ color: '#ffffff', fontSize: 16, fontWeight: 600, margin: 0 }}>Appearance</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ color: '#ffffff', fontSize: 14, margin: '0 0 2px', fontWeight: 500 }}>Dark Mode</p>
                <p style={{ color: '#666', fontSize: 12, margin: 0 }}>Currently the only theme available</p>
              </div>
              <Toggle enabled={true} onToggle={() => {}} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ color: '#ffffff', fontSize: 14, margin: '0 0 2px', fontWeight: 500 }}>Animations</p>
                <p style={{ color: '#666', fontSize: 12, margin: 0 }}>Enable smooth transitions</p>
              </div>
              <Toggle enabled={animations} onToggle={() => setAnimations(!animations)} />
            </div>
          </div>
        </div>

        {/* Workspace */}
        <div style={{
          background: '#2a2a4a', borderRadius: 12,
          border: '1px solid rgba(255,255,255,0.06)',
          padding: 24, position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 4, background: 'linear-gradient(180deg, #14b8a6, #0d9488)', borderRadius: '12px 0 0 12px' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 8,
              background: 'rgba(20,184,166,0.12)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#14b8a6',
            }}>
              <FiClock size={18} />
            </div>
            <h3 style={{ color: '#ffffff', fontSize: 16, fontWeight: 600, margin: 0 }}>Workspace</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ color: '#ffffff', fontSize: 14, margin: '0 0 2px', fontWeight: 500 }}>Auto-save</p>
                <p style={{ color: '#666', fontSize: 12, margin: 0 }}>Automatically save your work</p>
              </div>
              <Toggle enabled={autoSave} onToggle={() => setAutoSave(!autoSave)} />
            </div>
            {autoSave && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ color: '#a1a1aa', fontSize: 13 }}>Save interval</span>
                  <span style={{ color: '#fff', fontSize: 13, fontWeight: 500 }}>{autoSaveInterval}s</span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={120}
                  step={5}
                  value={autoSaveInterval}
                  onChange={(e) => setAutoSaveInterval(Number(e.target.value))}
                  style={{
                    width: '100%',
                    height: 6,
                    borderRadius: 3,
                    appearance: 'none',
                    WebkitAppearance: 'none',
                    background: `linear-gradient(to right, #6366f1 ${((autoSaveInterval - 5) / 115) * 100}%, rgba(255,255,255,0.1) ${((autoSaveInterval - 5) / 115) * 100}%)`,
                    outline: 'none',
                    cursor: 'pointer',
                  }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Data & Privacy */}
        <div style={{
          background: '#2a2a4a', borderRadius: 12,
          border: '1px solid rgba(255,255,255,0.06)',
          padding: 24, position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 4, background: 'linear-gradient(180deg, #8b5cf6, #7c3aed)', borderRadius: '12px 0 0 12px' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 8,
              background: 'rgba(139,92,246,0.12)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#8b5cf6',
            }}>
              <FiDatabase size={18} />
            </div>
            <h3 style={{ color: '#ffffff', fontSize: 16, fontWeight: 600, margin: 0 }}>Data & Privacy</h3>
          </div>
          <p style={{ color: '#a1a1aa', fontSize: 14, lineHeight: 1.6, marginBottom: 20 }}>
            Your data is stored locally in your browser. No data is sent to external servers.
          </p>
        </div>

        {/* Danger Zone */}
        <div style={{
          background: '#2a2a4a', borderRadius: 12,
          border: '1px solid rgba(239,68,68,0.2)',
          padding: 24, position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 4, background: 'linear-gradient(180deg, #ef4444, #dc2626)', borderRadius: '12px 0 0 12px' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 8,
              background: 'rgba(239,68,68,0.12)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#ef4444',
            }}>
              <FiAlertTriangle size={18} />
            </div>
            <h3 style={{ color: '#ef4444', fontSize: 16, fontWeight: 600, margin: 0 }}>Danger Zone</h3>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ color: '#ffffff', fontSize: 14, margin: '0 0 2px', fontWeight: 500 }}>Clear All Data</p>
              <p style={{ color: '#666', fontSize: 12, margin: 0 }}>Permanently delete all maps and settings</p>
            </div>
            {showClearConfirm ? (
              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  onClick={() => setShowClearConfirm(false)}
                  style={{
                    padding: '8px 16px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)',
                    background: 'transparent', color: '#a1a1aa', cursor: 'pointer', fontSize: 13,
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleClearData}
                  style={{
                    padding: '8px 16px', borderRadius: 8, border: 'none',
                    background: '#ef4444', color: '#fff', cursor: 'pointer', fontSize: 13,
                    fontFamily: 'Inter, sans-serif', fontWeight: 500,
                  }}
                >
                  Yes, Delete Everything
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowClearConfirm(true)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '8px 16px', borderRadius: 8, border: '1px solid rgba(239,68,68,0.3)',
                  background: 'rgba(239,68,68,0.08)', color: '#ef4444', cursor: 'pointer',
                  fontSize: 13, fontFamily: 'Inter, sans-serif', fontWeight: 500,
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(239,68,68,0.15)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(239,68,68,0.08)'; }}
              >
                <FiTrash2 size={14} /> Clear All Data
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
