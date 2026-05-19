import { useState } from 'react';
import {
  Activity, Heart, Weight, Smile, Bell, Pill, Stethoscope,
  Baby, MessageCircle, Plus, ChevronRight, Droplet,
} from 'lucide-react';

const NB = {
  black: '#0A0A0A', pink: '#FF4FA3', pinkL: '#FFD6EC', pinkP: '#FFF0F7', white: '#fff',
  red: '#FF3D3D', blue: '#00C2FF', green: '#00E676',
  bg: '#FFF0F7', coral: '#FF6B6B',
};

const card = (bg = NB.white, extra: React.CSSProperties = {}): React.CSSProperties => ({
  background: bg, border: `3px solid ${NB.black}`, boxShadow: `5px 5px 0px ${NB.black}`,
  borderRadius: 0, padding: 24, marginBottom: 20,
  transition: 'transform 0.1s, box-shadow 0.1s', ...extra,
});

const metricCard = (bg: string): React.CSSProperties => ({
  background: bg, border: `3px solid ${NB.black}`, boxShadow: `4px 4px 0px ${NB.black}`,
  borderRadius: 0, padding: 20, transition: 'transform 0.1s, box-shadow 0.1s',
});

const badge = (bg: string, color: string): React.CSSProperties => ({
  background: bg, color, border: `2px solid ${NB.black}`, borderRadius: 0,
  padding: '2px 10px', fontWeight: 800, fontSize: '0.7rem', textTransform: 'uppercase' as const,
  letterSpacing: '0.05em', display: 'inline-block',
});

const btnPrimary: React.CSSProperties = {
  background: NB.black, color: NB.pink, border: `3px solid ${NB.black}`,
  boxShadow: `4px 4px 0px #555`, borderRadius: 0, padding: '12px 20px',
  fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase' as const,
  letterSpacing: '0.05em', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
  transition: 'transform 0.1s, box-shadow 0.1s', width: '100%', justifyContent: 'space-between',
};

const btnPink: React.CSSProperties = {
  background: NB.pink, color: NB.white, border: `3px solid ${NB.black}`,
  boxShadow: `4px 4px 0px ${NB.black}`, borderRadius: 0, padding: '12px 20px',
  fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase' as const,
  letterSpacing: '0.05em', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
  transition: 'transform 0.1s, box-shadow 0.1s', width: '100%', justifyContent: 'space-between',
};

const btnOutline: React.CSSProperties = {
  background: 'transparent', color: NB.black, border: `3px solid ${NB.black}`,
  boxShadow: `4px 4px 0px ${NB.black}`, borderRadius: 0, padding: '12px 20px',
  fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase' as const,
  letterSpacing: '0.05em', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
  transition: 'transform 0.1s, box-shadow 0.1s', width: '100%', justifyContent: 'space-between',
};

function hover(el: HTMLElement, active: boolean) {
  el.style.transform = active ? 'translate(-2px,-2px)' : 'translate(0,0)';
  el.style.boxShadow = active ? `7px 7px 0px ${NB.black}` : `5px 5px 0px ${NB.black}`;
}

interface MainDashboardProps {
  userName?: string;
  pregnancyWeek?: number;
  pregnancyDay?: number;
  onNavigate?: (destination: string) => void;
}

