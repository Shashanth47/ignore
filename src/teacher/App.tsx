import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Feed from './components/Feed';
import Messages from './components/Messages';
import Profile from './components/Profile';
import Navigation from './components/Navigation';
import CreatePost from './components/CreatePost';
import { socketService } from '../services/socket';
import toast, { Toaster } from 'react-hot-toast';

function TeacherApp() {
  const [activeTab, setActiveTab] = useState('home');
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showDM, setShowDM] = useState(false);

  useEffect(() => {
    // Connect to socket as teacher
    socketService.connect('teacher', 'teacher-1');

    return () => {
      socketService.disconnect();
    };
  }, []);

  const handleCreatePost = () => {
    setShowCreatePost(true);
  };

  const handleOpenDM = () => {
    setShowDM(true);
  };

  const handleChatWithParents = () => {
    setActiveTab('chat');
    setShowDM(true);
  };

  const handleComingSoon = (featureName: string) => {
    toast.error(`${featureName} will be implemented soon!`, {
      duration: 3000,
      position: 'top-center',
      style: {
        background: '#f87171',
        color: 'white',
        fontWeight: 'bold',
        borderRadius: '12px',
        padding: '16px',
      },
    });
  };

  const handleCreatePostSubmit = (post: { content: string; images: string[]; tags: string[] }) => {
    console.log('New post created:', post);
    
    // Emit to socket for real-time updates
    socketService.emit('new_post', {
      ...post,
      id: Date.now().toString(),
      timestamp: new Date(),
      likes: 0,
      comments: [],
      studentIds: [],
      author: 'teacher'
    });
    
    setShowCreatePost(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="max-w-4xl mx-auto p-6 space-y-6">
            {/* Header with greeting */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl font-bold text-slate-700 flex items-center gap-2">
                  Hello Ms. Shreya Kapoor <span className="text-2xl">👋</span>
                </h1>
              </div>
              <button 
                onClick={() => setActiveTab('profile')}
                className="w-12 h-12 bg-gradient-to-r from-lavender-400 to-lavender-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
              >
                <span className="text-white font-bold text-lg">S</span>
              </button>
            </div>

            {/* Chat with Parents Card */}
            <button 
              onClick={handleChatWithParents}
              className="w-full bg-gradient-to-r from-lavender-100 to-lavender-200 rounded-3xl p-6 shadow-lg border border-lavender-200 overflow-hidden relative hover:shadow-xl hover:scale-105 transition-all duration-300 transform hover:from-lavender-200 hover:to-lavender-300 group"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <img 
                    src="/images/parents.png" 
                    alt="Parents illustration" 
                    className="w-full h-40 object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
              <div className="text-center mt-4">
                <h3 className="text-lg font-semibold text-slate-700 group-hover:text-slate-800 transition-colors duration-300">Chat with Parents</h3>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-lavender-200/20 to-transparent rounded-3xl group-hover:from-lavender-300/30 transition-all duration-300"></div>
            </button>

            {/* Two column cards */}
            <div className="grid grid-cols-2 gap-4">
              {/* Create Games Card */}
              <button 
                onClick={() => handleComingSoon('Create Games')}
                className="w-full bg-gradient-to-br from-mustard-100 to-mustard-200 rounded-3xl p-6 shadow-lg border border-mustard-200 overflow-hidden relative hover:shadow-xl hover:scale-105 transition-all duration-300 transform hover:from-mustard-200 hover:to-mustard-300 group"
              >
                <div className="flex items-center justify-center mb-4">
                  <img 
                    src="/images/bearwithgameconsole.png" 
                    alt="Bear with game console" 
                    className="w-24 h-24 object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-center text-lg font-semibold text-slate-700 group-hover:text-slate-800 transition-colors duration-300">Create Games</h3>
                <div className="absolute inset-0 bg-gradient-to-t from-mustard-200/20 to-transparent rounded-3xl group-hover:from-mustard-300/30 transition-all duration-300"></div>
              </button>

              {/* Create Worksheets Card */}
              <button 
                onClick={() => handleComingSoon('Create Worksheets')}
                className="w-full bg-gradient-to-br from-mint-100 to-mint-200 rounded-3xl p-6 shadow-lg border border-mint-200 overflow-hidden relative hover:shadow-xl hover:scale-105 transition-all duration-300 transform hover:from-mint-200 hover:to-mint-300 group"
              >
                <div className="flex items-center justify-center mb-4">
                  <img 
                    src="/images/catwithworksheet.png" 
                    alt="Cat with worksheet" 
                    className="w-24 h-24 object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-center text-lg font-semibold text-slate-700 group-hover:text-slate-800 transition-colors duration-300">Create Worksheets</h3>
                <div className="absolute inset-0 bg-gradient-to-t from-mint-200/20 to-transparent rounded-3xl group-hover:from-mint-300/30 transition-all duration-300"></div>
              </button>
            </div>

            {/* View Insights Card */}
            <button 
              onClick={() => handleComingSoon('View Insights')}
              className="w-full bg-gradient-to-r from-peach-100 to-peach-200 rounded-3xl p-6 shadow-lg border border-peach-200 overflow-hidden relative hover:shadow-xl hover:scale-105 transition-all duration-300 transform hover:from-peach-200 hover:to-peach-300 group"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <img 
                    src="/images/kidWithReport.png" 
                    alt="Kid with report" 
                    className="w-full h-40 object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
              <div className="text-center mt-4">
                <h3 className="text-lg font-semibold text-slate-700 group-hover:text-slate-800 transition-colors duration-300">View Insights</h3>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-peach-200/20 to-transparent rounded-3xl group-hover:from-peach-300/30 transition-all duration-300"></div>
            </button>
          </div>
        );
      case 'chat':
        return <Messages onClose={() => {}} onCreatePost={handleCreatePost} showDM={showDM} onCloseDM={() => setShowDM(false)} />;
      case 'profile':
        return <Profile />;
      default:
        return (
          <div className="max-w-4xl mx-auto p-6 space-y-6">
            {/* Header with greeting */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl font-bold text-slate-700 flex items-center gap-2">
                  Hello Ms. Shreya Kapoor <span className="text-2xl">👋</span>
                </h1>
              </div>
              <button 
                onClick={() => setActiveTab('profile')}
                className="w-12 h-12 bg-gradient-to-r from-lavender-400 to-lavender-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
              >
                <span className="text-white font-bold text-lg">S</span>
              </button>
            </div>

            {/* Chat with Parents Card */}
            <button 
              onClick={handleChatWithParents}
              className="w-full bg-gradient-to-r from-lavender-100 to-lavender-200 rounded-3xl p-6 shadow-lg border border-lavender-200 overflow-hidden relative hover:shadow-xl hover:scale-105 transition-all duration-300 transform hover:from-lavender-200 hover:to-lavender-300 group"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <img 
                    src="/images/parents.png" 
                    alt="Parents illustration" 
                    className="w-full h-40 object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
              <div className="text-center mt-4">
                <h3 className="text-lg font-semibold text-slate-700 group-hover:text-slate-800 transition-colors duration-300">Chat with Parents</h3>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-lavender-200/20 to-transparent rounded-3xl group-hover:from-lavender-300/30 transition-all duration-300"></div>
            </button>

            {/* Two column cards */}
            <div className="grid grid-cols-2 gap-4">
              {/* Create Games Card */}
              <button 
                onClick={() => handleComingSoon('Create Games')}
                className="w-full bg-gradient-to-br from-mustard-100 to-mustard-200 rounded-3xl p-6 shadow-lg border border-mustard-200 overflow-hidden relative hover:shadow-xl hover:scale-105 transition-all duration-300 transform hover:from-mustard-200 hover:to-mustard-300 group"
              >
                <div className="flex items-center justify-center mb-4">
                  <img 
                    src="/images/bearwithgameconsole.png" 
                    alt="Bear with game console" 
                    className="w-24 h-24 object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-center text-lg font-semibold text-slate-700 group-hover:text-slate-800 transition-colors duration-300">Create Games</h3>
                <div className="absolute inset-0 bg-gradient-to-t from-mustard-200/20 to-transparent rounded-3xl group-hover:from-mustard-300/30 transition-all duration-300"></div>
              </button>

              {/* Create Worksheets Card */}
              <button 
                onClick={() => handleComingSoon('Create Worksheets')}
                className="w-full bg-gradient-to-br from-mint-100 to-mint-200 rounded-3xl p-6 shadow-lg border border-mint-200 overflow-hidden relative hover:shadow-xl hover:scale-105 transition-all duration-300 transform hover:from-mint-200 hover:to-mint-300 group"
              >
                <div className="flex items-center justify-center mb-4">
                  <img 
                    src="/images/catwithworksheet.png" 
                    alt="Cat with worksheet" 
                    className="w-24 h-24 object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-center text-lg font-semibold text-slate-700 group-hover:text-slate-800 transition-colors duration-300">Create Worksheets</h3>
                <div className="absolute inset-0 bg-gradient-to-t from-mint-200/20 to-transparent rounded-3xl group-hover:from-mint-300/30 transition-all duration-300"></div>
              </button>
            </div>

            {/* View Insights Card */}
            <button 
              onClick={() => handleComingSoon('View Insights')}
              className="w-full bg-gradient-to-r from-peach-100 to-peach-200 rounded-3xl p-6 shadow-lg border border-peach-200 overflow-hidden relative hover:shadow-xl hover:scale-105 transition-all duration-300 transform hover:from-peach-200 hover:to-peach-300 group"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <img 
                    src="/images/kidWithReport.png" 
                    alt="Kid with report" 
                    className="w-full h-40 object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
              <div className="text-center mt-4">
                <h3 className="text-lg font-semibold text-slate-700 group-hover:text-slate-800 transition-colors duration-300">View Insights</h3>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-peach-200/20 to-transparent rounded-3xl group-hover:from-peach-300/30 transition-all duration-300"></div>
            </button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-peach-50 flex flex-col">
      <Header activeTab={activeTab} onCreatePost={handleCreatePost} onOpenDM={handleOpenDM} />
      
      <main className="flex-1 pb-20">
        {renderContent()}
      </main>

      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      {showCreatePost && (
        <CreatePost 
          onClose={() => setShowCreatePost(false)}
          onSubmit={handleCreatePostSubmit}
        />
      )}
      
      <Toaster />
    </div>
  );
}

export default TeacherApp;