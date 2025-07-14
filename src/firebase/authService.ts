import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from './config';

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
  const { enrollParentInClass } = await import('./classService');
  await enrollParentInClass(user.uid, classCode, kidsName, parentName);
}

// Sign in for parents
export async function signInParent(email: string, password: string) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
}

// Generate a unique, user-friendly class code
function generateClassCode(): string {
  const adjectives = ['SMART', 'BRIGHT', 'HAPPY', 'WISE', 'KIND', 'COOL', 'SUPER', 'GREAT'];
  const animals = ['BEAR', 'LION', 'EAGLE', 'TIGER', 'WOLF', 'DUCK', 'OWL', 'FOX'];
  
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const animal = animals[Math.floor(Math.random() * animals.length)];
  const number = Math.floor(Math.random() * 999) + 1;
  
  return `${adjective}${animal}${number.toString().padStart(3, '0')}`;
}

// Sign up for teachers
export async function signUpTeacher(email: string, password: string, teacherName: string) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // Create a unique, user-friendly class code
  const classCode = generateClassCode();

  // Save teacher data
  await setDoc(doc(db, "teachers", user.uid), {
    email,
    classId: classCode,
    teacherName,
    createdAt: new Date(),
    parents: [] // Initialize with empty parents array
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

