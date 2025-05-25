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