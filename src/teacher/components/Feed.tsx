import React, { useState, useEffect } from 'react';
import PostCard from './PostCard';
import CreatePost from './CreatePost';
import { Post, Comment } from '../../types';
import { socketService } from '../../services/socket';

interface FeedProps {
  onCreatePost: () => void;
}

const Feed: React.FC<FeedProps> = ({ onCreatePost }) => {
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      content: "Today we had an amazing volcano science experiment! 🌋 The children were so excited to see the 'lava' flow down the mountain. We talked about how real volcanoes work and even made up stories about volcano adventures.",
      images: [
        'public/Child_mock1.webp',
        'public/child_mock2.webp'
      ],
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      likes: 5,
      comments: [
        {
          id: '1',
          content: "Emma loved telling us about this at dinner! Thank you for sharing.",
          author: "Sarah Johnson",
          timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
          avatar: "👤"
        }
      ],
      tags: ['science', 'experiment'],
      studentIds: []
    },
    {
      id: '2',
      content: "Art time was magical today! 🎨 We created beautiful rainbow paintings using sponges and different textures. The children learned about primary and secondary colors while expressing their creativity.",
      images: [
        'public/child_mock3.webp'
      ],
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      likes: 8,
      comments: [
        {
          id: '2',
          content: "Noah came home covered in paint and so proud of his artwork!",
          author: "Lisa Davis",
          timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
          avatar: "👤"
        },
        {
          id: '3',
          content: "These activities are so creative. Thank you!",
          author: "Mike Johnson",
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
          avatar: "👤"
        }
      ],
      tags: ['art', 'creativity'],
      studentIds: []
    },
    {
      id: '3',
      content: "Garden exploration day! 🌱 We planted seeds in our classroom garden and talked about what plants need to grow. The children were so gentle with the tiny seeds and are already asking when they'll sprout.",
      images: [
        'public/child_mock4.webp'
      ],
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      likes: 12,
      comments: [],
      tags: ['garden', 'nature'],
      studentIds: []
    }
  ]);

  useEffect(() => {
    // Listen for real-time post updates
    socketService.on('new_post', (newPost: Post) => {
      setPosts(prevPosts => [newPost, ...prevPosts]);
    });

    socketService.on('post_liked', (data: { postId: string; likes: number }) => {
      setPosts(prevPosts => 
        prevPosts.map(post => 
          post.id === data.postId 
            ? { ...post, likes: data.likes }
            : post
        )
      );
    });

    socketService.on('new_comment', (data: { postId: string; comment: Comment }) => {
      setPosts(prevPosts => 
        prevPosts.map(post => 
          post.id === data.postId 
            ? { ...post, comments: [...post.comments, data.comment] }
            : post
        )
      );
    });

    return () => {
      socketService.off('new_post');
      socketService.off('post_liked');
      socketService.off('new_comment');
    };
  }, []);

  const handleCreatePost = (newPost: { content: string; images: string[]; tags: string[] }) => {
    const post: Post = {
      id: Date.now().toString(),
      ...newPost,
      timestamp: new Date(),
      likes: 0,
      comments: [],
      studentIds: []
    };
    
    setPosts([post, ...posts]);
    
    // Emit to socket for real-time updates
    socketService.emit('new_post', post);
  };

  const handleLike = (postId: string) => {
    const updatedPosts = posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + 1 }
        : post
    );
    setPosts(updatedPosts);
    
    const updatedPost = updatedPosts.find(p => p.id === postId);
    if (updatedPost) {
      socketService.emit('like_post', { postId, likes: updatedPost.likes });
    }
  };

  const handleComment = (postId: string, commentContent: string) => {
    const newComment: Comment = {
      id: Date.now().toString(),
      content: commentContent,
      author: "Ms. Shreya Kapoor", // Teacher name
      timestamp: new Date(),
      avatar: "👤"
    };

    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, comments: [...post.comments, newComment] }
        : post
    ));
    
    socketService.emit('add_comment', { postId, comment: newComment });
  };

  return (
    <div className="w-full px-1 py-6 space-y-6">
      {/* Welcome Card */}
      <div className="bg-gradient-to-r from-coral-400 to-peach-400 rounded-3xl p-8 text-white shadow-xl">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Good Morning! ☀️</h2>
          <p className="text-white/90 mb-6">Ready to share today's wonderful moments?</p>
          <button 
            onClick={onCreatePost}
            className="bg-white/20 backdrop-blur-sm text-white px-8 py-3 rounded-2xl font-semibold hover:bg-white/30 transition-all duration-200 border border-white/20"
          >
            Share Activity
          </button>
        </div>
      </div>

      {/* Posts */}
      <div className="space-y-6">
        {posts.map(post => (
          <PostCard 
            key={post.id} 
            post={post} 
            onLike={handleLike}
            onComment={handleComment}
          />
        ))}
      </div>
    </div>
  );
};

export default Feed;