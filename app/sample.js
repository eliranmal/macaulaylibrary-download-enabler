
function linkOnClick(info, tab) {
    var linkUrl, audioCatalogNumber, rawUrl, url;
    info = info || {};
    linkUrl = info.linkUrl;
    if (linkUrl) {
        audioCatalogNumber = linkUrl.match(/\/(\d+)/)[1];
    }
    if (audioCatalogNumber) {
        rawUrl = "http://media2.macaulaylibrary.org/Audio/Audio1/" + Math.floor(audioCatalogNumber / 10000) + "/" + audioCatalogNumber + ".mp3";
    }
    try {
        url = new URL(rawUrl); // sanitize
    } catch (e) {
        console.log(e);
    }
    if (url) {
        chrome.downloads.download({url: url.href}, function (id) {
            console.log('download callback called, id is: ', id)
        });
    }
}

chrome.contextMenus.create({
    "title": "Download, yo!",
    "contexts": ["link"],
    "onclick": linkOnClick
});
