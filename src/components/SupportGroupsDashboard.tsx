import React, { useState } from 'react';
import { ArrowLeft, Search, Plus, Users, Heart, Baby, AlertCircle, Activity, Smile, Briefcase, User, MessageCircle } from 'lucide-react';
import { SupportGroupChat } from './SupportGroupChat';
import { CreateSupportGroup, NewGroupData } from './CreateSupportGroup';

const NB = { black: '#0A0A0A', yellow: '#FEF300', white: '#fff', bg: '#FFFBF0', red: '#FF3D3D', blue: '#00C2FF', green: '#00E676', pink: '#FFD6EC' };

interface SupportGroup {
  id: string; name: string; description: string; category: string;
  members: number; icon: React.ReactNode; bg: string;
}

const getCategoryBg = (cat: string) => {
  const map: Record<string,string> = {
    Pregnancy: NB.pink, Medical: '#FFD6D6', Postpartum: '#E8D6FF',
    Parenting: NB.green, Wellness: NB.blue, Support: '#F5F5F0', Lifestyle: '#FFD580',
  };
  return map[cat] || '#F5F5F0';
};

const getCategoryIcon = (cat: string) => {
  const map: Record<string,React.ReactNode> = {
    Pregnancy: <Baby size={18}/>, Medical: <AlertCircle size={18}/>,
    Postpartum: <Activity size={18}/>, Parenting: <Baby size={18}/>,
    Wellness: <Smile size={18}/>, Support: <Heart size={18}/>, Lifestyle: <Briefcase size={18}/>,
  };
  return map[cat] || <Users size={18}/>;
};

const defaultGroups: SupportGroup[] = [
  { id:'first-time-moms',      name:'First-Time Moms',            description:'A welcoming space for first-time mothers to share experiences and support each other.', category:'Pregnancy',  members:0, icon:<Baby size={18}/>,         bg: NB.pink    },
  { id:'expecting-mothers',    name:'Expecting Mothers',          description:'Connect with other expecting mothers through every trimester.',                         category:'Pregnancy',  members:0, icon:<Heart size={18}/>,        bg: NB.pink    },
  { id:'high-risk-pregnancy',  name:'High-Risk Pregnancy',        description:'Support for mothers navigating pregnancies with medical complications.',                 category:'Medical',    members:0, icon:<AlertCircle size={18}/>,  bg: '#FFD6D6'  },
  { id:'postpartum-recovery',  name:'Postpartum Recovery',        description:'Share your postpartum journey and healing tips.',                                        category:'Postpartum', members:0, icon:<Activity size={18}/>,     bg: '#E8D6FF'  },
  { id:'breastfeeding',        name:'Breastfeeding Support',      description:'Get advice and tips from experienced mothers.',                                          category:'Parenting',  members:0, icon:<Heart size={18}/>,        bg: NB.green   },
  { id:'mental-wellness',      name:'Mental & Emotional Wellness', description:'A safe space to discuss mental health and emotional well-being.',                       category:'Wellness',   members:0, icon:<Smile size={18}/>,        bg: NB.blue    },
  { id:'parenting-newborns',   name:'Parenting Newborns',         description:'Tips and support for caring for your newborn.',                                          category:'Parenting',  members:0, icon:<Baby size={18}/>,         bg: NB.green   },
  { id:'working-moms',         name:'Working Moms',               description:'Balance work and motherhood with support from fellow working mothers.',                  category:'Lifestyle',  members:0, icon:<Briefcase size={18}/>,    bg: '#FFD580'  },
  { id:'single-mothers',       name:'Single Mothers Support',     description:'Empowering single mothers with community support and resources.',                        category:'Support',    members:0, icon:<User size={18}/>,         bg: '#F5F5F0'  },
  { id:'twins-multiples',      name:'Twins & Multiples',          description:'Special support for parents of twins, triplets, and other multiples.',                   category:'Pregnancy',  members:0, icon:<Users size={18}/>,        bg: NB.pink    },
  { id:'pregnancy-fitness',    name:'Pregnancy Fitness',          description:'Stay active during pregnancy with workout tips and yoga.',                               category:'Wellness',   members:0, icon:<Activity size={18}/>,     bg: NB.blue    },
];

