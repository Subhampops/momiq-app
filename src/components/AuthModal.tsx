import { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

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

  // Auto-focus on first input when modal opens
  useEffect(() => {
    if (open && autoFocus) {
      // Small delay to ensure the modal is fully rendered
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
  }, [defaultView]);

  const handleAuthAction = () => {
    // Simulate successful authentication
    if (onSuccess) {
      onSuccess();
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-neutral-50 border-0 p-0">
        <DialogTitle className="sr-only">
          {view === 'login' ? 'Login to MomiQ' : 'Sign Up for MomiQ'}
        </DialogTitle>
        <DialogDescription className="sr-only">
          {view === 'login' 
            ? 'Enter your credentials to login to your MomiQ account' 
            : 'Create a new account to get started with MomiQ'}
        </DialogDescription>
        <div className="p-8">
          {view === 'login' ? (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-2xl">Welcome Back</h2>
                <p className="text-foreground/60">Login to continue to MomiQ</p>
              </div>

              <div className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full bg-white hover:bg-neutral-100 border-neutral-300 rounded-full py-6"
                >
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continue with Google
                </Button>

                <Button 
                  variant="outline" 
                  className="w-full bg-white hover:bg-neutral-100 border-neutral-300 rounded-full py-6"
                >
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                  </svg>
                  Continue with Apple
                </Button>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-neutral-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-neutral-50 text-foreground/60">or</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input 
                    ref={emailInputRef}
                    id="login-email"
                    type="email" 
                    placeholder="Enter your email"
                    className="rounded-full bg-white border-neutral-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <Input 
                    id="login-password"
                    type="password" 
                    placeholder="Enter your password"
                    className="rounded-full bg-white border-neutral-300"
                  />
                </div>

                <div className="text-right">
                  <button className="text-sm text-pink-500 hover:text-pink-600">
                    Forgot Password?
                  </button>
                </div>

                <Button className="w-full bg-pink-400 hover:bg-pink-500 text-white rounded-full py-6" onClick={handleAuthAction}>
                  Login
                </Button>
              </div>

              <div className="text-center text-sm text-foreground/60">
                Don&apos;t have an account?{' '}
                <button 
                  onClick={() => setView('signup')}
                  className="text-pink-500 hover:text-pink-600"
                >
                  Sign Up
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-2xl">Create Account</h2>
                <p className="text-foreground/60">Join MomiQ today</p>
              </div>

              <div className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full bg-white hover:bg-neutral-100 border-neutral-300 rounded-full py-6"
                >
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continue with Google
                </Button>

                <Button 
                  variant="outline" 
                  className="w-full bg-white hover:bg-neutral-100 border-neutral-300 rounded-full py-6"
                >
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                  </svg>
                  Continue with Apple
                </Button>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-neutral-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-neutral-50 text-foreground/60">or</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name">Name</Label>
                  <Input 
                    ref={nameInputRef}
                    id="signup-name"
                    type="text" 
                    placeholder="Enter your name"
                    className="rounded-full bg-white border-neutral-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input 
                    id="signup-email"
                    type="email" 
                    placeholder="Enter your email"
                    className="rounded-full bg-white border-neutral-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input 
                    id="signup-password"
                    type="password" 
                    placeholder="Create a password"
                    className="rounded-full bg-white border-neutral-300"
                  />
                </div>

                <Button className="w-full bg-pink-400 hover:bg-pink-500 text-white rounded-full py-6" onClick={handleAuthAction}>
                  Sign Up
                </Button>
              </div>

              <div className="text-center text-sm text-foreground/60">
                Already have an account?{' '}
                <button 
                  onClick={() => setView('login')}
                  className="text-pink-500 hover:text-pink-600"
                >
                  Login
                </button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}