function scrapeData(callback) {
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
        console.log("Scraping after loading...");
        let scrapedData = [];
        // const paragraphs = document.querySelectorAll('p');
        // paragraphs.forEach(paragraph => {
        //     scrapedData.push(paragraph.innerText);
        // });
        const contentElements = document.querySelectorAll('p, ul, h1, h2, h3, h4, span');    
        contentElements.forEach(element => {
            scrapedData.push(element.innerText); 
        });
        const content = scrapedData.join('\n\n');
        callback(content);
    }

    // Start the process
    loadDynamicContent(scrapeAfterLoading);
}
