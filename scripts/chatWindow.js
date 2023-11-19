const introMessage = "Hi, how can I help you today?";
// Sample conversations
const conversations = [
    { id: 1, name: "Bighead", lastMessage: introMessage },
];
  
let context = ""; // To store the initial context from scraped data

function webPointsPrompt(webText) {
    var prompt = `\n\nHuman: I will provide you with text from a website I am reading right now.
I am trying to understand this article fully. I want your answers to be extremely concise and to the point.

WEBSITE CONTENT:
"""
${webText}
    
"""
WEBSITE FINISHED.

Remember to be extremely concise and to the point. 1-2 sentences max whenever possible.

Assistant: ${introMessage}
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
            context += `\n\nHuman: ${userInput}`; 
            console.log('User: ' + userInput);
    
            try {
                //console.log("CURRENT CONTEXT: " + context);
                context += "\n\nAssistant: "
                var resp = await llmRequest(context)
                                .then(response => response.llmResponse.completion.trim())
                                .catch(error => console.log(error));
                        
                console.log('got response');
                updateChatHistory('Bighead', resp);
                context += `${resp}`;
    
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
