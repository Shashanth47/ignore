import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { PointsTransaction, Student } from '../../types';
import { Star, Award, Users } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../../contexts/AuthContext';
import { getStudentsForTeacher, savePointsTransaction } from '../../firebase/classService';

interface PointsProps {
  createTransaction: (transaction: PointsTransaction) => void;
}

const Points: React.FC<PointsProps> = ({ createTransaction }) => {
  const { user, userData } = useAuth();
  const [selectedStudent, setSelectedStudent] = useState('');
  const [points, setPoints] = useState(1);
  const [reason, setReason] = useState('');
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      if (!user?.uid) return;
      
      try {
        const studentsData = await getStudentsForTeacher(user.uid);
        setStudents(studentsData);
      } catch (error) {
        console.error('Error fetching students:', error);
        toast.error('Failed to load students');
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [user?.uid]);

  const positiveReasons = [
    'Excellent participation in class',
    'Helping a classmate',
    'Great teamwork',
    'Outstanding behavior',
    'Creative thinking',
    'Following instructions well',
    'Sharing with others',
    'Being kind to friends',
    'Completing work on time',
    'Asking thoughtful questions'
  ];

  const handleSubmit = async () => {
    if (!selectedStudent || !points || !reason) {
      toast.error('Please fill in all fields');
      return;
    }

    const student = students.find(s => s.id === selectedStudent);
    if (!student) return;

    const transaction: PointsTransaction = {
      id: uuidv4(),
      studentId: selectedStudent,
      studentName: student.name,
      points,
      reason,
      timestamp: new Date(),
      teacherId: user?.uid || '',
      teacherName: userData?.teacherName || 'Teacher',
    };

    // Save to Firebase
    try {
      await savePointsTransaction(transaction);
      createTransaction(transaction);
      
      setSelectedStudent('');
      setPoints(1);
      setReason('');
      
      toast.success(`${points} points awarded to ${student.name}!`, {
        icon: '⭐',
        duration: 3000,
      });
    } catch (error) {
      console.error('Error saving points:', error);
      toast.error('Failed to save points. Please try again.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-mint-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Star className="w-10 h-10 text-mint-600" />
        </div>
        <h1 className="text-3xl font-bold text-slate-700 mb-2">Award Points</h1>
        <p className="text-slate-600">Recognize positive behaviors and achievements</p>
      </div>

      {/* Form */}
      <div className="bg-white rounded-3xl shadow-lg p-8 border border-mint-100">
        {/* Student Selection */}
        <div className="mb-6">
          <label className="block text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
            <Users className="w-4 h-4" />
            Select Student
          </label>
          {loading ? (
            <div className="animate-pulse space-y-3">
              <div className="grid grid-cols-2 gap-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-16 bg-gray-200 rounded-2xl"></div>
                ))}
              </div>
            </div>
          ) : students.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-2xl">
              <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-2">No students enrolled yet</p>
              <p className="text-sm text-gray-400">Share your class code with parents to get started!</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {students.map((student) => (
                <button
                  key={student.id}
                  onClick={() => setSelectedStudent(student.id)}
                  className={`p-4 rounded-2xl border-2 transition-all duration-200 flex items-center gap-3 ${
                    selectedStudent === student.id
                      ? 'border-mint-400 bg-mint-50 text-mint-700'
                      : 'border-slate-200 hover:border-mint-300 hover:bg-mint-25'
                  }`}
                >
                  <span className="text-2xl">{student.avatar}</span>
                  <span className="font-medium text-left">{student.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Points Selection */}
        <div className="mb-6">
          <label className="block text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
            <Award className="w-4 h-4" />
            Points to Award
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 5, 10].map((pointValue) => (
              <button
                key={pointValue}
                onClick={() => setPoints(pointValue)}
                className={`px-6 py-3 rounded-2xl font-bold transition-all duration-200 ${
                  points === pointValue
                    ? 'bg-mint-500 text-white'
                    : 'bg-mint-100 text-mint-700 hover:bg-mint-200'
                }`}
              >
                {pointValue}
              </button>
            ))}
          </div>
        </div>

        {/* Reason Selection */}
        <div className="mb-6">
          <label className="block text-sm font-bold text-slate-700 mb-3">
            Reason for Points
          </label>
          <div className="grid grid-cols-1 gap-2">
            {positiveReasons.map((reasonOption) => (
              <button
                key={reasonOption}
                onClick={() => setReason(reasonOption)}
                className={`p-3 rounded-xl border-2 transition-all duration-200 text-left ${
                  reason === reasonOption
                    ? 'border-mint-400 bg-mint-50 text-mint-700'
                    : 'border-slate-200 hover:border-mint-300 hover:bg-mint-25'
                }`}
              >
                {reasonOption}
              </button>
            ))}
          </div>
          <textarea
            value={reason}
            onChange={e => setReason(e.target.value)}
            placeholder="Or write a custom reason..."
            className="w-full mt-3 p-4 border-2 border-slate-200 rounded-2xl focus:border-mint-400 focus:ring-0 resize-none"
            rows={3}
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-mint-500 hover:bg-mint-600 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          Award Points ⭐
        </button>
      </div>

      {/* Quick Stats */}
      <div className="bg-white rounded-3xl shadow-lg p-6 border border-mint-100">
        <h3 className="text-lg font-bold text-slate-700 mb-4">Recent Awards</h3>
        <div className="text-center text-slate-500 py-8">
          <Star className="w-12 h-12 mx-auto mb-2 text-slate-300" />
          <p>Award your first points to see activity here!</p>
        </div>
      </div>
    </div>
  );
};

export default Points;

