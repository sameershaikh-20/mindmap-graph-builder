import { Outlet, useNavigate } from 'react-router-dom';

export const AuthLayout: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        background: '#1a1a2e',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '420px',
          padding: '24px',
        }}
      >
        <div style={{ marginBottom: '32px', textAlign: 'center' }}>
          <h1
            style={{
              color: '#ffffff',
              cursor: 'pointer',
              margin: 0,
              fontSize: 24,
              fontWeight: 600,
            }}
            onClick={() => navigate('/')}
          >
            MindMap
          </h1>
        </div>

        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
