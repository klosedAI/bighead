function highlightElements(data) {
    // Logic to highlight elements based on API response
    data.forEach(sentence => {
        highlightSentence(sentence);
    });
}

function highlightSentence(sentence) {
    console.log(sentence)
    const bodyContent = document.body.innerHTML;
    const highlighted = `<span style="background-color: yellow;">${sentence}</span>`;
    document.body.innerHTML = bodyContent.replace(new RegExp(sentence, 'g'), highlighted);
}

