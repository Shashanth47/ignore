import { doc, getDoc, setDoc, updateDoc, collection, query, where, getDocs, arrayUnion } from "firebase/firestore";
import { testDb as db } from '../firebase-test-config.js';

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
export async function getParentsForTeacher(teacherId: string) {
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
export async function getTeacherClassCode(teacherId: string) {
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

// Get parent's class information
export async function getParentClassInfo(parentId: string) {
  try {
    const parentRef = doc(db, 'parents', parentId);
    const parentDoc = await getDoc(parentRef);
    
    if (parentDoc.exists()) {
      return parentDoc.data();
    }
    
    throw new Error('Parent not found');
  } catch (error) {
    console.error('Error getting parent info:', error);
    throw error;
  }
}

// Verify class code exists
export async function verifyClassCode(classCode: string) {
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
