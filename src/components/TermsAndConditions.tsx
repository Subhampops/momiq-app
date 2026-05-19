import { useState } from 'react';
import { ArrowLeft, ChevronDown, ChevronUp, Shield, Heart, Lock, Eye, FileText, Phone } from 'lucide-react';

const P = { black:'#0A0A0A', pink:'#FF4FA3', pinkL:'#FFD6EC', pinkP:'#FFF0F7', pinkD:'#C0005A', white:'#fff', green:'#00E676' };

interface TermsProps { onBack?: () => void; }

const sections = [
  {
    id:'acceptance', icon: FileText, color: P.pinkL,
    title: '1. Acceptance of Terms',
    content: `By downloading, installing, or using the MomiQ application ("App"), you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use the App.

These Terms constitute a legally binding agreement between you ("User") and MomiQ ("Company", "we", "us", or "our"). We reserve the right to update these Terms at any time, and continued use of the App constitutes acceptance of any changes.`,
  },
  {
    id:'medical', icon: Heart, color: '#FFD6D6',
    title: '2. Medical Disclaimer',
    content: `IMPORTANT: MomiQ is NOT a medical device and does NOT provide medical advice, diagnosis, or treatment.

• The AI Health Assistant provides general wellness information only
• All content is for educational purposes and should not replace professional medical advice
• Always consult a qualified healthcare provider for medical concerns
• In case of medical emergencies, contact emergency services immediately
• Never delay seeking professional medical advice because of information provided by this App

The Company expressly disclaims all liability for any adverse effects resulting from the use of information provided through the App.`,
  },
  {
    id:'privacy', icon: Lock, color: P.pinkL,
    title: '3. Privacy & Data Protection',
    content: `We take your privacy seriously. By using MomiQ, you consent to the collection and use of your data as described in our Privacy Policy.

Data We Collect:
• Personal information (name, email, phone number)
• Health information you voluntarily provide (pregnancy week, health metrics)
• Usage data and app analytics
• Device information

How We Use Your Data:
• To provide and personalize the App experience
• To send appointment reminders and health notifications
• To improve our services through analytics
• We do NOT sell your personal data to third parties

Data Security: All data is encrypted in transit and at rest. We implement industry-standard security measures to protect your information.`,
  },
  {
    id:'ai', icon: Eye, color: '#E8D6FF',
    title: '4. AI Features & Limitations',
    content: `MomiQ uses artificial intelligence (powered by OpenAI) to provide personalized health information. By using AI features, you acknowledge:
1. The AI provides general guidance, NOT medical advice.ly and may not always be accurate
• The AI does not have access to your medical history unless you share it
• AI-generated content should be verified with a healthcare professional
• We continuously improve AI accuracy but cannot guarantee error-free responses
• The AI Assistant is designed for general wellness guidance, not emergency situations

You agree not to use the AI features for:
• Emergency medical situations (call 112 or your local emergency number)
• Replacing ongoing medical treatment
• Making critical medical decisions without professional consultation`,
  },
  {
    id:'userconduct', icon: Shield, color: P.pinkL,
    title: '5. User Conduct',
    content: `You agree to use MomiQ responsibly and lawfully. You must NOT:

• Provide false or misleading health information
• Attempt to access other users' accounts or data
• Use the App for any unlawful purpose
• Share your account credentials with others
• Attempt to reverse-engineer or hack the App
• Use the App to harass or harm others

We reserve the right to suspend or terminate accounts that violate these terms without prior notice.`,
  },
  {
    id:'content', icon: FileText, color: '#E0F7FF',
    title: '6. Content & Intellectual Property',
    content: `All content within MomiQ, including text, graphics, logos, icons, audio clips, and software, is the property of MomiQ and is protected by intellectual property laws.

You may:
• Use the App for personal, non-commercial purposes
• Share App content with proper attribution

You may NOT:
• Copy, distribute, or sell App content without written permission
• Create derivative works based on our content
• Remove copyright or trademark notices

User-generated content (posts in Support Groups, etc.) remains your property, but you grant MomiQ a license to display and distribute it within the App.`,
  },
  {
    id:'support', icon: Heart, color: P.pinkL,
    title: '7. Support Groups Guidelines',
    content: `MomiQ's Support Groups are community spaces. By participating, you agree to:

• Be respectful and supportive to all members
• Not share others' personal information without consent
• Not post medical advice as fact — share experiences, not diagnoses
• Report harmful or inappropriate content
• Not use groups for commercial promotion or spam

We moderate groups but are not responsible for member-generated content. We may remove content or users who violate community guidelines.`,
  },
  {
    id:'liability', icon: Shield, color: '#FFF0D6',
    title: '8. Limitation of Liability',
    content: `TO THE MAXIMUM EXTENT PERMITTED BY LAW:

• MomiQ is provided "as is" without warranties of any kind
• We do not guarantee uninterrupted, error-free service
• We are not liable for any indirect, incidental, or consequential damages
• Our total liability to you shall not exceed the amount you paid for the App in the last 12 months
• We are not responsible for third-party services linked within the App

Some jurisdictions do not allow exclusion of certain warranties or limitations of liability. In such cases, our liability is limited to the greatest extent permitted by law.`,
  },
  {
    id:'termination', icon: Lock, color: '#FFE0E0',
    title: '9. Termination',
    content: `Either party may terminate this agreement at any time.

You may terminate by:
• Deleting your account through Settings
• Uninstalling the App
• Contacting our support team

We may terminate or suspend your access if you:
• Violate these Terms
• Engage in fraudulent activity
• Abuse the App or other users

Upon termination, your right to use the App ceases. We may retain certain data as required by law or for legitimate business purposes, subject to our Privacy Policy.`,
  },
  {
    id:'contact', icon: Phone, color: P.pinkL,
    title: '10. Contact & Grievances',
    content: `If you have questions, concerns, or complaints about these Terms or the App:

Email: support@momiq.app
Address: MomiQ Technologies Pvt. Ltd., Bangalore, India 560001
Grievance Officer: Available 9 AM – 6 PM IST, Monday–Friday

For data-related concerns (GDPR/DPDP Act), contact: privacy@momiq.app

We aim to respond to all queries within 48 business hours.

These Terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in Bangalore, Karnataka.`,
  },
];

