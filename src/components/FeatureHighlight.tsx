import { Sparkles, Check } from 'lucide-react';
import babyImage from 'figma:asset/1313aaad426144efad15a016dcb02e2750f4e568.png';

const P = { black: '#0A0A0A', pink: '#FF4FA3', pinkL: '#FFD6EC', pinkP: '#FFF0F7', white: '#fff' };

export function FeatureHighlight() {
  const features = [
    'Weekly development updates with beautiful illustrations',
    'Photo journal to capture special moments',
    'Milestone tracking from pregnancy to toddler years',
    'AI-powered health insights personalized for you',
  ];

  return (
    <section style={{ background: P.pinkL, padding: '80px 0', borderTop: `4px solid ${P.black}`, borderBottom: `4px solid ${P.black}` }}>
      <div className="container mx-auto px-4 lg:px-8">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }}>

          {/* Image with brutalist frame */}
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', top: 14, left: 14, width: '100%', height: '100%', background: P.pink, border: `3px solid ${P.black}`, zIndex: 0 }} />
            <div style={{ position: 'relative', zIndex: 1, border: `4px solid ${P.black}`, overflow: 'hidden', background: P.white }}>
              <img src={babyImage} alt="Happy baby crawling" style={{ width: '100%', height: 'auto', objectFit: 'cover', display: 'block' }} />
            </div>
          </div>

          {/* Text */}
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: P.pink, border: `3px solid ${P.black}`, boxShadow: `3px 3px 0 ${P.black}`, padding: '5px 16px', marginBottom: 20 }}>
              <Sparkles size={14} color={P.white} />
              <span style={{ fontWeight: 900, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: P.white }}>Track Every Milestone</span>
            </div>

            <h2 style={{ fontWeight: 900, fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', textTransform: 'uppercase', margin: '0 0 16px', color: P.black, lineHeight: 1.1 }}>
              Watch Your<br />Little One Grow
            </h2>
            <p style={{ fontWeight: 600, fontSize: '1rem', color: '#444', margin: '0 0 28px', lineHeight: 1.6 }}>
              From tiny kicks to first crawls, capture and celebrate every precious moment of your baby's development journey.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {features.map((f, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, background: P.white, border: `3px solid ${P.black}`, boxShadow: `3px 3px 0 ${P.black}`, padding: '10px 14px' }}>
                  <div style={{ width: 24, height: 24, background: P.black, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Check size={14} color={P.pink} />
                  </div>
                  <span style={{ fontWeight: 600, fontSize: '0.9rem', color: '#333' }}>{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}