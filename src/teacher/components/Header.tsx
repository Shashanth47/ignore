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
      <header className="bg-white/90 backdrop-blur-md sticky top-0 z-40 border-b border-teal-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-teal-700">
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
    <header className="bg-white sticky top-0 z-40 shadow-xl border-b border-teal-200">
      <div className="max-w-4xl mx-auto px-6 py-4">
        <div className="flex items-center justify-center">
          <div className="text-center flex items-center gap-4">
            <div className="w-12 h-12 bg-peach-100 rounded-full flex items-center justify-center">
              <img src="/little_harvard.png" alt="Little Harvard Logo" className="w-10 h-10 rounded-full" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-teal-700">
                Little Harvard
              </h1>
              <p className="text-sm text-teal-600 font-medium">
                Early Education
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;