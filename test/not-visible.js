function testElem(x, y) {
  describe('dealing with an element located at '+x+','+y, function() {
    var $playground = getPlayground();
    var $test;
    var results = [];

    before(function() {
      var position = 'position:relative;top:' + y + 'px;left:' + x + 'px';
      insert($playground, '<div id=testNotVisible style=' + position + ';width:10px;height:100px>t</div>');
      $test = document.getElementById('testNotVisible');
      hasScrolled($test, cb);
    });

    it('cb was called', function() {
      assert(results[0] === false, 'Element marked as visible when not visible');
      assert(results.length === 1, 'Too much callbacks');
    });

    describe('when we scroll down a little', function() {
      before(scroller(0, 1000));

      it('callback was not called', function() {
        assert(
          results.length === 1,
          'Callback unnecessarily called'
        );
      });
    });

    describe('when we scroll down to the element', function() {
      before(scroller(x, y));

      it('callback was called', function() {
        assert(results[1] === true, 'Element is visible');
        assert(results.length === 2, 'We only got two cb');
      });
    });

    describe('when we scroll down, up, like crazy', function() {
      before(scroller(0, 200));
      before(scroller(0, 20000));
      before(scroller(0, 0));

      it('no more callback called', function() {
        assert(results.length === 2, 'Too much callback');
      });
    });

    function cb(result) {
      results.push(result);
    }

  });

  after(clean);
}

testElem(0, 10000);
testElem(10000, 10000);