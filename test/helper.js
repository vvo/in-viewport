(function(win, doc){

  var playground = document.getElementById('playground');

  win['getPlayground'] = function getPlayground() {
    return playground;
  }

  win['insert'] = function insert(elt, html) {
    elt.innerHTML = html;
  }

  win['clean'] = function clean() {
    insert(playground, '');
  }

})(window, document);