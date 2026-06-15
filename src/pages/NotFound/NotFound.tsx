import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/UI/Button';
import { FiHome, FiArrowLeft } from 'react-icons/fi';

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
        background: 'radial-gradient(ellipse at 50% 30%, rgba(99,102,241,0.08) 0%, transparent 60%), #1a1a2e',
        padding: 24,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Floating elements */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: 6 + (i % 3) * 4,
              height: 6 + (i % 3) * 4,
              borderRadius: '50%',
              background: i % 2 === 0 ? '#6366f1' : '#ec4899',
              opacity: 0.08,
              left: `${(i * 23 + 10) % 100}%`,
              top: `${(i * 31 + 15) % 100}%`,
              animation: `float ${3 + (i % 3)}s ease-in-out ${(i * 0.4) % 3}s infinite`,
            }}
          />
        ))}
      </div>

      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <div style={{
          fontSize: 120,
          fontWeight: 800,
          lineHeight: 1,
          marginBottom: 16,
          background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 50%, #14b8a6 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          letterSpacing: '-0.04em',
        }}>
          404
        </div>
        <h2 style={{
          color: '#ffffff',
          fontSize: 24,
          fontWeight: 600,
          marginBottom: 12,
          letterSpacing: '-0.02em',
        }}>
          Page Not Found
        </h2>
        <p style={{
          color: '#a1a1aa',
          fontSize: 16,
          marginBottom: 36,
          maxWidth: 400,
          lineHeight: 1.6,
        }}>
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <Button
            variant="secondary"
            icon={<FiArrowLeft size={16} />}
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>
          <Button
            icon={<FiHome size={16} />}
            onClick={() => navigate('/')}
          >
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
