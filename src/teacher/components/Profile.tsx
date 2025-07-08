import React from 'react';
import { Settings, Bell, HelpCircle, LogOut, User, Mail, Phone, Calendar, Download, Share2, Edit3, Shield } from 'lucide-react';

const Profile: React.FC = () => {
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
    alert('Downloading class report...');
  };

  const handleShareProfile = () => {
    alert('Sharing profile...');
  };

  const handlePrivacySettings = () => {
    alert('Opening privacy settings...');
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
                <h1 className="text-2xl font-bold text-slate-700 mb-1">Ms. Shreya Kapoor</h1>
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
              onClick={handleAccountSettings}
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
              <div>
                <p className="font-medium text-slate-700">shreya.kapoor@tibzee.com</p>
                <p className="text-sm text-slate-500">Work Email</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-mint-100 rounded-full flex items-center justify-center">
                <Phone size={18} className="text-mint-600" />
              </div>
              <div>
                <p className="font-medium text-slate-700">(555) 123-4567</p>
                <p className="text-sm text-slate-500">School Phone</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-lavender-100 rounded-full flex items-center justify-center">
                <Calendar size={18} className="text-lavender-600" />
              </div>
              <div>
                <p className="font-medium text-slate-700">5 years experience</p>
                <p className="text-sm text-slate-500">Teaching Experience</p>
              </div>
            </div>
          </div>
        </div>

        {/* Class Information */}
        <div className="bg-white rounded-3xl shadow-xl p-6 mb-6 border border-lavender-100">
          <h2 className="text-xl font-bold text-slate-700 mb-4">My Class</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-peach-50 rounded-2xl shadow-sm">
              <div className="text-2xl font-bold text-coral-600">18</div>
              <div className="text-sm text-slate-600">Students</div>
            </div>
            <div className="text-center p-4 bg-mint-50 rounded-2xl shadow-sm">
              <div className="text-2xl font-bold text-teal-600">32</div>
              <div className="text-sm text-slate-600">Parents</div>
            </div>
            <div className="text-center p-4 bg-mustard-50 rounded-2xl shadow-sm">
              <div className="text-2xl font-bold text-mustard-600">156</div>
              <div className="text-sm text-slate-600">Posts Shared</div>
            </div>
            <div className="text-center p-4 bg-lavender-50 rounded-2xl shadow-sm">
              <div className="text-2xl font-bold text-lavender-600">4.9</div>
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
    </div>
  );
};

export default Profile;