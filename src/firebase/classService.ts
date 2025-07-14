import { doc, getDoc, setDoc, updateDoc, collection, query, where, getDocs, arrayUnion, orderBy, limit, onSnapshot, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from './config';
import { Parent, Teacher, Student, PointsTransaction, Post, Message } from '../types';

// Retry function for Firestore operations
async function retryOperation<T>(operation: () => Promise<T>, maxRetries = 3, delay = 1000): Promise<T> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error: any) {
      if (attempt === maxRetries) {
        throw error;
      }
      
      // Only retry on network/connection errors
      if (error.code === 'unavailable' || error.code === 'deadline-exceeded' || 
          error.message?.includes('400') || error.message?.includes('Failed to fetch')) {
        console.log(`Attempt ${attempt} failed, retrying in ${delay}ms...`, error.message);
        await new Promise(resolve => setTimeout(resolve, delay * attempt));
      } else {
        throw error;
      }
    }
  }
  throw new Error('Max retries exceeded');
}

// Add parent to teacher's class
export async function enrollParentInClass(parentId: string, classCode: string, kidsName: string, parentName: string) {
  try {
    // Find teacher by class code
    const teachersRef = collection(db, 'teachers');
    const q = query(teachersRef, where('classId', '==', classCode));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      throw new Error('Invalid class code');
    }

    const teacherDoc = querySnapshot.docs[0];
    const teacherId = teacherDoc.id;

    // Create parent document with class info
    const parentRef = doc(db, 'parents', parentId);
    await setDoc(parentRef, {
      classCode,
      kidsName,
      parentName,
      teacherId,
      enrolledAt: new Date()
    }, { merge: true });

    // Add parent to teacher's parents list
    const teacherRef = doc(db, 'teachers', teacherId);
    await updateDoc(teacherRef, {
      parents: arrayUnion({
        id: parentId,
        name: parentName,
        kidsName,
        enrolledAt: new Date()
      })
    });

    return { success: true, teacherId };
  } catch (error) {
    console.error('Error enrolling parent:', error);
    throw error;
  }
}

// Get parents for a specific teacher
export async function getParentsForTeacher(teacherId: string): Promise<Parent[]> {
  try {
    const teacherRef = doc(db, 'teachers', teacherId);
    const teacherDoc = await getDoc(teacherRef);
    
    if (teacherDoc.exists()) {
      const teacherData = teacherDoc.data();
      return teacherData.parents || [];
    }
    
    return [];
  } catch (error) {
    console.error('Error getting parents:', error);
    throw error;
  }
}

// Get teacher's class code
export async function getTeacherClassCode(teacherId: string): Promise<string> {
  try {
    const teacherRef = doc(db, 'teachers', teacherId);
    const teacherDoc = await getDoc(teacherRef);
    
    if (teacherDoc.exists()) {
      const teacherData = teacherDoc.data();
      return teacherData.classId;
    }
    
    throw new Error('Teacher not found');
  } catch (error) {
    console.error('Error getting class code:', error);
    throw error;
  }
}

// Get teacher's complete information
export async function getTeacherInfo(teacherId: string): Promise<Teacher> {
  try {
    const teacherRef = doc(db, 'teachers', teacherId);
    const teacherDoc = await getDoc(teacherRef);
    
    if (teacherDoc.exists()) {
      return teacherDoc.data() as Teacher;
    }
    
    throw new Error('Teacher not found');
  } catch (error) {
    console.error('Error getting teacher info:', error);
    throw error;
  }
}

// Get parent's class information
export async function getParentClassInfo(parentId: string) {
  return retryOperation(async () => {
    const parentRef = doc(db, 'parents', parentId);
    const parentDoc = await getDoc(parentRef);
    
    if (parentDoc.exists()) {
      return parentDoc.data();
    }
    
    throw new Error('Parent not found');
  });
}

// Verify class code exists
export async function verifyClassCode(classCode: string): Promise<boolean> {
  try {
    const teachersRef = collection(db, 'teachers');
    const q = query(teachersRef, where('classId', '==', classCode));
    const querySnapshot = await getDocs(q);
    
    return !querySnapshot.empty;
  } catch (error) {
    console.error('Error verifying class code:', error);
    return false;
  }
}

// Get students for a specific teacher
export async function getStudentsForTeacher(teacherId: string): Promise<Student[]> {
  try {
    const parentsData = await getParentsForTeacher(teacherId);
    
    // Convert parents to students (since kids are linked to parents)
    const students: Student[] = parentsData.map((parent, index) => ({
      id: `student-${parent.id}`,
      name: parent.kidsName,
      avatar: '👤',
      parentIds: [parent.id],
      points: 0 // Default points, can be updated later
    }));
    
    return students;
  } catch (error) {
    console.error('Error getting students:', error);
    throw error;
  }
}

// Get points transactions for a student
export async function getPointsTransactionsForStudent(studentId: string): Promise<PointsTransaction[]> {
  try {
    const pointsRef = collection(db, 'points_transactions');
    const q = query(pointsRef, where('studentId', '==', studentId), orderBy('timestamp', 'desc'));
    const querySnapshot = await getDocs(q);
    
    const transactions: PointsTransaction[] = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      timestamp: doc.data().timestamp.toDate() // Convert Firestore timestamp to Date
    })) as PointsTransaction[];
    
    return transactions;
  } catch (error) {
    console.error('Error getting points transactions:', error);
    throw error;
  }
}

// Save points transaction
export async function savePointsTransaction(transaction: PointsTransaction): Promise<void> {
  try {
    const pointsRef = collection(db, 'points_transactions');
    await setDoc(doc(pointsRef, transaction.id), transaction);
  } catch (error) {
    console.error('Error saving points transaction:', error);
    throw error;
  }
}

// Get teacher info for parent
export async function getTeacherInfoForParent(parentId: string): Promise<Teacher | null> {
  try {
    const parentRef = doc(db, 'parents', parentId);
    const parentDoc = await getDoc(parentRef);
    
    if (parentDoc.exists()) {
      const parentData = parentDoc.data();
      const teacherId = parentData.teacherId;
      
      if (teacherId) {
        const teacherInfo = await getTeacherInfo(teacherId);
        return teacherInfo;
      }
    }
    
    return null;
  } catch (error) {
    console.error('Error getting teacher info for parent:', error);
    throw error;
  }
}
