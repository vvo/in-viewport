describe('in-viewport watch callback', function() {
  var scrolled = false;
  var test = createTest();
  var received;

  before(function(done) {
    insertTest(test);
    inViewport(test, function(element) {
      received = element;
      done();
    });
  });

  it('is called with the associated DOMElement', function() {
    assert(received === test, 'did not receive the DOMElement');
  });

  after(clean(test));
});