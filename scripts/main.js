import { scrapeData } from './scrape.js';
import { sendDataToAPI } from './api.js';
import { highlightElements } from './domUtils.js';

document.addEventListener('DOMContentLoaded', () => {
    const scrapedData = scrapeData();
    sendDataToAPI(scrapedData, (response) => {
        console.log("Received response from API:", response);
        highlightElements(response);
    });
});
