(function(win, doc){

  var playground = document.getElementById('playground');
  var force;

  win['getPlayground'] = function getPlayground() {
    return playground;
  }

  win['insert'] = function insert(elt, html) {
    elt.innerHTML = html;
  }

  win['clean'] = function clean() {
    insert(playground, '');
    scroll(0, 0);
  }

  win['scroller'] = function scroller(x, y, container, cb) {
    if (typeof cb === 'function') {
      setTimeout(function() {
        smartScroll(x, y, container);
        setTimeout(cb, 20);
      }, 4);
    } else {
      return function(cb) {
        setTimeout(function() {
          smartScroll(x, y, container);
          setTimeout(cb, 20);
        }, 4);
      }
    }
  }

  function smartScroll(x, y, container) {
    if (!container) {
      scroll(x || 0, y || 0);
    } else {
      // tricky, on IE8 this will triggers TWO scroll events
      container.scrollLeft = x;
      container.scrollTop = y;
    }
  }

})(window, document);