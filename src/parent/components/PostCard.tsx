import React, { useState } from 'react';
import { Clock, Heart, MessageCircle, Send } from 'lucide-react';
import { Post, Comment } from '../../types';

interface PostCardProps {
  post: Post;
  onLike: (postId: string) => void;
  onComment: (postId: string, comment: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onLike, onComment }) => {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [isLiked, setIsLiked] = useState(false);

  const timeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));
    
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike(post.id);
  };

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onComment(post.id, newComment);
      setNewComment('');
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300 mx-1">
      {/* Post Header */}
      <div className="p-6 pb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-coral-400 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">👤</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Ms. Sarah</h3>
              <div className="flex items-center space-x-1 text-sm text-gray-500">
                <Clock size={12} />
                <span>{timeAgo(post.timestamp)}</span>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-1">
            {post.tags.map((tag, index) => (
              <span 
                key={index} 
                className="px-3 py-1 bg-peach-100 text-coral-600 text-xs rounded-full font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        <p className="text-gray-700 leading-relaxed">{post.content}</p>
      </div>

      {/* Images */}
      {post.images.length > 0 && (
        <div className={`px-6 pb-4 grid gap-3 ${post.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
          {post.images.map((image, index) => (
            <div key={index} className="relative rounded-2xl overflow-hidden">
              <img 
                src={image} 
                alt={`Activity ${index + 1}`}
                className="w-full h-48 object-cover"
              />
            </div>
          ))}
        </div>
      )}

      {/* Interaction Bar */}
      <div className="px-6 py-4 border-t border-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-2 transition-all duration-200 ${
                isLiked 
                  ? 'text-red-500' 
                  : 'text-gray-500 hover:text-red-500'
              }`}
            >
              <Heart 
                size={20} 
                className={`transition-all duration-200 ${isLiked ? 'fill-current' : ''}`}
              />
              <span className="text-sm font-medium">
                {post.likes + (isLiked ? 1 : 0)}
              </span>
            </button>
            
            <button
              onClick={() => setShowComments(!showComments)}
              className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors duration-200"
            >
              <MessageCircle size={20} />
              <span className="text-sm font-medium">{post.comments.length}</span>
            </button>
          </div>
          
          <div className="text-xs text-gray-400">
            {post.likes + (isLiked ? 1 : 0)} likes • {post.comments.length} comments
          </div>
        </div>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="px-6 pb-6 border-t border-gray-50">
          {/* Existing Comments */}
          {post.comments.length > 0 && (
            <div className="space-y-3 mb-4">
              {post.comments.map((comment) => (
                <div key={comment.id} className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-mint-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm">👤</span>
                  </div>
                  <div className="flex-1">
                    <div className="bg-gray-50 rounded-2xl px-4 py-3">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-semibold text-sm text-gray-800">{comment.author}</span>
                        <span className="text-xs text-gray-500">{timeAgo(comment.timestamp)}</span>
                      </div>
                      <p className="text-sm text-gray-700">{comment.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Add Comment */}
          <form onSubmit={handleComment} className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-mint-400 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm">👤</span>
            </div>
            <div className="flex-1 flex space-x-2">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
                className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
              />
              <button
                type="submit"
                disabled={!newComment.trim()}
                className="p-2 bg-lavender-400 text-white rounded-full hover:bg-lavender-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                <Send size={16} />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default PostCard;