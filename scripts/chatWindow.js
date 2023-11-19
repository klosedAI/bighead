document.addEventListener('DOMContentLoaded', function () {
    const sendButton = document.getElementById('send-button');
    const chatInput = document.getElementById('chat-input');
    const chatHistory = document.getElementById('chat-history');
    const closeButton = document.getElementById('close-button');

    let conversationHistory = '';

    closeButton.addEventListener('click', function () {
        // Replace the chat window with the chatButton iframe
        const chatWindow = document.querySelector('.chat-window');
        chatWindow.style.display = 'none';

        // Create a new iframe for the chatButton.html
        const chatButtonIframe = document.createElement('iframe');
        chatButtonIframe.src = 'chatButton.html';
        chatButtonIframe.classList.add('chatButton-iframe');

        // Append the chatButton iframe to the body
        document.body.appendChild(chatButtonIframe);
    });

    sendButton.addEventListener('click', function () {
        const userInput = chatInput.value;
        if (userInput) {
            updateChatHistory('User', userInput);
            // Send user input to the API along with scraped data
            sendDataToAPI(userInput, (response) => {
                updateChatHistory('Bot', response);
            });
        }
        chatInput.value = ''; // Clear input field after sending
    });

    function updateChatHistory(sender, message) {
        conversationHistory += `<p><strong>${sender}:</strong> ${message}</p>`;
        chatHistory.innerHTML = conversationHistory;
    }
});
