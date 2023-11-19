console.log('background.js started')

var apiKey = ''; 
chrome.storage.sync.get("ANTHROPIC_API_KEY", (key) => {
    apiKey = key['ANTHROPIC_API_KEY'];
    console.log("Found Anthropic API key");
});

const url = 'https://api.anthropic.com/v1/complete';
const body = {
  model: "claude-2.0",
  prompt: "\n\nHuman: Hello, world! How are you? \n\nAssistant:",
  max_tokens_to_sample: 256,
  stream: false
};

async function claudeRequest(body) {
    var response = await fetch(url, {
      method: 'POST',
      headers: {
          'anthropic-version': '2023-06-01',
          'Content-Type': 'application/json',
          'x-api-key': apiKey
      },
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
  
// If user enters new API key through settings page, update it in here
chrome.storage.onChanged.addListener((changes, namespace) => {
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    if (namespace == "sync" && key == "ANTHROPIC_API_KEY") {
        console.log("Got API KEY!");
        apiKey = newValue;
    }
  }
});

