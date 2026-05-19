import { Check, Zap, Crown, Users } from 'lucide-react';

const P = { black: '#0A0A0A', pink: '#FF4FA3', pinkL: '#FFD6EC', pinkP: '#FFF0F7', white: '#fff', green: '#00E676' };

const plans = [
  {
    name: 'Free', price: '₹0', period: 'forever', popular: false, bg: P.pinkP, icon: Users,
    features: ['Basic pregnancy tracker', 'Weekly baby updates', 'Appointment reminders', 'Community access', 'Basic health tips'],
    cta: 'Get Started',
  },
  {
    name: 'Premium', price: '₹799', period: '/month', popular: true, bg: P.pink, icon: Zap,
    features: ['All Free features', 'AI Doctor Chat 24/7', 'Spotify music therapy', 'Advanced health monitoring', 'Nutrition & meal planning', 'Expert articles & videos', 'Priority support'],
    cta: 'Start Free Trial',
  },
  {
    name: 'Family', price: '₹1199', period: '/month', popular: false, bg: '#E8D6FF', icon: Crown,
    features: ['All Premium features', 'Up to 3 user profiles', 'Partner access & tracking', 'Postpartum care (6 months)', 'Baby development tracker', 'Vaccination reminders', 'Lifetime photo storage'],
    cta: 'Start Free Trial',
  },
];

export function PricingSection() {
  return (
    <section id="pricing" style={{ background: P.white, padding: '80px 0', borderTop: `4px solid ${P.black}`, borderBottom: `4px solid ${P.black}` }}>
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ display: 'inline-block', background: P.pink, border: `3px solid ${P.black}`, boxShadow: `4px 4px 0 ${P.black}`, padding: '4px 18px', marginBottom: 16 }}>
            <span style={{ fontWeight: 900, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: P.white }}>Pricing</span>
          </div>
          <h2 style={{ fontWeight: 900, fontSize: 'clamp(2rem, 4vw, 3rem)', textTransform: 'uppercase', margin: '0 0 8px', color: P.black, display: 'inline-block', borderBottom: `5px solid ${P.black}`, paddingBottom: 10 }}>Choose Your Plan</h2>
          <p style={{ fontWeight: 600, fontSize: '1rem', color: '#555', marginTop: 8 }}>All plans include a 14-day free trial. No credit card required.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, alignItems: 'start' }}>
          {plans.map((plan, i) => (
            <div key={plan.name} style={{
              background: plan.bg, border: `4px solid ${P.black}`,
              boxShadow: plan.popular ? `8px 8px 0 ${P.black}` : `5px 5px 0 ${P.black}`,
              padding: 28, position: 'relative',
              transform: plan.popular ? 'translateY(-8px)' : 'none',
            }}>
              {plan.popular && (
                <div style={{ position: 'absolute', top: -16, left: '50%', transform: 'translateX(-50%)', background: P.black, color: P.pink, border: `3px solid ${P.black}`, padding: '4px 20px', fontWeight: 900, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.1em', whiteSpace: 'nowrap' }}>
                  ⭐ Most Popular
                </div>
              )}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, borderBottom: `3px solid ${P.black}`, paddingBottom: 16 }}>
                <div style={{ width: 44, height: 44, background: P.black, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <plan.icon size={22} color={P.pink} />
                </div>
                <div>
                  <h3 style={{ fontWeight: 900, fontSize: '1.1rem', textTransform: 'uppercase', margin: 0, color: plan.popular ? P.white : P.black }}>{plan.name}</h3>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                    <span style={{ fontWeight: 900, fontSize: '1.8rem', color: plan.popular ? P.white : P.black }}>{plan.price}</span>
                    <span style={{ fontWeight: 700, fontSize: '0.8rem', color: plan.popular ? '#eee' : '#666' }}>{plan.period}</span>
                  </div>
                </div>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {plan.features.map(f => (
                  <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <div style={{ width: 20, height: 20, background: plan.popular ? P.white : P.black, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                      <Check size={12} color={plan.popular ? P.pink : P.white} />
                    </div>
                    <span style={{ fontWeight: 600, fontSize: '0.88rem', color: plan.popular ? 'rgba(255,255,255,0.9)' : '#333' }}>{f}</span>
                  </li>
                ))}
              </ul>
              <button style={{
                width: '100%', background: plan.popular ? P.white : P.black,
                color: plan.popular ? P.pink : P.pink,
                border: `3px solid ${plan.popular ? P.white : P.black}`,
                boxShadow: `4px 4px 0 ${plan.popular ? P.pinkL : '#555'}`,
                padding: '12px', fontWeight: 900, fontSize: '0.9rem', textTransform: 'uppercase', cursor: 'pointer', letterSpacing: '0.05em',
                transition: 'transform 0.1s',
              }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = 'translate(-2px,-2px)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = 'translate(0,0)'}>
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
        <p style={{ textAlign: 'center', marginTop: 28, fontWeight: 700, fontSize: '0.82rem', color: '#666' }}>All prices in INR · Cancel anytime · No hidden fees</p>
      </div>
    </section>
  );
}
