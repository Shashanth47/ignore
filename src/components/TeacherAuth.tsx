import React, { useState } from 'react';
import { signUpTeacher, signInTeacher } from '../firebase/authService';
import toast from 'react-hot-toast';

interface TeacherAuthProps {
  onAuthSuccess: (user: any) => void;
}

const TeacherAuth: React.FC<TeacherAuthProps> = ({ onAuthSuccess }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    teacherName: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        if (formData.password !== formData.confirmPassword) {
          toast.error('Passwords do not match');
          return;
        }
        // Sign up teacher
        await signUpTeacher(formData.email, formData.password, formData.teacherName);
        toast.success('Account created successfully!');
        // Auto-redirect after successful sign-up
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        // Sign in teacher
        const user = await signInTeacher(formData.email, formData.password);
        toast.success('Welcome back!');
        // Auto-redirect after successful sign-in
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error: any) {
      // Handle specific error cases
      if (!isSignUp && error.message && (error.message.includes('400') || error.message.includes('Bad Request') || error.message.includes('user not found'))) {
        toast.error('Account not found. Please sign up first or check your credentials.');
      } else {
        toast.error(error.message || 'Authentication failed');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-teal-25 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full border border-teal-100">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <img src="/little_harvard.png" alt="Little Harvard Logo" className="w-16 h-16 rounded-full" />
          </div>
          <h1 className="text-3xl font-bold text-teal-600 mb-2">
            {isSignUp ? 'Join as Teacher' : 'Teacher Sign In'}
          </h1>
          <p className="text-slate-600">Empower your students' learning journey</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400"
              required
            />
          </div>

          {isSignUp && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                <input
                  type="text"
                  name="teacherName"
                  value={formData.teacherName}
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                  className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400"
                  required
                />
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full p-4 bg-teal-500 hover:bg-teal-600 text-white rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50"
          >
            {loading ? 'Loading...' : (isSignUp ? 'Create Account' : 'Sign In')}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-teal-600 hover:text-teal-700 font-medium"
          >
            {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherAuth;
