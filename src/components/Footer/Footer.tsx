import { useNavigate } from 'react-router-dom';
import { FiGithub, FiTwitter, FiLinkedin } from 'react-icons/fi';

const footerLinks = [
  {
    title: 'Product',
    links: [
      { label: 'Templates', path: '/templates' },
      { label: 'Dashboard', path: '/dashboard' },
      { label: 'About', path: '/about' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', path: '/about' },
      { label: 'Help', path: '/help' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', path: '#' },
      { label: 'Terms of Service', path: '#' },
    ],
  },
];

const socialLinks = [
  { icon: FiGithub, label: 'GitHub', href: '#' },
  { icon: FiTwitter, label: 'Twitter', href: '#' },
  { icon: FiLinkedin, label: 'LinkedIn', href: '#' },
];

export const Footer: React.FC = () => {
  const navigate = useNavigate();

  return (
    <footer
      style={{
        padding: '56px 32px 32px',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        background: '#0f0f1a',
      }}
    >
      <div
        style={{
          maxWidth: 1000,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '2fr repeat(3, 1fr)',
          gap: 48,
        }}
      >
        {/* Brand column */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8,
              background: 'linear-gradient(135deg, #6366f1, #ec4899)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 16, fontWeight: 700, color: '#fff',
            }}>
              M
            </div>
            <span style={{ fontSize: 18, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>
              MindMap
            </span>
          </div>
          <p style={{ color: '#a1a1aa', fontSize: 14, lineHeight: 1.6, marginBottom: 20, maxWidth: 280 }}>
            Beautiful, fast mind mapping on an infinite canvas. Open-source and free forever.
          </p>
          <div style={{ display: 'flex', gap: 10 }}>
            {socialLinks.map((s) => {
              const Icon = s.icon;
              return (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  style={{
                    width: 36, height: 36, borderRadius: 8,
                    background: 'rgba(255,255,255,0.06)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#a1a1aa', textDecoration: 'none',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(99,102,241,0.2)'; e.currentTarget.style.color = '#6366f1'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = '#a1a1aa'; }}
                >
                  <Icon size={16} />
                </a>
              );
            })}
          </div>
        </div>

        {/* Link columns */}
        {footerLinks.map((col) => (
          <div key={col.title}>
            <h4 style={{ color: '#ffffff', fontSize: 13, fontWeight: 600, marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {col.title}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {col.links.map((link) => (
                <span
                  key={link.label}
                  style={{
                    color: '#a1a1aa', fontSize: 14, cursor: 'pointer',
                    transition: 'color 0.2s',
                  }}
                  onClick={() => navigate(link.path)}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = '#a1a1aa'; }}
                >
                  {link.label}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={{
        maxWidth: 1000, margin: '40px auto 0',
        paddingTop: 24,
        borderTop: '1px solid rgba(255,255,255,0.06)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: 12,
      }}>
        <span style={{ color: '#666', fontSize: 13 }}>
          &copy; {new Date().getFullYear()} MindMap Graph Builder. All rights reserved.
        </span>
        <span style={{ color: '#666', fontSize: 13 }}>
          Built with React, Zustand &amp; Vite
        </span>
      </div>
    </footer>
  );
};
