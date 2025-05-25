import React from 'react';
import { ChevronLeft, ChevronRight, TrendingUp, Plus, Settings, Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  onTopicSelect: (topic: TrendingTopic) => void;
}

export interface TrendingTopic {
  id: string;
  title: string;
  category: string;
  engagement: string;
  description?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar, onTopicSelect }) => {
  const { theme, toggleTheme } = useTheme();
  
  const trendingTopics: TrendingTopic[] = [
    { 
      id: '1', 
      title: 'AI in Healthcare', 
      category: 'Technology',
      engagement: '50K+ discussions',
      description: 'Explore how artificial intelligence is revolutionizing healthcare through improved diagnostics, treatment planning, and patient care.'
    },
    { 
      id: '2', 
      title: 'Machine Learning Basics', 
      category: 'Education',
      engagement: '35K+ discussions',
      description: 'Learn the fundamental concepts of machine learning, including supervised and unsupervised learning, neural networks, and practical applications.'
    },
    { 
      id: '3', 
      title: 'Future of Work', 
      category: 'Business',
      engagement: '28K+ discussions',
      description: 'Discuss how AI and automation are shaping the future workplace, including remote work trends, skill requirements, and organizational changes.'
    },
    { 
      id: '4', 
      title: 'Sustainable AI', 
      category: 'Environment',
      engagement: '22K+ discussions',
      description: 'Discover how AI can contribute to environmental sustainability through efficient resource management, climate modeling, and green technology.'
    },
    { 
      id: '5', 
      title: 'AI Ethics', 
      category: 'Society',
      engagement: '18K+ discussions',
      description: 'Examine ethical considerations in AI development and deployment, including bias, privacy, transparency, and responsible innovation.'
    }
  ];

  const handleTopicClick = (topic: TrendingTopic) => {
    onTopicSelect(topic);
    if (window.innerWidth < 1024) {
      toggleSidebar();
    }
  };

  return (
    <>
      <div className={`sidebar-backdrop ${isOpen ? 'visible' : 'hidden'}`} onClick={toggleSidebar}></div>
      <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <button className="new-chat-btn" onClick={() => handleTopicClick({ 
            id: 'new',
            title: 'New Chat',
            category: 'General',
            engagement: '',
            description: "Hi! I'm Chal P👀ch, your AI assistant. How can I help you today?"
          })}>
            <Plus size={16} />
            <span>New chat</span>
          </button>
          <button className="sidebar-toggle" onClick={toggleSidebar}>
            {isOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
          </button>
        </div>
        
        <div className="sidebar-content">
          <div className="trending-topics">
            <h2>Trending Topics</h2>
            <ul>
              {trendingTopics.map(topic => (
                <li 
                  key={topic.id} 
                  className="trending-item"
                  onClick={() => handleTopicClick(topic)}
                >
                  <TrendingUp size={14} />
                  <div className="trending-details">
                    <span className="trending-title">{topic.title}</span>
                    <div className="trending-meta">
                      <span className="trending-category">{topic.category}</span>
                      <span className="trending-engagement">{topic.engagement}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="sidebar-footer">
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
            <span>{theme === 'light' ? 'Dark mode' : 'Light mode'}</span>
          </button>
          <button className="settings-btn">
            <Settings size={16} />
            <span>Settings(under Developmennt)</span>
          </button>
       <p style={{ fontStyle: 'italic', fontSize: '0.85rem' }}>
  👑 Owner: Dependra Singh
</p>



        </div>
       
      </aside>
    </>
  );
};

export default Sidebar;

//notes
/*
Certainly! Here's a detailed explanation of your **Sidebar** React component code:

---

### Overview

This component renders a sidebar with:

* A toggleable open/close state
* A list of trending AI-related topics
* Buttons for starting a new chat, toggling the theme, and accessing settings
* A small footer with owner info

It uses TypeScript and React hooks, and integrates theme toggling from a context.

---

### Detailed Breakdown

---

#### 1. **Imports**

```tsx
import React from 'react';
import { ChevronLeft, ChevronRight, TrendingUp, Plus, Settings, Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
```

* **React**: Core library.
* **Icons**: Various icons from `lucide-react` for UI elements (arrows, trending, plus, settings, sun/moon).
* **useTheme**: Custom hook to get the current theme and toggle function from a ThemeContext.

---

#### 2. **Props Interface**

```tsx
interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  onTopicSelect: (topic: TrendingTopic) => void;
}
```

* `isOpen`: Whether the sidebar is open or closed.
* `toggleSidebar`: Function to toggle the sidebar state.
* `onTopicSelect`: Callback fired when a trending topic (or "New chat") is selected, passing the selected topic.

---

#### 3. **TrendingTopic Interface**

```tsx
export interface TrendingTopic {
  id: string;
  title: string;
  category: string;
  engagement: string;
  description?: string;
}
```

* Defines the shape of a trending topic object.
* `description` is optional.

---

#### 4. **Component Definition**

```tsx
const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar, onTopicSelect }) => {
  const { theme, toggleTheme } = useTheme();
  
  // List of trending topics hardcoded here
  const trendingTopics: TrendingTopic[] = [ ... ];
```

* Destructures props.
* Gets current theme and toggler from context.
* Defines a list of trending topics with id, title, category, engagement, and description.

---

#### 5. **Event Handler: handleTopicClick**

```tsx
const handleTopicClick = (topic: TrendingTopic) => {
  onTopicSelect(topic);
  if (window.innerWidth < 1024) {
    toggleSidebar();
  }
};
```

* Calls the parent's `onTopicSelect` callback with the selected topic.
* Automatically closes sidebar on smaller screens (`window.innerWidth < 1024`) after selecting a topic — improving UX on mobile/tablet.

---

#### 6. **JSX Returned**

```tsx
<>
  <div className={`sidebar-backdrop ${isOpen ? 'visible' : 'hidden'}`} onClick={toggleSidebar}></div>
  <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
    ...
  </aside>
</>
```

* The sidebar consists of two main elements:

  * **Backdrop**: A semi-transparent overlay shown behind the sidebar when open, which closes the sidebar when clicked.
  * **Sidebar `<aside>`**: The actual sidebar panel, styled based on the `isOpen` prop.

---

#### 7. **Sidebar Header**

```tsx
<div className="sidebar-header">
  <button className="new-chat-btn" onClick={() => handleTopicClick({ 
    id: 'new',
    title: 'New Chat',
    category: 'General',
    engagement: '',
    description: "Hi! I'm Chal P👀ch, your AI assistant. How can I help you today?"
  })}>
    <Plus size={16} />
    <span>New chat</span>
  </button>
  <button className="sidebar-toggle" onClick={toggleSidebar}>
    {isOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
  </button>
</div>
```

* **New chat button**:

  * Creates a special topic object representing a new chat.
  * When clicked, calls `handleTopicClick` with that special topic.
  * Icon: Plus sign.
* **Sidebar toggle button**:

  * Toggles sidebar open/closed.
  * Shows left or right arrow based on current state.

---

#### 8. **Sidebar Content: Trending Topics**

```tsx
<div className="sidebar-content">
  <div className="trending-topics">
    <h2>Trending Topics</h2>
    <ul>
      {trendingTopics.map(topic => (
        <li 
          key={topic.id} 
          className="trending-item"
          onClick={() => handleTopicClick(topic)}
        >
          <TrendingUp size={14} />
          <div className="trending-details">
            <span className="trending-title">{topic.title}</span>
            <div className="trending-meta">
              <span className="trending-category">{topic.category}</span>
              <span className="trending-engagement">{topic.engagement}</span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  </div>
</div>
```

* Maps over `trendingTopics` and renders each topic as a clickable list item.
* Each item shows:

  * A trending up icon.
  * Title of the topic.
  * Category and engagement stats below the title.
* Clicking a topic calls `handleTopicClick`.

---

#### 9. **Sidebar Footer**

```tsx
<div className="sidebar-footer">
  <button className="theme-toggle" onClick={toggleTheme}>
    {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
    <span>{theme === 'light' ? 'Dark mode' : 'Light mode'}</span>
  </button>
  <button className="settings-btn">
    <Settings size={16} />
    <span>Settings(under Developmennt)</span>
  </button>
  <p style={{ fontStyle: 'italic', fontSize: '0.85rem' }}>
    👑 Owner: Dependra Singh
  </p>
</div>
```

* **Theme toggle button**:

  * Shows moon icon if in light mode, sun icon if in dark mode.
  * Clicking toggles theme.
* **Settings button**:

  * Shows a settings icon.
  * Labeled as under development (typo in "Developmennt").
* **Owner credit**:

  * A small italicized text showing the owner’s name.

---

### Summary

* The sidebar shows a collapsible panel with trending topics.
* It supports starting a new chat.
* Responsive behavior (auto-close on mobile).
* Theme toggle integrated with context.
* Simple footer with settings placeholder and owner info.

---


*/