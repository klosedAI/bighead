function llmRequest(prompt, callback) {
    chrome.runtime.sendMessage(
        { contentScriptQuery: "llmRequest", data: prompt },
        callback
    );
}

// Sample conversations
const conversations = [
    { id: 1, name: "Bot", lastMessage: "Hi, How may I help you today?" },
];
  
document.addEventListener("DOMContentLoaded", function() {
    console.log('DOM fully loaded and parsed');

    const sendButton = document.getElementById('send-button');
    const chatInput = document.getElementById('chat-input');
    const conversationList = document.querySelector('.conversation-list');

    const closeButton = document.getElementById('close-btn');
    closeButton.addEventListener('click', function() {
        hideChatWindow();
    });

    if (conversationList) {
        renderConversations();
    }

    function sendMessage() {
        const userInput = chatInput.value;
        if (userInput) {
            updateChatHistory('User', userInput);
            llmRequest(userInput, (response) => {
                updateChatHistory('Bot', response.llmResponse.completion);
            });
            console.log('User: ' + userInput);
            chatInput.value = ''; // Clear input field after sending
        }
    }
    
    sendButton.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') { 
            sendMessage();
        }
    });

});

function renderConversations() {
    const conversationList = document.querySelector('.conversation-list');
    conversationList.innerHTML = conversations.map(c => `<div class="conversation">${c.name}: ${c.lastMessage}</div>`).join('');
}

function updateChatHistory(sender, message) {
    conversations.push({ id: conversations.length + 1, name: sender, lastMessage: message });
    renderConversations();
}

function showChatWindow() {
    const chatIframe = document.querySelector('.chat-window');
    if (chatIframe) chatIframe.style.display = 'block';
}

function hideChatWindow() {
    console.log("Hiding chat window");
    const chatIframe = document.querySelector('.chat-iframe');
    const chatWindow = document.querySelector('.chat-window');
    const chatButton = document.querySelector('.chat-button');

    if (chatIframe) chatIframe.remove();
    if (chatWindow) chatWindow.remove();
    if (chatButton) chatButton.style.display = 'block';
}