export function TermsAndConditions({ onBack }: TermsProps) {
  const [open, setOpen] = useState<string | null>('acceptance');
  const toggle = (id: string) => setOpen(p => p === id ? null : id);

  return (
    <div style={{ background:P.pinkP, minHeight:'100vh', fontFamily:"'Space Grotesk','Inter',sans-serif" }}>

      {/* Header */}
      <div style={{ background:P.black, borderBottom:`4px solid ${P.pink}`, padding:'16px 24px', display:'flex', alignItems:'center', gap:14, position:'sticky', top:0, zIndex:40 }}>
        <button onClick={onBack} style={{ background:P.pink, border:`3px solid ${P.pink}`, color:P.white, width:36, height:36, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', borderRadius:0 }}>
          <ArrowLeft size={18} />
        </button>
        <div style={{ width:40, height:40, background:P.pink, display:'flex', alignItems:'center', justifyContent:'center' }}>
          <FileText size={22} color={P.white} />
        </div>
        <div>
          <h1 style={{ fontWeight:900, fontSize:'1rem', color:P.white, margin:0, textTransform:'uppercase', letterSpacing:'0.08em' }}>Terms & Conditions</h1>
          <p style={{ fontWeight:600, fontSize:'0.7rem', color:P.pinkL, margin:0 }}>Last updated: May 2025 · MomiQ v1.0</p>
        </div>
      </div>

      <div style={{ maxWidth:840, margin:'0 auto', padding:'24px 20px 48px' }}>

        {/* Intro banner */}
        <div style={{ background:P.pink, border:`3px solid ${P.black}`, boxShadow:`6px 6px 0 ${P.black}`, padding:24, marginBottom:24, color:P.white }}>
          <div style={{ display:'flex', alignItems:'flex-start', gap:14 }}>
            <div style={{ width:52, height:52, background:P.white, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
              <Shield size={28} color={P.pink} />
            </div>
            <div>
              <h2 style={{ fontWeight:900, fontSize:'1.2rem', margin:'0 0 8px' }}>Please Read Carefully</h2>
              <p style={{ fontWeight:600, fontSize:'0.88rem', opacity:0.9, margin:0, lineHeight:1.5 }}>
                These Terms govern your use of MomiQ. By using our app, you agree to these terms. If you have questions, contact us at <strong>support@momiq.app</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Quick badges */}
        <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:24 }}>
          {[['🔒 Encrypted', P.pinkL], ['🩺 Not Medical Advice', '#FFD6D6'], ['🌸 Your Data is Safe', P.pinkL], ['🤝 Community Moderated', '#E8D6FF']].map(([label, bg]) => (
            <span key={label as string} style={{ background:bg as string, border:`3px solid ${P.black}`, boxShadow:`3px 3px 0 ${P.black}`, padding:'6px 14px', fontWeight:800, fontSize:'0.72rem', textTransform:'uppercase' }}>
              {label}
            </span>
          ))}
        </div>

        {/* Accordion sections */}
        {sections.map(s => (
          <div key={s.id} style={{ border:`3px solid ${P.black}`, boxShadow:`5px 5px 0 ${P.black}`, marginBottom:12, background:P.white, overflow:'hidden' }}>
            <button onClick={() => toggle(s.id)} style={{
              width:'100%', display:'flex', alignItems:'center', gap:14, padding:'16px 20px',
              background: open===s.id ? P.black : s.color,
              color: open===s.id ? P.white : P.black,
              border:'none', cursor:'pointer', textAlign:'left',
              transition:'background 0.15s',
            }}>
              <div style={{ width:36, height:36, background: open===s.id ? P.pink : P.black, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                <s.icon size={18} color={P.white} />
              </div>
              <span style={{ fontWeight:900, fontSize:'0.92rem', textTransform:'uppercase', letterSpacing:'0.03em', flex:1 }}>{s.title}</span>
              {open===s.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
            {open===s.id && (
              <div style={{ padding:'20px 20px 20px 70px', borderTop:`3px solid ${P.pink}`, background:P.white }}>
                <p style={{ fontWeight:500, fontSize:'0.88rem', lineHeight:1.8, margin:0, whiteSpace:'pre-wrap', color:'#333' }}>{s.content}</p>
              </div>
            )}
          </div>
        ))}

        {/* Acceptance footer */}
        <div style={{ background:P.pinkL, border:`3px solid ${P.black}`, boxShadow:`5px 5px 0 ${P.black}`, padding:24, marginTop:8, textAlign:'center' }}>
          <div style={{ fontSize:'2rem', marginBottom:8 }}>🌸</div>
          <h3 style={{ fontWeight:900, fontSize:'1rem', margin:'0 0 8px', textTransform:'uppercase' }}>By Using MomiQ, You Agree</h3>
          <p style={{ fontWeight:600, fontSize:'0.82rem', color:'#555', margin:'0 0 16px' }}>
            These terms were last updated May 2025. We'll notify you of significant changes via the app.
          </p>
          <button onClick={onBack} style={{ background:P.black, color:P.pink, border:`3px solid ${P.black}`, boxShadow:`4px 4px 0 ${P.black}`, padding:'12px 32px', fontWeight:800, fontSize:'0.88rem', textTransform:'uppercase', cursor:'pointer', borderRadius:0 }}>
            ← Back to App
          </button>
        </div>
      </div>
    </div>
  );
}
