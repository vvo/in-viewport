(function(win, doc){

  win["hasScrolled"] = hasScrolled;

  function hasScrolled(elt, opts, cb) {

    var defaults = {
      container: doc.body,
      offset: Math.max(elt.clientHeight, elt.clientWidth)
    };

    if (typeof opts === 'function') {
      cb = opts;
      opts = defaults;
    }

    var container = opts['container'] || defaults.container;
    var offset = opts['offset'] || defaults.offset;

    var rect = elt.getBoundingClientRect();

    var pos = {
      x: rect.left - offset,
      y: rect.top - offset
    };

    var viewport = {
      x: 0,
      y: 0
    };

    if (container === doc.body) {
      viewport.x += doc.documentElement.clientWidth;
      viewport.y += doc.documentElement.clientHeight;
    } else {
      pos.x += scrollOffset().x;
      pos.y += scrollOffset().y;
      viewport.x += container.clientWidth;
      viewport.y += container.clientHeight;
    }

    if (pos.y <= viewport.y && pos.x <= viewport.x) {
      cb();
    }
  }

})(window, document);