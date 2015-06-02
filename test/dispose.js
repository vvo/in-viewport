describe('using the watcher API to dispose and watch again', function() {
  require('./fixtures/bootstrap.js');
  beforeEach(h.clean);
  afterEach(h.clean);

  var element;
  var watcher;
  var visible = false;

  beforeEach(function() {
    element = h.createTest({
      style: {
        top: '10000px'
      }
    });
    h.insertTest(element);
    watcher = inViewport(element, function() {
      visible = true;
    });
  });

  describe('when the watcher is not active', function() {
    beforeEach(function() {
      watcher.dispose();
    });
    beforeEach(h.scroller(0, 10000));
    beforeEach(h.scroller(0, 0));

    it('cb not called', function() {
      assert.strictEqual(visible, false);
    });
  });

  describe('when the watcher is active', function() {
    beforeEach(function() {
      watcher.watch();
    });
    beforeEach(h.scroller(0, 10000));
    beforeEach(h.scroller(0, 0));

    it('cb called', function() {
      assert.strictEqual(visible, true);
    });
  });
});
