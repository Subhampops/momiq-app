import { Home, Calendar, Heart, Baby, User } from 'lucide-react';

interface BottomNavProps {
  activeTab: 'dashboard' | 'calendar' | 'health' | 'baby' | 'profile';
  onNavigate: (tab: 'dashboard' | 'calendar' | 'health' | 'baby' | 'profile') => void;
}

export function BottomNav({ activeTab, onNavigate }: BottomNavProps) {
  const navItems = [
    { id: 'dashboard' as const, icon: Home, label: 'Dashboard' },
    { id: 'calendar' as const, icon: Calendar, label: 'Calendar' },
    { id: 'health' as const, icon: Heart, label: 'Health' },
    { id: 'baby' as const, icon: Baby, label: 'Baby' },
    { id: 'profile' as const, icon: User, label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-foreground/10 shadow-lg z-50 safe-area-bottom">
      <div className="container mx-auto px-2 sm:px-4 max-w-4xl">
        <div className="flex justify-around items-center h-16 sm:h-20">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex flex-col items-center justify-center gap-1 px-3 sm:px-4 py-2 rounded-2xl transition-all duration-200 min-w-[60px] sm:min-w-[80px] ${
                  isActive
                    ? 'text-pink-500 bg-pink-50'
                    : 'text-foreground/60 hover:text-foreground hover:bg-gray-50'
                }`}
                aria-label={item.label}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon className={`w-5 h-5 sm:w-6 sm:h-6 transition-transform ${isActive ? 'scale-110' : ''}`} />
                <span className="text-xs">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
