import { Linkedin, Twitter, Mail, Users } from 'lucide-react';

const P = { black: '#0A0A0A', pink: '#FF4FA3', pinkL: '#FFD6EC', pinkP: '#FFF0F7', pinkD: '#C0005A', white: '#fff' };

const cardColors = [P.pinkL, '#E8D6FF', '#D6F0FF', '#FFD6D6'];
const avatarBgs = ['#FF4FA3', '#B44FFF', '#00C2FF', '#FF8CC8'];

const teamMembers = [
  {
    name: 'Subham Bhattacharya', role: 'Full-Stack Lead',
    bio: 'B.Tech final-year student passionate about building technology for maternal wellness.',
    initials: 'SB', email: 'subham@momiq.app',
  },
  {
    name: 'Sarah Johnson', role: 'UI/UX Designer',
    bio: 'Crafts beautiful, accessible interfaces with a focus on pregnancy & maternal health.',
    initials: 'SJ', email: 'sarah@momiq.app',
  },
  {
    name: 'Michael Rodriguez', role: 'AI / ML Engineer',
    bio: 'Integrates OpenAI to deliver smart, contextual health guidance for moms.',
    initials: 'MR', email: 'michael@momiq.app',
  },
  {
    name: 'Priya Patel', role: 'Community Manager',
    bio: 'Builds supportive, vibrant communities for expecting mothers across India.',
    initials: 'PP', email: 'priya@momiq.app',
  },
];

export function TeamSection() {
  return (
    <section id="team" style={{ background: P.white, padding: '80px 0', borderTop: `4px solid ${P.black}`, borderBottom: `4px solid ${P.black}` }}>
      <div className="container mx-auto px-4 lg:px-8">

        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ display: 'inline-block', background: P.pink, border: `3px solid ${P.black}`, boxShadow: `4px 4px 0 ${P.black}`, padding: '4px 18px', marginBottom: 16 }}>
            <span style={{ fontWeight: 900, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: P.white }}>The Team</span>
          </div>
          <h2 style={{ fontWeight: 900, fontSize: 'clamp(2rem, 4vw, 3rem)', textTransform: 'uppercase', margin: '0 0 10px', color: P.black, display: 'inline-block', borderBottom: `5px solid ${P.black}`, paddingBottom: 10 }}>
            Meet Our Team
          </h2>
          <p style={{ fontWeight: 600, fontSize: '1rem', color: '#555', marginTop: 8, maxWidth: 540 }}>
            Four B.Tech final-year students committed to making pregnancy care smarter, kinder, and more accessible.
          </p>
        </div>

        {/* Team Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 24 }}>
          {teamMembers.map((m, i) => (
            <div key={m.name} style={{
              background: cardColors[i % cardColors.length],
              border: `3px solid ${P.black}`, boxShadow: `6px 6px 0 ${P.black}`,
              overflow: 'hidden', transition: 'transform 0.1s, box-shadow 0.1s',
            }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translate(-3px,-3px)'; el.style.boxShadow = `9px 9px 0 ${P.black}`; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translate(0,0)'; el.style.boxShadow = `6px 6px 0 ${P.black}`; }}>

              {/* Avatar strip */}
              <div style={{ background: avatarBgs[i], padding: '28px 0', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: `3px solid ${P.black}`, position: 'relative' }}>
                <div style={{ width: 80, height: 80, background: P.black, border: `4px solid ${P.white}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontWeight: 900, fontSize: '1.8rem', color: avatarBgs[i] }}>{m.initials}</span>
                </div>
                {/* Role badge */}
                <div style={{ position: 'absolute', bottom: -14, left: '50%', transform: 'translateX(-50%)', background: P.black, color: P.pink, border: `2px solid ${P.black}`, padding: '3px 14px', fontWeight: 800, fontSize: '0.68rem', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
                  {m.role}
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: '28px 20px 20px' }}>
                <h3 style={{ fontWeight: 900, fontSize: '1rem', textTransform: 'uppercase', margin: '0 0 8px', color: P.black }}>{m.name}</h3>
                <p style={{ fontWeight: 600, fontSize: '0.85rem', color: '#444', margin: '0 0 16px', lineHeight: 1.5 }}>{m.bio}</p>

                {/* Social row */}
                <div style={{ display: 'flex', gap: 8 }}>
                  {[
                    { icon: Linkedin, label: 'LinkedIn', href: '#' },
                    { icon: Twitter, label: 'Twitter', href: '#' },
                    { icon: Mail, label: 'Email', href: `mailto:${m.email}` },
                  ].map(({ icon: Icon, label, href }) => (
                    <a key={label} href={href} aria-label={label} style={{
                      width: 34, height: 34, background: P.black, border: `2px solid ${P.black}`,
                      boxShadow: `2px 2px 0 ${P.pinkL}`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'background 0.1s, box-shadow 0.1s', textDecoration: 'none',
                    }}
                      onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = P.pink; el.style.boxShadow = `3px 3px 0 ${P.black}`; }}
                      onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = P.black; el.style.boxShadow = `2px 2px 0 ${P.pinkL}`; }}>
                      <Icon size={14} color={P.white} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{ marginTop: 40, background: P.black, border: `3px solid ${P.black}`, boxShadow: `5px 5px 0 ${P.pink}`, padding: '24px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 44, height: 44, background: P.pink, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Users size={22} color={P.white} /></div>
            <div>
              <p style={{ fontWeight: 900, color: P.pink, margin: 0, fontSize: '1rem', textTransform: 'uppercase' }}>Built with ♥ for Every Mother</p>
              <p style={{ fontWeight: 600, color: '#aaa', margin: 0, fontSize: '0.8rem' }}>A B.Tech final-year project by four passionate students</p>
            </div>
          </div>
          <a href="mailto:support@momiq.app" style={{ background: P.pink, color: P.white, border: `3px solid ${P.pink}`, boxShadow: `4px 4px 0 ${P.pinkL}`, padding: '10px 22px', fontWeight: 800, fontSize: '0.82rem', textTransform: 'uppercase', textDecoration: 'none', display: 'inline-block', transition: 'transform 0.1s' }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = 'translate(-2px,-2px)'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = 'translate(0,0)'}>
            Contact Us →
          </a>
        </div>
      </div>
    </section>
  );
}
