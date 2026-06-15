import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/UI/Button';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: '#1a1a2e',
        padding: 24,
      }}
    >
      <h1
        style={{
          fontSize: 80,
          fontWeight: 600,
          color: '#6366f1',
          marginBottom: 8,
        }}
      >
        404
      </h1>
      <p style={{ color: '#ffffff', fontSize: 20, marginBottom: 8 }}>Page not found</p>
      <p style={{ color: '#a1a1aa', fontSize: 14, marginBottom: 32 }}>
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Button onClick={() => navigate('/')}>
        Go Home
      </Button>
    </div>
  );
};

export default NotFound;
