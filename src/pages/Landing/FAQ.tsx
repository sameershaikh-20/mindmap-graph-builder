import { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';

const faqs = [
  { q: 'Is MindMap free to use?', a: 'Yes, we offer a generous free tier with unlimited nodes and maps. Pro features include collaboration and advanced export options.' },
  { q: 'Can I collaborate with my team?', a: 'Absolutely! Our collaboration features allow real-time editing and commenting with your team members.' },
  { q: 'What export formats are supported?', a: 'You can export your mind maps as PNG, SVG, PDF, and JSON. Pro users get additional format options.' },
  { q: 'Is my data secure?', a: 'Yes, all data is encrypted in transit and at rest. We follow industry best practices for security.' },
  { q: 'Can I access my maps offline?', a: 'Yes, maps are cached locally and available offline. Changes sync automatically when you reconnect.' },
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      style={{
        padding: '100px 24px',
        background: 'linear-gradient(180deg, #1e1e3f 0%, #1a1a2e 100%)',
      }}
    >
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div
            style={{
              display: 'inline-block',
              padding: '6px 16px',
              borderRadius: 20,
              background: 'rgba(20,184,166,0.12)',
              border: '1px solid rgba(20,184,166,0.2)',
              color: '#14b8a6',
              fontSize: 13,
              fontWeight: 500,
              marginBottom: 16,
            }}
          >
            FAQ
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
            Frequently Asked Questions
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={`fade-in-up-d${i + 1}`}
                style={{
                  background: isOpen ? 'rgba(99,102,241,0.08)' : '#2a2a4a',
                  borderRadius: 12,
                  border: isOpen ? '1px solid rgba(99,102,241,0.25)' : '1px solid rgba(255,255,255,0.06)',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '18px 22px',
                    background: 'none',
                    border: 'none',
                    color: isOpen ? '#ffffff' : '#e0e0e0',
                    cursor: 'pointer',
                    fontSize: 15,
                    fontWeight: 500,
                    fontFamily: 'Inter, sans-serif',
                    textAlign: 'left',
                    transition: 'color 0.2s',
                  }}
                >
                  {faq.q}
                  <div style={{
                    width: 28, height: 28, borderRadius: 8,
                    background: isOpen ? 'rgba(99,102,241,0.2)' : 'rgba(255,255,255,0.06)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, marginLeft: 12,
                    transition: 'all 0.3s',
                  }}>
                    <FiChevronDown
                      size={16}
                      style={{
                        color: isOpen ? '#6366f1' : '#a1a1aa',
                        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
                      }}
                    />
                  </div>
                </button>
                <div style={{
                  maxHeight: isOpen ? 200 : 0,
                  opacity: isOpen ? 1 : 0,
                  overflow: 'hidden',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }}>
                  <div style={{
                    padding: '0 22px 18px',
                    color: '#a1a1aa',
                    fontSize: 14,
                    lineHeight: 1.7,
                  }}>
                    {faq.a}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
