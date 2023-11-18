chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.contentScriptQuery == "fetchDataFromAPI") {
      const apiUrl = 'YOUR_API_ENDPOINT'; // Replace with your API endpoint
      // Add logic to send request to your API
      // ...
    }
});
  