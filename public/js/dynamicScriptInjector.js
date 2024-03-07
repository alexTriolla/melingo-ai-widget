/* eslint-disable no-unused-expressions */

!(function (window, document, MelingoAI) {
  // Function to dynamically load the Melingo AI chat script
  function loadMelingoAIScript() {
    // Find the first script tag in the document
    var firstScriptTag = document.getElementsByTagName('script')[0];
    // Create a new script element for the Melingo AI script
    var melingoAIScript = document.createElement('script');
    melingoAIScript.type = 'text/javascript';
    melingoAIScript.async = true; // Load the script asynchronously
    // Set the source URL of the Melingo AI chat script
    melingoAIScript.src =
      'https://ai-chat.triolla.io/public/js/melingoAIChatSetup.js';

    // Error handling: mark loading as failed and dispatch an event if the script fails to load
    melingoAIScript.onerror = function () {
      window.MelingoAI.failed = true; // Mark as failed
      window.dispatchEvent(new Event('melingoai:failed')); // Dispatch a custom event
    };

    // Insert the new script before the first script tag
    firstScriptTag.parentNode.insertBefore(melingoAIScript, firstScriptTag);
  }

  // Initialize the MelingoAI object if it's not already defined
  if (window.MelingoAI === undefined) {
    window.MelingoAI = function (method, options, data) {
      // Queue function calls made before the library is loaded
      window.MelingoAI.readyQueue.push({ method, options, data });
    };
    MelingoAI.readyQueue = []; // Initialize the queue
  }

  // Load the Melingo AI script either immediately if the document is already loaded
  // or after the window 'load' event
  if (document.readyState === 'complete') {
    loadMelingoAIScript(); // If the document is fully loaded, load the script immediately
  } else {
    // Otherwise, wait for the window to load before loading the script
    window.addEventListener('load', loadMelingoAIScript, false);
  }

  //   window.addEventListener('message', function (event) {
  //     // Ensure the message is from your iframe and has the correct structure
  //     if (event.data.action === 'resize') {
  //       // Assuming iframeAppInstance is your instance of IframeApp
  //       iframeAppInstance.resizeContainer(event.data.width, event.data.height);
  //     }
  //   });
})(window, document, window.MelingoAI || function () {}); // Self-invoking function

window.addEventListener('message', function (event) {
  // Ensure the message is from your iframe and has the correct structure
  if (event.data.action === 'resize') {
    // Assuming iframeAppInstance is your instance of IframeApp
    const iframeAppInstance = document.getElementById(
      'melingo-ai-agent-container'
    );
    iframeAppInstance.resizeContainer(event.data.width, event.data.height);
  }
});
