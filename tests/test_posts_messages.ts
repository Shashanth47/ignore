import { generateTestData, cleanup, delay } from './setup.js';
import { createPost, getPostsForClass, sendMessage, getMessages, awardPoints, getPointsTransactions } from '../src/firebase/postService.js';

async function testPostsAndMessages() {
  const { email: teacherEmail, password: teacherPassword, name: teacherName } = generateTestData.teacher;
  const { content: postContent, tags, studentIds } = generateTestData.post;
  const { content: messageContent } = generateTestData.message;

  try {
    console.log('🔄 Testing Posts and Messages...\n');

    // Create a test teacher
    console.log('1. Creating test teacher...');
    await delay(2000);
    const teacherId = 'test-teacher-' + Date.now();

    // Create a post
    console.log('2. Creating a post...');
    const post = await createPost(teacherId, postContent(), [], tags, studentIds);
    console.log(`✅ Post created with ID: ${post.id}`);

    // Get posts for class
    console.log('3. Retrieving posts for the class...');
    const posts = await getPostsForClass(teacherId);
    console.log(`✅ Retrieved ${posts.length} posts`);

    // Send a message
    console.log('4. Sending a message...');
    const senderId = "teacher-id";
    const receiverId = "parent-id";
    const message = await sendMessage(senderId, receiverId, messageContent());
    console.log(`✅ Message sent with ID: ${message.id}`);

    // Get messages between users
    console.log('5. Getting messages...');
    const messages = await getMessages(senderId, receiverId);
    console.log(`✅ Retrieved ${messages.length} messages`);

    // Award points to a student
    console.log('6. Awarding points...');
    const pointsTransaction = await awardPoints(teacherId, teacherName(), studentIds[0], 'student name', 50, 'Great work!');
    console.log(`✅ Points awarded with ID: ${pointsTransaction.id}`);

    // Get points transactions for a student
    console.log('7. Getting points transactions...');
    const transactions = await getPointsTransactions(studentIds[0]);
    console.log(`✅ Retrieved ${transactions.length} transactions`);

    console.log('\n🎉 All posts and messages tests completed successfully!');

  } catch (error) {
    console.error('❌ Post and Message Test failed:', error);
  } finally {
    await cleanup.all();
  }
}

// Run the tests
if (require.main === module) {
  testPostsAndMessages();
}
