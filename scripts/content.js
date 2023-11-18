// Function to scrape data from the webpage
function scrapeData() {
    // Add your scraping logic here
    // For example, collecting text, links, or other information
    console.log("Scraping data...");
    // ...
}
  
// Function to send scraped data to your API and get the response
function sendDataToAPI(scrapedData) {
    chrome.runtime.sendMessage({ contentScriptQuery: "fetchDataFromAPI", data: scrapedData },
        response => {
            // Handle the response here
            // For example, highlighting elements based on the response
            console.log("Received response from API:", response);
            // ...
    });
}
  
// Function to highlight elements based on API response
function highlightElements(data) {
    // Logic to highlight elements based on API response
    // ...
}
  
// When the DOM is fully loaded, start scraping
document.addEventListener('DOMContentLoaded', () => {
    const scrapedData = scrapeData();
    sendDataToAPI(scrapedData);
});
  
// Insert the chat button here or in other parts of the script as needed
  