import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, MessageCircle, Send, Sparkles, AlertCircle, Home as HomeIcon, Thermometer, Wind, Droplet, Baby, Milk, Check, Bot, Loader } from 'lucide-react';

const P = { black:'#0A0A0A', pink:'#FF4FA3', pinkL:'#FFD6EC', pinkP:'#FFF0F7', pinkD:'#C0005A', red:'#FF3D3D', green:'#00E676', blue:'#00C2FF', white:'#fff' };

interface AIDoctorChatProps { onBack?: () => void; }
type Screen = 'home' | 'chat' | 'summary';
interface Msg { id: number; text: string; sender: 'ai' | 'user'; timestamp: Date; }
interface Summary { symptoms: string[]; homeCare: string[]; monitor: string[]; visitDoctor: string[]; }

const quickSymptoms = [
  { name:'Fever',    icon: Thermometer, bg: '#FFD6D6' },
  { name:'Cough',    icon: Wind,        bg: '#E0F0FF' },
  { name:'Vomiting', icon: Droplet,     bg: '#FFE0F5' },
  { name:'Crying',   icon: Baby,        bg: P.pinkL   },
  { name:'Feeding',  icon: Milk,        bg: '#FFF0D6' },
  { name:'Rash',     icon: AlertCircle, bg: '#FFECD6' },
];

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const OPENAI_URL = `https://api.openai.com/v1/chat/completions`;

async function callOpenAI(prompt: string): Promise<string> {
  if (!OPENAI_API_KEY || OPENAI_API_KEY === 'your_openai_api_key_here') {
    // Fallback responses when no API key
    if (prompt.toLowerCase().includes('fever')) return "A fever above 100.4°F in a baby under 3 months needs immediate medical attention. Keep baby hydrated and monitor temperature every 30 minutes.";
    if (prompt.toLowerCase().includes('cough')) return "Mild coughs are common. Keep the air humidified, ensure good hydration. See a doctor if cough persists over 1 week or baby has breathing difficulties.";
    if (prompt.toLowerCase().includes('vomiting')) return "Make sure baby stays hydrated with small frequent feeds. Watch for dehydration signs. Seek care if vomiting persists more than 24 hours.";
    return "Based on what you've described, I recommend monitoring your baby closely. If symptoms worsen or you have any concerns, please consult your healthcare provider immediately. Trust your parental instincts!";
  }
  try {
    const systemPrompt = `You are a compassionate AI health assistant for pregnant women and new mothers. 
    Provide helpful, accurate health guidance while always emphasizing the importance of professional medical consultation.
    Keep responses concise (2-3 paragraphs max), warm, and supportive.
    Always end with a note to consult a doctor for serious concerns.`;

    const response = await fetch(OPENAI_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 512,
      }),
    });
    if (!response.ok) throw new Error('API error');
    const data = await response.json();
    return data.choices?.[0]?.message?.content || "I'm having trouble connecting right now. Please try again or consult your healthcare provider.";
  } catch {
    return "Unable to connect to AI service. Please check your internet connection and try again, or contact your healthcare provider directly.";
  }
}

