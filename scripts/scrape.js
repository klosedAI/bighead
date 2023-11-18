function createAndDownloadTextFile(text) {
    // Create a blob from the text
    const blob = new Blob([text], { type: 'text/plain' });

    // Create an anchor element and set the href to the blob URL
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'page-content.txt'; // Name of the downloaded file

    // Append the anchor to the document, trigger the download, and then remove the anchor
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function scrapeData() {
    console.log("Scraping data...");

    // Function to load dynamic content (e.g., by scrolling)
    function loadDynamicContent(callback) {
        const totalScrolls = 1; // Number of times to scroll; adjust as needed
        let currentScroll = 0;

        let interval = setInterval(() => {
            window.scrollTo(0, document.body.scrollHeight); // Scroll to the bottom of the page
            currentScroll++;

            if (currentScroll >= totalScrolls) {
                clearInterval(interval);
                window.scrollTo(0, 0); // Scroll back to the top of the page
                callback(); // Call the callback function after scrolling is done
            }
        }, 500); // Interval between scrolls; adjust as needed
    }

    // Function to scrape data after dynamic content is loaded
    function scrapeAfterLoading() {
        const paragraphs = document.querySelectorAll('p');
        let scrapedData = [];

        paragraphs.forEach(paragraph => {
            scrapedData.push(paragraph.innerText);
        });

        console.log("Scraped Data: ", scrapedData);
        const content = scrapedData.join('\n\n');
        // createAndDownloadTextFile(content);
        callback(content);
    }

    // Start the process
    loadDynamicContent(scrapeAfterLoading);
}
