// IframeBootstrap.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store';

interface IframeApp {
  rootId: string;
  iframeAttributes?: Record<string, string>;
  cssFiles: string[]; // Added this line to include cssFiles in the interface
}

class IframeApp {
  // Add properties to track the container and iframe elements
  container!: HTMLDivElement;
  iframe!: HTMLIFrameElement;

  constructor(
    rootId: string,
    iframeAttributes: Record<string, string> = {},
    cssFiles: string[] = []
  ) {
    this.rootId = rootId;
    this.iframeAttributes = iframeAttributes;
    this.cssFiles = cssFiles;
    this.initIframe();
  }

  initIframe() {
    this.iframe = document.createElement('iframe'); // Assign to instance property

    // Setting iframe attributes as before
    Object.keys(this.iframeAttributes || {}).forEach((key) => {
      const value = this.iframeAttributes ? this.iframeAttributes[key] : '';
      this.iframe.setAttribute(key, value);
    });

    // Create a container div for the iframe
    this.container = document.createElement('div'); // Assign to instance property
    this.container.id = 'melingo-ai-agent-container';
    this.container.style.width = '80px';
    this.container.style.height = '80px';
    this.container.style.overflow = 'hidden'; // Optional: in case the iframe content exceeds these dimensions
    this.container.style.position = 'absolute'; // Set the position to absolute
    this.container.style.bottom = '0'; // Position at the bottom
    this.container.style.right = '0'; // Position at the right

    this.container.appendChild(this.iframe); // Use instance property
    document.body.appendChild(this.container); // Append container to body

    this.iframe.onload = () => {
      this.injectButtonAndScript(); // Ensure iframe content is fully loaded
    };

    if (!this.iframe.contentWindow) return;
    const doc =
      this.iframe.contentDocument || this.iframe.contentWindow.document;
    doc.open();
    doc.close();

    // Loading external CSS files into the iframe as before
    this.cssFiles.forEach((file: any) => {
      const link = doc.createElement('link');
      link.rel = 'stylesheet';
      link.href = file;
      doc.head.appendChild(link);
    });

    // Creating and appending the reactRoot as before
    const reactRoot = this.iframe.contentWindow.document.createElement('div');
    reactRoot.id = this.rootId;
    this.iframe.contentWindow.document.body.appendChild(reactRoot);

    this.renderApp(reactRoot);
  }

  resizeContainer(width: string, height: string) {
    this.container.style.width = width;
    this.container.style.height = height;
  }

  injectButtonAndScript() {
    if (!this.iframe.contentWindow) return; // Check if the contentWindow is accessible

    const doc =
      this.iframe.contentDocument || this.iframe.contentWindow.document; // Use instance property

    // Add a script to handle button click and resize
    const script = document.createElement('script');
    script.textContent = `
      document.getElementById('melingo-AI-button').addEventListener('click', function() {
        parent.postMessage({ action: 'resize', width: '700px', height: '800px' }, '*');
      });
    `;
    doc.body.appendChild(script);
  }

  renderApp(container: Element) {
    const root = ReactDOM.createRoot(container);
    root.render(
      <React.StrictMode>
        <Provider store={store}>
          <App />
        </Provider>
      </React.StrictMode>
    );
  }
}

export default IframeApp;
