document.addEventListener('DOMContentLoaded', function () {
    // Elements and variables from the HEAD branch
    const sendButton = document.getElementById('send-button');
    const chatInput = document.getElementById('chat-input');
    const chatHistory = document.getElementById('chat-history');
    const closeButton = document.getElementById('close-button');
    let conversationHistory = '';

    // Elements and variables from the saneens branch
    const conversations = [
        { id: 1, name: "Alice", lastMessage: "Hey, how are you?" },
        { id: 2, name: "Bob", lastMessage: "Did you see my email?" },
        // ... more conversations
    ];
    const conversationList = document.querySelector('.conversation-list');

    // Event listener for closeButton (from HEAD)
    closeButton.addEventListener('click', function () {
        hideChatWindow();
    });

    // Event listener for sendButton (from HEAD)
    sendButton.addEventListener('click', function () {
        const userInput = chatInput.value;
        if (userInput) {
            updateChatHistory('User', userInput);
            // Send user input to the API along with scraped data
            sendDataToAPI(userInput, (response) => {
                updateChatHistory('Bot', response);
            });
            chatInput.value = ''; // Clear input field after sending
        }
    });

    // Function to update chat history (from HEAD)
    function updateChatHistory(sender, message) {
        conversationHistory += `<p><strong>${sender}:</strong> ${message}</p>`;
        chatHistory.innerHTML = conversationHistory;
    }

    // Populate conversationList with sample conversations (from saneens)
    if (conversationList) {
        conversationList.innerHTML = conversations.map(c => `<div class="conversation">${c.name}: ${c.lastMessage}</div>`).join('');
    }
});

// Functions to show and hide chat window (from saneens)
function showChatWindow() {
    const chatIframe = document.querySelector('.chat-window');
    if (chatIframe) chatIframe.style.display = 'block';
}

function hideChatWindow() {
    const chatIframe = document.querySelector('.chat-window');
    if (chatIframe) chatIframe.style.display = 'none';
}
