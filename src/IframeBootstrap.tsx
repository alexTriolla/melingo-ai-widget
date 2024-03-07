// IframeBootstrap.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store';
import ChatComponent from './ChatComponent';
import ButtonComponent from './ButtonComponent';

interface IframeApp {
  rootId: string;
  iframeAttributes: Record<string, string>;
  cssFiles: string[]; // Added this line to include cssFiles in the interface
}

class IframeApp {
  chatContainer!: HTMLDivElement;
  buttonContainer!: HTMLDivElement;
  chatIframe!: HTMLIFrameElement;
  buttonIframe!: HTMLIFrameElement;

  constructor(
    public rootId: string,
    public iframeAttributes: Record<string, string> = {},
    public cssFiles: string[] = []
  ) {
    // Initialize chat and button iframes
    this.initChatIframe();
    this.initButtonIframe();
  }

  initChatIframe() {
    // Create the chat iframe and its container, similar to initIframe() but with chat-specific settings
    this.chatContainer = document.createElement('div');
    this.chatContainer.style.width = '700px'; // Adjust for the chat app
    this.chatContainer.style.height = '800px'; // Adjust for the chat app
    this.chatContainer.style.overflow = 'hidden'; // Optional: in case the iframe content exceeds these dimensions
    this.chatContainer.style.position = 'absolute'; // Set the position to absolute
    this.chatContainer.style.bottom = '0'; // Position at the bottom
    this.chatContainer.style.right = '0'; // Position at the right

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
    doc.open();
    doc.close();

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
        // Load the chat app into the chat iframe
        const chatRoot =
          this.chatIframe.contentWindow.document.createElement('div');
        chatRoot.id = `${this.rootId}-chat`;
        this.chatIframe.contentWindow.document.body.appendChild(chatRoot);

        this.renderAppChat(chatRoot);
      }
    });

    this.chatIframe.addEventListener('load', () => {
      if (this.chatIframe.contentWindow) {
        const chatRoot =
          this.chatIframe.contentWindow.document.createElement('div');
        chatRoot.id = `${this.rootId}-chat`;
        this.chatIframe.contentWindow.document.body.appendChild(chatRoot);

        this.renderAppChat(chatRoot);
      }
    });
  }

  initButtonIframe() {
    // Create the button iframe and its container
    this.buttonContainer = document.createElement('div');
    this.buttonContainer.style.width = '100px'; // Adjust for the button app
    this.buttonContainer.style.height = '100px'; // Adjust for the button app
    this.buttonContainer.style.overflow = 'hidden'; // Optional: in case the iframe content exceeds these dimensions
    this.buttonContainer.style.position = 'absolute'; // Set the position to absolute
    this.buttonContainer.style.bottom = '0'; // Position at the bottom
    this.buttonContainer.style.right = '0'; // Position at the right

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
    doc.open();
    doc.close();

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

        this.renderAppButton(buttonRoot);
      }
    });
  }

  // initIframe() {
  //   const iframe = document.createElement('iframe');

  //   // Setting iframe attributes as before
  //   Object.keys(this.iframeAttributes || {}).forEach((key) => {
  //     const value = this.iframeAttributes ? this.iframeAttributes[key] : '';
  //     iframe.setAttribute(key, value);
  //   });

  //   // Create a container div for the iframe
  //   const container = document.createElement('div');
  //   container.style.width = '100px';
  //   container.style.height = '100px';
  //   container.style.overflow = 'hidden'; // Optional: in case the iframe content exceeds these dimensions
  //   container.style.position = 'absolute'; // Set the position to absolute
  //   container.style.bottom = '0'; // Position at the bottom
  //   container.style.right = '0'; // Position at the right

  //   // Append the iframe to the container
  //   container.appendChild(iframe);

  //   // Append the container to the document body
  //   document.body.appendChild(container);

  //   if (!iframe.contentWindow) return;
  //   const doc = iframe.contentWindow.document;
  //   // doc.open();
  //   // doc.close();

  //   // Loading external CSS files into the iframe as before
  //   this.cssFiles.forEach((file: any) => {
  //     const link = doc.createElement('link');
  //     link.rel = 'stylesheet';
  //     link.href = file;
  //     doc.head.appendChild(link);
  //   });

  //   // Creating and appending the reactRoot as before
  //   const reactRoot = iframe.contentWindow.document.createElement('div');
  //   reactRoot.id = this.rootId;
  //   iframe.contentWindow.document.body.appendChild(reactRoot);

  //   let isOpen = false; // Set the initial state of the button
  //   const handleOpen = () => {
  //     // Handle the open event as before
  //     console.log('Open event handled');
  //     isOpen = !isOpen;
  //   };

  //   console.log('isOpen', isOpen);

  //   this.renderAppButton(reactRoot, handleOpen, isOpen);

  //   if (isOpen) {
  //     this.renderAppChat(reactRoot, handleOpen, isOpen);
  //   }
  // }

  renderAppButton(container: Element) {
    const root = ReactDOM.createRoot(container);
    root.render(
      <React.StrictMode>
        <Provider store={store}>
          <ButtonComponent handleOpen={() => this.toggleChatVisibility()} />
        </Provider>
      </React.StrictMode>
    );
  }

  renderAppChat(container: Element) {
    const root = ReactDOM.createRoot(container);
    root.render(
      <React.StrictMode>
        <Provider store={store}>
          <ChatComponent />
          {/* Render the chat component here */}
        </Provider>
      </React.StrictMode>
    );
  }

  toggleChatVisibility() {
    // Toggle chat container visibility
    this.chatContainer.style.display =
      this.chatContainer.style.display === 'none' ? 'block' : 'none';
  }

  // renderApp(container: Element) {
  //   const root = ReactDOM.createRoot(container);
  //   root.render(
  //     <React.StrictMode>
  //       <Provider store={store}>
  //         <App />
  //       </Provider>
  //     </React.StrictMode>
  //   );
  // }
}

export default IframeApp;
