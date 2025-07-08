import React, { useState } from 'react';
import TeacherApp from './teacher/App';
import ParentApp from './parent/App';

function App() {
  const [userType, setUserType] = useState<'teacher' | 'parent' | null>(null);

  if (!userType) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-coral-100 via-peach-100 to-lavender-100 flex items-center justify-center p-4">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-10 max-w-md w-full border border-white/20">
          <div className="text-center mb-10">
            <div className="w-28 h-28 bg-gradient-to-br from-coral-200 to-peach-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
              <img src="/tibzee-logo.png" alt="Tibzee Logo" className="w-22 h-22" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-coral-500 to-peach-500 bg-clip-text text-transparent mb-3">Tibzee</h1>
            <p className="text-slate-600 text-base">Choose your role to continue</p>
          </div>
          
          <div className="space-y-5">
            <button
              onClick={() => setUserType('teacher')}
              className="w-full p-5 bg-gradient-to-r from-coral-400 to-peach-400 hover:from-coral-500 hover:to-peach-500 text-white rounded-3xl font-bold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 border border-coral-300"
            >
              I'm a Teacher
            </button>
            <button
              onClick={() => setUserType('parent')}
              className="w-full p-5 bg-gradient-to-r from-lavender-400 to-lavender-500 hover:from-lavender-500 hover:to-lavender-600 text-white rounded-3xl font-bold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 border border-lavender-300"
            >
              I'm a Parent
            </button>
          </div>
        </div>
      </div>
    );
  }
  return userType === 'teacher' ? <TeacherApp /> : <ParentApp />;
}

export default App;