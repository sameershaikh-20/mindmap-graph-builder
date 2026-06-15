import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/UI/Button';
import { FiMaximize2, FiGitBranch, FiDownload } from 'react-icons/fi';

const highlights = [
  { icon: FiMaximize2, label: 'Infinite Canvas', color: '#6366f1' },
  { icon: FiGitBranch, label: 'Auto-Arrange', color: '#ec4899' },
  { icon: FiDownload, label: 'Export SVG', color: '#14b8a6' },
];

const MindMapPreview = () => (
  <svg width="480" height="260" viewBox="0 0 480 260" fill="none" style={{ marginTop: 48, opacity: 0.9 }}>
    <defs>
      <linearGradient id="nodeGrad1" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#6366f1" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.9" />
      </linearGradient>
      <linearGradient id="nodeGrad2" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#ec4899" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#db2777" stopOpacity="0.8" />
      </linearGradient>
      <linearGradient id="nodeGrad3" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#0d9488" stopOpacity="0.8" />
      </linearGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
    </defs>
    {/* Edges */}
    <path d="M240 130 C200 130, 160 70, 120 70" stroke="#4a4a6a" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.5" />
    <path d="M240 130 C200 130, 160 190, 120 190" stroke="#4a4a6a" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.5" />
    <path d="M240 130 C280 130, 320 70, 360 70" stroke="#4a4a6a" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.5" />
    <path d="M240 130 C280 130, 320 190, 360 190" stroke="#4a4a6a" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.5" />
    <path d="M120 70 C90 70, 60 40, 40 40" stroke="#4a4a6a" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.3" />
    <path d="M120 70 C90 70, 60 100, 40 100" stroke="#4a4a6a" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.3" />
    <path d="M360 70 C390 70, 420 40, 445 40" stroke="#4a4a6a" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.3" />
    <path d="M360 190 C390 190, 420 220, 445 220" stroke="#4a4a6a" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.3" />
    {/* Root node */}
    <rect x="200" y="110" width="80" height="40" rx="10" fill="url(#nodeGrad1)" filter="url(#glow)" />
    <text x="240" y="135" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="600" fontFamily="Inter, sans-serif">Idea</text>
    {/* Child nodes */}
    <rect x="80" y="50" width="80" height="40" rx="8" fill="url(#nodeGrad2)" />
    <text x="120" y="75" textAnchor="middle" fill="#fff" fontSize="11" fontFamily="Inter, sans-serif">Research</text>
    <rect x="80" y="170" width="80" height="40" rx="8" fill="url(#nodeGrad2)" />
    <text x="120" y="195" textAnchor="middle" fill="#fff" fontSize="11" fontFamily="Inter, sans-serif">Design</text>
    <rect x="320" y="50" width="80" height="40" rx="8" fill="url(#nodeGrad3)" />
    <text x="360" y="75" textAnchor="middle" fill="#fff" fontSize="11" fontFamily="Inter, sans-serif">Build</text>
    <rect x="320" y="170" width="80" height="40" rx="8" fill="url(#nodeGrad3)" />
    <text x="360" y="195" textAnchor="middle" fill="#fff" fontSize="11" fontFamily="Inter, sans-serif">Launch</text>
    {/* Leaf nodes */}
    <rect x="10" y="25" width="60" height="30" rx="6" fill="rgba(99,102,241,0.3)" />
    <text x="40" y="44" textAnchor="middle" fill="#c4c4d4" fontSize="9" fontFamily="Inter, sans-serif">Data</text>
    <rect x="10" y="85" width="60" height="30" rx="6" fill="rgba(99,102,241,0.3)" />
    <text x="40" y="104" textAnchor="middle" fill="#c4c4d4" fontSize="9" fontFamily="Inter, sans-serif">Review</text>
    <rect x="410" y="25" width="60" height="30" rx="6" fill="rgba(20,184,166,0.3)" />
    <text x="440" y="44" textAnchor="middle" fill="#c4c4d4" fontSize="9" fontFamily="Inter, sans-serif">Ship</text>
    <rect x="410" y="205" width="60" height="30" rx="6" fill="rgba(20,184,166,0.3)" />
    <text x="440" y="224" textAnchor="middle" fill="#c4c4d4" fontSize="9" fontFamily="Inter, sans-serif">Growth</text>
  </svg>
);

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
        background: 'radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.12) 0%, transparent 60%), #0f0f1a',
        padding: '120px 20px 80px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Floating dots decoration */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: 3 + (i % 3) * 2,
              height: 3 + (i % 3) * 2,
              borderRadius: '50%',
              background: i % 3 === 0 ? '#6366f1' : i % 3 === 1 ? '#ec4899' : '#14b8a6',
              opacity: 0.15 + (i % 4) * 0.05,
              left: `${(i * 17 + 5) % 100}%`,
              top: `${(i * 23 + 10) % 100}%`,
              animation: `float ${3 + (i % 3)}s ease-in-out ${(i * 0.3) % 3}s infinite`,
            }}
          />
        ))}
      </div>

      <div style={{ textAlign: 'center', maxWidth: '700px', position: 'relative', zIndex: 1 }}>
        <div
          style={{
            display: 'inline-block',
            padding: '6px 16px',
            borderRadius: 20,
            background: 'rgba(99,102,241,0.12)',
            border: '1px solid rgba(99,102,241,0.2)',
            color: '#6366f1',
            fontSize: 13,
            fontWeight: 500,
            marginBottom: 24,
            letterSpacing: '0.02em',
          }}
        >
          Open-source mind mapping
        </div>
        <h1
          style={{
            fontSize: 'clamp(36px, 6vw, 56px)',
            fontWeight: 700,
            marginBottom: 16,
            lineHeight: 1.15,
            letterSpacing: '-0.03em',
            background: 'linear-gradient(135deg, #ffffff 0%, #c4c4d4 50%, #6366f1 100%)',
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            animation: 'gradientShift 6s ease infinite',
          }}
        >
          Mind-mapping,{' '}
          <span style={{
            background: 'linear-gradient(135deg, #6366f1, #ec4899)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            simplified.
          </span>
        </h1>
        <p
          style={{
            fontSize: 'clamp(15px, 2vw, 18px)',
            color: '#a1a1aa',
            marginBottom: 36,
            lineHeight: 1.6,
            maxWidth: 520,
            margin: '0 auto 36px',
          }}
        >
          Create, organize, and share mind maps on an infinite canvas.
          Beautiful, fast, and completely free.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button size="lg" onClick={() => navigate('/dashboard')}>
            Get Started — Free
          </Button>
          <Button size="lg" variant="secondary" onClick={() => navigate('/templates')}>
            Browse Templates
          </Button>
        </div>
      </div>

      <MindMapPreview />

      <div
        style={{
          display: 'flex',
          gap: 48,
          marginTop: 56,
          justifyContent: 'center',
          flexWrap: 'wrap',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {highlights.map((h, i) => {
          const Icon = h.icon;
          return (
            <div
              key={h.label}
              className={`fade-in-up-d${i + 1}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                color: '#a1a1aa',
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              <div style={{
                width: 32, height: 32, borderRadius: 8,
                background: `${h.color}18`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: h.color,
              }}>
                <Icon size={16} />
              </div>
              {h.label}
            </div>
          );
        })}
      </div>
    </section>
  );
};
