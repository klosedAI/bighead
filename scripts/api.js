function llmRequest(prompt, callback) {
    chrome.runtime.sendMessage(
        { contentScriptQuery: "llmRequest", data: prompt },
        callback
    );
}