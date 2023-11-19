// Sample conversations
const conversations = [
    { id: 1, name: "Alice", lastMessage: "Hey, how are you?" },
    { id: 2, name: "Bob", lastMessage: "Did you see my email?" },
    // ... more conversations
];
  
document.addEventListener("DOMContentLoaded", function() {
    const conversationList = document.querySelector('.conversation-list');
    if (conversationList) {
        conversationList.innerHTML = conversations.map(c => `<div class="conversation">${c.name}: ${c.lastMessage}</div>`).join('');
    }
});
  
// Functions to show and hide chat window
function showChatWindow() {
    const chatIframe = document.querySelector('.chat-window');
    if (chatIframe) chatIframe.style.display = 'block';
}

function hideChatWindow() {
    const chatIframe = document.querySelector('.chat-window');
    if (chatIframe) chatIframe.style.display = 'none';
}
  