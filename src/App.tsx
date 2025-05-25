import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Menu } from 'lucide-react';
import { ThemeProvider } from './context/ThemeContext';
import Sidebar, { TrendingTopic } from './components/Layout/Sidebar';
import MessageItem from './components/Chat/MessageItem';
import ChatInput from './components/Chat/ChatInput';
import TypingIndicator from './components/Chat/TypingIndicator';
import './App.css';

interface Message {
  type: 'user' | 'assistant';
  content: string;
}

function App() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleTopicSelect = (topic: TrendingTopic) => {
    const topicContent = `# ${topic.title}\n\n${topic.description}\n\n${getTopicImage(topic.category)}\n\nWhat would you like to know about this topic?`;
    
    setMessages([{
      type: 'assistant',
      content: topicContent
    }]);
  };
  
  const getTopicImage = (category: string): string => {
    const images = {
      'Technology': '![AI in Healthcare](https://images.pexels.com/photos/7089629/pexels-photo-7089629.jpeg)',
      'Education': '![Machine Learning](https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg)',
      'Business': '![Future of Work](https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg)',
      'Environment': '![Sustainable AI](https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg)',
      'Society': '![AI Ethics](https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg)',
      'General': '![AI Assistant](https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg)'
    };
    
    return images[category as keyof typeof images] || '';
  };
  
  async function generate() {
    if (!question.trim() || isLoading) return;
    
    setIsLoading(true);
    const newUserMessage = { type: 'user' as const, content: question };
    setMessages(prev => [...prev, newUserMessage]);
    setQuestion("");
    
    try {
      const response = await axios({
        url: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyBbgL31esH2Kikw07l9ZWBlMbHmndETbxY',
        method: "post",
        data: { 
          contents: [
            {parts: [{text: question}]},
          ],
        },
      });
      
      const assistantResponse = response.data.candidates[0].content.parts[0].text;
      setMessages(prev => [...prev, { type: 'assistant', content: assistantResponse }]);
    } catch (error) {
      console.error("Error generating response:", error);
      setMessages(prev => [...prev, { 
        type: 'assistant', 
        content: "Sorry, there was an error generating a response. Please try again." 
      }]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <ThemeProvider>
      <div className="app-container">
        <Sidebar 
          isOpen={isSidebarOpen} 
          toggleSidebar={toggleSidebar}
          onTopicSelect={handleTopicSelect}
        />
        
        <main className="main-content">
          <header className="app-header">
            <div className="header-content">
              <button className="menu-button" onClick={toggleSidebar}>
                <Menu size={20} />
              </button>
              <h1>Chal P👀ch</h1>
            </div>
          </header>

          <div className="chat-container">
            <div className="messages-container">
              {messages.length === 0 ? (
                <div className="empty-state">
                <h2>🤖 Welcome to Chal P👀ch!</h2>
<p>Your smart, sassy AI buddy is here — ready to drop facts, crack jokes, and solve anything you throw at me. Pick a trending vibe or hit me with something fresh!</p>


                </div>
              ) : (
                messages.map((message, index) => (
                  <MessageItem 
                    key={index} 
                    type={message.type} 
                    content={message.content} 
                  />
                ))
              )}
              
              {isLoading && (
                <div className="message assistant">
                  <div className="message-content">
                    <div className="message-avatar">
                      <TypingIndicator />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <ChatInput 
              value={question}
              onChange={setQuestion}
              onSend={generate}
              isLoading={isLoading}
            />
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;