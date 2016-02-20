var createDownloadElement = function(anchorElement) {
    return $('<div>')
        .attr('title', 'get me this sample!')
        .css({
            position: 'absolute',
            left: '-20px',
            bottom: '0',
            display: 'inline-block',
            width: '16px',
            height: '16px',
            background: 'transparent url("' + app.getImageUrl('download') +
                '") 0 0 no-repeat',
            cursor: 'pointer'
        })
        .click(function(ev) {
            var dom = $(anchorElement)[0];
            app.log('dom link clicked', dom, ev);
            try {
                app.domLinkListener(dom);
            } catch (ex) {
                app.err(ex);
            } finally {
                ev.preventDefault();
                return false;
            }
        })
};

var addDownloadElement = function(anchorElement) {
    $(anchorElement)
        .css('position', 'relative')
        .append(
            createDownloadElement(anchorElement)
        );
};

var addDownloadElementsToAnchors = function() {
    $('a[href]')
        .filter(function(index, node) {
            return node.href.match(app.regex.audioCatalogNumberExtractor) &&
                node.href.indexOf('audio') !== -1;
        })
        .each(function(index, node) {
            addDownloadElement(node);
        });
};

var start = function() {
    addDownloadElementsToAnchors();
};


start();
