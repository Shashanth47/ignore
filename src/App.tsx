import React, { useState } from 'react';
import TeacherApp from './teacher/App';
import ParentApp from './parent/App';
import ParentAuth from './components/ParentAuth';
import TeacherAuth from './components/TeacherAuth';
import { useAuth } from './contexts/AuthContext';
import { Toaster } from 'react-hot-toast';

function App() {
  const { user, userType, loading } = useAuth();
  const [selectedUserType, setSelectedUserType] = useState<'teacher' | 'parent' | null>(null);

  if (loading) {
    return (
      <div className="min-h-screen bg-peach-25 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  if (!user) {
    if (selectedUserType === 'teacher') {
      return <TeacherAuth onAuthSuccess={() => {}} />;
    }
    if (selectedUserType === 'parent') {
      return <ParentAuth onAuthSuccess={() => {}} />;
    }

    return (
      <div className="min-h-screen bg-peach-25 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full border border-peach-100">
          <div className="text-center mb-10">
            <div className="w-32 h-32 bg-peach-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <img src="/little_harvard.png" alt="Little Harvard Logo" className="w-28 h-28 rounded-full" />
            </div>
            <h1 className="text-4xl font-bold text-teal-700 mb-2">Little Harvard</h1>
            <p className="text-teal-600 text-lg font-medium mb-1">Early Education</p>
            <p className="text-slate-600 text-sm">Choose your role to continue</p>
          </div>
          
          <div className="space-y-4">
            <button
              onClick={() => setSelectedUserType('teacher')}
              className="w-full p-5 bg-teal-500 hover:bg-teal-600 text-white rounded-2xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              I'm a Teacher
            </button>
            <button
              onClick={() => setSelectedUserType('parent')}
              className="w-full p-5 bg-peach-400 hover:bg-peach-500 text-white rounded-2xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              I'm a Parent
            </button>
          </div>
        </div>
        <Toaster />
      </div>
    );
  }

  return (
    <>
      {userType === 'teacher' ? <TeacherApp /> : <ParentApp />}
      <Toaster />
    </>
  );
}

export default App;
