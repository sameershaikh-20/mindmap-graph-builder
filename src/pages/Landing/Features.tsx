import { FiMaximize2, FiUsers, FiGitBranch, FiDownload, FiCloud, FiSliders } from 'react-icons/fi';

const features = [
  { icon: FiMaximize2, title: 'Infinite Canvas', description: 'Never run out of space. Pan, zoom, and create without boundaries.', color: '#6366f1', gradient: 'linear-gradient(135deg, #6366f1, #4f46e5)' },
  { icon: FiUsers, title: 'Real-time Collaboration', description: 'Work together with your team on the same mind map simultaneously.', color: '#ec4899', gradient: 'linear-gradient(135deg, #ec4899, #db2777)' },
  { icon: FiGitBranch, title: 'Smart Auto-Layout', description: 'Let AI organize your nodes with intelligent auto-arrangement.', color: '#14b8a6', gradient: 'linear-gradient(135deg, #14b8a6, #0d9488)' },
  { icon: FiDownload, title: 'Export Options', description: 'Export your mind maps to PNG, SVG, PDF, or JSON formats.', color: '#f59e0b', gradient: 'linear-gradient(135deg, #f59e0b, #d97706)' },
  { icon: FiCloud, title: 'Cloud Sync', description: 'Your maps are automatically saved and synced across devices.', color: '#8b5cf6', gradient: 'linear-gradient(135deg, #8b5cf6, #7c3aed)' },
  { icon: FiSliders, title: 'Rich Customization', description: 'Customize colors, styles, and layouts to match your workflow.', color: '#ef4444', gradient: 'linear-gradient(135deg, #ef4444, #dc2626)' },
];

export const Features = () => {
  return (
    <section
      style={{
        padding: '100px 24px',
        background: 'linear-gradient(180deg, #0f0f1a 0%, #1a1a2e 50%, #1e1e3f 100%)',
      }}
    >
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
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
              marginBottom: 16,
            }}
          >
            Features
          </div>
          <h2
            style={{
              textAlign: 'center',
              fontSize: 36,
              fontWeight: 700,
              color: '#ffffff',
              marginBottom: 12,
              letterSpacing: '-0.02em',
            }}
          >
            Everything You Need
          </h2>
          <p
            style={{
              textAlign: 'center',
              color: '#a1a1aa',
              fontSize: 16,
              maxWidth: 480,
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            Powerful features to bring your ideas to life
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 20,
          }}
        >
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className={`fade-in-up-d${i + 1}`}
                style={{
                  background: '#2a2a4a',
                  borderRadius: 12,
                  border: '1px solid rgba(255,255,255,0.06)',
                  padding: 28,
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'default',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${feature.color}40`;
                  e.currentTarget.style.boxShadow = `0 8px 32px ${feature.color}15`;
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: 3,
                  background: feature.gradient,
                  opacity: 0.8,
                }} />
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: `${feature.color}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 20,
                    color: feature.color,
                  }}
                >
                  <Icon size={22} />
                </div>
                <h3 style={{ margin: '0 0 8px', color: '#ffffff', fontSize: 17, fontWeight: 600 }}>
                  {feature.title}
                </h3>
                <p style={{ margin: 0, color: '#a1a1aa', fontSize: 14, lineHeight: 1.6 }}>
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
