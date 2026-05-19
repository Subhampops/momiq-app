import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft,
  Send,
  Image as ImageIcon,
  Video,
  Mic,
  Paperclip,
  MoreVertical,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  ThumbsUp,
  Smile as SmileIcon,
  Camera,
  Upload,
  X,
  Play,
  Pause,
  Pin,
  Settings,
  Users,
  Calendar,
  FileText,
  Check,
  CheckCheck
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface SupportGroup {
  id: string;
  name: string;
  description: string;
  category: string;
  members: number;
  icon: React.ReactNode;
  color: string;
}

interface ChatMessage {
  id: string;
  sender: string;
  avatar?: string;
  message: string;
  timestamp: string;
  isCurrentUser: boolean;
  type: 'text' | 'image' | 'video' | 'audio' | 'document' | 'milestone';
  mediaUrl?: string;
  reactions?: { emoji: string; count: number }[];
  seen?: boolean;
}

interface Post {
  id: string;
  author: string;
  avatar?: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  saved: boolean;
  liked: boolean;
  images?: string[];
  category: 'experience' | 'question' | 'milestone' | 'complication';
}

interface SupportGroupChatProps {
  group: SupportGroup;
  onBack: () => void;
  isJoined: boolean;
}

const mockMessages: ChatMessage[] = [
  {
    id: '1',
    sender: 'Sarah Johnson',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
    message: 'Welcome everyone! Feel free to share your experiences and ask any questions. We\'re all here to support each other! 💕',
    timestamp: '10:30 AM',
    isCurrentUser: false,
    type: 'text',
    reactions: [{ emoji: '❤️', count: 5 }, { emoji: '👍', count: 3 }],
    seen: true
  }
];

const mockPosts: Post[] = [];

const emojiReactions = ['❤️', '👍', '😢', '🎉', '🤗', '💪'];

