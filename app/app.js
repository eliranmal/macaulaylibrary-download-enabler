var App = function() {
    this.regex = {
        audioCatalogNumberExtractor: /\/(\d+)/
    };
};

App.prototype = {

    exists: function(val) {
        return val || +val === 0;
    },

    log: function() {
        console && console.log && console.log.apply(console, arguments);
    },

    err: function() {
        console && console.error && console.error.apply(console, arguments);
    },

    getResourceUrl = function(path) {
        return chrome.extension.getURL(path);
    },

    getImageUrl = function(file) {
        return getResourceUrl('images/' + file + '.png');
    },

    logExists: function(val, name) {
        if (this.exists(val)) {
            this.log(name + '', val);
        } else {
            this.err('no ' + name + '!');
        }
    },

    getSampleUrl: function(audioCatalogNumber) {
        var sampleUrl;
        audioCatalogNumber = audioCatalogNumber || 0;
        if (this.exists(audioCatalogNumber) &&
            (typeof audioCatalogNumber === 'number' || typeof audioCatalogNumber ===
                'string')) {
            sampleUrl = 'http://media2.macaulaylibrary.org/Audio/Audio1/' +
                Math.floor(audioCatalogNumber / 10000) +
                '/' +
                audioCatalogNumber +
                '.mp3';
        }
        this.logExists(sampleUrl, 'sample URL');
        return sampleUrl;
    },

    getAudioCatalogNumber: function(linkUrl) {
        var audioCatalogNumber, regexMatch;
        linkUrl = linkUrl || '';
        regexMatch = linkUrl.match(this.regex.audioCatalogNumberExtractor);
        if (regexMatch && regexMatch.length) {
            audioCatalogNumber = regexMatch[1];
        }
        this.logExists(audioCatalogNumber, 'audio catalog number');
        return audioCatalogNumber;
    },

    sanitizeUrl: function(rawUrl) {
        var url;
        try {
            url = new URL(rawUrl);
        } finally {
            this.logExists(url);
            return url;
        }
    },

    getUrlHref: function(url) {
        var urlHref;
        url = url || {};
        urlHref = url.href;
        this.logExists(urlHref, 'URL h-ref');
        return urlHref;
    },

    download: function(urlHref) {
        if (urlHref) {
            chrome.runtime.sendMessage({
                title: 'ml-samples-downloader:download',
                url: urlHref
            });
        }
    },

    getContextMenuLinkUrl: function(info) {
        var linkUrl;
        info = info || {};
        linkUrl = info.linkUrl;
        this.logExists(linkUrl, 'link url');
        return linkUrl;
    },

    getDomLinkUrl: function(node) {
        var linkUrl;
        node = node || {};
        linkUrl = node.getAttribute('href');
        this.logExists(linkUrl, 'link url');
        return linkUrl;
    },

    downloadSample: function(linkUrl) {
        var audioCatalogNumber, rawUrl, sampleUrl, href;
        audioCatalogNumber = this.getAudioCatalogNumber(linkUrl);
        rawUrl = this.getSampleUrl(audioCatalogNumber);
        sampleUrl = this.sanitizeUrl(rawUrl);
        href = this.getUrlHref(sampleUrl);
        this.download(href);
    },

    contextMenuLinkListener: function(info, tab) {
        var linkUrl = this.getContextMenuLinkUrl(info);
        this.downloadSample(linkUrl);
    },

    domLinkListener: function(node) {
        var linkUrl = this.getDomLinkUrl(node);
        this.downloadSample(linkUrl);
    }

};


this.app = new App();
