import React, { useState, useEffect } from 'react';
import { Settings, Bell, HelpCircle, LogOut, User, Mail, Phone, Calendar, Download, Share2, Edit3, Shield, Baby, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { getTeacherInfoForParent } from '../../firebase/classService';
import { Teacher } from '../../types';

const Profile: React.FC = () => {
  const { userData, user } = useAuth();
  const [showSettingsOverlay, setShowSettingsOverlay] = useState(false);
  const [teacherInfo, setTeacherInfo] = useState<Teacher | null>(null);

  useEffect(() => {
    const fetchTeacherInfo = async () => {
      if (!user?.uid) return;
      
      try {
        const teacher = await getTeacherInfoForParent(user.uid);
        setTeacherInfo(teacher);
      } catch (error) {
        console.error('Error fetching teacher info:', error);
      }
    };

    fetchTeacherInfo();
  }, [user?.uid]);
  const handleNotifications = () => {
    alert('Opening notification settings...');
  };

  const handleAccountSettings = () => {
    alert('Opening account settings...');
  };

  const handleHelp = () => {
    alert('Opening help center...');
  };

  const handleSignOut = () => {
    if (confirm('Are you sure you want to sign out?')) {
      alert('Signing out...');
    }
  };

  const handleEditProfile = () => {
    alert('Opening profile editor...');
  };

  const handleDownloadReport = () => {
    alert(`Downloading ${userData?.kidsName || 'your child'}\'s progress report...`);
  };

  const handleShareProfile = () => {
    alert('Sharing profile...');
  };

  const handlePrivacySettings = () => {
    alert('Opening privacy settings...');
  };

  const handleChildProgress = () => {
    alert(`Opening ${userData?.kidsName || 'your child'}\'s progress tracker...`);
  };

  return (
    <div className="min-h-screen bg-peach-50">
      <div className="max-w-4xl mx-auto p-6">
        {/* Profile Header */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-6 border border-lavender-100">
          <div className="flex items-center space-x-6">
            <div className="w-24 h-24 bg-mint-400 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white text-4xl">👤</span>
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-slate-700 mb-2">{userData?.parentName || 'Parent'}</h1>
              <p className="text-slate-600 mb-1">{userData?.kidsName ? `${userData.kidsName}'s Parent` : 'Parent'}</p>
              <p className="text-slate-500 text-sm">Little Harvard • Class {userData?.classCode || 'N/A'}</p>
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={handleEditProfile}
                className="p-3 bg-lavender-100 hover:bg-lavender-200 rounded-2xl transition-colors duration-200"
              >
                <Edit3 size={20} className="text-lavender-600" />
              </button>
              <button 
                onClick={handleShareProfile}
                className="p-3 bg-mint-100 hover:bg-mint-200 rounded-2xl transition-colors duration-200"
              >
                <Share2 size={20} className="text-mint-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Child Information */}
        <div className="bg-white rounded-3xl shadow-xl p-6 mb-6 border border-lavender-100">
          <h2 className="text-xl font-bold text-slate-700 mb-4">{userData?.kidsName || 'Child'}'s Information</h2>
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-peach-400 rounded-full flex items-center justify-center shadow-md">
              <span className="text-white text-2xl">👧</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-700">{userData?.kidsName || 'Child'}</h3>
              <p className="text-slate-500">Little Harvard Student • Class {userData?.classCode || 'N/A'}</p>
              <p className="text-slate-500 text-sm">Teacher: {teacherInfo?.teacherName || 'Ms. Little Harvard'}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-peach-50 rounded-2xl shadow-sm">
              <div className="text-2xl font-bold text-coral-600">95%</div>
              <div className="text-sm text-slate-600">Attendance</div>
            </div>
            <div className="text-center p-4 bg-mint-50 rounded-2xl shadow-sm">
              <div className="text-2xl font-bold text-teal-600">A+</div>
              <div className="text-sm text-slate-600">Behavior</div>
            </div>
            <div className="text-center p-4 bg-mustard-50 rounded-2xl shadow-sm">
              <div className="text-2xl font-bold text-mustard-600">12</div>
              <div className="text-sm text-slate-600">Activities</div>
            </div>
            <div className="text-center p-4 bg-lavender-50 rounded-2xl shadow-sm">
              <div className="text-2xl font-bold text-lavender-600">4.9</div>
              <div className="text-sm text-slate-600">Progress</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-3xl shadow-xl p-6 mb-6 border border-lavender-100">
          <h2 className="text-xl font-bold text-slate-700 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <button 
              onClick={handleChildProgress}
              className="flex flex-col items-center p-4 bg-peach-50 rounded-2xl hover:shadow-md transition-all duration-200"
            >
              <div className="w-12 h-12 bg-peach-400 rounded-full flex items-center justify-center mb-3 shadow-md">
                <Baby size={20} className="text-white" />
              </div>
              <span className="text-sm font-medium text-slate-700">{userData?.kidsName || 'Child'}'s Progress</span>
            </button>
            
            <button 
              onClick={handleDownloadReport}
              className="flex flex-col items-center p-4 bg-mint-50 rounded-2xl hover:shadow-md transition-all duration-200"
            >
              <div className="w-12 h-12 bg-mint-400 rounded-full flex items-center justify-center mb-3 shadow-md">
                <Download size={20} className="text-white" />
              </div>
              <span className="text-sm font-medium text-slate-700">Download Report</span>
            </button>
            
            <button 
              onClick={handlePrivacySettings}
              className="flex flex-col items-center p-4 bg-lavender-50 rounded-2xl hover:shadow-md transition-all duration-200"
            >
              <div className="w-12 h-12 bg-lavender-400 rounded-full flex items-center justify-center mb-3 shadow-md">
                <Shield size={20} className="text-white" />
              </div>
              <span className="text-sm font-medium text-slate-700">Privacy</span>
            </button>
            
            <button 
              onClick={() => setShowSettingsOverlay(true)}
              className="flex flex-col items-center p-4 bg-coral-50 rounded-2xl hover:shadow-md transition-all duration-200"
            >
              <div className="w-12 h-12 bg-coral-400 rounded-full flex items-center justify-center mb-3 shadow-md">
                <Settings size={20} className="text-white" />
              </div>
              <span className="text-sm font-medium text-slate-700">Settings</span>
            </button>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-3xl shadow-xl p-6 mb-6 border border-lavender-100">
          <h2 className="text-xl font-bold text-slate-700 mb-4">Contact Information</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-coral-100 rounded-full flex items-center justify-center">
                <Mail size={18} className="text-coral-600" />
              </div>
              <div>
                <p className="font-medium text-slate-700">{user?.email || 'No email'}</p>
                <p className="text-sm text-slate-500">Primary Email</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-mint-100 rounded-full flex items-center justify-center">
                <Phone size={18} className="text-mint-600" />
              </div>
              <div>
                <p className="font-medium text-slate-700">Contact your teacher</p>
                <p className="text-sm text-slate-500">Primary Phone</p>
              </div>
            </div>
          </div>
        </div>

      </div>
      
      {/* Settings Overlay */}
      {showSettingsOverlay && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl shadow-xl p-6 w-full max-w-md mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-700">Settings</h2>
              <button 
                onClick={() => setShowSettingsOverlay(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={24} className="text-gray-600" />
              </button>
            </div>
            
            <div className="space-y-2">
              <button 
                onClick={handleNotifications}
                className="w-full flex items-center space-x-3 p-4 hover:bg-lavender-50 rounded-2xl transition-colors duration-200"
              >
                <div className="w-10 h-10 bg-coral-100 rounded-full flex items-center justify-center">
                  <Bell size={18} className="text-coral-600" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium text-slate-700">Notifications</p>
                  <p className="text-sm text-slate-500">Manage notification preferences</p>
                </div>
              </button>
              
              <button 
                onClick={handleAccountSettings}
                className="w-full flex items-center space-x-3 p-4 hover:bg-lavender-50 rounded-2xl transition-colors duration-200"
              >
                <div className="w-10 h-10 bg-lavender-100 rounded-full flex items-center justify-center">
                  <User size={18} className="text-lavender-600" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium text-slate-700">Account Settings</p>
                  <p className="text-sm text-slate-500">Update your profile information</p>
                </div>
              </button>
              
              <button 
                onClick={handleHelp}
                className="w-full flex items-center space-x-3 p-4 hover:bg-lavender-50 rounded-2xl transition-colors duration-200"
              >
                <div className="w-10 h-10 bg-mint-100 rounded-full flex items-center justify-center">
                  <HelpCircle size={18} className="text-mint-600" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium text-slate-700">Help & Support</p>
                  <p className="text-sm text-slate-500">Get help and contact support</p>
                </div>
              </button>
              
              <button 
                onClick={handleSignOut}
                className="w-full flex items-center space-x-3 p-4 hover:bg-red-50 rounded-2xl transition-colors duration-200"
              >
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <LogOut size={18} className="text-red-500" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium text-slate-700">Sign Out</p>
                  <p className="text-sm text-slate-500">Sign out of your account</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
