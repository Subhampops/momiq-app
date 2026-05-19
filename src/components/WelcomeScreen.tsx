import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Logo } from './Logo';
import motherBabyImg from 'figma:asset/3bbf4e530edc9e71e50d9fbcb3a5c9ff197b89c7.png';

interface WelcomeScreenProps {
  onLogin: () => void;
  onSignup: () => void;
  onContinueWithoutSigning: () => void;
}

export function WelcomeScreen({ onLogin, onSignup, onContinueWithoutSigning }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-pink-50 flex items-center justify-center p-4 animate-in fade-in duration-700">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left side - Welcome content */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-6">
            <div className="mb-4">
              <Logo />
            </div>
            
            <div className="space-y-4">
              <h1 className="text-pink-600">
                Welcome to MomiQ
              </h1>
              <p className="text-muted-foreground max-w-md">
                Your trusted companion throughout pregnancy and motherhood journey. Track your pregnancy, connect with experts, and join a supportive community.
              </p>
            </div>

            {/* Auth options */}
            <Card className="w-full max-w-md mt-8 border-pink-100">
              <CardContent className="pt-6 space-y-3">
                <Button 
                  className="w-full bg-pink-500 hover:bg-pink-600 text-white"
                  size="lg"
                  onClick={onSignup}
                >
                  Sign Up
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full border-pink-200 hover:bg-pink-50"
                  size="lg"
                  onClick={onLogin}
                >
                  Login
                </Button>
                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-white px-4 text-muted-foreground">or</span>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  className="w-full text-pink-600 hover:text-pink-700 hover:bg-pink-50"
                  onClick={onContinueWithoutSigning}
                >
                  Continue without signing in
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right side - Image */}
          <div className="hidden md:block">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-200/30 to-pink-300/30 rounded-3xl transform rotate-3"></div>
              <img
                src={motherBabyImg}
                alt="Mother with baby"
                className="relative rounded-3xl shadow-2xl w-full h-auto object-cover aspect-[3/4]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}