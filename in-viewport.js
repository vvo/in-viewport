module.exports = inViewport;

var instances = [];
var supportsMutationObserver = typeof global.MutationObserver === 'function';

function inViewport(elt, params, cb) {
  var opts = {
    container: global.document.body,
    offset: 0
  };

  if (params === undefined || typeof params === 'function') {
    cb = params;
    params = {};
  }

  var container = opts.container = params.container || opts.container;
  var offset = opts.offset = params.offset || opts.offset;

  for (var i = 0; i < instances.length; i++) {
    if (instances[i].container === container) {
      return instances[i].isInViewport(elt, offset, cb);
    }
  }

  return instances[
    instances.push(createInViewport(container)) - 1
  ].isInViewport(elt, offset, cb);
}

function addEvent(el, type, fn) {
  if (el.attachEvent) {
    el.attachEvent('on' + type, fn);
  } else {
    el.addEventListener(type, fn, false);
  }
}

function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this, args = arguments;
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);

    function later() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    }
  };
}

// https://github.com/jquery/sizzle/blob/3136f48b90e3edc84cbaaa6f6f7734ef03775a07/sizzle.js#L708
var contains = global.document.documentElement.compareDocumentPosition ?
  function (a, b) {
    return !!(a.compareDocumentPosition(b) & 16);
  } :
  global.document.documentElement.contains ?
    function (a, b) {
      return a !== b && ( a.contains ? a.contains(b) : false );
    } :
    function (a, b) {
      while (b = b.parentNode) {
        if (b === a) {
          return true;
        }
      }
      return false;
    };

function createInViewport(container) {
  var watches = [];
  var watching = [];

  var scrollContainer = container === global.document.body ? global : container;
  var debouncedCheck = debounce(checkElements, 15);

  addEvent(scrollContainer, 'scroll', debouncedCheck);

  if (scrollContainer === global) {
    addEvent(global, 'resize', debouncedCheck);
  }

  if (supportsMutationObserver) {
    observeDOM(watching, container, debouncedCheck);
  }

  // failsafe check, every 200ms we check for visible images
  // usecase: a hidden parent containing eleements
  // when the parent becomes visible, we have no event that the children
  // became visible
  setInterval(debouncedCheck, 150);

  function isInViewport(elt, offset, cb) {
    var visible = isVisible(elt, offset);
    if (visible) {
      if (cb) {
        watching.splice(indexOf.call(watching, elt), 1);
        cb(elt);
      }
      return true;
    }

    if (cb) {
      setTimeout(addWatch(elt, offset, cb), 0);
    }

    return false;
  }

  function isVisible(elt, offset) {
    if (!contains(global.document.documentElement, elt) || !contains(global.document.documentElement, container)) {
      return false;
    }

    // Check if the element is visible
    // https://github.com/jquery/jquery/blob/740e190223d19a114d5373758127285d14d6b71e/src/css/hiddenVisibleSelectors.js
    if (!elt.offsetWidth || !elt.offsetHeight) {
      return false;
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

    if (container === global.document.body) {
      viewport.width += global.document.documentElement.clientWidth;
      viewport.height += global.document.documentElement.clientHeight;

      // We update body rect computing because
      // when you have relative/absolute childs, you get bad compute
      // we need to create a new Object, because it's read only
      containerRect = {
        bottom: container.scrollHeight,
        top: 0,
        left: 0,
        right: container.scrollWidth
      };
    } else {
      pos.left -= containerRect.left;
      pos.top -= containerRect.top;
      viewport.width += container.clientWidth;
      viewport.height += container.clientHeight;
    }

    var visible =
      // 1. They must overlap
      !(
        eltRect.right < containerRect.left ||
        eltRect.left > containerRect.right ||
        eltRect.bottom < containerRect.top ||
        eltRect.top > containerRect.bottom
      ) && (
        // 2. They must be visible in the viewport
        pos.top <= viewport.height &&
        pos.left <= viewport.width
      );

    return visible;
  }

  function addWatch(elt, offset, cb) {
    if (indexOf.call(watching, elt) === -1) {
      watching.push(elt);
    }

    return function () {
      watches.push(function () {
        isInViewport(elt, offset, cb);
      });
    };
  }

  function checkElements() {
    var cb;
    while (cb = watches.shift()) {
      cb();
    }
  }

  return {
    container: container,
    isInViewport: isInViewport
  };
}

function indexOf(value) {
  for (var i = this.length; i-- && this[i] !== value;) {}
  return i;
}

function observeDOM(elements, container, cb) {
  var observer = new MutationObserver(watch);
  var filter = Array.prototype.filter;
  var concat = Array.prototype.concat;

  observer.observe(container, {
    childList: true,
    subtree: true,
    // changes like style/width/height/display will be catched
    attributes: true
  });

  function watch(mutations) {
    // some new DOM nodes where previously watched
    // we should check their positions
    if (mutations.some(knownNodes) === true) {
      setTimeout(cb, 0);
    }
  }

  function isWatched(node) {
    return indexOf.call(elements, node) !== -1;
  }

  function knownNodes(mutation) {
    var nodes = concat.call([],
      Array.prototype.slice.call(mutation.addedNodes),
      mutation.target
    );
    return filter.call(nodes, isWatched).length > 0;
  }
}
