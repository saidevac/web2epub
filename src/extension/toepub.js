import {exportToEpub}  from "../epub/exportToEpub.js"
    

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

    //convert to epub
    import("../epub/exportToEpub.js")
        .then((module) => {
            const exportToEpub = module.default;
            return exportToEpub(readlist);
        })
        .catch((e) => {
            console.error(e);
            setError("There was a problem exporting your epub.");
        })
        .finally(() => {
            //setIsLoadingEpub(false);

        });
