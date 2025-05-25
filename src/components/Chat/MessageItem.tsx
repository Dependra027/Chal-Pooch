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


//notes
/*
Sure! Here's a detailed explanation of your React component code:

---

### Overview

This code defines a React functional component called `MessageItem` that renders a single chat message, either from a **user** or an **assistant**. It shows an avatar icon, author name, and the message content.

---

### Breakdown

#### 1. **Imports**

```tsx
import React from 'react';
import { Bot, User } from 'lucide-react';
import { formatMessage } from '../../utils/messageFormatter';
```

* **React**: Core React library to define components.
* **Bot, User**: Icon components imported from the `lucide-react` icon library. These represent assistant and user avatars respectively.
* **formatMessage**: A utility function imported from your project that likely formats or sanitizes the raw message content for display (e.g., converting markdown to HTML or escaping dangerous characters).

---

#### 2. **Props Interface**

```tsx
interface MessageProps {
  type: 'user' | 'assistant';
  content: string;
}
```

* Defines the expected props for `MessageItem`.
* `type`: a string literal type that can only be `'user'` or `'assistant'`. This indicates who sent the message.
* `content`: the message text content as a string.

---

#### 3. **Component Definition**

```tsx
const MessageItem: React.FC<MessageProps> = ({ type, content }) => {
  return (
    <div className={`message ${type}`}>
      ...
    </div>
  );
};
```

* `MessageItem` is a functional component that receives `type` and `content` as props.
* The root `<div>` has a dynamic CSS class: `"message user"` or `"message assistant"`. This allows styling to differ depending on who sent the message.

---

#### 4. **Inner Structure**

```tsx
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
```

* **`message-content`**: Wrapper for the entire message content.

* **`message-avatar`**: Displays an icon based on the message type:

  * If `type` is `'assistant'`, it renders the `<Bot />` icon.
  * Otherwise, it renders the `<User />` icon.

* **`message-body`**: Contains author name and message text.

* **`message-author`**:

  * Shows `'Chal P👀ch'` for assistant messages (this is a fun name for the bot).
  * Shows `'You'` for user messages.

* **`message-text`**:

  * Renders the actual message text.
  * Uses `dangerouslySetInnerHTML` to inject HTML content that is returned by `formatMessage(content)`.
  * This suggests `formatMessage` converts raw text to HTML safely, enabling things like bold text, links, or other formatting.

---

### Important notes

* **`dangerouslySetInnerHTML`**:

  * This is React's way of injecting raw HTML into the DOM.
  * It is "dangerous" because it can introduce XSS vulnerabilities if the HTML is not properly sanitized.
  * Here, you rely on `formatMessage` to safely prepare the content for HTML rendering.

* **Styling**:

  * The dynamic class names (`message user` or `message assistant`) allow your CSS to style messages differently depending on the sender.
  * For example, assistant messages might be aligned left with a bot icon, user messages aligned right with a user icon.

---

### Summary

This component:

* Receives a message with its type and content.
* Displays an icon representing who sent the message.
* Shows the author name (`"You"` or `"Chal P👀ch"`).
* Renders the message content as formatted HTML.
* Uses CSS classes to style messages differently based on the sender.

---


*/