import { Card } from '../../components/UI/Card';

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Product Manager',
    company: 'TechFlow',
    quote: 'This mind mapping tool transformed how our team brainstorms. The infinite canvas is a game-changer.',
    avatar: 'SC',
  },
  {
    name: 'James Wilson',
    role: 'UX Designer',
    company: 'DesignLab',
    quote: 'I use it for every project. The auto-layout feature saves me hours of manual organization.',
    avatar: 'JW',
  },
  {
    name: 'Maria Garcia',
    role: 'Student',
    company: 'MIT',
    quote: 'Perfect for studying complex topics. The export feature makes sharing my notes effortless.',
    avatar: 'MG',
  },
];

export const Testimonials = () => {
  return (
    <section
      style={{
        padding: '80px 24px',
        background: '#1e1e3f',
      }}
    >
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <h2
          style={{
            textAlign: 'center',
            fontSize: 32,
            fontWeight: 600,
            color: '#ffffff',
            marginBottom: 48,
          }}
        >
          Loved by Users
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 20,
          }}
        >
          {testimonials.map((t) => (
            <Card key={t.name} padding={24}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #6366f1, #ec4899)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontSize: 14,
                    fontWeight: 600,
                  }}
                >
                  {t.avatar}
                </div>
                <div>
                  <p style={{ margin: 0, color: '#ffffff', fontSize: 14, fontWeight: 600 }}>{t.name}</p>
                  <p style={{ margin: 0, color: '#a1a1aa', fontSize: 12 }}>
                    {t.role} at {t.company}
                  </p>
                </div>
              </div>
              <p style={{ margin: 0, color: '#c4c4d4', fontSize: 13, lineHeight: 1.6, fontStyle: 'italic' }}>
                &ldquo;{t.quote}&rdquo;
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
