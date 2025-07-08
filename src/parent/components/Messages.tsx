import React, { useState, useEffect } from 'react';
import { Search, Send, User, FileText, Bell, MessageSquare, Award, MessageCircle, Heart, Reply, Trash2, MoreHorizontal } from 'lucide-react';
import Feed from './Feed';
import { socketService } from '../../services/socket';

interface MessagesProps {
  onClose: () => void;
  showDM: boolean;
  onCloseDM: () => void;
}

const Messages: React.FC<MessagesProps> = ({ onClose, showDM, onCloseDM }) => {
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: '1',
      content: "Emma showed wonderful curiosity during our volcano experiment today! 🌋",
      type: 'achievement',
      sender: 'teacher',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      reactions: [],
      replies: []
    },
    {
      id: '2',
      content: "Thank you for sharing! Emma loved telling us about it at dinner.",
      type: 'general',
      sender: 'parent',
      timestamp: new Date(Date.now() - 1.5 * 60 * 60 * 1000),
      reactions: [],
      replies: []
    },
    {
      id: '3',
      content: "Emma had a great day! She participated well in circle time and enjoyed the art activity.",
      type: 'report',
      sender: 'teacher',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      reactions: [],
      replies: []
    }
  ]);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  useEffect(() => {
    // Listen for real-time messages
    socketService.on('new_message', (message: any) => {
      setMessages(prevMessages => [...prevMessages, message]);
    });

    socketService.on('message_reaction', (data: { messageId: string; emoji: string; action: 'add' | 'remove' }) => {
      setMessages(prevMessages => 
        prevMessages.map(msg => 
          msg.id === data.messageId 
            ? { 
                ...msg, 
                reactions: data.action === 'add' 
                  ? [...msg.reactions, data.emoji]
                  : msg.reactions.filter(r => r !== data.emoji)
              }
            : msg
        )
      );
    });

    return () => {
      socketService.off('new_message');
      socketService.off('message_reaction');
    };
  }, []);

  const messageTypes = [
    { id: 'general', label: 'General', icon: MessageSquare, color: 'from-blue-500 to-purple-500' },
    { id: 'report', label: 'Report', icon: FileText, color: 'from-green-500 to-teal-500' },
    { id: 'reminder', label: 'Reminder', icon: Bell, color: 'from-orange-500 to-red-500' },
    { id: 'achievement', label: 'Achievement', icon: Award, color: 'from-yellow-500 to-orange-500' },
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const newMsg = {
        id: Date.now().toString(),
        content: newMessage,
        type: 'general',
        sender: 'parent',
        timestamp: new Date(),
        reactions: [],
        replies: []
      };
      
      if (replyingTo) {
        setMessages(messages.map(msg => 
          msg.id === replyingTo 
            ? { ...msg, replies: [...msg.replies, newMsg] }
            : msg
        ));
        setReplyingTo(null);
      } else {
        setMessages([...messages, newMsg]);
      }
      
      // Emit to socket for real-time updates
      socketService.emit('send_message', {
        ...newMsg,
        replyTo: replyingTo
      });
      
      setNewMessage('');
    }
  };

  const handleReaction = (messageId: string, emoji: string) => {
    const message = messages.find(m => m.id === messageId);
    const hasReaction = message?.reactions.includes(emoji);
    
    setMessages(messages.map(msg => 
      msg.id === messageId 
        ? { 
            ...msg, 
            reactions: hasReaction 
              ? msg.reactions.filter(r => r !== emoji)
              : [...msg.reactions, emoji]
          }
        : msg
    ));
    
    socketService.emit('react_to_message', {
      messageId,
      emoji,
      action: hasReaction ? 'remove' : 'add'
    });
  };

  const timeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));
    
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  const getMessageTypeIcon = (type: string) => {
    const messageTypeData = messageTypes.find(mt => mt.id === type);
    if (!messageTypeData) return null;
    const Icon = messageTypeData.icon;
    return <Icon size={16} className="text-white" />;
  };

  return (
    <div className="min-h-screen bg-peach-50">
      <div className="max-w-4xl mx-auto p-6">
        {!showDM ? (
          /* Feed Section */
          <Feed />
        ) : (
          /* Chat Interface */
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-lavender-100">
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-coral-500">
                  Chat with Ms. Sarah
                </h2>
                <button 
                  onClick={onCloseDM}
                  className="text-sm text-coral-600 hover:text-coral-800 font-medium"
                >
                  ← Back to feed
                </button>
              </div>
            </div>
            {/* Chat Header */}
            <div className="p-6 border-b border-lavender-100 bg-peach-50">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-coral-400 rounded-full flex items-center justify-center text-xl shadow-md">
                  <span className="text-white">👤</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Ms. Sarah Johnson</h3>
                  <p className="text-sm text-gray-500">
                    Emma's Teacher • Room 3
                  </p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="h-96 p-6 overflow-y-auto bg-peach-25">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.sender === 'parent' ? 'justify-end' : 'justify-start'}`}>
                    <div className="max-w-xs group">
                      <div className={`p-4 rounded-2xl shadow-md relative ${
                        message.sender === 'parent' 
                          ? 'bg-lavender-400 text-white rounded-tr-md' 
                          : 'bg-white text-slate-700 rounded-tl-md border border-lavender-100'
                      }`}>
                        {message.type !== 'general' && (
                          <div className="flex items-center space-x-2 mb-2">
                            {getMessageTypeIcon(message.type)}
                            <span className="text-xs font-medium opacity-90">{message.type.toUpperCase()}</span>
                          </div>
                        )}
                        <p className="text-sm">{message.content}</p>
                        
                        {/* Message Actions */}
                        <div className="absolute -bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex space-x-1">
                          <button
                            onClick={() => handleReaction(message.id, '❤️')}
                            className="p-1 bg-white rounded-full shadow-md hover:scale-110 transition-transform duration-200"
                          >
                            <Heart size={12} className="text-red-500" />
                          </button>
                          <button
                            onClick={() => setReplyingTo(message.id)}
                            className="p-1 bg-white rounded-full shadow-md hover:scale-110 transition-transform duration-200"
                          >
                            <Reply size={12} className="text-blue-500" />
                          </button>
                        </div>
                      </div>
                      
                      {/* Reactions */}
                      {message.reactions.length > 0 && (
                        <div className="flex space-x-1 mt-2">
                          {message.reactions.map((reaction, index) => (
                            <span key={index} className="text-sm bg-white rounded-full px-2 py-1 shadow-sm">
                              {reaction}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      <span className={`text-xs text-gray-500 mt-2 block ${message.sender === 'parent' ? 'text-right' : 'text-left'}`}>
                        {timeAgo(message.timestamp)}
                      </span>
                      
                      {/* Replies */}
                      {message.replies.length > 0 && (
                        <div className="mt-3 space-y-2 pl-4 border-l-2 border-gray-200">
                          {message.replies.map((reply) => (
                            <div key={reply.id} className="bg-gray-50 p-2 rounded-lg">
                              <p className="text-xs text-gray-700">{reply.content}</p>
                              <span className="text-xs text-gray-500">{timeAgo(reply.timestamp)}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reply Indicator */}
            {replyingTo && (
              <div className="px-6 py-2 bg-lavender-50 border-t border-lavender-100">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">
                    Replying to message...
                  </span>
                  <button
                    onClick={() => setReplyingTo(null)}
                    className="text-xs text-coral-600 hover:text-coral-800"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Message Input */}
            <div className="p-6 bg-white border-t border-lavender-100">
              <form onSubmit={handleSendMessage} className="flex space-x-3">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder={replyingTo ? 'Type a reply...' : 'Type a message...'}
                  className="flex-1 px-4 py-3 bg-lavender-50 border border-lavender-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-coral-400 focus:border-transparent"
                />
                <button
                  type="submit"
                  disabled={!newMessage.trim()}
                  className="px-6 py-3 bg-lavender-400 text-white rounded-2xl hover:bg-lavender-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md"
                >
                  <Send size={18} />
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;