export function SupportGroupChat({ group, onBack, isJoined }: SupportGroupChatProps) {
  const [activeTab, setActiveTab] = useState('chat');
  const [messages, setMessages] = useState<ChatMessage[]>(mockMessages);
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showMediaUpload, setShowMediaUpload] = useState(false);
  const [showPostDialog, setShowPostDialog] = useState(false);
  const [showVoiceRecorder, setShowVoiceRecorder] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [postContent, setPostContent] = useState('');
  const [postCategory, setPostCategory] = useState<'experience' | 'question' | 'milestone' | 'complication'>('experience');
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [showImageViewer, setShowImageViewer] = useState(false);
  const [viewerImages, setViewerImages] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Simulate typing indicator
  useEffect(() => {
    if (newMessage.length > 0) {
      setIsTyping(true);
      const timer = setTimeout(() => setIsTyping(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [newMessage]);

  // Recording timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      setRecordingTime(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: ChatMessage = {
        id: Date.now().toString(),
        sender: 'You',
        message: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isCurrentUser: true,
        type: 'text',
        seen: false
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  const handleReaction = (messageId: string, emoji: string) => {
    setMessages(messages.map(msg => {
      if (msg.id === messageId) {
        const reactions = msg.reactions || [];
        const existingReaction = reactions.find(r => r.emoji === emoji);
        if (existingReaction) {
          return {
            ...msg,
            reactions: reactions.map(r =>
              r.emoji === emoji ? { ...r, count: r.count + 1 } : r
            )
          };
        } else {
          return {
            ...msg,
            reactions: [...reactions, { emoji, count: 1 }]
          };
        }
      }
      return msg;
    }));
  };

  const handleCreatePost = () => {
    if (postContent.trim()) {
      const post: Post = {
        id: Date.now().toString(),
        author: 'You',
        content: postContent,
        timestamp: 'Just now',
        likes: 0,
        comments: 0,
        shares: 0,
        saved: false,
        liked: false,
        images: selectedImages.length > 0 ? selectedImages : undefined,
        category: postCategory
      };
      setPosts([post, ...posts]);
      setPostContent('');
      setSelectedImages([]);
      setShowPostDialog(false);
    }
  };

  const handleLikePost = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          liked: !post.liked,
          likes: post.liked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  };

  const handleSavePost = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return { ...post, saved: !post.saved };
      }
      return post;
    }));
  };

  const handleImageUpload = (type: 'chat' | 'post') => {
    // Simulate image upload
    const mockImageUrl = 'https://images.unsplash.com/photo-1664312550457-7573b60ee093?w=400';
    if (type === 'chat') {
      const message: ChatMessage = {
        id: Date.now().toString(),
        sender: 'You',
        message: 'Shared a photo',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isCurrentUser: true,
        type: 'image',
        mediaUrl: mockImageUrl,
        seen: false
      };
      setMessages([...messages, message]);
    } else {
      setSelectedImages([...selectedImages, mockImageUrl]);
    }
    setShowMediaUpload(false);
  };

  const handleStartRecording = () => {
    setIsRecording(true);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    const message: ChatMessage = {
      id: Date.now().toString(),
      sender: 'You',
      message: 'Voice message',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isCurrentUser: true,
      type: 'audio',
      seen: false
    };
    setMessages([...messages, message]);
    setShowVoiceRecorder(false);
  };

  const formatRecordingTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const openImageViewer = (images: string[], startIndex: number = 0) => {
    setViewerImages(images);
    setCurrentImageIndex(startIndex);
    setShowImageViewer(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-pink-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <Button
                variant="ghost"
                size="icon"
                onClick={onBack}
                className="hover:bg-pink-100 flex-shrink-0"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className={`p-2 rounded-lg ${group.color} flex-shrink-0`}>
                {group.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="truncate text-gray-800">{group.name}</h2>
                <p className="text-pink-600 truncate">{group.members} members</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="hover:bg-pink-100 flex-shrink-0">
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-pink-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full justify-start bg-transparent border-b-0 h-auto p-0 space-x-6 overflow-x-auto">
              <TabsTrigger
                value="chat"
                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-pink-500 data-[state=active]:text-pink-600 rounded-none px-1 pb-3"
              >
                Chat
              </TabsTrigger>
              <TabsTrigger
                value="posts"
                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-pink-500 data-[state=active]:text-pink-600 rounded-none px-1 pb-3"
              >
                Posts
              </TabsTrigger>
              <TabsTrigger
                value="media"
                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-pink-500 data-[state=active]:text-pink-600 rounded-none px-1 pb-3"
              >
                Media
              </TabsTrigger>
              <TabsTrigger
                value="members"
                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-pink-500 data-[state=active]:text-pink-600 rounded-none px-1 pb-3"
              >
                Members
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        <Tabs value={activeTab} className="h-full flex flex-col">
          {/* Chat Tab */}
          <TabsContent value="chat" className="flex-1 m-0 flex flex-col h-full">
            <ScrollArea className="flex-1 px-4 sm:px-6 lg:px-8 py-6">
              <div className="max-w-4xl mx-auto space-y-4">
                {/* Pinned Posts Section */}
                <div className="bg-pink-50 rounded-lg p-4 border border-pink-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Pin className="h-4 w-4 text-pink-600" />
                    <span className="text-pink-600">Pinned Message</span>
                  </div>
                  <p className="text-gray-700">Welcome to {group.name}! Please read our community guidelines and be respectful to all members.</p>
                </div>

                {messages.length === 1 ? (
                  <>
                    {messages.map((message) => (
                      <MessageBubble
                        key={message.id}
                        message={message}
                        onReaction={handleReaction}
                        onImageClick={() => message.mediaUrl && openImageViewer([message.mediaUrl])}
                      />
                    ))}
                    <div className="text-center py-12">
                      <div className="inline-block p-4 bg-pink-50 rounded-full mb-4">
                        <MessageCircle className="h-8 w-8 text-pink-400" />
                      </div>
                      <h3 className="text-gray-700 mb-2">No messages yet</h3>
                      <p className="text-gray-500">Be the first to start the conversation!</p>
                    </div>
                  </>
                ) : (
                  messages.map((message) => (
                    <MessageBubble
                      key={message.id}
                      message={message}
                      onReaction={handleReaction}
                      onImageClick={() => message.mediaUrl && openImageViewer([message.mediaUrl])}
                    />
                  ))
                )}

                {/* Typing Indicator */}
                {isTyping && !messages.some(m => m.isCurrentUser && m.timestamp === new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })) && (
                  <div className="flex gap-2 items-end">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-pink-200 text-pink-700">S</AvatarFallback>
                    </Avatar>
                    <div className="bg-gray-100 rounded-2xl px-4 py-2">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={chatEndRef} />
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="border-t border-pink-100 bg-white p-4">
              <div className="max-w-4xl mx-auto">
                <div className="flex items-end gap-2">
                  <div className="flex-1 bg-gray-50 rounded-2xl border border-gray-200 focus-within:border-pink-400 transition-colors">
                    <div className="flex items-center gap-2 p-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:bg-gray-200 flex-shrink-0"
                        onClick={() => setShowMediaUpload(true)}
                      >
                        <ImageIcon className="h-4 w-4" />
                      </Button>
                      <Input
                        type="text"
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:bg-gray-200 flex-shrink-0"
                        onClick={() => setShowVoiceRecorder(true)}
                      >
                        <Mic className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <Button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="bg-pink-500 hover:bg-pink-600 text-white h-10 w-10 rounded-full flex-shrink-0 p-0"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Posts Tab */}
          <TabsContent value="posts" className="flex-1 m-0 overflow-auto">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="mb-6">
                <Button
                  onClick={() => setShowPostDialog(true)}
                  className="w-full bg-pink-500 hover:bg-pink-600 text-white gap-2"
                >
                  <FileText className="h-4 w-4" />
                  Share Your Experience
                </Button>
              </div>

              {posts.length > 0 ? (
                <div className="space-y-6">
                  {posts.map((post) => (
                    <PostCard
                      key={post.id}
                      post={post}
                      onLike={handleLikePost}
                      onSave={handleSavePost}
                      onImageClick={(images, index) => openImageViewer(images, index)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="inline-block p-4 bg-pink-50 rounded-full mb-4">
                    <FileText className="h-8 w-8 text-pink-400" />
                  </div>
                  <h3 className="text-gray-700 mb-2">No posts yet</h3>
                  <p className="text-gray-500 mb-6">Be the first to share your experience!</p>
                  <Button
                    onClick={() => setShowPostDialog(true)}
                    className="bg-pink-500 hover:bg-pink-600 text-white"
                  >
                    Create First Post
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Media Tab */}
          <TabsContent value="media" className="flex-1 m-0 overflow-auto">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              {messages.filter(m => m.type === 'image' || m.type === 'video').length > 0 ||
               posts.some(p => p.images && p.images.length > 0) ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {messages
                    .filter(m => m.mediaUrl)
                    .map((message) => (
                      <div
                        key={message.id}
                        className="aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={() => message.mediaUrl && openImageViewer([message.mediaUrl])}
                      >
                        <ImageWithFallback
                          src={message.mediaUrl!}
                          alt="Shared media"
                          className="w-full h-full object-cover"
                          query="pregnancy ultrasound"
                        />
                      </div>
                    ))}
                  {posts
                    .filter(p => p.images)
                    .flatMap(p => p.images!)
                    .map((image, index) => (
                      <div
                        key={index}
                        className="aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={() => openImageViewer([image])}
                      >
                        <ImageWithFallback
                          src={image}
                          alt="Post media"
                          className="w-full h-full object-cover"
                          query="baby milestone"
                        />
                      </div>
                    ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="inline-block p-4 bg-pink-50 rounded-full mb-4">
                    <ImageIcon className="h-8 w-8 text-pink-400" />
                  </div>
                  <h3 className="text-gray-700 mb-2">No media shared yet</h3>
                  <p className="text-gray-500">Photos and videos will appear here</p>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Members Tab */}
          <TabsContent value="members" className="flex-1 m-0 overflow-auto">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="text-center py-16">
                <div className="inline-block p-4 bg-pink-50 rounded-full mb-4">
                  <Users className="h-8 w-8 text-pink-400" />
                </div>
                <h3 className="text-gray-700 mb-2">No members yet</h3>
                <p className="text-gray-500">Be the first to join this group!</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Media Upload Dialog */}
      <Dialog open={showMediaUpload} onOpenChange={setShowMediaUpload}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share Media</DialogTitle>
            <DialogDescription>
              Choose what you'd like to share with the group
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <Button
              variant="outline"
              className="h-24 flex-col gap-2 border-pink-200 hover:bg-pink-50 hover:border-pink-400"
              onClick={() => handleImageUpload('chat')}
            >
              <ImageIcon className="h-6 w-6 text-pink-600" />
              <span>Photo</span>
            </Button>
            <Button
              variant="outline"
              className="h-24 flex-col gap-2 border-pink-200 hover:bg-pink-50 hover:border-pink-400"
              onClick={() => {
                const message: ChatMessage = {
                  id: Date.now().toString(),
                  sender: 'You',
                  message: 'Shared a video',
                  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                  isCurrentUser: true,
                  type: 'video',
                  mediaUrl: 'https://images.unsplash.com/photo-1622399149320-8723b1e16e4d?w=400',
                  seen: false
                };
                setMessages([...messages, message]);
                setShowMediaUpload(false);
              }}
            >
              <Video className="h-6 w-6 text-pink-600" />
              <span>Video</span>
            </Button>
            <Button
              variant="outline"
              className="h-24 flex-col gap-2 border-pink-200 hover:bg-pink-50 hover:border-pink-400"
              onClick={() => {
                const message: ChatMessage = {
                  id: Date.now().toString(),
                  sender: 'You',
                  message: 'Shared a milestone: First Ultrasound! 🎉',
                  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                  isCurrentUser: true,
                  type: 'milestone',
                  mediaUrl: 'https://images.unsplash.com/photo-1664312550457-7573b60ee093?w=400',
                  seen: false
                };
                setMessages([...messages, message]);
                setShowMediaUpload(false);
              }}
            >
              <Calendar className="h-6 w-6 text-pink-600" />
              <span>Milestone</span>
            </Button>
            <Button
              variant="outline"
              className="h-24 flex-col gap-2 border-pink-200 hover:bg-pink-50 hover:border-pink-400"
              onClick={() => {
                const message: ChatMessage = {
                  id: Date.now().toString(),
                  sender: 'You',
                  message: 'Shared a document',
                  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                  isCurrentUser: true,
                  type: 'document',
                  seen: false
                };
                setMessages([...messages, message]);
                setShowMediaUpload(false);
              }}
            >
              <Paperclip className="h-6 w-6 text-pink-600" />
              <span>Document</span>
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Voice Recorder Dialog */}
      <Dialog open={showVoiceRecorder} onOpenChange={setShowVoiceRecorder}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Record Voice Note</DialogTitle>
            <DialogDescription>
              Share an audio message with the group
            </DialogDescription>
          </DialogHeader>
          <div className="py-8">
            <div className="flex flex-col items-center gap-6">
              <div className="relative">
                <div className={`w-24 h-24 rounded-full bg-pink-500 flex items-center justify-center ${isRecording ? 'animate-pulse' : ''}`}>
                  <Mic className="h-12 w-12 text-white" />
                </div>
                {isRecording && (
                  <div className="absolute inset-0 rounded-full border-4 border-pink-300 animate-ping"></div>
                )}
              </div>
              <div className="text-center">
                <div className="text-pink-600 mb-2">{formatRecordingTime(recordingTime)}</div>
                <p className="text-gray-600">
                  {isRecording ? 'Recording...' : 'Tap to start recording'}
                </p>
              </div>
              <div className="flex gap-4">
                {!isRecording ? (
                  <Button
                    onClick={handleStartRecording}
                    className="bg-pink-500 hover:bg-pink-600 text-white"
                  >
                    Start Recording
                  </Button>
                ) : (
                  <>
                    <Button
                      onClick={() => {
                        setIsRecording(false);
                        setShowVoiceRecorder(false);
                      }}
                      variant="outline"
                      className="border-gray-300"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleStopRecording}
                      className="bg-pink-500 hover:bg-pink-600 text-white"
                    >
                      Send
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Create Post Dialog */}
      <Dialog open={showPostDialog} onOpenChange={setShowPostDialog}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Share Your Experience</DialogTitle>
            <DialogDescription>
              Share your thoughts, questions, or milestones with the community
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex flex-wrap gap-2">
              <Badge
                variant={postCategory === 'experience' ? 'default' : 'outline'}
                className={`cursor-pointer ${postCategory === 'experience' ? 'bg-pink-500' : 'border-pink-200 text-pink-600'}`}
                onClick={() => setPostCategory('experience')}
              >
                Experience
              </Badge>
              <Badge
                variant={postCategory === 'question' ? 'default' : 'outline'}
                className={`cursor-pointer ${postCategory === 'question' ? 'bg-pink-500' : 'border-pink-200 text-pink-600'}`}
                onClick={() => setPostCategory('question')}
              >
                Question
              </Badge>
              <Badge
                variant={postCategory === 'milestone' ? 'default' : 'outline'}
                className={`cursor-pointer ${postCategory === 'milestone' ? 'bg-pink-500' : 'border-pink-200 text-pink-600'}`}
                onClick={() => setPostCategory('milestone')}
              >
                Milestone
              </Badge>
              <Badge
                variant={postCategory === 'complication' ? 'default' : 'outline'}
                className={`cursor-pointer ${postCategory === 'complication' ? 'bg-pink-500' : 'border-pink-200 text-pink-600'}`}
                onClick={() => setPostCategory('complication')}
              >
                Complication
              </Badge>
            </div>
            <Textarea
              placeholder="Share your thoughts..."
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              className="min-h-[150px] border-pink-200 focus:border-pink-400"
            />
            {selectedImages.length > 0 && (
              <div className="grid grid-cols-3 gap-2">
                {selectedImages.map((image, index) => (
                  <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                    <ImageWithFallback
                      src={image}
                      alt={`Selected ${index + 1}`}
                      className="w-full h-full object-cover"
                      query="pregnancy"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-1 right-1 h-6 w-6 bg-white/80 hover:bg-white"
                      onClick={() => setSelectedImages(selectedImages.filter((_, i) => i !== index))}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="gap-2 border-pink-200 hover:bg-pink-50"
                onClick={() => handleImageUpload('post')}
              >
                <ImageIcon className="h-4 w-4" />
                Add Photo
              </Button>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowPostDialog(false);
                setPostContent('');
                setSelectedImages([]);
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreatePost}
              disabled={!postContent.trim()}
              className="bg-pink-500 hover:bg-pink-600 text-white"
            >
              Post
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Image Viewer Dialog */}
      <Dialog open={showImageViewer} onOpenChange={setShowImageViewer}>
        <DialogContent className="sm:max-w-4xl p-0">
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 z-10 bg-black/50 hover:bg-black/70 text-white"
              onClick={() => setShowImageViewer(false)}
            >
              <X className="h-5 w-5" />
            </Button>
            {viewerImages.length > 0 && (
              <ImageWithFallback
                src={viewerImages[currentImageIndex]}
                alt="Full size"
                className="w-full max-h-[80vh] object-contain"
                query="pregnancy"
              />
            )}
            {viewerImages.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {viewerImages.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full cursor-pointer ${
                      index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  />
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Message Bubble Component
interface MessageBubbleProps {
  message: ChatMessage;
  onReaction: (messageId: string, emoji: string) => void;
  onImageClick: () => void;
}

function MessageBubble({ message, onReaction, onImageClick }: MessageBubbleProps) {
  const [showReactions, setShowReactions] = useState(false);

  return (
    <div className={`flex gap-2 ${message.isCurrentUser ? 'flex-row-reverse' : 'flex-row'} items-end group`}>
      {!message.isCurrentUser && (
        <Avatar className="h-8 w-8 flex-shrink-0">
          <AvatarImage src={message.avatar} />
          <AvatarFallback className="bg-pink-200 text-pink-700">
            {message.sender[0]}
          </AvatarFallback>
        </Avatar>
      )}
      <div className={`flex flex-col ${message.isCurrentUser ? 'items-end' : 'items-start'} max-w-[70%] sm:max-w-md`}>
        {!message.isCurrentUser && (
          <span className="text-gray-600 mb-1 px-2">{message.sender}</span>
        )}
        <div className="relative">
          <div
            className={`rounded-2xl px-4 py-2 ${
              message.isCurrentUser
                ? 'bg-pink-500 text-white rounded-br-md'
                : 'bg-gray-100 text-gray-800 rounded-bl-md'
            }`}
          >
            {message.type === 'text' && <p className="break-words">{message.message}</p>}
            {message.type === 'image' && message.mediaUrl && (
              <div className="space-y-2">
                <div
                  className="rounded-lg overflow-hidden cursor-pointer"
                  onClick={onImageClick}
                >
                  <ImageWithFallback
                    src={message.mediaUrl}
                    alt="Shared image"
                    className="max-w-full h-auto"
                    query="pregnancy ultrasound"
                  />
                </div>
                <p className="text-sm">{message.message}</p>
              </div>
            )}
            {message.type === 'video' && message.mediaUrl && (
              <div className="space-y-2">
                <div className="relative rounded-lg overflow-hidden">
                  <ImageWithFallback
                    src={message.mediaUrl}
                    alt="Video thumbnail"
                    className="max-w-full h-auto"
                    query="baby video"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <Play className="h-12 w-12 text-white" />
                  </div>
                </div>
                <p className="text-sm">{message.message}</p>
              </div>
            )}
            {message.type === 'audio' && (
              <div className="flex items-center gap-3 min-w-[200px]">
                <Button
                  variant="ghost"
                  size="icon"
                  className={`h-8 w-8 rounded-full ${
                    message.isCurrentUser ? 'hover:bg-pink-600' : 'hover:bg-gray-200'
                  }`}
                >
                  <Play className="h-4 w-4" />
                </Button>
                <div className="flex-1 h-1 bg-white/30 rounded-full">
                  <div className="h-full w-1/3 bg-white rounded-full"></div>
                </div>
                <span className="text-xs">0:15</span>
              </div>
            )}
            {message.type === 'milestone' && message.mediaUrl && (
              <div className="space-y-2">
                <div className="rounded-lg overflow-hidden">
                  <ImageWithFallback
                    src={message.mediaUrl}
                    alt="Milestone"
                    className="max-w-full h-auto"
                    query="pregnancy milestone"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <p>{message.message}</p>
                </div>
              </div>
            )}
            {message.type === 'document' && (
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${message.isCurrentUser ? 'bg-pink-600' : 'bg-gray-200'}`}>
                  <Paperclip className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm">{message.message}</p>
                  <p className="text-xs opacity-70">PDF • 2.5 MB</p>
                </div>
              </div>
            )}
          </div>

          {/* Reactions */}
          {message.reactions && message.reactions.length > 0 && (
            <div className={`flex gap-1 mt-1 ${message.isCurrentUser ? 'justify-end' : 'justify-start'}`}>
              {message.reactions.map((reaction, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-full px-2 py-0.5 text-xs flex items-center gap-1 shadow-sm"
                >
                  <span>{reaction.emoji}</span>
                  <span className="text-gray-600">{reaction.count}</span>
                </div>
              ))}
            </div>
          )}

          {/* Reaction Button */}
          <Button
            variant="ghost"
            size="icon"
            className={`absolute -bottom-8 ${message.isCurrentUser ? 'right-0' : 'left-0'} h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity bg-white border border-gray-200 hover:bg-gray-50`}
            onClick={() => setShowReactions(!showReactions)}
          >
            <SmileIcon className="h-3 w-3" />
          </Button>

          {/* Reaction Picker */}
          {showReactions && (
            <div className={`absolute -bottom-12 ${message.isCurrentUser ? 'right-0' : 'left-0'} bg-white border border-gray-200 rounded-full px-2 py-1 shadow-lg flex gap-1 z-10`}>
              {emojiReactions.map((emoji) => (
                <button
                  key={emoji}
                  className="hover:scale-125 transition-transform text-lg"
                  onClick={() => {
                    onReaction(message.id, emoji);
                    setShowReactions(false);
                  }}
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className={`flex items-center gap-2 mt-1 px-2 ${message.isCurrentUser ? 'flex-row-reverse' : 'flex-row'}`}>
          <span className="text-xs text-gray-500">{message.timestamp}</span>
          {message.isCurrentUser && message.seen && (
            <CheckCheck className="h-3 w-3 text-pink-500" />
          )}
          {message.isCurrentUser && !message.seen && (
            <Check className="h-3 w-3 text-gray-400" />
          )}
        </div>
      </div>
    </div>
  );
}

// Post Card Component
interface PostCardProps {
  post: Post;
  onLike: (postId: string) => void;
  onSave: (postId: string) => void;
  onImageClick: (images: string[], index: number) => void;
}

function PostCard({ post, onLike, onSave, onImageClick }: PostCardProps) {
  const [showComments, setShowComments] = useState(false);

  const categoryColors = {
    experience: 'bg-blue-50 text-blue-700 border-blue-200',
    question: 'bg-purple-50 text-purple-700 border-purple-200',
    milestone: 'bg-green-50 text-green-700 border-green-200',
    complication: 'bg-orange-50 text-orange-700 border-orange-200'
  };

  return (
    <Card className="border-pink-100 hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <Avatar className="h-10 w-10 flex-shrink-0">
              <AvatarImage src={post.avatar} />
              <AvatarFallback className="bg-pink-200 text-pink-700">
                {post.author[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-gray-800 truncate">{post.author}</span>
                <Badge
                  variant="outline"
                  className={`${categoryColors[post.category]} text-xs`}
                >
                  {post.category}
                </Badge>
              </div>
              <span className="text-gray-500">{post.timestamp}</span>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="flex-shrink-0">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-700 whitespace-pre-wrap">{post.content}</p>
        {post.images && post.images.length > 0 && (
          <div className={`grid gap-2 ${post.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
            {post.images.map((image, index) => (
              <div
                key={index}
                className="rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => onImageClick(post.images!, index)}
              >
                <ImageWithFallback
                  src={image}
                  alt={`Post image ${index + 1}`}
                  className="w-full h-auto"
                  query="pregnancy journey"
                />
              </div>
            ))}
          </div>
        )}
      </CardContent>
      <Separator className="bg-pink-100" />
      <CardFooter className="flex-col gap-4 pt-4">
        <div className="flex items-center justify-between w-full text-gray-600">
          <div className="flex gap-4">
            <button className="flex items-center gap-1 hover:text-pink-600 transition-colors">
              <Heart className={`h-4 w-4 ${post.liked ? 'fill-pink-500 text-pink-500' : ''}`} />
              <span>{post.likes}</span>
            </button>
            <button className="flex items-center gap-1 hover:text-pink-600 transition-colors">
              <MessageCircle className="h-4 w-4" />
              <span>{post.comments}</span>
            </button>
            <button className="flex items-center gap-1 hover:text-pink-600 transition-colors">
              <Share2 className="h-4 w-4" />
              <span>{post.shares}</span>
            </button>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => onSave(post.id)}
          >
            <Bookmark className={`h-4 w-4 ${post.saved ? 'fill-pink-500 text-pink-500' : ''}`} />
          </Button>
        </div>
        <Separator className="bg-pink-100" />
        <div className="flex gap-2 w-full">
          <Button
            variant="ghost"
            className={`flex-1 gap-2 ${post.liked ? 'text-pink-600' : 'text-gray-600'} hover:bg-pink-50`}
            onClick={() => onLike(post.id)}
          >
            <Heart className={`h-4 w-4 ${post.liked ? 'fill-pink-500' : ''}`} />
            Like
          </Button>
          <Button
            variant="ghost"
            className="flex-1 gap-2 text-gray-600 hover:bg-pink-50"
            onClick={() => setShowComments(!showComments)}
          >
            <MessageCircle className="h-4 w-4" />
            Comment
          </Button>
          <Button variant="ghost" className="flex-1 gap-2 text-gray-600 hover:bg-pink-50">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
        </div>
        {showComments && (
          <div className="w-full pt-4 border-t border-pink-100">
            <div className="text-center py-8 text-gray-500">
              No comments yet. Be the first to comment!
            </div>
            <div className="flex gap-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-pink-200 text-pink-700">Y</AvatarFallback>
              </Avatar>
              <Input
                type="text"
                placeholder="Write a comment..."
                className="flex-1 border-pink-200 focus:border-pink-400"
              />
            </div>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
