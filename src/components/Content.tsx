import React, { useEffect, useState } from 'react';

import ChatInput from './chatSection/ChatInput';
import {
  MessageType,
  PreviewData,
  ResponseType,
  SenderType,
} from '../types/common';
import {
  createInitialMelingoMessage,
  createInitialUserMessage,
  createNewMessage,
  linkify,
} from '../services/helper';
import { resetChat, sendMessage } from '../api/data';
import MessageList from './chatSection/MessageList';
import styles from '../assets/styles/components/content.module.scss';

const Content = ({
  messages,
  setMessages,
}: {
  messages: MessageType[];
  setMessages: (param: any) => void;
}) => {
  const [userQuery, setUserQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userMessageSent, setUserMessageSent] = useState(false);

  // Function to add a message to the chat
  const addMessageToChat = (params: {
    sender: SenderType;
    loading: boolean;
    error: boolean;
    text?: string;
    url?: string | null;
  }) =>
    setMessages((prevMessages: any) => [
      ...prevMessages,
      createNewMessage(params),
    ]);

  // Handle form submission, responding to user input
  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault(); // Prevent default form submission behavior

    // Add user's message to chat
    addMessageToChat(createInitialUserMessage(userQuery));

    setIsLoading(true);

    setUserMessageSent(true); // Set flag to true
  };

  // Update Melingo's latest message
  const updateMelingoMessage = ({
    textWithoutUrl,
    previewUrl,
  }: PreviewData) => {
    setMessages((prevMessages: MessageType[]) => {
      return prevMessages.map((msg: MessageType, idx: number) =>
        idx === prevMessages.length - 1
          ? { ...msg, text: textWithoutUrl, url: previewUrl, loading: false }
          : msg
      );
    });
  };

  // Handle Melingo's response asynchronously
  useEffect(() => {
    const handleMelingoResponse = async () => {
      // Add Melingo's loading message to chat
      const sentReset = localStorage.getItem('sent_reset');
      const melingoMessage = createInitialMelingoMessage();
      addMessageToChat({ ...melingoMessage, loading: true });
      if (sentReset === null) {
        resetChat();
        localStorage.setItem('sent_reset', 'true');
      }
      try {
        setUserQuery('');
        const response = await sendMessage<ResponseType>(userQuery);

        updateMelingoMessage(linkify(response.reply));
      } catch (error) {
        updateMelingoMessage({
          textWithoutUrl: 'We are currently unable to process your request.',
          previewUrl: null,
        });
        console.error('Error fetching response:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (!userMessageSent || messages.length === 0) return;
    setUserMessageSent(false);
    handleMelingoResponse();
  }, [
    userMessageSent,
    messages,
    userQuery,
    addMessageToChat,
    updateMelingoMessage,
  ]);

  useEffect(() => {
    return () => {
      resetChat();
    };
  }, []);

  const settings = JSON.parse(localStorage.getItem('chatSettings')!);

  return (
    <div
      className={styles.widgetContent}
      style={{
        background: settings.backgroundPattern || '#f5f5f5',
      }}
    >
      <MessageList messages={messages} isRtl={true} />
      <ChatInput
        userQuery={userQuery}
        setUserQuery={setUserQuery}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default Content;
