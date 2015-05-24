function testElem(x, y, offsetTest) {
  offsetTest = offsetTest || 0;

  describe('dealing with an element located at '+x+','+y, function() {
    require('./fixtures/bootstrap.js');
    beforeEach(h.clean);
    afterEach(h.clean);

    var test;
    var calls;
    beforeEach(function() {
      calls = [];
      test = h.createTest({
        style: {
          left: x + 'px',
          top: y + 'px'
        }
      });
      h.insertTest(test);
      inViewport(test, cb);
    });

    describe('when we scroll down a little', function() {
      beforeEach(h.scroller(0, 1000));

      it('cb not called', function() {
        assert.strictEqual(calls.length, 0);
      });
    });

    describe('when we scroll down too far (debounce)', function() {
      beforeEach(h.scroller(x * 2, y * 2));

      it('cb not called', function() {
        assert.strictEqual(calls.length, 0);
      });
    });

    describe('when we scroll near the element (offset)', function() {
      beforeEach(h.scroller(x - offsetTest, y - offsetTest));
      beforeEach(h.scroller(x - offsetTest + 1, y - offsetTest + 1));
      beforeEach(h.wait(50));

      it('cb called', function() {
        assert.strictEqual(calls.length, 1);
      });
    });

    describe('when we scroll down, up, like crazy (debounce)', function() {
      beforeEach(h.scroller(0, 200));
      beforeEach(h.scroller(0, 20000));
      beforeEach(h.scroller(0, 0));

      it('doesnt calls the cb', function() {
        assert.strictEqual(calls.length, 0);
      });

      describe('when we are at the element', function() {
        beforeEach(h.scroller(x, y));

        it('calls the cb', function() {
          assert.strictEqual(calls.length, 1);
        });
      })
    });

    function cb(result) {
      calls.push(result);
    }
  });

}

testElem(0, 3000);
testElem(0, 3000, 100);
testElem(3000, 3000);
