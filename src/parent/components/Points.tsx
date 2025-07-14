import React, { useState, useEffect } from 'react';
import { Star, Award, TrendingUp, Calendar, Trophy, Gift } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { getPointsTransactionsForStudent } from '../../firebase/classService';
import { PointsTransaction } from '../../types';
import toast from 'react-hot-toast';

const Points: React.FC = () => {
  const { userData } = useAuth();
  const [transactions, setTransactions] = useState<PointsTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPoints, setTotalPoints] = useState(0);

  useEffect(() => {
    const fetchPoints = async () => {
      if (!userData?.id) return;
      
      try {
        const studentId = `student-${userData.id}`;
        const pointsData = await getPointsTransactionsForStudent(studentId);
        setTransactions(pointsData);
        
        // Calculate total points
        const total = pointsData.reduce((sum, transaction) => sum + transaction.points, 0);
        setTotalPoints(total);
      } catch (error) {
        console.error('Error fetching points:', error);
        toast.error('Failed to load points');
      } finally {
        setLoading(false);
      }
    };

    fetchPoints();
  }, [userData?.id]);

  const getPointsColor = (points: number) => {
    if (points >= 10) return 'text-yellow-600 bg-yellow-50';
    if (points >= 5) return 'text-orange-600 bg-orange-50';
    if (points >= 3) return 'text-green-600 bg-green-50';
    return 'text-blue-600 bg-blue-50';
  };

  const getPointsIcon = (points: number) => {
    if (points >= 10) return <Trophy className="w-5 h-5" />;
    if (points >= 5) return <Gift className="w-5 h-5" />;
    return <Star className="w-5 h-5" />;
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-32 bg-gray-200 rounded-3xl mb-6"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded-2xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-mint-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Star className="w-10 h-10 text-mint-600" />
        </div>
        <h1 className="text-3xl font-bold text-slate-700 mb-2">
          {userData?.kidsName}'s Points
        </h1>
        <p className="text-slate-600">Track your child's achievements and rewards</p>
      </div>

      {/* Points Summary */}
      <div className="bg-white rounded-3xl shadow-xl p-8 mb-6 border border-lavender-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-mint-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Star className="w-8 h-8 text-mint-600" />
            </div>
            <div className="text-3xl font-bold text-mint-600 mb-1">{totalPoints}</div>
            <div className="text-sm text-slate-600">Total Points</div>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-coral-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Award className="w-8 h-8 text-coral-600" />
            </div>
            <div className="text-3xl font-bold text-coral-600 mb-1">{transactions.length}</div>
            <div className="text-sm text-slate-600">Achievements</div>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-lavender-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-8 h-8 text-lavender-600" />
            </div>
            <div className="text-3xl font-bold text-lavender-600 mb-1">
              {transactions.length > 0 ? Math.round(totalPoints / transactions.length) : 0}
            </div>
            <div className="text-sm text-slate-600">Avg Points</div>
          </div>
        </div>
      </div>

      {/* Points History */}
      <div className="bg-white rounded-3xl shadow-xl p-6 border border-lavender-100">
        <h2 className="text-xl font-bold text-slate-700 mb-4">Recent Achievements</h2>
        
        {transactions.length === 0 ? (
          <div className="text-center py-12">
            <Star className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-500 mb-2">No points yet</h3>
            <p className="text-gray-400">
              Your child will earn points for good behavior and achievements!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center space-x-4 p-4 bg-gradient-to-r from-peach-50 to-lavender-50 rounded-2xl border border-lavender-100">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getPointsColor(transaction.points)}`}>
                  {getPointsIcon(transaction.points)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-slate-700">{transaction.reason}</h3>
                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPointsColor(transaction.points)}`}>
                        +{transaction.points} points
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-500">
                      {formatDate(transaction.timestamp)}
                    </span>
                    <span className="text-sm text-slate-400">•</span>
                    <span className="text-sm text-slate-500">
                      By {transaction.teacherName}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Rewards Section */}
      <div className="bg-white rounded-3xl shadow-xl p-6 border border-lavender-100">
        <h2 className="text-xl font-bold text-slate-700 mb-4">Rewards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gradient-to-r from-mustard-50 to-peach-50 rounded-2xl border border-mustard-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-mustard-100 rounded-full flex items-center justify-center">
                <Gift className="w-5 h-5 text-mustard-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-700">Small Reward</h3>
                <p className="text-sm text-slate-500">Unlock at 25 points</p>
              </div>
            </div>
            <div className="mt-3">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-mustard-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min((totalPoints / 25) * 100, 100)}%` }}
                ></div>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {Math.max(0, 25 - totalPoints)} points to go
              </p>
            </div>
          </div>

          <div className="p-4 bg-gradient-to-r from-mint-50 to-teal-50 rounded-2xl border border-mint-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-mint-100 rounded-full flex items-center justify-center">
                <Trophy className="w-5 h-5 text-mint-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-700">Big Reward</h3>
                <p className="text-sm text-slate-500">Unlock at 50 points</p>
              </div>
            </div>
            <div className="mt-3">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-mint-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min((totalPoints / 50) * 100, 100)}%` }}
                ></div>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {Math.max(0, 50 - totalPoints)} points to go
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Points;
