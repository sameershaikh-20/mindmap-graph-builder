import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../UI/Button';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { FiMenu, FiX, FiUser, FiSettings, FiHome } from 'react-icons/fi';
import { useState } from 'react';

interface NavbarProps {
  onToggleSidebar?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery('(max-width: 640px)');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isEditor = location.pathname.startsWith('/editor');

  return (
    <nav
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
        height: 56,
        background: '#1e1e3f',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        position: 'relative',
        zIndex: 100,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        {onToggleSidebar && !isMobile && (
          <button
            onClick={onToggleSidebar}
            style={{ background: 'none', border: 'none', color: '#a1a1aa', cursor: 'pointer', fontSize: 20, padding: 4 }}
            aria-label="Toggle sidebar"
          >
            <FiMenu />
          </button>
        )}
        <h1
          style={{
            margin: 0,
            fontSize: 16,
            fontWeight: 600,
            color: '#ffffff',
            cursor: 'pointer',
          }}
          onClick={() => navigate('/dashboard')}
        >
          MindMap
        </h1>
      </div>

      {!isEditor && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {isMobile ? (
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{ background: 'none', border: 'none', color: '#a1a1aa', cursor: 'pointer', fontSize: 20, padding: 4 }}
              aria-label="Menu"
            >
              {mobileMenuOpen ? <FiX /> : <FiMenu />}
            </button>
          ) : (
            <>
              <Button
                variant="ghost"
                size="sm"
                icon={<FiHome size={14} />}
                onClick={() => navigate('/')}
              >
                Home
              </Button>
              <Button
                variant="ghost"
                size="sm"
                icon={<FiUser size={14} />}
                onClick={() => navigate('/profile')}
              >
                Profile
              </Button>
              <Button
                variant="ghost"
                size="sm"
                icon={<FiSettings size={14} />}
                onClick={() => navigate('/settings')}
              />
            </>
          )}
        </div>
      )}

      {isMobile && mobileMenuOpen && (
        <div
          style={{
            position: 'absolute',
            top: 56,
            right: 0,
            background: '#1e1e3f',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 8,
            padding: 8,
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            minWidth: 160,
          }}
        >
          <Button variant="ghost" size="sm" fullWidth onClick={() => { navigate('/'); setMobileMenuOpen(false); }}>
            Home
          </Button>
          <Button variant="ghost" size="sm" fullWidth onClick={() => { navigate('/profile'); setMobileMenuOpen(false); }}>
            Profile
          </Button>
          <Button variant="ghost" size="sm" fullWidth onClick={() => { navigate('/settings'); setMobileMenuOpen(false); }}>
            Settings
          </Button>
        </div>
      )}
    </nav>
  );
};
