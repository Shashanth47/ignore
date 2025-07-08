import React from 'react';
import { MessageCircle } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  onOpenDM?: () => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, onOpenDM }) => {
  if (activeTab === 'chat') {
    return (
      <header className="bg-white/90 backdrop-blur-md sticky top-0 z-40 border-b border-lavender-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-coral-500">
                Class Updates
              </h1>
            </div>
            
            <div className="flex items-center space-x-3">
              <button 
                onClick={onOpenDM}
                className="bg-lavender-400 hover:bg-lavender-500 text-white p-3 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                <MessageCircle size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-white/90 backdrop-blur-md sticky top-0 z-40 border-b border-lavender-200 shadow-sm">
      <div className="max-w-4xl mx-auto px-6 py-4">
        <div className="flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-coral-500">
              Rainbow Preschool
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;