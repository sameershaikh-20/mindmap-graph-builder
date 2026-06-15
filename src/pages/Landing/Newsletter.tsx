import { useState } from 'react';
import { Button } from '../../components/UI/Button';
import { FiSend } from 'react-icons/fi';

export const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (!email) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <section
      style={{
        padding: '80px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background gradient card */}
      <div style={{
        maxWidth: 700,
        margin: '0 auto',
        background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 40%, #7c3aed 100%)',
        borderRadius: 20,
        padding: '56px 40px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 16px 48px rgba(99,102,241,0.3)',
      }}>
        {/* Decorative dots */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', opacity: 0.15, pointerEvents: 'none' }}>
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                width: 4 + (i % 3) * 3,
                height: 4 + (i % 3) * 3,
                borderRadius: '50%',
                background: '#fff',
                left: `${(i * 19 + 7) % 100}%`,
                top: `${(i * 29 + 13) % 100}%`,
              }}
            />
          ))}
        </div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            width: 56, height: 56, borderRadius: 16,
            background: 'rgba(255,255,255,0.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 24px', color: '#fff',
          }}>
            <FiSend size={24} />
          </div>
          <h2
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: '#ffffff',
              marginBottom: 12,
              letterSpacing: '-0.02em',
            }}
          >
            Stay Updated
          </h2>
          <p
            style={{
              color: 'rgba(255,255,255,0.85)',
              fontSize: 15,
              marginBottom: 32,
              lineHeight: 1.6,
            }}
          >
            Get the latest features, tips, and updates delivered to your inbox.
          </p>
          <div style={{ display: 'flex', gap: 10, maxWidth: 440, margin: '0 auto' }}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubscribe()}
              style={{
                flex: 1,
                padding: '12px 18px',
                borderRadius: 10,
                border: '2px solid rgba(255,255,255,0.2)',
                background: 'rgba(255,255,255,0.12)',
                color: '#fff',
                fontSize: 14,
                fontFamily: 'Inter, sans-serif',
                outline: 'none',
                transition: 'all 0.2s',
              }}
              onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)'; e.currentTarget.style.background = 'rgba(255,255,255,0.18)'; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; }}
            />
            <Button
              onClick={handleSubscribe}
              style={{
                background: '#fff',
                color: '#6366f1',
                fontWeight: 600,
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              }}
            >
              {subscribed ? 'Subscribed!' : 'Subscribe'}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