const categories = ['All','Pregnancy','Medical','Postpartum','Parenting','Wellness','Support','Lifestyle'];

interface SupportGroupsDashboardProps { onBack: () => void; }

export function SupportGroupsDashboard({ onBack }: SupportGroupsDashboardProps) {
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('All');
  const [selectedGroup, setSelectedGroup] = useState<SupportGroup|null>(null);
  const [joined, setJoined] = useState<Set<string>>(new Set());
  const [showCreate, setShowCreate] = useState(false);
  const [groups, setGroups] = useState<SupportGroup[]>(defaultGroups);

  const handleJoin = (g: SupportGroup) => { setJoined(p => new Set([...p, g.id])); setSelectedGroup(g); };
  const handleCreate = (d: NewGroupData) => {
    setGroups(prev => [{ id:`custom-${Date.now()}`, name:d.name, description:d.description, category:d.category, members:0, icon:getCategoryIcon(d.category), bg:getCategoryBg(d.category) }, ...prev]);
    setShowCreate(false);
  };

  const filtered = groups.filter(g => {
    const ms = g.name.toLowerCase().includes(search.toLowerCase()) || g.description.toLowerCase().includes(search.toLowerCase());
    const mc = selectedCat === 'All' || g.category === selectedCat;
    return ms && mc;
  });

  if (selectedGroup) return <SupportGroupChat group={selectedGroup} onBack={() => setSelectedGroup(null)} isJoined={joined.has(selectedGroup.id)} />;
  if (showCreate) return <CreateSupportGroup onBack={() => setShowCreate(false)} onCreateGroup={handleCreate} />;

  return (
    <div style={{ background:NB.bg, minHeight:'100vh', padding:'24px 24px 40px', fontFamily:"'Space Grotesk','Inter',sans-serif" }}>
      <div style={{ maxWidth:1000, margin:'0 auto' }}>

        {/* Header */}
        <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:24, gap:12, flexWrap:'wrap' }}>
          <div>
            <button onClick={onBack} style={{ background:NB.yellow, border:`3px solid ${NB.black}`, boxShadow:`3px 3px 0 ${NB.black}`, padding:'6px 14px', fontWeight:800, fontSize:'0.75rem', textTransform:'uppercase', cursor:'pointer', display:'flex', alignItems:'center', gap:6, marginBottom:10, borderRadius:0 }}>
              <ArrowLeft size={14} /> Back
            </button>
            <div style={{ display:'inline-block', background:NB.pink, border:`3px solid ${NB.black}`, boxShadow:`3px 3px 0 ${NB.black}`, padding:'2px 14px', marginBottom:6 }}>
              <span style={{ fontWeight:900, fontSize:'0.7rem', textTransform:'uppercase', letterSpacing:'0.1em' }}>Community</span>
            </div>
            <h1 style={{ fontSize:'2rem', fontWeight:900, margin:0 }}>Support Groups</h1>
            <p style={{ fontWeight:600, color:'#555', margin:'4px 0 0', fontSize:'0.9rem' }}>Connect with mothers who understand your journey</p>
          </div>
          <button onClick={() => setShowCreate(true)} style={{ background:NB.black, color:NB.yellow, border:`3px solid ${NB.black}`, boxShadow:`4px 4px 0 ${NB.yellow}`, padding:'12px 20px', fontWeight:800, fontSize:'0.82rem', textTransform:'uppercase', cursor:'pointer', borderRadius:0, display:'flex', alignItems:'center', gap:8, alignSelf:'flex-end' }}>
            <Plus size={16} /> Create Group
          </button>
        </div>

        {/* Search */}
        <div style={{ position:'relative', marginBottom:16 }}>
          <Search size={18} style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', color:'#555' }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search groups…"
            style={{ width:'100%', padding:'12px 14px 12px 42px', border:`3px solid ${NB.black}`, boxShadow:`3px 3px 0 ${NB.black}`, borderRadius:0, fontWeight:600, fontSize:'0.9rem', background:NB.white, outline:'none', boxSizing:'border-box' }} />
        </div>

        {/* Category tabs */}
        <div style={{ display:'flex', gap:6, flexWrap:'wrap', marginBottom:24 }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setSelectedCat(cat)} style={{
              background: selectedCat===cat ? NB.black : NB.white,
              color: selectedCat===cat ? NB.yellow : NB.black,
              border:`3px solid ${NB.black}`, boxShadow: selectedCat===cat ? `3px 3px 0 ${NB.yellow}` : `3px 3px 0 ${NB.black}`,
              padding:'6px 14px', fontWeight:800, fontSize:'0.73rem', textTransform:'uppercase', cursor:'pointer', borderRadius:0, transition:'all 0.1s',
            }}>{cat}</button>
          ))}
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))', gap:16 }}>
            {filtered.map(g => (
              <div key={g.id} style={{ background:NB.white, border:`3px solid ${NB.black}`, boxShadow:`5px 5px 0 ${NB.black}`, borderRadius:0, overflow:'hidden', transition:'transform 0.1s, box-shadow 0.1s' }}
                onMouseEnter={e => { const el=e.currentTarget as HTMLElement; el.style.transform='translate(-2px,-2px)'; el.style.boxShadow=`7px 7px 0 ${NB.black}`; }}
                onMouseLeave={e => { const el=e.currentTarget as HTMLElement; el.style.transform='translate(0,0)'; el.style.boxShadow=`5px 5px 0 ${NB.black}`; }}>
                {/* Color bar */}
                <div style={{ background:g.bg, borderBottom:`3px solid ${NB.black}`, padding:'14px 16px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                    <div style={{ width:36, height:36, background:NB.black, color:NB.yellow, display:'flex', alignItems:'center', justifyContent:'center', border:`2px solid ${NB.black}` }}>
                      {g.icon}
                    </div>
                    <span style={{ fontWeight:900, fontSize:'0.72rem', textTransform:'uppercase', letterSpacing:'0.05em' }}>{g.category}</span>
                  </div>
                  <span style={{ background:NB.black, color:NB.white, border:`2px solid ${NB.black}`, padding:'2px 8px', fontWeight:700, fontSize:'0.68rem', textTransform:'uppercase' }}>
                    {g.members} Members
                  </span>
                </div>
                <div style={{ padding:'16px' }}>
                  <h3 style={{ fontWeight:900, fontSize:'1rem', margin:'0 0 6px' }}>{g.name}</h3>
                  <p style={{ fontWeight:600, fontSize:'0.82rem', color:'#555', margin:'0 0 14px', lineHeight:1.4 }}>{g.description}</p>
                  {joined.has(g.id) ? (
                    <button onClick={() => setSelectedGroup(g)} style={{ width:'100%', background:NB.black, color:NB.yellow, border:`3px solid ${NB.black}`, boxShadow:`3px 3px 0 ${NB.yellow}`, padding:'10px', fontWeight:800, fontSize:'0.8rem', textTransform:'uppercase', cursor:'pointer', borderRadius:0, display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
                      <MessageCircle size={16} /> Open Group
                    </button>
                  ) : (
                    <button onClick={() => handleJoin(g)} style={{ width:'100%', background:NB.white, color:NB.black, border:`3px solid ${NB.black}`, boxShadow:`3px 3px 0 ${NB.black}`, padding:'10px', fontWeight:800, fontSize:'0.8rem', textTransform:'uppercase', cursor:'pointer', borderRadius:0, display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
                      <Plus size={16} /> Join Group
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ border:`3px dashed ${NB.black}`, padding:40, textAlign:'center', fontWeight:700, color:'#777' }}>
            <Search size={40} style={{ margin:'0 auto 12px', opacity:0.3 }} />
            <p>No groups found. Try adjusting your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}