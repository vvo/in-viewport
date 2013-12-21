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
    beforeEach(h.scroller(0, 100));
    beforeEach(h.scroller(0, 0));

    it('cb called', function() {
      assert.strictEqual(visible, true);
    });
  });
});