(function(win, doc){

  var instances = [];
  win["hasScrolled"] = hasScrolled;

  function hasScrolled(elt, params, cb) {
    var opts = {
      container: doc.body,
      offset: 0
    };

    if (typeof params === 'function') {
      cb = params;
      params = {};
    }

    var container = opts.container = params['container'] || opts.container;
    var offset = opts.offset = params['offset'] || opts.offset;

    for (var i = 0; i < instances.length; i++) {
      if (instances[i].container === container) {
        instances[i].scrolled(elt, offset, cb);
        return;
      }
    }

    var newInstance = getScrolled(container);
    instances.push(newInstance);
    newInstance.scrolled(elt, offset, cb);
  }

  function partial(fn /*, args...*/) {
    // A reference to the Array#slice method.
    var slice = Array.prototype.slice;
    // Convert arguments object to an array, removing the first argument.
    var args = slice.call(arguments, 1);

    return function() {
      // Invoke the originally-specified function, passing in all originally-
      // specified arguments, followed by any just-specified arguments.
      return fn.apply(this, args.concat(slice.call(arguments, 0)));
    };
  }

  function addEvent( el, type, fn ) {
    if (el.attachEvent) {
      el.attachEvent && el.attachEvent( 'on' + type, fn );
    } else {
      el.addEventListener( type, fn, false );
    }
  }

  // X-browser
  function removeEvent( el, type, fn ) {
    if (el.detachEvent) {
      el.detachEvent && el.detachEvent( 'on' + type, fn );
    } else {
      el.removeEventListener( type, fn, false );
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

  // as suggested by http://webreflection.blogspot.fr/2011/06/partial-polyfills.html
  var indexOf = [].indexOf || function (value) {
      for (var i = this.length; i-- && this[i] !== value;);
      return i;
  };

  function getScrolled(container) {
    var watches = [];
    var scrollContainer = container === doc.body ? win : container;
    var debouncedScrollCheck = debounce(scrollCheck, 12);

    addEvent(scrollContainer, 'scroll', debouncedScrollCheck);

    function scrolled(elt, offset, cb) {
      var eltRect = elt.getBoundingClientRect();
      var containerRect = container.getBoundingClientRect();
      var scrollEvent = arguments[3];

      var pos = {
        x: eltRect.left - offset,
        y: eltRect.top - offset
      };

      var viewport = {
        x: 0,
        y: 0
      };

      if (container === doc.body) {
        viewport.x += doc.documentElement.clientWidth;
        viewport.y += doc.documentElement.clientHeight;
      } else {
        pos.x -= containerRect.left;
        pos.y -= containerRect.top;
        viewport.x += container.clientWidth;
        viewport.y += container.clientHeight;
      }

      var visible = pos.y <= viewport.y && pos.x <= viewport.x;

      if (visible) {
        cb(true);
      } else {
        if (!scrollEvent) {
          cb(false);
        }

        setTimeout(addWatch, 0);
      }

      function addWatch() {
        watches.push(partial(scrolled, elt, offset, cb));
      }
    }

    function scrollCheck() {
      var cb;
      while(cb = watches.shift()) {
        cb(true);
      }
    }

    return {
      container: container,
      scrolled: scrolled
    }
  }

})(window, document);