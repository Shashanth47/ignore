import React, { useState } from 'react';
import { signUpParent, signInParent } from '../firebase/authService';
import toast from 'react-hot-toast';

interface ParentAuthProps {
  onAuthSuccess: (user: any) => void;
}

const ParentAuth: React.FC<ParentAuthProps> = ({ onAuthSuccess }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    classCode: '',
    kidsName: '',
    parentName: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        // Sign up parent
        await signUpParent(formData.email, formData.password, formData.classCode, formData.kidsName, formData.parentName);
        toast.success('Account created successfully!');
        // Auto-redirect after successful sign-up
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        // Sign in parent
        const user = await signInParent(formData.email, formData.password);
        toast.success('Welcome back!');
        // Auto-redirect after successful sign-in
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error: any) {
      toast.error(error.message || 'Authentication failed');
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
    <div className="min-h-screen bg-peach-25 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full border border-peach-100">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-peach-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <img src="/little_harvard.png" alt="Little Harvard Logo" className="w-16 h-16 rounded-full" />
          </div>
          <h1 className="text-3xl font-bold text-peach-600 mb-2">
            {isSignUp ? 'Join as Parent' : 'Parent Sign In'}
          </h1>
          <p className="text-slate-600">Connect with your child's learning journey</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-peach-400"
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
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-peach-400"
              required
            />
          </div>

          {isSignUp && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Class Code</label>
                <input
                  type="text"
                  name="classCode"
                  value={formData.classCode}
                  onChange={handleInputChange}
                  placeholder="Enter your teacher's class code"
                  className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-peach-400"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Child's Name</label>
                <input
                  type="text"
                  name="kidsName"
                  value={formData.kidsName}
                  onChange={handleInputChange}
                  placeholder="Enter your child's name"
                  className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-peach-400"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                <input
                  type="text"
                  name="parentName"
                  value={formData.parentName}
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                  className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-peach-400"
                  required
                />
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full p-4 bg-peach-500 hover:bg-peach-600 text-white rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50"
          >
            {loading ? 'Loading...' : (isSignUp ? 'Create Account' : 'Sign In')}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-peach-600 hover:text-peach-700 font-medium"
          >
            {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ParentAuth;
