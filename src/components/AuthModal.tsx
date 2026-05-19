import { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { auth, googleProvider } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultView?: 'login' | 'signup';
  autoFocus?: boolean;
  onSuccess?: () => void;
}

export function AuthModal({ open, onOpenChange, defaultView = 'login', autoFocus = false, onSuccess }: AuthModalProps) {
  const [view, setView] = useState<'login' | 'signup'>(defaultView);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Auto-focus on first input when modal opens
  useEffect(() => {
    if (open && autoFocus) {
      const timer = setTimeout(() => {
        if (view === 'signup' && nameInputRef.current) {
          nameInputRef.current.focus();
        } else if (view === 'login' && emailInputRef.current) {
          emailInputRef.current.focus();
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [open, view, autoFocus]);

  // Update view when defaultView changes
  useEffect(() => {
    setView(defaultView);
    setError(null);
    setEmail('');
    setPassword('');
    setName('');
  }, [defaultView, open]);

  const handleEmailAuth = async () => {
    setError(null);
    setLoading(true);
    try {
      if (view === 'login') {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        // Sign up logic (Name isn't stored by default in basic firebase auth unless we update profile, but we create the user)
        await createUserWithEmailAndPassword(auth, email, password);
      }
      if (onSuccess) onSuccess();
      onOpenChange(false);
    } catch (err: any) {
      setError(err.message || 'An error occurred during authentication.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setError(null);
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      if (onSuccess) onSuccess();
      onOpenChange(false);
    } catch (err: any) {
      setError(err.message || 'An error occurred during Google authentication.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-[#FFD6EC] border-4 border-black p-0" style={{ boxShadow: '8px 8px 0 #000', borderRadius: 0 }}>
        <DialogTitle className="sr-only">
          {view === 'login' ? 'Login to MomiQ' : 'Sign Up for MomiQ'}
        </DialogTitle>
        <DialogDescription className="sr-only">
          {view === 'login' 
            ? 'Enter your credentials to login to your MomiQ account' 
            : 'Create a new account to get started with MomiQ'}
        </DialogDescription>
        <div className="p-8">
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold font-mono uppercase tracking-tight">{view === 'login' ? 'Welcome Back' : 'Create Account'}</h2>
              <p className="text-black font-semibold">{view === 'login' ? 'Login to continue to MomiQ' : 'Join MomiQ today'}</p>
            </div>

            {error && (
              <div className="bg-red-100 border-2 border-red-500 text-red-700 p-3 text-sm font-bold shadow-[4px_4px_0_#ef4444]">
                {error}
              </div>
            )}

            <div className="space-y-3">
              <Button 
                variant="outline" 
                onClick={handleGoogleAuth}
                disabled={loading}
                className="w-full bg-white hover:bg-[#FFE9F4] border-2 border-black py-6 font-bold shadow-[4px_4px_0_#000] active:translate-y-1 active:translate-x-1 active:shadow-none transition-all"
                style={{ borderRadius: 0 }}
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-2 border-black"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-[#FFD6EC] text-black font-bold uppercase">or</span>
              </div>
            </div>

            <div className="space-y-4">
              {view === 'signup' && (
                <div className="space-y-2">
                  <Label htmlFor="signup-name" className="font-bold">Name</Label>
                  <Input 
                    ref={nameInputRef}
                    id="signup-name"
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="bg-white border-2 border-black font-medium focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-pink-500 shadow-[4px_4px_0_#000]"
                    style={{ borderRadius: 0 }}
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="auth-email" className="font-bold">Email</Label>
                <Input 
                  ref={view === 'login' ? emailInputRef : null}
                  id="auth-email"
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="bg-white border-2 border-black font-medium focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-pink-500 shadow-[4px_4px_0_#000]"
                  style={{ borderRadius: 0 }}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="auth-password" className="font-bold">Password</Label>
                <Input 
                  id="auth-password"
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={view === 'login' ? "Enter your password" : "Create a password"}
                  className="bg-white border-2 border-black font-medium focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-pink-500 shadow-[4px_4px_0_#000]"
                  style={{ borderRadius: 0 }}
                />
              </div>

              {view === 'login' && (
                <div className="text-right">
                  <button className="text-sm font-bold hover:underline">
                    Forgot Password?
                  </button>
                </div>
              )}

              <Button 
                onClick={handleEmailAuth}
                disabled={loading}
                className="w-full bg-[#FF42A5] hover:bg-[#FF1A8B] text-white border-2 border-black py-6 font-bold shadow-[4px_4px_0_#000] active:translate-y-1 active:translate-x-1 active:shadow-none transition-all uppercase tracking-widest text-lg"
                style={{ borderRadius: 0 }}
              >
                {loading ? 'Processing...' : (view === 'login' ? 'Login' : 'Sign Up')}
              </Button>
            </div>

            <div className="text-center text-sm font-bold">
              {view === 'login' ? "Don't have an account? " : "Already have an account? "}
              <button 
                onClick={() => setView(view === 'login' ? 'signup' : 'login')}
                className="text-[#FF42A5] hover:underline"
              >
                {view === 'login' ? 'Sign Up' : 'Login'}
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}