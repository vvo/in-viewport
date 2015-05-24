describe('detached DOM node', function() {
  require('./fixtures/bootstrap.js');
  beforeEach(h.clean);
  afterEach(h.clean);

  var visible = false;
  var test;

  beforeEach(function() {
    test = h.createTest();
    inViewport(test, function() {
      visible = true;
    });
  });

  it('cb not called', function() {
    assert.strictEqual(visible, false);
  });

  describe('when inserted into the DOM', function() {

    beforeEach(function() {
      h.insertTest(test);
    });

    describe('without scrolling', function () {
      if (typeof MutationObserver === 'function') {
        describe('when the browser supports `MutationObserver`', function () {

          beforeEach(h.wait(50));

          it('cb called', function() {
            assert.strictEqual(visible, true);
          });
        });
      }
    });

    describe('with scrolling', function () {
      beforeEach(h.scroller(0, 100));
      beforeEach(h.scroller(0, 0));

      it('cb called', function() {
        assert.strictEqual(visible, true);
      });
    });
  });
});
