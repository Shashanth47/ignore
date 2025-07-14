import { generateTestData, cleanup, delay } from './setup.js';
import { signUpTeacher, signInTeacher, signUpParent, signInParent } from '../src/firebase/authService.js';

async function testAuthentication() {
  const { email: teacherEmail, password: teacherPassword, name: teacherName } = generateTestData.teacher;
  const { email: parentEmail, password: parentPassword, name: parentName, kidsName } = generateTestData.parent;

  try {
    console.log('Testing Teacher Signup...');
    await signUpTeacher(teacherEmail(), teacherPassword, teacherName());
    await delay(1000); // Wait for Firestore and Auth propagation

    console.log('Testing Teacher Signin...');
    await signInTeacher(teacherEmail(), teacherPassword);
    console.log('Teacher Authentication successful!');

    console.log('Testing Parent Signup...');
    await signUpParent(parentEmail(), parentPassword, 'class-test', kidsName(), parentName());
    await delay(1000);

    console.log('Testing Parent Signin...');
    await signInParent(parentEmail(), parentPassword);
    console.log('Parent Authentication successful!');
  } catch (error) {
    console.error('Authentication Test failed:', error);
  } finally {
    await cleanup.all();
  }
}

testAuthentication();
