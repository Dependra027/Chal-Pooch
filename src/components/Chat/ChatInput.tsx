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

//notes
/*
This `ChatInput.tsx` component is a reusable **React functional component** used for managing and rendering the chat input section of your app. It includes a `<textarea>` for input, a send button, and some helper text. Below is a **line-by-line breakdown** of how it works and what each part does.

---

## 🔍 Code Walkthrough

### 1. **Imports and Interface Definition**

```tsx
import React, { useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
```

* `React` is needed to use JSX and create components.
* `useRef` is used to create a reference to the `<textarea>` element so you can directly manipulate its DOM properties.
* `useEffect` lets you run code when the component updates—specifically here, to auto-adjust the height of the textarea.
* `Send` is an icon from the `lucide-react` icon library, used for the send button.

```tsx
interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  isLoading: boolean;
}
```

This defines the props your `ChatInput` component expects:

* `value`: the current text inside the input
* `onChange`: function to update the input value
* `onSend`: function to send the message
* `isLoading`: boolean flag to disable inputs during API calls

---

### 2. **Component Function**

```tsx
const ChatInput: React.FC<ChatInputProps> = ({ value, onChange, onSend, isLoading }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
```

* `textareaRef` is a reference to the `<textarea>` DOM element. Used to dynamically resize it.

```tsx
  useEffect(() => {
    adjustTextareaHeight();
  }, [value]);
```

* Whenever `value` changes (i.e., user types), `adjustTextareaHeight()` runs to auto-resize the textarea.

```tsx
  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    }
  };
```

* This function sets the height of the textarea:

  * First to `'auto'` so it can shrink if needed.
  * Then to its scroll height (max 200px) so it expands as user types.

---

### 3. **Keyboard Shortcut for Sending**

```tsx
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevent new line
      onSend();           // Trigger message send
    }
  };
```

* If the user presses `Enter` without `Shift`, it sends the message.
* If `Shift+Enter` is used, a new line is inserted.

---

### 4. **Return JSX Layout**

```tsx
  return (
    <div className="input-section">
```

* This is the root wrapper for the input area.

```tsx
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
```

* Renders the chat input box.
* `onChange`: triggers the parent's state update.
* `onKeyDown`: handles sending vs newline.
* `rows={1}`: starts small and grows with content.
* `disabled={isLoading}`: disables while a message is sending.

```tsx
        <button
          className={`send-button ${isLoading ? 'loading' : ''} ${!value.trim() ? 'disabled' : ''}`}
          onClick={onSend}
          disabled={isLoading || !value.trim()}
        >
          <Send size={15} />
        </button>
      </div>
```

* Send button triggers the `onSend` function.
* Disabled if:

  * Message is empty (`!value.trim()`)
  * Or the bot is loading a response (`isLoading`)

---

### 5. **Helper Text Footer**

```tsx
      <div className="input-info">
        Press Enter to send, Shift + Enter for new line
        <p> Made by <strong>Dependra Singh.</strong></p>
      </div>
    </div>
  );
```

* Displays instructions and your credit.
* You can style this to appear beneath the input box.

---

## 🧠 Summary

| Element          | Purpose                                         |
| ---------------- | ----------------------------------------------- |
| `textareaRef`    | Dynamically resizes the input height            |
| `useEffect`      | Auto-triggers height adjustment on text input   |
| `handleKeyPress` | Allows enter to send, shift+enter to break line |
| `isLoading`      | Disables input during API calls                 |
| `onSend`         | Passed from parent, sends the chat message      |


*/