import { useNavigate } from 'react-router-dom';
import { Button } from '../UI/Button';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useState, useEffect } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

export const LandingNavbar: React.FC = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 640px)');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Templates', path: '/templates' },
    { label: 'About', path: '/about' },
    { label: 'Help', path: '/help' },
  ];

  return (
    <nav
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 32px',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: scrolled ? 'rgba(15, 15, 26, 0.95)' : 'rgba(15, 15, 26, 0.6)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: scrolled ? '1px solid rgba(99,102,241,0.15)' : '1px solid transparent',
        boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.3)' : 'none',
        transition: 'all 0.3s ease',
      }}
    >
      <div
        style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}
        onClick={() => navigate('/')}
      >
        <div style={{
          width: 32, height: 32, borderRadius: 8,
          background: 'linear-gradient(135deg, #6366f1, #ec4899)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 16, fontWeight: 700, color: '#fff',
        }}>
          M
        </div>
        <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: '#ffffff', letterSpacing: '-0.02em' }}>
          MindMap
        </h1>
      </div>

      {isMobile ? (
        <>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: menuOpen ? 'rgba(255,255,255,0.1)' : 'none',
              border: 'none', color: '#a1a1aa', cursor: 'pointer',
              fontSize: 24, padding: 6, borderRadius: 6,
              transition: 'all 0.2s',
            }}
            aria-label="Menu"
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
          {menuOpen && (
            <div
              style={{
                position: 'absolute', top: 64, right: 16,
                background: 'rgba(30,30,63,0.98)', backdropFilter: 'blur(16px)',
                border: '1px solid rgba(99,102,241,0.2)',
                borderRadius: 12, padding: 8, display: 'flex',
                flexDirection: 'column', gap: 4, minWidth: 200,
                boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
              }}
            >
              {navLinks.map((link) => (
                <button
                  key={link.path}
                  onClick={() => { navigate(link.path); setMenuOpen(false); }}
                  style={{
                    padding: '10px 16px', border: 'none', borderRadius: 8,
                    background: 'transparent', color: '#a1a1aa', cursor: 'pointer',
                    fontSize: 14, fontFamily: 'Inter, sans-serif', textAlign: 'left',
                    transition: 'all 0.15s',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(99,102,241,0.12)'; e.currentTarget.style.color = '#fff'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#a1a1aa'; }}
                >
                  {link.label}
                </button>
              ))}
              <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', margin: '4px 0' }} />
              <Button size="sm" fullWidth onClick={() => { navigate('/dashboard'); setMenuOpen(false); }}>
                Get Started
              </Button>
            </div>
          )}
        </>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {navLinks.map((link) => (
            <span
              key={link.path}
              onClick={() => navigate(link.path)}
              style={{
                color: '#a1a1aa', cursor: 'pointer', fontSize: 14,
                padding: '6px 14px', borderRadius: 6,
                transition: 'all 0.2s', fontWeight: 500,
                position: 'relative',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#fff';
                e.currentTarget.style.background = 'rgba(99,102,241,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#a1a1aa';
                e.currentTarget.style.background = 'transparent';
              }}
            >
              {link.label}
            </span>
          ))}
          <div style={{ width: 1, height: 24, background: 'rgba(255,255,255,0.1)', margin: '0 8px' }} />
          <Button size="sm" onClick={() => navigate('/dashboard')}>Get Started</Button>
        </div>
      )}
    </nav>
  );
};
