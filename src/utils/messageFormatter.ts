// Simple message formatter to add basic markdown-like formatting
export const formatMessage = (message: string): string => {
  let formattedMessage = message;

  // Format images with alt text
  formattedMessage = formattedMessage.replace(
    /!\[(.*?)\]\((.*?)\)/g,
    '<img src="$2" alt="$1" class="message-image" loading="lazy">'
  );

  // Format code blocks
  formattedMessage = formattedMessage.replace(
    /```([a-z]*)\n([\s\S]*?)\n```/g,
    '<pre class="code-block"><code>$2</code></pre>'
  );

  // Format inline code
  formattedMessage = formattedMessage.replace(
    /`([^`]+)`/g, 
    '<code class="inline-code">$1</code>'
  );

  // Format bold text
  formattedMessage = formattedMessage.replace(
    /\*\*([^*]+)\*\*/g, 
    '<strong>$1</strong>'
  );

  // Format italic text
  formattedMessage = formattedMessage.replace(
    /\*([^*]+)\*/g, 
    '<em>$1</em>'
  );

  // Format lists
  formattedMessage = formattedMessage.replace(
    /^- (.+)$/gm, 
    '<li>$1</li>'
  );
  formattedMessage = formattedMessage.replace(
    /(<li>.+<\/li>\n?)+/g, 
    '<ul>$&</ul>'
  );

  // Format URLs
  formattedMessage = formattedMessage.replace(
    /\[(.*?)\]\((.*?)\)/g, 
    '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
  );

  // Convert line breaks to <br> tags
  formattedMessage = formattedMessage.replace(/\n/g, '<br>');

  return formattedMessage;
};