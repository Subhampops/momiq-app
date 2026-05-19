import { ArrowRight, Sparkles } from 'lucide-react';
import pregnantWomanImg from 'figma:asset/30854abc22afc3726885261673cf5a4a852cbc90.png';

const P = { black:'#0A0A0A', pink:'#FF4FA3', pinkL:'#FFD6EC', pinkP:'#FFF0F7', white:'#fff' };

interface HeroSectionProps {
  onOpenTracker?: () => void;
  onGetStarted?: () => void;
  onDashboardNavigate?: () => void;
}

export function HeroSection({ onGetStarted, onDashboardNavigate }: HeroSectionProps) {
  return (
    <section id="home" style={{ background: P.pinkP, padding: '64px 0 80px', borderBottom: `4px solid ${P.black}` }}>
      <div className="container mx-auto px-4 lg:px-8">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>

          {/* Left — Text */}
          <div>
            {/* Badge */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: P.pink, border: `3px solid ${P.black}`, boxShadow: `4px 4px 0 ${P.black}`, padding: '6px 18px', marginBottom: 24 }}>
              <Sparkles size={16} color={P.white} />
              <span style={{ fontWeight: 900, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: P.white }}>Your Pregnancy Companion</span>
            </div>

            {/* Headline */}
            <h1 style={{ fontWeight: 900, fontSize: 'clamp(2.8rem, 5vw, 4.5rem)', lineHeight: 1.05, margin: '0 0 20px', color: P.black, textTransform: 'uppercase', letterSpacing: '-0.02em' }}>
              Momi<span style={{ color: P.pink, background: P.black, padding: '0 8px' }}>Q</span>
            </h1>
            <p style={{ fontWeight: 800, fontSize: '1.3rem', color: P.black, margin: '0 0 12px', borderLeft: `6px solid ${P.pink}`, paddingLeft: 14 }}>
              Because every pregnancy deserves personal care.
            </p>
            <p style={{ fontWeight: 600, fontSize: '1rem', color: '#555', margin: '0 0 36px', lineHeight: 1.6, maxWidth: 480 }}>
              From first kick to first cry, MomiQ walks with you — adapting to your journey and supporting you exactly when you need it.
            </p>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <button onClick={onDashboardNavigate} style={{ background: P.black, color: P.pink, border: `3px solid ${P.black}`, boxShadow: `5px 5px 0 ${P.pink}`, padding: '14px 28px', fontWeight: 900, fontSize: '0.95rem', textTransform: 'uppercase', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, letterSpacing: '0.05em', transition: 'transform 0.1s, box-shadow 0.1s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translate(-3px,-3px)'; (e.currentTarget as HTMLElement).style.boxShadow = `8px 8px 0 ${P.pink}`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translate(0,0)'; (e.currentTarget as HTMLElement).style.boxShadow = `5px 5px 0 ${P.pink}`; }}>
                Go to Dashboard <ArrowRight size={18} />
              </button>
              <button onClick={onGetStarted} style={{ background: P.pink, color: P.white, border: `3px solid ${P.black}`, boxShadow: `5px 5px 0 ${P.black}`, padding: '14px 28px', fontWeight: 900, fontSize: '0.95rem', textTransform: 'uppercase', cursor: 'pointer', letterSpacing: '0.05em', transition: 'transform 0.1s, box-shadow 0.1s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translate(-3px,-3px)'; (e.currentTarget as HTMLElement).style.boxShadow = `8px 8px 0 ${P.black}`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translate(0,0)'; (e.currentTarget as HTMLElement).style.boxShadow = `5px 5px 0 ${P.black}`; }}>
                Sign Up Free
              </button>
            </div>

            {/* Stats row */}
            <div style={{ display: 'flex', gap: 20, marginTop: 36, flexWrap: 'wrap' }}>
              {[['10K+', 'Moms Supported'], ['98%', 'Satisfaction'], ['24/7', 'AI Support']].map(([num, label]) => (
                <div key={label} style={{ background: P.white, border: `3px solid ${P.black}`, boxShadow: `3px 3px 0 ${P.black}`, padding: '12px 18px', textAlign: 'center' }}>
                  <p style={{ fontWeight: 900, fontSize: '1.5rem', color: P.pink, margin: 0 }}>{num}</p>
                  <p style={{ fontWeight: 700, fontSize: '0.72rem', textTransform: 'uppercase', color: '#555', margin: 0 }}>{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Image */}
          <div style={{ position: 'relative' }}>
            {/* Offset decorative block */}
            <div style={{ position: 'absolute', top: 12, left: 12, width: '100%', height: '100%', background: P.pink, border: `3px solid ${P.black}`, zIndex: 0 }} />
            <div style={{ position: 'relative', zIndex: 1, border: `4px solid ${P.black}`, overflow: 'hidden', background: P.white }}>
              <img src={pregnantWomanImg} alt="Pregnant woman" style={{ width: '100%', height: 'auto', objectFit: 'cover', display: 'block' }} />
              {/* Overlay badge */}
              <div style={{ position: 'absolute', bottom: 20, left: 20, background: P.black, color: P.pink, border: `3px solid ${P.pink}`, padding: '10px 18px' }}>
                <p style={{ fontWeight: 900, margin: 0, fontSize: '0.85rem', textTransform: 'uppercase' }}>Week 14 · Second Trimester</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}