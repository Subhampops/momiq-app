import { MessageCircle } from 'lucide-react';
import { Button } from './ui/button';

interface FloatingAIButtonProps {
  onClick: () => void;
}

export function FloatingAIButton({ onClick }: FloatingAIButtonProps) {
  return (
    <Button
      onClick={onClick}
      className="fixed bottom-24 right-4 sm:bottom-6 sm:right-6 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white shadow-2xl z-40 p-0 transition-transform hover:scale-110"
      aria-label="Open AI Doctor Chat"
    >
      <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7" />
    </Button>
  );
}
