import { Users, MessageCircle, Heart, ArrowRight } from 'lucide-react';
import communityImage from 'figma:asset/ef7b94e5f38d43f0d137ee51fdfbf258eb191b0e.png';

const P = { black: '#0A0A0A', pink: '#FF4FA3', pinkL: '#FFD6EC', pinkP: '#FFF0F7', pinkD: '#C0005A', white: '#fff' };

const features = [
  {
    icon: Users, label: 'Supportive Groups', bg: P.pinkL,
    desc: 'Join groups based on your due date, location, and interests to connect with moms on similar journeys.',
  },
  {
    icon: MessageCircle, label: 'Real-Time Chat', bg: '#E8D6FF',
    desc: 'Get instant answers and support from our active community through real-time messaging.',
  },
  {
    icon: Heart, label: 'Share & Celebrate', bg: '#D6FFE8',
    desc: 'Share milestones, photos, and celebrate every precious moment with moms who truly understand.',
  },
];

const stats = [
  { num: '50K+', label: 'Active Moms' },
  { num: '2K+', label: 'Support Groups' },
  { num: '4.9★', label: 'Community Rating' },
];

export function CommunitySection() {
  return (
    <section id="community" style={{ background: P.pinkP, padding: '80px 0', borderTop: `4px solid ${P.black}`, borderBottom: `4px solid ${P.black}` }}>
      <div className="container mx-auto px-4 lg:px-8">

        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ display: 'inline-block', background: P.pink, border: `3px solid ${P.black}`, boxShadow: `4px 4px 0 ${P.black}`, padding: '4px 18px', marginBottom: 16 }}>
            <span style={{ fontWeight: 900, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: P.white }}>Community</span>
          </div>
          <h2 style={{ fontWeight: 900, fontSize: 'clamp(2rem, 4vw, 3rem)', textTransform: 'uppercase', margin: '0 0 10px', color: P.black, display: 'inline-block', borderBottom: `5px solid ${P.black}`, paddingBottom: 10 }}>
            Join Our Community
          </h2>
          <p style={{ fontWeight: 600, fontSize: '1rem', color: '#555', marginTop: 8, maxWidth: 560 }}>
            Connect with thousands of moms just like you. Share experiences, ask questions, and build lasting friendships.
          </p>
        </div>

        {/* Main grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center', marginBottom: 40 }}>

          {/* Image */}
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', top: 14, left: 14, width: '100%', height: '100%', background: P.pinkL, border: `3px solid ${P.black}`, zIndex: 0 }} />
            <div style={{ position: 'relative', zIndex: 1, border: `4px solid ${P.black}`, overflow: 'hidden' }}>
              <img src={communityImage} alt="Community gathering" style={{ width: '100%', height: 'auto', objectFit: 'cover', display: 'block' }} />
              {/* Stats overlay bar */}
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: P.black, padding: '12px 16px', display: 'flex', justifyContent: 'space-around' }}>
                {stats.map(s => (
                  <div key={s.label} style={{ textAlign: 'center' }}>
                    <p style={{ fontWeight: 900, fontSize: '1.1rem', color: P.pink, margin: 0 }}>{s.num}</p>
                    <p style={{ fontWeight: 700, fontSize: '0.65rem', textTransform: 'uppercase', color: '#ccc', margin: 0 }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Feature cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {features.map((f, i) => (
              <div key={i} style={{
                background: f.bg, border: `3px solid ${P.black}`, boxShadow: `5px 5px 0 ${P.black}`,
                padding: '18px 20px', display: 'flex', gap: 16, alignItems: 'flex-start',
                transition: 'transform 0.1s, box-shadow 0.1s',
              }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translate(-2px,-2px)'; el.style.boxShadow = `7px 7px 0 ${P.black}`; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translate(0,0)'; el.style.boxShadow = `5px 5px 0 ${P.black}`; }}>
                <div style={{ width: 44, height: 44, background: P.black, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <f.icon size={22} color={P.pink} />
                </div>
                <div>
                  <h3 style={{ fontWeight: 900, fontSize: '0.95rem', textTransform: 'uppercase', margin: '0 0 6px', color: P.black }}>{f.label}</h3>
                  <p style={{ fontWeight: 600, fontSize: '0.85rem', color: '#444', margin: 0, lineHeight: 1.5 }}>{f.desc}</p>
                </div>
              </div>
            ))}

            {/* CTA button */}
            <button style={{
              background: P.black, color: P.pink, border: `3px solid ${P.black}`, boxShadow: `5px 5px 0 ${P.pink}`,
              padding: '14px 24px', fontWeight: 900, fontSize: '0.95rem', textTransform: 'uppercase', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, letterSpacing: '0.05em',
              transition: 'transform 0.1s, box-shadow 0.1s', width: '100%',
            }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translate(-3px,-3px)'; el.style.boxShadow = `8px 8px 0 ${P.pink}`; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translate(0,0)'; el.style.boxShadow = `5px 5px 0 ${P.pink}`; }}>
              <Users size={18} /> Join the Community <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Bottom marquee-style badges */}
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', borderTop: `3px solid ${P.black}`, paddingTop: 24 }}>
          {['🤰 Pregnancy Support', '👶 New Mom Chats', '💊 Health Q&A', '🎵 Music Sharing', '📚 Expert Tips', '🌸 Mental Wellness', '🍼 Feeding Advice', '✨ Milestone Parties'].map(t => (
            <span key={t} style={{ background: P.white, border: `3px solid ${P.black}`, boxShadow: `3px 3px 0 ${P.black}`, padding: '6px 16px', fontWeight: 800, fontSize: '0.78rem', textTransform: 'uppercase' }}>{t}</span>
          ))}
        </div>
      </div>
    </section>
  );
}