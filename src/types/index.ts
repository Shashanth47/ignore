export interface Student {
  id: string;
  name: string;
  avatar: string;
  parentIds: string[];
  points: number;
}

export interface Parent {
  id: string;
  name: string;
  avatar: string;
  email: string;
  studentIds: string[];
  classCode: string;
  kidsName: string;
}

export interface Teacher {
  id: string;
  email: string;
  classId: string;
  parents: Parent[];
}

export interface AuthUser {
  uid: string;
  email: string;
  userType: 'parent' | 'teacher';
}

export interface Post {
  id: string;
  content: string;
  images: string[];
  timestamp: Date;
  likes: number;
  comments: Comment[];
  tags: string[];
  studentIds: string[];
}

export interface Comment {
  id: string;
  content: string;
  author: string;
  timestamp: Date;
  avatar: string;
}

export interface Message {
  id: string;
  content: string;
  senderId: string;
  receiverId: string;
  timestamp: Date;
  read: boolean;
}

export interface Conversation {
  id: string;
  participants: string[];
  lastMessage: Message;
  unreadCount: number;
}

export interface PointsTransaction {
  id: string;
  studentId: string;
  studentName: string;
  points: number;
  reason: string;
  timestamp: Date;
  teacherId: string;
  teacherName: string;
}
