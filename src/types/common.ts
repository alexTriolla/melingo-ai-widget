export type ViewType = {
  icon?: string;
  name: string;
  text?: string;
  path: string;
  order: number;
};

export type SenderType = 'melingo' | 'user';

export type MessageType = {
  id: string;
  sender: SenderType;
  loading: boolean;
  error: boolean;
  text?: string | null;
  url?: string | null;
};

export type RequestType = {
  username: string;
  password: string;
  query: string;
};

export type ResponseType = {
  auth: string;
  query: Array<string>;
  reply: string;
};

export type MessageComponentProps = {
  message: MessageType;
  isRtl: boolean;
};

export type ButtonProps = {
  className?: string; // Optional className for custom styling
  style?: React.CSSProperties; // Optional style object
  onClick: () => void; // Function to call when the button is clicked
  text?: string; // Optional text for the button
  icon?: string; // Optional path to the image source
  altText: string; // Alt text for the image
};

export type ChatInputProps = {
  userQuery: string;
  setUserQuery: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

export type MessageListProps = {
  messages: MessageType[];
  isRtl: boolean;
};

export type WelcomeProps = {
  startupMessage: string;
};

// Define a type for the preview data
export type PreviewData = {
  textWithoutUrl: string;
  previewUrl: string | null;
};
