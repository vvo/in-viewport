describe('using a div as a reference container', function() {
  require('./fixtures/bootstrap.js');
  beforeEach(h.clean);
  afterEach(h.clean);

  var test;
  var container;
  var calls;

  beforeEach(function() {
    calls = [];
    test = h.createTest({
      style: {
        left: '1000px',
        top: '1000px'
      }
    });

    container = h.createTest({
      attributes: {
        id: 'container'
      },
      style: {
        width: '500px',
        height: '500px',
        overflow: 'scroll'
      }
    });

    container.innerHTML = '<div class="scrollTrigger"></div>';

    h.insertTest(test, container);
    h.insertTest(container);

    inViewport(test, {
      container: container
    }, cb);
  });

  describe('when we scroll down on body', function() {
    beforeEach(h.scroller(1000, 1000));

    it('cb not called', function() {
      assert.strictEqual(calls.length, 0);
    });
  });

  describe('when we scroll inside the container', function() {

    describe('before the div', function () {
      beforeEach(h.scroller(100, 100, 'container'));

      it('cb not called', function() {
        assert.strictEqual(calls.length, 0);
      });
    });

    describe('too far after the div', function() {
      beforeEach(h.scroller(10000, 10000, 'container'));

      it('cb not called', function() {
        assert.strictEqual(calls.length, 0);
      });
    });

    describe('to the element', function() {
      beforeEach(h.scroller(1000, 1000, 'container'));
      beforeEach(h.scroller(1005, 1005, 'container'));
      beforeEach(h.wait(50));

      it('cb was called', function() {
        assert.strictEqual(calls.length, 1);
      });
    });

    describe('when we scroll down, up, like crazy', function() {
      beforeEach(h.scroller(0, 200, 'container'));
      beforeEach(h.scroller(0, 1000, 'container'));
      beforeEach(h.scroller(0, 20000, 'container'));
      beforeEach(h.scroller(1000, 1000, 'container'));

      it('cb was called once', function() {
        assert.strictEqual(calls.length, 1);
      });
    });

  });

  function cb(result) {
    calls.push(result);
  }
});