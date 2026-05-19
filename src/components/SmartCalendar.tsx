import { useState } from 'react';
import {
  ArrowLeft, Calendar as CalendarIcon, ChevronLeft, ChevronRight,
  Plus, Pill, Stethoscope, Heart, Bell, Clock, MapPin,
  Activity, Moon, Sun, Sparkles, AlertCircle, Droplet,
} from 'lucide-react';

const NB = { black: '#0A0A0A', yellow: '#FEF300', white: '#fff', bg: '#FFFBF0', red: '#FF3D3D', blue: '#00C2FF', green: '#00E676' };

const nbCard = (bg = NB.white): React.CSSProperties => ({
  background: bg, border: `3px solid ${NB.black}`, boxShadow: `5px 5px 0 ${NB.black}`,
  borderRadius: 0, padding: 24, marginBottom: 20,
});

interface CalendarEvent {
  id: number; date: string;
  type: 'medicine' | 'appointment' | 'vaccine' | 'milestone' | 'reminder';
  title: string; time?: string; location?: string; notes?: string; completed?: boolean;
}

type CyclePhase = 'period' | 'follicular' | 'ovulation' | 'luteal' | 'none';

interface SmartCalendarProps { onBack?: () => void; }

export function SmartCalendar({ onBack }: SmartCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [events] = useState<CalendarEvent[]>([
    { id: 1, date: '2024-12-16', type: 'medicine',     title: 'Prenatal Vitamin',   time: '09:00 AM', completed: true  },
    { id: 2, date: '2024-12-16', type: 'medicine',     title: 'Iron Supplement',    time: '09:00 PM', completed: false },
    { id: 3, date: '2024-12-18', type: 'appointment',  title: 'Ultrasound',         time: '10:30 AM', location: 'City Medical Center', completed: false },
    { id: 4, date: '2024-12-20', type: 'reminder',     title: 'Drink 8 glasses',    completed: false },
    { id: 5, date: '2024-12-22', type: 'milestone',    title: 'Week 20 – Halfway!', completed: false },
  ]);

  const periodStart = new Date(2024, 11, 10);
  const cycleLength = 28;

  const getCyclePhase = (date: Date): CyclePhase => {
    const d = Math.floor((date.getTime() - periodStart.getTime()) / 86400000);
    const day = ((d % cycleLength) + cycleLength) % cycleLength;
    if (day < 5)  return 'period';
    if (day < 12) return 'follicular';
    if (day < 15) return 'ovulation';
    if (day < 28) return 'luteal';
    return 'none';
  };

  const getPhaseInfo = (phase: CyclePhase) => {
    const map = {
      period:     { name: 'Period',          color: NB.red,   textColor: NB.white, icon: Droplet,   desc: 'Menstruation phase' },
      follicular: { name: 'Follicular',      color: NB.green, textColor: NB.black, icon: Sun,       desc: 'Energy levels rising' },
      ovulation:  { name: 'Ovulation Window',color: '#B44FFF',textColor: NB.white, icon: Sparkles,  desc: 'Peak fertility (2-3 days)' },
      luteal:     { name: 'Luteal Phase',    color: NB.blue,  textColor: NB.black, icon: Moon,      desc: 'Pre-menstrual phase' },
      none:       { name: 'Unknown',         color: '#ccc',   textColor: NB.black, icon: CalendarIcon, desc: '' },
    };
    return map[phase];
  };

  const getEventColor = (type: CalendarEvent['type']) => {
    const map = { medicine: NB.blue, appointment: '#B44FFF', milestone: '#FF4FA3', reminder: '#FF8C00', vaccine: NB.green };
    return map[type] || '#ccc';
  };
  const getEventIcon = (type: CalendarEvent['type']) => {
    const map = { medicine: Pill, appointment: Stethoscope, milestone: Heart, reminder: Bell, vaccine: Activity };
    return map[type] || CalendarIcon;
  };

  const getDays = (d: Date) => {
    const first = new Date(d.getFullYear(), d.getMonth(), 1).getDay();
    const last  = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
    const days: (Date | null)[] = Array(first).fill(null);
    for (let i = 1; i <= last; i++) days.push(new Date(d.getFullYear(), d.getMonth(), i));
    return days;
  };

  const fmtKey = (d: Date) => d.toISOString().split('T')[0];
  const eventsOn = (d: Date | null) => d ? events.filter(e => e.date === fmtKey(d)) : [];
  const isToday = (d: Date | null) => d ? fmtKey(d) === fmtKey(new Date()) : false;
  const isSel   = (d: Date | null) => d && selectedDate ? fmtKey(d) === fmtKey(selectedDate) : false;

  const days = getDays(currentDate);
  const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const selEvents = eventsOn(selectedDate);
  const selPhase  = selectedDate ? getCyclePhase(selectedDate) : 'none';
  const phaseInfo = getPhaseInfo(selPhase);

  return (
    <div style={{ background: NB.bg, minHeight: '100vh', padding: '24px 24px 40px', fontFamily: "'Space Grotesk','Inter',sans-serif" }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>

        {/* Header */}
        {onBack && (
          <button onClick={onBack} style={{ background: NB.yellow, border: `3px solid ${NB.black}`, boxShadow: `3px 3px 0 ${NB.black}`, padding: '8px 16px', fontWeight: 800, fontSize: '0.8rem', textTransform: 'uppercase', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
            <ArrowLeft size={16} /> Back
          </button>
        )}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: 'inline-block', background: NB.blue, border: `3px solid ${NB.black}`, boxShadow: `3px 3px 0 ${NB.black}`, padding: '3px 14px', marginBottom: 8 }}>
            <span style={{ fontWeight: 900, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Smart Calendar</span>
          </div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 900, color: NB.black, margin: '0 0 4px' }}>Track Your Journey</h1>
          <p style={{ fontWeight: 600, color: '#555', margin: 0 }}>Cycle, symptoms & appointments in one place</p>
        </div>

        {/* Calendar Card */}
        <div style={nbCard(NB.white)}>
          {/* Month nav */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <h2 style={{ fontWeight: 900, fontSize: '1.3rem', textTransform: 'uppercase', margin: 0 }}>{monthName}</h2>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => { const d = new Date(currentDate); d.setMonth(d.getMonth() - 1); setCurrentDate(d); }}
                style={{ background: NB.white, border: `3px solid ${NB.black}`, boxShadow: `3px 3px 0 ${NB.black}`, padding: '6px 10px', cursor: 'pointer', fontWeight: 800 }}>
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => { const d = new Date(currentDate); d.setMonth(d.getMonth() + 1); setCurrentDate(d); }}
                style={{ background: NB.white, border: `3px solid ${NB.black}`, boxShadow: `3px 3px 0 ${NB.black}`, padding: '6px 10px', cursor: 'pointer', fontWeight: 800 }}>
                <ChevronRight size={16} />
              </button>
              <button style={{ background: NB.yellow, border: `3px solid ${NB.black}`, boxShadow: `3px 3px 0 ${NB.black}`, padding: '6px 14px', fontWeight: 800, fontSize: '0.78rem', textTransform: 'uppercase', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                <Plus size={14} /> Add Event
              </button>
            </div>
          </div>

          {/* Legend */}
          <div style={{ display: 'flex', gap: 16, marginBottom: 16, flexWrap: 'wrap' }}>
            {[
              { color: NB.black, label: 'Selected' },
              { color: NB.yellow, label: 'Today' },
              { color: NB.red, label: 'Period' },
              { color: '#B44FFF', label: 'Ovulation' },
            ].map(l => (
              <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 14, height: 14, background: l.color, border: `2px solid ${NB.black}` }} />
                <span style={{ fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase' }}>{l.label}</span>
              </div>
            ))}
          </div>

          {/* Day headers */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2, marginBottom: 2 }}>
            {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => (
              <div key={d} style={{ textAlign: 'center', fontWeight: 800, fontSize: '0.72rem', textTransform: 'uppercase', padding: '6px 0', background: NB.black, color: NB.yellow }}>
                {d}
              </div>
            ))}
          </div>

          {/* Days grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2 }}>
            {days.map((day, i) => {
              if (!day) return <div key={i} />;
              const phase = getCyclePhase(day);
              const sel   = isSel(day);
              const today = isToday(day);
              const hasEv = eventsOn(day).length > 0;
              let bg = NB.white;
              if (sel)                       bg = NB.black;
              else if (today)                bg = NB.yellow;
              else if (phase === 'period')   bg = '#FFD6D6';
              else if (phase === 'ovulation') bg = '#E8D6FF';

              return (
                <button key={i} onClick={() => setSelectedDate(day)}
                  style={{
                    aspectRatio: '1', padding: 4, textAlign: 'center', cursor: 'pointer',
                    background: bg, border: `2px solid ${sel || today ? NB.black : '#ddd'}`,
                    fontWeight: sel ? 900 : 700, color: sel ? NB.yellow : NB.black,
                    fontSize: '0.85rem', position: 'relative', borderRadius: 0,
                    boxShadow: sel ? `2px 2px 0 ${NB.yellow}` : 'none',
                    transition: 'all 0.1s',
                  }}
                >
                  {day.getDate()}
                  {hasEv && (
                    <div style={{ position: 'absolute', bottom: 2, left: '50%', transform: 'translateX(-50%)', width: 6, height: 6, background: sel ? NB.yellow : NB.black, borderRadius: 0 }} />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Day Details */}
        <div style={nbCard(NB.white)}>
          <h2 style={{ fontWeight: 900, fontSize: '1.1rem', textTransform: 'uppercase', margin: '0 0 16px', borderBottom: `3px solid ${NB.black}`, paddingBottom: 8 }}>
            {selectedDate ? selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'Select a Day'}
          </h2>

          {/* Phase */}
          <div style={{ marginBottom: 16 }}>
            <p style={{ fontWeight: 800, fontSize: '0.72rem', textTransform: 'uppercase', color: '#555', marginBottom: 8 }}>Cycle Phase</p>
            <div style={{ background: phaseInfo.color, border: `3px solid ${NB.black}`, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
              <phaseInfo.icon size={20} color={phaseInfo.textColor} />
              <div>
                <p style={{ fontWeight: 900, color: phaseInfo.textColor, margin: 0 }}>{phaseInfo.name}</p>
                <p style={{ fontWeight: 600, color: phaseInfo.textColor, opacity: 0.8, fontSize: '0.8rem', margin: 0 }}>{phaseInfo.desc}</p>
              </div>
            </div>
          </div>

          {/* Events */}
          <div style={{ marginBottom: 16 }}>
            <p style={{ fontWeight: 800, fontSize: '0.72rem', textTransform: 'uppercase', color: '#555', marginBottom: 8 }}>Reminders & Tasks</p>
            {selEvents.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {selEvents.map(event => {
                  const Icon = getEventIcon(event.type);
                  const ec   = getEventColor(event.type);
                  return (
                    <div key={event.id} style={{ background: ec + '22', border: `3px solid ${ec}`, padding: '12px 16px', opacity: event.completed ? 0.6 : 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ width: 32, height: 32, background: ec, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `2px solid ${NB.black}` }}>
                          <Icon size={14} color={NB.white} />
                        </div>
                        <div style={{ flex: 1 }}>
                          <p style={{ fontWeight: 800, margin: 0, textDecoration: event.completed ? 'line-through' : 'none', fontSize: '0.9rem' }}>{event.title}</p>
                          {event.time && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
                              <Clock size={12} /><span style={{ fontSize: '0.78rem', fontWeight: 600 }}>{event.time}</span>
                            </div>
                          )}
                          {event.location && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
                              <MapPin size={12} /><span style={{ fontSize: '0.78rem', fontWeight: 600 }}>{event.location}</span>
                            </div>
                          )}
                        </div>
                        {event.completed && (
                          <div style={{ background: NB.green, border: `2px solid ${NB.black}`, padding: '2px 8px', fontWeight: 800, fontSize: '0.7rem', textTransform: 'uppercase' }}>Done</div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div style={{ border: `3px dashed ${NB.black}`, padding: '20px', textAlign: 'center', fontWeight: 700, color: '#777' }}>No events on this day</div>
            )}
          </div>

          {/* Self-care tip */}
          <div style={{ background: NB.yellow, border: `3px solid ${NB.black}`, boxShadow: `4px 4px 0 ${NB.black}`, padding: '14px 16px' }}>
            <p style={{ fontWeight: 800, fontSize: '0.72rem', textTransform: 'uppercase', margin: '0 0 4px' }}>💡 Self-Care Tip</p>
            <p style={{ fontWeight: 600, margin: 0, fontSize: '0.9rem' }}>
              {selPhase === 'period'     && '🌸 Rest, stay hydrated, and use a heating pad for cramps.'}
              {selPhase === 'follicular' && '💪 Great time for high-energy activities and starting new projects!'}
              {selPhase === 'ovulation'  && '✨ Peak energy – perfect for social activities and exercise.'}
              {selPhase === 'luteal'     && '🧘 Focus on gentle exercise, stress relief, and nourishing foods.'}
              {selPhase === 'none'       && '💗 Stay active, eat well, and get plenty of rest.'}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
