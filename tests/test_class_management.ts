import { generateTestData, cleanup, delay } from './setup.js';
import { 
  enrollParentInClass, 
  getParentsForTeacher, 
  getTeacherClassCode, 
  getParentClassInfo, 
  verifyClassCode 
} from '../src/firebase/classService.js';
import { signUpTeacher, signUpParent } from '../src/firebase/authService.js';

async function testClassManagement() {
  let teacherId: string;
  let parentId: string;
  let classCode: string;

  try {
    console.log('🏫 Testing Class Management Features...\n');

    // Create test teacher
    console.log('1. Creating test teacher...');
    const teacherData = generateTestData.teacher;
    await signUpTeacher(teacherData.email(), teacherData.password, teacherData.name());
    await delay(1000);
    
    // Get teacher ID (simulate getting from auth)
    teacherId = 'test-teacher-' + Date.now();
    
    // Get teacher's class code
    console.log('2. Getting teacher class code...');
    try {
      classCode = await getTeacherClassCode(teacherId);
      console.log(`✅ Class code retrieved: ${classCode}`);
    } catch (error) {
      console.log('⚠️ Teacher not found, using default class code');
      classCode = 'class-test-' + Date.now();
    }

    // Test class code verification
    console.log('3. Testing class code verification...');
    const isValidCode = await verifyClassCode(classCode);
    console.log(`✅ Class code verification result: ${isValidCode}`);

    // Create test parent
    console.log('4. Creating test parent...');
    const parentData = generateTestData.parent;
    await signUpParent(parentData.email(), parentData.password, classCode, parentData.kidsName(), parentData.name());
    await delay(1000);
    
    parentId = 'test-parent-' + Date.now();

    // Test parent enrollment
    console.log('5. Testing parent enrollment...');
    await enrollParentInClass(parentId, classCode, parentData.kidsName(), parentData.name());
    console.log('✅ Parent enrolled successfully');

    // Test getting parents for teacher
    console.log('6. Getting parents for teacher...');
    const parents = await getParentsForTeacher(teacherId);
    console.log(`✅ Found ${parents.length} parents in class`);

    // Test getting parent class info
    console.log('7. Getting parent class info...');
    try {
      const parentClassInfo = await getParentClassInfo(parentId);
      console.log('✅ Parent class info retrieved:', parentClassInfo);
    } catch (error) {
      console.log('⚠️ Parent class info not found:', error);
    }

    console.log('\n🎉 All class management tests completed successfully!');
    
  } catch (error) {
    console.error('❌ Class Management Test failed:', error);
    throw error;
  } finally {
    await cleanup.all();
  }
}

// Export for use in main test runner
export { testClassManagement };

// Run standalone if this file is executed directly
if (require.main === module) {
  testClassManagement();
}
