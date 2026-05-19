import { useState, useRef } from 'react';
import { Camera, User, Bell, Lock, Palette, Globe, HelpCircle, LogOut, ChevronRight, Save, Check } from 'lucide-react';

const NB = { black:'#0A0A0A', yellow:'#FEF300', white:'#fff', bg:'#FFFBF0', red:'#FF3D3D', blue:'#00C2FF', green:'#00E676', pink:'#FFD6EC' };

const nbInput: React.CSSProperties = { width:'100%', border:`3px solid ${NB.black}`, borderRadius:0, padding:'10px 14px', fontWeight:600, fontSize:'0.9rem', background:NB.white, boxSizing:'border-box', outline:'none', boxShadow:`3px 3px 0 ${NB.black}` };
const nbCard = (bg=NB.white): React.CSSProperties => ({ background:bg, border:`3px solid ${NB.black}`, boxShadow:`5px 5px 0 ${NB.black}`, borderRadius:0, padding:24, marginBottom:20 });

interface SettingsScreenProps { onBack?: () => void; }

const themes = [
  { name:'Classic Yellow', primary:'#FEF300', bg:'#FFFBF0' },
  { name:'Ocean Blue',     primary:'#00C2FF', bg:'#F0FBFF' },
  { name:'Rose Pink',      primary:'#FF4FA3', bg:'#FFF0F8' },
  { name:'Mint Green',     primary:'#00E676', bg:'#F0FFF7' },
  { name:'Coral Orange',   primary:'#FF6B6B', bg:'#FFF5F5' },
  { name:'Lavender',       primary:'#B44FFF', bg:'#F8F0FF' },
];

const languages = ['English','हिंदी (Hindi)','বাংলা (Bengali)','తెలుగు (Telugu)','मराठी (Marathi)','Tamil (தமிழ்)'];

