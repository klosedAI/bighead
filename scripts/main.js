// Create the chat iframe
const chatIframe = document.createElement('iframe');
chatIframe.id = 'chat-iframe';
chatIframe.src = chrome.runtime.getURL('html/chatWindow.html');
chatIframe.classList.add('chat-window');
chatIframe.style.display = 'none';
document.body.appendChild(chatIframe);

if (document.readyState !== 'loading') {
    main();
} else {
    document.addEventListener('DOMContentLoaded', function () {
        main();
    });
}

function llmRequest(prompt, callback) {
    chrome.runtime.sendMessage(
        { contentScriptQuery: "llmRequest", data: prompt },
        callback
    );
}

async function main() {
    console.log("Webpage loaded!")
    scrapeData((content) => {
        console.log("Scraped data:", content);
        sendDataToAPI(content, (response) => {
            console.log("Received response from API:", response);
            highlightElements(response);
        });
    });
    llmRequest("nothing to say, you say something", console.log);
}
