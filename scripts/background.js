const url = 'https://api.anthropic.com/v1/complete';
const apiKey = ''; // Replace with your actual API key

const headers = {
  'anthropic-version': '2023-06-01',
  'Content-Type': 'application/json',
  'x-api-key': apiKey
};

const body = {
  model: "claude-2.0",
  prompt: "\n\nHuman: Hello, world! How are you? \n\nAssistant:",
  max_tokens_to_sample: 256,
  stream: false
};

async function claudeRequest(body) {
    var response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body)
    })
    .then(response => response.json());
    return response;
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.contentScriptQuery == "llmRequest") {
        (async () => {
            body.prompt = "\n\nHuman: " + request.data + "\n\n Assistant:";
            const response = await claudeRequest(body);
            sendResponse({
                llmResponse: response,
            });
        })();
        return true;
    }
});
  
