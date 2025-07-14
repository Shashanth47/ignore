import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Feed from './components/Feed';
import Messages from './components/Messages';
import Profile from './components/Profile';
import Navigation from './components/Navigation';
import { socketService } from '../services/socket';
import { useAuth } from '../contexts/AuthContext';
import { getPointsTransactionsForStudent } from '../firebase/classService';
import { PointsTransaction } from '../types';
import { Star, Award, TrendingUp, Calendar, Trophy, Gift } from 'lucide-react';
import toast from 'react-hot-toast';

function ParentApp() {
  const [activeTab, setActiveTab] = useState('home');
  const [showDM, setShowDM] = useState(false);
  const { userData, user } = useAuth();
  const [pointsTransactions, setPointsTransactions] = useState<PointsTransaction[]>([]);
  const [totalPoints, setTotalPoints] = useState(0);
  const [loadingPoints, setLoadingPoints] = useState(true);

  useEffect(() => {
    if (user?.uid) {
      // Connect to socket as parent
      socketService.connect('parent', user.uid);
    }

    return () => {
      socketService.disconnect();
    };
  }, [user?.uid]);

  useEffect(() => {
    const fetchPoints = async () => {
      if (!userData?.id) return;
      
      try {
        const studentId = `student-${userData.id}`;
        const pointsData = await getPointsTransactionsForStudent(studentId);
        setPointsTransactions(pointsData);
        
        // Calculate total points
        const total = pointsData.reduce((sum, transaction) => sum + transaction.points, 0);
        setTotalPoints(total);
      } catch (error) {
        console.error('Error fetching points:', error);
      } finally {
        setLoadingPoints(false);
      }
    };

    fetchPoints();
  }, [userData?.id]);

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
                <img src="/little_harvard.png" alt="Little Harvard Logo" className="w-32 h-32 rounded-2xl" />
              </div>
              <h2 className="text-3xl font-bold text-slate-700 mb-3">Welcome to Little Harvard</h2>
              <p className="text-teal-600 text-lg font-medium mb-1">Early Education</p>
              {userData?.parentName && (
                <p className="text-slate-600 text-lg font-medium mb-1">Hello, {userData.parentName}!</p>
              )}
              <p className="text-slate-500 text-lg">Stay connected with your child's learning journey ✨</p>
            </div>
          </div>
        );
      case 'chat':
        return <Messages onClose={() => {}} showDM={showDM} onCloseDM={() => setShowDM(false)} />;
      case 'points':
        return <Points />;
      case 'profile':
        return <Profile />;
      default:
        return (
          <div className="max-w-4xl mx-auto p-6 flex items-center justify-center min-h-[70vh]">
            <div className="text-center">
              <div className="w-40 h-40 bg-peach-100 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg">
                <img src="/little_harvard.png" alt="Little Harvard Logo" className="w-32 h-32 rounded-2xl" />
              </div>
              <h2 className="text-3xl font-bold text-slate-700 mb-3">Welcome to Little Harvard</h2>
              <p className="text-teal-600 text-lg font-medium mb-1">Early Education</p>
              {userData?.parentName && (
                <p className="text-slate-600 text-lg font-medium mb-1">Hello, {userData.parentName}!</p>
              )}
              <p className="text-slate-500 text-lg">Stay connected with your child's learning journey ✨</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-peach-50 flex flex-col">
      <Header activeTab={activeTab} onOpenDM={handleOpenDM} userData={userData} />
      
      <main className="flex-1 pb-20">
        {renderContent()}
      </main>

      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}

export default ParentApp;