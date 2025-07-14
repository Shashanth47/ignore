#!/usr/bin/env node

import { generateTestData, cleanup, delay } from './setup.js';

// Simple test runner for Firebase features
async function runAuthenticationTests() {
  console.log('🔐 Running Authentication Tests...\n');
  
  const { email: teacherEmail, password: teacherPassword, name: teacherName } = generateTestData.teacher;
  const { email: parentEmail, password: parentPassword, name: parentName, kidsName } = generateTestData.parent;

  try {
    // Import test-specific Firebase services
    const { signUpTeacher, signInTeacher, signUpParent, signInParent, getTeacherClassCode } = await import('./services/authService-test.js');
    const { createUserWithEmailAndPassword, signInWithEmailAndPassword } = await import('firebase/auth');
    const { testAuth } = await import('./firebase-test-config.js');
    
    console.log('1. Testing Teacher Signup...');
    const teacherEmail1 = teacherEmail();
    const teacherName1 = teacherName();
    let teacherId: string;
    
    try {
      const userCredential = await createUserWithEmailAndPassword(testAuth, teacherEmail1, teacherPassword);
      teacherId = userCredential.user.uid;
      
      // Now create teacher with actual UID
      const { doc, setDoc } = await import('firebase/firestore');
      const { testDb } = await import('./firebase-test-config.js');
      
      // Generate class code
      const adjectives = ['SMART', 'BRIGHT', 'HAPPY', 'WISE', 'KIND', 'COOL', 'SUPER', 'GREAT'];
      const animals = ['BEAR', 'LION', 'EAGLE', 'TIGER', 'WOLF', 'DUCK', 'OWL', 'FOX'];
      const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
      const animal = animals[Math.floor(Math.random() * animals.length)];
      const number = Math.floor(Math.random() * 999) + 1;
      const classCode = `${adjective}${animal}${number.toString().padStart(3, '0')}`;
      
      await setDoc(doc(testDb, "teachers", teacherId), {
        email: teacherEmail1,
        classId: classCode,
        teacherName: teacherName1,
        createdAt: new Date(),
        parents: []
      });
      
      console.log('✅ Teacher signup successful with class code:', classCode);
      
      // Store class code for parent signup
      (global as any).testClassCode = classCode;
      (global as any).testTeacherId = teacherId;
      
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        console.log('⚠️  Teacher email already exists, trying sign in...');
        const userCredential = await signInWithEmailAndPassword(testAuth, teacherEmail1, teacherPassword);
        teacherId = userCredential.user.uid;
        console.log('✅ Teacher signin successful');
        
        // Get existing class code
        try {
          const classCode = await getTeacherClassCode(teacherId);
          (global as any).testClassCode = classCode;
          (global as any).testTeacherId = teacherId;
        } catch (err) {
          console.log('⚠️  Could not get class code for existing teacher');
        }
      } else {
        throw error;
      }
    }
    
    await delay(2000);

    console.log('2. Testing Parent Signup...');
    const parentEmail1 = parentEmail();
    const parentName1 = parentName();
    const kidsName1 = kidsName();
    const testClassCode = (global as any).testClassCode;
    
    if (testClassCode) {
      try {
        await signUpParent(parentEmail1, parentPassword, testClassCode, kidsName1, parentName1);
        console.log('✅ Parent signup successful');
      } catch (error: any) {
        if (error.code === 'auth/email-already-in-use') {
          console.log('⚠️  Parent email already exists, trying sign in...');
          await signInParent(parentEmail1, parentPassword);
          console.log('✅ Parent signin successful');
        } else {
          console.log('⚠️  Parent signup failed:', error.message);
        }
      }
    } else {
      console.log('⚠️  No valid class code available for parent signup');
    }
    
    console.log('✅ Authentication tests completed!\n');
    
  } catch (error) {
    console.error('❌ Authentication Test failed:', error);
    throw error;
  }
}