export function MainDashboard({
  userName = 'Jyoti',
  pregnancyWeek = 14,
  pregnancyDay = 3,
  onNavigate,
}: MainDashboardProps) {
  const [healthData] = useState({
    bloodPressure: '120/80', bloodSugar: '95 mg/dL', weight: '148 lbs', mood: 'Good',
  });
  const [todayAlerts] = useState([
    { id: 1, type: 'medicine',     title: 'Prenatal Vitamin',      time: '9:00 AM',  completed: true  },
    { id: 2, type: 'appointment',  title: 'Ultrasound Appointment', time: '2:30 PM', completed: false },
    { id: 3, type: 'medicine',     title: 'Iron Supplement',        time: '9:00 PM', completed: false },
  ]);

  const trimester = pregnancyWeek <= 13 ? 'First' : pregnancyWeek <= 26 ? 'Second' : 'Third';
  const pct = Math.round((pregnancyWeek / 40) * 100);

  return (
    <div style={{ background: NB.bg, minHeight: '100vh', padding: '24px 24px 40px' }}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'inline-block', background: NB.pink, border: `3px solid ${NB.black}`, boxShadow: `4px 4px 0 ${NB.black}`, padding: '4px 16px', marginBottom: 8 }}>
          <span style={{ fontWeight: 900, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: NB.white }}>DASHBOARD</span>
        </div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: NB.black, margin: 0, lineHeight: 1.1 }}>
          Hi {userName} 👋
        </h1>
        <p style={{ fontWeight: 600, color: '#555', marginTop: 4, fontSize: '1rem' }}>
          Week {pregnancyWeek}, Day {pregnancyDay} • {trimester} Trimester
        </p>
      </div>

      <div style={{ maxWidth: 1100 }}>

        {/* Pregnancy Progress */}
        <div style={card(NB.white)} onMouseEnter={e => hover(e.currentTarget as HTMLElement, true)} onMouseLeave={e => hover(e.currentTarget as HTMLElement, false)}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <div style={{ width: 44, height: 44, background: NB.pink, border: `3px solid ${NB.black}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Baby size={22} color={NB.white} />
            </div>
            <div>
              <h2 style={{ fontWeight: 900, fontSize: '1.2rem', textTransform: 'uppercase', margin: 0 }}>Pregnancy Progress</h2>
              <p style={{ fontWeight: 700, color: '#555', margin: 0, fontSize: '0.85rem' }}>{pct}% Complete</p>
            </div>
            <div style={{ marginLeft: 'auto' }}>
              <span style={badge(NB.black, NB.pink)}>Week {pregnancyWeek}/40</span>
            </div>
          </div>

          {/* Progress bar */}
          <div style={{ border: `3px solid ${NB.black}`, background: NB.pinkP, height: 22, marginBottom: 16, position: 'relative', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${pct}%`, background: NB.pink, borderRight: `3px solid ${NB.black}`, transition: 'width 0.5s ease' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
            {[
              { label: 'Current Week', val: pregnancyWeek, bg: NB.yellow },
              { label: 'Days to Go',   val: 280 - (pregnancyWeek * 7 + pregnancyDay), bg: '#00C2FF' },
              { label: 'Trimester',    val: trimester, bg: '#00E676' },
              { label: 'Day',          val: pregnancyDay, bg: '#FFD6EC' },
            ].map(item => (
              <div key={item.label} style={{ background: item.bg, border: `3px solid ${NB.black}`, padding: '14px 12px' }}>
                <p style={{ fontWeight: 700, fontSize: '0.72rem', textTransform: 'uppercase', color: '#333', margin: '0 0 4px' }}>{item.label}</p>
                <p style={{ fontWeight: 900, fontSize: '1.6rem', margin: 0, color: NB.black, lineHeight: 1 }}>{item.val}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Health Metrics */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 20 }}>
          {[
            { icon: Activity, label: 'Blood Pressure', val: healthData.bloodPressure, bg: '#FFD6EC', badge: ['NORMAL', NB.green, NB.black] },
            { icon: Droplet,  label: 'Blood Sugar',    val: healthData.bloodSugar,    bg: '#00C2FF', badge: ['NORMAL', NB.green, NB.black] },
            { icon: Weight,   label: 'Weight',         val: healthData.weight,        bg: '#FEF300', badge: ['+12 LBS', '#555', NB.white]   },
            { icon: Smile,    label: 'Mood',           val: healthData.mood,          bg: '#00E676', badge: ['STABLE', NB.black, NB.yellow]  },
          ].map(m => (
            <div key={m.label} style={metricCard(m.bg)}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translate(-2px,-2px)'; el.style.boxShadow = `6px 6px 0 ${NB.black}`; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translate(0,0)'; el.style.boxShadow = `4px 4px 0 ${NB.black}`; }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                <div style={{ width: 38, height: 38, background: NB.black, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <m.icon size={18} color={NB.pink} />
                </div>
                <span style={badge(m.badge[0] === 'STABLE' ? NB.black : NB.white, m.badge[2] as string)}>{m.badge[0]}</span>
              </div>
              <p style={{ fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase', color: '#333', margin: '0 0 4px' }}>{m.label}</p>
              <p style={{ fontWeight: 900, fontSize: '1.4rem', margin: 0, color: NB.black }}>{m.val}</p>
            </div>
          ))}
        </div>

        {/* Baby Growth Card */}
        <div style={card(NB.pinkL)} onMouseEnter={e => hover(e.currentTarget as HTMLElement, true)} onMouseLeave={e => hover(e.currentTarget as HTMLElement, false)}>
          <h3 style={{ fontWeight: 900, fontSize: '1.1rem', textTransform: 'uppercase', margin: '0 0 16px', borderBottom: `3px solid ${NB.black}`, paddingBottom: 8 }}>
            🫑 This Week's Growth
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '5rem', marginBottom: 8 }}>🫑</div>
              <p style={{ fontWeight: 800, fontSize: '1rem', margin: '0 0 4px' }}>Size of a bell pepper</p>
              <p style={{ fontWeight: 600, fontSize: '0.85rem', color: '#555' }}>5.6 in • 6.7 oz</p>
            </div>
            <div>
              <h4 style={{ fontWeight: 800, textTransform: 'uppercase', fontSize: '0.85rem', margin: '0 0 12px', letterSpacing: '0.05em' }}>Milestones</h4>
              {['Developing unique fingerprints', 'Ears in final position', 'Can yawn and hiccup', 'Practicing breathing'].map(m => (
                <div key={m} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                  <div style={{ width: 10, height: 10, background: NB.black, flexShrink: 0 }} />
                  <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>{m}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Today's Alerts */}
        <div style={card(NB.white)} onMouseEnter={e => hover(e.currentTarget as HTMLElement, true)} onMouseLeave={e => hover(e.currentTarget as HTMLElement, false)}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ fontWeight: 900, fontSize: '1.1rem', textTransform: 'uppercase', margin: 0 }}>Today's Alerts</h3>
            <button style={{ background: 'transparent', border: `2px solid ${NB.black}`, padding: '4px 12px', fontWeight: 800, fontSize: '0.72rem', textTransform: 'uppercase', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
              View All <ChevronRight size={14} />
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {todayAlerts.map(alert => (
              <div key={alert.id} style={{
                display: 'flex', alignItems: 'center', gap: 14,
                padding: '12px 16px',
                background: alert.completed ? '#F5F5F0' : NB.bg,
                border: `3px solid ${alert.completed ? '#ccc' : NB.black}`,
                opacity: alert.completed ? 0.7 : 1,
              }}>
                <div style={{ width: 36, height: 36, background: alert.type === 'medicine' ? '#00C2FF' : '#B44FFF', border: `2px solid ${NB.black}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {alert.type === 'medicine' ? <Pill size={16} color={NB.white} /> : <Stethoscope size={16} color={NB.white} />}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 800, margin: 0, textDecoration: alert.completed ? 'line-through' : 'none', fontSize: '0.9rem' }}>{alert.title}</p>
                  <p style={{ fontWeight: 600, color: '#777', margin: 0, fontSize: '0.78rem' }}>{alert.time}</p>
                </div>
                {alert.completed && <span style={badge(NB.green, NB.black)}>Done</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div style={card(NB.white)} onMouseEnter={e => hover(e.currentTarget as HTMLElement, true)} onMouseLeave={e => hover(e.currentTarget as HTMLElement, false)}>
          <h3 style={{ fontWeight: 900, fontSize: '1.1rem', textTransform: 'uppercase', margin: '0 0 16px', borderBottom: `3px solid ${NB.black}`, paddingBottom: 8 }}>Quick Actions</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
            <button style={btnPrimary} onClick={() => onNavigate?.('aiDoctorChat')}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translate(-2px,-2px)'; el.style.boxShadow = '6px 6px 0 #555'; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translate(0,0)'; el.style.boxShadow = '4px 4px 0 #555'; }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><MessageCircle size={20} /><span>AI Doctor Chat</span></div>
              <ChevronRight size={18} />
            </button>
            <button style={btnPink} onClick={() => onNavigate?.('smartReminders')}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translate(-2px,-2px)'; el.style.boxShadow = `6px 6px 0 ${NB.black}`; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translate(0,0)'; el.style.boxShadow = `4px 4px 0 ${NB.black}`; }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Plus size={20} /><span>Add Reminder</span></div>
              <ChevronRight size={18} />
            </button>
            <button style={btnOutline} onClick={() => onNavigate?.('supportGroups')}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translate(-2px,-2px)'; el.style.boxShadow = `6px 6px 0 ${NB.black}`; el.style.background = '#F0EDE0'; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translate(0,0)'; el.style.boxShadow = `4px 4px 0 ${NB.black}`; el.style.background = 'transparent'; }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Heart size={20} /><span>Support Groups</span></div>
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
