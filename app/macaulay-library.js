var onDownloadElementClick = function(anchorElement, ev) {
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
};

var createDownloadElement = function(anchorElement) {
    $('<div>')
        .css({
            position: 'absolute',
            left: '-20px',
            top: '0',
            display: 'inline-block',
            width: '20px',
            height: '20px',
            backgroundImage: '',
            cursor: 'pointer'
        })
        .click(function(ev) {
            onDownloadElementClick(anchorElement, ev);
        })
};

var addDownloadElement = function(anchorElement) {
    $(anchorElement)
        .css('position', 'relative')
        .append(
            createDownloadElement(anchorElement);
        );
};

$('a[href]')
    .filter(function(index, node) {
        return node.href.match(/\/(\d+)/) && node.href.indexOf('audio') !== -1;
    })
    .each(function(index, node) {
        addDownloadElement(node);
    });
