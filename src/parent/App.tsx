import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Feed from './components/Feed';
import Messages from './components/Messages';
import Profile from './components/Profile';
import Navigation from './components/Navigation';
import { socketService } from '../services/socket';

function ParentApp() {
  const [activeTab, setActiveTab] = useState('home');
  const [showDM, setShowDM] = useState(false);

  useEffect(() => {
    // Connect to socket as parent
    socketService.connect('parent', 'parent-1');

    return () => {
      socketService.disconnect();
    };
  }, []);

  const handleOpenDM = () => {
    setShowDM(true);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="max-w-4xl mx-auto p-6 flex items-center justify-center min-h-[70vh]">
            <div className="text-center">
              <div className="w-40 h-40 bg-peach-100 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg">
                <span className="text-7xl">🌈</span>
              </div>
              <h2 className="text-3xl font-bold text-slate-700 mb-3">Welcome to Rainbow Preschool</h2>
              <p className="text-slate-500 text-lg">Stay connected with your child's learning journey ✨</p>
            </div>
          </div>
        );
      case 'chat':
        return <Messages onClose={() => {}} showDM={showDM} onCloseDM={() => setShowDM(false)} />;
      case 'profile':
        return <Profile />;
      default:
        return (
          <div className="max-w-4xl mx-auto p-6 flex items-center justify-center min-h-[70vh]">
            <div className="text-center">
              <div className="w-40 h-40 bg-peach-100 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg">
                <span className="text-7xl">🌈</span>
              </div>
              <h2 className="text-3xl font-bold text-slate-700 mb-3">Welcome to Rainbow Preschool</h2>
              <p className="text-slate-500 text-lg">Stay connected with your child's learning journey ✨</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-peach-50 flex flex-col">
      <Header activeTab={activeTab} onOpenDM={handleOpenDM} />
      
      <main className="flex-1 pb-20">
        {renderContent()}
      </main>

      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}

export default ParentApp;