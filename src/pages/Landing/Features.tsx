import { FiMaximize2, FiUsers, FiGitBranch, FiDownload, FiCloud, FiSliders } from 'react-icons/fi';
import { Card } from '../../components/UI/Card';

const features = [
  { icon: FiMaximize2, title: 'Infinite Canvas', description: 'Never run out of space. Pan, zoom, and create without boundaries.' },
  { icon: FiUsers, title: 'Real-time Collaboration', description: 'Work together with your team on the same mind map simultaneously.' },
  { icon: FiGitBranch, title: 'Smart Auto-Layout', description: 'Let AI organize your nodes with intelligent auto-arrangement.' },
  { icon: FiDownload, title: 'Export Options', description: 'Export your mind maps to PNG, SVG, PDF, or JSON formats.' },
  { icon: FiCloud, title: 'Cloud Sync', description: 'Your maps are automatically saved and synced across devices.' },
  { icon: FiSliders, title: 'Rich Customization', description: 'Customize colors, styles, and layouts to match your workflow.' },
];

export const Features = () => {
  return (
    <section
      style={{
        padding: '80px 24px',
        background: '#1a1a2e',
      }}
    >
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <h2
          style={{
            textAlign: 'center',
            fontSize: 32,
            fontWeight: 600,
            color: '#ffffff',
            marginBottom: 12,
          }}
        >
          Everything You Need
        </h2>
        <p
          style={{
            textAlign: 'center',
            color: '#a1a1aa',
            fontSize: 16,
            marginBottom: 48,
          }}
        >
          Powerful features to bring your ideas to life
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 20,
          }}
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card key={feature.title} hover padding={24}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 8,
                    background: 'rgba(99,102,241,0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 16,
                    color: '#6366f1',
                  }}
                >
                  <Icon size={20} />
                </div>
                <h3 style={{ margin: '0 0 8px', color: '#ffffff', fontSize: 16, fontWeight: 600 }}>
                  {feature.title}
                </h3>
                <p style={{ margin: 0, color: '#a1a1aa', fontSize: 13, lineHeight: 1.5 }}>
                  {feature.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
