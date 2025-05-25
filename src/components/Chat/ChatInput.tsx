import React, { useRef, useEffect } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ value, onChange, onSend, isLoading }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    adjustTextareaHeight();
  }, [value]);

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="input-section">
      <div className="input-container">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Chal Pooch..."
          disabled={isLoading}
          rows={1}
          className="chat-input"
        />
        <button
          className={`send-button ${isLoading ? 'loading' : ''} ${!value.trim() ? 'disabled' : ''}`}
          onClick={onSend}
          disabled={isLoading || !value.trim()}
        >
          <Send size={15} />
        </button>
      </div>
      <div className="input-info">
        Press Enter to send, Shift + Enter for new line
      
       <p> Made by <strong>Dependra Singh.</strong></p>
      </div>
    </div>
  );
};

export default ChatInput;