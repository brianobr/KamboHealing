import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send, ExternalLink, Bot } from "lucide-react";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [useIframeMode, setUseIframeMode] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const conversationId = useRef<string | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen) {
      // Ensure scroll container is ready
      setTimeout(scrollToBottom, 100);
    }
  }, [isOpen]);

  const initializeConversation = async () => {
    if (conversationId.current) return;

    try {
      const response = await fetch('/api/chatbot/start', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        conversationId.current = data.conversationId;
        
        // Add welcome message
        setMessages([{
          id: '1',
          text: "Hi! I'm your Kambo healing assistant. How can I help you today?",
          isUser: false,
          timestamp: new Date()
        }]);
      }
    } catch (error) {
      console.error('Failed to initialize chatbot:', error);
      setMessages([{
        id: '1',
        text: "Hello! I'm here to help with questions about Kambo healing. What would you like to know?",
        isUser: false,
        timestamp: new Date()
      }]);
    }
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chatbot/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputMessage,
          conversationId: conversationId.current
        })
      });

      if (response.ok) {
        const data = await response.json();
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: data.response || "I'm here to help with Kambo healing questions.",
          isUser: false,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm having trouble connecting right now. Please feel free to contact Matt directly for immediate assistance.",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const openChatbot = () => {
    setIsOpen(true);
    if (messages.length === 0) {
      initializeConversation();
    }
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <Button
          onClick={openChatbot}
          className="fixed bottom-6 right-6 w-18 h-18 rounded-full bg-kambo-green hover:bg-kambo-green/90 text-white shadow-lg z-50 transition-all duration-300 hover:scale-110"
          aria-label="Open chat"
        >
          <MessageCircle className="w-8 h-8" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[500px] shadow-2xl z-50 flex flex-col border-kambo-green/20 overflow-hidden">
          <CardHeader className="p-4 rounded-t-lg" style={{ backgroundColor: '#2d5016' }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CardTitle className="text-lg font-medium text-white">
                  Kambo Healing Assistant
                  <span className="text-xs font-normal text-white/90 ml-2">
                    {useIframeMode ? "(online)" : "(offline)"}
                  </span>
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setUseIframeMode(!useIframeMode)}
                  className="text-white bg-white/20 hover:bg-white/30 border border-white/40 hover:border-white/60 h-8 w-8 p-0 shadow-sm"
                  title={useIframeMode ? "Switch to fallback mode" : "Switch to Copilot Studio"}
                >
                  {useIframeMode ? <Bot className="w-4 h-4 stroke-2 drop-shadow-sm text-white fill-white" /> : <ExternalLink className="w-4 h-4 stroke-2 drop-shadow-sm text-white fill-white" />}
                </Button>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white bg-white/20 hover:bg-white/30 border border-white/40 hover:border-white/60 h-8 w-8 p-0 shadow-sm"
              >
                <X className="w-4 h-4 stroke-2 drop-shadow-sm text-white fill-white" />
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="flex-1 flex flex-col p-0">
            {useIframeMode ? (
              <div className="flex-1 min-h-0">
                <iframe 
                  src="https://copilotstudio.microsoft.com/environments/Default-569ac018-c71d-4f50-98a7-7a9e9e6765f9/bots/contoso_kambobot/webchat?__version__=2" 
                  frameBorder="0" 
                  className="w-full h-full border-0"
                  title="Kambo Healing Copilot Studio Bot"
                  allow="microphone"
                />
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[340px] min-h-0">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.isUser
                        ? 'text-white border border-white/20'
                        : 'bg-white text-gray-800 border border-gray-200 shadow-sm'
                    }`}
                    style={message.isUser ? { backgroundColor: '#2d5016' } : {}}
                  >
                    <p className="text-sm font-medium">{message.text}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white text-gray-800 border border-gray-200 shadow-sm p-3 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: '#2d5016' }}></div>
                      <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: '#2d5016', animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: '#2d5016', animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-sage-green/20">
              <div className="flex space-x-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about Kambo healing..."
                  className="flex-1 border-sage-green/30 focus:border-kambo-green"
                  disabled={isLoading}
                />
                <Button
                  onClick={sendMessage}
                  disabled={!inputMessage.trim() || isLoading}
                  className="bg-kambo-green hover:bg-kambo-green/90 text-white"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      )}
    </>
  );
}