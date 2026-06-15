import { useNavigate } from 'react-router-dom';

export const Footer: React.FC = () => {
  const navigate = useNavigate();

  return (
    <footer
      style={{
        padding: '40px 24px 24px',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        background: '#1a1a2e',
      }}
    >
      <div
        style={{
          maxWidth: 1000,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: 32,
        }}
      >
        <div>
          <h3 style={{ color: '#ffffff', fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Product</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={{ color: '#a1a1aa', fontSize: 13, cursor: 'pointer' }} onClick={() => navigate('/templates')}>Templates</span>
            <span style={{ color: '#a1a1aa', fontSize: 13, cursor: 'pointer' }} onClick={() => navigate('/about')}>About</span>
          </div>
        </div>
        <div>
          <h3 style={{ color: '#ffffff', fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Company</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={{ color: '#a1a1aa', fontSize: 13, cursor: 'pointer' }} onClick={() => navigate('/about')}>About</span>
            <span style={{ color: '#a1a1aa', fontSize: 13, cursor: 'pointer' }} onClick={() => navigate('/help')}>Help</span>
          </div>
        </div>
        <div>
          <h3 style={{ color: '#ffffff', fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Legal</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={{ color: '#a1a1aa', fontSize: 13 }}>Privacy</span>
            <span style={{ color: '#a1a1aa', fontSize: 13 }}>Terms</span>
          </div>
        </div>
        <div>
          <h3 style={{ color: '#ffffff', fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Connect</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={{ color: '#a1a1aa', fontSize: 13 }}>Twitter</span>
            <span style={{ color: '#a1a1aa', fontSize: 13 }}>GitHub</span>
          </div>
        </div>
      </div>
      <div style={{ textAlign: 'center', marginTop: 32, color: '#a1a1aa', fontSize: 12 }}>
        &copy; {new Date().getFullYear()} MindMap Graph Builder. All rights reserved.
      </div>
    </footer>
  );
};
