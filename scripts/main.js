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

    const data = await scrapeData();
    console.log(data)
    llmRequest("nothing to say, you say something", console.log);
}
