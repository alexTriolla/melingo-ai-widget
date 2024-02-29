// src/components/MessageList.tsx
import React, { useEffect, useRef } from 'react';
import Message from './Message';
import { MessageListProps, MessageType } from '../../types/common';

const MessageList: React.FC<MessageListProps> = ({ messages, isRtl }) => {
  // Ref for auto-scrolling to the latest message
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const messageListClass = `messages-list ${
    messages.length > 0 ? 'with-messages' : ''
  }`;

  // Auto-scroll to the bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className={messageListClass}>
      {messages.map((msg: MessageType) => (
        <Message key={msg.id} message={msg} isRtl={isRtl} />
      ))}
      <div ref={messagesEndRef} /> {/* Dummy div for auto-scrolling */}
    </div>
  );
};

export default MessageList;
