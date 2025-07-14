import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getDoc } from "firebase/firestore";
import { testAuth as auth, testDb as db } from '../firebase-test-config.js';

// Sign up for parents
export async function signUpParent(email: string, password: string, classCode: string, kidsName: string, parentName: string) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // Save additional parent data
  await setDoc(doc(db, "parents", user.uid), {
    email,
    classCode,
    kidsName,
    parentName,
    createdAt: new Date()
  });

  // Enroll parent in class
  const { enrollParentInClass } = await import('./classService-test.js');
  await enrollParentInClass(user.uid, classCode, kidsName, parentName);
}

// Sign in for parents
export async function signInParent(email: string, password: string) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
}

// Sign up for teachers
export async function signUpTeacher(email: string, password: string, teacherName: string) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // Create a unique class ID
  const classId = `class-${user.uid}`;

  // Save teacher data
  await setDoc(doc(db, "teachers", user.uid), {
    email,
    classId,
    teacherName,
    createdAt: new Date()
  });
}

// Sign in for teachers
export async function signInTeacher(email: string, password: string) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
}

// Get teacher's class code
export async function getTeacherClassCode(teacherId: string) {
  const docRef = doc(db, "teachers", teacherId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data().classId;
  } else {
    throw new Error("No such document!");
  }
}
