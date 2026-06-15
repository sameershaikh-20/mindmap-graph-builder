import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/UI/Button';
import { FiMaximize2, FiGitBranch, FiDownload } from 'react-icons/fi';

const highlights = [
  { icon: FiMaximize2, label: 'Infinite Canvas' },
  { icon: FiGitBranch, label: 'Auto-Arrange' },
  { icon: FiDownload, label: 'Export SVG' },
];

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <section
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0f0f1a',
        padding: '100px 20px 60px',
      }}
    >
      <div style={{ textAlign: 'center', maxWidth: '600px' }}>
        <h1
          style={{
            fontSize: 'clamp(32px, 5vw, 48px)',
            fontWeight: 600,
            color: '#ffffff',
            marginBottom: 12,
            lineHeight: 1.2,
          }}
        >
          Mind-mapping, simplified.
        </h1>
        <p
          style={{
            fontSize: 'clamp(14px, 2vw, 17px)',
            color: '#a1a1aa',
            marginBottom: 28,
            lineHeight: 1.5,
          }}
        >
          Create, organize, and share mind maps on an infinite canvas.
        </p>
        <Button size="lg" onClick={() => navigate('/dashboard')}>
          Let&apos;s Start
        </Button>
      </div>

      <div
        style={{
          display: 'flex',
          gap: 40,
          marginTop: 64,
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
      >
        {highlights.map((h) => {
          const Icon = h.icon;
          return (
            <div
              key={h.label}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                color: '#a1a1aa',
                fontSize: 13,
              }}
            >
              <Icon size={16} />
              {h.label}
            </div>
          );
        })}
      </div>
    </section>
  );
};
