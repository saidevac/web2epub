
var tabHtml = 'cannot retrieve tab html';

// document.addEventListener('DOMContentLoaded', function () {
//     messageTag = document.getElementById("message");
// });


function getTabHtml() {
    selector = document.querySelector('html');
    if (!selector) return "ERROR: querySelector failed to find node";
    console.log(selector.outerHTML);
    return selector.outerHTML;
}

chrome.tabs.query({ active: true, currentWindow: true }).then(function (tabs) {
    var activeTab = tabs[0];
    var activeTabId = activeTab.id;

    var messageTag = document.querySelector('#message').innerHTML;
    console.log('foo');
    console.log(tabs[0].id);


    chrome.scripting.executeScript({
        target: { tabId: activeTab.id, allFrames: true },
        function: getTabHtml
    })
        .then(injectedResults => {
            tabHtml = injectedResults.innerHTML;
            console.log(tabHtml);

        });


    //call sandbox code with tag
    var iframe = document.getElementById('sandbox');
    var message = {
        tag: iframe,

    }
    iframe.contentWindow.postMessage(message, "*");

}).then(function (results) {
    console.log(results[0].result);
    messageTag.innerText = results[0].result;
}).catch(function (error) {
    console.log(error);
    // messageTag.innerText = 'There was an error injecting script : \n' + error.message;
});

