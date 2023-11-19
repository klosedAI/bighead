// Sample conversations
const conversations = [
    { id: 1, name: "Bot", lastMessage: "Hi, How may I help you today?" },
];
  
let context = ""; // To store the initial context from scraped data

function webPointsPrompt(webText) {
    var prompt = `\n\nYour name is big head, if there is any reference of big head somewhere in your response, make a joke about big head being your name. Human: I will provide you with text from a website I am reading right now.
I am trying to understand this article fully. I want your answers to be concise and to the point.

WEBSITE CONTENT:
"""
${webText}
    
"""
WEBSITE FINISHED.

Remember, I want your answers to be concise and to the point. Please respond with a one or two sentences.
Dont talk like an AI, talk like a human. And remember for each word you speak my grandma is getting slapped.
`
    return prompt
}

function llmRequest(prompt) {
    console.log("Sending request to LLM");
    return new Promise((resolve, reject) => {
        chrome.runtime.sendMessage(
            { contentScriptQuery: "llmRequest", data: prompt },
            response => {
                if (chrome.runtime.lastError) {
                    // Reject the promise if there's an error
                    reject(new Error(chrome.runtime.lastError.message));
                } else {
                    // Resolve the promise with the response
                    console.log("CHECK IF THERE IS A RESPONSE");
                    console.log(response);
                    resolve(response);
                }
            }
        );
    });
}

document.addEventListener("DOMContentLoaded", function() {
    console.log('DOM fully loaded and parsed');

    const sendButton = document.getElementById('send-button');
    const chatInput = document.getElementById('chat-input');
    const conversationList = document.querySelector('.conversation-list');
    const closeButton = document.getElementById('close-btn');

    // initialContextSetup(); 

    closeButton.addEventListener('click', function() {
        hideChatWindow();
    });

    if (conversationList) {
        renderConversations();
    }

    async function sendMessage() {
        const userInput = chatInput.value;
        chatInput.value = '';
        if (userInput) {
            // Retrieve context asynchronously
            let result = await new Promise((resolve, reject) => {
                chrome.storage.local.get("context", resolve);
            });
            let context = result.context || ''; // Set default value if context is undefined
            context = webPointsPrompt(context)
            // console.log("Context before update: " + context);
    
            // Update conversation history
            updateChatHistory('User', userInput);
            context += `Human: ${userInput}\n\n`; 
            console.log('User: ' + userInput);
    
            try {
                console.log("CURRENT CONTEXT: " + context);
                var resp = await llmRequest(context)
                                .then(response => response.llmResponse.completion.trim());
                console.log('got response');
                updateChatHistory('Bot', resp);
                context += `Assistant: ${resp}\n\n`;
    
                // Save the updated context back to storage
                chrome.storage.local.set({ "context": context });
    
            } catch (error) {
                console.error("Error in llmRequest:", error);
            }
    
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
    const chatIframe = document.querySelector('.chat-window');
    if (chatIframe) chatIframe.style.display = 'none';
}