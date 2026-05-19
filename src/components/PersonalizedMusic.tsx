import { useState } from 'react';
import { Music, Play, Pause, Square, Baby, Moon, Smile, Sparkles, ChevronRight, X, ArrowLeft, ExternalLink } from 'lucide-react';

const P = { black:'#0A0A0A', pink:'#FF4FA3', pinkL:'#FFD6EC', pinkP:'#FFF0F7', pinkD:'#C0005A', white:'#fff', purple:'#E8D6FF', blue:'#D6F0FF', green:'#D6FFE8' };
type MoodType = 'sleep' | 'calm' | 'play';

interface Track { id:number; title:string; artist:string; duration:string; mood:MoodType; spotifyId?:string; }
interface Playlist { id:number; name:string; emoji:string; trackCount:number; duration:string; mood:MoodType; tracks:Track[]; spotifyPlaylistId?:string; }
interface PersonalizedMusicProps { onBack?: () => void; }

const SPOTIFY_CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const hasSpotify = SPOTIFY_CLIENT_ID && SPOTIFY_CLIENT_ID !== 'your_spotify_client_id_here';

// Real Spotify playlist & track IDs
const playlists: Playlist[] = [
  { id:1, name:'Sweet Dreams Lullabies', emoji:'🌙', trackCount:5, duration:'25 min', mood:'sleep',
    spotifyPlaylistId:'37i9dQZF1DX3Ogo9pFvBkY', // Spotify "Lullabies" playlist
    tracks:[
      {id:101,title:'Twinkle Twinkle Little Star',artist:'Baby Music Box',duration:'3:45',mood:'sleep',spotifyId:'6rqhFgbbKwnb9MLmUQDhG6'},
      {id:102,title:'Brahms Lullaby',artist:'Classical for Babies',duration:'4:20',mood:'sleep'},
      {id:103,title:'Rock-a-bye Baby',artist:'Gentle Melodies',duration:'3:15',mood:'sleep'},
      {id:104,title:'Hush Little Baby',artist:'Sleep Sounds',duration:'3:50',mood:'sleep'},
      {id:105,title:'Moonlight Sonata',artist:'Piano Lullabies',duration:'5:30',mood:'sleep'},
    ]},
  { id:2, name:'Calm & Peaceful', emoji:'🌊', trackCount:4, duration:'18 min', mood:'calm',
    spotifyPlaylistId:'37i9dQZF1DX4WYpdgoIcn6', // "Calm Vibes"
    tracks:[
      {id:201,title:'Ocean Waves',artist:'Nature Sounds',duration:'5:00',mood:'calm'},
      {id:202,title:'Soft Piano Dreams',artist:'Peaceful Piano',duration:'4:30',mood:'calm'},
      {id:203,title:'Garden Birds',artist:'Nature for Babies',duration:'4:15',mood:'calm'},
      {id:204,title:'Gentle Rain',artist:'Relaxing Sounds',duration:'4:45',mood:'calm'},
    ]},
  { id:3, name:'Playtime Fun', emoji:'🎈', trackCount:5, duration:'20 min', mood:'play',
    spotifyPlaylistId:'37i9dQZF1DX1s9knjP51Oa', // "Happy Pop Hits"
    tracks:[
      {id:301,title:'The Wheels on the Bus',artist:'Kids Songs',duration:'3:30',mood:'play'},
      {id:302,title:"If You're Happy",artist:'Fun Time Music',duration:'3:45',mood:'play'},
      {id:303,title:'Old MacDonald',artist:'Farm Songs',duration:'4:00',mood:'play'},
      {id:304,title:'Head Shoulders Knees',artist:'Active Play',duration:'3:20',mood:'play'},
      {id:305,title:'Baby Shark',artist:'Ocean Fun',duration:'3:45',mood:'play'},
    ]},
  { id:4, name:'Classical Babies', emoji:'🎻', trackCount:4, duration:'22 min', mood:'calm',
    spotifyPlaylistId:'37i9dQZF1DWWEJlAGA9gs0', // "Classical Essentials"
    tracks:[
      {id:401,title:'Mozart for Babies',artist:'Classical Collection',duration:'5:30',mood:'calm'},
      {id:402,title:'Bach Minuet',artist:'Baby Classics',duration:'5:00',mood:'calm'},
      {id:403,title:'Vivaldi Spring',artist:'Four Seasons Baby',duration:'6:00',mood:'calm'},
      {id:404,title:'Chopin Nocturne',artist:'Piano for Babies',duration:'5:30',mood:'calm'},
    ]},
];