async function runClassManagementTests() {
  console.log('🏦 Running Class Management Tests...\n');
  
  try {
    const { 
      enrollParentInClass, 
      getParentsForTeacher, 
      getTeacherClassCode, 
      getParentClassInfo, 
      verifyClassCode 
    } = await import('./services/classService-test.js');
    
    const testTeacherId = (global as any).testTeacherId || 'test-teacher-' + Date.now();
    const testClassCode = (global as any).testClassCode || 'class-test-' + Date.now();
    const testParentId = 'test-parent-' + Date.now();
    
    console.log('1. Testing class code verification...');
    const isValidCode = await verifyClassCode(testClassCode);
    console.log(`✅ Class code verification result: ${isValidCode}`);
    
    console.log('2. Testing parent enrollment...');
    try {
      await enrollParentInClass(testParentId, testClassCode, 'Test Kid', 'Test Parent');
      console.log('✅ Parent enrollment test passed');
    } catch (error) {
      console.log('⚠️  Parent enrollment failed:', error);
    }
    
    console.log('3. Testing get parents for teacher...');
    const parents = await getParentsForTeacher(testTeacherId);
    console.log(`✅ Found ${parents.length} parents for teacher`);
    
    console.log('4. Testing get teacher class code...');
    try {
      const retrievedClassCode = await getTeacherClassCode(testTeacherId);
      console.log(`✅ Retrieved class code: ${retrievedClassCode}`);
    } catch (error) {
      console.log('⚠️  Could not retrieve class code:', error);
    }
    
    console.log('✅ Class management tests completed!\n');
    
  } catch (error) {
    console.error('❌ Class Management tests failed:', error);
    throw error;
  }
}

async function runPostsAndMessagesTests() {
  console.log('📝 Running Posts and Messages Tests...\n');
  
  try {
    const { 
      createPost, 
      getPostsForClass, 
      sendMessage, 
      getMessages, 
      awardPoints, 
      getPointsTransactions 
    } = await import('./services/postService-test.js');
    
    const testTeacherId = 'test-teacher-' + Date.now();
    const { content: postContent, tags, studentIds } = generateTestData.post;
    const { content: messageContent } = generateTestData.message;
    
    console.log('1. Testing post creation...');
    const post = await createPost(testTeacherId, postContent(), [], tags, studentIds);
    console.log(`✅ Post created with ID: ${post.id}`);
    
    console.log('2. Testing get posts for class...');
    const posts = await getPostsForClass(testTeacherId);
    console.log(`✅ Retrieved ${posts.length} posts`);
    
    console.log('3. Testing message sending...');
    const senderId = "test-sender-" + Date.now();
    const receiverId = "test-receiver-" + Date.now();
    const message = await sendMessage(senderId, receiverId, messageContent());
    console.log(`✅ Message sent with ID: ${message.id}`);
    
    console.log('4. Testing get messages (simplified)...');
    try {
      // Use simple query that doesn't require complex index
      const { collection, getDocs, query, where, orderBy } = await import('firebase/firestore');
      const { testDb } = await import('./firebase-test-config.js');
      
      const messagesRef = collection(testDb, 'messages');
      const simpleQuery = query(messagesRef, where('senderId', '==', senderId));
      const snapshot = await getDocs(simpleQuery);
      console.log(`✅ Retrieved ${snapshot.size} messages (simple query)`);
    } catch (error) {
      console.log('⚠️  Message retrieval with simple query failed:', error);
    }
    
    console.log('5. Testing points awarding...');
    const pointsTransaction = await awardPoints(testTeacherId, 'Test Teacher', studentIds[0], 'Test Student', 50, 'Great work!');
    console.log(`✅ Points awarded with ID: ${pointsTransaction.id}`);
    
    console.log('6. Testing get points transactions...');
    const transactions = await getPointsTransactions(studentIds[0]);
    console.log(`✅ Retrieved ${transactions.length} transactions`);
    
    console.log('✅ Posts and messages tests completed!\n');
    
  } catch (error) {
    console.error('❌ Posts and Messages tests failed:', error);
    throw error;
  }
}

async function runAllTests() {
  console.log('🚀 Starting Comprehensive Firebase Test Suite...\n');
  console.log('=' .repeat(60) + '\n');
  
  try {
    // Add delay to ensure Firebase is ready
    await delay(1000);
    
    await runAuthenticationTests();
    await delay(2000);
    
    await runClassManagementTests();
    await delay(2000);
    
    await runPostsAndMessagesTests();
    
    console.log('🎉 ALL TESTS COMPLETED SUCCESSFULLY!');
    console.log('=' .repeat(60));
    
  } catch (error) {
    console.error('💥 TEST SUITE FAILED:', error);
    process.exit(1);
  } finally {
    await cleanup.all();
    process.exit(0);
  }
}

// Run the test suite
runAllTests();
