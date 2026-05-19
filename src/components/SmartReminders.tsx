import { useState } from 'react';
import { Bell, Calendar, Pill, Stethoscope, Plus, Clock, Droplet, Activity, Baby, Heart, CheckCircle2, X, Syringe, TrendingUp, Save } from 'lucide-react';
import { VaccineTracker } from './VaccineTracker';

const NB = { black:'#0A0A0A', yellow:'#FEF300', white:'#fff', bg:'#FFFBF0', red:'#FF3D3D', blue:'#00C2FF', green:'#00E676', pink:'#FFD6EC', purple:'#E8D6FF' };
const nbInput: React.CSSProperties = { width:'100%', border:`3px solid ${NB.black}`, borderRadius:0, padding:'10px 14px', fontWeight:600, fontSize:'0.9rem', background:NB.white, boxSizing:'border-box', outline:'none', boxShadow:`3px 3px 0 ${NB.black}` };
const nbSelect: React.CSSProperties = { ...{ width:'100%', border:`3px solid ${NB.black}`, borderRadius:0, padding:'10px 14px', fontWeight:600, fontSize:'0.9rem', background:NB.white, boxSizing:'border-box', outline:'none', boxShadow:`3px 3px 0 ${NB.black}`, cursor:'pointer' } };

const typeColor: Record<string,string> = { medication: NB.purple, appointment: NB.blue, health: NB.green, milestone: NB.pink };
const typeIcon: Record<string,any> = { medication: Pill, appointment: Stethoscope, health: Activity, milestone: Bell };

interface Reminder { id:number; title:string; type:string; time:string; date:string; completed:boolean; enabled:boolean; }
interface Alert { id:number; title:string; description:string; time:string; bg:string; enabled:boolean; iconType:string; }
interface Milestone { id:number; week:number; title:string; description:string; bg:string; enabled:boolean; }

interface SmartRemindersProps { onBack?: () => void; }

