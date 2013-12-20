describe('in-viewport watch callback', function() {
  require('./fixtures/bootstrap.js');
  beforeEach(h.clean);
  afterEach(h.clean);

  var scrolled = false;
  var test;
  var received;

  before(function() {
    test = h.createTest();
    h.insertTest(test);
    inViewport(test, function(element) {
      received = element;
    });
  });

  beforeEach(h.scroller(0, 100));
  beforeEach(h.scroller(0, 0));

  it('cb called with the associated DOMElement', function() {
    assert.equal(received, test);
  });
});