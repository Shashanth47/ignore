import { collection, addDoc, getDocs, doc, updateDoc, arrayUnion, query, orderBy, where, onSnapshot } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from './config';
import { Post, Message, PointsTransaction } from '../types';

// Create a new post
export async function createPost(teacherId: string, content: string, images: File[], tags: string[], studentIds: string[]) {
  try {
    const imageUrls: string[] = [];
    
    // Upload images to Firebase Storage
    for (const image of images) {
      const imageRef = ref(storage, `posts/${Date.now()}_${image.name}`);
      await uploadBytes(imageRef, image);
      const downloadURL = await getDownloadURL(imageRef);
      imageUrls.push(downloadURL);
    }

    // Create post document
    const postData = {
      teacherId,
      content,
      images: imageUrls,
      tags,
      studentIds,
      timestamp: new Date(),
      likes: 0,
      comments: []
    };

    const docRef = await addDoc(collection(db, 'posts'), postData);
    return { id: docRef.id, ...postData };
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
}

// Get posts for a specific teacher's class
export async function getPostsForClass(teacherId: string): Promise<Post[]> {
  try {
    const postsRef = collection(db, 'posts');
    const q = query(postsRef, where('teacherId', '==', teacherId), orderBy('timestamp', 'desc'));
    const querySnapshot = await getDocs(q);
    
    const posts: Post[] = [];
    querySnapshot.forEach((doc) => {
      posts.push({ id: doc.id, ...doc.data() } as Post);
    });
    
    return posts;
  } catch (error) {
    console.error('Error getting posts:', error);
    throw error;
  }
}

// Send a message
export async function sendMessage(senderId: string, receiverId: string, content: string) {
  try {
    const messageData = {
      senderId,
      receiverId,
      content,
      timestamp: new Date(),
      read: false
    };

    const docRef = await addDoc(collection(db, 'messages'), messageData);
    return { id: docRef.id, ...messageData };
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
}

// Get messages between two users
export async function getMessages(userId1: string, userId2: string): Promise<Message[]> {
  try {
    const messagesRef = collection(db, 'messages');
    const q = query(
      messagesRef,
      where('senderId', 'in', [userId1, userId2]),
      where('receiverId', 'in', [userId1, userId2]),
      orderBy('timestamp', 'asc')
    );
    
    const querySnapshot = await getDocs(q);
    const messages: Message[] = [];
    
    querySnapshot.forEach((doc) => {
      messages.push({ id: doc.id, ...doc.data() } as Message);
    });
    
    return messages;
  } catch (error) {
    console.error('Error getting messages:', error);
    throw error;
  }
}

// Award points to a student
export async function awardPoints(
  teacherId: string,
  teacherName: string,
  studentId: string,
  studentName: string,
  points: number,
  reason: string
) {
  try {
    const transactionData = {
      teacherId,
      teacherName,
      studentId,
      studentName,
      points,
      reason,
      timestamp: new Date()
    };

    const docRef = await addDoc(collection(db, 'pointsTransactions'), transactionData);
    return { id: docRef.id, ...transactionData };
  } catch (error) {
    console.error('Error awarding points:', error);
    throw error;
  }
}

// Get points transactions for a student
export async function getPointsTransactions(studentId: string): Promise<PointsTransaction[]> {
  try {
    const transactionsRef = collection(db, 'pointsTransactions');
    const q = query(transactionsRef, where('studentId', '==', studentId), orderBy('timestamp', 'desc'));
    const querySnapshot = await getDocs(q);
    
    const transactions: PointsTransaction[] = [];
    querySnapshot.forEach((doc) => {
      transactions.push({ id: doc.id, ...doc.data() } as PointsTransaction);
    });
    
    return transactions;
  } catch (error) {
    console.error('Error getting points transactions:', error);
    throw error;
  }
}

// Listen to messages in real-time
export function listenToMessages(userId: string, callback: (messages: Message[]) => void) {
  const messagesRef = collection(db, 'messages');
  const q = query(
    messagesRef,
    where('receiverId', '==', userId),
    orderBy('timestamp', 'desc')
  );
  
  return onSnapshot(q, (querySnapshot) => {
    const messages: Message[] = [];
    querySnapshot.forEach((doc) => {
      messages.push({ id: doc.id, ...doc.data() } as Message);
    });
    callback(messages);
  });
}

// Listen to posts in real-time
export function listenToPosts(teacherId: string, callback: (posts: Post[]) => void) {
  const postsRef = collection(db, 'posts');
  const q = query(postsRef, where('teacherId', '==', teacherId), orderBy('timestamp', 'desc'));
  
  return onSnapshot(q, (querySnapshot) => {
    const posts: Post[] = [];
    querySnapshot.forEach((doc) => {
      posts.push({ id: doc.id, ...doc.data() } as Post);
    });
    callback(posts);
  });
}
