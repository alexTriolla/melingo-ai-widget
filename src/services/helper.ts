import { PreviewData, SenderType } from '../types/common';

export const linkify = (text: string | null | undefined): PreviewData => {
  // Default to an empty string if text is not provided
  const textToProcess = text || '';

  const urlRegex =
    /(\bhttps?:\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gi;
  const urls = textToProcess.match(urlRegex);
  let textWithoutUrl = textToProcess;
  let previewUrl: string | null = null;

  if (urls && urls.length > 0) {
    previewUrl = urls[0];
    textWithoutUrl = textToProcess.replace(urlRegex, '');
  }

  return {
    textWithoutUrl,
    previewUrl,
  };
};

export function createNewMessage({
  sender,
  loading,
  error,
  text,
  url,
}: {
  sender: SenderType;
  loading: boolean;
  error: boolean;
  text?: string;
  url?: string | null;
}) {
  return {
    id: 'message-' + Date.now() + Math.random(),
    sender,
    loading,
    error,
    text,
    url,
  };
}

export const createInitialMelingoMessage = (message?: string) => {
  return {
    sender: 'melingo' as SenderType,
    text: removeHtmlTags(message || ''),
    loading: false,
    error: false,
  };
};

export const createInitialUserMessage = (message: string) => {
  return {
    sender: 'user' as SenderType,
    text: removeHtmlTags(message),
    loading: false,
    error: false,
  };
};

// Function to remove HTML tags from a string
export const removeHtmlTags = (text: string) => {
  return text.replace(/<[^>]*>/g, '');
};

export const firstLetterCapital = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};
