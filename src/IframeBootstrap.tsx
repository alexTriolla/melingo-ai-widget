// IframeBootstrap.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store';
import ChatComponent from './ChatComponent';
import ButtonComponent from './ButtonComponent';
import { EventBus } from './eventBus';

interface IframeApp {
  rootId: string;
  iframeAttributes: Record<string, string>;
  cssFiles: string[]; // Added this line to include cssFiles in the interface
  isOpen: boolean; // Added this line to include isOpen in the interface
}

class IframeApp {
  chatContainer!: HTMLDivElement;
  buttonContainer!: HTMLDivElement;
  chatIframe!: HTMLIFrameElement;
  buttonIframe!: HTMLIFrameElement;

  constructor(
    public rootId: string,
    public iframeAttributes: Record<string, string> = {},
    public cssFiles: string[] = [],
    public isOpen: boolean = false
  ) {
    // Initialize chat and button iframes
    const myEventBus = new EventBus<string>('ai-event-bus');

    this.initChatIframe(myEventBus);
    this.initButtonIframe(myEventBus);
  }

  sendMessageToIframe(iframe: HTMLIFrameElement, message: Object) {
    if (iframe.contentWindow) {
      iframe.contentWindow.postMessage(message, '*'); // Adjust the target origin as needed for security
    }
  }

  initChatIframe(eventBus: any) {
    // Create the chat iframe and its container, similar to initIframe() but with chat-specific settings
    this.chatContainer = document.createElement('div');
    this.chatContainer.style.width = '525px'; // Adjust for the chat app
    this.chatContainer.style.height = '700px'; // Adjust for the chat app
    this.chatContainer.style.overflow = 'hidden'; // Optional: in case the iframe content exceeds these dimensions
    this.chatContainer.style.position = 'absolute'; // Set the position to absolute
    this.chatContainer.style.bottom = '60px'; // Position at the bottom
    this.chatContainer.style.right = '30px'; // Position at the right
    this.chatContainer.style.display = 'flex'; // Use flexbox layout
    this.chatContainer.style.alignItems = 'center'; // Vertically center the child content
    this.chatContainer.style.justifyContent = 'center'; // Horizontally center the child content
    this.chatContainer.id = 'chat-container';

    this.chatIframe = document.createElement('iframe');

    Object.keys(this.iframeAttributes || {}).forEach((key) => {
      let value = this.iframeAttributes ? this.iframeAttributes[key] : '';
      if (key === 'id') {
        value = `${value}-chat`;
      }
      this.chatIframe.setAttribute(key, value);
    });

    document.body.appendChild(this.chatContainer); // Append chatContainer to body

    // Append the iframe to the container
    this.chatContainer.appendChild(this.chatIframe);

    if (!this.chatIframe.contentWindow) return;
    const doc = this.chatIframe.contentWindow.document;
    // doc.open();
    // doc.close();

    // Loading external CSS files into the iframe as before
    this.cssFiles.forEach((file: any) => {
      const link = doc.createElement('link');
      link.rel = 'stylesheet';
      link.href = file;
      doc.head.appendChild(link);
    });

    // Use requestIdleCallback to defer execution until after the iframe has loaded
    requestIdleCallback(() => {
      if (this.chatIframe.contentWindow) {
        // Load the button app into the button iframe
        const chatRoot =
          this.chatIframe.contentWindow.document.createElement('div');
        chatRoot.id = `${this.rootId}-chat`;
        this.chatIframe.contentWindow.document.body.appendChild(chatRoot);

        this.renderAppChat(chatRoot, eventBus);
      }
    });
  }

  initButtonIframe(eventBus: any) {
    // Create the button iframe and its container
    this.buttonContainer = document.createElement('div');
    this.buttonContainer.style.width = '70px'; // Adjust for the button app
    this.buttonContainer.style.height = '70px'; // Adjust for the button app
    this.buttonContainer.style.overflow = 'hidden'; // Optional: in case the iframe content exceeds these dimensions
    this.buttonContainer.style.position = 'absolute'; // Set the position to absolute
    this.buttonContainer.style.bottom = '10px'; // Position at the bottom
    this.buttonContainer.style.right = '10px'; // Position at the right

    this.buttonIframe = document.createElement('iframe');

    Object.keys(this.iframeAttributes || {}).forEach((key) => {
      let value = this.iframeAttributes ? this.iframeAttributes[key] : '';
      if (key === 'id') {
        value = `${value}-button`;
      }
      this.buttonIframe.setAttribute(key, value);
    });

    document.body.appendChild(this.buttonContainer); // Append buttonContainer to body

    // Append the iframe to the container
    this.buttonContainer.appendChild(this.buttonIframe);

    if (!this.buttonIframe.contentWindow) return;
    const doc = this.buttonIframe.contentWindow.document;
    // doc.open();
    // doc.close();

    // Loading external CSS files into the iframe as before
    this.cssFiles.forEach((file: any) => {
      const link = doc.createElement('link');
      link.rel = 'stylesheet';
      link.href = file;
      doc.head.appendChild(link);
    });

    // Use requestIdleCallback to defer execution until after the iframe has loaded
    requestIdleCallback(() => {
      if (this.buttonIframe.contentWindow) {
        // Load the button app into the button iframe
        const buttonRoot =
          this.buttonIframe.contentWindow.document.createElement('div');
        buttonRoot.id = `${this.rootId}-button`;
        this.buttonIframe.contentWindow.document.body.appendChild(buttonRoot);

        this.renderAppButton(buttonRoot, eventBus);
      }
    });
  }

  renderAppButton(container: Element, eventBus: any) {
    const root = ReactDOM.createRoot(container);
    root.render(
      <React.StrictMode>
        <Provider store={store}>
          <ButtonComponent
            myEventBus={eventBus}
            handleOpen={() => this.toggleChatVisibility()}
          />
        </Provider>
      </React.StrictMode>
    );
  }

  renderAppChat(container: Element, eventBus: any) {
    const root = ReactDOM.createRoot(container);
    root.render(
      <React.StrictMode>
        <Provider store={store}>
          <ChatComponent myEventBus={eventBus} />
          {/* Render the chat component here */}
        </Provider>
      </React.StrictMode>
    );
  }

  // sendMessageToIframe(iframe: HTMLIFrameElement, message: Object) {
  //   if (iframe.contentWindow) {
  //     iframe.contentWindow.postMessage(message, '*'); // Adjust the target origin as needed for security
  //   }
  // }

  toggleChatVisibility() {
    // Toggle chat container visibility
    this.chatContainer.style.display =
      this.chatContainer.style.display === 'none' ? 'block' : 'none';
  }
}

export default IframeApp;
