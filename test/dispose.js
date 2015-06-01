describe('using the watcher API to dispose and watch again', function() {
  require('./fixtures/bootstrap.js');
  beforeEach(h.clean);
  afterEach(h.clean);

  var visible = false;
  var element;
  var watcher;

  beforeEach(function(done) {
    element = h.createTest({
      style: {
        top: '10000px'
      }
    });
    h.insertTest(element);
    watcher = inViewport(element, function() {
      scrolled = true;
      done();
    });
  });
  
  describe('when the watcher is not active', function() {
    beforeEach(watcher.dispose());
    beforeEach(h.scroller(0, 10000));
    beforeEach(h.scroller(0, 0));

    it('cb not called', function() {
      assert.strictEqual(calls.length, 0);
    });
  });

  describe('when the watcher is active', function() {
    beforeEach(watcher.watch());
    beforeEach(h.scroller(0, 10000));
    beforeEach(h.scroller(0, 0));

    it('cb called', function() {
      assert.strictEqual(calls.length, 1);
    });
  });
});