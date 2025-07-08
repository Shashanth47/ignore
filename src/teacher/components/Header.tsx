import React from 'react';
import { Plus, MessageCircle } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  onCreatePost: () => void;
  onOpenDM?: () => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, onCreatePost, onOpenDM }) => {
  if (activeTab === 'chat') {
    return (
      <header className="bg-white/90 backdrop-blur-md sticky top-0 z-40 border-b border-lavender-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-coral-500">
                Class Feed
              </h1>
            </div>
            
            <div className="flex items-center space-x-3">
              <button 
                onClick={onCreatePost}
                className="bg-mustard-400 hover:bg-mustard-500 text-white p-3 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                <Plus size={20} />
              </button>
              
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
    <header className="bg-white sticky top-0 z-40 shadow-xl border-b border-lavender-200 overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-coral-200/30 to-peach-200/30 rounded-full -translate-x-16 -translate-y-8 animate-pulse"></div>
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-lavender-200/30 to-mint-200/30 rounded-full translate-x-12 -translate-y-4 animate-pulse delay-1000"></div>
      <div className="absolute bottom-0 left-1/2 w-20 h-20 bg-gradient-to-br from-mustard-200/30 to-coral-200/30 rounded-full -translate-x-8 translate-y-4 animate-pulse delay-500"></div>
      
      <div className="max-w-4xl mx-auto px-6 py-4 relative">
        <div className="flex items-center justify-center">
          <div className="text-center">
            {/* Beautiful gradient text */}
            <h1 className="text-2xl font-bold bg-gradient-to-r from-coral-500 via-peach-500 to-lavender-500 bg-clip-text text-transparent drop-shadow-sm">
              Rainbow Preschool
            </h1>
            
            {/* Decorative subtitle */}
            <p className="text-sm text-slate-600 mt-1 font-medium opacity-80">
              Where Learning Comes Alive ✨
            </p>
          </div>
        </div>
      </div>
      
      {/* Bottom decorative border */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-coral-300 via-peach-300 via-lavender-300 via-mint-300 to-mustard-300"></div>
    </header>
  );
};

export default Header;