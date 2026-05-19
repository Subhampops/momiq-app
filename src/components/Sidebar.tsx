
import {
    Activity, Heart, Bell, Calendar, Baby,
    MessageCircle, Users, BookOpen, Music,
    Settings, LogOut, ChevronLeft, Menu,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarProps {
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
    userName: string;
    pregnancyWeek: number;
    onNavigate: (destination: string) => void;
    currentView: string;
    onLogout?: () => void;
}

const NB = {
    black:      '#0A0A0A',
    pink:       '#FF4FA3',
    pinkLight:  '#FFD6EC',
    pinkPale:   '#FFF0F7',
    pinkDeep:   '#C0005A',
    red:        '#FF3D3D',
    white:      '#fff',
};

export function Sidebar({ sidebarOpen, setSidebarOpen, userName = 'User', pregnancyWeek = 14, onNavigate, currentView, onLogout }: SidebarProps) {
    const items = [
        { icon: Heart,         label: 'Dashboard', action: 'dashboard'        },
        { icon: Calendar,      label: 'Calendar',  action: 'calendar'         },
        { icon: Baby,          label: 'Baby Dev',  action: 'baby'             },
        { icon: Activity,      label: 'Health',    action: 'health'           },
        { icon: MessageCircle, label: 'AI Doctor', action: 'aiDoctorChat'     },
        { icon: Bell,          label: 'Reminders', action: 'smartReminders'   },
        { icon: Users,         label: 'Groups',    action: 'supportGroups'    },
        { icon: BookOpen,      label: 'Articles',  action: 'expertArticles'   },
        { icon: Music,         label: 'Music',     action: 'personalizedMusic'},
        { icon: Settings,      label: 'Settings',  action: 'settings'         },
    ];

    const W = sidebarOpen ? 256 : 72;

    return (
        <>
            <AnimatePresence>
                {sidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 z-30 lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}
            </AnimatePresence>

            <motion.aside
                layout
                animate={{ width: W }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                style={{
                    position: 'fixed',
                    top: 0, left: 0,
                    height: '100vh',
                    zIndex: 40,
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    background: NB.black,
                    borderRight: `4px solid ${NB.black}`,
                    boxShadow: `4px 0 0 0 ${NB.black}`,
                    width: W,
                }}
            >
                {/* Brand */}
                <div style={{ padding: 16, borderBottom: `3px solid ${NB.pink}`, background: NB.black, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, overflow: 'hidden' }}>
                        <div style={{ width: 36, height: 36, background: NB.pink, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '1.1rem', flexShrink: 0, color: NB.white }}>♥</div>
                        {sidebarOpen && (
                            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
                                style={{ fontWeight: 900, fontSize: '1.3rem', color: NB.pink, textTransform: 'uppercase', letterSpacing: '0.1em', whiteSpace: 'nowrap' }}>
                                MomiQ
                            </motion.span>
                        )}
                    </div>
                    <button onClick={() => setSidebarOpen(!sidebarOpen)}
                        style={{ background: 'transparent', border: `2px solid ${NB.pink}`, color: NB.pink, padding: '4px 6px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                        {sidebarOpen ? <ChevronLeft size={16} /> : <Menu size={16} />}
                    </button>
                </div>

                {/* User */}
                <AnimatePresence>
                    {sidebarOpen && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                            style={{ padding: '12px 16px', borderBottom: `3px solid ${NB.pink}`, background: NB.pinkLight, overflow: 'hidden' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                <div style={{ width: 42, height: 42, background: NB.black, color: NB.pink, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '1.2rem', flexShrink: 0 }}>
                                    {userName.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <p style={{ fontWeight: 800, color: NB.black, fontSize: '0.85rem', textTransform: 'uppercase', margin: 0 }}>{userName}</p>
                                    <p style={{ fontWeight: 600, color: '#555', fontSize: '0.72rem', margin: 0 }}>WEEK {pregnancyWeek}</p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Nav */}
                <nav style={{ flex: 1, padding: 8, overflowY: 'auto', overflowX: 'hidden' }}>
                    {items.map(item => {
                        const active = currentView === item.action;
                        return (
                            <button key={item.label}
                                onClick={() => { onNavigate?.(item.action); if (window.innerWidth < 1024) setSidebarOpen(false); }}
                                style={{
                                    width: '100%', display: 'flex', alignItems: 'center',
                                    gap: sidebarOpen ? 12 : 0, justifyContent: sidebarOpen ? 'flex-start' : 'center',
                                    padding: '10px 12px', marginBottom: 4, cursor: 'pointer',
                                    border: active ? `2px solid ${NB.pink}` : '2px solid transparent',
                                    background: active ? NB.pink : 'transparent',
                                    color: active ? NB.white : '#aaa',
                                    fontWeight: 800, fontSize: '0.75rem', textTransform: 'uppercase',
                                    letterSpacing: '0.05em', borderRadius: 0,
                                    boxShadow: active ? `3px 3px 0px ${NB.pinkLight}` : 'none',
                                    transition: 'all 0.1s ease',
                                }}
                                onMouseEnter={e => { if(!active){ const el=e.currentTarget as HTMLElement; el.style.background=NB.pinkLight; el.style.color=NB.black; } }}
                                onMouseLeave={e => { if(!active){ const el=e.currentTarget as HTMLElement; el.style.background='transparent'; el.style.color='#aaa'; } }}
                            >
                                <item.icon size={18} style={{ flexShrink: 0 }} />
                                {sidebarOpen && <span>{item.label}</span>}
                            </button>
                        );
                    })}
                </nav>

                {/* Footer */}
                <div style={{ padding: 8, borderTop: `3px solid ${NB.pink}` }}>
                    <button
                        onClick={() => { if (window.confirm('Are you sure you want to log out?')) onLogout?.(); }}
                        style={{
                            width: '100%', display: 'flex', alignItems: 'center',
                            gap: sidebarOpen ? 12 : 0, justifyContent: sidebarOpen ? 'flex-start' : 'center',
                            padding: '10px 12px', marginBottom: 4, cursor: 'pointer',
                            border: '2px solid transparent', background: 'transparent',
                            color: NB.red,
                            fontWeight: 800, fontSize: '0.75rem', textTransform: 'uppercase', borderRadius: 0,
                            transition: 'all 0.1s ease',
                        }}
                        onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = NB.red; el.style.color = NB.white; el.style.borderColor = NB.red; }}
                        onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'transparent'; el.style.color = NB.red; el.style.borderColor = 'transparent'; }}
                    >
                        <LogOut size={18} />
                        {sidebarOpen && <span>Logout</span>}
                    </button>
                </div>
            </motion.aside>
        </>
    );
}
