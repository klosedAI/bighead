// Sample conversations
const conversations = [
    { id: 1, name: "Bot", lastMessage: "Hi, How may I help you today?" },
];
  
let context = ""; // To store the initial context from scraped data

function webPointsPrompt(webText) {
    var prompt = `\n\nHuman: I will provide you with text from a website I am reading right now.
I am trying to understand this article fully. I want your answers to be concise and to the point. Please respond with a one or two sentences.

WEBSITE CONTENT:
"""
${webText}
    
"""
WEBSITE FINISHED:

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
                    resolve(response);
                }
            }
        );
    });
}

function scrapeDataFromMain() {
    console.log("Sending request to Scrape");
    return new Promise((resolve, reject) => {
        chrome.runtime.sendMessage(
            { contentScriptQuery: "scrapeData", data: ""},
            response => {
                if (chrome.runtime.lastError) {
                    // Reject the promise if there's an error
                    reject(new Error(chrome.runtime.lastError.message));
                } else {
                    // Resolve the promise with the response
                    resolve(response);
                }
            }
        );
    });
}


async function initialContextSetup() {
    // const webText = await scrapeData(); // Function to get scraped data
    var webText = await scrapeDataFromMain()
    .then(response => response.dataResponse.completion.trim());
    console.log(webText);
    context = webPointsPrompt(webText); // Initialize context with scraped data
    console.log(context);
}

document.addEventListener("DOMContentLoaded", function() {
    console.log('DOM fully loaded and parsed');

    const sendButton = document.getElementById('send-button');
    const chatInput = document.getElementById('chat-input');
    const conversationList = document.querySelector('.conversation-list');
    const closeButton = document.getElementById('close-btn');

    initialContextSetup(); 

    closeButton.addEventListener('click', function() {
        hideChatWindow();
    });

    if (conversationList) {
        renderConversations();
    }

    // function sendMessage() {
    //     const userInput = chatInput.value;
    //     if (userInput) {
    //         updateChatHistory('User', userInput);
    //         llmRequest(userInput, (response) => {
    //             updateChatHistory('Bot', response.llmResponse.completion);
    //         });
    //         console.log('User: ' + userInput);
    //         chatInput.value = ''; // Clear input field after sending
    //     }
    // }
    
    async function sendMessage() {
        const userInput = chatInput.value;
        chrome.storage.local.get("context", function(result) {
            console.log("Value currently is " + result.context);
        });
        if (userInput) {
            // Update conversation history
            updateChatHistory('User', userInput);
            context += `Human: ${userInput}\n\n`; 
            console.log('User: ' + userInput);
            console.log(context);
            var resp = await llmRequest(context)
                        .then(response => response.llmResponse.completion.trim());
            // llmRequest(context, (response) => {
            console.log('got response');
            updateChatHistory('Bot', resp);
            context += `Assistant: ${resp}\n\n`; 
            // });

            chatInput.value = ''; 
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
    // const chatIframe = document.querySelector('.chat-iframe');
    // const chatWindow = document.querySelector('.chat-window');
    // const chatButton = document.querySelector('.chat-button');

    // if (chatIframe) chatIframe.remove();
    // if (chatWindow) chatWindow.remove();
    // if (chatButton) chatButton.style.display = 'block';
    const chatIframe = document.querySelector('.chat-window');
    if (chatIframe) chatIframe.style.display = 'none';
}