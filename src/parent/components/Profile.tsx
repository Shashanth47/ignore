import React from 'react';
import { Settings, Bell, HelpCircle, LogOut, User, Mail, Phone, Calendar, Download, Share2, Edit3, Shield, Baby } from 'lucide-react';

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
    alert('Downloading Emma\'s progress report...');
  };

  const handleShareProfile = () => {
    alert('Sharing profile...');
  };

  const handlePrivacySettings = () => {
    alert('Opening privacy settings...');
  };

  const handleChildProgress = () => {
    alert('Opening Emma\'s progress tracker...');
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
              <h1 className="text-3xl font-bold text-slate-700 mb-2">Sarah & Mike Johnson</h1>
              <p className="text-slate-600 mb-1">Emma's Parents</p>
              <p className="text-slate-500 text-sm">Rainbow Preschool • Room 3</p>
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
          <h2 className="text-xl font-bold text-slate-700 mb-4">Emma's Information</h2>
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-peach-400 rounded-full flex items-center justify-center shadow-md">
              <span className="text-white text-2xl">👧</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-700">Emma Johnson</h3>
              <p className="text-slate-500">Age 4 • Room 3</p>
              <p className="text-slate-500 text-sm">Teacher: Ms. Sarah Johnson</p>
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
              <span className="text-sm font-medium text-slate-700">Emma's Progress</span>
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
                <p className="font-medium text-slate-700">sarah.johnson@email.com</p>
                <p className="text-sm text-slate-500">Primary Email</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-mint-100 rounded-full flex items-center justify-center">
                <Phone size={18} className="text-mint-600" />
              </div>
              <div>
                <p className="font-medium text-slate-700">(555) 987-6543</p>
                <p className="text-sm text-slate-500">Primary Phone</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-lavender-100 rounded-full flex items-center justify-center">
                <Phone size={18} className="text-lavender-600" />
              </div>
              <div>
                <p className="font-medium text-slate-700">(555) 123-4567</p>
                <p className="text-sm text-slate-500">Mike's Phone</p>
              </div>
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