export function AIDoctorChat({ onBack }: AIDoctorChatProps) {
  const [screen, setScreen] = useState<Screen>('home');
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [summary, setSummary] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [msgs]);

  const toggleSymptom = (s: string) => setSelectedSymptoms(p => p.includes(s) ? p.filter(x => x !== s) : [...p, s]);

  const addMsg = (text: string, sender: 'ai' | 'user') =>
    setMsgs(p => [...p, { id: Date.now() + Math.random(), text, sender, timestamp: new Date() }]);

  const startChat = async () => {
    setScreen('chat');
    const userPrompt = `A mother is concerned about her baby/pregnancy with these symptoms: ${selectedSymptoms.join(', ')}. Please provide helpful guidance.`;
    setTimeout(() => addMsg(`I understand you're concerned about: **${selectedSymptoms.join(', ')}**. Let me help you with that.`, 'ai'), 200);
    setLoading(true);
    try {
      const response = await callOpenAI(userPrompt);
      addMsg(response, 'ai');
    } finally {
      setLoading(false);
    }
  };

  const sendMsg = async (text?: string) => {
    const t = (text || input).trim();
    if (!t || loading) return;
    addMsg(t, 'user');
    setInput('');
    setLoading(true);
    try {
      const context = `Conversation context - Symptoms: ${selectedSymptoms.join(', ')}. User says: ${t}. Respond as a pregnancy/baby health AI assistant.`;
      const response = await callOpenAI(context);
      addMsg(response, 'ai');
    } finally {
      setLoading(false);
    }
  };

  const showSummary = async () => {
    setLoading(true);
    const summaryPrompt = `Based on symptoms: ${selectedSymptoms.join(', ')}, provide a structured care summary with: home care tips, what to monitor, and when to visit a doctor. Keep it concise.`;
    try {
      const aiSummary = await callOpenAI(summaryPrompt);
      setSummary({
        symptoms: selectedSymptoms,
        homeCare: ['Keep baby hydrated with frequent feeds', 'Monitor temperature regularly', 'Ensure adequate rest', 'Use cool-mist humidifier if needed'],
        monitor: ['Temperature every 30 minutes if fever present', 'Number of wet diapers daily', 'Feeding frequency and amount', 'General activity and responsiveness'],
        visitDoctor: ['Fever above 104°F or lasting more than 3 days', 'Difficulty breathing or rapid breathing', 'Signs of severe dehydration', aiSummary.slice(0, 120) + '...'],
      });
    } finally {
      setLoading(false);
    }
    setScreen('summary');
  };

  const newChat = () => { setMsgs([]); setSelectedSymptoms([]); setSummary(null); setScreen('home'); };

  const nbCard = (bg=P.white, shadow=P.black): React.CSSProperties => ({ background:bg, border:`3px solid ${P.black}`, boxShadow:`5px 5px 0 ${shadow}`, borderRadius:0, padding:20, marginBottom:16 });
  const hasKey = OPENAI_API_KEY && OPENAI_API_KEY !== 'your_openai_api_key_here';

  return (
    <div style={{ background:P.pinkP, minHeight:'100vh', fontFamily:"'Space Grotesk','Inter',sans-serif" }}>

      {/* Header */}
      <div style={{ position:'sticky', top:0, zIndex:40, background:P.black, borderBottom:`4px solid ${P.pink}`, padding:'14px 24px', display:'flex', alignItems:'center', gap:14 }}>
        <button onClick={onBack} style={{ background:P.pink, border:`3px solid ${P.pink}`, color:P.white, width:36, height:36, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', borderRadius:0 }}>
          <ArrowLeft size={18} />
        </button>
        <div style={{ width:40, height:40, background:P.pink, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
          <Bot size={22} color={P.white} />
        </div>
        <div style={{ flex:1 }}>
          <h2 style={{ fontWeight:900, fontSize:'1rem', color:P.white, margin:0, textTransform:'uppercase', letterSpacing:'0.05em' }}>AI Health Assistant</h2>
          <p style={{ fontWeight:600, fontSize:'0.72rem', color:P.pinkL, margin:0 }}>
            {hasKey ? '✅ Powered by OpenAI · Always consult a doctor' : '⚠️ Demo mode — Add VITE_OPENAI_API_KEY to .env for live AI'}
          </p>
        </div>
        {screen === 'chat' && (
          <button onClick={showSummary} disabled={loading} style={{ background:P.pinkL, color:P.black, border:`3px solid ${P.pinkL}`, padding:'6px 14px', fontWeight:800, fontSize:'0.75rem', textTransform:'uppercase', cursor:'pointer', borderRadius:0, display:'flex', alignItems:'center', gap:6 }}>
            <Sparkles size={14} /> Summary
          </button>
        )}
      </div>

      <div style={{ maxWidth:840, margin:'0 auto', padding:'24px 20px 40px' }}>

        {/* ── HOME ── */}
        {screen === 'home' && (
          <>
            <div style={{ ...nbCard(P.pink, P.pinkD), textAlign:'center', color:P.white, marginBottom:20 }}>
              <div style={{ fontSize:'3.5rem', marginBottom:8 }}>🩺</div>
              <h2 style={{ fontWeight:900, fontSize:'1.5rem', margin:'0 0 8px' }}>AI Health Assistant</h2>
              <p style={{ fontWeight:600, opacity:0.9, margin:0 }}>OpenAI-powered guidance for your pregnancy & baby's health</p>
            </div>

            <div style={nbCard(P.white)}>
              <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:16, borderBottom:`3px solid ${P.black}`, paddingBottom:8 }}>
                <div style={{ width:32, height:32, background:P.black, display:'flex', alignItems:'center', justifyContent:'center' }}><MessageCircle size={16} color={P.pink} /></div>
                <h3 style={{ fontWeight:900, fontSize:'0.9rem', textTransform:'uppercase', margin:0 }}>Select Symptoms</h3>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(160px, 1fr))', gap:10, marginBottom:16 }}>
                {quickSymptoms.map(s => (
                  <button key={s.name} onClick={() => toggleSymptom(s.name)} style={{
                    background: selectedSymptoms.includes(s.name) ? P.black : s.bg,
                    color: selectedSymptoms.includes(s.name) ? P.pink : P.black,
                    border:`3px solid ${selectedSymptoms.includes(s.name) ? P.pink : P.black}`,
                    boxShadow: selectedSymptoms.includes(s.name) ? `4px 4px 0 ${P.pink}` : `3px 3px 0 ${P.black}`,
                    padding:'12px 10px', fontWeight:800, fontSize:'0.8rem', textTransform:'uppercase', cursor:'pointer', borderRadius:0,
                    display:'flex', alignItems:'center', gap:10, transition:'all 0.1s',
                  }}>
                    <s.icon size={18} />
                    <span>{s.name}</span>
                    {selectedSymptoms.includes(s.name) && <Check size={14} style={{ marginLeft:'auto' }} />}
                  </button>
                ))}
              </div>
              <button onClick={startChat} disabled={selectedSymptoms.length === 0 || loading}
                style={{ width:'100%', background:selectedSymptoms.length>0?P.pink:'#ddd', color:selectedSymptoms.length>0?P.white:'#999', border:`3px solid ${selectedSymptoms.length>0?P.black:'#ccc'}`, boxShadow:selectedSymptoms.length>0?`4px 4px 0 ${P.black}`:'none', padding:'14px', fontWeight:900, fontSize:'0.95rem', textTransform:'uppercase', cursor:selectedSymptoms.length>0?'pointer':'not-allowed', borderRadius:0, display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
                {loading ? <><Loader size={16} style={{ animation:'spin 1s linear infinite' }} /> Connecting to OpenAI…</> : <><MessageCircle size={18} /> Start AI Chat</>}
              </button>
            </div>

            <div style={{ background:P.pinkL, border:`3px solid ${P.black}`, boxShadow:`3px 3px 0 ${P.black}`, padding:'14px 16px', display:'flex', gap:12 }}>
              <AlertCircle size={20} color={P.pinkD} style={{ flexShrink:0, marginTop:2 }} />
              <p style={{ fontWeight:600, fontSize:'0.82rem', color:'#4a0a2a', margin:0, lineHeight:1.5 }}>
                <strong>Important:</strong> AI responses are for general guidance only. For emergencies, contact your healthcare provider immediately.
              </p>
            </div>
          </>
        )}

        {/* ── CHAT ── */}
        {screen === 'chat' && (
          <div style={{ display:'flex', flexDirection:'column', height:'calc(100vh - 180px)' }}>
            <div style={{ flex:1, overflowY:'auto', display:'flex', flexDirection:'column', gap:12, paddingBottom:8 }}>
              {msgs.map(m => (
                <div key={m.id} style={{ display:'flex', justifyContent:m.sender==='user'?'flex-end':'flex-start' }}>
                  {m.sender==='ai' && <div style={{ width:32, height:32, background:P.pink, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginRight:8, alignSelf:'flex-end' }}><Bot size={16} color={P.white} /></div>}
                  <div style={{ maxWidth:'72%', padding:'12px 16px', background:m.sender==='user'?P.pink:P.white, color:m.sender==='user'?P.white:P.black, border:`3px solid ${P.black}`, boxShadow:m.sender==='user'?`4px 4px 0 ${P.pinkD}`:`4px 4px 0 ${P.black}`, borderRadius:0 }}>
                    <p style={{ fontWeight:600, fontSize:'0.9rem', margin:'0 0 4px', lineHeight:1.5, whiteSpace:'pre-wrap' }}>{m.text}</p>
                    <p style={{ fontWeight:600, fontSize:'0.68rem', opacity:0.6, margin:0 }}>{m.timestamp.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})}</p>
                  </div>
                </div>
              ))}
              {loading && (
                <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                  <div style={{ width:32, height:32, background:P.pink, display:'flex', alignItems:'center', justifyContent:'center' }}><Bot size={16} color={P.white} /></div>
                  <div style={{ background:P.white, border:`3px solid ${P.black}`, padding:'12px 16px', display:'flex', gap:6, alignItems:'center' }}>
                    {[0,1,2].map(i => <div key={i} style={{ width:8, height:8, background:P.pink, animation:'pulse 0.8s ease-in-out infinite', animationDelay:`${i*0.2}s` }} />)}
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            {/* Quick replies */}
            <div style={{ display:'flex', gap:6, flexWrap:'wrap', padding:'10px 0 8px', borderTop:`3px solid ${P.pinkL}` }}>
              {['Tell me more', 'When to see a doctor?', 'Home remedies', 'Is this serious?'].map(r => (
                <button key={r} onClick={() => sendMsg(r)} disabled={loading} style={{ background:P.pinkP, color:P.pinkD, border:`2px solid ${P.pink}`, padding:'6px 12px', fontWeight:700, fontSize:'0.72rem', textTransform:'uppercase', cursor:'pointer', borderRadius:0 }}>{r}</button>
              ))}
            </div>

            {/* Input */}
            <div style={{ display:'flex', gap:10, padding:'10px 0 0' }}>
              <input value={input} onChange={e => setInput(e.target.value)} onKeyPress={e => e.key==='Enter' && sendMsg()} disabled={loading}
                placeholder="Ask about symptoms, medications, care tips…"
                style={{ flex:1, border:`3px solid ${P.black}`, borderRadius:0, padding:'12px 14px', fontWeight:600, fontSize:'0.9rem', background:P.white, outline:'none', boxShadow:`3px 3px 0 ${P.black}` }} />
              <button onClick={() => sendMsg()} disabled={!input.trim() || loading}
                style={{ background:loading?'#ddd':P.pink, border:`3px solid ${P.black}`, boxShadow:`4px 4px 0 ${P.black}`, color:P.white, width:50, height:50, display:'flex', alignItems:'center', justifyContent:'center', cursor:loading?'not-allowed':'pointer', borderRadius:0, flexShrink:0 }}>
                {loading ? <Loader size={18} style={{ animation:'spin 1s linear infinite' }} /> : <Send size={20} />}
              </button>
            </div>
          </div>
        )}

        {/* ── SUMMARY ── */}
        {screen === 'summary' && summary && (
          <>
            <div style={{ ...nbCard(P.pink, P.pinkD), color:P.white, display:'flex', alignItems:'center', gap:14 }}>
              <div style={{ width:52, height:52, background:P.white, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}><Check size={28} color={P.pink} /></div>
              <div>
                <h2 style={{ fontWeight:900, fontSize:'1.3rem', margin:'0 0 4px' }}>Care Summary</h2>
                <div style={{ display:'flex', gap:6, flexWrap:'wrap', marginTop:8 }}>
                  {summary.symptoms.map(s => <span key={s} style={{ background:P.pinkL, color:P.pinkD, border:`2px solid ${P.pinkL}`, padding:'2px 10px', fontWeight:800, fontSize:'0.72rem', textTransform:'uppercase' }}>{s}</span>)}
                </div>
              </div>
            </div>
            <div style={nbCard(P.pinkP)}>
              <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:14, borderBottom:`3px solid ${P.black}`, paddingBottom:8 }}>
                <div style={{ width:32, height:32, background:P.black, display:'flex', alignItems:'center', justifyContent:'center' }}><HomeIcon size={16} color={P.pink} /></div>
                <h3 style={{ fontWeight:900, fontSize:'0.9rem', textTransform:'uppercase', margin:0 }}>Home Care</h3>
              </div>
              {summary.homeCare.map((t,i) => <div key={i} style={{ display:'flex', gap:10, marginBottom:10 }}><Check size={16} color={P.pink} /><p style={{ fontWeight:600, fontSize:'0.85rem', margin:0 }}>{t}</p></div>)}
            </div>
            <div style={{ background:'#FFF0F0', border:`3px solid ${P.red}`, boxShadow:`5px 5px 0 ${P.red}`, padding:20, marginBottom:16 }}>
              <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:14, borderBottom:`3px solid ${P.red}`, paddingBottom:8 }}>
                <div style={{ width:32, height:32, background:P.red, display:'flex', alignItems:'center', justifyContent:'center' }}><AlertCircle size={16} color={P.white} /></div>
                <h3 style={{ fontWeight:900, fontSize:'0.9rem', textTransform:'uppercase', margin:0, color:P.red }}>When to Visit a Doctor</h3>
              </div>
              {summary.visitDoctor.map((r,i) => <div key={i} style={{ display:'flex', gap:10, marginBottom:10 }}><AlertCircle size={14} color={P.red} style={{ flexShrink:0 }} /><p style={{ fontWeight:600, fontSize:'0.85rem', margin:0, color:'#7a0000' }}>{r}</p></div>)}
            </div>
            <div style={{ display:'flex', gap:10 }}>
              <button onClick={newChat} style={{ flex:1, background:P.pink, color:P.white, border:`3px solid ${P.black}`, boxShadow:`4px 4px 0 ${P.black}`, padding:'14px', fontWeight:800, fontSize:'0.85rem', textTransform:'uppercase', cursor:'pointer', borderRadius:0 }}>New Chat</button>
              <button onClick={() => setScreen('chat')} style={{ flex:1, background:P.white, color:P.black, border:`3px solid ${P.black}`, boxShadow:`4px 4px 0 ${P.black}`, padding:'14px', fontWeight:800, fontSize:'0.85rem', textTransform:'uppercase', cursor:'pointer', borderRadius:0 }}>Back to Chat</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}