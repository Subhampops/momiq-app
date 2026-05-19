import { PhoneCall } from 'lucide-react';
import { Button } from './ui/button';

export function EmergencyButton() {
  const handleEmergencyCall = () => {
    // In a real app, this would trigger emergency services
    alert('Emergency services: 911\n\nDoctor: (555) 123-4567\n\nThis would call your emergency contact in a production app.');
  };

  return (
    <Button
      onClick={handleEmergencyCall}
      className="fixed bottom-24 left-4 sm:bottom-6 sm:left-6 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-red-500 hover:bg-red-600 text-white shadow-2xl z-40 p-0 transition-transform hover:scale-110 animate-pulse"
      aria-label="Emergency Call"
    >
      <PhoneCall className="w-6 h-6 sm:w-7 sm:h-7" />
    </Button>
  );
}
