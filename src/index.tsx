import './i18n'; // Assuming this is some setup file for internationalization.
import IframeApp from './IframeBootstrap';

// Define your iframe attributes as needed, e.g., styles, sandbox options, etc.
const iframeAttributes = {
  style: 'width: 100%; height: 100%; border: none;',
  // Other attributes like 'sandbox' can be added here.
};

// The ID for the root element inside the iframe where your React app will mount.
const rootId = 'melingo-ai-agent';

new IframeApp(rootId, iframeAttributes as any, [
  'https://ai-chat.triolla.io/build/static/css/main.css',
]);