export function SmartReminders({ onBack }: SmartRemindersProps) {
  const [showVaccine, setShowVaccine] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newR, setNewR] = useState({ title:'', type:'medication', time:'', date:'', notes:'' });

  const [reminders, setReminders] = useState<Reminder[]>([
    { id:1, title:'Prenatal Vitamin',       type:'medication',   time:'08:00 AM', date:'2025-12-20', completed:false, enabled:true },
    { id:2, title:'Iron Supplement',         type:'medication',   time:'02:00 PM', date:'2025-12-20', completed:false, enabled:true },
    { id:3, title:'Doctor Checkup – Week 24',type:'appointment',  time:'10:30 AM', date:'2025-12-22', completed:false, enabled:true },
    { id:4, title:'Glucose Screening Test',  type:'health',       time:'09:00 AM', date:'2025-12-25', completed:false, enabled:true },
    { id:5, title:'Ultrasound Appointment',  type:'appointment',  time:'11:00 AM', date:'2025-12-28', completed:false, enabled:true },
  ]);

  const [alerts, setAlerts] = useState<Alert[]>([
    { id:1, title:'Hydration Reminder', description:'Time to drink a glass of water for you and baby', time:'Every 2 hours', bg:NB.blue,   iconType:'Droplet',  enabled:true },
    { id:2, title:'Gentle Exercise',    description:'Light stretching or prenatal yoga session',       time:'6:00 PM daily',bg:NB.green,  iconType:'Activity', enabled:true },
    { id:3, title:'Rest Time',          description:'Take a break and put your feet up',               time:'3:00 PM daily',bg:NB.pink,   iconType:'Heart',    enabled:true },
    { id:4, title:'Healthy Snack',      description:'Time for a nutritious snack',                     time:'10 AM & 4 PM', bg:'#FFD580', iconType:'Bell',     enabled:true },
  ]);

  const [milestones, setMilestones] = useState<Milestone[]>([
    { id:1, week:12, title:'First Trimester Complete', description:'Baby is now the size of a plum',             bg:NB.purple, enabled:true },
    { id:2, week:20, title:'Halfway There!',            description:"You're halfway through your journey",        bg:NB.pink,   enabled:true },
    { id:3, week:24, title:'Baby Can Hear You',         description:'Your baby can respond to sounds and voices', bg:NB.blue,   enabled:true },
    { id:4, week:28, title:'Third Trimester Begins',    description:'Final stretch! Baby developing rapidly',     bg:NB.green,  enabled:true },
    { id:5, week:36, title:'Almost Ready to Meet Baby', description:'Baby is early term and nearly ready',        bg:'#FFD580', enabled:true },
  ]);

  const addReminder = () => {
    if (newR.title && newR.time && newR.date) {
      setReminders(p => [...p, { id:Date.now(), ...newR, completed:false, enabled:true }]);
      setNewR({ title:'', type:'medication', time:'', date:'', notes:'' });
      setShowAddForm(false);
    }
  };

  const nbCard = (bg=NB.white): React.CSSProperties => ({ background:bg, border:`3px solid ${NB.black}`, boxShadow:`5px 5px 0 ${NB.black}`, borderRadius:0, padding:24, marginBottom:20 });
  const sectionHeader = (label:string, icon:React.ReactNode, onAdd?:()=>void) => (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16, borderBottom:`3px solid ${NB.black}`, paddingBottom:8 }}>
      <div style={{ display:'flex', alignItems:'center', gap:10 }}>
        <div style={{ width:32, height:32, background:NB.black, display:'flex', alignItems:'center', justifyContent:'center' }}>{icon}</div>
        <h3 style={{ fontWeight:900, fontSize:'0.95rem', textTransform:'uppercase', margin:0 }}>{label}</h3>
      </div>
      {onAdd && (
        <button onClick={onAdd} style={{ background:NB.yellow, border:`3px solid ${NB.black}`, boxShadow:`3px 3px 0 ${NB.black}`, padding:'6px 14px', fontWeight:800, fontSize:'0.72rem', textTransform:'uppercase', cursor:'pointer', display:'flex', alignItems:'center', gap:6, borderRadius:0 }}>
          <Plus size={14} /> Add
        </button>
      )}
    </div>
  );

  const Toggle = ({ checked, onChange }: { checked:boolean; onChange:()=>void }) => (
    <button onClick={onChange} style={{ width:44, height:24, background:checked?NB.black:NB.bg, border:`3px solid ${NB.black}`, borderRadius:0, cursor:'pointer', position:'relative', transition:'background 0.2s', flexShrink:0 }}>
      <div style={{ position:'absolute', top:2, left:checked?20:2, width:14, height:14, background:checked?NB.yellow:NB.black, transition:'left 0.2s' }} />
    </button>
  );

  if (showVaccine) return <VaccineTracker onBack={() => setShowVaccine(false)} />;

  return (
    <div style={{ background:NB.bg, minHeight:'100vh', padding:'24px 24px 40px', fontFamily:"'Space Grotesk','Inter',sans-serif" }}>
      <div style={{ maxWidth:900, margin:'0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom:24 }}>
          <div style={{ display:'inline-block', background:NB.yellow, border:`3px solid ${NB.black}`, boxShadow:`3px 3px 0 ${NB.black}`, padding:'3px 14px', marginBottom:8 }}>
            <span style={{ fontWeight:900, fontSize:'0.72rem', textTransform:'uppercase', letterSpacing:'0.1em' }}>Smart Reminders</span>
          </div>
          <h1 style={{ fontSize:'2.2rem', fontWeight:900, color:NB.black, margin:0 }}>Never Miss a Moment</h1>
        </div>

        {/* Vaccine Tracker CTA */}
        <div style={{ ...nbCard('#E8D6FF'), cursor:'pointer', display:'flex', alignItems:'center', gap:16 }} onClick={() => setShowVaccine(true)}>
          <div style={{ width:52, height:52, background:NB.black, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
            <Syringe size={24} color={NB.yellow} />
          </div>
          <div style={{ flex:1 }}>
            <h3 style={{ fontWeight:900, fontSize:'1rem', margin:'0 0 2px' }}>Vaccine Tracker</h3>
            <p style={{ fontWeight:600, fontSize:'0.82rem', color:'#555', margin:0 }}>Track pregnancy and baby vaccinations</p>
          </div>
          <div style={{ background:NB.black, color:NB.yellow, border:`2px solid ${NB.black}`, padding:'2px 10px', fontWeight:800, fontSize:'0.7rem', textTransform:'uppercase' }}>NEW</div>
        </div>

        {/* Upcoming Reminders */}
        <div style={nbCard(NB.white)}>
          {sectionHeader('Upcoming Reminders', <Bell size={16} color={NB.yellow} />, () => setShowAddForm(true))}
          {reminders.length === 0 ? (
            <div style={{ border:`3px dashed ${NB.black}`, padding:32, textAlign:'center', fontWeight:700, color:'#777' }}>No reminders yet. Add one!</div>
          ) : (
            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              {reminders.map(r => {
                const Icon = typeIcon[r.type] || Bell;
                const bg = typeColor[r.type] || NB.bg;
                return (
                  <div key={r.id} style={{ display:'flex', alignItems:'center', gap:14, padding:'12px 14px', background:r.completed?'#F5F5F0':bg, border:`3px solid ${r.enabled?NB.black:'#ccc'}`, opacity:r.completed?0.6:1 }}>
                    <div style={{ width:36, height:36, background:NB.black, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                      <Icon size={16} color={NB.yellow} />
                    </div>
                    <div style={{ flex:1 }}>
                      <p style={{ fontWeight:800, margin:0, textDecoration:r.completed?'line-through':'none', fontSize:'0.88rem' }}>{r.title}</p>
                      <div style={{ display:'flex', gap:12, marginTop:2 }}>
                        <span style={{ fontWeight:600, fontSize:'0.75rem', color:'#555', display:'flex', alignItems:'center', gap:4 }}><Clock size={12}/>{r.time}</span>
                        <span style={{ fontWeight:600, fontSize:'0.75rem', color:'#555', display:'flex', alignItems:'center', gap:4 }}><Calendar size={12}/>{r.date}</span>
                      </div>
                    </div>
                    <Toggle checked={r.enabled} onChange={() => setReminders(p => p.map(x => x.id===r.id?{...x,enabled:!x.enabled}:x))} />
                    <button onClick={() => setReminders(p => p.map(x => x.id===r.id?{...x,completed:!x.completed}:x))} style={{ background:'transparent', border:`2px solid ${NB.black}`, width:30, height:30, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:r.completed?NB.green:NB.black, borderRadius:0 }}>
                      <CheckCircle2 size={16} />
                    </button>
                    <button onClick={() => setReminders(p => p.filter(x => x.id!==r.id))} style={{ background:'transparent', border:`2px solid ${NB.red}`, width:30, height:30, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:NB.red, borderRadius:0 }}>
                      <X size={14} />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Add Reminder Form */}
        {showAddForm && (
          <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.6)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:50, padding:16 }}>
            <div style={{ background:NB.white, border:`4px solid ${NB.black}`, boxShadow:`8px 8px 0 ${NB.yellow}`, padding:28, width:'100%', maxWidth:480, borderRadius:0 }}>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:20 }}>
                <h3 style={{ fontWeight:900, textTransform:'uppercase', margin:0 }}>Add Reminder</h3>
                <button onClick={() => setShowAddForm(false)} style={{ background:'transparent', border:'none', cursor:'pointer', fontSize:'1.2rem' }}>✕</button>
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
                <div>
                  <label style={{ fontWeight:800, fontSize:'0.75rem', textTransform:'uppercase', display:'block', marginBottom:6 }}>Title *</label>
                  <input value={newR.title} onChange={e => setNewR({...newR,title:e.target.value})} placeholder="e.g. Take Vitamin D" style={nbInput} />
                </div>
                <div>
                  <label style={{ fontWeight:800, fontSize:'0.75rem', textTransform:'uppercase', display:'block', marginBottom:6 }}>Type *</label>
                  <select value={newR.type} onChange={e => setNewR({...newR,type:e.target.value})} style={nbSelect}>
                    <option value="medication">Medication</option>
                    <option value="appointment">Appointment</option>
                    <option value="health">Health Check</option>
                    <option value="milestone">Milestone</option>
                  </select>
                </div>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
                  <div>
                    <label style={{ fontWeight:800, fontSize:'0.75rem', textTransform:'uppercase', display:'block', marginBottom:6 }}>Time *</label>
                    <input type="time" value={newR.time} onChange={e => setNewR({...newR,time:e.target.value})} style={nbInput} />
                  </div>
                  <div>
                    <label style={{ fontWeight:800, fontSize:'0.75rem', textTransform:'uppercase', display:'block', marginBottom:6 }}>Date *</label>
                    <input type="date" value={newR.date} onChange={e => setNewR({...newR,date:e.target.value})} style={nbInput} />
                  </div>
                </div>
                <button onClick={addReminder} disabled={!newR.title||!newR.time||!newR.date}
                  style={{ background:NB.black, color:NB.yellow, border:`3px solid ${NB.black}`, boxShadow:`4px 4px 0 #555`, padding:'12px', fontWeight:800, textTransform:'uppercase', cursor:'pointer', borderRadius:0, display:'flex', alignItems:'center', justifyContent:'center', gap:8, opacity:(!newR.title||!newR.time||!newR.date)?0.5:1 }}>
                  <Save size={16} /> Save Reminder
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Personalized Alerts */}
        <div style={nbCard(NB.white)}>
          {sectionHeader('Personalized Alerts', <Heart size={16} color={NB.yellow} />)}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
            {alerts.map(a => {
              const icons: Record<string,any> = { Droplet, Activity, Heart, Bell };
              const Icon = icons[a.iconType] || Bell;
              return (
                <div key={a.id} style={{ background:a.bg, border:`3px solid ${NB.black}`, padding:16, opacity:a.enabled?1:0.5 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:8 }}>
                    <div style={{ width:32, height:32, background:NB.black, display:'flex', alignItems:'center', justifyContent:'center' }}><Icon size={15} color={NB.yellow} /></div>
                    <h4 style={{ fontWeight:900, fontSize:'0.85rem', margin:0 }}>{a.title}</h4>
                  </div>
                  <p style={{ fontWeight:600, fontSize:'0.78rem', color:'#444', margin:'0 0 8px', lineHeight:1.4 }}>{a.description}</p>
                  <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                    <span style={{ fontWeight:700, fontSize:'0.72rem', color:'#555', display:'flex', alignItems:'center', gap:4 }}><Clock size={12}/>{a.time}</span>
                    <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                      <Toggle checked={a.enabled} onChange={() => setAlerts(p => p.map(x => x.id===a.id?{...x,enabled:!x.enabled}:x))} />
                      <button onClick={() => setAlerts(p => p.filter(x => x.id!==a.id))} style={{ background:'transparent', border:`2px solid ${NB.red}`, width:24, height:24, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:NB.red, borderRadius:0 }}><X size={12}/></button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Milestones */}
        <div style={nbCard(NB.white)}>
          {sectionHeader('Milestone Reminders', <Baby size={16} color={NB.yellow} />)}
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            {milestones.map(m => (
              <div key={m.id} style={{ display:'flex', alignItems:'center', gap:14, padding:'12px 14px', background:m.bg, border:`3px solid ${NB.black}`, opacity:m.enabled?1:0.5 }}>
                <div style={{ width:44, height:44, background:NB.black, color:NB.yellow, display:'flex', alignItems:'center', justifyContent:'center', fontWeight:900, fontSize:'0.9rem', flexShrink:0 }}>W{m.week}</div>
                <div style={{ flex:1 }}>
                  <p style={{ fontWeight:900, margin:0, fontSize:'0.88rem' }}>{m.title}</p>
                  <p style={{ fontWeight:600, fontSize:'0.75rem', color:'#555', margin:0 }}>{m.description}</p>
                </div>
                <Toggle checked={m.enabled} onChange={() => setMilestones(p => p.map(x => x.id===m.id?{...x,enabled:!x.enabled}:x))} />
                <button onClick={() => setMilestones(p => p.filter(x => x.id!==m.id))} style={{ background:'transparent', border:`2px solid ${NB.red}`, width:28, height:28, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:NB.red, borderRadius:0 }}><X size={14}/></button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}