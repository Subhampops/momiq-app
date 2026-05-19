import { Logo } from './Logo';
import { Facebook, Instagram, Twitter, Mail, Heart, FileText } from 'lucide-react';

interface FooterProps {
  onNavigateTerms?: () => void;
}

export function Footer({ onNavigateTerms }: FooterProps) {
  return (
    <footer style={{ background: 'linear-gradient(135deg, #FF4FA3 0%, #FFF0F7 40%, #FFD6EC 100%)', borderTop: '4px solid #0A0A0A' }}>
      <div className="container mx-auto px-4 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-8">

          {/* Brand */}
          <div className="space-y-4">
            <Logo />
            <p style={{ color: '#4a0a2a', fontWeight: 600, fontSize: '0.9rem' }}>
              Your trusted companion through pregnancy and beyond. 🌸
            </p>
            <div className="flex gap-3">
              {[
                { Icon: Facebook, label: 'Facebook' },
                { Icon: Instagram, label: 'Instagram' },
                { Icon: Twitter, label: 'Twitter' },
              ].map(({ Icon, label }) => (
                <a key={label} href="#" aria-label={label}
                  style={{ width: 40, height: 40, background: '#0A0A0A', border: '3px solid #0A0A0A', boxShadow: '3px 3px 0 #FF4FA3', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform 0.1s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = 'translate(-2px,-2px)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = 'translate(0,0)'}>
                  <Icon style={{ width: 18, height: 18, color: '#FF4FA3' }} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontWeight: 900, textTransform: 'uppercase', borderBottom: '3px solid #0A0A0A', paddingBottom: 8, marginBottom: 14, fontSize: '0.88rem' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {['home', 'community', 'services', 'about', 'faq'].map(id => (
                <li key={id}>
                  <a href={`#${id}`} style={{ color: '#4a0a2a', fontWeight: 700, textDecoration: 'none', fontSize: '0.88rem', textTransform: 'capitalize', transition: 'color 0.15s' }}
                    onMouseEnter={e => (e.target as HTMLElement).style.color = '#FF4FA3'}
                    onMouseLeave={e => (e.target as HTMLElement).style.color = '#4a0a2a'}>
                    {id.charAt(0).toUpperCase() + id.slice(1)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 style={{ fontWeight: 900, textTransform: 'uppercase', borderBottom: '3px solid #0A0A0A', paddingBottom: 8, marginBottom: 14, fontSize: '0.88rem' }}>Support</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <li><a href="#help" style={{ color: '#4a0a2a', fontWeight: 700, textDecoration: 'none', fontSize: '0.88rem' }}>Help Center</a></li>
              <li>
                <button onClick={onNavigateTerms}
                  style={{ background: 'none', border: 'none', color: '#4a0a2a', fontWeight: 700, textDecoration: 'none', fontSize: '0.88rem', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <FileText size={14} color="#FF4FA3" /> Terms & Conditions
                </button>
              </li>
              <li><a href="#privacy" style={{ color: '#4a0a2a', fontWeight: 700, textDecoration: 'none', fontSize: '0.88rem' }}>Privacy Policy</a></li>
              <li><a href="#contact" style={{ color: '#4a0a2a', fontWeight: 700, textDecoration: 'none', fontSize: '0.88rem' }}>Contact Us</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontWeight: 900, textTransform: 'uppercase', borderBottom: '3px solid #0A0A0A', paddingBottom: 8, marginBottom: 14, fontSize: '0.88rem' }}>Contact</h4>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
              <Mail style={{ width: 18, height: 18, color: '#FF4FA3', flexShrink: 0, marginTop: 2 }} />
              <a href="mailto:momiq787@gmail.com"
                style={{ color: '#4a0a2a', fontWeight: 600, fontSize: '0.85rem', textDecoration: 'none', wordBreak: 'break-all' }}>
                momiq787@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ paddingTop: 20, borderTop: '3px solid #0A0A0A', textAlign: 'center' }}>
          <p style={{ fontWeight: 700, fontSize: '0.82rem', color: '#4a0a2a', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
            © 2025 MomiQ · Made with <Heart size={14} color="#FF4FA3" fill="#FF4FA3" /> for moms everywhere
            {' · '}
            <button onClick={onNavigateTerms} style={{ background: 'none', border: 'none', color: '#FF4FA3', fontWeight: 800, cursor: 'pointer', fontSize: '0.82rem', textDecoration: 'underline' }}>
              Terms & Conditions
            </button>
          </p>
        </div>
      </div>
    </footer>
  );
}