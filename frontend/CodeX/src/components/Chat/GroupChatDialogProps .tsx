import React, { useState, useRef, useEffect } from 'react';
import { FiPaperclip, FiSend, FiMic, FiInfo, FiMoreVertical, FiArrowLeft } from "react-icons/fi";
import { BsEmojiSmile } from "react-icons/bs";
import { dummyMessages } from '../Chat/allCategoryData/dummyMessages ';

interface GroupChatDialogProps {
  groupInfo: {
    pic: string;
    heading: string;
    description: string;
  };
  onBack: () => void;
}

const GroupChatDialog: React.FC<GroupChatDialogProps> = ({ groupInfo, onBack }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(dummyMessages);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [autoScroll, setAutoScroll] = useState(true);

  // Scroll to bottom function
  const scrollToBottom = () => {
    if (messagesEndRef.current && autoScroll) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Watch for new messages and scroll
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle scroll events
  const handleScroll = () => {
    if (!chatContainerRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
    setAutoScroll(isNearBottom);
  };

  // Setup scroll observer
  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (!chatContainer) return;

    // Create observer for chat container
    const observer = new MutationObserver(() => {
      if (autoScroll) {
        scrollToBottom();
      }
    });

    // Start observing
    observer.observe(chatContainer, {
      childList: true,
      subtree: true
    });

    // Initial scroll
    scrollToBottom();

    return () => observer.disconnect();
  }, []);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: String(Date.now()),
        sender: 'You',
        content: message,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isMe: true
      };
      setMessages(prev => [...prev, newMessage]);
      setMessage('');
      setAutoScroll(true); // Enable auto-scroll when sending a message
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#120A1A] relative w-[calc(100%-240px)] ml-[240px]">
      {/* Fixed Header */}
      <div className="fixed top-0 right-0 z-50 bg-[#120A1A] shadow-lg w-[calc(100%-240px)]">
        <div className="relative h-24">
          {/* Banner Image with Gradient Overlay */}
          <div className="absolute inset-0">
            <img 
              src={groupInfo.pic} 
              alt={groupInfo.heading} 
              className="w-full h-full object-cover opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#120A1A] via-[#120A1A]/70 to-[#120A1A]/30"></div>
          </div>
          
          {/* Back Button */}
          <button 
            onClick={onBack}
            className="absolute top-4 left-4 z-30 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
          >
            <FiArrowLeft size={20} />
          </button>

          {/* Group Info */}
          <div className="absolute bottom-2 left-0 w-full flex items-center px-6 z-30">
            <div className="w-12 h-12 rounded-full border-2 border-white overflow-hidden mr-4">
              <img 
                src={groupInfo.pic} 
                alt={groupInfo.heading} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold text-white">{groupInfo.heading}</h2>
              <p className="text-xs text-gray-200">{groupInfo.description}</p>
            </div>
            <div className="flex gap-3">
              <button className="w-8 h-8 rounded-full bg-[#2D1B2F] flex items-center justify-center hover:bg-[#3D2B3F] transition-colors">
                <FiInfo size={20} />
              </button>
              <button className="w-8 h-8 rounded-full bg-[#2D1B2F] flex items-center justify-center hover:bg-[#3D2B3F] transition-colors">
                <FiMoreVertical size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable Chat Area */}
      <div 
        ref={chatContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto px-4 py-6"
        style={{ 
          marginTop: '96px',
          marginBottom: '80px',
          height: 'calc(100vh - 96px - 80px)'
        }}
      >
        <div className="space-y-4">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[70%] p-3 rounded-xl ${
                  msg.isMe 
                    ? 'bg-[#1D4ED8] text-white rounded-tr-none' 
                    : 'bg-[#2D1B2F] text-white rounded-tl-none'
                }`}
              >
                {!msg.isMe && <div className="font-semibold text-xs text-blue-300 mb-1">{msg.sender}</div>}
                <p className="text-sm">{msg.content}</p>
                <div className={`text-xs ${msg.isMe ? 'text-blue-200' : 'text-gray-400'} text-right mt-1`}>
                  {msg.timestamp}
                </div>
              </div>
            </div>
          ))}
          {/* Invisible element to scroll to */}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Fixed Message Input Area */}
      <div className="fixed bottom-0 right-0 bg-[#120A1A] border-t border-gray-800/30 p-4 shadow-lg w-[calc(100%-240px)]">
        <div className="flex items-center gap-2 bg-[#2D1B2F] rounded-full px-4 py-2">
          <button className="text-gray-400 hover:text-white transition-colors">
            <BsEmojiSmile size={20} />
          </button>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type a message..."
            className="flex-1 bg-transparent text-white focus:outline-none min-h-[40px] max-h-24 py-2 resize-none"
          />
          <button className="text-gray-400 hover:text-white transition-colors">
            <FiPaperclip size={20} />
          </button>
          <button className="text-gray-400 hover:text-white transition-colors">
            <FiMic size={20} />
          </button>
          <button 
            onClick={handleSendMessage}
            className="w-10 h-10 rounded-full bg-[#1D4ED8] flex items-center justify-center hover:bg-[#1D4ED8]/90 transition-colors"
          >
            <FiSend size={20} color="white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GroupChatDialog;
