if (document.readyState !== 'loading') {
    main();
} else {
    document.addEventListener('DOMContentLoaded', function () {
        main();
    });
}

function main() {
    console.log("Webpage loaded!")
    scrapeData((content) => {
        console.log("Scraped data:", content);
        sendDataToAPI(content, (response) => {
            console.log("Received response from API:", response);
            highlightElements(response);
        });
    });
    
}
