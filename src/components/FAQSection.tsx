import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const P = { black: '#0A0A0A', pink: '#FF4FA3', pinkL: '#FFD6EC', pinkP: '#FFF0F7', white: '#fff' };

const faqs = [
  { q: 'Is MomiQ free to use?', a: 'MomiQ offers a free tier with essential features. Our premium plan (₹799/month) unlocks AI Doctor Chat, Spotify music therapy, advanced tracking, and expert content.' },
  { q: 'Is my data private and secure?', a: 'Absolutely. All personal and health data is encrypted in transit and at rest. We never share your data with third parties without explicit consent, and comply with India\'s DPDP Act.' },
  { q: 'Can I use MomiQ after my baby is born?', a: 'Yes! MomiQ continues to support you postpartum with newborn tracking, baby milestones, feeding schedules, and our community of new moms.' },
  { q: 'How does the AI Doctor Chat work?', a: 'Our AI is powered by OpenAI and provides general health guidance based on your described symptoms. It is NOT a substitute for professional medical advice — always consult your doctor for emergencies.' },
  { q: 'Does the music feature use real Spotify?', a: 'Yes! Premium subscribers get Spotify-powered lullabies and baby music playlists directly within the app using Spotify\'s Web Playback API.' },
  { q: 'What makes MomiQ different from other apps?', a: 'MomiQ combines pregnancy tracking, AI health chat, Spotify music therapy, community support groups, and expert articles into one beautifully designed app built specifically for Indian mothers.' },
];

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" style={{ background: P.pinkP, padding: '80px 0', borderTop: `4px solid ${P.black}` }}>
      <div className="container mx-auto px-4 lg:px-8">
        <div style={{ marginBottom: 48 }}>
          <div style={{ display: 'inline-block', background: P.pink, border: `3px solid ${P.black}`, boxShadow: `4px 4px 0 ${P.black}`, padding: '4px 18px', marginBottom: 16 }}>
            <span style={{ fontWeight: 900, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: P.white }}>FAQ</span>
          </div>
          <h2 style={{ fontWeight: 900, fontSize: 'clamp(2rem, 4vw, 3rem)', textTransform: 'uppercase', margin: '0 0 8px', color: P.black, display: 'inline-block', borderBottom: `5px solid ${P.black}`, paddingBottom: 10 }}>
            Got Questions?
          </h2>
        </div>

        <div style={{ maxWidth: 760, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {faqs.map((faq, i) => (
            <div key={i} style={{ border: `3px solid ${P.black}`, boxShadow: open === i ? `6px 6px 0 ${P.black}` : `4px 4px 0 ${P.black}`, background: P.white, overflow: 'hidden', transition: 'box-shadow 0.1s' }}>
              <button onClick={() => setOpen(open === i ? null : i)} style={{
                width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
                padding: '16px 20px', background: open === i ? P.black : P.white, color: open === i ? P.pink : P.black,
                border: 'none', cursor: 'pointer', textAlign: 'left', transition: 'background 0.15s',
              }}>
                <span style={{ fontWeight: 800, fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.02em' }}>{faq.q}</span>
                {open === i ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
              {open === i && (
                <div style={{ padding: '16px 20px', borderTop: `3px solid ${P.pink}`, background: P.pinkP }}>
                  <p style={{ fontWeight: 600, fontSize: '0.9rem', color: '#333', margin: 0, lineHeight: 1.6 }}>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
