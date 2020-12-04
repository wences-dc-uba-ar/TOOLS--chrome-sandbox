searches = [
    {
        url: "https://www.sarasa.com/some/path/",
        owner: {
            nombre: ".//*[contains(@class,'me-wvmp-viewer-card__name-text')]",
            headline: ".//*[contains(@class,'me-wvmp-viewer-card__viewer-headline')]",
        },
    },
];
/*
datafilds:
https://www.sarasa.com/some/path/
me/profile-views/
    viewer-text         =>  .//*[contains(@class,'me-wvmp-viewer-card__name-text')]
    viewer-headline     =>  .//*[contains(@class,'me-wvmp-viewer-card__viewer-headline')]
*/

function getElementsByXPath(path) {
    result = [];
    iterator = new XPathEvaluator().evaluate(path, document.documentElement, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);

    try {
        var thisNode = iterator.iterateNext();

        while (thisNode) {
            // console.log(thisNode.textContent);
            result.push(thisNode.textContent.trim());
            thisNode = iterator.iterateNext();
        }
    } catch (e) {
        console.log("Error: Document tree modified during iteration " + e);
    }
    return result;
}

getElementsByXPath(".//*[contains(@class,'t-24')]");
