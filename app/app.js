var regex = {
    audioCatalogNumberExtractor: /\/(\d+)/
};

var exists = function(val) {
    return val || +val === 0;
}

var log = function() {
    console && console.log && console.log.apply(console, arguments);
};

var err = function() {
    console && console.error && console.error.apply(console, arguments);
}

var logExists = function(val, name) {
    if (exists(val)) {
        log(name + '', val);
    } else {
        err('no ' + name + '!');
    }
}

var getSampleUrl = function(audioCatalogNumber) {
    var sampleUrl;
    audioCatalogNumber = audioCatalogNumber || 0;
    if (exists(audioCatalogNumber) && typeof audioCatalogNumber === 'number') {
        sampleUrl = 'http://media2.macaulaylibrary.org/Audio/Audio1/' +
            Math.floor(audioCatalogNumber / 10000) +
            '/' +
            audioCatalogNumber +
            '.mp3';
    }
    logExists(sampleUrl, 'sample URL');
    return sampleUrl;
}

var getAudioCatalogNumber = function(linkUrl) {
    var audioCatalogNumber;
    linkUrl = linkUrl || '';
    audioCatalogNumber = linkUrl.match(regex.audioCatalogNumberExtractor)[1];
    logExists(audioCatalogNumber, 'audio catalog number');
    return audioCatalogNumber;
}

var getLinkUrl = function(info) {
    var linkUrl;
    info = info || {};
    linkUrl = info.linkUrl;
    logExists(linkUrl, 'link url');
    return linkUrl;
}

var sanitizeUrl = function(rawUrl) {
    var url;
    try {
        url = new URL(rawUrl);
    } finally {
        logExists(url);
        return url;
    }
}

var getUrlHref = function(url) {
    var urlHref;
    url = url || {};
    urlHref = url.href;
    logExists(urlHref, 'URL h-ref');
    return urlHref;
}

var download = function(urlHref) {
    if (urlHref) {
        chrome.downloads.download({
            url: urlHref
        }, function(id) {
            log('download called', id);
        });
    }
}

var onLinkClick = function(info, tab) {
    var linkUrl, audioCatalogNumber, rawUrl, url, href;
    linkUrl = getLinkUrl(info);
    audioCatalogNumber = getAudioCatalogNumber(linkUrl);
    rawUrl = getSampleUrl(audioCatalogNumber);
    url = sanitizeUrl(rawUrl);
    href = getUrlHref(url);
    download(href);
}

chrome.contextMenus.create({
    title: 'get me this sample, yo',
    contexts: ['link'],
    onclick: onLinkClick
});



// just for fun - the onLinkClick function can also be written like this
/*
var onLinkClick = function(info, tab) {
    download(
        getUrlHref(
            sanitizeUrl(
                getSampleUrl(
                    getAudioCatalogNumber(
                        getLinkUrl(
                            info
                        )
                    )
                )
            )
        )
    );
}
*/
