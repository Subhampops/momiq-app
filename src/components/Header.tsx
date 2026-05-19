import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';

const P = { black: '#0A0A0A', pink: '#FF4FA3', pinkL: '#FFD6EC', pinkP: '#FFF0F7', white: '#fff' };

interface HeaderProps {
  onOpenTracker?: () => void;
  onOpenAuth?: (view: 'login' | 'signup', autoFocus?: boolean) => void;
  onGuestLogin?: () => void;
  onDashboardNavigate?: () => void;
  showAuthButtons?: boolean;
}

const navItems = [
  { label: 'Home', id: 'home' }, { label: 'Features', id: 'features' },
  { label: 'Services', id: 'services' }, { label: 'Pricing', id: 'pricing' },
  { label: 'About', id: 'about' }, { label: 'FAQ', id: 'faq' },
];

export function Header({ onOpenAuth, onGuestLogin, onDashboardNavigate, showAuthButtons = false }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMobileOpen(false);
  };

  const nb: React.CSSProperties = {
    position: 'sticky', top: 0, zIndex: 50,
    background: P.black,
    borderBottom: `4px solid ${P.pink}`,
    boxShadow: scrolled ? `0 4px 0 ${P.pink}` : 'none',
    transition: 'box-shadow 0.2s',
  };

  return (
    <header style={nb}>
      <div className="container mx-auto px-4 lg:px-8">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 68 }}>

          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, background: P.pink, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '1.1rem', color: P.white, border: `2px solid ${P.pink}` }}>♥</div>
            <span style={{ fontWeight: 900, fontSize: '1.4rem', color: P.pink, textTransform: 'uppercase', letterSpacing: '0.06em' }}>MomiQ</span>
          </div>

          {/* Desktop Nav */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: 4 }} className="hidden lg:flex">
            {navItems.map(n => (
              <button key={n.id} onClick={() => scrollTo(n.id)} style={{
                background: 'transparent', border: 'none', color: '#ccc', fontWeight: 700, fontSize: '0.82rem',
                textTransform: 'uppercase', letterSpacing: '0.08em', cursor: 'pointer', padding: '6px 14px',
                transition: 'color 0.15s',
              }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = P.pink}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#ccc'}>
                {n.label}
              </button>
            ))}
          </nav>

          {/* Auth buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {showAuthButtons && (
              <>
                <button onClick={() => onOpenAuth?.('login')} className="hidden md:block" style={{ background: 'transparent', border: `2px solid ${P.pinkL}`, color: P.pinkL, padding: '7px 16px', fontWeight: 800, fontSize: '0.78rem', textTransform: 'uppercase', cursor: 'pointer', letterSpacing: '0.05em', transition: 'all 0.15s' }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = P.pinkL; el.style.color = P.black; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'transparent'; el.style.color = P.pinkL; }}>
                  Login
                </button>
                <button onClick={() => onGuestLogin?.()} className="hidden md:block" style={{ background: 'transparent', border: `2px solid #888`, color: '#888', padding: '7px 16px', fontWeight: 800, fontSize: '0.78rem', textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.15s' }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = P.pink; el.style.color = P.pink; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = '#888'; el.style.color = '#888'; }}>
                  Guest
                </button>
                <button onClick={() => onOpenAuth?.('signup')} className="hidden md:block" style={{ background: P.pink, color: P.white, border: `3px solid ${P.pink}`, boxShadow: `3px 3px 0 ${P.pinkL}`, padding: '8px 18px', fontWeight: 900, fontSize: '0.78rem', textTransform: 'uppercase', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, transition: 'all 0.1s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = 'translate(-2px,-2px)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = 'translate(0,0)'}>
                  Sign Up <ArrowRight size={14} />
                </button>
              </>
            )}
            <button onClick={onDashboardNavigate} style={{ background: P.pink, color: P.white, border: `3px solid ${P.pink}`, boxShadow: `3px 3px 0 ${P.pinkL}`, padding: '8px 18px', fontWeight: 900, fontSize: '0.78rem', textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.1s' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = 'translate(-2px,-2px)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = 'translate(0,0)'}>
              Dashboard
            </button>

            {/* Hamburger */}
            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden" style={{ background: 'transparent', border: `2px solid ${P.pink}`, color: P.pink, padding: '6px 8px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div style={{ borderTop: `3px solid ${P.pink}`, padding: '12px 0', display: 'flex', flexDirection: 'column', gap: 2 }} className="lg:hidden">
            {navItems.map(n => (
              <button key={n.id} onClick={() => scrollTo(n.id)} style={{ background: 'transparent', border: 'none', color: '#ccc', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', cursor: 'pointer', padding: '10px 4px', textAlign: 'left', letterSpacing: '0.08em', transition: 'color 0.15s' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = P.pink}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#ccc'}>
                {n.label}
              </button>
            ))}
            {showAuthButtons && (
              <div style={{ display: 'flex', gap: 8, paddingTop: 8, borderTop: `2px solid #333` }}>
                <button onClick={() => { onOpenAuth?.('login'); setMobileOpen(false); }} style={{ flex: 1, background: 'transparent', border: `2px solid ${P.pinkL}`, color: P.pinkL, padding: '10px', fontWeight: 800, fontSize: '0.8rem', textTransform: 'uppercase', cursor: 'pointer' }}>Login</button>
                <button onClick={() => { onOpenAuth?.('signup'); setMobileOpen(false); }} style={{ flex: 1, background: P.pink, color: P.white, border: `2px solid ${P.pink}`, padding: '10px', fontWeight: 800, fontSize: '0.8rem', textTransform: 'uppercase', cursor: 'pointer' }}>Sign Up</button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}