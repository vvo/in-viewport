/**
* @license in-viewport v0.2.7 | github.com/vvo/in-viewport#license
*/

(function(win, doc){
  var instances = [];
  var defaultContainer = doc.body;

  win['inViewport'] = inViewport;

  function inViewport(elt, params, cb) {
    var opts = {
      container: defaultContainer,
      offset: 0
    };

    if (params === undefined || typeof params === 'function') {
      cb = params;
      params = {};
    }

    var container = opts.container = params['container'] || opts.container;
    var offset = opts.offset = params['offset'] || opts.offset;
    var instance = findInstance(container);

    if (instance) {
      return instance.inViewport(elt, offset, cb);
    }

    return instances[
        instances.push(createInViewport(container)) - 1
      ].inViewport(elt, offset, cb)
  }

  inViewport['check'] = check;

  function check(container) {
    container = container || defaultContainer;

    findInstance(container).checkElements();
  }

  function findInstance(container) {
    container = container || defaultContainer;

    for (var i = 0; i < instances.length; i++) {
      if (instances[i].container === container) {
        return instances[i];
      }
    }
  }

  function addEvent( el, type, fn ) {
    if (el.attachEvent) {
      el.attachEvent( 'on' + type, fn );
    } else {
      el.addEventListener( type, fn, false );
    }
  }

  function debounce(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    }
  }

  // https://github.com/jquery/sizzle/blob/3136f48b90e3edc84cbaaa6f6f7734ef03775a07/sizzle.js#L708
  var contains = document.documentElement.compareDocumentPosition ?
    function( a, b ) {
      return !!(a.compareDocumentPosition( b ) & 16);
    } :
    document.documentElement.contains ?
    function( a, b ) {
      return a !== b && ( a.contains ? a.contains( b ) : false );
    } :
    function( a, b ) {
      while ( (b = b.parentNode) ) {
        if ( b === a ) {
          return true;
        }
      }
      return false;
    };

  function createInViewport(container) {
    var watches = [];
    var scrollContainer = container === defaultContainer ? win : container;
    var debouncedCheck = debounce(checkElements, 15);

    addEvent(scrollContainer, 'scroll', debouncedCheck);

    if (scrollContainer === win) {
      addEvent(win, 'resize', debouncedCheck);
    }

    function inViewport(elt, offset, cb) {
      if (!contains(doc.documentElement, elt) ||
          !contains(doc.documentElement, container)) {
          return setTimeout(addWatch(elt, offset, cb), 0);
      }

      var eltRect = elt.getBoundingClientRect();
      var containerRect = container.getBoundingClientRect();

      var pos = {
        left: eltRect.left,
        top: eltRect.top
      };

      var viewport = {
        width: offset,
        height: offset
      };

      if (container === defaultContainer) {
        viewport.width += doc.documentElement.clientWidth;
        viewport.height += doc.documentElement.clientHeight;
      } else {
        pos.left -= containerRect.left;
        pos.top -= containerRect.top;
        viewport.width += container.clientWidth;
        viewport.height += container.clientHeight;
      }

      var visible =
        pos.left >= -offset &&
        pos.left <= viewport.width &&
        pos.top >= -offset &&
        pos.top <= viewport.height;

      if (visible) {
        if (cb) {
          cb(elt);
        } else {
          return true;
        }
      } else {
        if (cb) {
          setTimeout(addWatch(elt, offset, cb), 0);
        } else {
          return false;
        }
      }
    }

    function addWatch(elt, offset, cb) {
      return function() {
        watches.push(function() {
          inViewport(elt, offset, cb, true);
        });
      }
    }

    function checkElements() {
      var cb;
      while(cb = watches.shift()) {
        cb();
      }
    }

    return {
      container: container,
      checkElements: checkElements,
      inViewport: inViewport
    }
  }

})(window, document);