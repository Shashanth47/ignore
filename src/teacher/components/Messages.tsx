import React, { useState, useEffect } from 'react';
import { Search, Send, User, FileText, Bell, MessageSquare, Award, MessageCircle, Heart, Reply, Trash2, MoreHorizontal } from 'lucide-react';
import Feed from './Feed';
import { socketService } from '../../services/socket';
import { useAuth } from '../../contexts/AuthContext';
import { getParentsForTeacher } from '../../firebase/classService';
import { Parent } from '../../types';

interface MessagesProps {
  onClose: () => void;
  onCreatePost: () => void;
  showDM: boolean;
  onCloseDM: () => void;
}

const Messages: React.FC<MessagesProps> = ({ onClose, onCreatePost, showDM, onCloseDM }) => {
  const { user } = useAuth();
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [messageType, setMessageType] = useState<'general' | 'report' | 'reminder' | 'achievement'>('general');
  const [messages, setMessages] = useState<any[]>([]);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [parents, setParents] = useState<Parent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchParents = async () => {
      if (!user?.uid) return;
      
      try {
        const parentsData = await getParentsForTeacher(user.uid);
        setParents(parentsData);
      } catch (error) {
        console.error('Error fetching parents:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchParents();
  }, [user?.uid]);

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

    socketService.on('message_deleted', (messageId: string) => {
      setMessages(prevMessages => prevMessages.filter(msg => msg.id !== messageId));
    });

    return () => {
      socketService.off('new_message');
      socketService.off('message_reaction');
      socketService.off('message_deleted');
    };
  }, []);


  const messageTypes = [
    { id: 'general', label: 'General', icon: MessageSquare, color: 'from-blue-500 to-purple-500' },
    { id: 'report', label: 'Report', icon: FileText, color: 'from-green-500 to-teal-500' },
    { id: 'reminder', label: 'Reminder', icon: Bell, color: 'from-orange-500 to-red-500' },
    { id: 'achievement', label: 'Achievement', icon: Award, color: 'from-yellow-500 to-orange-500' },
  ];

  const selectedParentData = parents.find(p => p.id === selectedStudent);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const newMsg = {
        id: Date.now().toString(),
        content: newMessage,
        type: messageType,
        sender: 'teacher',
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
        studentId: selectedStudent,
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

  const handleDeleteMessage = (messageId: string) => {
    if (confirm('Delete this message?')) {
      setMessages(messages.filter(msg => msg.id !== messageId));
      socketService.emit('delete_message', messageId);
    }
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

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'general': return 'bg-lavender-400 text-white';
      case 'report': return 'bg-mint-400 text-white';
      case 'reminder': return 'bg-coral-400 text-white';
      case 'achievement': return 'bg-mustard-400 text-white';
      default: return 'bg-lavender-400 text-white';
    }
  };

  const getMessageBubbleColor = (type: string, isTeacher: boolean) => {
    if (!isTeacher) {
      return 'bg-white text-slate-700 border border-lavender-100 shadow-md';
    }
    
    switch (type) {
      case 'general': return 'bg-gradient-to-r from-lavender-400 to-lavender-500 text-white';
      case 'report': return 'bg-gradient-to-r from-mint-400 to-mint-500 text-white';
      case 'reminder': return 'bg-gradient-to-r from-coral-400 to-coral-500 text-white';
      case 'achievement': return 'bg-gradient-to-r from-mustard-400 to-mustard-500 text-white';
      default: return 'bg-gradient-to-r from-coral-400 to-peach-400 text-white';
    }
  };

  return (
    <div className="min-h-screen bg-peach-50">
      <div className="max-w-4xl mx-auto p-6">
        {!selectedStudent && !showDM ? (
          /* Feed Section */
          <Feed onCreatePost={onCreatePost} />
        ) : !selectedStudent && showDM ? (
          /* Student Selection */
          <div className="w-full">
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-coral-500">
                  Direct Messages
                </h2>
                <button 
                  onClick={onCloseDM}
                  className="text-sm text-coral-600 hover:text-coral-800 font-medium"
                >
                  ← Back to feed
                </button>
              </div>
            </div>
            <div>
              <div className="relative mb-6">
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search parents..."
                  className="w-full pl-10 pr-4 py-3 bg-white border border-lavender-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-coral-400 focus:border-transparent shadow-sm"
                />
              </div>
              
              {loading ? (
                <div className="animate-pulse space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="bg-white p-6 rounded-3xl shadow-sm h-24"></div>
                    ))}
                  </div>
                </div>
              ) : parents.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-3xl shadow-sm">
                  <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-500 mb-2">No parents enrolled yet</h3>
                  <p className="text-gray-400">
                    Share your class code with parents to start messaging!
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {parents.map((parent) => (
                    <button
                      key={parent.id}
                      onClick={() => setSelectedStudent(parent.id)}
                      className="bg-white p-6 rounded-3xl shadow-sm border border-lavender-100 hover:shadow-lg transition-all duration-200 text-left"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-peach-400 rounded-full flex items-center justify-center text-2xl shadow-md">
                          <span className="text-white">👤</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-gray-800">{parent.name}</h3>
                          </div>
                          <p className="text-sm text-gray-500 mb-2">
                            Child: {parent.kidsName}
                          </p>
                          <p className="text-sm text-gray-600 truncate">
                            {parent.email}
                          </p>
                          <span className="text-xs text-gray-400 mt-1 block">
                            {parent.enrolledAt ? new Date(parent.enrolledAt).toLocaleDateString() : 'Recently enrolled'}
                          </span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Chat Interface */
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-lavender-100">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-coral-400 to-peach-400 p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">
                  Chat with {selectedParentData?.name}
                </h2>
                <button 
                  onClick={() => setSelectedStudent(null)}
                  className="text-white/80 hover:text-white font-medium bg-white/20 px-4 py-2 rounded-full transition-all duration-200"
                >
                  ← Back to parents
                </button>
              </div>
              
              {/* Student Info Card */}
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-white/30 rounded-full flex items-center justify-center text-2xl shadow-md">
                    <span className="text-white">👤</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-lg">{selectedParentData?.kidsName}</h3>
                    <p className="text-white/80 text-sm">
                      Parent: {selectedParentData?.name}
                    </p>
                    <p className="text-white/80 text-xs">
                      {selectedParentData?.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="h-96 p-6 overflow-y-auto bg-gradient-to-b from-peach-25 to-lavender-25">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.sender === 'teacher' ? 'justify-end' : 'justify-start'}`}>
                    <div className="max-w-md group">
                      <div className={`p-4 rounded-2xl shadow-lg relative ${
                        getMessageBubbleColor(message.type, message.sender === 'teacher')
                      } ${
                        message.sender === 'teacher' ? 'rounded-tr-md' : 'rounded-tl-md'
                      }`}>
                        {message.type !== 'general' && (
                          <div className={`flex items-center space-x-2 mb-2 px-3 py-1 rounded-full text-xs font-medium ${
                            message.sender === 'teacher' 
                              ? 'bg-white/20 text-white' 
                              : getTypeColor(message.type)
                          }`}>
                            {getMessageTypeIcon(message.type)}
                            <span>{message.type.toUpperCase()}</span>
                          </div>
                        )}
                        <p className="text-sm leading-relaxed">{message.content}</p>
                        
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
                          {message.sender === 'teacher' && (
                            <button
                              onClick={() => handleDeleteMessage(message.id)}
                              className="p-1 bg-white rounded-full shadow-md hover:scale-110 transition-transform duration-200"
                            >
                              <Trash2 size={12} className="text-red-500" />
                            </button>
                          )}
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
                      
                      <span className={`text-xs text-gray-500 mt-2 block ${message.sender === 'teacher' ? 'text-right' : 'text-left'}`}>
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

            {/* Message Type Selector */}
            <div className="px-6 py-4 bg-gradient-to-r from-peach-50 to-lavender-50 border-t border-lavender-100">
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {messageTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <button
                      key={type.id}
                      onClick={() => setMessageType(type.id as any)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap shadow-sm ${
                        messageType === type.id
                          ? getTypeColor(type.id) + ' shadow-md transform scale-105'
                          : 'bg-white text-slate-600 hover:bg-lavender-100 hover:shadow-md'
                      }`}
                    >
                      <Icon size={16} />
                      <span>{type.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Message Input */}
            <div className="p-6 bg-white border-t border-lavender-100">
              <form onSubmit={handleSendMessage} className="flex space-x-3">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder={replyingTo ? 'Type a reply...' : `Type a ${messageType} message...`}
                  className="flex-1 px-6 py-4 bg-gradient-to-r from-peach-50 to-lavender-50 border border-lavender-200 rounded-3xl focus:outline-none focus:ring-2 focus:ring-coral-400 focus:border-transparent shadow-sm text-sm"
                />
                <button
                  type="submit"
                  disabled={!newMessage.trim()}
                  className="px-6 py-4 bg-gradient-to-r from-coral-400 to-peach-400 text-white rounded-3xl hover:from-coral-500 hover:to-peach-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
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