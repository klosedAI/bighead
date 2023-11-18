export function sendDataToAPI(scrapedData, callback) {
    chrome.runtime.sendMessage({ contentScriptQuery: "fetchDataFromAPI", data: scrapedData },
        response => callback(response));
}
