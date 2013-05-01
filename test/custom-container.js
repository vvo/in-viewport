describe('using a div as a reference container', function() {
  var $playground = getPlayground();
  var $test;
  var $container;
  var results = [];

  before(function() {
    var tofind =
      '<div id=testCustom style=position:relative;width:10px;height:10px;top:1000px;left:1000px>t</div>';
    var container =
      '<div id=container style=width:500px;height:500px;overflow:scroll> ' + tofind + '</div>';
    var fakeBodyScroller =
      '<div style=position:relative;top:3000px;left:3000px;>' + container + '</div>'

    insert($playground, fakeBodyScroller);

    $test = document.getElementById('testCustom');
    $container = document.getElementById('container');
    hasScrolled($test, {
      container: $container
    }, scrolledCb);
  });

  it('cb was called', function() {
    assert(results[0] === false, 'Element marked as visible when not visible');
    assert(results.length === 1, 'Too much callbacks');
  });

  describe('when we scroll down on body', function() {
    before(scroller(10000, 10000));

    it('callback was not called', function() {
      assert(
        results.length === 1,
        'Callback unnecessarily called'
      );
    });

    after(scroller(0, 0))
  });

  describe('when we scroll down inside the container', function() {
    before(function(cb) {
      scroller(100, 100, $container, cb)
    });

    it('callback was not called', function() {
      assert(
        results.length === 1,
        'Callback unnecessarily called'
      );
    });
  });

  describe('when we scroll down inside the container to the element', function() {
    before(function(cb) {
      scroller(1000, 1000, $container, cb);
    });

    it('callback was called', function() {
      assert(results[1] === true, 'Element is visible');
      assert(results.length === 2, 'We only got two cb');
    });
  });

  describe('when we scroll down, up, like crazy', function() {
    before(function(cb) {
      scroller(0, 200, $container, cb);
    });
    before(function(cb) {
      scroller(0, 20000, $container, cb);
    });
    before(scroller(0, 0));

    it('no more callback called', function() {
      assert(results.length === 2, 'Too much callback');
    });
  });

  function scrolledCb(result) {
    results.push(result);
  }

  after(clean);
});