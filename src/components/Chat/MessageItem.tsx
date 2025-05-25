import React from 'react';
import { Bot, User } from 'lucide-react';
import { formatMessage } from '../../utils/messageFormatter';

interface MessageProps {
  type: 'user' | 'assistant';
  content: string;
}

const MessageItem: React.FC<MessageProps> = ({ type, content }) => {
  return (
    <div className={`message ${type}`}>
      <div className="message-content">
        <div className="message-avatar">
          {type === 'assistant' ? <Bot size={20} /> : <User size={20} />}
        </div>
        <div className="message-body">
          <div className="message-author">
            {type === 'assistant' ? 'Chal P👀ch' : 'You'}
          </div>
          <div 
            className="message-text"
            dangerouslySetInnerHTML={{ __html: formatMessage(content) }}
          />
        </div>
      </div>
    </div>
  );
};

export default MessageItem;