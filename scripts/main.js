if (document.readyState !== 'loading') {
    main();
} else {
    document.addEventListener('DOMContentLoaded', function () {
        main();
    });
}

function main() {
    console.log("Webpage loaded!")
    const scrapedData = scrapeData();
    sendDataToAPI(scrapedData, (response) => {
        console.log("Received response from API:", response);
        highlightElements(response);
    });
}