export function SettingsScreen({ onBack }: SettingsScreenProps) {
  const [profilePic, setProfilePic] = useState<string|null>(null);
  const [name, setName] = useState('Jyoti Sharma');
  const [email, setEmail] = useState('jyoti@example.com');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [savedProfile, setSavedProfile] = useState(false);

  const [selectedTheme, setSelectedTheme] = useState(0);
  const [language, setLanguage] = useState('English');
  const [notif, setNotif] = useState({ reminders:true, appointments:true, milestones:true, health:false });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePicUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = ev => setProfilePic(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const Toggle = ({ checked, onChange }: { checked:boolean; onChange:()=>void }) => (
    <button onClick={onChange} style={{ width:48, height:26, background:checked?NB.black:NB.bg, border:`3px solid ${NB.black}`, borderRadius:0, cursor:'pointer', position:'relative', transition:'background 0.2s', flexShrink:0 }}>
      <div style={{ position:'absolute', top:3, left:checked?22:3, width:14, height:14, background:checked?NB.yellow:NB.black, transition:'left 0.2s' }} />
    </button>
  );

  const SettingRow = ({ icon:Icon, label, value, danger=false, onClick }: any) => (
    <button onClick={onClick} style={{ width:'100%', display:'flex', alignItems:'center', gap:14, padding:'14px 0', borderBottom:`2px solid #eee`, background:'transparent', border_bottom:`2px solid #eee`, cursor:'pointer', textAlign:'left' as const }}
      onMouseEnter={e => (e.currentTarget as HTMLElement).style.background='#F5F5F0'}
      onMouseLeave={e => (e.currentTarget as HTMLElement).style.background='transparent'}
    >
      <div style={{ width:38, height:38, background:danger?NB.red:NB.black, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
        <Icon size={18} color={danger?NB.white:NB.yellow} />
      </div>
      <div style={{ flex:1 }}>
        <p style={{ fontWeight:800, fontSize:'0.88rem', textTransform:'uppercase' as const, margin:0, color:danger?NB.red:NB.black }}>{label}</p>
        {value && <p style={{ fontWeight:600, fontSize:'0.75rem', color:'#666', margin:0 }}>{value}</p>}
      </div>
      <ChevronRight size={16} color={danger?NB.red:'#888'} />
    </button>
  );

  return (
    <div style={{ background:NB.bg, minHeight:'100vh', padding:'24px 24px 40px', fontFamily:"'Space Grotesk','Inter',sans-serif" }}>
      <div style={{ maxWidth:860, margin:'0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom:24 }}>
          <div style={{ display:'inline-block', background:NB.blue, border:`3px solid ${NB.black}`, boxShadow:`3px 3px 0 ${NB.black}`, padding:'3px 14px', marginBottom:8 }}>
            <span style={{ fontWeight:900, fontSize:'0.72rem', textTransform:'uppercase', letterSpacing:'0.1em' }}>Settings</span>
          </div>
          <h1 style={{ fontSize:'2.2rem', fontWeight:900, color:NB.black, margin:0 }}>⚙️ App Settings</h1>
        </div>

        {/* Profile Picture */}
        <div style={{ ...nbCard(NB.black), display:'flex', alignItems:'center', gap:24, flexWrap:'wrap' }}>
          <div style={{ position:'relative', flexShrink:0 }}>
            <div style={{ width:96, height:96, background:profilePic?'transparent':NB.yellow, border:`4px solid ${NB.yellow}`, overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'2.5rem', fontWeight:900, color:NB.black }}>
              {profilePic ? <img src={profilePic} alt="profile" style={{ width:'100%', height:'100%', objectFit:'cover' }} /> : name.charAt(0)}
            </div>
            <button onClick={() => fileInputRef.current?.click()} style={{ position:'absolute', bottom:-4, right:-4, width:32, height:32, background:NB.yellow, border:`3px solid ${NB.black}`, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
              <Camera size={16} />
            </button>
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handlePicUpload} style={{ display:'none' }} />
          </div>
          <div style={{ flex:1 }}>
            <h2 style={{ fontWeight:900, fontSize:'1.3rem', color:NB.yellow, margin:'0 0 4px' }}>{name}</h2>
            <p style={{ fontWeight:600, color:'#aaa', margin:'0 0 12px', fontSize:'0.85rem' }}>{email}</p>
            <button onClick={() => fileInputRef.current?.click()} style={{ background:NB.yellow, color:NB.black, border:`3px solid ${NB.yellow}`, padding:'8px 18px', fontWeight:800, fontSize:'0.78rem', textTransform:'uppercase', cursor:'pointer', borderRadius:0, display:'flex', alignItems:'center', gap:6 }}>
              <Camera size={14} /> Change Photo
            </button>
          </div>
        </div>

        {/* Profile Info */}
        <div style={nbCard(NB.white)}>
          <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:16, borderBottom:`3px solid ${NB.black}`, paddingBottom:8 }}>
            <div style={{ width:32, height:32, background:NB.black, display:'flex', alignItems:'center', justifyContent:'center' }}><User size={16} color={NB.yellow} /></div>
            <h3 style={{ fontWeight:900, fontSize:'0.95rem', textTransform:'uppercase', margin:0 }}>Profile Information</h3>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginBottom:16 }}>
            <div>
              <label style={{ fontWeight:800, fontSize:'0.75rem', textTransform:'uppercase', display:'block', marginBottom:6 }}>Full Name</label>
              <input value={name} onChange={e => setName(e.target.value)} style={nbInput} />
            </div>
            <div>
              <label style={{ fontWeight:800, fontSize:'0.75rem', textTransform:'uppercase', display:'block', marginBottom:6 }}>Phone</label>
              <input value={phone} onChange={e => setPhone(e.target.value)} style={nbInput} />
            </div>
            <div style={{ gridColumn:'1/-1' }}>
              <label style={{ fontWeight:800, fontSize:'0.75rem', textTransform:'uppercase', display:'block', marginBottom:6 }}>Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} style={nbInput} />
            </div>
          </div>
          <button onClick={() => { setSavedProfile(true); setTimeout(()=>setSavedProfile(false),2000); }}
            style={{ background:savedProfile?NB.green:NB.black, color:savedProfile?NB.black:NB.yellow, border:`3px solid ${NB.black}`, boxShadow:`4px 4px 0 #555`, padding:'12px 24px', fontWeight:800, fontSize:'0.85rem', textTransform:'uppercase', cursor:'pointer', borderRadius:0, display:'flex', alignItems:'center', gap:8, transition:'background 0.2s' }}>
            {savedProfile ? <><Check size={16}/> Saved!</> : <><Save size={16}/> Save Changes</>}
          </button>
        </div>

        {/* Theme Picker */}
        <div style={nbCard(NB.white)}>
          <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:16, borderBottom:`3px solid ${NB.black}`, paddingBottom:8 }}>
            <div style={{ width:32, height:32, background:NB.black, display:'flex', alignItems:'center', justifyContent:'center' }}><Palette size={16} color={NB.yellow} /></div>
            <h3 style={{ fontWeight:900, fontSize:'0.95rem', textTransform:'uppercase', margin:0 }}>Theme Color</h3>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12 }}>
            {themes.map((t,i) => (
              <button key={t.name} onClick={() => setSelectedTheme(i)} style={{
                background: t.bg, border:`3px solid ${selectedTheme===i?NB.black:'#ddd'}`,
                boxShadow: selectedTheme===i?`4px 4px 0 ${NB.black}`:'none',
                padding:'14px 10px', cursor:'pointer', borderRadius:0, textAlign:'center',
                transition:'all 0.1s', position:'relative',
              }}>
                <div style={{ width:36, height:36, background:t.primary, border:`3px solid ${NB.black}`, margin:'0 auto 8px' }} />
                <p style={{ fontWeight:800, fontSize:'0.72rem', textTransform:'uppercase', margin:0 }}>{t.name}</p>
                {selectedTheme===i && (
                  <div style={{ position:'absolute', top:-8, right:-8, width:22, height:22, background:NB.black, color:NB.yellow, display:'flex', alignItems:'center', justifyContent:'center', border:`2px solid ${NB.black}` }}>
                    <Check size={12} />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div style={nbCard(NB.white)}>
          <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:16, borderBottom:`3px solid ${NB.black}`, paddingBottom:8 }}>
            <div style={{ width:32, height:32, background:NB.black, display:'flex', alignItems:'center', justifyContent:'center' }}><Bell size={16} color={NB.yellow} /></div>
            <h3 style={{ fontWeight:900, fontSize:'0.95rem', textTransform:'uppercase', margin:0 }}>Notifications</h3>
          </div>
          {[
            { key:'reminders',    label:'Medication Reminders',   desc:'Daily vitamin and supplement alerts'   },
            { key:'appointments', label:'Appointment Alerts',      desc:'Doctor visits and checkups'            },
            { key:'milestones',   label:'Pregnancy Milestones',    desc:'Weekly updates on baby development'    },
            { key:'health',       label:'Health Tips',             desc:'Daily wellness advice and tips'        },
          ].map(n => (
            <div key={n.key} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 0', borderBottom:'2px solid #eee' }}>
              <div>
                <p style={{ fontWeight:800, fontSize:'0.85rem', margin:'0 0 2px' }}>{n.label}</p>
                <p style={{ fontWeight:600, fontSize:'0.75rem', color:'#666', margin:0 }}>{n.desc}</p>
              </div>
              <Toggle checked={notif[n.key as keyof typeof notif]} onChange={() => setNotif(p => ({...p, [n.key]:!p[n.key as keyof typeof notif]}))} />
            </div>
          ))}
        </div>

        {/* Language */}
        <div style={nbCard(NB.white)}>
          <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:16, borderBottom:`3px solid ${NB.black}`, paddingBottom:8 }}>
            <div style={{ width:32, height:32, background:NB.black, display:'flex', alignItems:'center', justifyContent:'center' }}><Globe size={16} color={NB.yellow} /></div>
            <h3 style={{ fontWeight:900, fontSize:'0.95rem', textTransform:'uppercase', margin:0 }}>Language</h3>
          </div>
          <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
            {languages.map(l => (
              <button key={l} onClick={() => setLanguage(l)} style={{
                background: language===l?NB.black:NB.white, color: language===l?NB.yellow:NB.black,
                border:`3px solid ${NB.black}`, boxShadow: language===l?`3px 3px 0 ${NB.yellow}`:`3px 3px 0 ${NB.black}`,
                padding:'8px 14px', fontWeight:800, fontSize:'0.78rem', cursor:'pointer', borderRadius:0,
              }}>{l}</button>
            ))}
          </div>
        </div>

        {/* Account Actions */}
        <div style={nbCard(NB.white)}>
          <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:8, borderBottom:`3px solid ${NB.black}`, paddingBottom:8 }}>
            <div style={{ width:32, height:32, background:NB.black, display:'flex', alignItems:'center', justifyContent:'center' }}><Lock size={16} color={NB.yellow} /></div>
            <h3 style={{ fontWeight:900, fontSize:'0.95rem', textTransform:'uppercase', margin:0 }}>Account</h3>
          </div>
          <div style={{ padding:'8px 0' }}>
            <SettingRow icon={Lock}       label="Change Password"  value="Last changed 30 days ago" />
            <SettingRow icon={HelpCircle} label="Help & Support"   value="FAQs, contact us" />
            <SettingRow icon={LogOut}     label="Sign Out"         danger />
          </div>
        </div>

        <div style={{ textAlign:'center', fontWeight:700, color:'#999', fontSize:'0.8rem' }}>
          MOMIQ v1.0.0 · Made with ♥ for expecting mothers
        </div>
      </div>
    </div>
  );
}
