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
    const iframe = document.createElement('iframe');

    // Setting iframe attributes as before
    Object.keys(this.iframeAttributes || {}).forEach((key) => {
      const value = this.iframeAttributes ? this.iframeAttributes[key] : '';
      iframe.setAttribute(key, value);
    });

    // Create a container div for the iframe
    const container = document.createElement('div');
    container.style.width = '700px';
    container.style.height = '800px';
    container.style.overflow = 'hidden'; // Optional: in case the iframe content exceeds these dimensions

    // Append the iframe to the container
    container.appendChild(iframe);

    // Append the container to the document body
    document.body.appendChild(container);

    if (!iframe.contentWindow) return;
    const doc = iframe.contentWindow.document;
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
    const reactRoot = iframe.contentWindow.document.createElement('div');
    reactRoot.id = this.rootId;
    iframe.contentWindow.document.body.appendChild(reactRoot);

    this.renderApp(reactRoot);
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
