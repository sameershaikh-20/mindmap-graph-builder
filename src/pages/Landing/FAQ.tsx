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
        padding: '80px 24px',
        background: '#1a1a2e',
      }}
    >
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <h2
          style={{
            textAlign: 'center',
            fontSize: 32,
            fontWeight: 600,
            color: '#ffffff',
            marginBottom: 48,
          }}
        >
          Frequently Asked Questions
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                style={{
                  background: '#2a2a4a',
                  borderRadius: 8,
                  border: '1px solid rgba(255,255,255,0.06)',
                  overflow: 'hidden',
                }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '16px 20px',
                    background: 'none',
                    border: 'none',
                    color: '#ffffff',
                    cursor: 'pointer',
                    fontSize: 14,
                    fontWeight: 500,
                    fontFamily: 'Inter, sans-serif',
                    textAlign: 'left',
                  }}
                >
                  {faq.q}
                  <FiChevronDown
                    size={16}
                    style={{
                      color: '#a1a1aa',
                      transition: 'transform 0.2s',
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
                    }}
                  />
                </button>
                {isOpen && (
                  <div
                    style={{
                      padding: '0 20px 16px',
                      color: '#a1a1aa',
                      fontSize: 13,
                      lineHeight: 1.6,
                    }}
                  >
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
