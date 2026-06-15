import { useNavigate, useLocation } from 'react-router-dom';
import { FiGrid, FiLayers, FiSettings, FiHelpCircle } from 'react-icons/fi';

const links = [
  { to: '/dashboard', label: 'Dashboard', icon: FiGrid },
  { to: '/templates', label: 'Templates', icon: FiLayers },
  { to: '/settings', label: 'Settings', icon: FiSettings },
  { to: '/help', label: 'Help', icon: FiHelpCircle },
];

export const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside
      style={{
        width: 220,
        background: '#1e1e3f',
        borderRight: '1px solid rgba(255,255,255,0.08)',
        display: 'flex',
        flexDirection: 'column',
        padding: '16px 0',
      }}
    >
      <nav style={{ display: 'flex', flexDirection: 'column', gap: 2, padding: '0 8px' }}>
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.to;
          return (
            <button
              key={link.to}
              onClick={() => navigate(link.to)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '10px 12px',
                border: 'none',
                borderRadius: 6,
                background: isActive ? '#2a2a4a' : 'transparent',
                color: isActive ? '#ffffff' : '#a1a1aa',
                cursor: 'pointer',
                fontSize: 14,
                fontFamily: 'Inter, sans-serif',
                transition: 'all 0.15s',
              }}
              onMouseEnter={(e) => {
                if (!isActive) e.currentTarget.style.background = '#2a2a4a';
              }}
              onMouseLeave={(e) => {
                if (!isActive) e.currentTarget.style.background = 'transparent';
              }}
            >
              <Icon size={16} />
              {link.label}
            </button>
          );
        })}
      </nav>

      <div style={{ flex: 1 }} />
    </aside>
  );
};
