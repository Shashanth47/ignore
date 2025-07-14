import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../firebase/config';
import { getParentClassInfo, getTeacherInfo } from '../firebase/classService';

interface AuthContextType {
  user: User | null;
  userType: 'teacher' | 'parent' | null;
  userData: any;
  loading: boolean;
  setUserData: (data: any) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userType, setUserType] = useState<'teacher' | 'parent' | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        
        // Add delay to ensure Firestore is ready
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        try {
          // Try to get parent info first with timeout
          const timeoutPromise = new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Request timeout')), 10000)
          );
          
          const parentInfoPromise = getParentClassInfo(firebaseUser.uid);
          const parentInfo = await Promise.race([parentInfoPromise, timeoutPromise]);
          
          setUserType('parent');
          setUserData(parentInfo);
        } catch (error) {
          console.log('Parent info not found, treating as teacher:', error);
          // If parent info fails, assume teacher and fetch teacher profile
          setUserType('teacher');
          try {
            const teacherInfo = await getTeacherInfo(firebaseUser.uid);
            setUserData(teacherInfo);
          } catch (teacherError) {
            console.error('Error fetching teacher info:', teacherError);
            // Fallback to basic email data if teacher info fetch fails
            setUserData({ email: firebaseUser.email });
          }
        }
      } else {
        setUser(null);
        setUserType(null);
        setUserData(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const logout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const value = {
    user,
    userType,
    userData,
    loading,
    setUserData,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
