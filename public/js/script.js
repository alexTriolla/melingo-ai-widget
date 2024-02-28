/* eslint-disable no-unused-expressions */

!(function (document) {
  var firstScript = document.getElementsByTagName('script')[0];
  function loadScript(fileName) {
    var newScript = document.createElement('script');
    newScript.type = 'text/javascript';
    newScript.async = false;
    newScript.src = 'https://ai-chat.triolla.io/' + fileName;
    // This ensures the script is added before the first existing script tag,
    // but after the 'root' div has been defined.
    firstScript.parentNode.insertBefore(newScript, firstScript);
  }
  // Make sure these filenames match your actual build output filenames.
  loadScript('static/js/vendor.js');
  loadScript('static/js/main.js');
})(document);
/* eslint-enable no-unused-expressions */
