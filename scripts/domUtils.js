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
    regex = regex.replaceAll(`.`, ` . `)
    regex = regex.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'); // escape all regex characters
    regex = regex.replaceAll(`'`, `\\ ['’]\\ `)
    regex = regex.replaceAll(`"`, `\\ ["“”]\\ `)
    regex = regex.replaceAll('&', '&(?:amp;)')
    regex = regex.replaceAll(`\\ `, ignoreGroup)
    regex = "[\\s]*" + regex
    console.log(regex)

    const highlighted = `<span style="background-color: yellow; color: black">$&</span>`;
    for (const child of document.body.childNodes) {
        try {
            const found = child.innerHTML.match(new RegExp(regex, 'gi'));
            if (found) {
                console.log(found)
                
                child.innerHTML = child.innerHTML.replace(new RegExp(regex, 'gi'), highlighted);
                break;
            }
        }
        catch {
            console.log("some error I dont know");
        }
    }
}

