function highlightElements(data) {
    // Logic to highlight elements based on API response
    data.forEach(sentence => {
        highlightSentence(sentence);
    });
}

function highlightSentence(sentence) {
    console.log(sentence)
    ignoreGroup = "(?:[\\n\\r\\s]*)?(?:<[^>]*>)?(?:[\\n\\r\\s]*)?"
    regex = sentence
    regex = regex.replaceAll(`,`, ` , `)
    regex = regex.replaceAll(`'`, `['’]`)
    regex = regex.replaceAll(`"`, `["“”]`)
    regex = regex.replaceAll(`(`, `\\(`)
    regex = regex.replaceAll(`)`, `\\)`)
    regex = regex.replaceAll(` `, ignoreGroup)
    console.log(regex)
    const bodyContent = document.body.innerHTML;
    const highlighted = `<span style="background-color: yellow;">$&</span>`;
    document.body.innerHTML = bodyContent.replace(new RegExp(regex, 'g'), highlighted);
}

