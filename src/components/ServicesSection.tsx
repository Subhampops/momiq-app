import { Calendar, Baby, Activity, BookOpen, Bell, MessageCircle, Music, Users, Moon } from 'lucide-react';

const P = { black: '#0A0A0A', pink: '#FF4FA3', pinkL: '#FFD6EC', pinkP: '#FFF0F7', white: '#fff', green: '#00E676', blue: '#00C2FF' };

const cardColors = [P.pinkL, '#E8D6FF', '#D6F0FF', '#FFD6D6', '#FFECD6', P.pinkP, '#FFD6EC', '#E8FFD6', '#D6F0FF'];

interface ServicesSectionProps {
  onOpenTracker?: () => void; onOpenBabyDevelopment?: () => void;
  onOpenHealthMonitoring?: () => void; onOpenSmartReminders?: () => void;
  onOpenAIDoctorChat?: () => void; onOpenExpertArticles?: () => void;
  onOpenPersonalizedMusic?: () => void; onOpenSupportGroups?: () => void;
  onOpenMenstrualCycle?: () => void;
}

export function ServicesSection({ onOpenTracker, onOpenBabyDevelopment, onOpenHealthMonitoring, onOpenSmartReminders, onOpenAIDoctorChat, onOpenExpertArticles, onOpenPersonalizedMusic, onOpenSupportGroups, onOpenMenstrualCycle }: ServicesSectionProps) {
  const services = [
    { icon: Calendar, title: 'Pregnancy Tracker', desc: 'Track your pregnancy week by week with personalized insights and milestone reminders.', onClick: onOpenTracker },
    { icon: Baby, title: 'Baby Development', desc: 'Monitor your baby\'s growth and developmental milestones with expert guidance.', onClick: onOpenBabyDevelopment },
    { icon: Activity, title: 'Health Monitoring', desc: 'Track vital health metrics, symptoms, and appointments all in one place.', onClick: onOpenHealthMonitoring },
    { icon: Moon, title: 'Menstrual Cycle', desc: 'Track your menstrual cycle, symptoms, and overall wellness with personalized insights.', onClick: onOpenMenstrualCycle },
    { icon: BookOpen, title: 'Expert Articles', desc: 'Access curated content from healthcare professionals on pregnancy and parenting.', onClick: onOpenExpertArticles },
    { icon: Bell, title: 'Smart Reminders', desc: 'Never miss important appointments, medications, or health check-ups.', onClick: onOpenSmartReminders },
    { icon: MessageCircle, title: 'AI Doctor Chat', desc: 'Get instant health guidance for common baby concerns with our AI assistant.', onClick: onOpenAIDoctorChat },
    { icon: Music, title: 'Personalized Music', desc: 'Soothing lullabies and melodies tailored to your baby\'s age and mood via Spotify.', onClick: onOpenPersonalizedMusic },
    { icon: Users, title: 'Support Groups', desc: 'Connect with other moms, share experiences, and find community support.', onClick: onOpenSupportGroups },
  ];

  return (
    <section id="services" style={{ background: P.white, padding: '80px 0', borderTop: `4px solid ${P.black}`, borderBottom: `4px solid ${P.black}` }}>
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ display: 'inline-block', background: P.pink, border: `3px solid ${P.black}`, boxShadow: `4px 4px 0 ${P.black}`, padding: '4px 18px', marginBottom: 16 }}>
            <span style={{ fontWeight: 900, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: P.white }}>Features</span>
          </div>
          <h2 style={{ fontWeight: 900, fontSize: 'clamp(2rem, 4vw, 3rem)', textTransform: 'uppercase', margin: '0 0 12px', color: P.black, borderBottom: `5px solid ${P.black}`, paddingBottom: 12, display: 'inline-block' }}>
            Everything You Need
          </h2>
          <p style={{ fontWeight: 600, fontSize: '1.1rem', color: '#555', maxWidth: 540, marginTop: 8 }}>
            Comprehensive tools to support you through every stage of your pregnancy journey.
          </p>
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
          {services.map((s, i) => (
            <div key={i} onClick={s.onClick} style={{
              background: cardColors[i % cardColors.length],
              border: `3px solid ${P.black}`, boxShadow: `5px 5px 0 ${P.black}`,
              padding: 24, cursor: s.onClick ? 'pointer' : 'default',
              transition: 'transform 0.1s, box-shadow 0.1s',
            }}
              onMouseEnter={e => { if (s.onClick) { const el = e.currentTarget as HTMLElement; el.style.transform = 'translate(-3px,-3px)'; el.style.boxShadow = `8px 8px 0 ${P.black}`; } }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translate(0,0)'; el.style.boxShadow = `5px 5px 0 ${P.black}`; }}>
              <div style={{ width: 48, height: 48, background: P.black, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                <s.icon size={24} color={P.pink} />
              </div>
              <h3 style={{ fontWeight: 900, fontSize: '1rem', textTransform: 'uppercase', margin: '0 0 8px', color: P.black }}>{s.title}</h3>
              <p style={{ fontWeight: 600, fontSize: '0.88rem', color: '#444', margin: 0, lineHeight: 1.5 }}>{s.desc}</p>
              {s.onClick && (
                <div style={{ marginTop: 14, display: 'inline-block', background: P.black, color: P.pink, border: `2px solid ${P.black}`, padding: '4px 14px', fontWeight: 800, fontSize: '0.72rem', textTransform: 'uppercase' }}>
                  Open →
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}