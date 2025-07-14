# Tibzee - Teacher-Parent Communication App

A real-time communication app built with React, Firebase, and Socket.IO that connects teachers and parents for enhanced student engagement.

## Features

### For Teachers
- **Class Management**: Get a unique class code to share with parents
- **Real-time Messaging**: Chat with parents enrolled in your class
- **Points System**: Award points to students for achievements
- **Feed Management**: Share posts and updates with parents
- **Parent Enrollment**: View all parents enrolled in your class

### For Parents
- **Class Enrollment**: Join teacher's class using a unique class code
- **Real-time Updates**: Receive instant notifications about your child
- **Direct Messaging**: Chat directly with your child's teacher
- **Progress Tracking**: View points and achievements earned by your child
- **Feed Access**: Stay updated with classroom activities

## Technology Stack

- **Frontend**: React with TypeScript, Tailwind CSS
- **Backend**: Firebase (Auth, Firestore, Storage)
- **Real-time Communication**: Socket.IO
- **Mobile**: Capacitor for mobile app deployment

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd tibzee
```

2. Install dependencies
```bash
npm install
```

3. Firebase Setup
   - Create a Firebase project at https://console.firebase.google.com
   - Enable Authentication (Email/Password)
   - Enable Firestore Database
   - Enable Storage
   - Copy your Firebase config to `src/firebase/config.ts`

4. Start the Socket.IO server
```bash
npm run server
```

5. Start the development server
```bash
npm run dev
```

## Usage

### For Teachers
1. **Sign Up**: Create a teacher account
2. **Get Class Code**: Go to Settings to view your unique class code
3. **Share Code**: Provide the class code to parents during enrollment
4. **Manage Class**: View enrolled parents in the Settings section
5. **Communication**: Use the chat feature to message parents
6. **Award Points**: Use the Points section to award students

### For Parents
1. **Sign Up**: Create a parent account
   - Enter your email and password
   - Provide your child's name
   - Enter the class code from your teacher
   - Enter your name for teacher communication
2. **Join Class**: You'll automatically be enrolled in the teacher's class
3. **Stay Connected**: Receive updates and chat with your child's teacher
4. **Track Progress**: Monitor your child's points and achievements

## Database Structure

### Collections

#### Teachers
```
teachers/{teacherId}
- email: string
- classId: string (unique identifier)
- parents: array of parent objects
```

#### Parents
```
parents/{parentId}
- email: string
- classCode: string
- kidsName: string
- parentName: string
- teacherId: string
- enrolledAt: timestamp
```

#### Posts
```
posts/{postId}
- teacherId: string
- content: string
- images: array of image URLs
- timestamp: timestamp
- likes: number
- comments: array
- tags: array
- studentIds: array
```

#### Messages
```
messages/{messageId}
- senderId: string
- receiverId: string
- content: string
- timestamp: timestamp
- read: boolean
```

#### Points Transactions
```
pointsTransactions/{transactionId}
- teacherId: string
- teacherName: string
- studentId: string
- studentName: string
- points: number
- reason: string
- timestamp: timestamp
```

## Socket.IO Events

### Client to Server
- `join`: Join a class room
- `new_message`: Send a message
- `new_post`: Create a new post
- `new_transaction`: Award points

### Server to Client
- `message_received`: Receive a new message
- `post_created`: New post notification
- `transaction_created`: New points transaction

## Mobile Deployment

The app is built with Capacitor for mobile deployment:

```bash
# Build for mobile
npm run build

# Add Android platform
npx cap add android

# Sync with mobile
npx cap sync

# Open in Android Studio
npx cap open android
```

## Security Notes

1. **Firebase Rules**: Ensure proper Firestore security rules are configured
2. **Authentication**: All Firebase operations require user authentication
3. **Class Codes**: Unique class codes prevent unauthorized access
4. **Real-time Validation**: Socket.IO server validates user permissions

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.
