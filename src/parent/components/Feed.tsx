import React, { useState, useEffect } from 'react';
import PostCard from './PostCard';
import { Post, Comment } from '../../types';
import { socketService } from '../../services/socket';

const Feed: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      content: "Today we had an amazing volcano science experiment! 🌋 The children were so excited to see the 'lava' flow down the mountain. We talked about how real volcanoes work and even made up stories about volcano adventures.",
      images: [
        'https://images.pexels.com/photos/8466791/pexels-photo-8466791.jpeg?auto=compress&cs=tinysrgb&w=500&h=400&fit=crop',
        'https://images.pexels.com/photos/8613380/pexels-photo-8613380.jpeg?auto=compress&cs=tinysrgb&w=500&h=400&fit=crop'
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
        'https://images.pexels.com/photos/8613317/pexels-photo-8613317.jpeg?auto=compress&cs=tinysrgb&w=500&h=400&fit=crop'
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
        'https://images.pexels.com/photos/8613086/pexels-photo-8613086.jpeg?auto=compress&cs=tinysrgb&w=500&h=400&fit=crop'
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
      author: "Parent", // Parent name
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
      <div className="bg-lavender-400 rounded-3xl p-8 text-white shadow-xl mx-2">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Good Morning! ☀️</h2>
          <p className="text-white/90 mb-6">See what your child has been learning today</p>
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