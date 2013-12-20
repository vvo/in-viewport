module.exports = {
  createTest: createTest,
  insertTest: insertTest,
  clean: clean,
  scroller: scroller,
  wait: wait,
  clean: clean
}

var playground = document.getElementById('playground');

function clean() {
  scroll(0, 0);
  while (playground.hasChildNodes()) {
    playground.removeChild(playground.lastChild);
  }
}

function createTest(params) {
  var merge = require('deepmerge');

  params = params || {};

  var test = document.createElement(params.tagName || 'div');

  params.attributes = merge({
    class: 'unit-test'
  }, params.attributes || {});

  for (var attr in params.attributes) {
    test.setAttribute(attr, params.attributes[attr]);
  }

  for(var prop in params.style) {
    test.style[prop] = params.style[prop];
  }

  return test;
}

function insertTest(test, parent) {
  parent = parent || playground;
  parent.insertBefore(test, parent.childNodes[0]);
}

function scroller(x, y, id, cb) {
  if (typeof cb === 'function') {
    setTimeout(function() {
      smartScroll(x, y, id && document.getElementById(id));
      setTimeout(cb, 70);
    }, 4);
  } else {
    return function(cb) {
      setTimeout(function() {
        smartScroll(x, y, id && document.getElementById(id));
        setTimeout(cb, 70);
      }, 4);
    }
  }
}

function wait(ms) {
  return function(done) {
    setTimeout(done, ms);
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