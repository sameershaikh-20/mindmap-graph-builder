import { useState } from 'react';
import { Button } from '../../components/UI/Button';

export const Newsletter = () => {
  const [email, setEmail] = useState('');

  return (
    <section
      style={{
        padding: '60px 24px',
        background: 'linear-gradient(135deg, #6366f1 0%, #14b8a6 100%)',
      }}
    >
      <div
        style={{
          maxWidth: 500,
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        <h2
          style={{
            fontSize: 24,
            fontWeight: 600,
            color: '#ffffff',
            marginBottom: 12,
          }}
        >
          Stay Updated
        </h2>
        <p
          style={{
            color: 'rgba(255,255,255,0.9)',
            fontSize: 14,
            marginBottom: 24,
          }}
        >
          Get the latest features, tips, and updates delivered to your inbox.
        </p>
        <div style={{ display: 'flex', gap: 8, maxWidth: 400, margin: '0 auto' }}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              flex: 1,
              padding: '10px 14px',
              borderRadius: 6,
              border: 'none',
              fontSize: 14,
              fontFamily: 'Inter, sans-serif',
              outline: 'none',
            }}
          />
          <Button onClick={() => { setEmail(''); }}>
            Subscribe
          </Button>
        </div>
      </div>
    </section>
  );
};
