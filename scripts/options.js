document.getElementById('settings-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const apiKey = document.getElementById('apiKey').value;
    
    // Validate API key format here (if necessary)

    // Store the API key
    chrome.storage.sync.set({ 'ANTHROPIC_API_KEY': apiKey }, function() {
        console.log('API Key saved');
        // Provide user feedback (like a confirmation message)
    });
});
