const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Product Manager',
    company: 'TechFlow',
    quote: 'This mind mapping tool transformed how our team brainstorms. The infinite canvas is a game-changer.',
    avatar: 'SC',
    rating: 5,
  },
  {
    name: 'James Wilson',
    role: 'UX Designer',
    company: 'DesignLab',
    quote: 'I use it for every project. The auto-layout feature saves me hours of manual organization.',
    avatar: 'JW',
    rating: 5,
  },
  {
    name: 'Maria Garcia',
    role: 'Student',
    company: 'MIT',
    quote: 'Perfect for studying complex topics. The export feature makes sharing my notes effortless.',
    avatar: 'MG',
    rating: 5,
  },
];

const Stars = ({ count }: { count: number }) => (
  <div style={{ display: 'flex', gap: 2, marginBottom: 12 }}>
    {[...Array(5)].map((_, i) => (
      <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i < count ? '#f59e0b' : 'rgba(255,255,255,0.1)'}>
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ))}
  </div>
);

export const Testimonials = () => {
  return (
    <section
      style={{
        padding: '100px 24px',
        background: '#1e1e3f',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div
            style={{
              display: 'inline-block',
              padding: '6px 16px',
              borderRadius: 20,
              background: 'rgba(236,72,153,0.12)',
              border: '1px solid rgba(236,72,153,0.2)',
              color: '#ec4899',
              fontSize: 13,
              fontWeight: 500,
              marginBottom: 16,
            }}
          >
            Testimonials
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
            Loved by Users
          </h2>
          <p style={{ textAlign: 'center', color: '#a1a1aa', fontSize: 16 }}>
            See what people are saying about MindMap
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 20,
          }}
        >
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className={`fade-in-up-d${i + 1}`}
              style={{
                background: '#2a2a4a',
                borderRadius: 12,
                border: '1px solid rgba(255,255,255,0.06)',
                padding: 28,
                position: 'relative',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Quote icon */}
              <div style={{
                position: 'absolute', top: 20, right: 24,
                fontSize: 48, lineHeight: 1, color: 'rgba(99,102,241,0.1)',
                fontFamily: 'Georgia, serif', fontWeight: 700,
              }}>
                &ldquo;
              </div>
              <Stars count={t.rating} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #6366f1, #ec4899)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontSize: 14,
                    fontWeight: 700,
                    flexShrink: 0,
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
              <p style={{ margin: 0, color: '#c4c4d4', fontSize: 14, lineHeight: 1.7, fontStyle: 'italic', position: 'relative', zIndex: 1 }}>
                &ldquo;{t.quote}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
