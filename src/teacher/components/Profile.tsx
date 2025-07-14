import React, { useState, useEffect } from 'react';
import { Settings, Bell, HelpCircle, LogOut, User, Mail, Phone, Calendar, Download, Share2, Edit3, Shield, Copy, Users, Book, X } from 'lucide-react';
import { getTeacherClassCode, getParentsForTeacher } from '../../firebase/classService';
import { useAuth } from '../../contexts/AuthContext';
import { Parent } from '../../types';
import toast from 'react-hot-toast';

const Profile: React.FC = () => {
  const { user, userData } = useAuth();
  const [showSettingsOverlay, setShowSettingsOverlay] = useState(false);
  const [showEnrolledOverlay, setShowEnrolledOverlay] = useState(false);
  const [classCode, setClassCode] = useState('');
  const [parents, setParents] = useState<Parent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeacherData = async () => {
      if (!user?.uid) return;
      
      try {
        const code = await getTeacherClassCode(user.uid);
        setClassCode(code);
        
        const parentsData = await getParentsForTeacher(user.uid);
        setParents(parentsData);
      } catch (error) {
        console.error('Error fetching teacher data:', error);
        toast.error('Failed to load class information');
      } finally {
        setLoading(false);
      }
    };

    fetchTeacherData();
  }, [user?.uid]);

  const handleNotifications = () => {
    toast('Notification settings will be available soon!', { icon: '🔔' });
  };

  const handleAccountSettings = () => {
    toast('Account settings will be available soon!', { icon: '⚙️' });
  };

  const handleHelp = () => {
    toast('Help center will be available soon!', { icon: '❓' });
  };

  const handleSignOut = () => {
    if (confirm('Are you sure you want to sign out?')) {
      toast('Sign out functionality will be available soon!', { icon: '👋' });
    }
  };

  const handleEditProfile = () => {
    toast('Profile editor will be available soon!', { icon: '✏️' });
  };

  const handleDownloadReport = () => {
    toast('Class report download will be available soon!', { icon: '📊' });
  };

  const handleShareProfile = () => {
    toast('Profile sharing will be available soon!', { icon: '🔗' });
  };

  const handlePrivacySettings = () => {
    toast('Privacy settings will be available soon!', { icon: '🔒' });
  };

  const copyClassCode = () => {
    navigator.clipboard.writeText(classCode);
    toast.success('Class code copied to clipboard!');
  };

  const handleViewEnrolled = () => {
    setShowEnrolledOverlay(true);
  };

  return (
    <div className="min-h-screen bg-peach-50">
      <div className="max-w-4xl mx-auto p-6">
        {/* Profile Header */}
        <div className="bg-gradient-to-br from-peach-50 to-lavender-50 rounded-3xl shadow-xl p-8 mb-6 border border-lavender-100 overflow-hidden relative">
          {/* Header with school name */}
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-coral-500 mb-4">Tibzee</h2>
          </div>
          
          {/* Teacher Card */}
          <div className="bg-white rounded-3xl p-6 shadow-lg border border-white/50">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-gradient-to-br from-coral-400 to-peach-400 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white text-3xl">👤</span>
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-slate-700 mb-1">{userData?.teacherName || 'Teacher Name'}</h1>
                <p className="text-slate-600 mb-1 text-sm">Lead Teacher • Room 3</p>
                <p className="text-slate-500 text-sm">Tibzee</p>
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={handleEditProfile}
                  className="p-3 bg-lavender-100 hover:bg-lavender-200 rounded-2xl transition-colors duration-200"
                >
                  <Edit3 size={18} className="text-lavender-600" />
                </button>
                <button 
                  onClick={handleShareProfile}
                  className="p-3 bg-mint-100 hover:bg-mint-200 rounded-2xl transition-colors duration-200"
                >
                  <Share2 size={18} className="text-mint-600" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-lavender-200/30 to-peach-200/30 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-mint-200/30 to-coral-200/30 rounded-full translate-y-12 -translate-x-12"></div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-3xl shadow-xl p-6 mb-6 border border-lavender-100">
          <h2 className="text-xl font-bold text-slate-700 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <button 
              onClick={handleDownloadReport}
              className="flex flex-col items-center p-4 bg-peach-50 rounded-2xl hover:shadow-md transition-all duration-200"
            >
              <div className="w-12 h-12 bg-peach-400 rounded-full flex items-center justify-center mb-3 shadow-md">
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
              className="flex flex-col items-center p-4 bg-mint-50 rounded-2xl hover:shadow-md transition-all duration-200"
            >
              <div className="w-12 h-12 bg-mint-400 rounded-full flex items-center justify-center mb-3 shadow-md">
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
              <div className="flex-1">
                <p className="font-medium text-slate-700">{userData?.email || user?.email || 'Email not available'}</p>
                <p className="text-sm text-slate-500">Work Email</p>
              </div>
              <button className="text-lavender-600 hover:text-lavender-700 text-sm font-medium">
                Edit
              </button>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-mint-100 rounded-full flex items-center justify-center">
                <Phone size={18} className="text-mint-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-slate-700">{userData?.phone || 'Phone not available'}</p>
                <p className="text-sm text-slate-500">School Phone</p>
              </div>
              <button className="text-lavender-600 hover:text-lavender-700 text-sm font-medium">
                Edit
              </button>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-lavender-100 rounded-full flex items-center justify-center">
                <Calendar size={18} className="text-lavender-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-slate-700">{userData?.experience || 'Experience not available'}</p>
                <p className="text-sm text-slate-500">Teaching Experience</p>
              </div>
              <button className="text-lavender-600 hover:text-lavender-700 text-sm font-medium">
                Edit
              </button>
            </div>
          </div>
        </div>

        {/* Class Code Section */}
        <div className="bg-white rounded-3xl shadow-xl p-6 mb-6 border border-lavender-100">
          <div className="flex items-center gap-3 mb-4">
            <Book className="w-6 h-6 text-teal-600" />
            <h2 className="text-xl font-bold text-slate-700">Your Class Code</h2>
          </div>
          {loading ? (
            <div className="animate-pulse">
              <div className="h-16 bg-gray-200 rounded-xl"></div>
            </div>
          ) : (
            <div className="bg-teal-50 rounded-2xl p-6 border border-teal-100">
              <div className="flex items-center gap-4">
                <div className="bg-white px-6 py-4 rounded-xl border-2 border-teal-200 flex-1">
                  <div className="text-sm text-gray-600 mb-1">Share this code with parents</div>
                  <div className="text-2xl font-bold text-teal-600 font-mono">{classCode}</div>
                </div>
                <button
                  onClick={copyClassCode}
                  className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-4 rounded-xl flex items-center gap-2 transition-colors"
                >
                  <Copy className="w-5 h-5" />
                  Copy
                </button>
              </div>
              <div className="flex items-center justify-between mt-4">
                <p className="text-sm text-gray-600">
                  Parents need this code to join your class. Share it with them during registration.
                </p>
                <button
                  onClick={handleViewEnrolled}
                  className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <Users size={16} />
                  View Enrolled
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Class Information */}
        <div className="bg-white rounded-3xl shadow-xl p-6 mb-6 border border-lavender-100">
          <h2 className="text-xl font-bold text-slate-700 mb-4">My Class</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-peach-50 rounded-2xl shadow-sm">
              <div className="text-2xl font-bold text-coral-600">{parents.length}</div>
              <div className="text-sm text-slate-600">Students</div>
            </div>
            <div className="text-center p-4 bg-mint-50 rounded-2xl shadow-sm">
              <div className="text-2xl font-bold text-teal-600">{parents.length}</div>
              <div className="text-sm text-slate-600">Parents</div>
            </div>
            <div className="text-center p-4 bg-mustard-50 rounded-2xl shadow-sm">
              <div className="text-2xl font-bold text-mustard-600">0</div>
              <div className="text-sm text-slate-600">Posts Shared</div>
            </div>
            <div className="text-center p-4 bg-lavender-50 rounded-2xl shadow-sm">
              <div className="text-2xl font-bold text-lavender-600">-</div>
              <div className="text-sm text-slate-600">Rating</div>
            </div>
          </div>
        </div>

        {/* Settings Menu */}
        <div className="bg-white rounded-3xl shadow-xl p-6 border border-lavender-100">
          <h2 className="text-xl font-bold text-slate-700 mb-4">Settings</h2>
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
      
      {/* View Enrolled Overlay */}
      {showEnrolledOverlay && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl shadow-xl p-6 w-full max-w-2xl mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-700">Enrolled Parents ({parents.length})</h2>
              <button 
                onClick={() => setShowEnrolledOverlay(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={24} className="text-gray-600" />
              </button>
            </div>
            
            {parents.length === 0 ? (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-500 mb-2">No parents enrolled yet</h3>
                <p className="text-gray-400">
                  Share your class code with parents to get them started!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {parents.map((parent) => (
                  <div key={parent.id} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 mb-1">{parent.name}</h3>
                        <p className="text-gray-600 mb-2">Child: {parent.kidsName}</p>
                        <p className="text-sm text-gray-500">{parent.email}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500">
                          {parent.enrolledAt ? 
                            `Enrolled: ${new Date(parent.enrolledAt).toLocaleDateString()}` : 
                            'Recently enrolled'
                          }
                        </div>
                        <button className="mt-2 text-lavender-600 hover:text-lavender-700 text-sm font-medium">
                          Edit
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
