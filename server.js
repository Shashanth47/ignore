import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(cors());

// Store connected users
const connectedUsers = new Map();

io.on('connection', (socket) => {
  console.log('New client connected');

  // Handle user joining
  socket.on('join', (data) => {
    const { userType, userId, classId } = data;
    connectedUsers.set(socket.id, { userType, userId, classId });
    
    // Join class room
    if (classId) {
      socket.join(classId);
    }
    
    console.log(`${userType} ${userId} joined class ${classId}`);
  });

  // Handle new messages
  socket.on('new_message', (data) => {
    const { receiverId, classId, message } = data;
    
    // Send to specific user or broadcast to class
    if (receiverId) {
      socket.to(receiverId).emit('message_received', message);
    } else if (classId) {
      socket.to(classId).emit('message_received', message);
    }
  });

  // Handle new posts
  socket.on('new_post', (data) => {
    const userInfo = connectedUsers.get(socket.id);
    if (userInfo && userInfo.classId) {
      // Broadcast to all users in the class
      socket.to(userInfo.classId).emit('post_created', data);
    }
  });

  // Handle points transactions
  socket.on('new_transaction', (data) => {
    const userInfo = connectedUsers.get(socket.id);
    if (userInfo && userInfo.classId) {
      // Broadcast to all users in the class
      socket.to(userInfo.classId).emit('transaction_created', data);
    }
  });

  // Handle user disconnection
  socket.on('disconnect', () => {
    console.log('Client disconnected');
    connectedUsers.delete(socket.id);
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Socket.IO server running on port ${PORT}`);
});
