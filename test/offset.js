describe('using offsets', function() {
  require('./fixtures/bootstrap.js');
  beforeEach(h.clean);
  afterEach(h.clean);

  function testElemOffset(x, y, offset) {
    describe(offset+' offset with an element at '+x+','+y, function() {

      var test;
      var calls;

      // at this scroll position, element should be shown
      var scrollTo = y -
        document.documentElement.clientHeight -
        offset + 1;

      beforeEach(h.clean);

      beforeEach(function() {
        calls = [];
        test = h.createTest({
          style: {
            width: '1px',
            height: '1px',
            left: x +  'px',
            top: y + 'px'
          }
        });
        h.insertTest(test);
        inViewport(test, { offset: offset }, cb);
      });

      describe('when we scroll 100px before the offset', function() {
        beforeEach(h.scroller(0, scrollTo - 100));

        it('cb not called', function() {
          assert.strictEqual(calls.length, 0);
        });
      });

      describe('when we scroll 20px before the offset', function() {

        beforeEach(h.scroller(0, scrollTo - 20));

        it('cb no called', function() {
          assert.strictEqual(calls.length, 0);
        });
      });

      describe('when we scroll down at the exact position', function() {

        beforeEach(h.scroller(0, scrollTo));

        it('cb called', function() {
          assert.strictEqual(calls.length, 1);
        });
      });

      function cb(result) {
        calls.push(result);
      }
    });
  }

  testElemOffset(0, 10000, 200);
  testElemOffset(0, 10000, 1500);
});