import { useState } from 'react';
import { ArrowLeft, Heart, Activity, Plus, Minus, Save, FileText, Droplets, Thermometer, AlertCircle } from 'lucide-react';

const NB = { black: '#0A0A0A', yellow: '#FEF300', white: '#fff', bg: '#FFFBF0', red: '#FF3D3D', blue: '#00C2FF', green: '#00E676', pink: '#FFD6EC' };

const nbCard = (bg = NB.white): React.CSSProperties => ({
  background: bg, border: `3px solid ${NB.black}`, boxShadow: `5px 5px 0 ${NB.black}`,
  borderRadius: 0, padding: 24, marginBottom: 20,
});
const nbInput: React.CSSProperties = {
  width: '100%', border: `3px solid ${NB.black}`, borderRadius: 0, padding: '10px 14px',
  fontWeight: 600, fontSize: '0.95rem', background: NB.white, boxSizing: 'border-box',
  outline: 'none', boxShadow: `3px 3px 0 ${NB.black}`,
};
const nbBtn = (bg: string, color: string): React.CSSProperties => ({
  background: bg, color, border: `3px solid ${NB.black}`, boxShadow: `4px 4px 0 ${NB.black}`,
  borderRadius: 0, padding: '10px 20px', fontWeight: 800, fontSize: '0.85rem',
  textTransform: 'uppercase' as const, letterSpacing: '0.05em', cursor: 'pointer',
  transition: 'transform 0.1s, box-shadow 0.1s', display: 'flex', alignItems: 'center', gap: 8,
});
const sectionTitle = (label: string, icon: React.ReactNode) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18, borderBottom: `3px solid ${NB.black}`, paddingBottom: 8 }}>
    <div style={{ width: 36, height: 36, background: NB.black, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      {icon}
    </div>
    <h2 style={{ fontWeight: 900, fontSize: '1.05rem', textTransform: 'uppercase', margin: 0, letterSpacing: '0.05em' }}>{label}</h2>
  </div>
);

interface HealthMonitoringProps { onBack?: () => void; }

export function HealthMonitoring({ onBack }: HealthMonitoringProps) {
  const [feeling, setFeeling] = useState('');
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [weight, setWeight] = useState('');
  const [notes, setNotes] = useState('');
  const [todayKicks, setTodayKicks] = useState(0);
  const [heartRate, setHeartRate] = useState('');
  const [bpSys, setBpSys] = useState('');
  const [bpDia, setBpDia] = useState('');
  const [bloodSugar, setBloodSugar] = useState('');
  const [hemoglobin, setHemoglobin] = useState('');
  const [reportPeriod, setReportPeriod] = useState<'daily'|'weekly'>('daily');
  const [vitalHistory, setVitalHistory] = useState<any[]>([]);
  const [kickHistory, setKickHistory] = useState<any[]>([]);

  const feelingOpts = [
    { val: 'great', label: 'Great 😊', bg: NB.green },
    { val: 'good',  label: 'Good 🙂',  bg: NB.blue  },
    { val: 'okay',  label: 'Okay 😐',  bg: NB.yellow},
    { val: 'tired', label: 'Tired 😴', bg: NB.pink  },
    { val: 'unwell',label: 'Unwell 😰', bg: NB.red, color: NB.white },
  ];
  const symptomOpts = ['Nausea','Fatigue','Headache','Back Pain','Swelling','Dizziness','Heartburn','Insomnia','Leg Cramps','Mood Swings','Shortness of Breath','Constipation'];

  const toggleSymptom = (s: string) => setSymptoms(p => p.includes(s) ? p.filter(x => x !== s) : [...p, s]);

  return (
    <div style={{ background: NB.bg, minHeight: '100vh', padding: '24px 24px 40px', fontFamily: "'Space Grotesk','Inter',sans-serif" }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>

        {onBack && (
          <button onClick={onBack} style={{ ...nbBtn(NB.yellow, NB.black), marginBottom: 20 }}>
            <ArrowLeft size={16} /> Back
          </button>
        )}

        <div style={{ marginBottom: 24 }}>
          <div style={{ display: 'inline-block', background: NB.red, border: `3px solid ${NB.black}`, boxShadow: `3px 3px 0 ${NB.black}`, padding: '3px 14px', marginBottom: 8 }}>
            <span style={{ fontWeight: 900, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: NB.white }}>Health Monitoring</span>
          </div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 900, color: NB.black, margin: 0 }}>Daily Health Check-In</h1>
        </div>

        {/* How are you feeling? */}
        <div style={nbCard(NB.white)}>
          {sectionTitle('Health Check-In', <Activity size={18} color={NB.yellow} />)}
          <p style={{ fontWeight: 800, fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: 10 }}>How are you feeling today?</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8, marginBottom: 20 }}>
            {feelingOpts.map(o => (
              <button key={o.val} onClick={() => setFeeling(o.val)} style={{
                background: feeling === o.val ? NB.black : o.bg || NB.bg,
                color: feeling === o.val ? NB.yellow : (o.color || NB.black),
                border: `3px solid ${NB.black}`, boxShadow: feeling === o.val ? `3px 3px 0 ${NB.yellow}` : `3px 3px 0 ${NB.black}`,
                padding: '10px 6px', fontWeight: 800, fontSize: '0.75rem', textTransform: 'uppercase',
                cursor: 'pointer', borderRadius: 0, textAlign: 'center', transition: 'all 0.1s',
              }}>{o.label}</button>
            ))}
          </div>

          <p style={{ fontWeight: 800, fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: 10 }}>Any Symptoms?</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
            {symptomOpts.map(s => (
              <button key={s} onClick={() => toggleSymptom(s)} style={{
                background: symptoms.includes(s) ? NB.black : NB.white,
                color: symptoms.includes(s) ? NB.yellow : NB.black,
                border: `2px solid ${NB.black}`, padding: '6px 12px', fontWeight: 700,
                fontSize: '0.78rem', textTransform: 'uppercase', cursor: 'pointer', borderRadius: 0, transition: 'all 0.1s',
              }}>{s}</button>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <label style={{ fontWeight: 800, fontSize: '0.78rem', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Weight (lbs)</label>
              <input type="number" value={weight} onChange={e => setWeight(e.target.value)} placeholder="Enter weight" style={nbInput} />
            </div>
            <div>
              <label style={{ fontWeight: 800, fontSize: '0.78rem', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Notes (optional)</label>
              <input type="text" value={notes} onChange={e => setNotes(e.target.value)} placeholder="Any other details..." style={nbInput} />
            </div>
          </div>
          <button style={{ ...nbBtn(NB.black, NB.yellow), width: '100%', justifyContent: 'center' }}
            onClick={() => alert('Check-in saved!')}>
            <Save size={18} /> Save Check-In
          </button>
        </div>

        {/* Baby Kick Monitor */}
        <div style={nbCard(NB.pink)}>
          {sectionTitle('Baby Kick Monitor', <Heart size={18} color={NB.yellow} />)}
          <div style={{ textAlign: 'center', marginBottom: 20 }}>
            <div style={{ display: 'inline-block', background: NB.black, border: `4px solid ${NB.black}`, boxShadow: `6px 6px 0 ${NB.yellow}`, padding: '24px 40px', marginBottom: 16 }}>
              <p style={{ fontWeight: 900, fontSize: '4rem', color: NB.yellow, margin: 0, lineHeight: 1 }}>{todayKicks}</p>
              <p style={{ fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', color: '#ccc', margin: 0 }}>kicks today</p>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
            <button onClick={() => setTodayKicks(p => p + 1)} style={{ ...nbBtn(NB.black, NB.yellow), justifyContent: 'center' }}>
              <Plus size={18} /> Add Kick
            </button>
            <button onClick={() => setTodayKicks(p => Math.max(0, p - 1))} style={{ ...nbBtn(NB.white, NB.black), justifyContent: 'center' }}>
              <Minus size={18} /> Remove
            </button>
          </div>
          <div style={{ background: NB.yellow, border: `3px solid ${NB.black}`, boxShadow: `4px 4px 0 ${NB.black}`, padding: '12px 16px', marginBottom: 12 }}>
            <p style={{ fontWeight: 700, fontSize: '0.85rem', margin: 0 }}>
              💡 <strong>Tip:</strong> Aim for at least 10 movements in 2 hours when baby is active.
            </p>
          </div>
          <button style={{ ...nbBtn(NB.black, NB.yellow), width: '100%', justifyContent: 'center' }}
            onClick={() => { setKickHistory(p => [{ date: new Date().toLocaleDateString(), kicks: todayKicks }, ...p]); alert('Saved!'); }}>
            <Save size={18} /> Save Kick Count
          </button>
          {kickHistory.length > 0 && (
            <div style={{ marginTop: 16 }}>
              <p style={{ fontWeight: 800, fontSize: '0.78rem', textTransform: 'uppercase', marginBottom: 8 }}>Recent History</p>
              {kickHistory.slice(0, 5).map((e, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', border: `2px solid ${NB.black}`, padding: '8px 12px', marginBottom: 4, background: NB.white, fontWeight: 700 }}>
                  <span style={{ fontSize: '0.85rem' }}>{e.date}</span>
                  <span style={{ fontSize: '0.85rem' }}>{e.kicks} kicks</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Vital Signs */}
        <div style={nbCard(NB.white)}>
          {sectionTitle('Vital Signs', <Droplets size={18} color={NB.yellow} />)}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 16 }}>
            {[
              { label: 'Heart Rate (bpm)',    val: heartRate,  set: setHeartRate,  hint: 'Normal: 60-100 bpm' },
              { label: 'Blood Sugar (mg/dL)', val: bloodSugar, set: setBloodSugar, hint: 'Normal fasting: 70-95 mg/dL' },
              { label: 'Hemoglobin (g/dL)',   val: hemoglobin, set: setHemoglobin, hint: 'Normal in pregnancy: 11-14 g/dL' },
            ].map(f => (
              <div key={f.label}>
                <label style={{ fontWeight: 800, fontSize: '0.78rem', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>{f.label}</label>
                <input type="number" value={f.val} onChange={e => f.set(e.target.value)} placeholder={f.hint} style={nbInput} />
                <p style={{ fontSize: '0.72rem', color: '#666', fontWeight: 600, marginTop: 4 }}>{f.hint}</p>
              </div>
            ))}
            <div>
              <label style={{ fontWeight: 800, fontSize: '0.78rem', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Blood Pressure</label>
              <div style={{ display: 'flex', gap: 8 }}>
                <input type="number" value={bpSys} onChange={e => setBpSys(e.target.value)} placeholder="Systolic" style={{ ...nbInput, flex: 1 }} />
                <input type="number" value={bpDia} onChange={e => setBpDia(e.target.value)} placeholder="Diastolic" style={{ ...nbInput, flex: 1 }} />
              </div>
              <p style={{ fontSize: '0.72rem', color: '#666', fontWeight: 600, marginTop: 4 }}>Normal: 90-120 / 60-80 mmHg</p>
            </div>
          </div>
          <button style={{ ...nbBtn(NB.black, NB.yellow), width: '100%', justifyContent: 'center' }}
            onClick={() => { setVitalHistory(p => [{ date: new Date().toLocaleDateString(), hr: heartRate, bp: `${bpSys}/${bpDia}`, bs: bloodSugar, hb: hemoglobin }, ...p]); alert('Vitals saved!'); }}>
            <Save size={18} /> Save Vital Readings
          </button>
          {vitalHistory.length > 0 && (
            <div style={{ marginTop: 16 }}>
              <p style={{ fontWeight: 800, fontSize: '0.78rem', textTransform: 'uppercase', marginBottom: 8 }}>Recent Vitals</p>
              {vitalHistory.slice(0, 3).map((v, i) => (
                <div key={i} style={{ border: `2px solid ${NB.black}`, padding: '10px 14px', marginBottom: 6, background: NB.bg }}>
                  <p style={{ fontWeight: 800, margin: '0 0 4px', fontSize: '0.8rem' }}>{v.date}</p>
                  <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                    {v.hr && <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>HR: {v.hr} bpm</span>}
                    {v.bp !== '/' && <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>BP: {v.bp} mmHg</span>}
                    {v.bs && <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>BS: {v.bs} mg/dL</span>}
                    {v.hb && <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>Hb: {v.hb} g/dL</span>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Reference Guide */}
        <div style={nbCard('#00C2FF')}>
          {sectionTitle('Vital Signs Reference', <Thermometer size={18} color={NB.black} />)}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { title: '❤️ Heart Rate',    lines: ['✓ Normal: 60-100 bpm','ℹ️ Pregnancy: 70-90 bpm','⚠️ Alert: <60 or >100 bpm'] },
              { title: '💉 Blood Pressure', lines: ['✓ Normal: 90-120 / 60-80','⚠️ Elevated: 120-140 / 80-90','🚨 High: ≥ 140/90 (call doctor)'] },
              { title: '🍬 Blood Sugar',    lines: ['✓ Fasting: 70-95 mg/dL','✓ After meal: <140 mg/dL','⚠️ Abnormal: >95 fasting'] },
              { title: '🔴 Hemoglobin',     lines: ['✓ Normal: 11-14 g/dL','⚠️ Mild anemia: 10-11 g/dL','🚨 Severe: <7 g/dL'] },
            ].map(ref => (
              <div key={ref.title} style={{ background: NB.white, border: `3px solid ${NB.black}`, padding: '12px 14px' }}>
                <p style={{ fontWeight: 900, fontSize: '0.85rem', margin: '0 0 8px' }}>{ref.title}</p>
                {ref.lines.map((l, i) => <p key={i} style={{ fontWeight: 600, fontSize: '0.78rem', margin: '0 0 3px' }}>{l}</p>)}
              </div>
            ))}
          </div>
        </div>

        {/* Reports */}
        <div style={nbCard(NB.white)}>
          {sectionTitle('Health Reports', <FileText size={18} color={NB.yellow} />)}
          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            {['daily', 'weekly'].map(p => (
              <button key={p} onClick={() => setReportPeriod(p as any)} style={{
                background: reportPeriod === p ? NB.black : NB.bg,
                color: reportPeriod === p ? NB.yellow : NB.black,
                border: `3px solid ${NB.black}`, boxShadow: `3px 3px 0 ${NB.black}`,
                padding: '8px 20px', fontWeight: 800, fontSize: '0.8rem', textTransform: 'uppercase',
                cursor: 'pointer', borderRadius: 0, transition: 'all 0.1s',
              }}>{p}</button>
            ))}
          </div>
          <div style={{ border: `3px dashed ${NB.black}`, padding: 24, textAlign: 'center', fontWeight: 700, color: '#777' }}>
            Complete your first check-in above to see {reportPeriod} reports
          </div>
        </div>

        {/* Emergency */}
        <div style={{ background: NB.red, border: `3px solid ${NB.black}`, boxShadow: `5px 5px 0 ${NB.black}`, padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <AlertCircle size={24} color={NB.white} />
            <h2 style={{ fontWeight: 900, fontSize: '1rem', textTransform: 'uppercase', color: NB.white, margin: 0 }}>When to Contact Your Doctor</h2>
          </div>
          {['Severe headache or vision changes', 'BP ≥ 140/90 mmHg (preeclampsia risk)', 'Decreased baby movement (<10 in 2 hrs)', 'Unusual bleeding or severe pain'].map((w, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 8 }}>
              <div style={{ width: 10, height: 10, background: NB.yellow, flexShrink: 0, marginTop: 5 }} />
              <p style={{ fontWeight: 700, color: NB.white, margin: 0, fontSize: '0.9rem' }}>{w}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}