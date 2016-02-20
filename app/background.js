// chrome.contextMenus.create({
//     title: 'get me this sample, yo',
//     contexts: ['link'],
//     onclick: app.contextMenuLinkListener
// });

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    app.log('background page got message', message);
    if (message && message.title === 'ml-samples-downloader:download' && message.url) {
        chrome.downloads.download({
            url: message.url
        }, function(downloadId) {
            app.log('download called', downloadId);
        });
    }
});
