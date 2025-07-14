import React, { useState, useEffect } from 'react';
import { Copy, Users, Book, Settings as SettingsIcon } from 'lucide-react';
import { getTeacherClassCode, getParentsForTeacher } from '../../firebase/classService';
import { Parent } from '../../types';
import toast from 'react-hot-toast';

interface SettingsProps {
  teacherId: string;
}

const Settings: React.FC<SettingsProps> = ({ teacherId }) => {
  const [classCode, setClassCode] = useState('');
  const [parents, setParents] = useState<Parent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeacherData = async () => {
      try {
        const code = await getTeacherClassCode(teacherId);
        setClassCode(code);
        
        const parentsData = await getParentsForTeacher(teacherId);
        setParents(parentsData);
      } catch (error) {
        console.error('Error fetching teacher data:', error);
        toast.error('Failed to load settings');
      } finally {
        setLoading(false);
      }
    };

    fetchTeacherData();
  }, [teacherId]);

  const copyClassCode = () => {
    navigator.clipboard.writeText(classCode);
    toast.success('Class code copied to clipboard!');
  };

  if (loading) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white rounded-3xl shadow-lg p-8">
        <div className="flex items-center gap-3 mb-8">
          <SettingsIcon className="w-8 h-8 text-teal-600" />
          <h1 className="text-3xl font-bold text-gray-800">Teacher Settings</h1>
        </div>

        {/* Class Code Section */}
        <div className="mb-8">
          <div className="bg-teal-50 rounded-2xl p-6 border border-teal-100">
            <div className="flex items-center gap-3 mb-4">
              <Book className="w-6 h-6 text-teal-600" />
              <h2 className="text-xl font-semibold text-gray-800">Your Class Code</h2>
            </div>
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
            <p className="text-sm text-gray-600 mt-4">
              Parents need this code to join your class. Share it with them during registration.
            </p>
          </div>
        </div>

        {/* Enrolled Parents Section */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-6 h-6 text-gray-600" />
            <h2 className="text-xl font-semibold text-gray-800">
              Enrolled Parents ({parents.length})
            </h2>
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
            <div className="grid gap-4">
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
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
