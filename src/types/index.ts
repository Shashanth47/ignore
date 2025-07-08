export interface Student {
  id: string;
  name: string;
  avatar: string;
  parentIds: string[];
}

export interface Parent {
  id: string;
  name: string;
  avatar: string;
  email: string;
  studentIds: string[];
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