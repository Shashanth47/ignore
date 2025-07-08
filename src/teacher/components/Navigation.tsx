import React from 'react';
import { Home, MessageCircle, User } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home, color: 'bg-peach-400' },
    { id: 'chat', label: 'Feed', icon: MessageCircle, color: 'bg-lavender-400' },
    { id: 'profile', label: 'Profile', icon: User, color: 'bg-mint-400' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t-2 border-lavender-200 shadow-xl z-30">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-around py-3">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex flex-col items-center py-2 px-6 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? tab.color + ' text-white transform scale-105' 
                    : 'text-slate-600 hover:text-slate-800 hover:bg-lavender-50'
                }`}
              >
                <Icon size={22} />
                <span className="text-xs mt-1.5 font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;