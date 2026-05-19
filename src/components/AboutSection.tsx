import aboutImage from 'figma:asset/f67da2099602a2b6f58367ec1e31475b9e6c8507.png';

const P = { black: '#0A0A0A', pink: '#FF4FA3', pinkL: '#FFD6EC', pinkP: '#FFF0F7', white: '#fff' };

const blocks = [
  { emoji: '🌸', title: 'Why We Built This', text: 'Pregnancy is beautiful, but it can feel overwhelming. We created MomiQ so mothers can easily track their health, understand their baby\'s growth, connect with others, and access trustworthy support — all in one place.' },
  { emoji: '🌼', title: 'What We Offer', text: 'Pregnancy tracker, baby development insights, expert articles, community groups, smart reminders, AI doctor chat (OpenAI-powered), Spotify music therapy, and health monitoring — everything together.' },
  { emoji: '🌟', title: 'Our Vision', text: 'Built by four passionate B.Tech final-year students, MomiQ reflects our belief that technology can make maternal care simpler, smarter, and more accessible for every Indian mother.' },
];

export function AboutSection() {
  return (
    <section id="about" style={{ background: P.white, padding: '80px 0', borderTop: `4px solid ${P.black}`, borderBottom: `4px solid ${P.black}` }}>
      <div className="container mx-auto px-4 lg:px-8">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }}>

          {/* Text */}
          <div>
            <div style={{ display: 'inline-block', background: P.pink, border: `3px solid ${P.black}`, boxShadow: `4px 4px 0 ${P.black}`, padding: '4px 18px', marginBottom: 20 }}>
              <span style={{ fontWeight: 900, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: P.white }}>About Us</span>
            </div>
            <h2 style={{ fontWeight: 900, fontSize: 'clamp(2rem, 4vw, 3rem)', textTransform: 'uppercase', margin: '0 0 8px', color: P.black, borderBottom: `5px solid ${P.black}`, paddingBottom: 10, display: 'inline-block' }}>
              About MomiQ
            </h2>
            <p style={{ fontWeight: 600, fontSize: '1rem', color: '#555', margin: '12px 0 28px', lineHeight: 1.6 }}>
              Your safe, smart, and supportive companion through every stage of pregnancy.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {blocks.map(b => (
                <div key={b.title} style={{ background: P.pinkP, border: `3px solid ${P.black}`, boxShadow: `4px 4px 0 ${P.black}`, padding: '16px 20px', display: 'flex', gap: 14 }}>
                  <span style={{ fontSize: '1.6rem', flexShrink: 0 }}>{b.emoji}</span>
                  <div>
                    <h3 style={{ fontWeight: 900, fontSize: '0.9rem', textTransform: 'uppercase', margin: '0 0 6px', color: P.black }}>{b.title}</h3>
                    <p style={{ fontWeight: 600, fontSize: '0.85rem', color: '#444', margin: 0, lineHeight: 1.5 }}>{b.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', top: 14, left: 14, width: '100%', height: '100%', background: P.pinkL, border: `3px solid ${P.black}`, zIndex: 0 }} />
            <div style={{ position: 'relative', zIndex: 1, border: `4px solid ${P.black}`, overflow: 'hidden' }}>
              <img src={aboutImage} alt="Healthcare professional with baby" style={{ width: '100%', height: 'auto', objectFit: 'cover', display: 'block' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: P.black, padding: '10px 16px' }}>
                <p style={{ fontWeight: 800, color: P.pink, margin: 0, fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Built with ♥ for every mother</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}