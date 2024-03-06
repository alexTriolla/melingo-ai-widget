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

    if (!iframe) return null;
    Object.keys(this.iframeAttributes || {}).forEach((key) => {
      const value = this.iframeAttributes ? this.iframeAttributes[key] : '';
      iframe.setAttribute(key, value);
    });

    document.body.appendChild(iframe);
    if (!iframe.contentWindow) return;
    const doc = iframe.contentWindow.document;
    doc.open();
    doc.close();

    // Load external CSS files into the iframe
    this.cssFiles.forEach((file: any) => {
      const link = doc.createElement('link');
      link.rel = 'stylesheet';
      link.href = file; // Adjust this path as needed
      doc.head.appendChild(link);
    });

    // Similar null checks before using `iframe.contentWindow.document` elsewhere

    // Ensure the iframe has a body before attempting to attach the React app.
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
