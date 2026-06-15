import { useNavigate } from 'react-router-dom';
import { Button } from '../UI/Button';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

export const LandingNavbar: React.FC = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 640px)');
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 24px',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: 'rgba(15, 15, 26, 0.85)',
        backdropFilter: 'blur(12px)',
      }}
    >
      <h1
        style={{ margin: 0, fontSize: 20, fontWeight: 600, color: '#ffffff', cursor: 'pointer' }}
        onClick={() => navigate('/')}
      >
        MindMap
      </h1>

      {isMobile ? (
        <>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: 'none', border: 'none', color: '#a1a1aa', cursor: 'pointer', fontSize: 24, padding: 4 }}
            aria-label="Menu"
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
          {menuOpen && (
            <div
              style={{
                position: 'absolute',
                top: 60,
                right: 16,
                background: '#1e1e3f',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 8,
                padding: 8,
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
                minWidth: 180,
              }}
            >
              <Button variant="ghost" size="sm" fullWidth onClick={() => { navigate('/dashboard'); setMenuOpen(false); }}>Dashboard</Button>
              <Button variant="ghost" size="sm" fullWidth onClick={() => { navigate('/templates'); setMenuOpen(false); }}>Templates</Button>
              <Button variant="ghost" size="sm" fullWidth onClick={() => { navigate('/about'); setMenuOpen(false); }}>About</Button>
              <Button variant="ghost" size="sm" fullWidth onClick={() => { navigate('/help'); setMenuOpen(false); }}>Help</Button>
            </div>
          )}
        </>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <span
            style={{ color: '#666', cursor: 'pointer', fontSize: 14 }}
            onClick={() => navigate('/dashboard')}
          >
            Dashboard
          </span>
          <span
            style={{ color: '#666', cursor: 'pointer', fontSize: 14 }}
            onClick={() => navigate('/templates')}
          >
            Templates
          </span>
          <span
            style={{ color: '#666', cursor: 'pointer', fontSize: 14 }}
            onClick={() => navigate('/about')}
          >
            About
          </span>
          <span
            style={{ color: '#666', cursor: 'pointer', fontSize: 14 }}
            onClick={() => navigate('/help')}
          >
            Help
          </span>
          <Button size="sm" onClick={() => navigate('/dashboard')}>Let&apos;s Start</Button>
        </div>
      )}
    </nav>
  );
};
