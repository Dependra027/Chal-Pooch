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

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    try {
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        method: "post",
        data: { 
          contents: [
            { parts: [{ text: question }] },
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

//notes
/*
Absolutely! Here’s a **detailed explanation** of your `App` component, covering structure, logic, and how it ties everything together for your chat app **Chal P👀ch**:

---

## 1. **Imports and Setup**

```tsx
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Menu } from 'lucide-react';
import { ThemeProvider } from './context/ThemeContext';
import Sidebar, { TrendingTopic } from './components/Layout/Sidebar';
import MessageItem from './components/Chat/MessageItem';
import ChatInput from './components/Chat/ChatInput';
import TypingIndicator from './components/Chat/TypingIndicator';
import './App.css';
```

* React hooks for state, refs, and effects.
* `axios` for HTTP requests to the Gemini API.
* UI components: sidebar, chat message item, input, and typing indicator.
* Theme context provider wraps the entire app.
* Icon component (`Menu`) for sidebar toggle.
* Styles imported from `App.css`.

---

## 2. **Type Definition**

```tsx
interface Message {
  type: 'user' | 'assistant';
  content: string;
}
```

* Defines shape of chat messages.
* `type` specifies if message is from user or assistant.
* `content` holds the message text.

---

## 3. **State Management**

```tsx
const [question, setQuestion] = useState("");
const [messages, setMessages] = useState<Message[]>([]);
const [isLoading, setIsLoading] = useState(false);
const [isSidebarOpen, setIsSidebarOpen] = useState(false);
const messagesEndRef = useRef<HTMLDivElement>(null);
```

* `question`: current user input text.
* `messages`: array of chat messages displayed.
* `isLoading`: whether AI response is being generated.
* `isSidebarOpen`: toggle state for sidebar visibility.
* `messagesEndRef`: DOM ref to the bottom of messages for auto-scrolling.

---

## 4. **Auto-scroll to Bottom**

```tsx
const scrollToBottom = () => {
  messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
};

useEffect(() => {
  scrollToBottom();
}, [messages]);
```

* Whenever `messages` updates (new message added), scrolls chat view to the latest message smoothly.

---

## 5. **Sidebar Control**

```tsx
const toggleSidebar = () => {
  setIsSidebarOpen(!isSidebarOpen);
};
```

* Toggles sidebar open/closed state.

---

## 6. **Topic Selection Handler**

```tsx
const handleTopicSelect = (topic: TrendingTopic) => {
  const topicContent = `# ${topic.title}\n\n${topic.description}\n\n${getTopicImage(topic.category)}\n\nWhat would you like to know about this topic?`;
  
  setMessages([{
    type: 'assistant',
    content: topicContent
  }]);
};
```

* When a trending topic is clicked:

  * Constructs a message string with the topic title, description, and related image markdown.
  * Resets messages to a single assistant message introducing the topic.

---

## 7. **Helper: Get Topic Image**

```tsx
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
```

* Returns markdown string for an image URL matching the topic’s category.
* Used inside the topic message for richer UI (markdown image rendering assumed).

---

## 8. **Generate AI Response**

```tsx
async function generate() {
  if (!question.trim() || isLoading) return;
  
  setIsLoading(true);
  const newUserMessage = { type: 'user' as const, content: question };
  setMessages(prev => [...prev, newUserMessage]);
  setQuestion("");

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  try {
    const response = await axios({
      url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      method: "post",
      data: { 
        contents: [
          { parts: [{ text: question }] },
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
```

* Prevents empty or concurrent requests.
* Adds user's question to message list and clears input.
* Calls Gemini API with the question.
* On success: adds assistant's reply to messages.
* On failure: shows error message from assistant.
* Handles loading state to disable inputs or show indicators.

---

## 9. **JSX Structure**

```tsx
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
```

* **ThemeProvider** wraps everything to provide theming context.
* `Sidebar` component:

  * Controlled by `isSidebarOpen`.
  * Calls `handleTopicSelect` when user picks a topic.
* Main chat area:

  * Header with sidebar toggle button and app title.
  * Chat container:

    * If no messages, shows a friendly welcome prompt.
    * Otherwise, renders `MessageItem` for each message.
    * Shows a typing indicator if loading.
    * Uses a ref to keep scroll at bottom.
  * `ChatInput` component for user text input and send action.

---

## 10. **Summary**

* The app manages **chat interaction state** and **sidebar topic browsing**.
* Sends user questions to Gemini API and displays assistant responses.
* Uses React hooks to manage UI state and side effects like scrolling.
* Integrates theme context and sidebar toggle.
* Provides a smooth UX with loading indicators and auto-scroll.

---



*/