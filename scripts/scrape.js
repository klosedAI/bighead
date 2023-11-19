function scrapeData() {
    return new Promise((resolve, reject) => {
        // Function to load dynamic content
        function loadDynamicContent() {
            const totalScrolls = 1;
            let currentScroll = 0;

            let interval = setInterval(() => {
                window.scrollTo(0, document.body.scrollHeight);
                currentScroll++;

                if (currentScroll >= totalScrolls) {
                    clearInterval(interval);
                    window.scrollTo(0, 0);
                    scrapeAfterLoading(); // Call the scraping function
                }
            }, 500);
        }

        // Function to scrape data after dynamic content is loaded
        function scrapeAfterLoading() {
            let scrapedData = [];
            const contentElements = document.querySelectorAll('p, ul, h1, h2, h3, h4, span');
            contentElements.forEach(element => {
                scrapedData.push(element.innerText);
            });
            const content = scrapedData.join('\n\n');
            resolve(content); // Resolve the promise with the content
        }

        // Start the process
        loadDynamicContent();
    });
}

