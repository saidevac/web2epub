function injectedFunction() {

    // get title and body content from current web page
    var titleText = document.querySelector('title').innerText;
    if (!titleText) titleText = 'no title';

    var bodyText = document.querySelector('body').innerHTML;
    if (!bodyText) return "ERROR: querySelector failed to find node"


    //prepare input to epub    
    var readlist = {
        "title": titleText,
        "description": "sample description",
        "articles": [{
            "content": bodyText
        }
        ]
    }


    const src = chrome.runtime.getURL("./epub/exportToEpub.js");
    import(src).then((module) => {
        const exportToEpub = module.default;
        exportToEpub(readlist);
    }).catch((e) => {
        console.error(e);

    }).finally(() => {
        console.log('epub conversion done.')
    });


}

chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: injectedFunction,
    });
});


self.addEventListener('install', function (evt) {

    // your install handler
    // `self.idbKeyval` should be available here, as well as anywhere else
    //console.log(self.window.epubgen);

});