const moods = [
  { value:'sleep' as MoodType, label:'Sleep', icon:Moon,     bg:P.purple },
  { value:'calm'  as MoodType, label:'Calm',  icon:Smile,    bg:P.blue   },
  { value:'play'  as MoodType, label:'Play',  icon:Sparkles, bg:P.pinkL  },
];

const moodBg = { sleep:P.purple, calm:P.blue, play:P.pinkL };

// Spotify Embed Player
function SpotifyEmbed({ playlistId, trackId }: { playlistId?: string; trackId?: string }) {
  const embedId = trackId ? `track/${trackId}` : `playlist/${playlistId}`;
  const url = `https://open.spotify.com/embed/${embedId}?utm_source=generator&theme=0`;
  return (
    <div style={{ border:`3px solid ${P.black}`, boxShadow:`4px 4px 0 ${P.black}`, overflow:'hidden', marginBottom:16 }}>
      <iframe
        src={url} width="100%" height={152}
        frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy" title="Spotify Player"
        style={{ display:'block' }}
      />
    </div>
  );
}

export function PersonalizedMusic({ onBack }: PersonalizedMusicProps) {
  const [screen, setScreen] = useState<'setup'|'dashboard'|'playlist'>('setup');
  const [babyName, setBabyName] = useState('');
  const [ageMonths, setAgeMonths] = useState(6);
  const [pref, setPref] = useState<MoodType>('sleep');
  const [selectedMood, setSelectedMood] = useState<MoodType>('sleep');
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist|null>(null);
  const [currentTrack, setCurrentTrack] = useState<Track|null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeEmbed, setActiveEmbed] = useState<{playlistId?:string; trackId?:string}|null>(null);

  const nbCard = (bg=P.white): React.CSSProperties => ({ background:bg, border:`3px solid ${P.black}`, boxShadow:`5px 5px 0 ${P.black}`, borderRadius:0, padding:24, marginBottom:20 });

  const handleBack = () => {
    if (screen==='playlist') { setScreen('dashboard'); setSelectedPlaylist(null); setActiveEmbed(null); }
    else if (screen==='dashboard') setScreen('setup');
    else onBack?.();
  };

  return (
    <div style={{ background:P.pinkP, minHeight:'100vh', padding:'24px 24px 40px', fontFamily:"'Space Grotesk','Inter',sans-serif" }}>
      <div style={{ maxWidth:860, margin:'0 auto' }}>

        {/* Header */}
        <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:24 }}>
          <button onClick={handleBack} style={{ background:P.pink, border:`3px solid ${P.black}`, boxShadow:`3px 3px 0 ${P.black}`, padding:'8px 14px', fontWeight:800, cursor:'pointer', display:'flex', alignItems:'center', gap:6, borderRadius:0 }}>
            <ArrowLeft size={16} color={P.white} />
          </button>
          <div>
            <div style={{ display:'inline-block', background:'#B44FFF', border:`3px solid ${P.black}`, boxShadow:`3px 3px 0 ${P.black}`, padding:'2px 14px', marginBottom:4 }}>
              <span style={{ fontWeight:900, fontSize:'0.7rem', textTransform:'uppercase', letterSpacing:'0.1em', color:P.white }}>
                {hasSpotify ? '🎵 Spotify Connected' : '🎵 Baby Music'}
              </span>
            </div>
            <h1 style={{ fontSize:'2rem', fontWeight:900, color:P.black, margin:0 }}>Personalized Music</h1>
          </div>
        </div>

        {/* ── SETUP ── */}
        {screen === 'setup' && (
          <>
            <div style={{ ...nbCard('#B44FFF'), textAlign:'center', color:P.white }}>
              <div style={{ fontSize:'4rem', marginBottom:8 }}>👶</div>
              <h2 style={{ fontWeight:900, fontSize:'1.5rem', margin:'0 0 6px' }}>Music for Your Baby</h2>
              <p style={{ fontWeight:600, opacity:0.85, margin:0, fontSize:'0.9rem' }}>
                {hasSpotify ? 'Spotify-powered playlists tailored to your baby\'s mood' : 'Curated baby playlists with embedded Spotify player'}
              </p>
            </div>

            <div style={nbCard(P.white)}>
              <h3 style={{ fontWeight:900, textTransform:'uppercase', fontSize:'0.88rem', margin:'0 0 18px', borderBottom:`3px solid ${P.black}`, paddingBottom:8 }}>About Your Baby</h3>
              <div style={{ marginBottom:14 }}>
                <label style={{ fontWeight:800, fontSize:'0.75rem', textTransform:'uppercase', display:'block', marginBottom:6 }}>Baby's Name</label>
                <input value={babyName} onChange={e => setBabyName(e.target.value)} placeholder="Enter baby's name…"
                  style={{ width:'100%', border:`3px solid ${P.black}`, boxShadow:`3px 3px 0 ${P.black}`, padding:'10px 14px', fontWeight:600, fontSize:'0.9rem', background:P.white, outline:'none', borderRadius:0, boxSizing:'border-box' }} />
              </div>
              <div style={{ marginBottom:18 }}>
                <label style={{ fontWeight:800, fontSize:'0.75rem', textTransform:'uppercase', display:'block', marginBottom:6 }}>Age: {ageMonths} months</label>
                <input type="range" min={0} max={36} value={ageMonths} onChange={e => setAgeMonths(+e.target.value)} style={{ width:'100%', cursor:'pointer', accentColor:P.pink }} />
              </div>
              <div style={{ marginBottom:18 }}>
                <label style={{ fontWeight:800, fontSize:'0.75rem', textTransform:'uppercase', display:'block', marginBottom:8 }}>Mood Preference</label>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10 }}>
                  {moods.map(m => (
                    <button key={m.value} onClick={() => setPref(m.value)} style={{
                      background: pref===m.value ? P.black : m.bg, color: pref===m.value ? P.pink : P.black,
                      border:`3px solid ${P.black}`, boxShadow: pref===m.value ? `3px 3px 0 ${P.pink}` : `3px 3px 0 ${P.black}`,
                      padding:'12px 10px', fontWeight:800, fontSize:'0.8rem', textTransform:'uppercase', cursor:'pointer', borderRadius:0, textAlign:'center',
                    }}>
                      <m.icon size={20} style={{ display:'block', margin:'0 auto 6px' }} />
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>
              <button onClick={() => { if(babyName.trim()) setScreen('dashboard'); }} disabled={!babyName.trim()}
                style={{ width:'100%', background:babyName.trim()?P.black:'#ddd', color:babyName.trim()?P.pink:'#999', border:`3px solid ${babyName.trim()?P.black:'#ccc'}`, boxShadow:babyName.trim()?`4px 4px 0 #555`:'none', padding:'14px', fontWeight:900, fontSize:'1rem', textTransform:'uppercase', cursor:babyName.trim()?'pointer':'not-allowed', borderRadius:0 }}>
                Continue →
              </button>
            </div>
          </>
        )}

        {/* ── DASHBOARD ── */}
        {screen === 'dashboard' && (
          <>
            <div style={{ ...nbCard(P.black), display:'flex', alignItems:'center', gap:16, color:P.white }}>
              <div style={{ width:56, height:56, background:P.pink, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.8rem', flexShrink:0 }}>{babyName.charAt(0).toUpperCase()}</div>
              <div>
                <h2 style={{ fontWeight:900, fontSize:'1.3rem', color:P.pink, margin:'0 0 2px' }}>Hi, {babyName}! 👋</h2>
                <p style={{ fontWeight:600, color:'#aaa', margin:0, fontSize:'0.82rem' }}>{ageMonths} months old · {moods.find(m=>m.value===pref)?.label} mood</p>
              </div>
              {hasSpotify && <div style={{ marginLeft:'auto', background:P.green, color:P.black, border:`2px solid ${P.black}`, padding:'4px 10px', fontWeight:800, fontSize:'0.68rem', textTransform:'uppercase' }}>🎵 Spotify</div>}
            </div>

            {/* Recommended embed */}
            {(() => { const rec = playlists.find(p => p.mood===pref)||playlists[0]; return (
              <div style={{ marginBottom:20 }}>
                <p style={{ fontWeight:800, fontSize:'0.78rem', textTransform:'uppercase', margin:'0 0 10px', display:'flex', alignItems:'center', gap:6 }}><Sparkles size={14} color={P.pink} /> Recommended for Today</p>
                {hasSpotify && rec.spotifyPlaylistId && <SpotifyEmbed playlistId={rec.spotifyPlaylistId} />}
                <div style={{ ...nbCard(moodBg[pref]), cursor:'pointer', display:'flex', alignItems:'center', gap:16, marginBottom:0 }} onClick={() => { setSelectedPlaylist(rec); setScreen('playlist'); }}>
                  <span style={{ fontSize:'2.5rem' }}>{rec.emoji}</span>
                  <div style={{ flex:1 }}>
                    <h3 style={{ fontWeight:900, margin:'0 0 2px', fontSize:'1rem' }}>{rec.name}</h3>
                    <p style={{ fontWeight:600, fontSize:'0.78rem', color:'#555', margin:0 }}>{rec.trackCount} songs · {rec.duration}</p>
                  </div>
                  <ChevronRight size={18} />
                </div>
              </div>
            ); })()}

            {/* Mood tabs */}
            <div style={{ display:'flex', gap:8, marginBottom:16 }}>
              {moods.map(m => (
                <button key={m.value} onClick={() => setSelectedMood(m.value)} style={{
                  background:selectedMood===m.value?P.black:P.white, color:selectedMood===m.value?P.pink:P.black,
                  border:`3px solid ${P.black}`, boxShadow:`3px 3px 0 ${P.black}`, padding:'8px 16px',
                  fontWeight:800, fontSize:'0.78rem', textTransform:'uppercase', cursor:'pointer', borderRadius:0, display:'flex', alignItems:'center', gap:6,
                }}><m.icon size={14}/> {m.label}</button>
              ))}
            </div>

            {/* Playlist grid */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
              {playlists.filter(p=>p.mood===selectedMood).map(pl => (
                <div key={pl.id} style={{ background:P.white, border:`3px solid ${P.black}`, boxShadow:`4px 4px 0 ${P.black}`, padding:18, cursor:'pointer' }}
                  onClick={() => { setSelectedPlaylist(pl); setScreen('playlist'); }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform='translate(-2px,-2px)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform='translate(0,0)'}>
                  <div style={{ fontSize:'2.5rem', marginBottom:8 }}>{pl.emoji}</div>
                  <h4 style={{ fontWeight:900, fontSize:'0.9rem', margin:'0 0 4px' }}>{pl.name}</h4>
                  <p style={{ fontWeight:600, fontSize:'0.75rem', color:'#666', margin:0 }}>{pl.trackCount} songs · {pl.duration}</p>
                </div>
              ))}
            </div>

            {/* Mini player */}
            {currentTrack && (
              <div style={{ 
                position: 'sticky', bottom: 20, zIndex: 50,
                background:P.black, border:`3px solid ${P.black}`, boxShadow:`5px 5px 0 ${P.pink}`, 
                padding:'14px 18px', marginTop:20, display:'flex', alignItems:'center', gap:14 
              }}>
                <div style={{ width: 44, height: 44, background: P.pink, display:'flex', alignItems:'center', justifyContent:'center', border:`2px solid ${P.white}` }}>
                  <Music size={20} color={P.white} />
                </div>
                <div style={{ flex:1, overflow: 'hidden' }}>
                  <p style={{ fontWeight:800, color:P.pink, margin:0, fontSize:'0.9rem', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', textTransform: 'uppercase' }}>{currentTrack.title}</p>
                  <p style={{ fontWeight:600, color:'#aaa', margin:0, fontSize:'0.75rem', textTransform: 'uppercase' }}>{currentTrack.artist}</p>
                </div>
                <button onClick={() => setIsPlaying(p=>!p)} 
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform='scale(1.05)'; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform='scale(1)'; }}
                  style={{ background:P.pink, border:`2px solid ${P.white}`, width:44, height:44, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', borderRadius:0, transition:'transform 0.1s' }}>
                  {isPlaying ? <Pause size={20} color={P.white} /> : <Play size={20} color={P.white} />}
                </button>
                <button onClick={() => { setIsPlaying(false); setCurrentTrack(null); }} 
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform='scale(1.05)'; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform='scale(1)'; }}
                  style={{ background:'#FF3D3D', border:`2px solid ${P.white}`, width:44, height:44, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', borderRadius:0, transition:'transform 0.1s' }}>
                  <Square size={16} color={P.white} />
                </button>
              </div>
            )}
          </>
        )}

        {/* ── PLAYLIST ── */}
        {screen === 'playlist' && selectedPlaylist && (
          <>
            <div style={{ ...nbCard(moodBg[selectedPlaylist.mood]) }}>
              <div style={{ fontSize:'3.5rem', marginBottom:8 }}>{selectedPlaylist.emoji}</div>
              <h2 style={{ fontWeight:900, fontSize:'1.4rem', margin:'0 0 4px' }}>{selectedPlaylist.name}</h2>
              <p style={{ fontWeight:600, color:'#444', margin:'0 0 14px' }}>{selectedPlaylist.trackCount} songs · {selectedPlaylist.duration}</p>
              <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
                <button onClick={() => { setCurrentTrack(selectedPlaylist.tracks[0]); setIsPlaying(true); setActiveEmbed({trackId: selectedPlaylist.tracks[0].spotifyId}); }}
                  style={{ background:P.black, color:P.pink, border:`3px solid ${P.black}`, boxShadow:`4px 4px 0 #555`, padding:'10px 20px', fontWeight:800, textTransform:'uppercase', cursor:'pointer', borderRadius:0, display:'flex', alignItems:'center', gap:8 }}>
                  <Play size={16} /> Play All
                </button>
                {hasSpotify && selectedPlaylist.spotifyPlaylistId && (
                  <a href={`https://open.spotify.com/playlist/${selectedPlaylist.spotifyPlaylistId}`} target="_blank" rel="noreferrer"
                    style={{ background:P.white, color:P.black, border:`3px solid ${P.black}`, boxShadow:`4px 4px 0 #555`, padding:'10px 20px', fontWeight:800, textTransform:'uppercase', cursor:'pointer', borderRadius:0, display:'flex', alignItems:'center', gap:8, textDecoration:'none', fontSize:'0.85rem' }}>
                    <ExternalLink size={16} /> Open in Spotify
                  </a>
                )}
              </div>
            </div>

            {/* Spotify embed for this playlist */}
            {hasSpotify && selectedPlaylist.spotifyPlaylistId && (
              <SpotifyEmbed playlistId={selectedPlaylist.spotifyPlaylistId} />
            )}
            {activeEmbed?.trackId && (
              <>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8 }}>
                  <span style={{ fontWeight:800, fontSize:'0.78rem', textTransform:'uppercase' }}>Now Playing</span>
                  <button onClick={() => setActiveEmbed(null)} style={{ background:'transparent', border:'none', cursor:'pointer', color:'#888', display:'flex', alignItems:'center' }}><X size={16}/></button>
                </div>
                <SpotifyEmbed trackId={activeEmbed.trackId} />
              </>
            )}

            <div style={nbCard(P.white)}>
              <h3 style={{ fontWeight:900, fontSize:'0.88rem', textTransform:'uppercase', margin:'0 0 14px', borderBottom:`3px solid ${P.black}`, paddingBottom:8 }}>Tracks</h3>
              {selectedPlaylist.tracks.map((track, i) => {
                const isActive = currentTrack?.id === track.id;
                return (
                <div key={track.id} onClick={() => { setCurrentTrack(track); setIsPlaying(true); if(track.spotifyId) setActiveEmbed({trackId:track.spotifyId}); }}
                  onMouseEnter={e => { if(!isActive){ const el = e.currentTarget as HTMLElement; el.style.transform='translate(-2px,-2px)'; el.style.boxShadow=`4px 4px 0 ${P.black}`; } }}
                  onMouseLeave={e => { if(!isActive){ const el = e.currentTarget as HTMLElement; el.style.transform='translate(0,0)'; el.style.boxShadow='none'; } }}
                  style={{ 
                    display:'flex', alignItems:'center', gap:14, padding:'12px 14px', marginBottom:12, 
                    background:isActive ? P.pink : P.pinkP, 
                    border:`3px solid ${P.black}`, 
                    boxShadow:isActive ? `4px 4px 0 ${P.black}` : 'none',
                    transform:isActive ? 'translate(-2px,-2px)' : 'none',
                    cursor:'pointer', transition:'all 0.1s' 
                  }}>
                  <div style={{ width:32, height:32, background:P.black, color:P.pink, display:'flex', alignItems:'center', justifyContent:'center', fontWeight:900, fontSize:'0.85rem', flexShrink:0 }}>{i+1}</div>
                  <div style={{ flex:1 }}>
                    <p style={{ fontWeight:800, margin:0, fontSize:'0.88rem', color:isActive?P.white:P.black, textTransform: 'uppercase' }}>{track.title}</p>
                    <p style={{ fontWeight:600, color:isActive?'#eee':'#666', margin:0, fontSize:'0.75rem', textTransform: 'uppercase' }}>{track.artist}</p>
                  </div>
                  <span style={{ fontWeight:700, fontSize:'0.78rem', color:isActive?P.white:'#555' }}>{track.duration}</span>
                  {track.spotifyId && <ExternalLink size={14} color={isActive?P.white:P.black} />}
                </div>
              )})}
            </div>
          </>
        )}
      </div>
    </div>
  );
}