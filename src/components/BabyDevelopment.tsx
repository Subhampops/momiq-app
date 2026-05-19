import { useState } from 'react';
import { ArrowLeft, Baby, Ruler, Weight, Heart, Activity, Lightbulb } from 'lucide-react';

const NB = { black: '#0A0A0A', yellow: '#FEF300', white: '#fff', bg: '#FFFBF0', blue: '#00C2FF', green: '#00E676', pink: '#FFD6EC' };

const nbCard = (bg = NB.white): React.CSSProperties => ({
  background: bg, border: `3px solid ${NB.black}`, boxShadow: `5px 5px 0 ${NB.black}`,
  borderRadius: 0, padding: 24, marginBottom: 20,
});

interface BabyDevelopmentProps { onBack?: () => void; }

export function BabyDevelopment({ onBack }: BabyDevelopmentProps) {
  const [currentWeek, setCurrentWeek] = useState(14);

  const weeklyData = [
    { week: 4,  size: 'Poppy Seed',  emoji: '🌱', length: '0.04 in', weight: '0.01 oz', milestone: 'Neural tube forming',     desc: 'The embryo is forming its basic structure' },
    { week: 6,  size: 'Sweet Pea',   emoji: '🌿', length: '0.25 in', weight: '0.04 oz', milestone: 'Heart begins beating',     desc: 'Tiny heart starts pumping blood' },
    { week: 8,  size: 'Raspberry',   emoji: '🫐', length: '0.63 in', weight: '0.14 oz', milestone: 'Fingers forming',          desc: 'Webbed fingers and toes are developing' },
    { week: 10, size: 'Strawberry',  emoji: '🍓', length: '1.22 in', weight: '0.49 oz', milestone: 'Vital organs forming',     desc: 'All vital organs are in place' },
    { week: 12, size: 'Lime',        emoji: '🍋‍🟩', length: '2.13 in', weight: '0.49 oz', milestone: 'Reflexes developing',  desc: 'Baby can make sucking motions' },
    { week: 14, size: 'Lemon',       emoji: '🍋', length: '3.42 in', weight: '1.52 oz', milestone: 'Facial expressions',       desc: 'Baby can squint, frown, and grimace' },
    { week: 16, size: 'Avocado',     emoji: '🥑', length: '4.57 in', weight: '3.53 oz', milestone: 'Can hear sounds',          desc: 'Ears functioning — hears your voice!' },
    { week: 18, size: 'Bell Pepper', emoji: '🫑', length: '5.59 in', weight: '6.70 oz', milestone: 'Fingerprints forming',     desc: 'Unique fingerprints are developing' },
    { week: 20, size: 'Banana',      emoji: '🍌', length: '6.46 in', weight: '10.58 oz', milestone: 'Hair growing',           desc: 'Lanugo covers the body' },
    { week: 22, size: 'Papaya',      emoji: '🥭', length: '7.36 in', weight: '15.17 oz', milestone: 'Eyes fully formed',      desc: 'Eyelids and eyebrows complete' },
    { week: 24, size: 'Corn',        emoji: '🌽', length: '8.46 in', weight: '1.32 lbs', milestone: 'Lungs developing',       desc: 'Airways and air sacs forming' },
    { week: 26, size: 'Lettuce',     emoji: '🥬', length: '9.19 in', weight: '1.68 lbs', milestone: 'Eyes opening',           desc: 'Baby can open and close eyes' },
    { week: 28, size: 'Eggplant',    emoji: '🍆', length: '10.04 in', weight: '2.22 lbs', milestone: 'Dreaming begins',      desc: 'REM sleep — baby can dream' },
    { week: 30, size: 'Cabbage',     emoji: '🥬', length: '10.79 in', weight: '2.91 lbs', milestone: 'Brain developing fast', desc: 'Brain tissue expanding and folding' },
    { week: 32, size: 'Pineapple',   emoji: '🍍', length: '11.69 in', weight: '3.75 lbs', milestone: 'Breathing practice',   desc: 'Movements preparing for birth' },
    { week: 34, size: 'Cantaloupe',  emoji: '🍈', length: '12.52 in', weight: '4.73 lbs', milestone: 'Immune strengthening',  desc: 'Antibodies from mother transferring' },
    { week: 36, size: 'Honeydew',    emoji: '🍈', length: '13.38 in', weight: '5.78 lbs', milestone: 'Shedding lanugo',       desc: 'Fine hair is falling off' },
    { week: 38, size: 'Pumpkin',     emoji: '🎃', length: '14.02 in', weight: '6.80 lbs', milestone: 'Fully developed',       desc: 'All organs mature and ready' },
    { week: 40, size: 'Watermelon',  emoji: '🍉', length: '14.96 in', weight: '7.63 lbs', milestone: 'Ready for birth!',      desc: 'Baby is full term! 🎉' },
  ];

  const data = weeklyData.find(w => w.week === currentWeek) || weeklyData[5];
  const weeks = weeklyData.map(w => w.week);

  const trimesterOf = (w: number) => w <= 13 ? 'First' : w <= 26 ? 'Second' : 'Third';

  return (
    <div style={{ background: NB.bg, minHeight: '100vh', padding: '24px 24px 40px', fontFamily: "'Space Grotesk','Inter',sans-serif" }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>

        {/* Header */}
        {onBack && (
          <button onClick={onBack} style={{ background: NB.yellow, border: `3px solid ${NB.black}`, boxShadow: `3px 3px 0 ${NB.black}`, padding: '8px 16px', fontWeight: 800, fontSize: '0.8rem', textTransform: 'uppercase', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20, borderRadius: 0 }}>
            <ArrowLeft size={16} /> Back
          </button>
        )}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: 'inline-block', background: NB.pink, border: `3px solid ${NB.black}`, boxShadow: `3px 3px 0 ${NB.black}`, padding: '3px 14px', marginBottom: 8 }}>
            <span style={{ fontWeight: 900, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Baby Development</span>
          </div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 900, color: NB.black, margin: 0 }}>Your Baby's Journey</h1>
        </div>

        {/* Hero Card */}
        <div style={{ ...nbCard(NB.yellow), textAlign: 'center' }}>
          <div style={{ display: 'inline-block', background: NB.black, color: NB.yellow, border: `3px solid ${NB.black}`, padding: '4px 20px', marginBottom: 16, fontWeight: 900, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Week {data.week} of 40 • {trimesterOf(currentWeek)} Trimester
          </div>
          <div style={{ fontSize: '6rem', marginBottom: 8 }}>{data.emoji}</div>
          <h2 style={{ fontWeight: 900, fontSize: '1.8rem', margin: '0 0 6px' }}>Size of a {data.size}</h2>
          <p style={{ fontWeight: 600, color: '#555', margin: '0 0 20px' }}>{data.desc}</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {[
              { icon: Ruler,    label: 'Length',    val: data.length    },
              { icon: Weight,   label: 'Weight',    val: data.weight    },
              { icon: Heart,    label: 'Milestone', val: data.milestone },
            ].map(m => (
              <div key={m.label} style={{ background: NB.white, border: `3px solid ${NB.black}`, padding: '14px 10px', textAlign: 'center' }}>
                <m.icon size={20} style={{ margin: '0 auto 8px' }} />
                <p style={{ fontWeight: 700, fontSize: '0.7rem', textTransform: 'uppercase', color: '#555', margin: '0 0 4px' }}>{m.label}</p>
                <p style={{ fontWeight: 900, fontSize: '0.9rem', margin: 0 }}>{m.val}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div style={nbCard(NB.white)}>
          <h3 style={{ fontWeight: 900, fontSize: '1rem', textTransform: 'uppercase', margin: '0 0 16px', borderBottom: `3px solid ${NB.black}`, paddingBottom: 8 }}>Pregnancy Timeline</h3>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <button onClick={() => { const i = weeks.indexOf(currentWeek); if (i > 0) setCurrentWeek(weeks[i - 1]); }}
              disabled={currentWeek <= 4}
              style={{ background: NB.black, color: NB.yellow, border: `3px solid ${NB.black}`, boxShadow: `3px 3px 0 #555`, padding: '8px 16px', fontWeight: 800, textTransform: 'uppercase', fontSize: '0.8rem', cursor: 'pointer', opacity: currentWeek <= 4 ? 0.4 : 1, borderRadius: 0 }}>
              ← Prev
            </button>
            <div style={{ flex: 1, textAlign: 'center', fontWeight: 800, fontSize: '0.9rem', textTransform: 'uppercase' }}>Week {currentWeek} of 40</div>
            <button onClick={() => { const i = weeks.indexOf(currentWeek); if (i < weeks.length - 1) setCurrentWeek(weeks[i + 1]); }}
              disabled={currentWeek >= 40}
              style={{ background: NB.black, color: NB.yellow, border: `3px solid ${NB.black}`, boxShadow: `3px 3px 0 #555`, padding: '8px 16px', fontWeight: 800, textTransform: 'uppercase', fontSize: '0.8rem', cursor: 'pointer', opacity: currentWeek >= 40 ? 0.4 : 1, borderRadius: 0 }}>
              Next →
            </button>
          </div>

          {/* Progress bar */}
          <div style={{ border: `3px solid ${NB.black}`, background: NB.bg, height: 24, marginBottom: 12, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${(currentWeek / 40) * 100}%`, background: NB.yellow, borderRight: `3px solid ${NB.black}`, transition: 'width 0.4s ease' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
            {['Wk 1', 'Wk 13', 'Wk 27', 'Wk 40'].map(l => (
              <span key={l} style={{ fontWeight: 700, fontSize: '0.72rem', textTransform: 'uppercase', color: '#555' }}>{l}</span>
            ))}
          </div>

          {/* Trimester markers */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
            {[
              { label: 'First Trimester',  range: 'Wk 1–13',  active: currentWeek <= 13,               bg: NB.pink  },
              { label: 'Second Trimester', range: 'Wk 14–26', active: currentWeek > 13 && currentWeek <= 26, bg: NB.blue  },
              { label: 'Third Trimester',  range: 'Wk 27–40', active: currentWeek > 26,                bg: NB.green },
            ].map(t => (
              <div key={t.label} style={{
                background: t.active ? t.bg : '#F0EDE0',
                border: `3px solid ${t.active ? NB.black : '#ccc'}`,
                boxShadow: t.active ? `3px 3px 0 ${NB.black}` : 'none',
                padding: '12px', textAlign: 'center',
              }}>
                <p style={{ fontWeight: 800, fontSize: '0.8rem', textTransform: 'uppercase', margin: '0 0 2px' }}>{t.label}</p>
                <p style={{ fontWeight: 600, fontSize: '0.72rem', color: '#555', margin: 0 }}>{t.range}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Progress & Tips */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <div style={nbCard('#FFD6EC')}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <Baby size={20} />
              <h3 style={{ fontWeight: 900, fontSize: '0.9rem', textTransform: 'uppercase', margin: 0 }}>Baby's Progress</h3>
            </div>
            {[
              { icon: Activity, label: 'Development', text: `Week ${currentWeek}: ${data.milestone}. Growing stronger every day!`, bg: NB.white },
              { icon: Heart,    label: 'Physical',    text: 'Can move and stretch. Organs maturing. Sensory development progressing.', bg: NB.white },
            ].map(item => (
              <div key={item.label} style={{ background: item.bg, border: `2px solid ${NB.black}`, padding: '10px 12px', marginBottom: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <item.icon size={14} />
                  <p style={{ fontWeight: 800, fontSize: '0.78rem', textTransform: 'uppercase', margin: 0 }}>{item.label}</p>
                </div>
                <p style={{ fontWeight: 600, fontSize: '0.82rem', margin: 0, color: '#444' }}>{item.text}</p>
              </div>
            ))}
          </div>

          <div style={nbCard(NB.yellow)}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <Lightbulb size={20} />
              <h3 style={{ fontWeight: 900, fontSize: '0.9rem', textTransform: 'uppercase', margin: 0 }}>Tips for Week {currentWeek}</h3>
            </div>
            {[
              { label: 'For Mom', text: 'Continue prenatal vitamins. Stay hydrated and rest. Light walking is beneficial.' },
              { label: 'Nutrition', text: 'Protein-rich foods, leafy greens, and healthy fats for optimal development.' },
              { label: 'What to Expect', text: 'You may feel more energetic. Some moms begin to feel baby movements!' },
            ].map(t => (
              <div key={t.label} style={{ background: NB.white, border: `2px solid ${NB.black}`, padding: '10px 12px', marginBottom: 8 }}>
                <p style={{ fontWeight: 800, fontSize: '0.78rem', textTransform: 'uppercase', margin: '0 0 4px' }}>{t.label}</p>
                <p style={{ fontWeight: 600, fontSize: '0.82rem', margin: 0, color: '#444' }}>{t.text}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}