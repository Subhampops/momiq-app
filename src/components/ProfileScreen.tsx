import { useState } from 'react';
import {
  User, Mail, Phone, Calendar, Baby, Heart, Bell, Lock,
  ChevronRight, Edit2, Save, X, LogOut, Settings, HelpCircle, Shield,
} from 'lucide-react';

const NB = { black: '#0A0A0A', yellow: '#FEF300', white: '#fff', bg: '#FFFBF0', red: '#FF3D3D', blue: '#00C2FF', green: '#00E676', pink: '#FFD6EC' };

const nbInput: React.CSSProperties = {
  width: '100%', border: `3px solid ${NB.black}`, borderRadius: 0, padding: '10px 14px',
  fontWeight: 600, fontSize: '0.95rem', background: NB.white, boxSizing: 'border-box',
  outline: 'none', boxShadow: `3px 3px 0 ${NB.black}`,
};

interface ProfileScreenProps { userName?: string; userEmail?: string; }

export function ProfileScreen({ userName = 'Jyoti Sharma', userEmail = 'jyoti@example.com' }: ProfileScreenProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [data, setData] = useState({
    name: userName, email: userEmail, phone: '+91 98765 43210',
    dob: '1992-05-15', bloodGroup: 'O+', lmp: '2024-08-01',
    due: '2025-05-08', weight: '148 lbs', height: "5'5\"", emergency: '+91 98765 43211',
  });

  const Field = ({ label, field, type = 'text' }: { label: string; field: keyof typeof data; type?: string }) => (
    <div>
      <label style={{ fontWeight: 800, fontSize: '0.72rem', textTransform: 'uppercase', display: 'block', marginBottom: 6, letterSpacing: '0.05em' }}>{label}</label>
      {isEditing
        ? <input type={type} value={data[field]} onChange={e => setData(d => ({ ...d, [field]: e.target.value }))} style={nbInput} />
        : <p style={{ fontWeight: 700, padding: '10px 14px', background: NB.bg, border: `2px solid #ddd`, margin: 0 }}>
            {type === 'date' ? new Date(data[field]).toLocaleDateString() : data[field]}
          </p>
      }
    </div>
  );

  const MenuRow = ({ icon: Icon, label, color, danger = false }: any) => (
    <button style={{
      width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '14px 20px', border: `3px solid ${NB.black}`, background: NB.white,
      boxShadow: `4px 4px 0 ${NB.black}`, cursor: 'pointer', marginBottom: 10, borderRadius: 0,
      transition: 'transform 0.1s, box-shadow 0.1s',
    }}
      onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translate(-2px,-2px)'; el.style.background = danger ? NB.red : NB.yellow; el.style.color = danger ? NB.white : NB.black; }}
      onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translate(0,0)'; el.style.background = NB.white; el.style.color = NB.black; }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ width: 36, height: 36, background: color, border: `2px solid ${NB.black}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon size={18} />
        </div>
        <span style={{ fontWeight: 800, fontSize: '0.9rem', textTransform: 'uppercase', color: danger ? NB.red : NB.black }}>{label}</span>
      </div>
      <ChevronRight size={18} />
    </button>
  );

  return (
    <div style={{ background: NB.bg, minHeight: '100vh', padding: '24px 24px 40px', fontFamily: "'Space Grotesk','Inter',sans-serif" }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: 'inline-block', background: NB.yellow, border: `3px solid ${NB.black}`, boxShadow: `3px 3px 0 ${NB.black}`, padding: '3px 14px', marginBottom: 8 }}>
            <span style={{ fontWeight: 900, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Profile</span>
          </div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 900, color: NB.black, margin: 0 }}>My Account</h1>
        </div>

        {/* Profile Hero */}
        <div style={{ background: NB.black, border: `3px solid ${NB.black}`, boxShadow: `6px 6px 0 ${NB.yellow}`, padding: 28, marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
            {/* Avatar */}
            <div style={{ position: 'relative' }}>
              <div style={{ width: 80, height: 80, background: NB.yellow, border: `3px solid ${NB.yellow}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '2.2rem', color: NB.black }}>
                {data.name.charAt(0)}
              </div>
              <button style={{ position: 'absolute', bottom: -4, right: -4, width: 28, height: 28, background: NB.white, border: `2px solid ${NB.black}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <Edit2 size={14} />
              </button>
            </div>
            {/* Info */}
            <div style={{ flex: 1 }}>
              <h2 style={{ fontWeight: 900, fontSize: '1.4rem', color: NB.yellow, margin: '0 0 4px' }}>{data.name}</h2>
              <p style={{ fontWeight: 600, color: '#aaa', margin: '0 0 10px', fontSize: '0.9rem' }}>{data.email}</p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {[['WEEK 14', NB.yellow], ['2ND TRIM.', NB.blue], [data.bloodGroup, NB.green]].map(([label, bg]) => (
                  <span key={label} style={{ background: bg as string, color: NB.black, border: `2px solid ${bg}`, padding: '2px 10px', fontWeight: 800, fontSize: '0.72rem', textTransform: 'uppercase' }}>{label}</span>
                ))}
              </div>
            </div>
            {/* Edit buttons */}
            <div style={{ display: 'flex', gap: 8 }}>
              {!isEditing
                ? <button onClick={() => setIsEditing(true)} style={{ background: NB.yellow, color: NB.black, border: `3px solid ${NB.yellow}`, boxShadow: `3px 3px 0 ${NB.yellow}`, padding: '8px 16px', fontWeight: 800, fontSize: '0.8rem', textTransform: 'uppercase', cursor: 'pointer' }}>
                    <Edit2 size={14} style={{ display: 'inline', marginRight: 6 }} />Edit
                  </button>
                : <>
                    <button onClick={() => setIsEditing(false)} style={{ background: NB.green, color: NB.black, border: `3px solid ${NB.green}`, padding: '8px 14px', fontWeight: 800, fontSize: '0.8rem', cursor: 'pointer' }}>
                      <Save size={14} style={{ display: 'inline', marginRight: 6 }} />Save
                    </button>
                    <button onClick={() => setIsEditing(false)} style={{ background: NB.red, color: NB.white, border: `3px solid ${NB.red}`, padding: '8px 12px', fontWeight: 800, cursor: 'pointer' }}>
                      <X size={14} />
                    </button>
                  </>
              }
            </div>
          </div>
        </div>

        {/* Personal Info */}
        <div style={{ background: NB.white, border: `3px solid ${NB.black}`, boxShadow: `5px 5px 0 ${NB.black}`, padding: 24, marginBottom: 20 }}>
          <h3 style={{ fontWeight: 900, fontSize: '1rem', textTransform: 'uppercase', margin: '0 0 16px', borderBottom: `3px solid ${NB.black}`, paddingBottom: 8 }}>Personal Information</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <Field label="Full Name"    field="name"  />
            <Field label="Phone"        field="phone" />
            <Field label="Email"        field="email" type="email" />
            <Field label="Date of Birth" field="dob"  type="date" />
          </div>
        </div>

        {/* Pregnancy Info */}
        <div style={{ background: NB.pink, border: `3px solid ${NB.black}`, boxShadow: `5px 5px 0 ${NB.black}`, padding: 24, marginBottom: 20 }}>
          <h3 style={{ fontWeight: 900, fontSize: '1rem', textTransform: 'uppercase', margin: '0 0 16px', borderBottom: `3px solid ${NB.black}`, paddingBottom: 8 }}>Pregnancy Info</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <Field label="Last Period (LMP)" field="lmp" type="date" />
            <Field label="Due Date"          field="due" type="date" />
            <Field label="Current Weight"    field="weight" />
            <Field label="Height"            field="height" />
          </div>
        </div>

        {/* Emergency */}
        <div style={{ background: NB.yellow, border: `3px solid ${NB.black}`, boxShadow: `5px 5px 0 ${NB.black}`, padding: 24, marginBottom: 20 }}>
          <h3 style={{ fontWeight: 900, fontSize: '1rem', textTransform: 'uppercase', margin: '0 0 16px', borderBottom: `3px solid ${NB.black}`, paddingBottom: 8 }}>Emergency Contact</h3>
          <Field label="Emergency Phone" field="emergency" />
        </div>

        {/* Menu */}
        <div>
          <MenuRow icon={Bell}       label="Notifications"    color="#FFD6EC" />
          <MenuRow icon={Lock}       label="Privacy & Security" color="#00C2FF" />
          <MenuRow icon={Settings}   label="App Settings"     color="#00E676" />
          <MenuRow icon={HelpCircle} label="Help & Support"   color="#FEF300" />
          <MenuRow icon={LogOut}     label="Log Out"          color="#FFD6D6" danger />
        </div>

        <div style={{ textAlign: 'center', marginTop: 24, fontWeight: 700, color: '#999', fontSize: '0.8rem' }}>
          <p>MOMIQ v1.0.0 · © 2024 MOMIQ</p>
        </div>
      </div>
    </div>
  );
}
