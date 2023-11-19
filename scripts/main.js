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

function llmRequest(prompt) {
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

function webPointsPrompt(webText) {
    var prompt = `\n\nHuman: I will provide you with text from a website I am reading right now.
I am trying to skim-read this article and would like you to highlight a few of the
most important sentences in this article that will help me skim-read. 
Please return the sentences one at a time.
If you feel you're done and all the super important points are covered, respond with STOP.
It is recommended you keep the length of your highlights small (1-2 sentences each), and the
total number of highlights small as well (less than 5 is preferrable).
It is extremely important that you return the sentence verbatim, as I will be using it to
highlight the sentence in the article. Don't include any preamble or quotes, just the sentence.
The text from the website given below:

WEBSITE CONTENT:
"""
${webText}

"""
WEBSITE FINISHED:

`

    return prompt
}

async function main() {
    console.log("Webpage loaded!")

    var resp = await llmRequest("\n\nHuman: Hello, world! How are you? \n\nAssistant: ")
        .then(response => response.llmResponse.completion.trim());
    console.log(resp)

    const webText = await scrapeData();
    console.log(webText);
    var prompt = webPointsPrompt(webText)

    for (var i = 1; i <= 0; i++) {
        prompt = prompt + `\n\nHuman: Please give me highlight #${i} or respond with STOP`
        prompt = prompt + `\n\nAssistant: `
        var resp = await llmRequest(prompt)
                        .then(response => response.llmResponse.completion.trim());
        console.log(resp)
        prompt = prompt + resp
        if (resp == "STOP") {
            break;
        }


        //prompt = prompt + "\n\nHuman: Thanks, please give next highlight or respond with STOP (remember I do not appreciate too many highlights).";
        console.log("Highlighting sentence: " + resp);
        highlightSentence(resp);
    }
    
}
